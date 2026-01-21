import { db } from "@/config/db";
import { ProjectMembersTable, ProjectTable, ScreenConfigTable, usersTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { PLAN_LIMITS, PlanType } from "@/config/plans";

export async function POST(req: NextRequest) {
    const { userInput, device, projectId } = await req.json();
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress.emailAddress;

    // Check if user exists in database, get their plan
    let userPlan: PlanType = 'free';
    let maxProjects = 0;

    const userRecord = await db.select().from(usersTable)
        .where(eq(usersTable.email, userEmail));

    if (userRecord.length === 0) {
        // Create new user with default 'free' plan
        // Free plan limit is from config which is 1
        await db.insert(usersTable).values({
            name: user.fullName ?? 'Unknown User',
            email: userEmail,
            plan: 'free',
            maxProjects: PLAN_LIMITS['free'].maxProjects
        });
        userPlan = 'free';
        maxProjects = PLAN_LIMITS['free'].maxProjects;
    } else {
        userPlan = userRecord[0].plan as PlanType;
        // TRUST THE DB first, if set
        if (userRecord[0].maxProjects !== null && userRecord[0].maxProjects !== undefined) {
            maxProjects = userRecord[0].maxProjects;
        } else {
            // If DB field is missing (migration), fallback to config and sync it
            const configLimit = PLAN_LIMITS[userPlan]?.maxProjects ?? PLAN_LIMITS['free'].maxProjects;
            maxProjects = configLimit === Infinity ? 10000 : configLimit;

            // Async update to sync DB for future
            await db.update(usersTable)
                .set({ maxProjects: maxProjects })
                .where(eq(usersTable.email, userEmail));
        }
    }

    // Check if user has available project slots (Consumption Model)
    if (maxProjects <= 0) {
        return NextResponse.json({
            error: 'No available project slots',
            details: `You have 0 project slots remaining. Please upgrade your plan to create more projects.`
        }, { status: 403 });
    }

    // Check if user has credits to generate content
    if ((userRecord[0].credits || 0) <= 0) {
        return NextResponse.json({
            error: 'Insufficient credits',
            details: 'You need credits to create and generate a project. Please upgrade your plan or purchase credits.'
        }, { status: 403 });
    }

    const result = await db.insert(ProjectTable).values({
        projectId: projectId,
        userId: userEmail,
        device: device,
        userInput: userInput
    }).returning();

    // Deduct Project Slot
    await db.update(usersTable)
        .set({ maxProjects: sql`${usersTable.maxProjects} - 1` })
        .where(eq(usersTable.email, userEmail));

    return NextResponse.json(result[0]);

}

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId');
    const user = await currentUser()

    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {

        if (!projectId) {
            // Fetch Owned Projects
            const ownedProjects = await db.select({
                id: ProjectTable.id,
                projectId: ProjectTable.projectId,
                projectName: ProjectTable.projectName,
                theme: ProjectTable.theme,
                device: ProjectTable.device,
                createdOn: ProjectTable.createdOn,
                role: sql<'owner'>`'owner'`.as('role')
            }).from(ProjectTable)
                .where(eq(ProjectTable.userId, user.primaryEmailAddress.emailAddress))
                .orderBy(desc(ProjectTable.id))
                .limit(25);

            // Fetch Shared Projects
            const memberRecords = await db.select({
                projectId: ProjectMembersTable.projectId,
                role: ProjectMembersTable.role
            })
                .from(ProjectMembersTable)
                .where(eq(ProjectMembersTable.email, user.primaryEmailAddress.emailAddress));

            let sharedProjects: any[] = [];
            if (memberRecords.length > 0) {
                // Fetch details for these IDs
                sharedProjects = await Promise.all(memberRecords.map(async (record) => {
                    const p = await db.select({
                        id: ProjectTable.id,
                        projectId: ProjectTable.projectId,
                        projectName: ProjectTable.projectName,
                        theme: ProjectTable.theme,
                        device: ProjectTable.device,
                        createdOn: ProjectTable.createdOn,
                    }).from(ProjectTable).where(eq(ProjectTable.projectId, record.projectId));

                    if (p.length > 0) {
                        return { ...p[0], role: record.role };
                    }
                    return null;
                }));
                // filter nulls if any
                sharedProjects = sharedProjects.filter(p => !!p);
            }

            // Combine and sort
            const allProjects = [...ownedProjects, ...sharedProjects].sort((a, b) => {
                return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
            });

            return NextResponse.json(allProjects)

        }

        let project = await db.select().from(ProjectTable)
            .where(and(eq(ProjectTable.projectId, projectId as string), eq(ProjectTable.userId, user.primaryEmailAddress.emailAddress)))

        // If not owner, check if member
        if (project.length === 0) {
            const membership = await db.select().from(ProjectMembersTable)
                .where(and(
                    eq(ProjectMembersTable.projectId, projectId as string),
                    eq(ProjectMembersTable.email, user.primaryEmailAddress.emailAddress)
                ));

            if (membership.length > 0) {
                // Is member, fetch project without owner check
                project = await db.select().from(ProjectTable)
                    .where(eq(ProjectTable.projectId, projectId as string));
            }
        }

        if (project.length === 0) {
            return NextResponse.json({ error: 'Project not found or access denied' }, { status: 404 });
        }

        const ScreenConfig = await db.select().from(ScreenConfigTable)
            .where(eq(ScreenConfigTable.projectId, projectId as string))
            .orderBy(asc(ScreenConfigTable.id))

        return NextResponse.json({
            projectDetail: project[0],
            screenConfig: ScreenConfig
        });
    }
    catch (e) {
        console.error("Error fetching project:", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}


export async function PUT(req: NextRequest) {
    const { projectName, theme, projectId, screenShot } = await req.json();

    const user = await currentUser();
    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await db.select().from(ProjectTable).where(eq(ProjectTable.projectId, projectId));
    if (project.length === 0) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project[0].userId !== user.primaryEmailAddress.emailAddress) {
        return NextResponse.json({ error: 'Only the owner can edit project settings' }, { status: 403 });
    }

    const result = await db.update(ProjectTable).set({
        projectName: projectName,
        theme: theme,
        screenshot: screenShot as string ?? null
    }).where(eq(ProjectTable.projectId, projectId))
        .returning();

    return NextResponse.json(result[0])
}
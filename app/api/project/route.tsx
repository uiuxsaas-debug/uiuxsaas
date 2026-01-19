import { db } from "@/config/db";
import { ProjectTable, ScreenConfigTable, usersTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, asc, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userInput, device, projectId } = await req.json();
    const user = await currentUser();

    const { has } = await auth();
    const hasPremiumAccess = has({ plan: 'unlimted' })

    // Only select id to count projects - avoid fetching large columns like screenshot
    const projects = await db.select({ id: ProjectTable.id }).from(ProjectTable)
        .where(eq(ProjectTable.userId, user?.primaryEmailAddress?.emailAddress as string))

    // if (projects.length >= 10 && !hasPremiumAccess) {
    //     return NextResponse.json({ msg: 'Limit Exceed' })
    // }

    // Check if user exists in database, if not create one
    const userRecord = await db.select().from(usersTable)
        .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress as string));

    if (userRecord.length === 0) {
        await db.insert(usersTable).values({
            name: user?.fullName ?? 'Unknown User',
            email: user?.primaryEmailAddress?.emailAddress as string,
        });
    }

    const result = await db.insert(ProjectTable).values({
        projectId: projectId,
        userId: user?.primaryEmailAddress?.emailAddress as string,
        device: device,
        userInput: userInput
    }).returning();

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
            // Only select columns needed for project list - exclude large fields
            const result = await db.select({
                id: ProjectTable.id,
                projectId: ProjectTable.projectId,
                projectName: ProjectTable.projectName,
                theme: ProjectTable.theme,
                device: ProjectTable.device,
                createdOn: ProjectTable.createdOn,
                // Note: screenshot excluded to avoid large response
            }).from(ProjectTable)
                .where(eq(ProjectTable.userId, user.primaryEmailAddress.emailAddress))
                .orderBy(asc(ProjectTable.id))

            return NextResponse.json(result)

        }

        const result = await db.select().from(ProjectTable)
            .where(and(eq(ProjectTable.projectId, projectId as string), eq(ProjectTable.userId, user.primaryEmailAddress.emailAddress)))

        const ScreenConfig = await db.select().from(ScreenConfigTable)
            .where(eq(ScreenConfigTable.projectId, projectId as string))
            .orderBy(asc(ScreenConfigTable.id))

        return NextResponse.json({
            projectDetail: result[0],
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

    const result = await db.update(ProjectTable).set({
        projectName: projectName,
        theme: theme,
        screenshot: screenShot as string ?? null

    }).where(eq(ProjectTable.projectId, projectId))
        .returning();

    return NextResponse.json(result[0])
}
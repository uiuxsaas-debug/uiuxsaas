import { db } from "@/config/db";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, asc, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userInput, device, projectId } = await req.json();
    const user = await currentUser();

    const { has } = await auth();
    const hasPremiumAccess = has({ plan: 'unlimted' })

    const projects = await db.select().from(ProjectTable)
        .where(eq(ProjectTable.userId, user?.primaryEmailAddress?.emailAddress as string))

    if (projects.length >= 2 && !hasPremiumAccess) {
        return NextResponse.json({ msg: 'Limit Exceed' })
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
    const projectId = await req.nextUrl.searchParams.get('projectId');
    const user = await currentUser()

    try {

        if (!projectId) {
            const result = await db.select().from(ProjectTable)
                .where(eq(ProjectTable.userId, user?.primaryEmailAddress?.emailAddress as string))
                .orderBy(desc(ProjectTable.id))

            return NextResponse.json(result)

        }

        const result = await db.select().from(ProjectTable)
            .where(and(eq(ProjectTable.projectId, projectId as string), eq(ProjectTable.userId, user?.primaryEmailAddress?.emailAddress as string)))

        const ScreenConfig = await db.select().from(ScreenConfigTable)
            .where(eq(ScreenConfigTable.projectId, projectId as string))
            .orderBy(desc(ScreenConfigTable.id))

        return NextResponse.json({
            projectDetail: result[0],
            screenConfig: ScreenConfig
        });
    }
    catch (e) {
        return NextResponse.json({ msg: 'Error' })
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
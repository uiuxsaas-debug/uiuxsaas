import { db } from "@/config/db";
import { ProjectTable, usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    const user = await currentUser();
    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId, isPublic } = await req.json();

    if (!projectId) {
        return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    // Verify ownership
    const project = await db.select().from(ProjectTable)
        .where(eq(ProjectTable.projectId, projectId));

    if (project.length === 0) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project[0].userId !== user.primaryEmailAddress.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Check Plan for Sharing (Team Only)
    const userRecord = await db.select().from(usersTable).where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));
    const userPlan = userRecord[0]?.plan || 'free';

    if (userPlan !== 'team') {
        return NextResponse.json({
            error: 'Upgrade Required',
            message: 'Project sharing is exclusive to the Team plan.'
        }, { status: 403 });
    }

    // Update isPublic
    const result = await db.update(ProjectTable)
        .set({ isPublic: isPublic })
        .where(eq(ProjectTable.projectId, projectId))
        .returning();

    return NextResponse.json(result[0]);
}

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId');
    if (!projectId) {
        return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    const user = await currentUser();
    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await db.select().from(ProjectTable)
        .where(eq(ProjectTable.projectId, projectId));

    if (project.length === 0) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Check Plan for Sharing UI
    const userRecord = await db.select().from(usersTable).where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));
    const userPlan = userRecord[0]?.plan || 'free';
    const canShare = userPlan === 'team';

    return NextResponse.json({
        isPublic: project[0].isPublic,
        canShare: canShare
    });
}

import { db } from "@/config/db";
import { ProjectMembersTable, ProjectTable, usersTable } from "@/config/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    const user = await currentUser();
    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId, email } = await req.json();
    if (!email || !projectId) {
        return NextResponse.json({ error: 'Email and Project ID required' }, { status: 400 });
    }

    // Verify ownership
    const project = await db.select().from(ProjectTable)
        .where(eq(ProjectTable.projectId, projectId));

    if (project.length === 0) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project[0].userId !== user.primaryEmailAddress.emailAddress) {
        return NextResponse.json({ error: 'Only the owner can add members' }, { status: 403 });
    }

    // Check Plan for Adding Members (Team Only)
    const userRecord = await db.select().from(usersTable).where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));
    const userPlan = userRecord[0]?.plan || 'free';

    if (userPlan !== 'team') {
        return NextResponse.json({
            error: 'Upgrade Required',
            message: 'Team collaboration is exclusive to the Team plan.'
        }, { status: 403 });
    }

    if (email === user.primaryEmailAddress.emailAddress) {
        return NextResponse.json({ error: 'You are already the owner of this project' }, { status: 400 });
    }

    // Check if already member
    const existing = await db.select().from(ProjectMembersTable)
        .where(and(
            eq(ProjectMembersTable.projectId, projectId),
            eq(ProjectMembersTable.email, email)
        ));

    if (existing.length > 0) {
        return NextResponse.json({ error: 'User is already a member' }, { status: 400 });
    }

    const result = await db.insert(ProjectMembersTable).values({
        projectId: projectId,
        email: email,
        role: 'viewer' // Explicitly set role
    }).returning();

    return NextResponse.json(result[0]);
}

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId');
    if (!projectId) {
        return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    const members = await db.select().from(ProjectMembersTable)
        .where(eq(ProjectMembersTable.projectId, projectId));

    return NextResponse.json(members);
}

export async function DELETE(req: NextRequest) {
    const user = await currentUser();
    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId, email } = await req.json();

    // Verify ownership
    const project = await db.select().from(ProjectTable)
        .where(eq(ProjectTable.projectId, projectId));

    if (project.length === 0) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    if (project[0].userId !== user.primaryEmailAddress.emailAddress) {
        // Allow user to leave themselves? For now, stricly owner removes
        return NextResponse.json({ error: 'Only owner can remove members' }, { status: 403 });
    }

    await db.delete(ProjectMembersTable)
        .where(and(
            eq(ProjectMembersTable.projectId, projectId),
            eq(ProjectMembersTable.email, email)
        ));

    return NextResponse.json({ success: true });
}

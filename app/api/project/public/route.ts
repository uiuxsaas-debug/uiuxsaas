import { db } from "@/config/db";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import { and, asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId');

    if (!projectId) {
        return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    try {
        // Fetch project solely by ID and Public status
        const project = await db.select().from(ProjectTable)
            .where(and(
                eq(ProjectTable.projectId, projectId),
                eq(ProjectTable.isPublic, true)
            ));

        if (project.length === 0) {
            return NextResponse.json({ error: 'Project not found or private' }, { status: 404 });
        }

        const ScreenConfig = await db.select().from(ScreenConfigTable)
            .where(eq(ScreenConfigTable.projectId, projectId))
            .orderBy(asc(ScreenConfigTable.id));

        return NextResponse.json({
            projectDetail: project[0],
            screenConfig: ScreenConfig
        });
    } catch (e) {
        console.error("Error fetching public project:", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

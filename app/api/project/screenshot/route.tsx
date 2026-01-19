import { db } from "@/config/db";
import { ProjectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId');
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress || !projectId) {
        return NextResponse.json({ error: 'Invalid Request' }, { status: 400 });
    }

    try {
        const result = await db.select({
            screenshot: ProjectTable.screenshot
        }).from(ProjectTable)
            .where(and(
                eq(ProjectTable.projectId, projectId),
                eq(ProjectTable.userId, user.primaryEmailAddress.emailAddress)
            ));

        if (result.length > 0) {
            return NextResponse.json({ screenshot: result[0].screenshot });
        }

        return NextResponse.json({ screenshot: null });
    } catch (e) {
        return NextResponse.json({ error: 'Failed', screenshot: null }, { status: 500 });
    }
}

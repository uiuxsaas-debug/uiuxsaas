import { db } from "@/config/db";
import { CREDIT_COSTS } from "@/config/costs";
import { checkAndResetCredits } from "@/lib/credit-helper";
import { geminiModel } from "@/config/gemini";
import { ScreenConfigTable, usersTable, ProjectTable } from "@/config/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    const user = await currentUser();
    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userEmail = user.primaryEmailAddress.emailAddress;

    // Check & Reset Monthly Credits if needed
    await checkAndResetCredits(userEmail);

    // Check Credits
    const userRecord = await db.select().from(usersTable).where(eq(usersTable.email, userEmail));
    if (userRecord.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentCredits = userRecord[0].credits || 0;
    const requiredCredits = CREDIT_COSTS.EDIT_SCREEN;

    if (currentCredits < requiredCredits) {
        return NextResponse.json({
            error: 'Insufficient credits',
            message: `You need ${requiredCredits} credits to edit but only have ${currentCredits}.`,
        }, { status: 402 });
    }

    const { projectId, screenId, oldCode, userInput } = await req.json();

    // Verify Ownership
    const project = await db.select().from(ProjectTable).where(eq(ProjectTable.projectId, projectId));
    if (project.length === 0 || project[0].userId !== userEmail) {
        return NextResponse.json({ error: 'Only the owner can edit screens. Viewers are read-only.' }, { status: 403 });
    }

    const USER_INPUT = `${oldCode} Make changes as per user Input in this code, Keeping design and style same. 
    Do not change it. Just make user requested changes. and keep all other code as it is. Only return HTML Tailwindcss code and no raw text. UserInput is:  +`+ userInput

    try {
        const result = await geminiModel.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: USER_INPUT }]
                }
            ],
        });

        let code = result.response.text();
        // Clean markdown backticks if present to ensure component rendering doesn't break
        code = code.replace(/```html/g, '').replace(/```/g, '').trim();

        const updateResult = await db.update(ScreenConfigTable)
            .set({
                code: code
            }).where(and(eq(ScreenConfigTable.projectId, projectId),
                eq(ScreenConfigTable?.screenId, screenId as string)))
            .returning()

        // Deduct 50 credits
        await db.update(usersTable)
            .set({
                credits: sql`${usersTable.credits} - ${CREDIT_COSTS.EDIT_SCREEN}`
            })
            .where(eq(usersTable.email, userEmail));

        return NextResponse.json(updateResult[0])
    }
    catch (e: any) {
        console.error("Gemini API Error in edit-screen:", e);
        if (e.status === 429 || e.message?.includes('429')) {
            return NextResponse.json(
                { error: "AI Rate Limit Exceeded. Please try again later." },
                { status: 429 }
            );
        }
        return NextResponse.json({ error: 'Internal Server Error!' }, { status: 500 })
    }
}
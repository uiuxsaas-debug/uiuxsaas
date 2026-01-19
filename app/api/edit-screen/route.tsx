import { db } from "@/config/db";
import { geminiModel } from "@/config/gemini";
import { ScreenConfigTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { projectId, screenId, oldCode, userInput } = await req.json();

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
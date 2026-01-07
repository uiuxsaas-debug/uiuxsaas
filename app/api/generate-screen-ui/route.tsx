import { db } from "@/config/db";
import { geminiModel } from "@/config/gemini";
import { ScreenConfigTable } from "@/config/schema";
import { GENERATE_SCREEN_PROMPT } from "@/data/Prompt";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { projectId, screenId, screenName, purpose, screenDescription, projectVisualDescription } = await req.json();

    const userInput = `
    screen Name is: ${screenName},
    screen Purpose: ${purpose},
    screen Description:${screenDescription}
    `
    try {
        const result = await geminiModel.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: GENERATE_SCREEN_PROMPT + "\n\nUser Input: " + userInput }]
                }
            ],
        });

        let code = result.response.text();
        // Ensure clean HTML output by removing markdown blocks if they exist
        code = code.replace(/```html/g, '').replace(/```/g, '').trim();

        const updateResult = await db.update(ScreenConfigTable)
            .set({
                code: code
            }).where(and(eq(ScreenConfigTable.projectId, projectId),
                eq(ScreenConfigTable?.screenId, screenId as string)))
            .returning()

        return NextResponse.json(updateResult[0])
    }
    catch (e) {
        return NextResponse.json({ msg: 'Internal Server Error!' })
    }
}
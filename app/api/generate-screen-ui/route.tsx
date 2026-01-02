import { db } from "@/config/db";
import { openrouter } from "@/config/openroute";
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
        const aiResult = await openrouter.chat.send({
            model: "openai/gpt-5.2-chat",//You replace with any other Free Model
            messages: [
                {
                    role: 'system',
                    content: [
                        {
                            type: 'text',
                            text: GENERATE_SCREEN_PROMPT
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": userInput
                        },
                    ]
                }
            ],
            stream: false
        });

        const code = aiResult?.choices[0]?.message?.content;
        const updateResult = await db.update(ScreenConfigTable)
            .set({
                code: code as string
            }).where(and(eq(ScreenConfigTable.projectId, projectId),
                eq(ScreenConfigTable?.screenId, screenId as string)))
            .returning()

        return NextResponse.json(updateResult[0])
    }
    catch (e) {
        return NextResponse.json({ msg: 'Internal Server Error!' })
    }
}
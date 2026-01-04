import { db } from "@/config/db";
import { openai } from "@/config/openai";
import { ScreenConfigTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { projectId, screenId, oldCode, userInput } = await req.json();

    const USER_INPUT = `${oldCode} Make changes as per user Input in this code, Keeping design and style same. 
    Do not change it. Just make user requested changes. and keep all other code as it is. Only return HTML Tailwindcss code and no raw text. UserInput is:  +`+ userInput

    try {
        const aiResult = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": USER_INPUT
                        },
                    ]
                }
            ],
        });

        const code = aiResult.choices[0].message.content;
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
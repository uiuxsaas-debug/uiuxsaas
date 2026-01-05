import { db } from "@/config/db";
import { openai } from "@/config/openai";
import { ScreenConfigTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handle POST requests that update a screen's code by generating modifications via the OpenAI chat model and persisting the result to the database.
 *
 * @param req - NextRequest whose JSON body must include `projectId`, `screenId`, `oldCode`, and `userInput`. `oldCode` is the current screen HTML/Tailwind code and `userInput` describes requested changes.
 * @returns The updated screen configuration row as JSON on success; on failure returns a JSON object with `{ msg: 'Internal Server Error!' }`.
 */
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
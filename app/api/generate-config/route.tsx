import { db } from "@/config/db";
import { openai } from "@/config/openai";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import { APP_LAYOUT_CONFIG_PROMPT, GENRATE_NEW_SCREEN_IN_EXISITING_PROJECT_PROJECT } from "@/data/Prompt";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * Generate screen configurations via an AI completion, persist them to the database, and return the parsed AI response.
 *
 * Reads JSON from the incoming request body (expected keys: `userInput`, `deviceType`, `projectId`, `oldScreenDescription`, `theme`), calls the AI to generate layout and project metadata, updates project metadata when `oldScreenDescription` is not provided, inserts generated screens into the screen configuration table, and responds with the parsed AI result.
 *
 * @param req - Next.js request whose JSON body must include `userInput`, `deviceType`, `projectId`, and optionally `oldScreenDescription` and `theme`
 * @returns The parsed AI response object containing project metadata and an array of screens (or `{ msg: "Internal Server Error" }` when parsing or generation fails)
 */
export async function POST(req: NextRequest) {
    const { userInput, deviceType, projectId, oldScreenDescription, theme } = await req.json();

    const aiResult = await openai.chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
            {
                role: 'system',
                content: [
                    {
                        type: 'text',
                        text: oldScreenDescription ?
                            GENRATE_NEW_SCREEN_IN_EXISITING_PROJECT_PROJECT.replace('{deviceType}', deviceType).replace('{theme}', theme) :
                            APP_LAYOUT_CONFIG_PROMPT.replace('{deviceType}', deviceType)
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": oldScreenDescription ? userInput + " Old Screen Description is:" + oldScreenDescription : userInput
                    },
                ]
            }
        ],
    });

    const JSONAiResult = JSON.parse(aiResult.choices[0].message.content as string)

    if (JSONAiResult) {
        //Update Project Table with Project Name
        !oldScreenDescription && await db.update(ProjectTable).set({
            projectVisualDescription: JSONAiResult?.projectVisualDescription,
            projectName: JSONAiResult?.projectName,
            theme: JSONAiResult?.theme
            //@ts-ignore
        }).where(eq(ProjectTable.projectId, projectId as string))

        //Insert Screen Config
        JSONAiResult.screens?.forEach(async (screen: any) => {
            const result = await db.insert(ScreenConfigTable).values({
                projectId: projectId,
                purpose: screen?.purpose,
                screenDescription: screen?.layoutDescription,
                screenId: screen?.id,
                screenName: screen?.name
            });
        })
        return NextResponse.json(JSONAiResult)

    }
    else {
        NextResponse.json({ msg: "Internal Server Error" })
    }
}

export async function DELETE(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId');
    const screenId = req.nextUrl.searchParams.get('screenId');

    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ msg: 'Unauthorized User', status: 400 })
    }

    const result = await db.delete(ScreenConfigTable)
        .where(and(eq(ScreenConfigTable.screenId, screenId as string), eq(ScreenConfigTable.projectId, projectId as string)))

    return NextResponse.json({ msg: 'Deleted' })
}
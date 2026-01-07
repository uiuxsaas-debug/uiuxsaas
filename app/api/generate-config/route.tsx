import { db } from "@/config/db";
import { geminiModel } from "@/config/gemini";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import { APP_LAYOUT_CONFIG_PROMPT, GENRATE_NEW_SCREEN_IN_EXISITING_PROJECT_PROJECT } from "@/data/Prompt";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userInput, deviceType, projectId, oldScreenDescription, theme } = await req.json();

    const systemPrompt = oldScreenDescription ?
        GENRATE_NEW_SCREEN_IN_EXISITING_PROJECT_PROJECT.replace('{deviceType}', deviceType).replace('{theme}', theme) :
        APP_LAYOUT_CONFIG_PROMPT.replace('{deviceType}', deviceType);

    const userPrompt = oldScreenDescription ? userInput + " Old Screen Description is:" + oldScreenDescription : userInput;

    const result = await geminiModel.generateContent({
        contents: [
            {
                role: "user",
                parts: [{ text: systemPrompt + "\n\nUser Input: " + userPrompt }]
            }
        ],
        generationConfig: {
            responseMimeType: "application/json",
        },
    });

    const responseText = result.response.text();
    const JSONAiResult = JSON.parse(responseText);

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
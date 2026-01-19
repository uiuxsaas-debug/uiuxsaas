import { db } from "@/config/db";
import { geminiModel } from "@/config/gemini";
import { ProjectTable, ScreenConfigTable } from "@/config/schema";
import { APP_LAYOUT_CONFIG_PROMPT, GENRATE_NEW_SCREEN_IN_EXISITING_PROJECT_PROJECT } from "@/data/Prompt";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userInput, deviceType, projectId, oldScreenDescription, theme } = await req.json();

    const systemPrompt = oldScreenDescription ?
        GENRATE_NEW_SCREEN_IN_EXISITING_PROJECT_PROJECT.replace('{deviceType}', deviceType).replace('{theme}', theme) :
        APP_LAYOUT_CONFIG_PROMPT.replace('{deviceType}', deviceType);

    const userPrompt = oldScreenDescription ? userInput + " Old Screen Description is:" + oldScreenDescription : userInput;

    let result;
    try {
        result = await geminiModel.generateContent({
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
        console.log("this is the result", result);
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        if (error.status === 429 || error.message?.includes('429')) {
            return NextResponse.json(
                { error: "AI Rate Limit Exceeded. Please try again later." },
                { status: 429 }
            );
        }
        return NextResponse.json(
            { error: "Failed to generate content" },
            { status: 500 }
        );
    }

    const responseText = result.response.text();
    const JSONAiResult = JSON.parse(responseText);

    if (JSONAiResult) {
        //Update Project Table with Project Name and Navigation Config
        // Update Project Table only if it's a new config generation (not adding single screen) AND result has project details
        if (!oldScreenDescription && JSONAiResult?.projectName) {
            await db.update(ProjectTable).set({
                projectVisualDescription: JSONAiResult?.projectVisualDescription,
                projectName: JSONAiResult?.projectName,
                theme: JSONAiResult?.theme,
                config: {
                    navigationTabs: JSONAiResult?.navigationTabs || [],
                    appCategory: JSONAiResult?.appCategory || ''
                }
                //@ts-ignore
            }).where(eq(ProjectTable.projectId, projectId as string))
        }

        // Handle both Object (screens array property) and Array (direct list of screens) formats
        const screens = Array.isArray(JSONAiResult) ? JSONAiResult : (JSONAiResult.screens || []);

        for (const screen of screens) {
            await db.insert(ScreenConfigTable).values({
                projectId: projectId,
                purpose: screen?.purpose,
                // Handle various potential AI output keys for robustness
                screenDescription: screen?.layoutDescription || (screen?.components ? JSON.stringify(screen.components) : "") || screen?.description,
                screenId: screen?.id || screen?.screen_id,
                screenName: screen?.name || screen?.screen_name
            });
        }

        return NextResponse.json(JSONAiResult)

    }
    else {
        NextResponse.json({ msg: "Internal Server Error" })
    }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id'); // Use unique database id

    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ msg: 'Unauthorized User', status: 400 })
    }

    if (!id) {
        return NextResponse.json({ msg: 'Missing id parameter' }, { status: 400 })
    }

    const result = await db.delete(ScreenConfigTable)
        .where(eq(ScreenConfigTable.id, parseInt(id)))

    return NextResponse.json({ msg: 'Deleted' })
}
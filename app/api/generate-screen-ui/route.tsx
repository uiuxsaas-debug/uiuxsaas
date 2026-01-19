import { db } from "@/config/db";
import { geminiModel } from "@/config/gemini";
import { ScreenConfigTable } from "@/config/schema";
import { GENERATE_SCREEN_PROMPT } from "@/data/Prompt";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {
        projectId,
        screenId,
        screenName,
        purpose,
        screenDescription,
        projectVisualDescription,
        device,
        theme,
        allScreenNames,
        navigationTabs,  // Added: Array of {name, icon} from Step 1
        activeTab        // Added: Which tab should be active for this screen
    } = await req.json();

    // Determine if this screen should have bottom navigation
    const mainScreenKeywords = ['dashboard', 'home', 'main', 'feed', 'explore', 'profile', 'settings', 'search', 'activity', 'insights', 'stats', 'rewards', 'cards', 'transactions', 'security'];
    const noNavKeywords = ['login', 'signup', 'register', 'welcome', 'onboarding', 'splash', 'detail', 'checkout', 'payment', 'transfer', 'success', 'error', 'confirmation', 'add', 'create', 'edit', 'new'];

    const screenNameLower = screenName?.toLowerCase() || '';
    const purposeLower = purpose?.toLowerCase() || '';

    const shouldHaveNav = mainScreenKeywords.some(keyword =>
        screenNameLower.includes(keyword) || purposeLower.includes(keyword)
    );
    const shouldNotHaveNav = noNavKeywords.some(keyword =>
        screenNameLower.includes(keyword) || purposeLower.includes(keyword)
    );

    // Build navigation tabs string if provided
    const navTabsString = navigationTabs?.length > 0
        ? navigationTabs.map((tab: { name: string, icon: string }, i: number) =>
            `  ${i + 1}. "${tab.name}" - icon: "${tab.icon}"${tab.name === activeTab ? ' [ACTIVE]' : ''}`
        ).join('\n')
        : '';

    const navigationInstruction = shouldNotHaveNav
        ? "DO NOT include bottom navigation. Use a back button header instead."
        : shouldHaveNav
            ? `INCLUDE bottom navigation with EXACTLY these tabs (no more, no less):\n${navTabsString || 'Use 4-5 relevant tabs for this app type.'}`
            : "Use your judgment based on the screen purpose whether to include bottom navigation.";

    // Build the nav instruction with active state
    const navActiveInstruction = shouldHaveNav && activeTab
        ? `Active Tab: "${activeTab}" → use text-[var(--primary)] font-semibold\nAll other tabs: use text-[var(--muted-foreground)]`
        : '';

    // Build comprehensive user input with full context
    const userInput = `
═══════════════════════════════════════════════════════════════
SCREEN TO GENERATE
═══════════════════════════════════════════════════════════════
Screen Name: ${screenName}
Screen Purpose: ${purpose}
Screen Description: ${screenDescription}

═══════════════════════════════════════════════════════════════
PROJECT CONTEXT
═══════════════════════════════════════════════════════════════
Device Type: ${device || 'mobile'}
Theme: ${theme || 'Not specified'}
Project Visual Style: ${projectVisualDescription || 'Premium, modern SaaS design'}
Other Screens: ${allScreenNames?.join(', ') || 'None'}

═══════════════════════════════════════════════════════════════
NAVIGATION (CRITICAL - MUST MATCH EXACTLY)
═══════════════════════════════════════════════════════════════
${navigationInstruction}
${navActiveInstruction}

🚨 NAVIGATION CONSISTENCY:
- Use EXACTLY the tabs listed above (same names, same icons, same order)
- Do NOT add extra tabs or change icons
- Do NOT use FAB/center floating buttons

═══════════════════════════════════════════════════════════════
CRITICAL LAYOUT RULES (MUST FOLLOW)
═══════════════════════════════════════════════════════════════
- Root: w-[393px] min-h-[852px] bg-[var(--background)]
- Use COMPACT spacing: gap-3, py-3, p-4 (avoid p-8, gap-6)
- Keep content height UNDER 800px total when possible
- Limit images: album art max w-56 h-56, hero images max h-48
- Limit list items to 3-4 max per section
- Charts: max h-24 or h-28

═══════════════════════════════════════════════════════════════
IMAGE SOURCES (Use these reliable URLs)
═══════════════════════════════════════════════════════════════
- Album art: https://picsum.photos/seed/album1/200/200
- Food: https://picsum.photos/seed/food1/400/200
- Profile: https://picsum.photos/seed/user1/100/100
- Hero: https://picsum.photos/seed/hero1/400/240
Always: Add bg-[var(--muted)] as fallback, use object-cover

═══════════════════════════════════════════════════════════════
🚨 CSS VARIABLES ONLY (Theme will break otherwise!)
═══════════════════════════════════════════════════════════════
✅ USE ONLY:
- bg-[var(--primary)], bg-[var(--background)], bg-[var(--card)], bg-[var(--muted)]
- text-[var(--foreground)], text-[var(--muted-foreground)], text-[var(--primary)]
- border-[var(--border)], border-[var(--primary)]

🚫 FORBIDDEN (Will break theme switching):
- bg-orange-*, bg-amber-*, bg-blue-*, bg-green-*, bg-red-*, bg-purple-*
- text-orange-*, text-blue-*, text-gray-*, text-white, text-black
- Any Tailwind color classes or hardcoded hex colors

═══════════════════════════════════════════════════════════════
DESIGN QUALITY
═══════════════════════════════════════════════════════════════
- Dribbble/Behance quality
- CSS variables for ALL colors (mandatory!)
- Content displays fully without scrolling
- Realistic data values

═══════════════════════════════════════════════════════════════
🚨 OUTPUT FORMAT (CRITICAL!)
═══════════════════════════════════════════════════════════════
OUTPUT: Pure HTML with Tailwind CSS classes ONLY.
- Start with: <div class="relative w-[393px] min-h-[852px] bg-[var(--background)]...">
- End with: </div>
- NO JSON, NO component definitions, NO markdown
- The output will be rendered directly in an iframe
`;

    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
        try {
            const result = await geminiModel.generateContentStream({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: GENERATE_SCREEN_PROMPT + "\n\n" + userInput }]
                    }
                ],
            });

            let fullCode = '';
            for await (const chunk of result.stream) {
                const text = chunk.text();
                fullCode += text;
                await writer.write(encoder.encode(text));
            }

            // Clean the code - remove markdown fences
            let cleanedCode = fullCode.replace(/```html/g, '').replace(/```/g, '').trim();

            // Detect if AI returned JSON instead of HTML (bad output)
            if (cleanedCode.startsWith('{') || cleanedCode.startsWith('[')) {
                console.error("ERROR: AI returned JSON instead of HTML for screen:", screenName);
                console.error("First 500 chars:", cleanedCode.substring(0, 500));
                // Try to extract HTML if it's wrapped in JSON somehow, otherwise use error message
                cleanedCode = '<div class="relative w-[393px] min-h-[852px] bg-[var(--background)] flex items-center justify-center p-6"><div class="text-center"><p class="text-[var(--muted-foreground)]">Screen generation failed - please regenerate</p></div></div>';
            }

            // Make sure it starts with a div
            if (!cleanedCode.startsWith('<')) {
                // Try to find the first < and use from there
                const htmlStart = cleanedCode.indexOf('<');
                if (htmlStart > 0) {
                    cleanedCode = cleanedCode.substring(htmlStart);
                }
            }

            console.log("Generated screen for:", screenName);

            await db.update(ScreenConfigTable)
                .set({
                    code: cleanedCode
                }).where(and(eq(ScreenConfigTable.projectId, projectId),
                    eq(ScreenConfigTable?.screenId, screenId as string)))
                .returning();

        } catch (e: any) {
            console.error("Gemini API Error in generate-screen-ui:", e);
        } finally {
            await writer.close();
        }
    })();

    return new NextResponse(stream.readable, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}
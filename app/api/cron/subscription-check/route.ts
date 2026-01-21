import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { PLANS, PLAN_LIMITS } from "@/config/plans";
import { eq, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        // Authorize Cron Request (Optional but recommended)
        // const authHeader = req.headers.get('authorization');
        // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        //    return new Response('Unauthorized', { status: 401 });
        // }

        console.log("Starting Subscription Cron Job...");

        // 1. Get all active paid users
        const paidUsers = await db.select().from(usersTable).where(ne(usersTable.plan, 'free'));

        const now = new Date();
        const updates = {
            expired: 0,
            renewed: 0
        };

        for (const user of paidUsers) {
            // Safety check
            if (!user.subscriptionEndDate) continue;

            const endDate = new Date(user.subscriptionEndDate);
            const plan = PLANS.find(p => p.slug === user.plan);

            // --- 1. Check for Expiration ---
            // If endDate is in the past (and give 1 day buffer for Stripe to process renewal)
            // We add a small buffer (e.g. 24 hours) to avoid race conditions with webhook
            const oneDayAfterEnd = new Date(endDate);
            oneDayAfterEnd.setDate(oneDayAfterEnd.getDate() + 1);

            if (now > oneDayAfterEnd) {
                console.log(`User ${user.email} subscription expired on ${endDate.toISOString()}. Resetting to free.`);

                await db.update(usersTable)
                    .set({
                        plan: 'free',
                        credits: 0, // As requested: "rest to free and credit 0"
                        subscriptionId: null,
                        subscriptionStartDate: null,
                        subscriptionEndDate: null,
                        maxProjects: 0, // Reset to free limit
                        lastMonthlyReset: null
                    })
                    .where(eq(usersTable.id, user.id));

                updates.expired++;
                continue; // User is now free, skip renewal check
            }

            // --- 2. Check for Yearly Plan Monthly Renewal ---
            // Note: This matches the logic in checkAndResetCredits but done proactively
            if (plan && user.subscriptionStartDate) {
                const subStartDate = new Date(user.subscriptionStartDate);
                const billingDay = subStartDate.getDate();

                // Calculate "Current Billing Month Start"
                let currentMonthBillingStart = new Date(now.getFullYear(), now.getMonth(), billingDay);
                if (now.getDate() < billingDay) {
                    currentMonthBillingStart = new Date(now.getFullYear(), now.getMonth() - 1, billingDay);
                }

                // Check if we need to reset
                let needsReset = false;
                if (!user.lastMonthlyReset) {
                    // If never reset, and it's been more than a month since start, reset.
                    // (Or if start date is fresh, maybe not? But safe to align)
                    if (now.getTime() - subStartDate.getTime() > 30 * 24 * 60 * 60 * 1000) {
                        needsReset = true;
                    }
                } else {
                    const lastReset = new Date(user.lastMonthlyReset);
                    if (lastReset < currentMonthBillingStart) {
                        needsReset = true;
                    }
                }

                if (needsReset) {
                    console.log(`Refreshing monthly credits for ${user.email}.`);

                    const limitConfig = PLAN_LIMITS[user.plan as keyof typeof PLAN_LIMITS];
                    const maxProjects = limitConfig ? (limitConfig.maxProjects === Infinity ? 10000 : limitConfig.maxProjects) : 1;

                    await db.update(usersTable)
                        .set({
                            credits: plan.quota,
                            maxProjects: maxProjects,
                            lastMonthlyReset: now.toISOString()
                        })
                        .where(eq(usersTable.id, user.id));

                    updates.renewed++;
                }
            }
        }

        console.log(`Cron Job Completed. Expired: ${updates.expired}, Renewed: ${updates.renewed}`);
        return NextResponse.json({ success: true, updates });

    } catch (error) {
        console.error("Cron Job Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { PLANS, PLAN_LIMITS } from "@/config/plans";
import { eq } from "drizzle-orm";

/**
 * Checks if the user's credits need to be reset based on their subscription plan.
 * For yearly plans, this resets credits monthly on the billing day anchor.
 */
export async function checkAndResetCredits(userEmail: string) {
    try {
        const userRecord = await db.select().from(usersTable).where(eq(usersTable.email, userEmail));

        if (userRecord.length === 0) return;

        const user = userRecord[0];
        const planName = user.plan;

        // Skip for Free plan (or apply different logic if needed, but usually free resets too?)
        // Let's assume Free plan also resets monthly from 'created_on' or just every 1st of month? 
        // For now, let's focus on Paid plans as requested.

        if (!planName || planName === 'free') {
            // Optional: Implement monthly reset for free users if desired.
            // For now, returning as the main issue is Yearly subscriptions.
            return;
        }

        const plan = PLANS.find(p => p.slug === planName);
        if (!plan) return;

        const quota = plan.quota;
        const subStartDateStr = user.subscriptionStartDate;

        if (!subStartDateStr) return; // No active subscription start date

        const subStartDate = new Date(subStartDateStr);
        const now = new Date();
        const lastResetStr = user.lastMonthlyReset;

        // Calculate the "anchor day" of the month directly from subscription start date
        const billingDay = subStartDate.getDate(); // 1-31

        // Determine the "Billing Start Date" for the *current* month
        // Example: Sub started Jan 15. Today is Mar 20. 
        // Current billing cycle started Mar 15.
        // If today was Mar 10, current billing cycle started Feb 15.

        let currentMonthBillingStart = new Date(now.getFullYear(), now.getMonth(), billingDay);

        // Handle edge case: if today is BEFORE the billing day in this month, 
        // then the "current billing cycle" actually started last month.
        if (now.getDate() < billingDay) {
            // Go back one month
            currentMonthBillingStart = new Date(now.getFullYear(), now.getMonth() - 1, billingDay);
        }

        // Check if we have already reset for this cycle
        // If lastReset is missing, OR lastReset is BEFORE the currentMonthBillingStart
        // Then we need to reset.

        let needsReset = false;

        if (!lastResetStr) {
            // First time logic or migration:
            // If sub started a long time ago (more than 1 month), we should probably reset.
            // If sub starts TODAY, we don't need to reset (credits are fresh).
            // But usually credits are given on start. 
            // The prompt says "yearly and credit update monthly", implying we need to give fresh credits.

            // If the user subscribed just now (less than 30 days), their credits are likely fine from the initial webhook.
            // But if they subscribed 2 months ago and we just added this feature, let's reset them to be safe.
            // To exclude "Just Now" webhook event collision: 
            // The webhook sets credits. Let's assume this runs subsequent to initial setup.

            // Safe logic: If lastReset is null, we set it to Now and ensure full credits?
            // Or strictly follow the cycle?
            // Let's strictly follow the cycle to avoid double crediting if possible, 
            // but for safety, if null, valid reset.
            needsReset = true;
        } else {
            const lastResetDate = new Date(lastResetStr);
            if (lastResetDate < currentMonthBillingStart) {
                needsReset = true;
            }
        }

        if (needsReset) {
            console.log(`Resetting credits for ${userEmail}. Plan: ${planName}. Cycle Start: ${currentMonthBillingStart.toISOString()}`);

            const limitConfig = PLAN_LIMITS[planName as keyof typeof PLAN_LIMITS];
            const maxProjects = limitConfig ? (limitConfig.maxProjects === Infinity ? 10000 : limitConfig.maxProjects) : 1;

            await db.update(usersTable)
                .set({
                    credits: quota,
                    maxProjects: maxProjects,
                    lastMonthlyReset: new Date().toISOString()
                })
                .where(eq(usersTable.email, userEmail));
        }

    } catch (error) {
        console.error("Error in checkAndResetCredits:", error);
    }
}

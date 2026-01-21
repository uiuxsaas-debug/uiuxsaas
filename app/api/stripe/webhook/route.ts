
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { PLANS, PLAN_LIMITS } from "@/config/plans";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                console.log(`[Webhook] Checkout Session Completed: ${session.id}`);
                // Retrieve the subscription details to get the plan
                if (session.subscription) {
                    const planName = session.metadata?.planName;
                    const email = session.metadata?.userId;

                    console.log(`[Webhook] Metadata - Plan: ${planName}, Email: ${email}`);

                    if (planName && email) {
                        try {
                            // Fetch full subscription to get dates
                            const subscription = await stripe.subscriptions.retrieve(session.subscription as string) as any;
                            console.log(`[Webhook] Subscription retrieved: ${subscription.id}`);

                            // Find plan details to get quota
                            // Find plan details to get quota
                            const plan = PLANS.find(p => p.slug === planName);
                            const credits = plan ? plan.quota : 10;

                            // Get project limit from PLAN_LIMITS
                            const limitConfig = PLAN_LIMITS[planName as keyof typeof PLAN_LIMITS];
                            const maxProjects = limitConfig ? (limitConfig.maxProjects === Infinity ? 10000 : limitConfig.maxProjects) : 1;

                            console.log(`[Webhook] Assigning credits: ${credits} for plan ${planName}, Max Projects: ${maxProjects}`);

                            // Validating timestamps
                            const currentPeriodStart = subscription.current_period_start;
                            const currentPeriodEnd = subscription.current_period_end;

                            // Default to now/future if missing, but log warning
                            // This prevents crash if Stripe sends incomplete object in test mode
                            let startDate = new Date().toISOString();
                            let endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // +30 days

                            if (currentPeriodStart && currentPeriodEnd) {
                                try {
                                    startDate = new Date(currentPeriodStart * 1000).toISOString();
                                    endDate = new Date(currentPeriodEnd * 1000).toISOString();
                                } catch (e) {
                                    console.error("[Webhook] Date conversion failed, using defaults", e);
                                }
                            } else {
                                console.warn("[Webhook] Missing period dates, using defaults");
                            }

                            const result = await db.update(usersTable)
                                .set({
                                    plan: planName,
                                    subscriptionId: session.subscription as string,
                                    credits: credits,
                                    maxProjects: maxProjects,
                                    subscriptionStartDate: startDate,
                                    subscriptionEndDate: endDate,
                                    lastMonthlyReset: new Date().toISOString()
                                })
                                .where(eq(usersTable.email, email))
                                .returning();

                            console.log(`[Webhook] DB Update Result:`, result);
                        } catch (err) {
                            console.error("[Webhook] Error processing checkout session:", err);
                        }
                    } else {
                        console.warn("[Webhook] Missing metadata in session");
                    }
                }
                break;
            }
            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as any;
                const customerId = invoice.customer as string;
                const subscriptionId = invoice.subscription as string;
                console.log(`[Webhook] Invoice Payment Succeeded for customer: ${customerId}`);

                if (customerId && subscriptionId) {
                    // Get user to find their plan
                    const user = await db.select().from(usersTable).where(eq(usersTable.stripeCustomerId, customerId));
                    if (user.length > 0) {
                        const planName = user[0].plan;
                        const plan = PLANS.find(p => p.slug === planName);
                        // Replenish full quota
                        const credits = plan ? plan.quota : 10;

                        // Get project limit
                        const limitConfig = PLAN_LIMITS[planName as keyof typeof PLAN_LIMITS];
                        const maxProjects = limitConfig ? (limitConfig.maxProjects === Infinity ? 10000 : limitConfig.maxProjects) : 1;

                        console.log(`[Webhook] Replenishing credits to ${credits} for user ${user[0].email}, Max Projects: ${maxProjects}`);

                        // Fetch subscription for dates
                        try {
                            const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
                            const startDate = new Date(subscription.current_period_start * 1000).toISOString();
                            const endDate = new Date(subscription.current_period_end * 1000).toISOString();

                            await db.update(usersTable)
                                .set({
                                    credits: credits,
                                    maxProjects: maxProjects,
                                    subscriptionStartDate: startDate,
                                    subscriptionEndDate: endDate,
                                    lastMonthlyReset: new Date().toISOString()
                                })
                                .where(eq(usersTable.stripeCustomerId, customerId));
                            console.log(`[Webhook] Credits replenished successfully`);
                        } catch (err) {
                            console.error("[Webhook] Error updating subscription on invoice:", err);
                        }
                    } else {
                        console.warn(`[Webhook] No user found for customer ID: ${customerId}`);
                    }
                }
                break;
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                await db.update(usersTable)
                    // Reset to Lite plan defaults
                    .set({
                        plan: 'free',
                        subscriptionId: null,
                        credits: 0,
                        maxProjects: 0 // FREE plan limit
                    })
                    .where(eq(usersTable.stripeCustomerId, customerId));

                break;
            }
            // Handle updates (upgrades/downgrades)
            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                const customerId = invoice.customer as string;

                // Optional: Notify user or lock access?
                // For now, let's just log it. Stripe logic (Smart Retries) usually keeps sub active for a bit.
                // If you want strict "No Pay, No Access", you would set plan to free here.
                console.log(`Invoice payment failed for customer ${customerId}`);
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                // If status is not active (and not trialing), maybe downgrade?
                // Also used for Plan Changes/Upgrades if they are prorated

                if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
                    await db.update(usersTable)
                        .set({
                            plan: 'free',
                            subscriptionId: null,
                            credits: 0,
                            maxProjects: 0
                        })
                        .where(eq(usersTable.stripeCustomerId, customerId));
                } else if (subscription.status === 'active') {
                    // Check if plan changed? Usually 'invoice.payment_succeeded' handles credit reset.
                    // But if it's a "no payment needed" update (e.g. downgrading to a still-paid plan?), logic is complex.
                    // For typical SaaS, reliance on invoice.payment_succeeded for credits is safer.
                    // We only sync dates here if needed.

                    const startDate = new Date((subscription as any).current_period_start * 1000).toISOString();
                    const endDate = new Date((subscription as any).current_period_end * 1000).toISOString();

                    await db.update(usersTable)
                        .set({
                            subscriptionStartDate: startDate,
                            subscriptionEndDate: endDate
                        })
                        .where(eq(usersTable.stripeCustomerId, customerId));
                }
                break;
            }
        }

        return NextResponse.json({ received: true });

    } catch (e) {
        console.error('Stripe Webhook Error:', e);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
}

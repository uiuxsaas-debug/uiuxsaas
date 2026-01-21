
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { priceId, planName } = await req.json();
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = user.primaryEmailAddress.emailAddress;

    try {
        const userRecord = await db.select().from(usersTable).where(eq(usersTable.email, email));

        // If user doesn't exist, this is edge case as they should be created on signup/login
        // But we handle it if needed - or assume they exist
        if (userRecord.length === 0) {
            return NextResponse.json({ error: 'User not found in DB' }, { status: 404 });
        }

        let customerId = userRecord[0].stripeCustomerId;

        if (!customerId) {
            // Create Stripe customer
            const customer = await stripe.customers.create({
                email: email,
                name: user.fullName || email
            });
            customerId = customer.id;

            // Save to DB
            await db.update(usersTable)
                .set({ stripeCustomerId: customerId })
                .where(eq(usersTable.email, email));
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_URL}/?checkout_success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?ucheckout_canceled=true`,
            metadata: {
                userId: email,
                planName: planName
            }
        });

        return NextResponse.json({ url: session.url });

    } catch (e) {
        console.error('Stripe Checkout Error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const email = user.primaryEmailAddress.emailAddress;

    try {
        const userRecord = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (userRecord.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const customerId = userRecord[0].stripeCustomerId;

        if (!customerId) {
            return NextResponse.json({ error: 'No billing account found' }, { status: 404 });
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/billing`,
        });

        return NextResponse.json({ url: session.url });

    } catch (e: any) {
        console.error('Create Portal Error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

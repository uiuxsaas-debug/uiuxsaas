import React from 'react';
import Header from '@/app/_shared/Header';
import ManageSubscriptionButton from './_components/ManageSubscriptionButton';
import { AuraBackground } from '@/components/ui/aura-background';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/config/db';
import { usersTable } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { PLAN_LIMITS, PLANS } from '@/config/plans';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, Calendar, Zap, AlertCircle } from 'lucide-react';

export default async function BillingPage() {
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
        return <div>Please log in</div>;
    }

    const email = user.primaryEmailAddress.emailAddress;
    const userRecord = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (userRecord.length === 0) {
        return <div>User not found</div>;
    }

    const userData = userRecord[0];
    const planName = (userData.plan || 'free') as keyof typeof PLAN_LIMITS;
    const plan = PLANS.find(p => p.slug === planName);
    const credits = userData.credits || 0;
    const maxCredits = PLAN_LIMITS[planName]?.maxCredits ?? 0;

    // Format Dates
    const startDate = userData.subscriptionStartDate ? new Date(userData.subscriptionStartDate).toLocaleDateString() : 'N/A';
    const endDate = userData.subscriptionEndDate ? new Date(userData.subscriptionEndDate).toLocaleDateString() : 'N/A';

    // Calculate Next Monthly Reset for Yearly Plans
    let nextMonthlyReset = 'N/A';
    if (userData.subscriptionStartDate && planName !== 'free') {
        const start = new Date(userData.subscriptionStartDate);
        const now = new Date();
        const billingDay = start.getDate();

        let nextReset = new Date(now.getFullYear(), now.getMonth(), billingDay);
        if (nextReset < now) {
            nextReset = new Date(now.getFullYear(), now.getMonth() + 1, billingDay);
        }
        nextMonthlyReset = nextReset.toLocaleDateString();
    }

    // Progress
    const percentage = maxCredits > 0 ? Math.min(100, Math.max(0, (credits / maxCredits) * 100)) : 0;

    return (
        <div className="relative min-h-screen w-full bg-[#030303] selection:bg-yellow-500/30 text-white">
            <AuraBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/20 to-[#030303]/90 pointer-events-none z-[1]" />

            <div className="relative z-10 flex flex-col min-h-screen pt-20">
                <Header />

                <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
                        <p className="text-gray-400">Manage your plan, credits, and billing details.</p>
                    </div>

                    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                        {/* Current Plan Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Current Plan</p>
                                    <h2 className="text-2xl font-bold capitalize text-white flex items-center gap-2">
                                        {planName}
                                        {planName !== 'free' && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full border border-yellow-500/20 font-medium">Active</span>}
                                    </h2>
                                </div>
                                <div className="p-2 bg-white/5 rounded-lg text-yellow-500">
                                    <Zap className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>{maxCredits.toLocaleString()} Credits / month</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>{planName === 'team' ? 'Priority Support' : 'Standard Support'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span>Code Export {planName === 'free' ? 'Locked' : 'Available'}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <Button asChild className="w-full bg-white hover:bg-gray-200 text-black font-semibold">
                                    <Link href="/#pricing">Upgrade / Change Plan</Link>
                                </Button>
                                {planName !== 'free' && (
                                    <ManageSubscriptionButton />
                                )}
                            </div>
                        </div>

                        {/* Usage & Credits Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Credit Usage</p>
                                        <h2 className="text-2xl font-bold text-yellow-500">{credits.toLocaleString()} <span className='text-sm text-gray-400 font-normal'>available</span></h2>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                </div>

                                {/* Progress Bar: Shows USED credits. 
                                    If maxCredits is 1000 and user has 200 left, used is 800 (80%).
                                    Bar should be 80% full. 
                                */}
                                {(() => {
                                    const usedCredits = maxCredits - credits;
                                    const usedPercentage = maxCredits > 0 ? (usedCredits / maxCredits) * 100 : 0;

                                    return (
                                        <>
                                            <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden relative">
                                                <div
                                                    className="bg-yellow-500 h-full rounded-full transition-all duration-500"
                                                    style={{ width: `${usedPercentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 mb-6">
                                                <span>{usedPercentage.toFixed(0)}% used</span>
                                                <span>{maxCredits.toLocaleString()} total</span>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 flex items-center gap-2"><Calendar className="w-3 h-3" /> Cycle Started</span>
                                    <span className="text-white font-mono">{startDate}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 flex items-center gap-2"><Calendar className="w-3 h-3" /> Next Reset</span>
                                    <span className="text-white font-mono">{nextMonthlyReset}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 flex items-center gap-2"><AlertCircle className="w-3 h-3" /> Expiration</span>
                                    <span className="text-white font-mono">{endDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction / Footer Info */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">Need help with billing? <a href="mailto:support@uiuxsaas.com" className="text-yellow-500 hover:underline">Contact Support</a></p>
                    </div>
                </main>
            </div>
        </div>
    );
}

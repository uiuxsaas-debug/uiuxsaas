"use client"
import React, { useState } from 'react'
import { Check, Zap, Info, Loader2 } from 'lucide-react'
import { PLANS } from '@/config/plans';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface PricingTier {
    name: string;
    tagline: string;
    badge?: string;
    badgeColor?: string;
    price: {
        monthly: number;
        yearly: number;
    };
    priceLabel?: string;
    credits: {
        monthly: number;
        messages: number;
    };
    features: Array<{
        text: string;
        hasInfo?: boolean;
    }>;
    buttonText: string;
    buttonStyle: 'default' | 'primary' | 'outline';
    popular?: boolean;
    configSlug: string; // Add slug to map to config
}

const pricingTiers: PricingTier[] = [
    {
        name: 'Lite',
        tagline: 'Good for trying out',
        badge: '30% OFF APPLIED',
        badgeColor: 'bg-orange-500/20 text-orange-400',
        price: { monthly: 7, yearly: 6 },
        credits: { monthly: 2000, messages: 40 },
        features: [
            { text: '2 projects' },
            { text: 'Unlimited code exports', hasInfo: true },
            { text: 'Unlimited Figma exports', hasInfo: true },
            { text: 'Export to AI builders', hasInfo: true },
        ],
        buttonText: 'Upgrade to Lite',
        buttonStyle: 'default',
        configSlug: 'lite'
    },
    {
        name: 'Starter',
        tagline: 'For higher limits',
        badge: '30% OFF APPLIED',
        badgeColor: 'bg-orange-500/20 text-orange-400',
        price: { monthly: 20, yearly: 16 },
        credits: { monthly: 7500, messages: 150 },
        features: [
            { text: '5 projects' },
            { text: 'Purchase additional credits', hasInfo: true },
            { text: 'Unlimited code exports', hasInfo: true },
            { text: 'Unlimited Figma exports', hasInfo: true },
            { text: 'Export to AI builders', hasInfo: true },
            { text: 'Share preview links', hasInfo: true },
        ],
        buttonText: 'Upgrade to Starter',
        buttonStyle: 'default',
        configSlug: 'starter'
    },
    {
        name: 'Pro',
        tagline: 'For even higher AI limits',
        badge: 'EARLY BIRD',
        badgeColor: 'bg-green-500/20 text-green-400',
        price: { monthly: 50, yearly: 42 },
        credits: { monthly: 20000, messages: 400 },
        features: [
            { text: 'Unlimited projects' },
            { text: 'Purchase additional credits', hasInfo: true },
            { text: 'Unlimited code exports', hasInfo: true },
            { text: 'Unlimited Figma exports', hasInfo: true },
            { text: 'Export to AI builders', hasInfo: true },
            { text: 'Share preview links', hasInfo: true },
        ],
        buttonText: 'Upgrade to Pro',
        buttonStyle: 'primary',
        popular: true,
        configSlug: 'pro'
    },
    {
        name: 'Team',
        tagline: 'Built for collaboration',
        badge: 'EARLY BIRD',
        badgeColor: 'bg-green-500/20 text-green-400',
        price: { monthly: 57, yearly: 48 },
        priceLabel: '/user/mo',
        credits: { monthly: 30000, messages: 600 },
        features: [
            { text: 'Everything in Pro' },
            { text: 'Team collaboration', hasInfo: true },
            { text: 'Priority support', hasInfo: true },
            { text: 'Centralized billing', hasInfo: true },
        ],
        buttonText: 'Upgrade to Team',
        buttonStyle: 'outline',
        configSlug: 'team'
    },
];

export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(true);
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const router = useRouter();

    const onSubscribe = async (tier: PricingTier) => {
        setLoadingPlan(tier.name);
        try {
            // Find the plan config
            const planConfig = PLANS.find(p => p.slug === tier.configSlug);
            if (!planConfig) {
                toast.error("Plan configuration not found");
                return;
            }

            const priceId = isYearly ? planConfig.price.yearlyPriceId : planConfig.price.priceId;

            if (!priceId || priceId.includes('price_1Q')) {
                // Fallback or explicit error if price IDs are not set
                // toast.error("Checkout is not configured yet for this plan.");
                // For now, let's proceed to see if API handles it (it will fail at Stripe if ID is invalid)
            }

            const response = await axios.post('/api/stripe/checkout', {
                priceId: priceId,
                planName: tier.configSlug
            });

            if (response.data.url) {
                window.location.href = response.data.url;
            } else {
                toast.error("Failed to start checkout");
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again or log in.");
        } finally {
            setLoadingPlan(null);
        }
    }

    return (
        <section className="w-full py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Transparent pricing for everyone
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A fraction of the cost and time of hiring designers or doing it yourself from scratch.
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-center gap-2 mb-12">
                    <button
                        onClick={() => setIsYearly(false)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${!isYearly
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setIsYearly(true)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isYearly
                            ? 'bg-white/10 text-white'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Yearly
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                            2 MONTHS FREE
                        </span>
                    </button>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                    {pricingTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative rounded-2xl p-6 transition-all duration-300 ${tier.popular
                                ? 'bg-gradient-to-b from-[#1a1a1f] to-[#0f0f12] border-2 border-orange-500/50 shadow-lg shadow-orange-500/10'
                                : 'bg-[#111114] border border-white/10 hover:border-white/20'
                                }`}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-orange-500 text-white text-xs px-4 py-1 rounded-full font-semibold uppercase tracking-wide">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Tier Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                                    {tier.badge && (
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${tier.badgeColor}`}>
                                            {tier.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-500 text-sm">{tier.tagline}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">
                                        ${isYearly ? tier.price.yearly : tier.price.monthly}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {tier.priceLabel || '/mo'}
                                    </span>
                                    {!isYearly && tier.price.monthly !== tier.price.yearly && (
                                        <span className="text-gray-600 text-sm line-through ml-2">
                                            ${tier.price.monthly + 5}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-500 text-xs mt-1">
                                    {isYearly ? `billed $${tier.price.yearly * 12} yearly` : 'billed monthly'}
                                </p>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => onSubscribe(tier)}
                                disabled={!!loadingPlan}
                                className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 mb-6 flex items-center justify-center gap-2 ${tier.buttonStyle === 'primary'
                                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-400 hover:to-amber-400 shadow-lg shadow-orange-500/20'
                                    : tier.buttonStyle === 'outline'
                                        ? 'border border-white/20 text-white hover:bg-white/5 hover:border-white/30'
                                        : 'bg-white/10 text-white hover:bg-white/15'
                                    } ${loadingPlan && loadingPlan !== tier.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loadingPlan === tier.name ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Redirecting...
                                    </>
                                ) : (
                                    tier.buttonText
                                )}
                            </button>

                            {/* Credits */}
                            <div className="mb-6 p-3 rounded-lg bg-white/5">
                                <div className="flex items-center gap-2 mb-1">
                                    <Zap className="w-4 h-4 text-yellow-500" />
                                    <span className="text-white font-semibold text-sm">
                                        {tier.credits.monthly.toLocaleString()} AI credits / month
                                    </span>
                                </div>
                                <p className="text-gray-500 text-xs ml-6">
                                    ≈ {tier.credits.messages} messages{tier.name === 'Team' ? ' per seat' : ''}
                                </p>
                            </div>

                            {/* Features */}
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wide mb-3 font-medium">
                                    INCLUDES
                                </p>
                                <ul className="space-y-2.5">
                                    {tier.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2.5 text-sm">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-300">{feature.text}</span>
                                            {feature.hasInfo && (
                                                <Info className="w-3.5 h-3.5 text-gray-600 cursor-help flex-shrink-0" />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

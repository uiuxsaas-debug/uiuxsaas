
export const PLAN_LIMITS = {
    free: {
        maxProjects: 0,
        maxCredits: 0,
        features: {
            exportCode: false,
            prioritySupport: false,
        }
    },
    lite: {
        maxProjects: 3,
        maxCredits: 2000,
        features: {
            exportCode: true,
            prioritySupport: false,
        }
    },
    starter: {
        maxProjects: 5,
        maxCredits: 7500,
        features: {
            exportCode: true,
            prioritySupport: false,
        }
    },
    pro: {
        maxProjects: Infinity,
        maxCredits: 20000,
        features: {
            exportCode: true,
            prioritySupport: false,
        }
    },
    team: {
        maxProjects: Infinity,
        maxCredits: 30000,
        features: {
            exportCode: true,
            prioritySupport: true,
        }
    }
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;

export const PLANS = [
    {
        name: 'Lite',
        slug: 'lite',
        quota: 2000,
        price: {
            monthly: 7,
            yearly: 6,
            priceId: process.env.NEXT_PUBLIC_APPYSCREEN_LITE_MONTHLY,
            yearlyPriceId: process.env.NEXT_PUBLIC_APPYSCREEN_LITE_YEARLY
        }
    },
    {
        name: 'Starter',
        slug: 'starter',
        quota: 7500,
        price: {
            monthly: 20,
            yearly: 16,
            priceId: process.env.NEXT_PUBLIC_APPYSCREEN_STARTER_MONTHLY,
            yearlyPriceId: process.env.NEXT_PUBLIC_APPYSCREEN_STARTER_YEARLY
        }
    },
    {
        name: 'Pro',
        slug: 'pro',
        quota: 20000,
        price: {
            monthly: 50,
            yearly: 42,
            priceId: process.env.NEXT_PUBLIC_APPYSCREEN_PRO_MONTHLY,
            yearlyPriceId: process.env.NEXT_PUBLIC_APPYSCREEN_PRO_YEARLY
        }
    },
    {
        name: 'Team',
        slug: 'team',
        quota: 30000,
        price: {
            monthly: 57,
            yearly: 48,
            priceId: process.env.NEXT_PUBLIC_APPYSCREEN_TEAM_MONTHLY,
            yearlyPriceId: process.env.NEXT_PUBLIC_APPYSCREEN_TEAM_YEARLY
        }
    }
]

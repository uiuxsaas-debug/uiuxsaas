import React from 'react'
import Header from '../_shared/Header'
import PricingSection from '@/components/pricing/PricingSection'
import { AuraBackground } from '@/components/ui/aura-background'

export default function Pricing() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
            {/* Unicorn Studio Aura Background */}
            <AuraBackground />

            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/20 to-[#030303]/90 pointer-events-none z-[1]" />

            {/* Content */}
            <div className="relative z-10 min-h-screen w-full overflow-y-auto">
                <Header />
                <div className="pt-20">
                    <PricingSection />
                </div>
            </div>
        </div>
    )
}
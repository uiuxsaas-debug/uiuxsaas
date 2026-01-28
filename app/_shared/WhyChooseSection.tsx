"use client";

import { Zap, Layout, Code, Clock, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        title: "Lightning Fast Speed",
        description: "Generate weeks of design work in minutes. Skip the blank canvas phase entirely.",
        icon: Zap,
    },
    {
        title: "Infinite Variety",
        description: "Explore thousands of layout possibilities instantly to find the perfect fit for your idea.",
        icon: Layout,
    },
    {
        title: "Production Ready",
        description: "Unlike other tools, get polished designs that developers can implement immediately.",
        icon: Code,
    },
    {
        title: "Save 80% Time",
        description: "Drastically reduce the time from initial concept to final implementation.",
        icon: Clock,
    },
    {
        title: "Team Calibration",
        description: "Enable your entire team to contribute to the product vision with an AI design assistant.",
        icon: Users,
    },
    {
        title: "Creative Control",
        description: "AI handles the heavy lifting while you maintain complete creative direction.",
        icon: Sparkles,
    }
];

export default function WhyChooseSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#FF5200]/5 rounded-[100%] blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="uppercase font-bold text-sm tracking-wider text-[#FF5200] mb-3">
                        Revolutionize Your Process
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
                        Why Build with AppyScreen?
                    </h3>
                    <p className="text-xl text-black/60 leading-relaxed">
                        AppyScreen brings the power of artificial intelligence to your app development workflow, helping you generate professional mobile apps in less time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl bg-white border border-black/5 hover:border-[#FF5200]/20 shadow-lg shadow-black/5 hover:shadow-[#FF5200]/5 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#FF5200]/10 flex items-center justify-center mb-6 group-hover:bg-[#FF5200] transition-colors duration-300">
                                <feature.icon className="w-6 h-6 text-[#FF5200] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h4 className="text-xl font-bold text-black mb-3">
                                {feature.title}
                            </h4>
                            <p className="text-black/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

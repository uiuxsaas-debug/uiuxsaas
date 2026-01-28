"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Play } from 'lucide-react';

export default function Testimonial() {
    return (
        <section className="px-4 sm:px-16 md:px-24 py-8 md:py-16 max-w-7xl mx-auto" id="testimonials">
            <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
                <h3 className="bg-gradient-to-r from-[#FF5200] via-[#FF8F00] to-[#FF5200] text-transparent bg-clip-text animate-gradient text-4xl md:text-5xl font-black leading-tight pb-2">
                    Loved by App Founders
                </h3>
                <p className="text-lg md:text-2xl leading-normal text-black/80">
                    Empowering every step of your journey
                </p>
            </div>

            {/* Use Cases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Card 1: Founders */}
                <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6 text-[#FF5200]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>
                    <h4 className="font-bold text-xl mb-3">For Founders</h4>
                    <p className="text-black/70 leading-relaxed">
                        Validate your startup ideas in minutes. Create professional mockups for pitch decks and investor meetings without hiring a designer.
                    </p>
                </div>

                {/* Card 2: Developers */}
                <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    </div>
                    <h4 className="font-bold text-xl mb-3">For Developers</h4>
                    <p className="text-black/70 leading-relaxed">
                        Skip the design handoff friction. Generate screens and export clean, production-ready React & Tailwind code instantly.
                    </p>
                </div>

                {/* Card 3: Product Managers */}
                <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6 text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                    </div>
                    <h4 className="font-bold text-xl mb-3">For Product Managers</h4>
                    <p className="text-black/70 leading-relaxed">
                        Show, don't just tell. visualize feature requirements instantly and get faster buy-in from stakeholders and your team.
                    </p>
                </div>


                {/* Card 4 - Video Placeholder (kept as a feature highlight) */}
                <div className="bg-black/90 p-8 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow text-white flex flex-col justify-between col-span-1 lg:col-span-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF5200]/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 h-full">
                        <div className="flex-1">
                            <h4 className="font-bold text-2xl mb-2 text-[#FF5200]">See the magic</h4>
                            <p className="text-white/80 leading-relaxed text-lg">
                                Watch how simple it is to go from a single text prompt to a fully editable, multi-screen mobile app design.
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0 cursor-pointer hover:scale-110 transition-transform">
                            <Play size={24} fill="white" className="ml-1" />
                        </div>
                    </div>
                </div>

                {/* Card 5: Agencies */}
                <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-6 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </div>
                    <h4 className="font-bold text-xl mb-3">For Agencies</h4>
                    <p className="text-black/70 leading-relaxed">
                        Deliver concepts 10x faster. Impress clients with rapid iterations and high-fidelity mockups in the first meeting.
                    </p>
                </div>
            </div>
        </section>
    );
}

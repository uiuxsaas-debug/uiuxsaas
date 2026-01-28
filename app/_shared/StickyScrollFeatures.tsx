"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Layout, Code, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function StickyScrollFeatures() {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.defaultMuted = true; // Crucial for some browsers
            videoRef.current.muted = true;
        }
    }, []);

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-black leading-tight mb-6">
                        Generate Production-Ready <span className="text-[#FF5200]">Apps</span>
                    </h2>
                    <p className="text-lg md:text-2xl text-black/70 leading-relaxed">
                        From prompt to functional prototype in seconds. <br className="hidden md:block" />
                        One platform for your entire design workflow.
                    </p>
                </div>

                {/* Main Visual - Solves "Only One Video" by making it the hero */}
                <div className="relative mx-auto max-w-5xl mb-20 group">
                    {/* Ambient Background Glow */}
                    <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-b from-[#FF5200]/20 to-purple-600/20 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>

                    {/* Browser Window Container */}
                    <div className="relative rounded-2xl md:rounded-[2rem] border border-black/5 bg-white shadow-2xl overflow-hidden ring-1 ring-black/5">
                        {/* Browser Header */}
                        <div className="bg-gray-50/90 backdrop-blur border-b border-black/5 px-4 py-3 md:px-6 md:py-4 flex items-center gap-4">
                            <div className="flex gap-2">
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F57] shadow-inner"></div>
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FEBC2E] shadow-inner"></div>
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28C840] shadow-inner"></div>
                            </div>
                            <div className="flex-1 max-w-[60%] mx-auto h-6 md:h-8 bg-white border border-black/5 rounded-md shadow-sm flex items-center justify-center text-[10px] md:text-xs text-gray-400 font-medium tracking-wide">
                                appyscreen.com
                            </div>
                        </div>

                        {/* Video Player */}
                        <div className="relative aspect-video bg-slate-50">
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                className="w-full h-full object-cover"
                            >
                                <source src="/video.mp4" type="video/mp4" />
                            </video>

                            {/* Overlay Gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Feature Grid - Explaining the capabilities shown in the video */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                    {/* Feature 1 */}
                    <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-gray-50/50 hover:bg-orange-50/50 transition-colors duration-300 border border-transparent hover:border-orange-100/50">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center mb-6 text-[#FF5200]">
                            <Layout className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-3">Text to Design</h3>
                        <p className="text-black/60 leading-relaxed">
                            Describe your app idea in plain language and watch as AI generates a complete, multi-screen UI instantly.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-gray-50/50 hover:bg-orange-50/50 transition-colors duration-300 border border-transparent hover:border-orange-100/50">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center mb-6 text-[#FF5200]">
                            <Sparkles className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-3">AI Iteration</h3>
                        <p className="text-black/60 leading-relaxed">
                            Refine your designs with simple commands. Ask for a dark mode, new colors, or layout changes in seconds.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-gray-50/50 hover:bg-orange-50/50 transition-colors duration-300 border border-transparent hover:border-orange-100/50">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center mb-6 text-[#FF5200]">
                            <Code className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-3">Export Code</h3>
                        <p className="text-black/60 leading-relaxed">
                            Don't just get images. Export clean, production-ready React/Tailwind code ready for your developers.
                        </p>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 md:mt-20 flex justify-center">
                    <Link
                        className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#FF5200] rounded-full hover:bg-[#e04800] hover:scale-105 shadow-xl shadow-orange-500/20"
                        href="/dashboard"
                    >
                        Start Design
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

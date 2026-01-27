"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function StickyScrollFeatures() {
    // Refs for text sections to track visibility
    const feature1Ref = useRef(null);
    const feature2Ref = useRef(null);

    // Check if sections are in view (with some margin to trigger earlier/later)
    const isFeature1InView = useInView(feature1Ref, { margin: "-50% 0px -50% 0px" });
    const isFeature2InView = useInView(feature2Ref, { margin: "-50% 0px -50% 0px" });

    // Determine active feature (default to 1 if neither or 1 is active, 2 if 2 is active)
    // We want a sticky feel, so if we scroll past 1, 2 becomes active.
    const activeFeature = isFeature2InView ? 2 : 1;

    return (
        <section className="relative flex flex-col w-full pb-0 md:pb-8 bg-white" id="features">
            <div className="flex flex-col gap-2 text-center w-full max-w-7xl mx-auto mb-10 md:mb-16">
                <h2 className="flex flex-wrap justify-center text-black max-w-7xl text-2xl md:text-5xl lg:text-6xl font-black leading-tight mx-auto mb-4 px-4 sm:px-16 md:px-24">
                    Generate Production-Ready <span className="text-[#FF5200] mx-3">Apps</span>
                </h2>
                <p className="flex justify-center text-lg md:text-2xl text-center text-black/70 max-w-7xl mx-auto px-4 sm:px-16 md:px-24 mb-4">
                    From prompt to prototype in seconds
                </p>
            </div>

            {/* Mobile Layout (Stacked) */}
            <div className="block xl:hidden px-4 sm:px-16 md:px-24 pb-20">
                <div className="mb-20">
                    <h2 className="text-2xl font-black text-black mb-4">AI App Generator</h2>
                    <p className="text-base md:text-lg text-black/70 mb-4">
                        Instantly generate high-fidelity mobile app screens. No more starting from blank canvas.
                    </p>
                    <Link className="text-base leading-normal text-[#FF5200] font-bold flex flex-row items-center mb-8 hover:opacity-80 transition-opacity" href="/dashboard">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <div className="w-full">
                        <div className="bg-gradient-to-t rounded-2xl from-[#FF5200]/10 to-[#FF8F00]/10 border-2 border-[#FF5200]/20 p-3">
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-black/5 shadow-xl">
                                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                                    <source src="https://d2r1ah7oa8r7ja.cloudfront.net/videos/ui-20-2-with-section-edits-overview_5.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-0">
                    <h2 className="text-2xl font-black text-black mb-4">Text to Design</h2>
                    <p className="text-base md:text-lg text-black/70 mb-4">
                        Simply describe your idea in plain text, and our AI will generate the full mobile app UI, ready for development.
                    </p>
                    <Link className="text-base leading-normal text-[#FF5200] font-bold flex flex-row items-center mb-8 hover:opacity-80 transition-opacity" href="/dashboard">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <div className="w-full">
                        <div className="bg-gradient-to-t rounded-2xl from-[#FF5200]/10 to-[#FF8F00]/10 border-2 border-[#FF5200]/20 p-3">
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-black/5 shadow-xl">
                                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                                    <source src="https://d2r1ah7oa8r7ja.cloudfront.net/videos/mobile-autoflow-1-1000-1mbps.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Sticky Layout */}
            <div className="relative hidden xl:flex justify-between max-w-7xl mx-auto w-full px-10">
                {/* Left Column: Text Sections */}
                <div className="w-[40%] flex flex-col py-[10vh]">
                    {/* Feature 1 Trigger */}
                    <div ref={feature1Ref} className="h-[80vh] flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: activeFeature === 1 ? 1 : 0.3 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-black text-black">AI App Generator</h2>
                            <p className="text-lg text-black/70 max-w-sm mt-6 leading-relaxed">
                                Instantly generate high-fidelity mobile app screens. No more starting from blank canvas.
                            </p>
                            <Link className="text-base leading-normal text-[#FF5200] font-bold max-w-sm mt-6 flex flex-row items-center hover:opacity-80 transition-opacity" href="/dashboard">
                                <span>Learn more</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Feature 2 Trigger */}
                    <div ref={feature2Ref} className="h-[80vh] flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: activeFeature === 2 ? 1 : 0.3 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-black text-black">Text to Design</h2>
                            <p className="text-lg text-black/70 max-w-sm mt-6 leading-relaxed">
                                Simply describe your idea in plain text, and our AI will generate the full mobile app UI, ready for development.
                            </p>
                            <Link className="text-base leading-normal text-[#FF5200] font-bold max-w-sm mt-6 flex flex-row items-center hover:opacity-80 transition-opacity" href="/dashboard">
                                <span>Learn more</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Right Column: Sticky Video */}
                <div className="w-[50%] h-screen sticky top-0 flex items-center justify-end">
                    <div className="relative w-full h-full mr-[-5vw] xl:mr-[-150px]">
                        {/* Video 1 Container */}
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 1, x: 0 }}
                            animate={{
                                opacity: activeFeature === 1 ? 1 : 0,
                                x: activeFeature === 1 ? 0 : 20
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <div className="h-full w-full bg-gradient-to-l rounded-l-[40px] from-[#FF5200]/5 to-[#FF8F00]/5 border-y-2 border-l-2 border-[#FF5200]/20 p-2 lg:p-3 pr-0 overflow-hidden">
                                <div className="relative h-full w-full overflow-hidden rounded-l-3xl border border-black/5 shadow-2xl bg-white">
                                    <video autoPlay muted loop playsInline className="w-full h-full object-cover object-left-top">
                                        <source src="https://d2r1ah7oa8r7ja.cloudfront.net/videos/ui-20-2-with-section-edits-overview_5.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </motion.div>

                        {/* Video 2 Container */}
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{
                                opacity: activeFeature === 2 ? 1 : 0,
                                x: activeFeature === 2 ? 0 : 20
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <div className="h-full w-full bg-gradient-to-l rounded-l-[40px] from-[#FF5200]/5 to-[#FF8F00]/5 border-y-2 border-l-2 border-[#FF5200]/20 p-2 lg:p-3 pr-0 overflow-hidden">
                                <div className="relative h-full w-full overflow-hidden rounded-l-3xl border border-black/5 shadow-2xl bg-white">
                                    <video autoPlay muted loop playsInline className="w-full h-full object-cover object-left-top">
                                        <source src="https://d2r1ah7oa8r7ja.cloudfront.net/videos/mobile-autoflow-1-1000-1mbps.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

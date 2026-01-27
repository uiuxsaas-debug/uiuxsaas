"use client";

import React from 'react';
import Link from 'next/link';

export default function StorySection() {
    return (
        <section className="px-4 sm:px-16 md:px-24 py-8 md:py-16 max-w-7xl mx-auto">
            <Link href="/about" className="block rounded-3xl bg-gradient-to-r from-[#FF5200] via-[#FF8F00] to-[#FF5200] bg-[length:200%_auto] animate-gradient text-white py-8 md:py-20 px-4 md:px-20 lg:px-32 relative hover:opacity-95 transition-opacity">
                <div className="max-w-4xl flex flex-col gap-6 mx-auto relative z-10">
                    <h2 className="text-4xl sm:text-5xl font-black text-center">Our Story</h2>
                    <p className="text-lg text-center text-balance">
                        <span className="hidden md:inline">
                            At the forefront of AI and design, we are a team of passionate innovators dedicated to transforming the creative process. Our mission is to empower designers and product teams with cutting-edge tools that enhance creativity, streamline workflows, and bring ideas to life faster than ever before.
                        </span>
                        <span className="md:hidden">
                            We're innovators in AI and design, empowering designers and product teams with cutting-edge tools. Join us in redefining design possibilities.
                        </span>
                    </p>

                    <div className="md:hidden flex justify-center mt-4">
                        {/* Mobile avatars placeholder */}
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-xl border-2 border-white/20 bg-white/10" />
                            ))}
                        </div>
                    </div>
                </div>

                <button className="hidden md:block mx-auto py-2 px-6 text-white font-semibold border-2 border-white w-fit rounded-full hover:bg-white/10 bg-transparent mt-10 relative z-10">
                    Learn More
                </button>

                {/* Desktop floating avatars (Placeholders) */}
                <div className="hidden md:block absolute inset-0 pointer-events-none">
                    <div className="absolute left-[10%] top-[20%] animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm" />
                    </div>
                    <div className="absolute right-[15%] top-[15%] animate-pulse delay-100">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm" />
                    </div>
                    <div className="absolute left-[20%] bottom-[20%] animate-pulse delay-200">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm" />
                    </div>
                    <div className="absolute right-[10%] bottom-[30%] animate-pulse delay-300">
                        <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm" />
                    </div>
                </div>
            </Link>
        </section>
    );
}

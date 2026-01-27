"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Play } from 'lucide-react';

export default function Testimonial() {
    return (
        <section className="px-4 sm:px-16 md:px-24 py-8 md:py-16 max-w-7xl mx-auto" id="testimonials">
            <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
                <h3 className="bg-gradient-to-r from-[#FF5200] via-[#FF8F00] to-[#FF5200] text-transparent bg-clip-text animate-gradient text-4xl md:text-5xl font-black leading-tight pb-2">
                    Our Users Love Us
                </h3>
                <p className="text-lg md:text-2xl leading-normal text-black/80">
                    Hear what our community is saying
                </p>
            </div>

            <div className="p-6 sm:p-8 md:p-16 flex flex-col md:flex-row gap-8 rounded-3xl bg-gray-50 mb-10 border border-black/5 items-center justify-between relative overflow-hidden">
                <div className="w-full flex flex-col gap-4 z-10">
                    <div className="relative h-12 w-48 mb-2">
                        {/* Placeholder avatars since we don't have the specific assets */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="absolute top-0 w-10 h-10 rounded-full border-2 border-white bg-gray-200 shadow-sm animate-pulse"
                                style={{ left: `${i * 30}px`, zIndex: i }}
                            />
                        ))}
                    </div>
                    <h3 className="font-bold text-[#FF5200] text-5xl">
                        <span className="inline-block tabular-nums tracking-wider">300,000</span>
                        <span>+</span>
                    </h3>
                    <p className="text-black/70 font-medium">We are creating a AppyScreen Community, be part of it</p>
                </div>
                <Link href="/signup" className="font-bold bg-[#FF5200] text-white rounded-full py-3 px-8 hover:bg-[#e04800] transition-colors shadow-lg shadow-[#FF5200]/20 whitespace-nowrap z-10">
                    Start for free
                </Link>
            </div>

            {/* Testimonial Grid (Simulated Masonry) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">AL</div>
                        <div>
                            <div className="font-bold text-sm">Anne-Laure Joliot</div>
                            <div className="text-xs text-black/60">Design Manager</div>
                        </div>
                    </div>
                    <div className="flex text-[#FF5200] mb-2 gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#FF5200" strokeWidth={0} />)}
                    </div>
                    <p className="text-sm text-black/80 leading-relaxed">
                        I feel I told all that in the video already!
                        1. workflow : receiving a brief and going straight to hifi prototypes with AppyScreen so basically skipping the wireframes stage.
                        2. most valuable : the content suggestions based on the prompt.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">MD</div>
                        <div>
                            <div className="font-bold text-sm">Matthew Denune</div>
                            <div className="text-xs text-black/60">Founder</div>
                        </div>
                    </div>
                    <div className="flex text-[#FF5200] mb-2 gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#FF5200" strokeWidth={0} />)}
                    </div>
                    <p className="text-sm text-black/80 leading-relaxed">
                        I absolutely love using AppyScreen—it’s a game-changer for UI/UX design! The AI-powered features make designing intuitive and efficient.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">AA</div>
                        <div>
                            <div className="font-bold text-sm">Ahmed Abdo</div>
                            <div className="text-xs text-black/60">Product Manager</div>
                        </div>
                    </div>
                    <div className="flex text-[#FF5200] mb-2 gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#FF5200" strokeWidth={0} />)}
                    </div>
                    <p className="text-sm text-black/80 leading-relaxed">
                        I found you on Google. AppyScreen has absolutely blown me away! Far more than any other AI-assisted design tool. It's like magic.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">BS</div>
                        <div>
                            <div className="font-bold text-sm">Blake S.</div>
                            <div className="text-xs text-black/60">Co-Founder</div>
                        </div>
                    </div>
                    <div className="flex text-[#FF5200] mb-2 gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#FF5200" strokeWidth={0} />)}
                    </div>
                    <p className="text-sm text-black/80 leading-relaxed">
                        Payment issues and wasn't sure if AppyScreen would have good understanding of design principles. But it proved me wrong!
                    </p>
                </div>

                {/* Card 5 - Video Placeholder */}
                <div className="bg-black/90 p-6 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow text-white flex flex-col justify-between">
                    <div className="w-full aspect-video bg-white/10 rounded-lg mb-4 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <Play size={20} fill="white" className="ml-1" />
                        </div>
                    </div>
                    <div>
                        <div className="flex text-[#FF5200] mb-2 gap-0.5">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#FF5200" strokeWidth={0} />)}
                        </div>
                        <p className="text-sm text-white/90 italic mb-2">"It has been an absolute game-changer for my workflow."</p>
                        <div className="font-bold text-xs text-white/60">- Omar Ali</div>
                    </div>
                </div>

                {/* Card 6 */}
                <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">AS</div>
                        <div>
                            <div className="font-bold text-sm">Ashton Sims</div>
                            <div className="text-xs text-black/60">Founder</div>
                        </div>
                    </div>
                    <div className="flex text-[#FF5200] mb-2 gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#FF5200" strokeWidth={0} />)}
                    </div>
                    <p className="text-sm text-black/80 leading-relaxed">
                        We never had a designer at my job because of budget. Well now, a good prompt does the job.
                    </p>
                </div>
            </div>

            <div className="flex justify-center">
                <Link href="/testimonials" className="group px-6 py-2 bg-[#FF5200] rounded-full text-white font-medium flex gap-2 hover:bg-[#e04800] transition-colors items-center shadow-lg shadow-[#FF5200]/20">
                    See all testimonials <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}

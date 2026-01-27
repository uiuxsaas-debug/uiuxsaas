"use client";

import Image from 'next/image';

export default function WhyChooseSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 lg:px-12 sm:px-[100px] py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-11 items-center">
            <div className="order-2 lg:order-1 relative">
                {/* Placeholder for the image if it doesn't exist, utilizing a gray block for now or a generic placeholder */}
                <div className="w-full flex justify-center relative rounded-2xl overflow-hidden shadow-2xl shadow-[#FF5200]/10 border border-black/5 bg-gray-100 aspect-[4/3]">
                    <div className="absolute inset-0 flex items-center justify-center text-black/20 font-medium">
                        UI Preview Image
                    </div>
                    {/* 
                     <Image 
                        alt="Why UX Pilot?" 
                        width={600} 
                        height={400} 
                        src="/assets/images/what-is-uxpilot.png" 
                        className="object-cover"
                     />
                     */}
                </div>
            </div>

            <div className="flex flex-col gap-5 order-1 lg:order-2 text-left">
                <h2 className="uppercase font-prosemibold text-sm sm:text-base bg-gradient-to-r from-[#FF5200] via-[#FF8F00] to-[#FF5200] text-transparent bg-clip-text animate-gradient w-fit">
                    Revolutionize Your UX Process
                </h2>
                <h2 className="text-3xl md:text-5xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF5200] to-orange-600 pb-2">
                    Why Choose AI-Powered UX Design?
                </h2>
                <p className="text-base sm:text-lg text-black/70 mt-2 leading-relaxed">
                    AppyScreen brings the power of artificial intelligence to your design workflow, helping you create <strong>better user experiences in less time</strong>. Our AI-enhanced platform transforms how teams approach <strong>UX research, design, and validation</strong>:
                </p>
                <ul className="text-base text-black/80 list-disc pl-5 space-y-3 mt-4 marker:text-[#FF5200]">
                    <li>Save <strong>countless hours</strong> on repetitive design tasks while maintaining complete creative control.</li>
                    <li>Get <strong>data-driven insights</strong> that help validate your design decisions and improve user satisfaction.</li>
                    <li>Unlike other AI tools, get <strong>truly flexible designs</strong> that precisely follow your requirements.</li>
                    <li>Reduce the time from concept to implementation by <strong>up to 80%</strong>.</li>
                    <li>Enable your entire team to contribute to the UX process with an <strong>AI assistant</strong>.</li>
                </ul>
            </div>
        </section>
    );
}

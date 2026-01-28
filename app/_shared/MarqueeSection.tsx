"use client";

import React from 'react';
import Link from 'next/link';

export default function MarqueeSection() {
    return (
        <section className="w-full relative pt-10 pb-0 overflow-hidden">
            <div className="relative w-full items-center mt-0 mb-20 md:mb-32">
                <Link className="absolute -bottom-4 flex w-full mx-auto items-center z-[10]" href="/signup">
                    <div className="flex items-center px-4 py-2 rounded-full shadow-md mx-auto border-2 border-orange-200 hover:border-[#FF5200] transition-colors group">
                        <img src="/assets/icons/Generate_D.svg" className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" alt="Generate icon" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <p className="text-[#FF5200] group-hover:text-[#FF5200] text-base font-semibold transition-colors">Made in AppyScreen</p>
                    </div>
                </Link>

                {/* Marquee Container */}
                <div
                    className="marquee-container flex overflow-hidden p-2 flex-row"
                    style={{
                        '--duration': '80s',
                        '--gap': '1rem',
                        gap: 'var(--gap)'
                    } as React.CSSProperties}
                >
                    {/* Define images once */}
                    {[0, 1].map((_, containerIndex) => (
                        <div
                            key={containerIndex}
                            className="marquee-item flex flex-shrink-0 justify-around flex-row animate-marquee"
                            aria-hidden={containerIndex === 1}
                        >
                            {[
                                "/thumbnail/img1.png",
                                "/thumbnail/img2.png",
                                "/thumbnail/img3.png",
                                "/thumbnail/img4.png",
                                "/thumbnail/img5.png"
                            ].map((src, index) => (
                                <div key={`${containerIndex}-${index}`} className="relative mx-1" style={{ height: '360px' }}>
                                    <img
                                        alt={`Showcase ${index}`}
                                        height="360"
                                        className="shadow-custom-1 rounded-lg border border-black/10 object-cover h-full w-auto"
                                        src={src}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee var(--duration) linear infinite;
                }
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(calc(-100% - var(--gap))); }
                }
                /* Hide scrollbar for Chrome, Safari and Opera */
                .marquee-container::-webkit-scrollbar {
                  display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .marquee-container {
                  -ms-overflow-style: none;  /* IE and Edge */
                  scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </section>
    );
}

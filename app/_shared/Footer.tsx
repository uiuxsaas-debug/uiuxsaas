"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="w-full border-t border-white/10 bg-black py-10 px-6 text-white relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-10">
                {/* Logo - Full width on mobile, 1 col on md+ */}
                <div className="col-span-2 md:col-span-1">
                    <Link href={'/'} className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
                        <Image
                            src="/logo.png"
                            alt="AppyScreen Logo"
                            width={32}
                            height={32}
                            className="object-contain w-8 h-8"
                        />
                        <h3 className="text-xl font-bold font-sans tracking-tight">
                            <span className="text-[#FF5200]">Appy</span><span className="font-light text-white">Screen</span>
                        </h3>
                    </Link>
                    <p className="text-white/60 text-sm mb-6 max-w-xs leading-relaxed">
                        The fastest AI UI generator for developers and founders.
                    </p>

                    {/* Solid Button */}
                    <Link href="/dashboard">
                        <button
                            className="px-5 py-2.5 rounded-lg text-white text-sm font-bold shadow-lg shadow-[#FF5200]/20 hover:shadow-[#FF5200]/40 transition-all font-sans transform hover:-translate-y-0.5 bg-[#FF5200] hover:bg-[#e04800]"
                        >
                            Get started
                        </button>
                    </Link>
                </div>

                {/* Product Column */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Product</h4>
                    <ul className="text-white/60 text-sm space-y-3">
                        <li>
                            <button onClick={() => scrollToSection("features")} className="hover:text-[#FF5200] transition-colors text-left">
                                Features
                            </button>
                        </li>
                        <li>
                            <Link href="/pricing" className="hover:text-[#FF5200] transition-colors">
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Company Column */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Company</h4>
                    <ul className="text-white/60 text-sm space-y-3">
                        <li>
                            <Link href="/privacy-policy" className="hover:text-[#FF5200] transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms-of-service" className="hover:text-[#FF5200] transition-colors">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href="/cookie-policy" className="hover:text-[#FF5200] transition-colors">
                                Cookie Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Features Column */}
                {/* <div>
                    <h4 className="font-semibold mb-4 text-white">Features</h4>
                    <ul className="text-white/60 text-sm space-y-3">
                        <li>
                            <button onClick={() => scrollToSection("templates")} className="hover:text-[#FF5200] transition-colors text-left">
                                Templates
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection("ui-generation")} className="hover:text-[#FF5200] transition-colors text-left">
                                UI Generation
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection("pricing")} className="hover:text-[#FF5200] transition-colors text-left">
                                Code Export
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection("pricing")} className="hover:text-[#FF5200] transition-colors text-left">
                                Mobile Apps
                            </button>
                        </li>
                    </ul>
                </div> */}
            </div>

            {/* Bottom */}
            <div className="border-t border-white/10 mt-10 flex flex-row justify-center items-center gap-4 text-xs text-white/50">
                <p>© {new Date().getFullYear()} AppyScreen. All rights reserved.</p>
            </div>
        </footer>
    );
}

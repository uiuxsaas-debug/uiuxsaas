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
        <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-xl py-10 px-6 text-white relative z-10 shadow-[0_-10px_40px_-15px_rgba(255,255,255,0.05)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
                {/* Logo - Full width on mobile, 1 col on md+ */}
                <div className="col-span-1 md:col-span-1">
                    <Link href={'/'} className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
                        <Image
                            src="/logo.png"
                            alt="UIUX Mock Logo"
                            width={32}
                            height={32}
                            className="object-contain w-8 h-8"
                        />
                        <h3 className="text-xl font-bold font-sans tracking-tight">
                            <span className="text-yellow-500">Appy</span><span className="font-light text-white">Screen</span>
                        </h3>
                    </Link>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">
                        The fastest AI UI generator for developers and founders.
                    </p>

                    {/* Solid Button */}
                    <Link href="/dashboard">
                        <button
                            className="px-5 py-2.5 rounded-lg text-black text-sm font-bold shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all font-sans transform hover:-translate-y-0.5"
                            style={{ background: "linear-gradient(to right, #eab308, #d97706)" }}
                        >
                            Get started
                        </button>
                    </Link>
                </div>

                {/* Product Column */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Product</h4>
                    <ul className="text-gray-400 text-sm space-y-3">
                        <li>
                            <button onClick={() => scrollToSection("how-it-works")} className="hover:text-yellow-500 transition-colors text-left">
                                How it works
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection("features")} className="hover:text-yellow-500 transition-colors text-left">
                                Features
                            </button>
                        </li>
                        <li>
                            <Link href="/pricing" className="hover:text-yellow-500 transition-colors">
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Company Column */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Company</h4>
                    <ul className="text-gray-400 text-sm space-y-3">
                        <li>
                            <Link href="/privacy-policy" className="hover:text-yellow-500 transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="hover:text-yellow-500 transition-colors">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href="/cookie-policy" className="hover:text-yellow-500 transition-colors">
                                Cookie Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Features Column */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Features</h4>
                    <ul className="text-gray-400 text-sm space-y-3">
                        <li>
                            <button onClick={() => scrollToSection("templates")} className="hover:text-yellow-500 transition-colors text-left">
                                Templates
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection("ui-generation")} className="hover:text-yellow-500 transition-colors text-left">
                                UI Generation
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection("pricing")} className="hover:text-yellow-500 transition-colors text-left">
                                Code Export
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection("pricing")} className="hover:text-yellow-500 transition-colors text-left">
                                Mobile Apps
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>© {new Date().getFullYear()} AppyScreen. All rights reserved.</p>
                <p>Made with ❤️ by 10x engineering team</p>
            </div>
        </footer>
    );
}

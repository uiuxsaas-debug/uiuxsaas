import React from 'react'
import { ArrowUp, Code2, Smartphone, Wand2 } from 'lucide-react'

function Features() {
    return (
        <section id="features" className="py-24 px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 mb-6">
                    Turn your ideas into reality
                </h2>
                <p className="text-black/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Sleek makes design generation incredibly simple so you can focus on what
                    matters - your vision. No matter your background or expertise.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="group">
                    <div className="bg-white border border-black/5 rounded-3xl p-8 h-[300px] mb-8 overflow-hidden relative flex items-center justify-center group-hover:border-[#FF5200]/20 transition-all duration-500 shadow-lg shadow-black/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5200]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Mobile Screens Mockup */}
                        <div className="flex gap-4 transform group-hover:scale-105 transition-transform duration-500">
                            {/* Left Screen */}
                            <div className="w-24 h-48 bg-white rounded-xl border border-black/10 p-2 transform -rotate-6 mt-8 opacity-60 shadow-md">
                                <div className="w-full h-full bg-black/5 rounded-lg skeleton-loading" />
                            </div>
                            {/* Center Screen */}
                            <div className="w-28 h-56 bg-white rounded-2xl border border-[#FF5200]/30 p-2 z-10 shadow-2xl shadow-[#FF5200]/10">
                                <div className="w-full h-4 bg-black/5 rounded-full mb-2" />
                                <div className="w-full h-24 bg-gradient-to-br from-[#FF5200]/20 to-[#FF5200]/5 rounded-lg mb-2" />
                                <div className="space-y-2">
                                    <div className="w-3/4 h-2 bg-black/5 rounded-full" />
                                    <div className="w-1/2 h-2 bg-black/5 rounded-full" />
                                </div>
                            </div>
                            {/* Right Screen */}
                            <div className="w-24 h-48 bg-white rounded-xl border border-black/10 p-2 transform rotate-6 mt-8 opacity-60 shadow-md">
                                <div className="w-full h-full bg-black/5 rounded-lg skeleton-loading" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-black group-hover:text-[#FF5200] transition-colors">Generate with AI</h3>
                        <p className="text-black/60 leading-relaxed">
                            Describe your app or attach an image and watch your design come to life.
                        </p>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="group">
                    <div className="bg-white border border-black/5 rounded-3xl p-8 h-[300px] mb-8 relative flex items-center justify-center group-hover:border-[#FF5200]/20 transition-all duration-500 shadow-lg shadow-black/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5200]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Prompt Input Mockup */}
                        <div className="w-full max-w-[280px] bg-white rounded-2xl border border-black/10 p-4 transform group-hover:-translate-y-2 transition-transform duration-500 shadow-xl">
                            <p className="text-black/60 text-sm mb-8 font-mono">
                                Make the design in <span className="text-[#FF5200]">Duolingo vibes</span> and add a Profile screen<span className="animate-pulse">|</span>
                            </p>
                            <div className="flex justify-between items-end">
                                <div className="text-black/40">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF5200] to-orange-600 flex items-center justify-center">
                                    <ArrowUp className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-black group-hover:text-[#FF5200] transition-colors">Easy edits</h3>
                        <p className="text-black/60 leading-relaxed">
                            Iterate and refine your designs quickly to build the interface that works best for you.
                        </p>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="group">
                    <div className="bg-white border border-black/5 rounded-3xl p-8 h-[300px] mb-8 relative flex items-center justify-center overflow-hidden group-hover:border-[#FF5200]/20 transition-all duration-500 shadow-lg shadow-black/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5200]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Code Editor Mockup */}
                        <div className="w-full max-w-[320px] bg-gray-50 rounded-xl border border-black/10 shadow-2xl p-4 font-mono text-xs transform group-hover:scale-105 transition-transform duration-500">
                            <div className="flex gap-1.5 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                            </div>
                            <div className="space-y-1.5 opacity-80">
                                <div className="text-purple-600">export default function <span className="text-[#FF5200]">App()</span> {'{'}</div>
                                <div className="pl-4 text-blue-600">return (</div>
                                <div className="pl-8 text-black/60">&lt;div className="<span className="text-green-600">flex flex-col</span>"&gt;</div>
                                <div className="pl-12 text-black/60">&lt;Header /&gt;</div>
                                <div className="pl-12 text-black/60">&lt;Hero /&gt;</div>
                                <div className="pl-8 text-black/60">&lt;/div&gt;</div>
                                <div className="pl-4 text-blue-600">)</div>
                                <div className="text-purple-600">{'}'}</div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-black group-hover:text-[#FF5200] transition-colors">Export your design</h3>
                        <p className="text-black/60 leading-relaxed">
                            Export your designs to code or Figma and bring your app to life.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features

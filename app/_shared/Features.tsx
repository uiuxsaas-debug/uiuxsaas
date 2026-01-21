import React from 'react'
import { ArrowUp, Code2, Smartphone, Wand2 } from 'lucide-react'

function Features() {
    return (
        <section id="features" className="py-24 px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                    Turn your ideas into reality
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Sleek makes design generation incredibly simple so you can focus on what
                    matters - your vision. No matter your background or expertise.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="group">
                    <div className="bg-[#111114] border border-white/5 rounded-3xl p-8 h-[300px] mb-8 overflow-hidden relative flex items-center justify-center group-hover:border-yellow-500/20 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Mobile Screens Mockup */}
                        <div className="flex gap-4 transform group-hover:scale-105 transition-transform duration-500">
                            {/* Left Screen */}
                            <div className="w-24 h-48 bg-[#1a1a1f] rounded-xl border border-white/10 p-2 transform -rotate-6 mt-8 opacity-60">
                                <div className="w-full h-full bg-white/5 rounded-lg skeleton-loading" />
                            </div>
                            {/* Center Screen */}
                            <div className="w-28 h-56 bg-[#1a1a1f] rounded-2xl border border-yellow-500/30 p-2 z-10 shadow-2xl shadow-yellow-500/10">
                                <div className="w-full h-4 bg-white/10 rounded-full mb-2" />
                                <div className="w-full h-24 bg-gradient-to-br from-yellow-500/20 to-amber-500/5 rounded-lg mb-2" />
                                <div className="space-y-2">
                                    <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                                    <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                                </div>
                            </div>
                            {/* Right Screen */}
                            <div className="w-24 h-48 bg-[#1a1a1f] rounded-xl border border-white/10 p-2 transform rotate-6 mt-8 opacity-60">
                                <div className="w-full h-full bg-white/5 rounded-lg skeleton-loading" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors">Generate with AI</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Describe your app or attach an image and watch your design come to life.
                        </p>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="group">
                    <div className="bg-[#111114] border border-white/5 rounded-3xl p-8 h-[300px] mb-8 relative flex items-center justify-center group-hover:border-yellow-500/20 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Prompt Input Mockup */}
                        <div className="w-full max-w-[280px] bg-[#1a1a1f] rounded-2xl border border-white/10 p-4 transform group-hover:-translate-y-2 transition-transform duration-500 shadow-xl">
                            <p className="text-gray-400 text-sm mb-8 font-mono">
                                Make the design in <span className="text-yellow-500">Duolingo vibes</span> and add a Profile screen<span className="animate-pulse">|</span>
                            </p>
                            <div className="flex justify-between items-end">
                                <div className="text-gray-600">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center">
                                    <ArrowUp className="w-4 h-4 text-black" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors">Easy edits</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Iterate and refine your designs quickly to build the interface that works best for you.
                        </p>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="group">
                    <div className="bg-[#111114] border border-white/5 rounded-3xl p-8 h-[300px] mb-8 relative flex items-center justify-center overflow-hidden group-hover:border-yellow-500/20 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Code Editor Mockup */}
                        <div className="w-full max-w-[320px] bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl p-4 font-mono text-xs transform group-hover:scale-105 transition-transform duration-500">
                            <div className="flex gap-1.5 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                            </div>
                            <div className="space-y-1.5 opacity-80">
                                <div className="text-purple-400">export default function <span className="text-yellow-500">App()</span> {'{'}</div>
                                <div className="pl-4 text-blue-400">return (</div>
                                <div className="pl-8 text-gray-400">&lt;div className="<span className="text-green-400">flex flex-col</span>"&gt;</div>
                                <div className="pl-12 text-gray-400">&lt;Header /&gt;</div>
                                <div className="pl-12 text-gray-400">&lt;Hero /&gt;</div>
                                <div className="pl-8 text-gray-400">&lt;/div&gt;</div>
                                <div className="pl-4 text-blue-400">)</div>
                                <div className="text-purple-400">{'}'}</div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors">Export your design</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Export your designs to code or Figma and bring your app to life.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features

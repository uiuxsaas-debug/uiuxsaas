import React from 'react'
import { Play } from 'lucide-react'

function ProductDemo() {
    return (
        <section className="py-24 px-4 md:px-8 relative z-10 max-w-6xl mx-auto text-center">
            {/* Label */}
            <div className="flex items-center justify-center gap-2 mb-4">
                <Play className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-yellow-500 text-sm font-medium uppercase tracking-wider">Product Demo</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">
                See Sleek in Action
            </h2>

            {/* Video Placeholder Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-[#0a0a0f] aspect-video w-full max-w-5xl mx-auto group cursor-pointer">
                {/* Background Pattern Simulating the screenshot */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

                {/* Center Content Mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Phone Mockup in Center */}
                    <div className="w-[200px] h-[400px] bg-[#1a1a1f] rounded-3xl border-4 border-[#2a2a30] shadow-2xl flex flex-col items-center p-2 relative">
                        <div className="w-20 h-4 bg-black rounded-full mb-4 absolute top-2" />
                        {/* Fake UI Content */}
                        <div className="w-full h-full bg-white rounded-2xl overflow-hidden pt-8 px-2 space-y-2">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <div className="w-8 h-8 rounded-full bg-gray-100" />
                                <div className="w-20 h-4 bg-gray-100 rounded-md" />
                            </div>
                            <div className="w-full h-32 bg-orange-50 rounded-xl mb-2" />
                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-20 bg-blue-50 rounded-xl" />
                                <div className="h-20 bg-green-50 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <div className="w-20 h-20 rounded-full bg-orange-600 flex items-center justify-center shadow-2xl shadow-orange-600/50 transform group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDemo

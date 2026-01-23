import React from 'react'
import { Play } from 'lucide-react'

function ProductDemo() {
    return (
        <section className="py-24 px-4 md:px-8 relative z-10 max-w-6xl mx-auto text-center">
            {/* Label */}
            <div className="flex items-center justify-center gap-2 mb-4">
                <Play className="w-3 h-3 text-[#FF5200] fill-[#FF5200]" />
                <span className="text-[#FF5200] text-sm font-medium uppercase tracking-wider">Product Demo</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-16">
                See Sleek in Action
            </h2>

            {/* Video Placeholder Container */}
            <div className="relative rounded-2xl overflow-hidden border border-black/5 shadow-2xl shadow-black/10 bg-white aspect-video w-full max-w-5xl mx-auto group cursor-pointer">
                {/* Background Pattern Simulating the screenshot */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

                {/* Center Content Mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Phone Mockup in Center */}
                    <div className="w-[200px] h-[400px] bg-white rounded-3xl border-4 border-gray-100 shadow-xl flex flex-col items-center p-2 relative">
                        <div className="w-20 h-4 bg-gray-100 rounded-full mb-4 absolute top-2" />
                        {/* Fake UI Content */}
                        <div className="w-full h-full bg-gray-50 rounded-2xl overflow-hidden pt-8 px-2 space-y-2">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200" />
                                <div className="w-20 h-4 bg-gray-200 rounded-md" />
                            </div>
                            <div className="w-full h-32 bg-orange-100 rounded-xl mb-2" />
                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-20 bg-blue-100 rounded-xl" />
                                <div className="h-20 bg-green-100 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
                    <div className="w-20 h-20 rounded-full bg-[#FF5200] flex items-center justify-center shadow-2xl shadow-[#FF5200]/50 transform group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDemo

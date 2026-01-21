import React from 'react'
import Image from 'next/image'

function Testimonial() {
    return (
        <section className="py-24 px-4 md:px-8 relative z-10 max-w-4xl mx-auto text-center">
            {/* Quote Mark Decoration - optional */}
            {/* <div className="text-6xl text-yellow-500/20 font-serif mb-4">"</div> */}

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed mb-10">
                "I was stuck waiting on a designer for weeks, burning through
                my budget before even launching. Sleek gave me <span className="text-yellow-500 font-semibold">complete control</span> to move at my own pace. Now I'm <span className="text-yellow-500 font-semibold">getting first customers</span> instead of still going back and forth on mockups."
            </h3>

            <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                        {/* Avatar placeholder if no image */}
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">JM</div>
                    </div>
                </div>
                <div className="text-left">
                    <p className="text-white text-sm font-medium">Jordan M.</p>
                    <p className="text-yellow-500 text-xs">Solo Founder</p>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
            </div>
        </section>
    )
}

export default Testimonial

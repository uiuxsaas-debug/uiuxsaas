import React from 'react'
import Image from 'next/image'

function Testimonial() {
    return (
        <section className="py-24 px-4 md:px-8 relative z-10 max-w-4xl mx-auto text-center">
            {/* Quote Mark Decoration - optional */}
            {/* <div className="text-6xl text-[#FF5200]/20 font-serif mb-4">"</div> */}

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black leading-relaxed mb-10">
                "I was stuck waiting on a designer for weeks, burning through
                my budget before even launching. Sleek gave me <span className="text-[#FF5200] font-semibold">complete control</span> to move at my own pace. Now I'm <span className="text-[#FF5200] font-semibold">getting first customers</span> instead of still going back and forth on mockups."
            </h3>

            <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5200] to-orange-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white overflow-hidden relative">
                        {/* Avatar placeholder if no image */}
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs font-bold text-black/70">JM</div>
                    </div>
                </div>
                <div className="text-left">
                    <p className="text-black text-sm font-medium">Jordan M.</p>
                    <p className="text-[#FF5200] text-xs">Solo Founder</p>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
                <div className="w-1.5 h-1.5 rounded-full bg-black/10"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5200]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-black/10"></div>
            </div>
        </section>
    )
}

export default Testimonial

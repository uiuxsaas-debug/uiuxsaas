import React from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const templates = [
    {
        title: "Calories Tracker",
        gradient: "from-orange-500/20 to-red-500/20",
        screens: ["bg-orange-500", "bg-white", "bg-orange-100"]
    },
    {
        title: "Sleep Tracker",
        gradient: "from-indigo-500/20 to-purple-500/20",
        screens: ["bg-[#1a1b4b]", "bg-[#1a1b4b]", "bg-[#2d2a75]"]
    },
    {
        title: "Expense Tracker",
        gradient: "from-blue-500/20 to-cyan-500/20",
        screens: ["bg-gray-900", "bg-gray-900", "bg-gray-800"]
    },
    {
        title: "Guided Meditation App",
        gradient: "from-emerald-500/20 to-teal-500/20",
        screens: ["bg-stone-50", "bg-stone-50", "bg-stone-100"]
    }
]

function Templates() {
    return (
        <section id="templates" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Explore templates</h2>
                    <p className="text-gray-400">Customize beautiful pre-built app design templates.</p>
                </div>
                <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    View all <ArrowRight className="w-4 h-4" />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template, index) => (
                    <div key={index} className="group cursor-pointer">
                        <div className="bg-[#111114] border border-white/5 rounded-3xl p-8 h-[320px] mb-4 relative overflow-hidden group-hover:border-yellow-500/20 transition-all duration-500">
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />

                            {/* Phone Mockups Container */}
                            <div className="flex gap-4 justify-center items-center h-full pt-8 group-hover:scale-105 transition-transform duration-500">
                                {/* Left Phone */}
                                <div className="w-32 h-64 bg-[#0a0a0f] rounded-2xl border border-white/10 p-2 transform -rotate-3 translate-y-4 opacity-60">
                                    <div className={`w-full h-full rounded-xl opacity-80 ${template.screens[0]}`} />
                                </div>
                                {/* Center Phone (Main) */}
                                <div className="w-36 h-72 bg-[#0a0a0f] rounded-3xl border border-white/20 p-2 z-10 shadow-2xl shadow-black">
                                    <div className={`w-full h-full rounded-2xl ${template.screens[1]}`} />
                                </div>
                                {/* Right Phone */}
                                <div className="w-32 h-64 bg-[#0a0a0f] rounded-2xl border border-white/10 p-2 transform rotate-3 translate-y-4 opacity-60">
                                    <div className={`w-full h-full rounded-xl opacity-80 ${template.screens[2]}`} />
                                </div>
                            </div>
                        </div>
                        <h3 className="text-white font-medium group-hover:text-yellow-500 transition-colors">
                            {template.title}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Templates

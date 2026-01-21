import React from 'react'
import { Link, Wand2, Download, MessageSquareText } from 'lucide-react'

function HowItWorks() {
    return (
        <section id="how-it-works" className='py-24 px-4 md:px-8 relative z-10 max-w-7xl mx-auto'>
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                    How it works
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    From idea to production-ready code in 3 simple steps
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 relative'>
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent z-0" />

                {/* Step 1 */}
                <div className='relative z-10 flex flex-col items-center text-center group'>
                    <div className='w-32 h-32 rounded-full bg-[#111114] border border-white/5 flex items-center justify-center mb-8 shadow-2xl relative group-hover:border-yellow-500/30 transition-colors duration-500'>
                        {/* Number Badge */}
                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center font-bold text-black border-4 border-[#030303] z-20">
                            1
                        </div>
                        <div className="absolute inset-0 bg-yellow-500/5 rounded-full blur-xl group-hover:bg-yellow-500/10 transition-colors duration-500" />
                        <MessageSquareText className="w-10 h-10 text-white group-hover:text-yellow-500 transition-colors duration-300" />
                    </div>
                    <h3 className='text-xl font-bold text-white mb-3'>Describe your idea</h3>
                    <p className='text-gray-400 leading-relaxed text-sm md:text-base max-w-xs'>
                        Simply describe your app concept in plain English or use a template to get started.
                    </p>
                </div>

                {/* Step 2 */}
                <div className='relative z-10 flex flex-col items-center text-center group'>
                    <div className='w-32 h-32 rounded-full bg-[#111114] border border-white/5 flex items-center justify-center mb-8 shadow-2xl relative group-hover:border-yellow-500/30 transition-colors duration-500'>
                        {/* Number Badge */}
                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center font-bold text-black border-4 border-[#030303] z-20">
                            2
                        </div>
                        <div className="absolute inset-0 bg-yellow-500/5 rounded-full blur-xl group-hover:bg-yellow-500/10 transition-colors duration-500" />
                        <Wand2 className="w-10 h-10 text-white group-hover:text-yellow-500 transition-colors duration-300 animate-pulse" />
                    </div>
                    <h3 className='text-xl font-bold text-white mb-3'>AI Generation</h3>
                    <p className='text-gray-400 leading-relaxed text-sm md:text-base max-w-xs'>
                        Our intelligent AI creates professional UI layouts, components, and styles instantly.
                    </p>
                </div>

                {/* Step 3 */}
                <div className='relative z-10 flex flex-col items-center text-center group'>
                    <div className='w-32 h-32 rounded-full bg-[#111114] border border-white/5 flex items-center justify-center mb-8 shadow-2xl relative group-hover:border-yellow-500/30 transition-colors duration-500'>
                        {/* Number Badge */}
                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center font-bold text-black border-4 border-[#030303] z-20">
                            3
                        </div>
                        <div className="absolute inset-0 bg-yellow-500/5 rounded-full blur-xl group-hover:bg-yellow-500/10 transition-colors duration-500" />
                        <Download className="w-10 h-10 text-white group-hover:text-yellow-500 transition-colors duration-300" />
                    </div>
                    <h3 className='text-xl font-bold text-white mb-3'>Export & Ship</h3>
                    <p className='text-gray-400 leading-relaxed text-sm md:text-base max-w-xs'>
                        Download the full React/Tailwind code or export to Figma to continue your workflow.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks

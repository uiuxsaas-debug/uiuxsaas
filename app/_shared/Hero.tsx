"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { ChevronRight, Loader, Send, Star, Zap, ImageIcon } from 'lucide-react'
import { suggestions } from '@/data/constant'
import { useCreateProject } from '@/hooks/use-create-project';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'

function Hero() {
    const [userInput, setUserInput] = useState<string>('')
    const { createProject, loading } = useCreateProject();
    const [open, setOpen] = useState(false)
    const [emblaRef] = useEmblaCarousel({ loop: true })

    const onCreateProject = () => {
        createProject(userInput, 'mobile'); // Always mobile
        setOpen(false)
    }

    return (
        <div className='flex flex-col items-center w-full bg-white overflow-hidden pt-24 md:pt-32 relative'>

            {/* Background Decoration */}
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none'>
                <svg
                    viewBox="0 0 1440 914"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute top-0 left-0 w-full h-full opacity-60"
                >
                    <g>
                        <path d="M1553 338.047C1553 338.047 1291.94 304.49 1128.5 338.047C959.847 372.675 718.093 344.881 562.5 258.9C492.929 220.455 303.804 171.521 126.208 137.815C-37.5648 106.732 -145 137.815 -145 137.815V746.5C-145 746.5 291.445 696.279 623 696.279C954.555 696.279 1553 789.974 1553 789.974V338.047Z" fill="url(#paint0_linear_hero)" fillOpacity="0.2" />
                    </g>
                    <g>
                        <path d="M-114 240.047C-114 240.047 147.061 206.49 310.5 240.047C479.153 274.675 720.907 346.881 876.5 260.9C946.071 222.455 1135.2 173.521 1312.79 139.815C1476.56 108.732 1584 139.815 1584 139.815V566.5C1584 566.5 1147.56 698.279 816 698.279C484.445 698.279 -91.5 590.5 -91.5 590.5L-114 240.047Z" fill="url(#paint1_linear_hero)" fillOpacity="0.2" />
                    </g>
                    <g>
                        <path d="M484 285C484 384.291 403.411 464.782 304 464.782C204.589 464.782 124 384.291 124 285C124 185.71 243.724 124 343.135 124C442.546 124 484 185.71 484 285Z" fill="#FACC15" fillOpacity="0.12" />
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_hero" x1="1553" y1="521.652" x2="-145" y2="521.652" gradientUnits="userSpaceOnUse">
                            <stop offset="0.595" stopColor="#FF5200" />
                            <stop offset="1" stopColor="#FF9E59" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_hero" x1="-114" y1="523.652" x2="1584" y2="523.652" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FF5200" />
                            <stop offset="0.385" stopColor="#FF9E59" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>


            {/* Main Content Container */}
            <div className='px-4 md:px-8 lg:px-16 xl:px-24 flex flex-col items-center max-w-7xl mx-auto w-full relative z-10'>

                {/* Badge */}
                <div className='flex items-center justify-center w-full mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700'>
                    <div className="inline-flex items-center justify-center rounded-full px-4 py-1.5 bg-orange-50 border border-orange-100/50 shadow-sm">
                        <span className="text-sm font-semibold text-[#FF5200] tracking-wide whitespace-nowrap">
                            ✨ Generate beautiful app designs with AI
                        </span>
                    </div>
                </div>

                {/* Heading */}
                {/* Heading */}
                <h1 className='text-3xl md:text-6xl lg:text-7xl font-black text-center leading-[1.1] tracking-tight text-gray-900 mb-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100'>
                    Design mobile apps <span className='text-[#FF5200] inline-block relative'>
                        in minutes
                        <Zap className="inline-block ml-1 w-8 h-8 md:w-12 md:h-12 text-[#FF5200] fill-[#FF5200] rotate-12" />
                    </span>
                </h1>

                {/* Subheading */}
                {/* Subheading */}
                <p className='text-center text-gray-500 text-base md:text-xl max-w-2xl leading-relaxed font-medium mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200'>
                    Go from idea to beautiful app mockups in minutes by chatting with AI.
                </p>

                {/* CTA & Social Proof */}
                {/* Direct Generation Input Box */}
                <div className='w-full max-w-2xl bg-white p-2 rounded-2xl shadow-2xl shadow-orange-500/10 border border-orange-100 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 relative z-20'>
                    <InputGroup className='w-full bg-white z-10 rounded-xl shadow-inner border border-gray-200 focus-within:border-[#FF5200] focus-within:ring-2 focus-within:ring-[#FF5200]/10 transition-all duration-300'>
                        <InputGroupTextarea
                            className="w-full bg-transparent px-4 py-3 text-base transition-[color,box-shadow] outline-none placeholder:text-gray-400 font-medium text-gray-900 min-h-[120px] resize-none"
                            placeholder="I want to design an app that..."
                            value={userInput}
                            onChange={(event) => setUserInput(event.target?.value)}
                        />
                        <InputGroupAddon align="block-end" className="p-2 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center rounded-b-xl">
                            <div className="flex gap-2">
                                {suggestions.slice(0, 2).map((s, i) => (
                                    <button key={i} onClick={() => setUserInput(s.description)} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-500 hover:text-[#FF5200] hover:border-[#FF5200]/30 transition-colors">
                                        {s.name}
                                    </button>
                                ))}
                            </div>
                            <InputGroupButton
                                className="bg-[#FF5200] text-white font-semibold hover:bg-[#e04800] px-4 py-2 h-auto rounded-lg hover:text-white text-sm transition-all shadow-md shadow-orange-500/20"
                                disabled={loading}
                                onClick={onCreateProject}
                            >
                                {loading ? <Loader className='animate-spin h-4 w-4' /> : <span className='flex items-center gap-2'>Design it <Zap size={14} className="fill-white" /></span>}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </div>

            </div>

            {/* Marquee Section */}
            <div className="relative w-full items-center mt-10 mb-8 md:mb-16 z-10">
                <div className="marquee-container flex overflow-hidden py-2 flex-row" style={{ '--duration': '50s', '--gap': '1.5rem', gap: 'var(--gap)' } as React.CSSProperties}>
                    {[1, 2].map((group) => (
                        <div key={group} className="marquee-item flex flex-shrink-0 flex-row gap-4 animate-marquee">
                            {[
                                "/thumbnail/1.jpeg",
                                "/thumbnail/2.png",
                                "/thumbnail/3.jpeg",
                                "/thumbnail/4.png",
                                "/thumbnail/5.jpeg",
                                "/thumbnail/6.jpeg",
                                "/thumbnail/7.jpeg",
                                "/thumbnail/8.jpeg",
                                "/thumbnail/9.jpeg",
                                "/thumbnail/10.jpeg"
                            ].map((item, index) => (
                                <div key={`${group}-${index}`} className="relative h-[160px] md:h-[280px] w-[240px] md:w-[420px] rounded-2xl overflow-hidden bg-white border-2 border-gray-100 shadow-lg">
                                    <img
                                        alt={`App showcase ${index}`}
                                        className="object-contain w-full h-full"
                                        src={item}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee var(--duration) linear infinite;
                }
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(calc(-100% - var(--gap))); }
                }
                 /* Hide scrollbar for Chrome, Safari and Opera */
                .marquee-container::-webkit-scrollbar {
                    display: none;
                }
                 /* Hide scrollbar for IE, Edge and Firefox */
                .marquee-container {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    )
}

export default Hero
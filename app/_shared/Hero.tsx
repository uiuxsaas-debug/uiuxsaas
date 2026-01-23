"use client"
import React, { useState } from 'react'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { ChevronRight, Loader, Send } from 'lucide-react'
import { suggestions } from '@/data/constant'
import { useCreateProject } from '@/hooks/use-create-project';

function Hero() {

    const [userInput, setUserInput] = useState<string>('')
    const { createProject, loading } = useCreateProject();

    const onCreateProject = () => {
        createProject(userInput, 'mobile'); // Always mobile
    }

    return (
        <div className='px-4 md:px-8 lg:px-16 xl:px-24 mt-20 md:mt-30 flex flex-col items-center max-w-7xl mx-auto w-full'>
            {/* Badge */}
            <div className='flex items-center justify-center w-full mb-2'>
                <div className="group relative inline-flex items-center justify-center rounded-full px-3 py-1 transition-all duration-500 ease-out bg-white border border-black/10 shadow-sm hover:border-[#FF5200]/30 hover:shadow-md">
                    ✨ <hr className="mx-2 h-3 w-px shrink-0 bg-black/20" />
                    <span className="text-[10px] md:text-xs font-medium text-black group-hover:text-[#FF5200] transition-colors">
                        AI-Powered Design
                    </span>
                    <ChevronRight className="ml-1 size-3 stroke-black transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:stroke-[#FF5200]" />
                </div>
            </div>

            {/* Heading */}
            <h2 className='text-3xl md:text-5xl lg:text-6xl font-black text-center leading-tight tracking-tight text-black mb-2'>
                Design High Quality <span className='text-[#FF5200]'>Mobile Apps</span>
            </h2>

            {/* Subheading */}
            <p className='text-center mt-0 sm:mt-5  text-black/60 text-xs md:text-sm max-w-md leading-relaxed font-medium mb-4'>
                Transform your ideas into stunning, intuitive mobile experiences powered by AI. ✨
            </p>

            {/* Input Box */}
            <div className="flex w-full mt-0 sm:mt-5 justify-center px-2 md:px-0 mb-6">
                <InputGroup className='w-full max-w-2xl bg-white z-10 rounded-xl shadow-lg shadow-[#FF5200]/5 border border-black/10 hover:border-[#FF5200]/30 transition-all duration-300'>
                    <InputGroupTextarea
                        data-slot="input-group-control"
                        className="w-full bg-transparent px-4 py-2 text-sm transition-[color,box-shadow] outline-none placeholder:text-black/40 font-medium text-black min-h-[150px] h-[150px] max-h-[150px] resize-none overflow-y-auto"
                        placeholder="Describe your dream mobile app..."
                        value={userInput}
                        onChange={(event) => setUserInput(event.target?.value)}
                    />
                    <InputGroupAddon align="block-end" className="p-1.5 flex items-center justify-end">
                        <InputGroupButton className="bg-[#FF5200] text-white font-semibold hover:bg-[#e04800] hover:text-white cursor-pointer transition-all shadow-md shadow-[#FF5200]/20 hover:shadow-[#FF5200]/40 px-4 h-8 rounded-lg text-xs min-w-[90px] border-0"
                            disabled={loading}
                            size="sm"
                            onClick={() => onCreateProject()}>
                            {loading ? <Loader className='animate-spin h-3 w-3 text-white' /> : <span className='flex items-center gap-1.5'>Generate <Send size={11} /></span>}
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>

            {/* Inspiration Cards */}
            <div className='grid grid-cols-2 mt-0 sm:mt-5  lg:grid-cols-4 gap-2 md:gap-3 w-full max-w-5xl px-2 md:px-0 pb-6'>
                {suggestions.map((suggestion, index) => (
                    <div key={index}
                        onClick={() => setUserInput(suggestion?.description)}
                        className='group bg-white border border-black/10 rounded-xl p-3 md:p-4 hover:border-[#FF5200] hover:ring-1 hover:ring-[#FF5200]/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-start'
                    >
                        <div className='flex justify-between items-start w-full mb-2'>
                            <div className='w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/5 flex items-center justify-center text-base md:text-lg group-hover:bg-[#FF5200]/10 transition-colors'>
                                {suggestion?.icon}
                            </div>
                            {/* @ts-ignore */}
                            {suggestion.style && (
                                <span className='px-1.5 py-0.5 rounded-full bg-black/5 text-[8px] md:text-[9px] font-medium text-black/50 uppercase tracking-wide border border-black/5 group-hover:border-[#FF5200]/20 group-hover:text-[#FF5200] transition-colors'>
                                    {/* @ts-ignore */}
                                    {suggestion.style}
                                </span>
                            )}
                        </div>

                        <h3 className='font-bold text-black text-xs md:text-sm mb-1 group-hover:text-[#FF5200] transition-colors line-clamp-1'>
                            {suggestion?.name}
                        </h3>

                        <p className='text-[10px] md:text-xs text-black/50 line-clamp-2 leading-relaxed'>
                            {suggestion?.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Hero
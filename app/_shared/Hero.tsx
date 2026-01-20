"use client"
import React, { useState } from 'react'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { ChevronRight, Loader, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { suggestions } from '@/data/constant'
import { useCreateProject } from '@/hooks/use-create-project';

function Hero() {

    const [userInput, setUserInput] = useState<string>('')
    const { createProject, loading } = useCreateProject();

    const onCreateProject = () => {
        createProject(userInput, 'mobile'); // Always mobile
    }

    return (
        <div className='px-4 md:px-12 lg:px-24 xl:px-48 mt-18 md:mt-26 flex flex-col items-center max-w-7xl mx-auto w-full'>
            <div className='flex items-center justify-center w-full mb-4'>
                <div className="group relative inline-flex items-center justify-center rounded-full px-4 py-1.5 transition-all duration-500 ease-out bg-white/5 backdrop-blur-xl border border-white/20 hover:border-white/30">
                    ✨ <hr className="mx-2 h-4 w-px shrink-0 bg-white/20" />
                    <span className="text-xs font-medium text-white/80">
                        AI-Powered Design
                    </span>
                    <ChevronRight className="ml-1 size-3 stroke-white/50 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </div>
            </div>

            <h2 className='text-[28px] md:text-5xl lg:text-6xl font-black text-center leading-tight tracking-tight text-white'>
                Design High Quality <br className='hidden md:block' />
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300'>Mobile App</span>
            </h2>

            <p className='text-center text-white/60 text-sm md:text-lg mt-4 max-w-xl leading-relaxed'>
                Transform your ideas into stunning, intuitive mobile experiences
                powered by AI. ✨
            </p>

            <div className="flex mt-6 w-full justify-center px-2 md:px-0">
                <InputGroup className='w-full max-w-2xl bg-white/5 backdrop-blur-2xl z-10 rounded-2xl shadow-2xl shadow-black/20 border border-white/20 hover:border-white/30 transition-all duration-300 ring-1 ring-white/10'>
                    <InputGroupTextarea
                        data-slot="input-group-control"
                        className="flex field-sizing-content min-h-[60px] md:min-h-[80px] w-full resize-none rounded-t-2xl bg-transparent px-4 py-3 text-base transition-[color,box-shadow] outline-none placeholder:text-white/40 font-medium text-white"
                        placeholder="Describe your dream mobile app..."
                        value={userInput}
                        onChange={(event) => setUserInput(event.target?.value)}
                    />
                    <InputGroupAddon align="block-end" className="p-2 bg-white/5 border-t border-white/10 rounded-b-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
                            <span className="text-xs text-white/70 font-medium">Mobile App</span>
                        </div>
                        <InputGroupButton className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold hover:from-yellow-400 hover:to-amber-400 cursor-pointer transition-all shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 px-5 h-9 rounded-lg text-xs min-w-[110px] border-0"
                            disabled={loading}
                            size="sm"
                            onClick={() => onCreateProject()}>
                            {loading ? <div className="flex items-center justify-center w-full"><Loader className='animate-spin h-4 w-4 text-black' /></div> : <span className='flex items-center gap-2'>Generate <Send size={12} /></span>}
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <div className='flex flex-wrap justify-center gap-2 mt-6 max-w-3xl pb-10'>
                {suggestions.map((suggestion, index) => (
                    <button key={index}
                        className='px-3 py-1.5 border border-white/20 rounded-full 
                        flex items-center gap-1.5 bg-white/5 backdrop-blur-sm z-10 
                        hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all duration-200
                        shadow-sm text-xs font-medium text-white/70 hover:text-white'
                        onClick={() => setUserInput(suggestion?.description)}
                    >
                        <span className="text-base">{suggestion?.icon}</span>
                        <span>{suggestion?.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Hero
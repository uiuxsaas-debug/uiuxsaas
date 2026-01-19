"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { ChevronRight, Loader, PlaneIcon, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { suggestions } from '@/data/constant'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { randomUUID } from "crypto";
import { toast } from 'sonner'
function Hero() {

    const [userInput, setUserInput] = useState<string>()

    const [device, setDevice] = useState<string>('mobile')

    const { user } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onCreateProject = async () => {
        if (!user) {
            router.push('/sign-in');
            return;
        }
        //Create New Project
        if (!userInput) {
            return;
        }
        setLoading(true);
        const projectId = crypto.randomUUID();
        const result = await axios.post('/api/project', {
            userInput: userInput,
            device: device,
            projectId: projectId
        })

        if (result.data?.msg == 'Limit Exceed') {
            toast.error('Already reached 2 project limit!');
            setLoading(false);
            return;
        }
        console.log(result.data);
        setLoading(false);

        //Naviagte to Project Route
        router.push('/project/' + projectId);
    }

    return (
        <div className='px-4 md:px-12 lg:px-24 xl:px-48 mt-4 md:mt-12 flex flex-col items-center max-w-7xl mx-auto w-full'>
            <div className='flex items-center justify-center w-full mb-4'>
                <div className="group relative inline-flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] bg-white border border-gray-100">
                    <span
                        className={cn(
                            "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
                        )}
                        style={{
                            WebkitMask:
                                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "destination-out",
                            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            maskComposite: "subtract",
                            WebkitClipPath: "padding-box",
                        }}
                    />
                    🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                    <AnimatedGradientText className="text-xs font-medium">
                        Introducing Magic UI
                    </AnimatedGradientText>
                    <ChevronRight className="ml-1 size-3 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </div>
            </div>

            <h2 className='text-[28px] md:text-5xl lg:text-6xl font-black text-center leading-tight tracking-tight text-gray-900'>
                Design High Quality <br className='hidden md:block' />
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 animate-gradient'>Website and Mobile App</span>
            </h2>

            <p className='text-center text-gray-600 text-sm md:text-lg mt-4 max-w-xl leading-relaxed'>
                From websites to mobile apps, we turn ideas into intuitive,
                high-impact digital experiences. ✨
            </p>

            <div className="flex mt-6 w-full justify-center px-2 md:px-0">
                <InputGroup className='w-full max-w-2xl bg-white z-10 rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100/50 hover:shadow-purple-500/20 transition-all duration-300 ring-2 ring-white/50 backdrop-blur-xl'>
                    <InputGroupTextarea
                        data-slot="input-group-control"
                        className="flex field-sizing-content min-h-[60px] md:min-h-[80px] w-full resize-none rounded-t-2xl bg-transparent px-4 py-3 text-base transition-[color,box-shadow] outline-none placeholder:text-gray-400 font-medium"
                        placeholder="Describe your dream app or website..."
                        value={userInput}
                        onChange={(event) => setUserInput(event.target?.value)}
                    />
                    <InputGroupAddon align="block-end" className="p-2 bg-gray-50/50 border-t border-gray-100 rounded-b-2xl flex gap-2">
                        <Select defaultValue='mobile' onValueChange={(value) => setDevice(value)}>
                            <SelectTrigger className="w-[110px] bg-white border-gray-200 h-8 text-xs shadow-sm">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="website">Website</SelectItem>
                                <SelectItem value="mobile">Mobile</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputGroupButton className="ml-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-all shadow-md px-4 h-8 rounded-md text-xs font-medium"
                            disabled={loading}
                            size="sm"
                            onClick={() => onCreateProject()}>
                            {loading ? <Loader className='animate-spin h-3 w-3' /> : <span className='flex items-center gap-2'>Generate <div className='p-0.5 bg-white/20 rounded'><Send size={10} /></div></span>}
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <div className='flex flex-wrap justify-center gap-2 mt-6 max-w-3xl pb-10'>
                {suggestions.map((suggestion, index) => (
                    <button key={index}
                        className='px-3 py-1.5 border border-gray-200 rounded-full 
                        flex items-center gap-1.5 bg-white/90 backdrop-blur-sm z-10 
                        hover:bg-purple-50 hover:border-purple-200 hover:scale-105 transition-all duration-200
                        shadow-sm text-xs font-medium text-gray-600 hover:text-purple-700 hover:shadow-md'
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
import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'

export default function Page() {
    return (
        <div className='min-h-screen flex bg-white font-sans'>
            <div className='hidden lg:flex w-1/2 bg-gradient-to-tr from-[#FF5200] to-orange-600 relative p-12 text-white flex-col justify-between overflow-hidden'>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <Link href="/" className="flex items-center gap-2 relative z-10 w-fit hover:opacity-90 transition-opacity">
                    <div className="bg-white rounded-lg p-1.5 shadow-lg shadow-black/10">
                        <Image src="/logo.png" alt="AppyScreen Logo" width={32} height={32} className="w-8 h-8" />
                    </div>
                    <span className='text-2xl font-bold tracking-tight text-white'>AppyScreen</span>
                </Link>

                <div className="relative z-10 max-w-lg">
                    <h1 className='text-5xl font-black leading-tight mb-6'>
                        Start building <br />
                        <span className="text-white/80">for free today.</span>
                    </h1>
                    <p className='text-white/80 text-xl leading-relaxed mb-8'>
                        Create, iterate, and export production-ready mobile app designs with the power of AI.
                    </p>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <div className="flex text-[#FFD700] mb-3 gap-1">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#FFD700" strokeWidth={0} />)}
                        </div>
                        <p className="text-lg font-medium mb-4">"I built my entire MVP UI in one afternoon. This tool is incredible."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                                MK
                            </div>
                            <div>
                                <div className="font-bold">Maya K.</div>
                                <div className="text-sm opacity-70">Startup Founder</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm opacity-60">
                    © 2026 AppyScreen. All rights reserved.
                </div>
            </div>

            <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative'>
                <div className='absolute top-6 left-6 lg:hidden'>
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Image src="/logo.png" alt="AppyScreen Logo" width={32} height={32} className="w-8 h-8" />
                        <h2 className='text-xl font-bold font-sans tracking-tight'><span className='text-[#FF5200]'>Appy</span><span className='font-light text-black'>Screen</span></h2>
                    </Link>
                </div>

                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "w-full max-w-md",
                            card: "shadow-none border-none bg-transparent w-full",
                            headerTitle: "text-3xl font-bold text-black mb-2",
                            headerSubtitle: "text-black/60 text-base",
                            formButtonPrimary: "bg-[#FF5200] hover:bg-[#e04800] text-white py-3",
                            formFieldInput: "rounded-xl border-gray-200 focus:border-[#FF5200] focus:ring-[#FF5200]",
                            footerActionLink: "text-[#FF5200] hover:text-[#e04800]"
                        }
                    }}
                />
            </div>
        </div>
    )
}
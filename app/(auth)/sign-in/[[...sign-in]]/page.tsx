import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import AuthCarousel from '@/app/_shared/AuthCarousel'
import { Star } from 'lucide-react'

export default function Page() {
    return (
        <div className='min-h-screen flex bg-white font-sans'>
            {/* Left Side - Brand Showcase */}
            <div className='hidden lg:flex w-1/2 bg-gradient-to-tr from-[#FF5200] to-orange-600 relative p-12 text-white flex-col justify-between overflow-hidden'>
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 relative z-10 w-fit hover:opacity-90 transition-opacity">
                    <div className="bg-white rounded-lg p-1.5 shadow-lg shadow-black/10">
                        <Image src="/logo.png" alt="AppyScreen Logo" width={32} height={32} className="w-8 h-8" />
                    </div>
                    <span className='text-2xl font-bold tracking-tight text-white'>AppyScreen</span>
                </Link>

                {/* Content */}
                {/* Content */}
                {/* Content */}
                <div className="relative z-10 w-full max-w-xl flex flex-col justify-center flex-1 mx-auto gap-4 py-4">
                    {/* Text header */}
                    <div>
                        <h1 className="text-4xl font-bold leading-tight mb-2">Turn text into apps in seconds.</h1>
                        <p className="text-base text-white/90 leading-relaxed font-medium">Join thousands of founders and designers building the next generation of mobile experiences with AI.</p>
                    </div>

                    {/* Carousel */}
                    <div className="flex-1 flex justify-center items-center w-full">
                        <AuthCarousel />
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-sm opacity-60">
                    © 2026 AppyScreen. All rights reserved.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative'>
                {/* Mobile Logo (Visible only on small screens) */}
                <div className='absolute top-6 left-6 lg:hidden'>
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Image src="/logo.png" alt="AppyScreen Logo" width={32} height={32} className="w-8 h-8" />
                        <h2 className='text-xl font-bold font-sans tracking-tight'><span className='text-[#FF5200]'>Appy</span><span className='font-light text-black'>Screen</span></h2>
                    </Link>
                </div>

                <SignIn
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
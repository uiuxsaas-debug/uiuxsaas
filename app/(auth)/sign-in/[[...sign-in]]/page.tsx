import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
    return (
        <div className='min-h-screen flex flex-col bg-white relative'>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            {/* Top Left Logo */}
            <div className='absolute top-6 left-6 z-20'>
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Image src="/logo.png" alt="AppyScreen Logo" width={36} height={36} className="w-9 h-9" />
                    <h2 className='text-xl font-bold font-sans tracking-tight'><span className='text-[#FF5200]'>Appy</span><span className='font-light text-black'>Screen</span></h2>
                </Link>
            </div>

            {/* Centered Sign In */}
            <div className='flex-1 flex items-center justify-center relative z-10'>
                <SignIn />
            </div>
        </div>
    )
}
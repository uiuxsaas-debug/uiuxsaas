import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-white relative'>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            <div className='mb-8 text-center relative z-10'>
                <Link href="/" className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                    <Image src="/logo.png" alt="AppyScreen Logo" width={48} height={48} className="w-12 h-12" />
                    <h2 className='text-2xl font-bold font-sans tracking-tight'> <span className='text-[#FF5200]'>Appy</span><span className='font-light text-black'>Screen</span></h2>
                </Link>
            </div>
            <div className='relative z-10'>
                <SignUp />
            </div>
        </div>)
}
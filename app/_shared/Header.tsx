"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
    const { user, isLoaded } = useUser();
    return (
        <div className='flex items-center justify-between px-4 py-3 md:px-6 lg:px-8 border-b md:border-none backdrop-blur-xl bg-transparent fixed top-0 w-full z-50'>
            <Link href={'/'}>
                <div className='flex gap-2 items-center hover:scale-105 transition-transform'>
                    <Image src={'/logo.png'} alt='logo' width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
                    <h2 className='text-lg md:text-xl font-bold font-sans tracking-tight'> <span className='text-primary'>UIUX</span> MOCK</h2>
                </div>
            </Link>



            <div className="flex items-center gap-4">
                {!isLoaded ? (
                    <div className="flex gap-4 items-center">
                        <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg hidden md:block"></div>
                        <div className="h-8 w-8 md:h-10 md:w-10 bg-gray-200 animate-pulse rounded-full ring-2 ring-white"></div>
                    </div>
                ) : !user ? (
                    <SignInButton mode='modal'>
                        <Button className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5">Get Started</Button>
                    </SignInButton>
                ) : (
                    <div className='flex items-center gap-4'>
                        <Button variant='ghost' className='hidden md:flex hover:bg-transparent hover:text-primary transition-colors' asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "w-8 h-8 md:w-10 md:h-10 ring-2 ring-white shadow-md active:scale-95 transition-transform"
                            }
                        }} />
                    </div>
                )}
            </div>

        </div>
    )
}

export default Header
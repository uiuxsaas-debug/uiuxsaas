"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
    const { user, isLoaded } = useUser();
    return (
        <div className='flex items-center justify-between px-4 py-3 md:px-6 lg:px-8 fixed top-0 w-full z-50'>
            <Link href={'/'}>
                <div className='flex gap-2 items-center hover:scale-105 transition-transform'>
                    <Image src={'/logo.png'} alt='logo' width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
                    <h2 className='text-lg md:text-xl font-bold font-sans tracking-tight'> <span className='text-yellow-500'>UIUX</span> <span className='font-light text-white'>MOCK</span></h2>
                </div>
            </Link>



            <div className="flex items-center gap-4">
                {!isLoaded ? (
                    <div className="flex gap-4 items-center">
                        <div className="h-10 w-24 bg-white/10 animate-pulse rounded-lg hidden md:block"></div>
                        <div className="h-8 w-8 md:h-10 md:w-10 bg-white/10 animate-pulse rounded-full ring-2 ring-white/20"></div>
                    </div>
                ) : !user ? (
                    <SignInButton mode='modal'>
                        <Button className="rounded-full shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all transform hover:-translate-y-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold border-0 hover:from-yellow-400 hover:to-amber-400">Get Started</Button>
                    </SignInButton>
                ) : (
                    <div className='flex items-center gap-4'>
                        <Button className='hidden md:flex bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold hover:from-yellow-400 hover:to-amber-400 rounded-full shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all transform hover:-translate-y-0.5 border-0' asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "w-9 h-9 ring-2 ring-yellow-500/40 hover:ring-yellow-500 transition-all",
                                userButtonPopoverActionButton__manageAccount: "!text-white",
                                userButtonPopoverActionButton__signOut: "!text-white",
                                userButtonPopoverCard: "bg-black/95 backdrop-blur-xl border border-yellow-500/30 shadow-2xl",
                                userButtonPopoverActionButton: "text-white hover:bg-yellow-500/20 px-3 py-2 rounded-md transition",
                                userButtonPopoverActionButtonText: "text-white",
                                userButtonPopoverActionButtonIcon: "text-white",
                                userButtonPopoverFooter: "bg-black/95 border-t border-yellow-500/20",
                                userPreviewMainIdentifier: "text-white",
                                userPreviewSecondaryIdentifier: "text-white/60",
                                card: "bg-black/95 backdrop-blur-xl text-white border border-yellow-500/30 shadow-2xl",
                                headerTitle: "text-white",
                                headerSubtitle: "text-white/60",
                                navbar: "bg-black/90 backdrop-blur-xl border-r border-yellow-500/20",
                                navbarButton: "text-white hover:bg-yellow-500/20 transition",
                                pageScrollBox: "bg-black/95 backdrop-blur-xl text-white",
                                scrollBox: "bg-black/95",
                                formFieldLabel: "text-white",
                                formFieldInput: "bg-black border border-yellow-500/40 text-white placeholder-white/40 focus:border-yellow-500",
                                formButtonPrimary: "bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow",
                                badge: "bg-yellow-500/20 text-yellow-500",
                                menuList: "bg-black/95 backdrop-blur-xl border border-yellow-500/30",
                                menuItem: "text-white hover:bg-yellow-500/20",
                                menuButton: "text-white hover:bg-yellow-500/20",
                                userButtonPopoverMain: "bg-black/95",
                                userButtonPopoverActions: "bg-black/95",
                                footerAction: "text-white hover:bg-yellow-500/20",
                                footerActionLink: "text-white hover:text-yellow-500",
                                footerActionText: "text-white",
                            },
                            variables: {
                                colorPrimary: "#eab308",
                                colorText: "white",
                                colorBackground: "#0a0a0a",
                                colorInputBackground: "black",
                                colorInputText: "white",
                                colorTextSecondary: "rgba(255,255,255,0.7)",
                                colorDanger: "#ef4444",
                                colorTextOnPrimaryBackground: "black",
                            }
                        }} />
                    </div>
                )}
            </div>

        </div>
    )
}

export default Header
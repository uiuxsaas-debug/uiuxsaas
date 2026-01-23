"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Header() {
    const { user, isLoaded } = useUser();
    const [scrolled, setScrolled] = useState(false);
    const [userDetail, setUserDetail] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (user) {
            getUserDetail();
        }
    }, [user])

    const getUserDetail = async () => {
        const result = await axios.post('/api/user')
        setUserDetail(result.data);
    }

    return (

        <div className={`flex items-center justify-between px-4 py-3 md:px-6 lg:px-8 fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5' : 'bg-transparent'
            }`}>
            <Link href={'/'}>
                <div className='flex gap-2 items-center hover:scale-105 transition-transform'>
                    <Image src={'/logo.png'} alt='logo' width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
                    <h2 className='text-lg md:text-xl font-bold font-sans tracking-tight'> <span className='text-[#FF5200]'>Appy</span><span className='font-light text-black'>Screen</span></h2>
                </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
                <Link
                    href="/#how-it-works"
                    className="text-black hover:text-[#FF5200] transition-colors text-sm font-medium"
                >
                    How it Works
                </Link>
                <Link
                    href="/#pricing"
                    className="text-black hover:text-[#FF5200] transition-colors text-sm font-medium"
                >
                    Pricing
                </Link>
                {userDetail && (
                    <Link
                        href="/dashboard/billing"
                        className="text-black hover:text-[#FF5200] transition-colors text-sm font-medium"
                    >
                        Billing
                    </Link>
                )}
            </nav>

            <div className="flex items-center gap-4">
                {!isLoaded ? (
                    <div className="flex gap-4 items-center">
                        <div className="h-10 w-24 bg-black/5 animate-pulse rounded-lg hidden md:block"></div>
                        <div className="h-8 w-8 md:h-10 md:w-10 bg-black/5 animate-pulse rounded-full ring-2 ring-black/5"></div>
                    </div>
                ) : !user ? (
                    <Button className="rounded-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 bg-[#FF5200] text-white font-semibold border-0 hover:bg-[#e04800]" asChild>
                        <Link href="/sign-in">Get Started</Link>
                    </Button>
                ) : (
                    <div className='flex items-center gap-4'>
                        <Button className='hidden md:flex bg-[#FF5200] text-white font-semibold hover:bg-[#e04800] rounded-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 border-0' asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "w-9 h-9 ring-2 ring-black/10 hover:ring-[#FF5200] transition-all",
                                userButtonPopoverActionButton__manageAccount: "!text-black hover:!text-[#FF5200]",
                                userButtonPopoverActionButton__signOut: "!text-black hover:!text-red-500",
                                userButtonPopoverCard: "bg-white border border-black/10 shadow-xl",
                                userButtonPopoverActionButton: "text-black hover:bg-[#FF5200]/10 px-3 py-2 rounded-md transition",
                                userButtonPopoverActionButtonText: "text-black",
                                userButtonPopoverActionButtonIcon: "text-black/60",
                                userButtonPopoverFooter: "bg-black/5 border-t border-black/5",
                                userPreviewMainIdentifier: "text-black font-semibold",
                                userPreviewSecondaryIdentifier: "text-black/60",
                                card: "bg-white text-black border border-black/10 shadow-xl",
                                headerTitle: "text-black font-bold",
                                headerSubtitle: "text-black/60",
                                navbar: "bg-black/5 border-r border-black/10",
                                navbarButton: "text-black hover:bg-[#FF5200]/10 hover:text-[#FF5200] transition",
                                pageScrollBox: "bg-white text-black",
                                scrollBox: "bg-white",
                                formFieldLabel: "text-black",
                                formFieldInput: "bg-white border border-black/20 text-black placeholder-black/40 focus:border-[#FF5200] focus:ring-[#FF5200]",
                                formButtonPrimary: "bg-[#FF5200] hover:bg-[#e04800] text-white font-semibold shadow",
                                badge: "bg-[#FF5200]/10 text-[#FF5200]",
                                menuList: "bg-white border border-black/10",
                                menuItem: "text-black hover:bg-[#FF5200]/10",
                                menuButton: "text-black hover:bg-[#FF5200]/10",
                                userButtonPopoverMain: "bg-white",
                                userButtonPopoverActions: "bg-white",
                                footerAction: "text-black/80 hover:bg-[#FF5200]/10",
                                footerActionLink: "text-[#FF5200] hover:text-[#e04800]",
                                footerActionText: "text-black/60",
                            },
                        }} />
                    </div>
                )}
            </div>

        </div>
    )
}

export default Header
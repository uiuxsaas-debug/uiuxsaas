"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RefreshDataContext } from '@/context/RefreshDataContext'
import { SettingContext } from '@/context/SettingContext'
import { THEME_NAME_LIST, THEMES } from '@/data/Themes'
import { ProjectType, ScreenConfig } from '@/type/types'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import { Camera, ChevronLeft, ChevronRight, Loader2Icon, Share, Sparkles } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
    projectDetail: ProjectType | undefined,
    screenDescription?: string | undefined,
    takeScreenshot: any,
    screenConfig: ScreenConfig[]
}

function SettingsSection({ projectDetail, screenDescription, takeScreenshot, screenConfig }: Props) {

    const [selectedTheme, setSelectedTheme] = useState('NETFLIX');
    const [projectName, setProjectName] = useState<string>();
    const [userNewScreenInput, setUserNewScreenInput] = useState<string>()
    const { settingsDetail, setSettingDetail } = useContext(SettingContext);
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('Loading..');
    const [isOpen, setIsOpen] = useState(true);

    const { refreshData, setRefreshData } = useContext(RefreshDataContext);
    const { has } = useAuth();
    const hasPremiumAccess = has && has({ plan: 'unlimted' })

    useEffect(() => {
        projectDetail && setProjectName(projectDetail?.projectName);
        setSelectedTheme(projectDetail?.theme as string)
    }, [projectDetail])

    const onThemeSelect = (theme: string) => {
        console.log(theme)
        setSelectedTheme(theme);
        setSettingDetail((prev: any) => ({
            ...prev,
            theme: theme
        }))
    }

    const GenerateNewScreen = async () => {
        if (!userNewScreenInput?.trim()) return;

        try {
            setLoading(true);
            const result = await axios.post('/api/generate-config', {
                projectId: projectDetail?.projectId,
                projectName: projectDetail?.projectName,
                deviceType: projectDetail?.device,
                theme: projectDetail?.theme,
                oldScreenDescription: screenDescription,
                userInput: userNewScreenInput
            });

            setRefreshData({ method: 'screenConfig', date: Date.now() })
            setUserNewScreenInput('')
            toast.success('New screen configuration generated!')
        } catch (e) {
            console.error(e);
            toast.error('Failed to generate screen. Please try again.')
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`relative h-[calc(100vh-80px)] border-r border-yellow-500/20 bg-[#0a0a0f] transition-all duration-300 ease-in-out flex flex-col z-[100] overflow-visible ${isOpen ? 'w-[320px]' : 'w-0'}`}>

            {/* Toggle Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -right-6 top-6 h-6 w-6 rounded-full border border-yellow-500/30 shadow-md z-50 bg-[#0a0a0f] hover:bg-yellow-500/10 text-white p-0"
            >
                {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </Button>

            <div className={`flex-1 overflow-hidden flex flex-col ${!isOpen ? 'invisible' : 'visible'}`}>
                {/* Header Section - Fixed */}
                <div className="p-4 border-b border-yellow-500/20 bg-[#0a0a0f] relative z-10">
                    <div className='space-y-2'>
                        <label className='text-xs font-semibold uppercase text-white/50 tracking-wider'>Project Name</label>
                        <Input
                            placeholder='Project Name'
                            value={projectName}
                            className="bg-white/5 border-yellow-500/20 text-white placeholder:text-white/40 focus:border-yellow-500/50 transition-colors"
                            onChange={(event) => {
                                setProjectName(event.target.value)
                                setSettingDetail((prev: any) => ({
                                    ...prev,
                                    projectName: event.target.value
                                }))
                            }}
                        />
                    </div>
                </div>

                {/* Theme Section - Scrollable */}
                <div className="flex-1 w-full overflow-y-auto p-4">
                    <div className='space-y-3 pb-4'>
                        <label className='text-xs font-semibold uppercase text-white/50 tracking-wider'>Color Theme</label>
                        <div className='grid grid-cols-2 gap-2'>
                            {THEME_NAME_LIST.map((theme, index) => {
                                const isActive = theme === selectedTheme;
                                const colors = THEMES[theme];
                                return (
                                    <div
                                        key={index}
                                        onClick={() => onThemeSelect(theme)}
                                        className={`
                                            cursor-pointer p-2 rounded-lg border transition-all duration-200
                                            hover:border-yellow-500/50 hover:shadow-sm hover:shadow-yellow-500/10
                                            ${isActive ? 'border-yellow-500 bg-yellow-500/10 ring-1 ring-yellow-500/30' : 'border-white/10 bg-white/5'}
                                        `}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className={`text-xs font-medium ${isActive ? 'text-yellow-500' : 'text-white/70'}`}>{theme}</h3>
                                            {isActive && <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />}
                                        </div>
                                        <div className='flex gap-1'>
                                            {[colors.primary, colors.secondary, colors.accent, colors.background].map((color, i) => (
                                                <div
                                                    key={i}
                                                    className="h-3 w-3 rounded-full border border-white/10 shadow-sm"
                                                    style={{ background: color }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Fixed */}
                <div className="border-t border-yellow-500/20 bg-[#0a0a0f] relative z-10">
                    <div className="p-4 pt-3 bg-white/5">
                        <h2 className='text-xs font-semibold uppercase text-white/50 tracking-wider mb-2'>Generate New Screen</h2>
                        <Textarea
                            placeholder='Describe the screen (e.g., "User Profile with charts")'
                            className="bg-[#0a0a0f] border-yellow-500/20 text-white placeholder:text-white/40 mb-2 min-h-[80px] resize-none text-sm focus:border-yellow-500/50"
                            value={userNewScreenInput || ''}
                            onChange={(event) => setUserNewScreenInput(event.target.value)}
                        />
                        <Button
                            size={'sm'}
                            disabled={loading || !userNewScreenInput?.trim()}
                            className='w-full shadow-lg shadow-yellow-500/20 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold border-0'
                            onClick={GenerateNewScreen}
                        >
                            {loading ? <Loader2Icon className='animate-spin' /> : <Sparkles className="w-4 h-4 mr-2" />}
                            Generate With AI
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsSection
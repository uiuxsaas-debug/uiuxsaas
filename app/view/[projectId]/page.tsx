"use client"
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { ProjectType, ScreenConfig } from '@/type/types'
import { toast } from 'sonner'
import Canvas from '@/app/project/[projectId]/_shared/Canvas'
import { SettingContext } from '@/context/SettingContext'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function ViewPublicProject() {
    const { projectId } = useParams();
    const [projectDetail, setProjectDetail] = useState<ProjectType>();
    const [screenConfig, setScreenConfig] = useState<ScreenConfig[]>([]);
    const { setSettingDetail } = useContext(SettingContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (projectId) {
            GetPublicProjectDetail();
        }
    }, [projectId]);

    const GetPublicProjectDetail = async () => {
        try {
            const result = await axios.get('/api/project/public?projectId=' + projectId);
            setProjectDetail(result?.data?.projectDetail);
            setScreenConfig(result?.data?.screenConfig);
            setSettingDetail(result?.data?.projectDetail);
        } catch (error) {
            console.error("Failed to load public project:", error);
            toast.error("Project is private or does not exist");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0f] text-white">Loading Public Project...</div>
    }

    if (!projectDetail) {
        return <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0f] text-white gap-4">
            <h2 className='text-2xl font-bold'>Project Not Found</h2>
            <p className='text-gray-400'>The project you are looking for is private or has been deleted.</p>
            <Button variant={'outline'} asChild><Link href="/">Go Home</Link></Button>
        </div>
    }

    return (
        <div className="bg-[#0a0a0f] min-h-screen flex flex-col">
            {/* View Only Header */}
            <div className='flex items-center justify-between p-3 bg-[#0a0a0f] border-b border-yellow-500/10'>
                <div className='flex gap-2 items-center'>
                    <Image src={'/logo.png'} alt='logo' width={40} height={40} />
                    <h2 className='text-xl font-semibold'> <span className='text-yellow-500'>Appy</span> <span className='font-light text-white'>Screen</span></h2>
                    <span className='ml-4 px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs border border-yellow-500/20'>View Only</span>
                </div>
                <Button asChild className='bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold'>
                    <Link href="/">Create Your Own</Link>
                </Button>
            </div>

            <div className='flex-1 flex overflow-hidden'>
                <Canvas
                    projectDetail={projectDetail}
                    screenConfig={screenConfig}
                    takeScreenshot={undefined}
                    generatingIndices={new Set()}
                    readOnly={true}
                />
            </div>
        </div>
    )
}

export default ViewPublicProject

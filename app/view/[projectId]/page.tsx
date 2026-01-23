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
        return <div className="h-screen w-full flex items-center justify-center bg-white text-black">Loading Public Project...</div>
    }

    if (!projectDetail) {
        return <div className="h-screen w-full flex flex-col items-center justify-center bg-white text-black gap-4">
            <h2 className='text-2xl font-bold'>Project Not Found</h2>
            <p className='text-black/60'>The project you are looking for is private or has been deleted.</p>
            <Button variant={'outline'} asChild><Link href="/">Go Home</Link></Button>
        </div>
    }

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* View Only Header */}
            <div className='flex items-center justify-between p-3 bg-white border-b border-black/5'>
                <div className='flex gap-2 items-center'>
                    <Image src={'/logo.png'} alt='logo' width={40} height={40} />
                    <h2 className='text-xl font-semibold'> <span className='text-[#FF5200]'>Appy</span> <span className='font-light text-black'>Screen</span></h2>
                    <span className='ml-4 px-2 py-0.5 rounded-full bg-[#FF5200]/10 text-[#FF5200] text-xs border border-[#FF5200]/20'>View Only</span>
                </div>
                <Button asChild className='bg-[#FF5200] hover:bg-[#e04800] text-white font-semibold'>
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

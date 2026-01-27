"use client"
import { useProjectList } from '@/hooks/use-project-list';
import { useUser } from '@clerk/nextjs';
import React from 'react'
import ProjectCard from './ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { PLAN_LIMITS } from '@/config/plans';
function ProjectList() {

    const { projectList, loading } = useProjectList();
    const { user } = useUser();
    const [userLimit, setUserLimit] = React.useState<number>(0);

    React.useEffect(() => {
        getUserLimit();
    }, []);

    const getUserLimit = async () => {
        try {
            const result = await axios.post('/api/user');
            const plan = result.data?.plan || 'free';
            // @ts-ignore
            const limit = PLAN_LIMITS[plan]?.maxProjects || 0;
            setUserLimit(limit);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className='px-4 sm:px-8 mx-auto max-w-7xl'>
            {/* Welcome Header */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                <div>
                    <h1 className='text-3xl md:text-4xl font-black text-black tracking-tight mb-2'>
                        Welcome back, <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#FF5200] to-orange-600'>{user?.firstName || 'Creator'}</span>
                    </h1>
                    <p className='text-black/60 font-medium'>Manage your projects and create new designs.</p>
                </div>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5200] text-white rounded-full hover:bg-[#e04800] transition-all font-bold text-sm shadow-lg shadow-[#FF5200]/20 hover:scale-105 active:scale-95 hover:-translate-y-0.5">
                    <Plus className="w-5 h-5" />
                    Create New Project
                </Link>
            </div>

            {/* Empty State */}
            {!loading && projectList?.length == 0 && (
                <div className='p-12 md:p-20 border border-dashed border-black/10 rounded-[32px] flex flex-col items-center justify-center bg-white shadow-sm animate-in zoom-in-95 duration-500'>
                    <div className='h-20 w-20 bg-[#FF5200]/10 rounded-full flex items-center justify-center mb-6 animate-pulse'>
                        <span className='text-4xl'>🎨</span>
                    </div>
                    <h2 className='text-center text-2xl font-bold text-black mb-2'>No Projects Yet</h2>
                    <p className='text-black/50 text-base mb-8 text-center max-w-md leading-relaxed'>
                        Your canvas is empty. Start your journey by creating your first AI-powered design project and bring your ideas to life.
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-xl hover:bg-gray-900 transition-all font-bold text-sm shadow-xl hover:scale-105 active:scale-95">
                        <Plus className="w-4 h-4" />
                        Start Creating
                    </Link>
                </div>
            )}

            {/* OWNED PROJECTS */}
            {!loading && projectList && projectList.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100'>
                    {projectList.filter(p => !p.role || p.role === 'owner').map((project, index) => (
                        <ProjectCard project={project} key={project.id || index} />
                    ))}
                </div>
            )}

            {/* LOADING STATE */}
            {loading && (
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div key={index} className="space-y-3">
                            <Skeleton className='w-full h-[220px] rounded-2xl bg-black/5' />
                            <div className="space-y-2">
                                <Skeleton className='h-4 w-3/4 bg-black/5' />
                                <Skeleton className='h-3 w-1/2 bg-black/5' />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* SHARED PROJECTS */}
            {!loading && projectList?.filter(p => p.role && p.role !== 'owner').length > 0 && (
                <div className='mt-16'>
                    <h2 className='font-bold text-xl mb-6 text-black flex items-center gap-2'>
                        <span className='text-[#FF5200] bg-[#FF5200]/10 p-1.5 rounded-lg'>👥</span> Shared with Me
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {projectList?.filter(p => p.role && p.role !== 'owner').map((project, index) => (
                            <ProjectCard project={project} key={project.id || index} />
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default ProjectList
"use client"
import { useProjectList } from '@/hooks/use-project-list';
import React from 'react'
import ProjectCard from './ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { PLAN_LIMITS } from '@/config/plans';
function ProjectList() {

    const { projectList, loading } = useProjectList();
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
        <div className='px-4 sm:px-8 mx-auto'>
            <div className='flex justify-between items-end mb-6'>
                <h2 className='font-bold text-2xl font-sans tracking-tight text-black'>Latest Work</h2>
            </div>
            {/* <h2 className='font-bold text-xl'>My Projects</h2> */}

            {!loading && projectList?.length == 0 && (
                <div className='p-8 md:p-12 border border-dashed border-black/10 rounded-3xl flex flex-col items-center justify-center bg-white shadow-sm'>
                    <div className='h-16 w-16 bg-black/5 rounded-full flex items-center justify-center mb-4'>
                        <span className='text-3xl filter saturate-0 opacity-50'>📂</span>
                    </div>
                    <h2 className='text-center text-lg font-bold text-black'>No Projects Yet</h2>
                    <p className='text-black/50 text-sm mt-1 mb-6 text-center max-w-xs'>
                        Start your journey by creating your first AI-powered design project.
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF5200] text-white rounded-xl hover:bg-[#e04800] transition-all font-semibold text-sm shadow-lg shadow-[#FF5200]/20 hover:scale-105 active:scale-95">
                        <Plus className="w-4 h-4" />
                        Create New Project
                    </Link>
                </div>
            )}

            {/* OWNED PROJECTS */}
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                {!loading ? projectList?.filter(p => !p.role || p.role === 'owner').map((project, index) => (
                    <ProjectCard project={project} key={project.id || index} />
                )) :
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div key={index} className="space-y-3">
                            <Skeleton className='w-full h-[220px] rounded-2xl bg-black/5' />
                            <div className="space-y-2">
                                <Skeleton className='h-4 w-3/4 bg-black/5' />
                                <Skeleton className='h-3 w-1/2 bg-black/5' />
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* SHARED PROJECTS */}
            {!loading && projectList?.filter(p => p.role && p.role !== 'owner').length > 0 && (
                <div className='mt-12'>
                    <h2 className='font-bold text-xl mb-6 text-black flex items-center gap-2'>
                        <span className='text-blue-500'>👥</span> Shared with Me
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
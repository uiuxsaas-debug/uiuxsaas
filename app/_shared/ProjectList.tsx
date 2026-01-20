"use client"
import { useProjectList } from '@/hooks/use-project-list';
import React from 'react'
import ProjectCard from './ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Plus } from 'lucide-react';
function ProjectList() {

    const { projectList, loading } = useProjectList();

    return (
        <div className='px-4 sm:px-8 mx-auto'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500'>Latest Work</h2>
            </div>
            {/* <h2 className='font-bold text-xl'>My Projects</h2> */}

            {!loading && projectList?.length == 0 && (
                <div className='p-8 md:p-12 border border-dashed border-yellow-500/20 rounded-3xl flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm shadow-sm'>
                    <div className='h-16 w-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4'>
                        <span className='text-3xl filter saturate-150'>📂</span>
                    </div>
                    <h2 className='text-center text-lg font-bold text-white'>No Projects Yet</h2>
                    <p className='text-yellow-400/70 text-sm mt-1 mb-6 text-center max-w-xs'>
                        Start your journey by creating your first AI-powered design project.
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all font-semibold text-sm shadow-lg shadow-yellow-500/20 hover:scale-105 active:scale-95">
                        <Plus className="w-4 h-4" />
                        Create New Project
                    </Link>
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                {!loading ? projectList?.map((project, index) => (
                    <ProjectCard project={project} key={project.id || index} />
                )) :
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div key={index} className="space-y-3">
                            <Skeleton className='w-full h-[220px] rounded-2xl bg-yellow-500/10' />
                            <div className="space-y-2">
                                <Skeleton className='h-4 w-3/4 bg-yellow-500/10' />
                                <Skeleton className='h-3 w-1/2 bg-yellow-500/10' />
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ProjectList
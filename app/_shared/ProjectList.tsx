"use client"
import { ProjectType } from '@/type/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/nextjs';

function ProjectList() {

    const { user } = useUser();
    const [projectList, setProjectList] = useState<ProjectType[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        user && GetProjectList();
    }, [user])

    const GetProjectList = async () => {
        setLoading(true);
        try {
            const result = await axios.get('/api/project');
            setProjectList(Array.isArray(result.data) ? result.data : []);
        } catch (error) {
            console.error("Failed to fetch project list:", error);
            setProjectList([]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='px-4 sm:px-8 mx-auto'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600'>Latest Work</h2>
            </div>
            {/* <h2 className='font-bold text-xl'>My Projects</h2> */}

            {!loading && projectList?.length == 0 && (
                <div className='p-8 md:p-12 border border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm'>
                    <div className='h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4'>
                        <span className='text-3xl'>📂</span>
                    </div>
                    <h2 className='text-center text-lg font-medium text-gray-700'>No Projects Yet</h2>
                    <p className='text-gray-500 text-sm mt-1'>Start creating amazing designs above!</p>
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                {!loading ? projectList?.map((project, index) => (
                    <ProjectCard project={project} key={project.id || index} />
                )) :
                    [1, 2, 3].map((item, index) => (
                        <div key={index} className="space-y-3">
                            <Skeleton className='w-full h-[220px] rounded-2xl' />
                            <div className="space-y-2">
                                <Skeleton className='h-4 w-3/4' />
                                <Skeleton className='h-3 w-1/2' />
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ProjectList
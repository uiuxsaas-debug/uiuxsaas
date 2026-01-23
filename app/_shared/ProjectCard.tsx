import { Skeleton } from '@/components/ui/skeleton'
import { ProjectType } from '@/type/types'
import { Calendar, Monitor, Smartphone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    project: ProjectType
}

function ProjectCard({ project }: Props) {
    const [screenshot, setScreenshot] = React.useState(project?.screenshot);

    React.useEffect(() => {
        if (!screenshot) {
            // Lazy load screenshot if missing
            fetch(`/api/project/screenshot?projectId=${project.projectId}`)
                .then(res => res.json())
                .then(data => setScreenshot(data.screenshot))
                .catch(() => { });
        }
    }, [project.projectId, screenshot]);

    return (
        <Link href={'/project/' + project?.projectId}>
            <div className='group bg-white rounded-2xl p-3 border border-black/10 shadow-sm hover:shadow-xl hover:shadow-[#FF5200]/10 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full flex flex-col hover:border-[#FF5200]/30'>
                <div className="relative overflow-hidden rounded-xl h-[200px] w-full bg-gray-50 flex items-center justify-center border border-black/5">
                    {screenshot ? (
                        <Image
                            src={screenshot}
                            alt={project?.projectName || 'Project Preview'}
                            width={400}
                            height={300}
                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-black/30">
                            {project?.device === 'mobile' ? <Smartphone size={40} /> : <Monitor size={40} />}
                            <span className="text-xs font-medium">No Preview</span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-white/0 group-hover:bg-[#FF5200]/5 transition-colors duration-300" />
                </div>

                <div className='p-3 flex flex-col flex-1'>
                    <div className="flex justify-between items-start mb-2">
                        <h2 className='font-bold text-black line-clamp-1 group-hover:text-[#FF5200] transition-colors'>{project?.projectName || 'Untitled Project'}</h2>
                        <span className="text-[10px] px-2 py-1 bg-[#FF5200]/10 rounded-full text-[#FF5200] font-medium uppercase tracking-wider border border-[#FF5200]/20">
                            {project?.device}
                        </span>
                    </div>

                    <div className="mt-auto flex items-center gap-2 text-xs text-black/40">
                        <Calendar size={12} />
                        <span>{project.createdOn ? new Date(project.createdOn).toLocaleDateString() : 'Just now'}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard
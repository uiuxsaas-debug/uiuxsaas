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
            <div className='group bg-[#0a0a0f] rounded-2xl p-3 border border-yellow-500/10 shadow-sm hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full flex flex-col hover:border-yellow-500/30'>
                <div className="relative overflow-hidden rounded-xl h-[200px] w-full bg-[#050505] flex items-center justify-center">
                    {screenshot ? (
                        <Image
                            src={screenshot}
                            alt={project?.projectName || 'Project Preview'}
                            width={400}
                            height={300}
                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-yellow-500/40">
                            {project?.device === 'mobile' ? <Smartphone size={40} /> : <Monitor size={40} />}
                            <span className="text-xs font-medium">No Preview</span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-yellow-500/5 transition-colors duration-300" />
                </div>

                <div className='p-3 flex flex-col flex-1'>
                    <div className="flex justify-between items-start mb-2">
                        <h2 className='font-bold text-white line-clamp-1 group-hover:text-yellow-400 transition-colors'>{project?.projectName || 'Untitled Project'}</h2>
                        <span className="text-[10px] px-2 py-1 bg-yellow-500/10 rounded-full text-yellow-400/80 font-medium uppercase tracking-wider border border-yellow-500/20">
                            {project?.device}
                        </span>
                    </div>

                    <div className="mt-auto flex items-center gap-2 text-xs text-yellow-400/50">
                        <Calendar size={12} />
                        <span>{project.createdOn ? new Date(project.createdOn).toLocaleDateString() : 'Just now'}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard
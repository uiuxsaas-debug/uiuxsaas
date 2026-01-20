import { Button } from '@/components/ui/button'
import { SettingContext } from '@/context/SettingContext';
import axios from 'axios';
import { Download, Loader2, Save } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

function ProjectHeader() {
    const { settingsDetail, setSettingDetail } = useContext(SettingContext);
    const [saving, setSaving] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [downloading, setDownloading] = useState(false);

    // Listen for export completion
    useEffect(() => {
        const handleExportComplete = () => {
            setExporting(false);
            toast.success('Export complete!');
        };
        const handleDownloadComplete = () => {
            setDownloading(false);
            toast.success('Code downloaded!');
        };
        window.addEventListener('export-complete', handleExportComplete);
        window.addEventListener('download-code-complete', handleDownloadComplete);
        return () => {
            window.removeEventListener('export-complete', handleExportComplete);
            window.removeEventListener('download-code-complete', handleDownloadComplete);
        };
    }, []);

    const OnSave = async () => {
        try {
            setSaving(true);
            const result = await axios.put('/api/project', {
                theme: settingsDetail?.theme,
                projectId: settingsDetail?.projectId,
                projectName: settingsDetail?.projectName
            })
            setSaving(false);
            toast.success('Settings Saved!')
        }
        catch (e) {
            setSaving(false);
            toast.error('Internal Server Error')
        }
    }

    const onExport = () => {
        setExporting(true);
        const event = new Event('trigger-download-figma');
        window.dispatchEvent(event);
    }

    const onDownloadCode = () => {
        setDownloading(true);
        const event = new Event('trigger-download-code');
        window.dispatchEvent(event);
    }


    return (
        <div className='flex items-center justify-between p-3 bg-[#0a0a0f] border-b border-yellow-500/10'>
            <Link href={'/'}>
                <div className='flex gap-2 items-center hover:scale-105 transition-transform'>
                    <Image src={'/logo.png'} alt='logo' width={40} height={40} />
                    <h2 className='text-xl font-semibold'> <span className='text-yellow-500'>UIUX</span> <span className='font-light text-white'>MOCK</span></h2>
                </div>
            </Link>
            <div className='flex gap-2'>
                <Button variant={'ghost'} size={'sm'} className='text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-500/10' disabled={exporting} onClick={onExport}>
                    {exporting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 57C14.7467 57 19 52.7467 19 47.5V38H9.5C4.25329 38 0 42.2533 0 47.5C0 52.7467 4.25329 57 9.5 57Z" fill="#0ACF83" /><path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="#A259FF" /><path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V19H9.5C4.25329 19 0 14.7467 0 9.5Z" fill="#F24E1E" /><path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262" /><path d="M38 28.5C38 33.7467 33.7467 38 28.5 38H19V19H28.5C33.7467 19 38 23.2533 38 28.5Z" fill="#1ABCFE" /></svg>
                    )}
                    Export
                </Button>
                <Button variant={'outline'} size={'sm'} className='border-yellow-500/30 bg-transparent text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300 hover:border-yellow-500/40' disabled={downloading} onClick={onDownloadCode}>
                    {downloading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : <Download className='w-4 h-4 mr-2' />}
                    Code
                </Button>
                <Button onClick={OnSave} disabled={saving} className='bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold hover:from-yellow-400 hover:to-amber-400 border-0'> {saving ? <Loader2 className='animate-spin' /> : <Save />} Save</Button>
            </div>
        </div>
    )
}

export default ProjectHeader
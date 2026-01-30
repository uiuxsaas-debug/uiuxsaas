import { Button } from '@/components/ui/button'
import { SettingContext } from '@/context/SettingContext';
import axios from 'axios';
import { Download, Loader2, Save, ImageIcon, Share, Copy, Globe, Lock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function ProjectHeader() {
    const { settingsDetail, setSettingDetail } = useContext(SettingContext);
    const [saving, setSaving] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [loadingShare, setLoadingShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [canShare, setCanShare] = useState(false);

    // Listen for export completion
    useEffect(() => {
        const handleExportComplete = () => {
            setExporting(false);
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

    const [members, setMembers] = useState<any[]>([]);
    const [inviteEmail, setInviteEmail] = useState('');
    const [loadingInvite, setLoadingInvite] = useState(false);

    useEffect(() => {
        if (settingsDetail?.projectId) {
            setShareUrl(`${window.location.origin}/view/${settingsDetail.projectId}`);
            checkPublicStatus();
            fetchMembers();
        }
    }, [settingsDetail?.projectId]);

    const checkPublicStatus = async () => {
        try {
            const result = await axios.get(`/api/project/share?projectId=${settingsDetail?.projectId}`);
            setIsPublic(result.data.isPublic);
            setCanShare(result.data.canShare);
        } catch (e) {
            console.error("Failed to check public status", e);
        }
    }

    const fetchMembers = async () => {
        try {
            const result = await axios.get(`/api/project/member?projectId=${settingsDetail?.projectId}`);
            setMembers(result.data);
        } catch (e) {
            console.error("Failed to fetch members", e);
        }
    }

    const inviteMember = async () => {
        if (!inviteEmail) return;
        setLoadingInvite(true);
        try {
            await axios.post('/api/project/member', {
                projectId: settingsDetail?.projectId,
                email: inviteEmail
            });
            toast.success('Member invited');
            setInviteEmail('');
            fetchMembers();
        } catch (e: any) {
            toast.error(e.response?.data?.error || 'Failed to invite member');
        } finally {
            setLoadingInvite(false);
        }
    }

    const removeMember = async (email: string) => {
        try {
            await axios.delete('/api/project/member', {
                data: { projectId: settingsDetail?.projectId, email }
            });
            toast.success('Member removed');
            fetchMembers();
        } catch (e) {
            toast.error('Failed to remove member');
        }
    }

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

    const togglePublic = async (checked: boolean) => {
        setLoadingShare(true);
        try {
            await axios.post('/api/project/share', {
                projectId: settingsDetail?.projectId,
                isPublic: checked
            });
            setIsPublic(checked);
            toast.success(checked ? 'Project is now Public' : 'Project is now Private');
        } catch (e) {
            toast.error('Failed to update share status');
        } finally {
            setLoadingShare(false);
        }
    }

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard');
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

    const onDownloadImage = () => {
        setExporting(true);
        const event = new Event('trigger-download-image');
        window.dispatchEvent(event);
    }

    return (

        <div className='flex items-center justify-between p-3 bg-white border-b border-black/5'>
            <Link href={'/dashboard'}>
                <div className='flex gap-2 items-center hover:scale-105 transition-transform'>
                    <Image
                        src={'/logo-full.png'}
                        alt='logo'
                        width={140}
                        height={40}
                        className="hidden md:block h-10 w-auto object-contain"
                    />
                    <Image
                        src={'/logo-half.png'}
                        alt='logo'
                        width={40}
                        height={40}
                        className="block md:hidden h-8 w-auto object-contain"
                    />
                </div>
            </Link>
            <div className='flex gap-2 items-center'>
                {canShare && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'ghost'} className='text-[#FF5200] hover:text-[#e04800] hover:bg-[#FF5200]/10'>
                                <Share className='w-4 h-4 mr-2' /> Share
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='bg-white border-black/10 text-black sm:max-w-md'>
                            <DialogHeader>
                                <DialogTitle>Share Project</DialogTitle>
                                <DialogDescription className="text-black/60">
                                    Share with your team or make it public.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 py-2">
                                {/* Invite Section */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold text-black/50 uppercase">Invite Team</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="colleague@example.com"
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                            className="bg-black/5 border-black/10 text-black h-9 placeholder:text-black/40"
                                        />
                                        <Button size="sm" onClick={inviteMember} disabled={loadingInvite} className="bg-[#FF5200] text-white hover:bg-[#e04800]">
                                            {loadingInvite ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Invite'}
                                        </Button>
                                    </div>
                                </div>

                                {/* Members List */}
                                {members.length > 0 && (
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold text-black/50 uppercase">Access</Label>
                                        <div className="max-h-[100px] overflow-y-auto space-y-2 pr-1">
                                            {members.map((m) => (
                                                <div key={m.id} className="flex items-center justify-between bg-black/5 p-2 rounded text-sm">
                                                    <span className="truncate flex-1 mr-2" title={m.email}>{m.email}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeMember(m.email)}
                                                        className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        &times;
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="h-px bg-black/5 my-2"></div>

                                {/* Public Link Section */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-sm font-medium leading-none text-black">Public Link</span>
                                            <span className="text-xs text-black/60">Anyone with link can view</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {loadingShare && <Loader2 className="w-4 h-4 animate-spin text-[#FF5200]" />}
                                            <Switch
                                                checked={isPublic}
                                                onCheckedChange={togglePublic}
                                                className="data-[state=checked]:bg-[#FF5200] data-[state=unchecked]:bg-black/20"
                                            />
                                        </div>
                                    </div>

                                    {isPublic && (
                                        <div className="flex items-center space-x-2 mt-2">
                                            <div className="grid flex-1 gap-2">
                                                <Label htmlFor="link" className="sr-only">
                                                    Link
                                                </Label>
                                                <Input
                                                    id="link"
                                                    defaultValue={shareUrl}
                                                    readOnly
                                                    className="bg-black/5 border-black/10 text-black h-9 text-xs"
                                                />
                                            </div>
                                            <Button type="submit" size="sm" onClick={copyLink} className="bg-[#FF5200] text-white hover:bg-[#e04800] px-3">
                                                <span className="sr-only">Copy</span>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}

                <div className="h-6 w-px bg-black/5 mx-1"></div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} size={'sm'} className='border-black/10 bg-transparent text-black hover:bg-black/5 hover:text-[#FF5200] hover:border-[#FF5200]/30' disabled={exporting || downloading}>
                            {(exporting || downloading) ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : <Download className='w-4 h-4 mr-2' />}
                            Export
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border-black/10 text-black min-w-[200px] shadow-lg">
                        <DropdownMenuItem onClick={onDownloadCode} className="hover:!bg-[#FF5200]/10 hover:!text-[#FF5200] cursor-pointer text-sm py-2.5">
                            <Download className='w-4 h-4 mr-2' />
                            Download Code
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDownloadImage} className="hover:!bg-[#FF5200]/10 hover:!text-[#FF5200] cursor-pointer text-sm py-2.5">
                            <ImageIcon className='w-4 h-4 mr-2' />
                            Download Image
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onExport} className="hover:!bg-[#FF5200]/10 hover:!text-[#FF5200] cursor-pointer text-sm py-2.5">
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 57C14.7467 57 19 52.7467 19 47.5V38H9.5C4.25329 38 0 42.2533 0 47.5C0 52.7467 4.25329 57 9.5 57Z" fill="#0ACF83" /><path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="#A259FF" /><path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V19H9.5C4.25329 19 0 14.7467 0 9.5Z" fill="#F24E1E" /><path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262" /><path d="M38 28.5C38 33.7467 33.7467 38 28.5 38H19V19H28.5C33.7467 19 38 23.2533 38 28.5Z" fill="#1ABCFE" /></svg>
                            Export to Figma
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button onClick={OnSave} disabled={saving} className='bg-[#FF5200] text-white font-semibold hover:bg-[#e04800] border-0'> {saving ? <Loader2 className='animate-spin' /> : <Save />} Save</Button>
            </div>
        </div>
    )
}


export default ProjectHeader
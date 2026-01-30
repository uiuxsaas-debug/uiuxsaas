import { Button } from '@/components/ui/button'
import { ScreenConfig } from '@/type/types'
import { Code2Icon, Copy, Download, GripVertical, Loader2Icon, MoreVertical, Sparkle, SparkleIcon, Trash } from 'lucide-react'
import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from 'sonner'
import { HtmlWrapper } from '@/data/constant'
import html2canvas from 'html2canvas'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios'
import { RefreshDataContext } from '@/context/RefreshDataContext'
import { Textarea } from '@/components/ui/textarea'

type Props = {
    screen: ScreenConfig | undefined,
    theme: any,
    iframeRef: any,
    projectId: string | undefined,
    onScreenUpdate?: (updatedScreen: ScreenConfig) => void;
    onScreenDelete?: (screenId: number) => void;
    readOnly?: boolean
}
function ScreenHandler({ screen, theme, iframeRef, projectId, onScreenUpdate, onScreenDelete, readOnly = false }: Props) {

    const htmlCode = HtmlWrapper(theme, screen?.code as string)
    const { refreshData, setRefreshData } = useContext(RefreshDataContext);
    const [editUserInput, setEditUserInput] = useState<string>()
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isEditPopoverOpen, setIsEditPopoverOpen] = useState(false);
    // console.log(iframeRef)
    const takeIframeScreenshot = async () => {
        const iframe = iframeRef.current;
        console.log(iframeRef)
        if (!iframe) return;

        try {
            const doc = iframe.contentDocument;
            if (!doc) return;

            const body = doc.body;

            // wait one frame to ensure layout is stable
            await new Promise((res) => requestAnimationFrame(res));

            const canvas = await html2canvas(body, {
                backgroundColor: null,
                useCORS: true,
                scale: window.devicePixelRatio || 1,
            });

            const image = canvas.toDataURL("image/png");

            // download automatically
            const link = document.createElement("a");
            link.href = image;
            link.download = `${screen?.screenName as string || "screen"}.png`;
            link.click();
        } catch (err) {
            console.error("Screenshot failed:", err);
        }
    };

    const onDelete = async () => {
        if (!screen?.id) return;
        try {
            setDeleting(true);
            // Use the unique database 'id' instead of 'screenId' to avoid deleting duplicates
            const result = await axios.delete('/api/generate-config?id=' + screen?.id);
            toast.success('Screen Deleted')

            if (onScreenDelete) {
                onScreenDelete(screen.id);
            } else {
                setRefreshData({ method: 'screenConfig', date: Date.now() })
            }
        } catch (e) {
            console.error(e);
            toast.error('Failed to delete screen')
        } finally {
            setDeleting(false);
        }
    }

    const editScreen = async () => {
        try {
            setLoading(true);
            const result = await axios.post('/api/edit-screen', {
                projectId: projectId,
                screenId: screen?.screenId,
                userInput: editUserInput,
                oldCode: screen?.code
            });

            // If we have a callback and valid data, update locally
            if (onScreenUpdate && result.data) {
                onScreenUpdate(result.data);
            } else {
                setRefreshData({ method: 'screenConfig', date: Date.now() })
            }

            toast.success('Screen Edited successfully!')
            setIsEditPopoverOpen(false)
        } catch (error: any) {
            console.error("Edit Screen Error:", error);
            // Show specific error from server if available (e.g. credit/plan limits)
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.response?.data?.details) {
                toast.error(error.response.data.details);
            } else if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Failed to edit screen');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-between items-center w-full'>
            <div className="flex items-center gap-2 min-w-0">
                <GripVertical className="text-black/40 h-4 w-4 shrink-0" />

                <h2
                    className="min-w-0 flex-1 truncate whitespace-nowrap overflow-hidden text-black font-medium"
                    title={screen?.screenName}
                >
                    {screen?.screenName}
                </h2>
            </div>

            <div className='flex'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={'ghost'} className='text-black/60 hover:text-black hover:bg-[#FF5200]/10'><Code2Icon /></Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-5xl w-full h-[70vh] flex flex-col bg-white border-black/10'>
                        <DialogHeader>
                            <DialogTitle>HTML + Tailwindcss Code</DialogTitle>
                            <DialogDescription>
                                <div className='flex-1 overflow-y-auto rounded-md border border-black/10 bg-black/5 p-4'>
                                    {/* @ts-ignore  */}
                                    <SyntaxHighlighter
                                        language="html"
                                        style={docco}
                                        wrapLongLines
                                        customStyle={{
                                            margin: 0,
                                            padding: 5,
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            overflowX: 'hidden',
                                            height: '50vh',
                                            backgroundColor: 'transparent'
                                        }}
                                        codeTagProps={{
                                            style: {
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: "break-word"
                                            }
                                        }}
                                    >
                                        {htmlCode}
                                    </SyntaxHighlighter>

                                </div>
                                <Button className='mt-3 bg-[#FF5200] hover:bg-[#e04800] text-white' onClick={() => {
                                    navigator.clipboard.writeText(htmlCode as string);
                                    toast.success('Code Copied!')
                                }}><Copy /> Copy </Button>

                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Button variant={'ghost'} onClick={takeIframeScreenshot} className='text-black/60 hover:text-black hover:bg-[#FF5200]/10'>
                    <Download />
                </Button>

                {!readOnly && (
                    <Popover open={isEditPopoverOpen} onOpenChange={setIsEditPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant={'ghost'} className='text-black/60 hover:text-black hover:bg-[#FF5200]/10'> <SparkleIcon /> </Button>
                        </PopoverTrigger>
                        <PopoverContent className='bg-white border-black/10 shadow-xl w-80'>
                            <div>
                                <Textarea placeholder='What changes do you want to make?'
                                    className='bg-white border-black/10 text-black placeholder:text-black/40 focus:border-[#FF5200] focus:ring-[#FF5200]'
                                    onChange={(event) => setEditUserInput(event.target.value)} />
                                <Button size={'sm'} className='mt-2 bg-[#FF5200] text-white font-semibold hover:bg-[#e04800] w-full'
                                    disabled={loading}
                                    onClick={() => editScreen()}
                                > {loading ? <Loader2Icon className='animate-spin' /> : <Sparkle />} Regenerate</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}

                {!readOnly && (
                    <Button variant={'ghost'} size={'icon'} disabled={deleting} className="text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={() => onDelete()}>
                        {deleting ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4" />}
                    </Button>
                )}

            </div>


        </div>
    )
}

export default ScreenHandler
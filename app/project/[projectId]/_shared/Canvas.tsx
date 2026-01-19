import React, { useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent, useControls, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import ScreenFrame from './ScreenFrame';
import { ProjectType, ScreenConfig } from '@/type/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Minus, Plus, RefreshCw, X, Hand, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import axios from 'axios';

type Props = {
    projectDetail: ProjectType | undefined,
    screenConfig: ScreenConfig[],
    loading?: boolean,
    takeScreenshot: any,
    generatingIndices?: Set<number>; // Indices of screens currently being generated in parallel
    onScreenUpdate?: (updatedScreen: ScreenConfig) => void;
    onScreenDelete?: (screenId: number) => void;
}

function Canvas({ projectDetail, screenConfig, loading, takeScreenshot, generatingIndices = new Set(), onScreenUpdate, onScreenDelete }: Props) {

    const [panningEnabled, setPanningEnabled] = useState(true);
    const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

    const isMobile = projectDetail?.device == 'mobile';

    // iPhone 14 Pro dimensions for Figma-like appearance
    // IMPORTANT: For mobile, total height = content height (852px) + header (40px) + margin (12px) = 904px
    // This ensures the bottom navigation is never cut off
    const SCREEN_WIDTH = isMobile ? 393 : 1200;
    const SCREEN_HEIGHT = isMobile ? 904 : 800;  // 852 (content) + 40 (header) + 12 (margin)
    const GAP = isMobile ? 30 : 40;

    const iframeRefs = useRef<(HTMLFormElement | null)[]>([]);

    // Auto-pan to the first generating screen with smooth animation
    useEffect(() => {
        // Get the first generating index from the Set
        const firstGeneratingIndex = generatingIndices.size > 0 ? Math.min(...generatingIndices) : -1;

        if (firstGeneratingIndex >= 0 && transformRef.current) {
            const SIDEBAR_WIDTH = 300;
            const HEADER_HEIGHT = 60;
            const ZOOM = 0.55;

            // Available canvas area
            const canvasWidth = window.innerWidth - SIDEBAR_WIDTH;

            // Screen position at scale=1
            const screenX = firstGeneratingIndex * (SCREEN_WIDTH + GAP);

            // We need to position so that the screen center aligns with canvas center
            // At zoom 0.55, the scaled screen width is SCREEN_WIDTH * 0.55
            const scaledScreenWidth = SCREEN_WIDTH * ZOOM;

            // Center of canvas area
            const canvasCenterX = canvasWidth / 2;

            // We want the screen's center to be at canvas center
            // Transform X = canvasCenterX - (screenX * ZOOM) - (scaledScreenWidth / 2)
            const newX = canvasCenterX - (screenX * ZOOM) - (scaledScreenWidth / 2);

            // Vertical: just a small offset from top to show the screen nicely
            const newY = 50;

            // Apply transform with smooth animation
            transformRef.current.setTransform(newX, newY, ZOOM, 400, "easeOutQuad");
        }
    }, [generatingIndices, SCREEN_WIDTH, SCREEN_HEIGHT, GAP]);

    const Controls = () => {
        const { zoomIn, zoomOut, resetTransform } = useControls();

        return (
            <div className="tools absolute p-2 px-3 bg-white shadow-lg flex gap-2 rounded-full bottom-10 left-1/2 -translate-x-1/2 z-30 text-gray-500 border border-gray-100">
                <Button variant={'ghost'} size={'sm'} onClick={() => zoomIn()} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"><Plus size={16} /></Button>
                <Button variant={'ghost'} size={'sm'} onClick={() => zoomOut()} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"><Minus size={16} /></Button>
                <div className="w-[1px] h-6 bg-gray-200 self-center mx-1"></div>
                <Button
                    variant={panningEnabled ? 'secondary' : 'ghost'}
                    size={'sm'}
                    onClick={() => setPanningEnabled(!panningEnabled)}
                    className={`h-8 w-8 p-0 rounded-full ${panningEnabled ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'hover:bg-gray-100'}`}
                >
                    {panningEnabled ? <Hand size={16} /> : <MousePointer2 size={16} />}
                </Button>
                <Button variant={'ghost'} size={'sm'} onClick={() => resetTransform()} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"><RefreshCw size={16} /></Button>
            </div>
        );
    };

    useEffect(() => {
        takeScreenshot && onTakeScreenshot(takeScreenshot);
    }, [takeScreenshot])


    const captureOneIframe = async (iframe: HTMLIFrameElement) => {
        const doc = iframe.contentDocument;
        if (!doc) throw new Error("iframe doc not ready");

        // wait fonts if possible
        // @ts-ignore
        if (doc.fonts?.ready) await doc.fonts.ready;

        // let iconify/tailwind apply
        await new Promise((r) => setTimeout(r, 250));

        // Re-check validity after wait
        if (!iframe.isConnected || !iframe.contentWindow || !iframe.contentDocument) {
            console.warn("Iframe detached/invalid during capture");
            return document.createElement("canvas");
        }

        const currentDoc = iframe.contentDocument;
        const target = currentDoc.body;
        const w = currentDoc.documentElement.scrollWidth;
        const h = currentDoc.documentElement.scrollHeight;

        try {
            const canvas = await html2canvas(target, {
                backgroundColor: null,
                useCORS: true,
                allowTaint: true,
                width: w,
                height: h,
                windowWidth: w,
                windowHeight: h,
                scale: window.devicePixelRatio || 1,
            });
            return canvas;
        } catch (error) {
            console.error("html2canvas failed:", error);
            return document.createElement("canvas");
        }


    };

    const onTakeScreenshot = async (saveOnly: any) => {
        try {
            const iframes = iframeRefs.current.filter(Boolean) as any;
            if (!iframes.length) {
                // toast.error("No iframes found to capture");
                return;
            }

            // 1) capture each iframe to its own canvas
            const shotCanvases: HTMLCanvasElement[] = [];
            for (let i = 0; i < iframes.length; i++) {
                const c = await captureOneIframe(iframes[i]);
                shotCanvases.push(c);
            }

            // 2) stitch into one final canvas (side-by-side)
            const scale = window.devicePixelRatio || 1;
            const headerH = 40; // same as your header
            const outW =
                Math.max(iframes.length * (SCREEN_WIDTH + GAP), SCREEN_WIDTH) * scale;
            const outH = SCREEN_HEIGHT * scale;

            const out = document.createElement("canvas");
            out.width = outW;
            out.height = outH;

            const ctx = out.getContext("2d");
            if (!ctx) throw new Error("No 2D context");

            // optional transparent background
            ctx.clearRect(0, 0, outW, outH);

            // draw each screen capture
            for (let i = 0; i < shotCanvases.length; i++) {
                const x = i * (SCREEN_WIDTH + GAP) * scale;
                const y = headerH * scale; // because iframe capture is body only
                ctx.drawImage(shotCanvases[i], x, y);
            }

            // 3) download
            const url = out.toDataURL("image/png");
            console.log(url)
            updateProjectWithScreenshot(url);
            if (saveOnly != 1) {
                const a = document.createElement("a");
                a.href = url;
                a.download = "canvas.png";
                a.click();
            }
        } catch (e) {
            console.error(e);
            // toast.error("Capture failed (iframe)");
        }
    };

    const updateProjectWithScreenshot = async (base64Url: string) => {
        const result = await axios.put('/api/project', {
            screenShot: base64Url,
            projectId: projectDetail?.projectId,
            theme: projectDetail?.theme,
            projectName: projectDetail?.projectName
        })
        console.log(result.data);
    }


    return (
        <div className='flex-1 h-[calc(100vh-80px)] bg-gray-100 relative overflow-hidden'
            style={{
                backgroundImage: "radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
            }}
        >
            <TransformWrapper
                ref={transformRef}
                initialScale={0.5}
                minScale={0.3}
                maxScale={3}
                initialPositionX={50}
                initialPositionY={50}
                limitToBounds={false}
                wheel={{ step: 0.08, smoothStep: 0.004 }}
                doubleClick={{ disabled: false }}
                panning={{
                    disabled: !panningEnabled,
                    velocityDisabled: false
                }}
                velocityAnimation={{
                    sensitivity: 1,
                    animationTime: 300,
                    animationType: "easeOut",
                    equalToMove: true
                }}
            >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <>
                        <Controls />
                        <TransformComponent
                            wrapperStyle={{ width: '100%', height: '100%' }}
                            contentStyle={{ transition: 'transform 0.15s ease-out' }}
                        >
                            {screenConfig?.map((screen, index) => {
                                const isGenerating = generatingIndices.has(index);
                                const hasCode = !!screen?.code && screen.code.length > 100;

                                // Don't render if no code AND not currently generating
                                if (!hasCode && !isGenerating) return null;

                                return (
                                    <div
                                        key={`screen-${screen?.id || index}`}
                                        style={{
                                            position: 'absolute',
                                            left: index * (SCREEN_WIDTH + GAP),
                                            top: 0,
                                            width: SCREEN_WIDTH,
                                            height: SCREEN_HEIGHT, // Reserved height prevents layout shift
                                        }}
                                    >
                                        {/* Show skeleton while generating with minimal code */}
                                        {isGenerating && !hasCode ? (
                                            <div className="w-full h-full flex flex-col">
                                                {/* Header bar placeholder - matches ScreenHandler */}
                                                <div className="flex gap-2 items-center bg-white rounded-lg p-4">
                                                    <div className="w-4 h-4 rounded bg-gray-200 animate-pulse"></div>
                                                    <div className="w-24 h-4 rounded bg-gray-200 animate-pulse"></div>
                                                    <div className="flex-1"></div>
                                                    <div className="flex gap-2">
                                                        <div className="w-5 h-5 rounded bg-gray-200 animate-pulse"></div>
                                                        <div className="w-5 h-5 rounded bg-gray-200 animate-pulse"></div>
                                                        <div className="w-5 h-5 rounded bg-gray-200 animate-pulse"></div>
                                                        <div className="w-5 h-5 rounded bg-gray-200 animate-pulse"></div>
                                                    </div>
                                                </div>

                                                {/* Phone mockup area - Light theme */}
                                                <div className="mt-3 flex-1 rounded-2xl bg-white border border-gray-200 p-4 overflow-hidden relative shadow-lg">
                                                    {/* iOS Status bar skeleton */}
                                                    <div className="flex justify-between items-center px-2 py-2">
                                                        <div className="w-10 h-3 rounded bg-gray-200 animate-pulse"></div>
                                                        <div className="flex gap-1">
                                                            <div className="w-4 h-3 rounded bg-gray-200 animate-pulse"></div>
                                                            <div className="w-4 h-3 rounded bg-gray-200 animate-pulse"></div>
                                                            <div className="w-6 h-3 rounded bg-gray-200 animate-pulse"></div>
                                                        </div>
                                                    </div>

                                                    {/* Header skeleton */}
                                                    <div className="mt-4 px-2">
                                                        <div className="w-32 h-6 rounded-lg bg-gray-200 animate-pulse"></div>
                                                    </div>

                                                    {/* Hero skeleton */}
                                                    <div className="mt-4 px-2">
                                                        <div className="w-full h-36 rounded-2xl bg-gray-100 animate-pulse"></div>
                                                    </div>

                                                    {/* Cards skeleton */}
                                                    <div className="mt-4 px-2 space-y-3">
                                                        <div className="w-full h-16 rounded-xl bg-gray-100 animate-pulse"></div>
                                                        <div className="w-full h-16 rounded-xl bg-gray-100 animate-pulse"></div>
                                                        <div className="w-full h-16 rounded-xl bg-gray-100 animate-pulse"></div>
                                                    </div>

                                                    {/* Bottom nav skeleton */}
                                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 border-t border-gray-200">
                                                        <div className="flex justify-around items-center h-full px-8">
                                                            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
                                                            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
                                                            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
                                                            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <ScreenFrame
                                                x={0} y={0}
                                                width={SCREEN_WIDTH}
                                                height={SCREEN_HEIGHT}
                                                setPanningEnabled={setPanningEnabled}
                                                htmlCode={screen?.code || ''}
                                                projectDetail={projectDetail}
                                                screen={screen}
                                                iframeRef_={(ifrm: any) => (iframeRefs.current[index] = ifrm)}
                                                isGenerating={isGenerating}
                                                onScreenUpdate={onScreenUpdate}
                                                onScreenDelete={onScreenDelete}
                                            />
                                        )}
                                    </div>
                                );
                            })}


                        </TransformComponent>
                    </>)}
            </TransformWrapper>
        </div>
    )
}

export default Canvas
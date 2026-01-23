"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import ProjectHeader from './_shared/ProjectHeader'
import SettingsSection from './_shared/SettingsSection'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { ProjectType, ScreenConfig } from '@/type/types'
import { toast } from 'sonner'
import Canvas from './_shared/Canvas'
import { SettingContext } from '@/context/SettingContext'
import { RefreshDataContext } from '@/context/RefreshDataContext'

function ProjectCanvasPlayground() {

    const { projectId } = useParams();
    const [projectDetail, setProjectDetail] = useState<ProjectType>();
    const [screenConfigOriginal, setScreenConfigOriginal] = useState<ScreenConfig[]>([]);
    const [screenConfig, setScreenConfig] = useState<ScreenConfig[]>([]);
    const { settingsDetail, setSettingDetail } = useContext(SettingContext);
    const [loading, setLoading] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState('Loading');
    const { refreshData, setRefreshData } = useContext(RefreshDataContext);
    const [takeScreenshot, setTakeScreenshot] = useState<any>();
    const [generating, setGenerating] = useState(false);
    // Track multiple screens generating in parallel
    const [generatingIndices, setGeneratingIndices] = useState<Set<number>>(new Set());

    // Toast handling for loading state
    const toastIdRef = useRef<string | number | null>(null);

    useEffect(() => {
        if (loading) {
            if (toastIdRef.current === null) {
                toastIdRef.current = toast.loading(loadingMsg);
            } else {
                toast.loading(loadingMsg, { id: toastIdRef.current });
            }
        } else {
            if (toastIdRef.current !== null) {
                toast.dismiss(toastIdRef.current);
                toastIdRef.current = null;
            }
        }
    }, [loading, loadingMsg]);

    useEffect(() => {
        projectId && GetProjectDetail();
    }, [projectId])

    useEffect(() => {
        if (refreshData?.method == 'screenConfig') {
            GetProjectDetail();
        }

    }, [refreshData])

    useEffect(() => {
        const handleFigmaExport = () => {
            setTakeScreenshot('figma-export'); // Figma Export Mode
        };

        const handleDownloadCode = async () => {
            try {
                // Dynamic import of JSZip to avoid SSR issues
                const JSZip = (await import('jszip')).default;
                const zip = new JSZip();

                // Add each screen's code as an HTML file
                screenConfig.forEach((screen, index) => {
                    if (screen?.code) {
                        const fileName = `${screen.screenName?.replace(/[^a-zA-Z0-9]/g, '_') || `screen_${index + 1}`}.html`;
                        // Create a complete HTML file
                        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${screen.screenName || 'Screen'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Inter', sans-serif; }
        body { margin: 0; padding: 0; }
    </style>
</head>
<body>
${screen.code}
</body>
</html>`;
                        zip.file(fileName, fullHtml);
                    }
                });

                // Generate and download the ZIP
                const content = await zip.generateAsync({ type: 'blob' });
                const url = URL.createObjectURL(content);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${projectDetail?.projectName || 'project'}_code.zip`;
                a.click();
                URL.revokeObjectURL(url);

                window.dispatchEvent(new Event('download-code-complete'));
            } catch (error) {
                console.error('Failed to create ZIP:', error);
                toast.error('Failed to download code');
                window.dispatchEvent(new Event('download-code-complete'));
            }
        };

        const handleDownloadImage = () => {
            setTakeScreenshot('download-image'); // Image Download Mode
        };

        window.addEventListener('trigger-download-figma', handleFigmaExport);
        window.addEventListener('trigger-download-code', handleDownloadCode);
        window.addEventListener('trigger-download-image', handleDownloadImage);
        return () => {
            window.removeEventListener('trigger-download-figma', handleFigmaExport);
            window.removeEventListener('trigger-download-code', handleDownloadCode);
            window.removeEventListener('trigger-download-image', handleDownloadImage);
        };
    }, [screenConfig, projectDetail]);

    const GetProjectDetail = async () => {
        // Always set loading state with message for continuity
        setLoading(true);
        setLoadingMsg('Crafting your design ecosystem...');

        const result = await axios.get('/api/project?projectId=' + projectId)
        console.log(result.data);
        setProjectDetail(result?.data?.projectDetail);
        setScreenConfigOriginal(result?.data?.screenConfig)
        setScreenConfig(result?.data?.screenConfig)
        setSettingDetail(result?.data?.projectDetail);

        // Only turn off loading if all screens already have code
        const screensNeedGeneration = result?.data?.screenConfig?.some((s: any) => !s.code);
        if (!screensNeedGeneration) {
            setLoading(false);
        } else {
            setLoadingMsg('Architecting your screens...');
        }
        // Otherwise, loading will be handled by GenerateScreenUIUX
    }

    // Track if we've already generated config to prevent duplicates
    const configGeneratedRef = React.useRef(false);
    // Track which screens have been processed to avoid re-generating existing screens
    // but allow new screens to be generated
    const processedScreenIdsRef = React.useRef<Set<string>>(new Set());

    useEffect(() => {
        if (!projectDetail) return;

        // Case 1: No screens exist, need to generate config first
        if (screenConfigOriginal.length === 0 && !configGeneratedRef.current) {
            configGeneratedRef.current = true;
            generateScreenConfig();
        }
        // Case 2: Screens exist - check if any NEW screens don't have code yet
        else if (screenConfigOriginal.length > 0) {
            // Find screens that don't have code AND haven't been processed yet
            const unfinishedScreens = screenConfigOriginal.filter(
                s => !s.code && !processedScreenIdsRef.current.has(s.screenId)
            );

            if (unfinishedScreens.length > 0) {
                // Mark these screens as being processed
                unfinishedScreens.forEach(s => processedScreenIdsRef.current.add(s.screenId));
                // Set loading immediately to prevent gap
                setLoading(true);
                setLoadingMsg(`Preparing to generate ${unfinishedScreens.length} screens...`);

                // Use a small timeout to ensure the state update processes before the heavy async start
                setTimeout(() => {
                    GenerateScreenUIUX();
                }, 100);
            }
        }
    }, [projectDetail, screenConfigOriginal])

    const generateScreenConfig = async () => {
        setLoading(true);
        setLoadingMsg('Generating Screen Config...');
        try {
            setLoadingMsg('Creating screen layouts...');
            const result = await axios.post('/api/generate-config', {
                projectId: projectId,
                deviceType: projectDetail?.device,
                userInput: projectDetail?.userInput
            })
            console.log(result.data);
            setLoadingMsg('Loading screens...');
            // Don't set loading to false here - it will continue in GenerateScreenUIUX
            GetProjectDetail();

            // Safety check: if for some reason database was slow, force a re-check
            if (!result.data || !result.data.screenConfig) {
                configGeneratedRef.current = false;
            }
        } catch (error: any) {
            console.error(error);
            configGeneratedRef.current = false; // Allow retry on error
            toast.error(error?.response?.data?.error || 'Failed to generate screen config');
            setLoading(false); // Only set loading false on error
        }
    }

    // Generate a single screen - extracted for parallel execution
    const generateSingleScreen = async (screen: ScreenConfig, index: number): Promise<void> => {
        try {
            const response = await fetch('/api/generate-screen-ui', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId,
                    screenId: screen?.screenId,
                    screenName: screen?.screenName,
                    purpose: screen?.purpose,
                    screenDescription: screen?.screenDescription,
                    projectVisualDescription: projectDetail?.projectVisualDescription || projectDetail?.userInput,
                    device: projectDetail?.device,
                    theme: projectDetail?.theme,
                    allScreenNames: screenConfig?.map(s => s.screenName),
                    // Pass navigation config for consistency across all screens
                    navigationTabs: projectDetail?.config?.navigationTabs || [],
                    activeTab: screen?.screenName
                }),
            });

            if (!response.ok) {
                try {
                    const errData = await response.json();
                    // Prefer 'message' (detailed), then 'error' (short), then statusText
                    throw new Error(errData.message || errData.error || response.statusText);
                } catch (e) {
                    throw new Error("Generation failed: " + response.statusText);
                }
            }

            if (!response.body) return;

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let currentCode = "";
            let lastUpdate = 0;
            let lastCodeLength = 0;
            let pendingUpdate: string | null = null;
            let rafId: number | null = null;

            const THROTTLE_MS = 300;
            const MIN_CONTENT_LENGTH = 150;
            const SECTION_SIZE = 150;

            const scheduleUpdate = (code: string) => {
                pendingUpdate = code;
                if (!rafId) {
                    rafId = requestAnimationFrame(() => {
                        if (pendingUpdate !== null) {
                            const updateCode = pendingUpdate;
                            setScreenConfig(prev => prev.map((item, i) =>
                                (i === index ? { ...item, code: updateCode } : item)));
                        }
                        rafId = null;
                    });
                }
            };

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value, { stream: true });
                currentCode += chunkValue;

                const cleanDisplayCode = currentCode.replace(/```html/g, '').replace(/```/g, '').trim();

                const now = Date.now();
                const timeSinceLastUpdate = now - lastUpdate;
                const hasEnoughContent = cleanDisplayCode.length > MIN_CONTENT_LENGTH;
                const hasNewSection = cleanDisplayCode.length - lastCodeLength > SECTION_SIZE;

                if ((timeSinceLastUpdate > THROTTLE_MS && hasEnoughContent && hasNewSection) || done) {
                    scheduleUpdate(cleanDisplayCode);
                    lastUpdate = now;
                    lastCodeLength = cleanDisplayCode.length;
                }
            }

            if (pendingUpdate !== null) {
                const finalCode = pendingUpdate;
                setScreenConfig(prev => prev.map((item, i) =>
                    (i === index ? { ...item, code: finalCode } : item)));
            }

        } catch (error: any) {
            console.error(error);
            toast.error(`Failed to generate screen ${index + 1}: ${error.message || 'Unknown error'}`);
        }
    };

    const GenerateScreenUIUX = async () => {
        setLoading(true);

        // Find screens that need generation
        const screensToGenerate = screenConfig
            .map((screen, index) => ({ screen, index }))
            .filter(({ screen }) => !screen?.code);

        // Set all generating indices at once
        const allIndices = screensToGenerate.map(s => s.index);
        setGeneratingIndices(new Set(allIndices));
        setLoadingMsg(`Generating all ${screensToGenerate.length} screens...`);

        // Generate ALL screens in parallel at once
        try {
            await Promise.all(
                screensToGenerate.map(({ screen, index }) => generateSingleScreen(screen, index))
            );
        } catch (error) {
            console.error("Parallel generation error:", error);
            // toast.error("Some screens failed to generate");
        } finally {
            setGeneratingIndices(new Set()); // Reset when done
            setLoading(false);
            setTakeScreenshot(1);
        }
    }

    return (
        <div className="bg-white min-h-screen">
            <ProjectHeader />
            <div className='flex '>
                {/* Loader removed - handled by Sonner */}

                {/* Settings  */}
                <SettingsSection projectDetail={projectDetail}
                    //  @ts-ignore 
                    screenDescription={screenConfig[0]?.screenDescription}
                    takeScreenshot={(mode?: number) => setTakeScreenshot(mode === 1 ? 'figma-export' : Date.now())}
                    screenConfig={screenConfig}
                />

                {/* Canvas  */}
                <Canvas projectDetail={projectDetail}
                    screenConfig={screenConfig}
                    takeScreenshot={takeScreenshot}
                    generatingIndices={generatingIndices}
                    onScreenUpdate={(updatedScreen: ScreenConfig) => {
                        setScreenConfig(prev => prev.map(s => s.id === updatedScreen.id ? updatedScreen : s));
                        setScreenConfigOriginal(prev => prev.map(s => s.id === updatedScreen.id ? updatedScreen : s));
                    }}
                    onScreenDelete={(screenId: number) => {
                        setScreenConfig(prev => prev.filter(s => s.id !== screenId));
                        setScreenConfigOriginal(prev => prev.filter(s => s.id !== screenId));
                    }}
                />
            </div>
        </div>
    )
}

export default ProjectCanvasPlayground
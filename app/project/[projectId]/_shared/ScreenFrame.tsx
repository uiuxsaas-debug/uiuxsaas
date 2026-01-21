"use client";

import { SettingContext } from "@/context/SettingContext";
import { THEMES, themeToCssVars } from "@/data/Themes";
import { ProjectType, ScreenConfig } from "@/type/types";
import { GripVertical } from "lucide-react";
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Rnd } from "react-rnd";
import ScreenHandler from "./ScreenHandler";
import { HtmlWrapper } from "@/data/constant";

type Props = {
    x: number;
    y: number;
    setPanningEnabled: (enabled: boolean) => void;
    width: number;
    height: number;
    htmlCode: string | undefined;
    projectDetail: ProjectType | undefined;
    screen: ScreenConfig | undefined,
    iframeRef_: any,
    isGenerating?: boolean;
    onScreenUpdate?: (updatedScreen: ScreenConfig) => void;
    onScreenDelete?: (screenId: number) => void;
    readOnly?: boolean
};

function ScreenFrame({
    x,
    y,
    setPanningEnabled,
    width,
    height,
    htmlCode,
    projectDetail,
    screen,
    iframeRef_,
    isGenerating = false,
    onScreenUpdate,
    onScreenDelete,
    readOnly = false
}: Props) {
    const { settingsDetail } = useContext(SettingContext);

    const selectedThemeKey = (settingsDetail?.theme ??
        projectDetail?.theme) as keyof typeof THEMES;

    // ✅ Fallback to NETFLIX if theme key doesn't exist in THEMES
    const theme = THEMES[selectedThemeKey] ?? THEMES['NETFLIX'];

    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    useEffect(() => {
        if (iframeRef_) iframeRef_(iframeRef.current);
        return () => {
            if (iframeRef_) iframeRef_(null);
        }
    }, [iframeRef_]);
    // ✅ keep manual resize + auto height in same state
    const [size, setSize] = useState({ width, height });

    // ✅ lock auto-height when switching theme (prevents "height creep")
    const resizingLockedRef = useRef(false);
    const lastThemeRef = useRef<string | undefined>(undefined);

    // ✅ build html with theme css vars - use useMemo to ensure it updates when theme changes
    const isMobile = projectDetail?.device === 'mobile';
    const html = useMemo(() => {
        return HtmlWrapper(theme, htmlCode as string, isMobile);
    }, [theme, htmlCode, isMobile]);

    // ✅ if parent width/height props change, update state (but don't "fight" manual resize)
    useEffect(() => {
        setSize((s) => ({
            width: width ?? s.width,
            height: height ?? s.height,
        }));
    }, [width, height]);

    const measureIframeHeight = useCallback(() => {
        // 🔒 stop auto-height while theme is switching
        if (resizingLockedRef.current) return;

        const iframe = iframeRef.current;
        if (!iframe) return;

        try {
            const doc = iframe.contentDocument;
            if (!doc) return;

            const headerH = 40; // drag bar height
            const htmlEl = doc.documentElement;
            const body = doc.body;

            const contentH = Math.max(
                htmlEl?.scrollHeight ?? 0,
                body?.scrollHeight ?? 0,
                htmlEl?.offsetHeight ?? 0,
                body?.offsetHeight ?? 0
            );

            // Mobile: min 852px (iPhone height), max 4000px (allow long content)
            // Desktop: min 160px, max 2000px
            const isMobileDevice = projectDetail?.device === 'mobile';
            const minH = isMobileDevice ? 852 + headerH : 160;
            const maxH = isMobileDevice ? 4000 : 2000;

            const next = Math.min(Math.max(contentH + headerH, minH), maxH);

            setSize((s) =>
                Math.abs(s.height - next) > 3 ? { ...s, height: next } : s
            );
        } catch {
            // if sandbox/origin blocks access, we can't measure
        }
    }, [projectDetail?.device]);

    // ✅ handle iframe load + DOM changes inside iframe
    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        let cleanupObserver: (() => void) | null = null;

        const onLoad = () => {
            measureIframeHeight();

            const doc = iframe.contentDocument;
            if (!doc) return;

            const observer = new MutationObserver(() => {
                // ignore observer spam during theme switch
                if (resizingLockedRef.current) return;
                measureIframeHeight();
            });

            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true,
            });

            const t1 = window.setTimeout(measureIframeHeight, 50);
            const t2 = window.setTimeout(measureIframeHeight, 200);
            const t3 = window.setTimeout(measureIframeHeight, 600);

            cleanupObserver = () => {
                observer.disconnect();
                window.clearTimeout(t1);
                window.clearTimeout(t2);
                window.clearTimeout(t3);
            };
        };

        iframe.addEventListener("load", onLoad);
        window.addEventListener("resize", measureIframeHeight);

        return () => {
            iframe.removeEventListener("load", onLoad);
            window.removeEventListener("resize", measureIframeHeight);
            cleanupObserver?.();
        };
    }, [measureIframeHeight, html]);

    // ✅ THE IMPORTANT FIX: theme change should NOT increase height forever
    useEffect(() => {
        const currentTheme = settingsDetail?.theme ?? projectDetail?.theme;

        if (lastThemeRef.current !== currentTheme) {
            lastThemeRef.current = currentTheme;

            // 🔒 lock auto measurements during theme reflow
            resizingLockedRef.current = true;

            // reset height baseline (prevents accumulation)
            setSize((s) => ({ ...s, height }));

            // unlock after layout settles, then measure ONCE cleanly
            requestAnimationFrame(() => {
                window.setTimeout(() => {
                    resizingLockedRef.current = false;
                    measureIframeHeight();
                }, 300);
            });
        }
    }, [settingsDetail?.theme, projectDetail?.theme, height, measureIframeHeight]);

    return (
        <Rnd
            default={{
                x,
                y,
                width,
                height,
            }}
            size={size}
            disableDragging
            enableResizing={false}
        >
            <div className="flex gap-2 items-center bg-[#0a0a0f] border border-yellow-500/20 rounded-xl p-4">
                <ScreenHandler
                    screen={screen}
                    theme={theme}
                    iframeRef={iframeRef}
                    projectId={projectDetail?.projectId}
                    onScreenUpdate={onScreenUpdate}
                    onScreenDelete={onScreenDelete}
                    readOnly={readOnly}
                />
            </div>

            {/* iframe height = total container - header (40px from p-4) - gap (12px from mt-3) = calc(100% - 52px) */}
            {/* Key includes theme to force iframe remount when theme changes */}
            <iframe
                key={`iframe-${selectedThemeKey}`}
                ref={iframeRef}
                className="w-full rounded-2xl mt-3 border border-yellow-500/20 shadow-lg shadow-black/20"
                style={{ height: 'calc(100% - 52px)' }}
                sandbox="allow-same-origin allow-scripts"
                srcDoc={html}
            />
        </Rnd>
    );
}


export default ScreenFrame;


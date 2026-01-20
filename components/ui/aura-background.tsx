"use client"

import React from 'react'

interface AuraBackgroundProps {
    className?: string
    alphaMask?: number
}

export function AuraBackground({ className = "", alphaMask = 80 }: AuraBackgroundProps) {
    return (
        <div
            className={`aura-background-component inset-0 pointer-events-none z-0 fixed saturate-200 hue-rotate-180 ${className}`}
            data-alpha-mask={alphaMask}
            style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
            }}
        >
            <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
                <div
                    data-us-project="FixNvEwvWwbu3QX9qC3F"
                    className="absolute w-full h-full left-0 top-0 -z-10"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              !function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();
            `
                    }}
                />
            </div>
        </div>
    )
}

export default AuraBackground

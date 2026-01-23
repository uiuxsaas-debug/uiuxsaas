"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TilesProps {
    className?: string
    rows?: number
    cols?: number
    tileClassName?: string
    tileSize?: "xs" | "sm" | "md" | "lg"
}

const tileSizes = {
    xs: "w-4 h-4 md:w-5 md:h-5",
    sm: "w-6 h-6 md:w-8 md:h-8",
    md: "w-9 h-9 md:w-12 md:h-12",
    lg: "w-12 h-12 md:w-16 md:h-16",
}

export function Tiles({
    className,
    rows = 100,
    cols = 10,
    tileClassName,
    tileSize = "md",
}: TilesProps) {
    const rowsArray = new Array(rows).fill(1)
    const colsArray = new Array(cols).fill(1)

    return (
        <div
            className={cn(
                "relative z-0 flex w-full h-full justify-center",
                className
            )}
        >
            {rowsArray.map((_, i) => (
                <motion.div
                    key={`row-${i}`}
                    className={cn(
                        tileSizes[tileSize],
                        "border-l dark:border-neutral-900 border-black/10 relative",
                        tileClassName
                    )}
                >
                    {colsArray.map((_, j) => (
                        <motion.div
                            whileHover={{
                                backgroundColor: `var(--tile)`,
                                transition: { duration: 0 }
                            }}
                            animate={{
                                transition: { duration: 2 }
                            }}
                            key={`col-${j}`}
                            className={cn(
                                tileSizes[tileSize],
                                "border-r border-t dark:border-neutral-900 border-black/10 relative",
                                tileClassName
                            )}
                        />
                    ))}
                </motion.div>
            ))}
        </div>
    )
}

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
    {
        image: "/thumbnail/img1.png",
    },
    {
        image: "/thumbnail/img2.png",
    },
    {
        image: "/thumbnail/img3.png",
    },
    {
        image: "/thumbnail/img4.png",
    },
    {
        image: "/thumbnail/img5.png",
    }
];

export default function AuthCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="flex h-full max-h-screen flex-col items-center justify-center gap-6 w-full max-w-lg mx-auto overflow-hidden">


            {/* Carousel */}
            <div className="relative w-full h-[40vh] max-h-[400px] flex items-center justify-center perspective-1000">
                <AnimatePresence mode='popLayout'>
                    {slides.map((slide, index) => {
                        // Calculate relative position
                        const offset = (index - currentIndex + slides.length) % slides.length;

                        // We only want to show 3 slides: current, previous (last), next (1)
                        // But ensuring the circular logic works for animation is tricky with simple maps.
                        // Let's just show the active one prominently and maybe generic backgrounds.
                        // Actually, let's do a simple stacked fade/slide for robustness.

                        if (index !== currentIndex) return null;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1, zIndex: 10 }}
                                exit={{ opacity: 0, x: -100, scale: 0.9, zIndex: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={slide.image}
                                    alt="Slide"
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Indicators/Controls */}
            <div className="flex items-center justify-center gap-6 text-white">
                <button onClick={prevSlide} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                        />
                    ))}
                </div>
                <button onClick={nextSlide} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}

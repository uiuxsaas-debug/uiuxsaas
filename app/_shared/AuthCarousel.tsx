"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
    { image: "/thumbnail/1.jpeg" },
    { image: "/thumbnail/2.png" },
    { image: "/thumbnail/3.jpeg" },
    { image: "/thumbnail/4.png" },
    { image: "/thumbnail/5.jpeg" },
    { image: "/thumbnail/6.jpeg" },
    { image: "/thumbnail/7.jpeg" },
    { image: "/thumbnail/8.jpeg" },
    { image: "/thumbnail/9.jpeg" },
    { image: "/thumbnail/10.jpeg" }

];

export default function AuthCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 w-full mx-auto flex-1 min-h-0">
            {/* Carousel Container */}
            <div className="relative w-full h-full flex items-center justify-center flex-1 min-h-0">

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {/* Enlarged Image Container without border/bg */}
                        <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src={slides[currentIndex].image}
                                alt={`App showcase ${currentIndex + 1}`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-6 text-white pb-6 bg-transparent">
                <button
                    onClick={prevSlide}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 active:scale-95"
                    aria-label="Previous slide"
                >
                    <ArrowLeft size={18} />
                </button>

                <div className="flex gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 active:scale-95"
                    aria-label="Next slide"
                >
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}

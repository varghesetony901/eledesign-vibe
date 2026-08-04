"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sun,
  Trees,
  Upload,
  Wand2,
  Zap,
  ArrowLeftRight
} from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect, useCallback } from "react";

export const PathSelector: React.FC = () => {
  const [position, setPosition] = useState<number>(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (

    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Decorative Subtle Ambient Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-forest/5  blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/30 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <Trees className="w-3.5 h-3.5 " />
            <span>Choose Your Path</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
          >
            How would you like to design your outdoor space?
          </motion.h2>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* CARD A: Readymade Outdoor Concepts */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative  bg-white border border-brand-charcoal/10 overflow-hidden shadow-sm hover:shadow-lg  transition-all duration-500 flex flex-col justify-between"
          >
            {/* Top Image Banner */}
            <div className="relative h-64 sm:h-80 lg:h-72 w-full overflow-hidden">
              <img
                src="/garden_3.jpeg"
                alt="Readymade Outdoor Garden Concept"
                className="w-full h-full object-cover object-bottom"
              />
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold drop-shadow-sm">
                Readymade Concepts
              </h3>

              <p className="text-sm sm:text-base leading-relaxed font-sans">
                Explore expertly pre-designed outdoor garden collections
                engineered for backyards, terraces, and open patios.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-blue-600" />
                  <span>
                    Pre-calculated outdoor spacing & sunlight requirements
                  </span>
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <Sun className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>
                    Weather-hardy plants with soil & irrigation guides
                  </span>
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>100% Outdoor Plant Survival Guarantee</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-brand-charcoal/10 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/gardens"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-700 text-white font-bold  shadow-md transition-all hover:scale-[1] active:scale-[0.99] text-center sm:text-left"
                >
                  <span>Explore Readymade Concepts</span>
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* CARD B: AI Photo Generator (Powered by Neighborbrite) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group relative  bg-white border border-brand-charcoal/10 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col justify-between"
          >
            {/* Top Image Banner with Before/After AI Transformation Overlay */}
            <div 
              ref={containerRef}
              className="relative h-64 sm:h-80 lg:h-72 w-full overflow-hidden cursor-ew-resize select-none"
            >
              {/* BEFORE IMAGE (Background) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="/garden1before.png"
                  alt="Bare concrete balcony before transformation"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              {/* AFTER IMAGE (Foreground Overlay with CSS clip-path) */}
              <div
                className="absolute inset-0 h-full w-full pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <img
                  src="/garden1.png"
                  alt="Lush green garden balcony after transformation"
                  className="w-full h-full object-cover pointer-events-none absolute inset-0"
                />
              </div>

              {/* SLIDER HANDLE LINE & THUMB BUTTON */}
              <div
                className="absolute top-0 bottom-0 z-20 w-1 bg-white/70 backdrop-blur-xs cursor-ew-resize flex items-center justify-center"
                style={{ left: `${position}%` }}
                onMouseDown={startDrag}
                onTouchStart={startDrag}
              >
                {/* Floating Grip Button */}
                <div className="w-8 h-8 rounded-full bg-white/80 border border-brand-charcoal/15 shadow-md flex items-center justify-center transition-transform duration-200 active:scale-95">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-black" />
                </div>
              </div>
            </div>


            {/* Card Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              {/* Floating AI Visual Mockup Tag */}
              <div className=" flex items-end justify-between">
                <h3 className="text-2xl sm:text-3xl font-extrabold  mt-1 drop-shadow-sm">
                  AI Photo Generator
                </h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed font-sans">
                Upload a photo of your unworked outdoor yard, lawn, or patio.
                Neighborbrite AI instantly generates custom outdoor landscape
                renders.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3 font-medium">
                  <Upload className="w-4.5 h-4.5 text-orange-500" />

                  <span>Upload any outdoor yard, lawn, or patio photo</span>
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <Zap className="w-4.5 h-4.5 text-indigo-500" />

                  <span>
                    Neighborbrite AI renders realistic landscape options
                  </span>
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-4.5 h-4.5 text-green-800" />

                  <span>
                    Direct 1-click cart matching for rendered outdoor flora
                  </span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-brand-charcoal/10 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/ai-canvas"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black/80 text-white font-bold shadow-md transition-all hover:scale-[1] active:scale-[0.99] text-center sm:text-left"
                >
                 
                  <span>Design Outdoor Space with AI</span>
                   <Wand2 className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0 ml-1" />
                 
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

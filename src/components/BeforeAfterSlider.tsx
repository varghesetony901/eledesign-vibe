"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Eye, ArrowLeftRight, RotateCcw } from "lucide-react";

export const BeforeAfterSlider: React.FC = () => {
  const [position, setPosition] = useState<number>(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Before & After high-fidelity images
  const beforeImage = "/garden1before.png"; // Bare architectural concrete floor structure
  const afterImage = "/garden1.png"; // Fully realized lush modular balcony oasis

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

  // Event Listeners for dragging across document (prevents drag release bugs when cursor leaves container)
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

  // Auto-transition shortcuts
  const autoSlide = (target: number) => {
    const start = position;
    const distance = target - start;
    const duration = 400; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      
      setPosition(start + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-brand-charcoal/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-sage leading-none flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Spatial Transformation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-forest">
            Visualize Your Oasis
          </h2>
          <div className="h-0.5 w-12 bg-brand-sage/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-charcoal/70 max-w-2xl mx-auto font-medium">
            Drag the handle to witness how a bare, uninspiring space metamorphoses into a premium, custom-curated EleDesigns garden layout.
          </p>
        </div>

        {/* Slider Frame */}
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden aspect-16/10 md:aspect-video shadow-2xl border border-brand-charcoal/15 bg-brand-charcoal select-none">
          
          {/* Main Slider Area */}
          <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full cursor-ew-resize"
          >
            {/* BEFORE IMAGE (Background) */}
            <div className="absolute inset-0 w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={beforeImage}
                alt="Bare concrete balcony before transformation"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-brand-charcoal/15 pointer-events-none" />
            </div>

            {/* AFTER IMAGE (Foreground Overlay with CSS clip-path) */}
            <div
              className="absolute inset-0 h-full w-full pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={afterImage}
                alt="Lush green garden balcony after transformation"
                className="w-full h-full object-cover pointer-events-none absolute inset-0"
              />
              <div className="absolute inset-0 bg-brand-forest/5 pointer-events-none" />
            </div>

            {/* SLIDER HANDLE LINE & THUMB BUTTON */}
            <div
              className="absolute top-0 bottom-0 z-20 w-1 bg-white/70 backdrop-blur-xs cursor-ew-resize flex items-center justify-center"
              style={{ left: `${position}%` }}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
            >
              {/* Floating Glassmorphic Grip Button */}
              <div className="w-12 h-12 rounded-full bg-white/80 hover:bg-white border border-brand-charcoal/15 shadow-xl backdrop-blur-md flex items-center justify-center transition-transform duration-200 active:scale-90 select-none">
                <ArrowLeftRight className="w-5 h-5 text-brand-forest animate-pulse" />
              </div>
            </div>

            {/* FLOATING TEXT BADGES */}
            {/* Before Badge (Far Right) */}
            <div
              className="absolute right-6 top-6 z-10 px-4 py-2 rounded-full bg-brand-charcoal/70 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-opacity duration-300"
              style={{ opacity: position > 85 ? 0 : 1 }}
            >
              Bare Concrete Space
            </div>

            {/* After Badge (Far Left) */}
            <div
              className="absolute left-6 top-6 z-10 px-4 py-2 rounded-full bg-brand-forest/85 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-opacity duration-300"
              style={{ opacity: position < 15 ? 0 : 1 }}
            >
              EleDesigns Oasis
            </div>
          </div>
        </div>

        {/* Quick presets controller */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => autoSlide(0)}
            className="px-6 py-2.5 bg-white border border-brand-charcoal/15 hover:border-brand-charcoal/40 text-xs font-bold text-brand-charcoal/80 rounded-full transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Eye className="w-4 h-4 text-brand-charcoal/60" />
            Show Before
          </button>
          
          <button
            onClick={() => autoSlide(50)}
            className="px-6 py-2.5 bg-brand-cream border border-brand-charcoal/10 hover:border-brand-charcoal/30 text-xs font-bold text-brand-forest rounded-full transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <RotateCcw className="w-4 h-4 text-brand-sage" />
            Compare 50/50
          </button>

          <button
            onClick={() => autoSlide(100)}
            className="px-6 py-2.5 bg-brand-forest hover:bg-brand-forest-light text-xs font-bold text-white rounded-full transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-brand-sage-light" />
            Show After
          </button>
        </div>

      </div>
    </section>
  );
};

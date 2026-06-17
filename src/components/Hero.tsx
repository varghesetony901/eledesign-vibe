"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  image: string;
  tag: string;
  title: string;
  description: string;
  cta1Text: string;
  cta1Href: string;
  cta2Text: string;
  cta2Href: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=2000",
    tag: "Signature Collection",
    title: "Sophisticated Balcony Escapes",
    description:
      "Transform your outdoor balcony into a lush, maintenance-friendly botanical escape. Explore our pre-designed garden layouts tailored to your space.",
    cta1Text: "Explore Readymade Gardens",
    cta1Href: "/#",
    cta2Text: "Design with AI",
    cta2Href: "/#",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=2000",
    tag: "Interior Botanical Layouts",
    title: "Lush Living Room Atriums",
    description:
      "Curated selections of air-purifying architectural greenery designed to thrive in your interior spaces. Delivered with step-by-step DIY planting guides.",
    cta1Text: "Explore Houseplants",
    cta1Href: "/#",
    cta2Text: "Design with AI",
    cta2Href: "/#",
  },
  {
    id: 3,
    image: "/garden1.png",
    tag: "Large-Scale Landscaping",
    title: "Luxurious Backyard Havens",
    description:
      "Crafted exterior garden systems featuring premium evergreen flora and architectural accents. Optimize your property value with high-fidelity planning.",
    cta1Text: "Explore Outdoor Kits",
    cta1Href: "/#",
    cta2Text: "B2B Trade Portal",
    cta2Href: "/#",
  },
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + SLIDES.length) % SLIDES.length,
    );
  }, []);

  // Set up auto-rotation
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, nextSlide]);

  return (
    <section
      className="relative w-full h-[75vh] md:h-[80vh] overflow-hidden bg-brand-charcoal select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Slide Image with subtle panning / zoom effect */}
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SLIDES[currentIndex].image}
                alt={SLIDES[currentIndex].title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Dark Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/45 to-brand-charcoal/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left flex flex-col items-center md:items-start text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl space-y-4 md:space-y-6"
            >
              {/* Tag */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold uppercase tracking-wider text-brand-sage-light">
                <Sparkles className="w-3 h-3 text-brand-sage-light" />
                {SLIDES[currentIndex].tag}
              </span>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white drop-shadow-md">
                {SLIDES[currentIndex].title}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed font-sans font-medium drop-shadow-sm">
                {SLIDES[currentIndex].description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  href={SLIDES[currentIndex].cta1Href}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-brand-forest hover:bg-brand-forest-light text-brand-cream font-semibold rounded-full shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-98"
                >
                  <Compass className="w-4 h-4" />
                  <span>{SLIDES[currentIndex].cta1Text}</span>
                </Link>
                <Link
                  href={SLIDES[currentIndex].cta2Href}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-98"
                >
                  <span>{SLIDES[currentIndex].cta2Text}</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Manual Slide Controls (Desktop) */}
      <div className="hidden md:block">
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white backdrop-blur-md transition-all cursor-pointer focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white backdrop-blur-md transition-all cursor-pointer focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2.5">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
              idx === currentIndex
                ? "w-8 bg-brand-cream"
                : "w-2.5 bg-white/35 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

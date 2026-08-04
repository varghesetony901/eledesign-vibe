"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Compass, Wand2 } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
    image: "/garden/heiz_steinig.jpeg",
    tag: "Extremely low-maintenance",
    title: "Heiß & Steinig",
    description:
      "Heat-resistant, creeping plants such as Aubrieta and Armeria thrive even on hot stone.",
    cta1Text: "Explore Readymade Gardens",
    cta1Href: "/gardens",
    cta2Text: "Design with AI",
    cta2Href: "/ai-canvas",
  },
  {
    id: 2,
    image: "/garden/wild_hoch.jpeg",
    tag: "Tall grasses and perennials",
    title: "Wild & Hoch",
    description:
      "An impressive planting design with heights reaching up to 2 meters, composed of lance-shaped flower spikes (Verbascum), lush Panicum grasses, and mallows.",
    cta1Text: "Explore Concept Gardens",
    cta1Href: "/gardens",
    cta2Text: "Design Your Garden",
    cta2Href: "/ai-canvas",
  },
  {
    id: 3,
    image: "/garden/romantisch.jpeg",
    tag: "Harmonious and dreamy",
    title: "Romantisch & Zart",
    description:
      "Delicate shades of soft pink, cream, and vibrant purple create a calm, elegant atmosphere. Featuring spherical flower globes, fragrant upright perennials, and feather-light grass.",
    cta1Text: "Explore Outdoor Kits",
    cta1Href: "/gardens",
    cta2Text: "Custom Design",
    cta2Href: "/ai-canvas",
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
      className="relative w-full  h-[92vh] overflow-hidden bg-brand-charcoal select-none"
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Slide Image with subtle panning / zoom effect */}
            <motion.div
              initial={{ scale: 1.05, rotate: 1 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 4, ease: "easeOut" }}
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
            <div className="absolute inset-0 bg-linear-to-t from-brand-charcoal/20 via-brand-charcoal/30 to-brand-charcoal/10" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Content Overlay */}
      <div className="absolute bottom-[20vh] left-1/2 -translate-x-1/2 z-10 px-4 w-full flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href={SLIDES[currentIndex].cta1Href}
              className="flex items-center justify-center gap-2  px-6 py-3.5 bg-green-700 text-brand-cream font-semibold  shadow-lg text-base whitespace-nowrap w-full"
            >
              <Compass className="w-5 h-5 shrink-0" />
              <span>{SLIDES[currentIndex].cta1Text}</span>
            </Link>
            <Link
              href={SLIDES[currentIndex].cta2Href}
              className="flex items-center justify-center gap-2  px-6 py-3.5 bg-white/80 border border-white/10 text-black font-semibold  text-base whitespace-nowrap w-full"
            >
              <Wand2 className="w-4 h-4 shrink-0" />
              <span>{SLIDES[currentIndex].cta2Text}</span>
            </Link>
          </motion.div>
        </AnimatePresence>
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

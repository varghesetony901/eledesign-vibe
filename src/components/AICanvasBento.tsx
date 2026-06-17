"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";

export const AICanvasBento: React.FC = () => {
  const emptyRoomImage = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=400";
  const livingRoomImage = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800";

  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-brand-charcoal/10 relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-sage/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* TALL LEFT CARD: Section 6 Statement */}
          <div className="md:col-span-3 bg-brand-cream/80 border border-brand-charcoal/10 rounded-3xl p-8 flex flex-col justify-between shadow-xs relative overflow-hidden min-h-[360px] md:min-h-0">
            {/* Header branding */}
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-brand-sage/5 rounded-full border border-brand-charcoal/5 -z-0 opacity-60" />

            <div className="space-y-6 z-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-sage block">
                THE ELEDIFF
              </span>
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand-charcoal/50 block">Section 6:</span>
                <h3 className="text-2xl font-extrabold text-brand-forest leading-tight tracking-tight font-sans">
                  AI-Powered Custom Garden Canvas
                </h3>
                <p className="text-sm text-brand-charcoal/70 leading-relaxed font-semibold">
                  Asymmetric Bento grid workflow overview.
                </p>
              </div>
            </div>

            {/* Bottom Slideshow Indicator dots matching the screenshot */}
            <div className="flex items-center gap-1.5 pt-6 z-10">
              <span className="h-1.5 w-6 rounded-full bg-brand-forest/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-charcoal/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-charcoal/20" />
            </div>
          </div>

          {/* MIDDLE COLUMN CONTAINER (Step 1 & Step 2) */}
          <div className="md:col-span-3 flex flex-col gap-6 justify-between">
            
            {/* STEP 1 CARD */}
            <div className="bg-brand-cream/40 border border-brand-charcoal/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden h-[180px]">
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-brand-forest uppercase tracking-wider">
                  Step 1:
                </h4>
                <p className="text-sm font-bold text-brand-charcoal/80">
                  Upload Your Photo
                </p>
              </div>

              {/* Photo Thumbnail */}
              <div className="w-24 h-16 rounded-xl overflow-hidden border border-brand-charcoal/10 shadow-sm mt-3 relative z-10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={emptyRoomImage}
                  alt="Empty room"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* FLOATING OVERLAPPING PHOTOS: Extending across borders as requested in mockup */}
              <div className="absolute right-[-20px] bottom-[-10px] z-20 flex gap-1 pointer-events-none">
                <div className="w-20 h-16 rounded-xl overflow-hidden border border-white shadow-lg rotate-[-12deg] bg-white translate-x-4 translate-y-[-10px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={emptyRoomImage} alt="skewed room 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-20 h-16 rounded-xl overflow-hidden border border-white shadow-lg rotate-[8deg] bg-white translate-y-[-5px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={emptyRoomImage} alt="skewed room 2" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* STEP 2 CARD */}
            <div className="bg-brand-cream/40 border border-brand-charcoal/10 rounded-3xl p-6 flex flex-col justify-between h-[200px]">
              <div className="space-y-1.5">
                <h4 className="text-xs font-extrabold text-brand-forest uppercase tracking-wider">
                  Step 2:
                </h4>
                <p className="text-sm font-bold text-brand-charcoal/80">
                  Choose Plants
                </p>
              </div>

              {/* Static Plant list matching mockup exactly */}
              <div className="space-y-2 mt-3 text-xs font-semibold text-brand-charcoal/70">
                <div className="flex items-center justify-between p-1.5 bg-white border border-brand-charcoal/5 rounded-xl">
                  <span className="flex items-center gap-1.5">
                    🌱 <span className="text-brand-forest font-bold">Ficus Lyrata</span>
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                </div>
                <div className="flex items-center justify-between p-1.5 bg-white/40 border border-transparent rounded-xl">
                  <span className="flex items-center gap-1.5">
                    🌿 <span>Peace Lily</span>
                  </span>
                  <span className="text-[10px] text-brand-charcoal/40">🌸</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-white/40 border border-transparent rounded-xl">
                  <span className="flex items-center gap-1.5">
                    🍀 <span>Boston Fern</span>
                  </span>
                  <span className="text-[10px] text-brand-charcoal/40">🕸️</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN CONTAINER (AI Preview & Step 3 / CTA) */}
          <div className="md:col-span-6 flex flex-col gap-6 justify-between">
            
            {/* LARGE AI PREVIEW CARD */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-brand-charcoal/10 shadow-lg bg-brand-charcoal flex-grow min-h-[260px] md:min-h-0">
              {/* Sofa Scene Backdrop */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={livingRoomImage}
                alt="AI preview layout"
                className="w-full h-full object-cover absolute inset-0 pointer-events-none"
              />
              <div className="absolute inset-0 bg-brand-charcoal/20 pointer-events-none" />

              {/* Dotted Scan Area Overlay */}
              <div className="absolute top-[10%] left-[5%] right-[20%] bottom-[15%] border-2 border-dashed border-white/60 rounded-2xl flex flex-col justify-between p-4 pointer-events-none">
                {/* Dotted Area Label */}
                <div className="self-end bg-brand-charcoal/60 backdrop-blur-xs border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  Analyzing Area: Light & Dimensions
                </div>

                {/* SVG glowing green outline drawings simulating AI placement */}
                <div className="absolute bottom-4 left-6 flex items-end gap-10">
                  
                  {/* Neon Monstera Outline Drawing */}
                  <svg
                    width="70"
                    height="90"
                    viewBox="0 0 100 120"
                    className="drop-shadow-[0_0_8px_rgba(74,222,128,0.9)] opacity-90"
                  >
                    <path
                      d="M 50 110 C 50 80 40 40 50 20 C 53 18 57 18 60 20 C 65 30 75 40 70 55 C 80 50 90 60 85 70 C 80 80 75 75 70 85 C 65 95 60 105 50 110"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 50 110 C 50 80 60 40 50 20 C 47 18 43 18 40 20 C 35 30 25 40 30 55 C 20 50 10 60 15 70 C 20 80 25 75 30 85 C 35 95 40 105 50 110"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="2.5"
                    />
                    {/* Stem rib */}
                    <path d="M 50 20 L 50 110" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                  </svg>

                  {/* Neon Snake Plant Outline Drawing */}
                  <svg
                    width="45"
                    height="100"
                    viewBox="0 0 60 130"
                    className="drop-shadow-[0_0_8px_rgba(74,222,128,0.9)] opacity-90"
                  >
                    {/* Leaf 1 */}
                    <path d="M 20 120 C 15 80 25 40 30 10 C 35 40 25 80 20 120 Z" fill="none" stroke="#4ade80" strokeWidth="2.5" />
                    {/* Leaf 2 */}
                    <path d="M 40 120 C 35 90 40 50 42 20 C 45 50 35 90 40 120 Z" fill="none" stroke="#4ade80" strokeWidth="2.5" />
                    {/* Leaf 3 */}
                    <path d="M 30 120 C 25 95 30 65 31 35 C 33 65 25 95 30 120 Z" fill="none" stroke="#4ade80" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Bottom Status text */}
              <div className="absolute left-6 bottom-4 text-xs font-bold text-white/90 drop-shadow-md">
                AI Generating Preview...
              </div>
            </div>

            {/* LOWER ROW (Step 3 & CTA) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* STEP 3 CARD */}
              <div className="bg-brand-cream/40 border border-brand-charcoal/10 rounded-2xl p-5 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-brand-sage uppercase tracking-widest block mb-1">
                  Step 3:
                </span>
                <h5 className="text-sm font-extrabold text-brand-forest">
                  Instant 3D Preview
                </h5>
              </div>

              {/* LAUNCH CTA CARD */}
              <div className="bg-brand-cream/40 border border-brand-charcoal/10 rounded-2xl p-5 flex flex-col justify-between gap-3">
                <h5 className="text-sm font-extrabold text-brand-forest">
                  Customize. Finalize. Order.
                </h5>
                <Link
                  href="/ai-canvas"
                  className="px-4 py-2.5 bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Try EleDesigns AI Canvas Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { Ruler, Truck, Building2, X, ChevronRight, ArrowRight, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

interface TrustItem {
  id: "sizes" | "delivery" | "b2b";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  colorClass: string;
  detailedText: string;
  ctaText: string;
}

export const TrustBanner: React.FC = () => {
  const { isB2B, setIsB2B } = useApp();
  const [activeDetail, setActiveDetail] = useState<TrustItem | null>(null);
  const [hoveredSize, setHoveredSize] = useState<string | null>(null);

  const sizesList = [
    { label: "XS", desc: "Balconies & Patios (up to 4ft)" },
    { label: "S", desc: "Small Terraces & Decks (4-8ft)" },
    { label: "M", desc: "Standard Courtyards (8-12ft)" },
    { label: "L", desc: "Urban Townhouses (12-16ft)" },
    { label: "XL", desc: "Suburban Gardens (16-24ft)" },
    { label: "XXL", desc: "Estate Backyards (24-32ft)" },
    { label: "3XL", desc: "Commercial Atriums (32-40ft)" },
    { label: "4XL", desc: "Grand Landscapes (40ft+)" },
  ];

  const trustItems: TrustItem[] = [
    {
      id: "sizes",
      icon: Ruler,
      title: "8 Readymade Sizes",
      subtitle: "Pre-configured architectural packages.",
      tagline: "Tailored for any landscape scale",
      badge: "Compact to Grand",
      colorClass: "text-emerald-700 bg-emerald-50 border-emerald-100",
      detailedText: "Our modular garden systems are meticulously engineered to scale across 8 standard configurations—from compact XS balcony kits (up to 4ft) to luxurious XXXL estate landscapes (over 40ft). Each size ensures optimal botanical pairing, plant spacing, and aesthetic harmony.",
      ctaText: "Explore Garden Sizes",
    },
    {
      id: "delivery",
      icon: Truck,
      title: "Nationwide DIY Delivery",
      subtitle: "Includes precise planting blueprints.",
      tagline: "Foolproof self-installation",
      badge: "Secure Transit",
      colorClass: "text-amber-800 bg-amber-50 border-amber-100",
      detailedText: "We pack and ship premium, healthy nursery specimens nationwide using temperature-controlled freight. Every order includes a customized, high-fidelity DIY planting blueprint specifying exact layout coordinates, soil preparation steps, and microclimate care guides.",
      ctaText: "View Sample Guide",
    },
    {
      id: "b2b",
      icon: Building2,
      title: "B2B Bulk Trade Portal",
      subtitle: "Unlock volume pricing and rates.",
      tagline: "For architects and trade pros",
      badge: isB2B ? "Active: Partner Rate" : "Available",
      colorClass: "text-indigo-800 bg-indigo-50 border-indigo-100",
      detailedText: "Unlock wholesale pricing, volume discount tiers, automated tax-exemption, and dedicated landscape architect accounts. Instantly request formal purchase orders (PO) or schedule staggered, project-phased deliveries.",
      ctaText: isB2B ? "Switch to Retail Storefront" : "Switch to Trade Portal",
    },
  ];

  const handleItemClick = (id: string) => {
    const matched = trustItems.find((t) => t.id === id);
    if (matched) {
      if (id === "b2b") {
        setIsB2B(!isB2B);
      } else {
        setActiveDetail(matched);
      }
    }
  };

  // Staggered Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <>
      <section className="w-full bg-brand-cream/40 py-16 md:py-24 border-y border-brand-charcoal/10 relative overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-sage/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-forest/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Elegant Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-sage leading-none">
              The EleDifference
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-forest font-sans">
              Engineering Botanical Perfection
            </h2>
            <div className="h-0.5 w-12 bg-brand-sage/40 mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-brand-charcoal/70 max-w-2xl mx-auto font-medium">
              Architectural standards met with professional-grade logistics, modular scaling, and exclusive commercial trade benefits.
            </p>
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* CARD 1: 8 Readymade Sizes */}
            <motion.div
              variants={cardVariants}
              onClick={() => handleItemClick("sizes")}
              className="group relative bg-gradient-to-br from-white to-brand-cream/40 border border-brand-charcoal/10 rounded-3xl p-8 hover:shadow-xl hover:border-brand-forest/20 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 select-none"
            >
              <div className="space-y-6">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-white border border-brand-charcoal/5 shadow-xs text-brand-forest group-hover:scale-105 transition-all duration-300">
                    <Ruler className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border text-emerald-700 bg-emerald-50 border-emerald-100">
                    Compact to Grand
                  </span>
                </div>

                {/* Core Title & Text */}
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-brand-forest">8 Readymade Sizes</h3>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-medium">
                    Pre-configured architectural packages tailored from compact balcony fits to expansive estates.
                  </p>
                </div>

                {/* Size Grid Visualizer */}
                <div className="pt-2">
                  <div className="grid grid-cols-4 gap-1.5">
                    {sizesList.map((size) => (
                      <div
                        key={size.label}
                        onMouseEnter={() => setHoveredSize(size.desc)}
                        onMouseLeave={() => setHoveredSize(null)}
                        className="h-10 rounded-lg border border-brand-charcoal/10 flex items-center justify-center text-xs font-bold hover:bg-brand-forest hover:text-white hover:border-brand-forest transition-all duration-200"
                      >
                        {size.label}
                      </div>
                    ))}
                  </div>
                  {/* Tooltip description */}
                  <div className="h-6 mt-3 text-center">
                    {hoveredSize ? (
                      <p className="text-xs font-semibold text-brand-forest animate-fade-in">
                        {hoveredSize}
                      </p>
                    ) : (
                      <p className="text-xs text-brand-charcoal/40 italic">
                        Hover over a size to inspect dimension fits
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Indicator */}
              <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-forest pt-6 border-t border-brand-charcoal/5 mt-6">
                <span>Explore Dimensions</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* CARD 2: Nationwide DIY Delivery */}
            <motion.div
              variants={cardVariants}
              onClick={() => handleItemClick("delivery")}
              className="group relative bg-gradient-to-br from-white to-brand-cream/40 border border-brand-charcoal/10 rounded-3xl p-8 hover:shadow-xl hover:border-brand-forest/20 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 select-none"
            >
              <div className="space-y-6">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-white border border-brand-charcoal/5 shadow-xs text-brand-forest group-hover:scale-105 transition-all duration-300">
                    <Truck className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border text-amber-800 bg-amber-50 border-amber-100">
                    Secure Transit
                  </span>
                </div>

                {/* Core Title & Text */}
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-brand-forest">Nationwide DIY Delivery</h3>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-medium">
                    We securely ship temperature-controlled nursery plants alongside high-fidelity planting guides.
                  </p>
                </div>

                {/* Logistics Route Stepper Visualizer */}
                <div className="py-4 px-2 bg-brand-cream/50 rounded-2xl border border-brand-charcoal/5 flex justify-between items-center text-xs font-bold text-brand-forest/70 relative">
                  <div className="flex flex-col items-center gap-1 z-10">
                    <div className="w-7 h-7 rounded-full bg-white border-2 border-brand-forest flex items-center justify-center text-brand-forest shadow-xs">
                      1
                    </div>
                    <span>Freight</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-brand-charcoal/10 mx-2 -mt-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-sage" />
                  </div>
                  <div className="flex flex-col items-center gap-1 z-10">
                    <div className="w-7 h-7 rounded-full bg-white border-2 border-brand-forest flex items-center justify-center text-brand-forest shadow-xs">
                      2
                    </div>
                    <span>Route</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-brand-charcoal/10 mx-2 -mt-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-sage" />
                  </div>
                  <div className="flex flex-col items-center gap-1 z-10">
                    <div className="w-7 h-7 rounded-full bg-white border-2 border-brand-forest flex items-center justify-center text-brand-forest shadow-xs">
                      3
                    </div>
                    <span>Guide</span>
                  </div>
                </div>
              </div>

              {/* Footer Indicator */}
              <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-forest pt-6 border-t border-brand-charcoal/5 mt-6">
                <span>View Logistics Flow</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* CARD 3: B2B Bulk Trade Portal (Dynamic background depending on isB2B state) */}
            <motion.div
              variants={cardVariants}
              className={`relative border rounded-3xl p-8 shadow-sm transition-all duration-500 flex flex-col justify-between select-none ${
                isB2B
                  ? "bg-brand-forest text-white border-white/10 premium-shadow"
                  : "bg-gradient-to-br from-white to-brand-cream/40 border-brand-charcoal/10 text-brand-charcoal hover:border-brand-forest/20 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div className="space-y-6">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className={`p-3.5 rounded-2xl border transition-colors duration-500 ${
                    isB2B
                      ? "bg-white/10 border-white/20 text-brand-sage-light"
                      : "bg-white border-brand-charcoal/5 text-brand-forest"
                  }`}>
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border transition-colors duration-500 ${
                    isB2B
                      ? "text-emerald-300 bg-emerald-950/40 border-emerald-500/30"
                      : "text-indigo-800 bg-indigo-50 border-indigo-100"
                  }`}>
                    {isB2B ? "Active: Partner Rate" : "Available"}
                  </span>
                </div>

                {/* Core Title & Text */}
                <div className="space-y-2">
                  <h3 className={`text-xl font-extrabold transition-colors duration-500 ${
                    isB2B ? "text-white" : "text-brand-forest"
                  }`}>
                    B2B Bulk Trade Portal
                  </h3>
                  <p className={`text-sm leading-relaxed font-medium transition-colors duration-500 ${
                    isB2B ? "text-white/80" : "text-brand-charcoal/70"
                  }`}>
                    Unlock bulk wholesale pricing tiers, automated purchase orders, and architect privileges.
                  </p>
                </div>

                {/* Sliding Toggle Control */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between transition-colors duration-500 ${
                  isB2B
                    ? "bg-white/5 border-white/10"
                    : "bg-brand-cream/50 border-brand-charcoal/5"
                }`}>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">Trade Pricing Mode</span>
                    <span className={`text-[11px] font-medium ${isB2B ? "text-brand-sage-light" : "text-brand-charcoal/55"}`}>
                      {isB2B ? "Wholesale prices unlocked" : "Standard retail view"}
                    </span>
                  </div>

                  {/* Toggle Pill */}
                  <button
                    onClick={() => setIsB2B(!isB2B)}
                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer flex items-center p-1 ${
                      isB2B ? "bg-emerald-600" : "bg-brand-charcoal/20"
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className={`w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center ${
                        isB2B ? "translate-x-6" : ""
                      }`}
                    >
                      {isB2B && <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />}
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setIsB2B(!isB2B)}
                className={`w-full py-3 mt-6 text-xs font-bold rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isB2B
                    ? "bg-white hover:bg-brand-cream text-brand-forest hover:scale-[1.01]"
                    : "bg-brand-forest hover:bg-brand-forest-light text-white hover:scale-[1.01]"
                }`}
              >
                <span>{isB2B ? "Switch to Retail Store" : "Switch to Trade Portal"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Elegant Details Modal */}
      <AnimatePresence>
        {activeDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetail(null)}
              className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-charcoal/10 overflow-hidden"
            >
              {/* Header Icon Decoration */}
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-brand-cream rounded-full border border-brand-charcoal/5 -z-0 opacity-50" />

              <div className="relative z-10 space-y-6">
                {/* Upper Badge & Close Button */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${activeDetail.colorClass}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    {activeDetail.tagline}
                  </span>
                  <button
                    onClick={() => setActiveDetail(null)}
                    className="p-1.5 rounded-full hover:bg-brand-cream border border-transparent hover:border-brand-charcoal/10 text-brand-charcoal/60 hover:text-brand-charcoal transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-brand-forest tracking-tight">
                    {activeDetail.title}
                  </h3>
                  <p className="text-sm font-semibold text-brand-charcoal/50">
                    {activeDetail.subtitle}
                  </p>
                </div>

                {/* Main Content */}
                <div className="bg-brand-cream/60 border border-brand-charcoal/5 rounded-2xl p-5 text-sm text-brand-charcoal/80 leading-relaxed font-sans font-medium">
                  {activeDetail.detailedText}
                </div>

                {/* Action CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => setActiveDetail(null)}
                    className="w-full sm:flex-1 py-3 bg-brand-forest hover:bg-brand-forest-light text-white text-sm font-bold rounded-full flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
                  >
                    <span>{activeDetail.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveDetail(null)}
                    className="w-full sm:w-auto px-6 py-3 border border-brand-charcoal/15 hover:border-brand-charcoal/40 text-sm font-bold text-brand-charcoal/80 rounded-full transition-all active:scale-98 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

"use client";

import { useApp } from "@/context/AppContext";
import { GardenPackage } from "@/data/gardensData";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Compass,
  Droplets,
  Layers,
  Maximize2,
  ShoppingBag,
  Sun,
  TreePine,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

interface GardenDetailClientProps {
  garden: GardenPackage;
  allGardens: GardenPackage[];
}

export const GardenDetailClient: React.FC<GardenDetailClientProps> = ({
  garden,
  allGardens,
}) => {
  const router = useRouter();
  const { addToCart, isB2B } = useApp();

  // Customizer States
  const [selectedArea, setSelectedArea] = useState<number>(10); // in sqm
  const [activeTab, setActiveTab] = useState<
    "plants" | "layout" | "care" | "compatibility"
  >("plants");

  // Compatibility Evaluator States
  const [userSunlight, setUserSunlight] = useState<string>("full_sun");
  const [userSoil, setUserSoil] = useState<string>("well_drained");

  // Related garden packages (excluding current)
  const relatedGardens = useMemo(() => {
    return allGardens.filter((g) => g.id !== garden.id).slice(0, 3);
  }, [allGardens, garden.id]);

  // Price Calculation Logic
  // Base price is for a standard 10 sqm garden.
  const priceMultiplier = useMemo(() => {
    if (selectedArea === 5) return 0.65;
    if (selectedArea === 10) return 1.0;
    if (selectedArea === 20) return 1.8;
    if (selectedArea === 50) return 4.0;
    // Linear scale with 10% wholesale discount for custom high areas
    return (selectedArea / 10) * 0.9;
  }, [selectedArea]);

  const basePrice = garden.price_eur;
  const rawPrice = basePrice * priceMultiplier;
  const finalPrice = isB2B ? Math.round(rawPrice * 0.8) : Math.round(rawPrice);

  // Plants quantities calculation
  const density = garden.planting_density_per_sqm || 7;
  const totalPlants = Math.round(selectedArea * density);

  const plantCounts = useMemo(() => {
    if (!garden.plants_detail) return [];
    return garden.plants_detail.map((plant) => {
      const count = Math.max(1, Math.round((plant.ratio / 100) * totalPlants));
      return {
        ...plant,
        calculatedCount: count,
      };
    });
  }, [garden.plants_detail, totalPlants]);

  // Compatibility Rating
  const compatibilityReport = useMemo(() => {
    let score = 100;
    const warnings: string[] = [];

    // Check light compatibility
    const isLightCompatible = garden.sunlight.includes(userSunlight as any);
    if (!isLightCompatible) {
      score -= 40;
      warnings.push(
        `This garden package prefers ${garden.sunlight.map((s) => s.replace("_", " ")).join(" or ")}, but your location has ${userSunlight.replace("_", " ")}.`,
      );
    }

    // Check soil compatibility
    const isSoilCompatible = garden.soil_type.includes(userSoil);
    if (!isSoilCompatible) {
      score -= 30;
      warnings.push(
        `The plants in this package thrive in ${garden.soil_type.map((s) => s.replace("_", " ")).join(", ")} soil. Your soil is listed as ${userSoil.replace("_", " ")}.`,
      );
    }

    let status: "perfect" | "good" | "poor" = "perfect";
    if (score < 50) status = "poor";
    else if (score < 90) status = "good";

    return { score, warnings, status };
  }, [garden.sunlight, garden.soil_type, userSunlight, userSoil]);

  const handleAddToCartClick = () => {
    // Add to cart as a specialized configuration item
    const itemToAdd = {
      id: `${garden.id}-${selectedArea}sqm`,
      name: `${garden.title_en} (${selectedArea} m² Layout)`,
      priceB2C: Math.round(basePrice * priceMultiplier),
      priceB2B: Math.round(basePrice * priceMultiplier * 0.8),
      image: garden.image_url,
      category: "Garden Package",
    };
    addToCart(itemToAdd, 1);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back navigation & Breadcrumbs */}
        <div className="flex flex-col  gap-4 mb-8">
          <button
            onClick={() => router.push("/gardens")}
            className="inline-flex items-center gap-2 text-sm font-bold  group w-fit"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Concepts</span>
          </button>

          <div className="text-xs font-medium">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/gardens" className="hover:underline">
              Garden Concepts
            </Link>
            <span className="mx-2">/</span>
            <span className="font-bold">{garden.title_en}</span>
          </div>
        </div>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left Column: Image and quick specs */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-4/3 w-full overflow-hidden border border-brand-charcoal/10 shadow-sm"
            >
              <img
                src={garden.image_url}
                alt={garden.title_en}
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </motion.div>

            {/* Quick specifications grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-4 border border-brand-charcoal/5 flex flex-col justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                  Sunlight
                </span>
                <span className="text-sm font-bold flex items-center gap-1.5 capitalize">
                  <Sun className="w-4 h-4 text-amber-600" />
                  {garden.sunlight[0]?.replace("_", " ")}
                </span>
              </div>
              <div className="bg-white p-4 border border-brand-charcoal/5 flex flex-col justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                  Watering
                </span>
                <span className="text-sm font-bold flex items-center gap-1.5 capitalize">
                  <Droplets className="w-4 h-4 text-sky-600" />
                  {garden.water_requirement}
                </span>
              </div>
              <div className="bg-white p-4 border border-brand-charcoal/5 flex flex-col justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                  Maintenance
                </span>
                <span className="text-sm font-bold flex items-center gap-1.5 capitalize">
                  <Wrench className="w-4 h-4 text-emerald-600" />
                  {garden.maintenance_level} Care
                </span>
              </div>
              <div className="bg-white p-4 border border-brand-charcoal/5 flex flex-col justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider block mb-1">
                  Max Height
                </span>
                <span className="text-sm font-bold flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-black/90" />
                  {garden.max_height_cm} cm
                </span>
              </div>
            </div>

            {/* Color Palette & Features Display */}
            <div className="bg-white p-6 border border-brand-charcoal/5 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest  mb-3">
                  Color Palette
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {garden.color_palette.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 inline-block shadow-sm"
                        style={{
                          backgroundColor:
                            color === "cream"
                              ? "#FDFBF7"
                              : color === "rose"
                                ? "#F5D6D6"
                                : color === "silver"
                                  ? "#D1D5DB"
                                  : color === "magenta"
                                    ? "#D946EF"
                                    : color === "blue"
                                      ? "#3B82F6"
                                      : color === "dark_green"
                                        ? "#1B4D34"
                                        : color === "orange"
                                          ? "#F97316"
                                          : color === "red"
                                            ? "#EF4444"
                                            : color === "yellow"
                                              ? "#EAB308"
                                              : color === "pink"
                                                ? "#EC4899"
                                                : color === "purple"
                                                  ? "#A855F7"
                                                  : color === "natural_green"
                                                    ? "#22C55E"
                                                    : color === "blue_green"
                                                      ? "#0D9488"
                                                      : color === "lush_green"
                                                        ? "#15803D"
                                                        : color ===
                                                            "mediterranean_green"
                                                          ? "#16A34A"
                                                          : color === "white"
                                                            ? "#FFFFFF"
                                                            : "#8C7865",
                        }}
                      />
                      <span className="text-sm font-semibold capitalize ">
                        {color.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-brand-charcoal/10 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-widest  mb-3">
                  Garden Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {garden.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-brand-cream border border-brand-charcoal/15 text-[11px] uppercase font-bold tracking-widest "
                    >
                      {tag.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer, Pricing and Cart Actions */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                  {garden.title_en}
                </h1>
                <p className=" text-black/90 mt-2 font-medium italic">
                  {garden.tagline_en}
                </p>
              </div>

              {/* Description */}
              <div className="border-t border-b border-brand-charcoal/10 py-5">
                <p className="leading-relaxed text-black/90">
                  {garden.description_en}
                </p>
              </div>

              {/* Customizer: Area Selector */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold uppercase tracking-wider text-black">
                    Select Garden Area Size
                  </label>
                  <span className="text-lg font-extrabold text-black">
                    {selectedArea} m²
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 20, 50].map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setSelectedArea(area)}
                      className={`py-3 text-xs font-extrabold border transition-all ${
                        selectedArea === area
                          ? "bg-black text-white border-black shadow-sm"
                          : "bg-white text-black/90 border-brand-charcoal/15 hover:border-brand-charcoal/40"
                      }`}
                    >
                      {area === 10 ? "10 m² (Std)" : `${area} m²`}
                    </button>
                  ))}
                </div>

                {/* <p className="text-[11px] text-black/60 font-semibold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-brand-sage" />
                  Prices scale optimized for bulk. Estimated {totalPlants}{" "}
                  plants total (approx. {density} plants/m²).
                </p> */}
              </div>

              {/* Soil / Sun check notification if poor match */}
              {compatibilityReport.status === "poor" && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 flex gap-3 text-black">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-amber-800">
                      Compatibility Alert
                    </p>
                    <p className="text-sm leading-relaxed text-black/90">
                      The current light condition you selected below might not
                      be optimal for this plant collection.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Price & Cart Card */}
            <div className="bg-white border border-brand-charcoal/10 p-6 shadow-sm mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black block">
                    Estimated Cost
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-black">
                      €{finalPrice}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-black block">
                    Includes custom blueprint
                  </span>
                  <span className="text-xs text-black/90 font-semibold block mt-0.5">
                    Delivery within 3-5 days
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCartClick}
                className="w-full bg-black hover:bg-black/90 text-white py-4 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Extended Interactive Sections: Tabs Container */}
        <div className="bg-white border border-brand-charcoal/10 shadow-xs mb-16">
          <div className="border-b border-brand-charcoal/10 flex flex-wrap">
            {[
              { id: "plants", label: "Plant Composition", icon: TreePine },
              { id: "layout", label: "2D Layout & Layers", icon: Layers },
              { id: "care", label: "Seasonal Care Guide", icon: Calendar },
              {
                id: "compatibility",
                label: "Compatibility Check",
                icon: Compass,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex w-full sm:w-fit items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === tab.id ? " bg-black/5" : "border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {/* TAB 1: Plant Composition */}
                {activeTab === "plants" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-brand-charcoal/10 pb-4">
                      <div>
                        <h2 className="text-xl font-extrabold text-black">
                          Species Mix
                        </h2>
                        <p className="text-sm text-black/90 mt-1">
                          Detailed list of varieties configured for your{" "}
                          {selectedArea} m² space.
                        </p>
                      </div>
                      <div className="bg-brand-cream px-3 py-1.5 border border-brand-charcoal/10 text-xs font-extrabold text-black">
                        Total Plants: {totalPlants}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {plantCounts.map((plant, index) => (
                        <div
                          key={index}
                          className="bg-brand-cream/30 p-3 border border-brand-charcoal/5 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <h3 className="font-extrabold text-black text-base">
                                  {plant.name}
                                </h3>
                                <p className="text-xs font-bold  italic mt-0.5">
                                  {plant.scientific_name}
                                </p>
                              </div>
                              <span className="px-2.5 py-1 bg-white border border-brand-charcoal/10 text-xs font-extrabold text-black">
                                {plant.calculatedCount} pcs
                              </span>
                            </div>

                            <p className="text-[13px] text-black/90 mt-3 leading-relaxed">
                              {plant.description_en}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-brand-charcoal/5 pt-3 mt-4 text-[10px] font-bold text-black uppercase tracking-wider">
                            <span>
                              Role:{" "}
                              <strong className="text-black">
                                {plant.role}
                              </strong>
                            </span>
                            <span>
                              Height:{" "}
                              <strong className="text-black">
                                {plant.height_cm} cm
                              </strong>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: 2D Planting Visualizer & Layers */}
                {activeTab === "layout" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-extrabold text-black">
                        Planting Blueprint Guide
                      </h2>
                      <p className="text-sm  mt-1 text-black/90">
                        Understand the layered arrangement designed for maximum
                        depth, light capture and seasonal color overlap.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Diagram Representation */}
                      {/* <div className="lg:col-span-7 bg-brand-cream p-6 border border-brand-charcoal/15 relative overflow-hidden flex flex-col justify-between min-h-87.5">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 block mb-4">
                            Depth Layout Diagram (Rear to Front)
                          </span>

                          <div className="space-y-6 pt-2">
                          
                            <div className="border border-dashed border-brand-charcoal/20 p-4 bg-white/40">
                              <div className="flex items-center justify-between text-xs font-bold text-black mb-2">
                                <span>
                                  LAYER 3: BACKGROUND STRUCTURAL (Tall /
                                  Architectural)
                                </span>
                                <span>Rear Border</span>
                              </div>
                              <div className="flex gap-2">
                                {plantCounts
                                  .filter(
                                    (p) =>
                                      p.role === "structural" ||
                                      p.role === "grass",
                                  )
                                  .map((p, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-black/5 border border-black/10 text-black text-[11px] font-bold px-3 py-1"
                                    >
                                      {p.name} ({p.calculatedCount} pcs)
                                    </span>
                                  ))}
                              </div>
                            </div>

                        
                            <div className="border border-dashed border-brand-charcoal/20 p-4 bg-white/40">
                              <div className="flex items-center justify-between text-xs font-bold text-black mb-2">
                                <span>
                                  LAYER 2: MIDGROUND ACCENT (Middling Height /
                                  Core Blooms)
                                </span>
                                <span>Center Fill</span>
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                {plantCounts
                                  .filter((p) => p.role === "accent")
                                  .map((p, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-black/5 border border-black/10 text-black text-[11px] font-bold px-3 py-1"
                                    >
                                      {p.name} ({p.calculatedCount} pcs)
                                    </span>
                                  ))}
                              </div>
                            </div>

                           
                            <div className="border border-dashed border-brand-charcoal/20 p-4 bg-white/40">
                              <div className="flex items-center justify-between text-xs font-bold text-black mb-2">
                                <span>
                                  LAYER 1: FOREGROUND BORDER (Creeping /
                                  Low-lying mats)
                                </span>
                                <span>Front Edging</span>
                              </div>
                              <div className="flex gap-2">
                                {plantCounts
                                  .filter((p) => p.role === "groundcover")
                                  .map((p, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-black/5 border border-black/10 text-black text-[11px] font-bold px-3 py-1"
                                    >
                                      {p.name} ({p.calculatedCount} pcs)
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-[10px] text-black/50 italic mt-6">
                          * Note: A high-resolution printed planting blueprint
                          sheet is packed inside your delivery, showing precise
                          coordinates based on your selected size.
                        </p>
                      </div> */}

                      {/* Planting Steps Guide */}
                      <div className="lg:col-span-5 space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-black">
                          Quick Installation Steps
                        </h3>

                        <div className="space-y-4">
                          {[
                            {
                              step: "1",
                              title: "Site Preparation",
                              desc: "Clear any existing grass, weeds or large stones. Till soil to a depth of 30cm.",
                            },
                            {
                              step: "2",
                              title: "Enrichment & Grading",
                              desc: "Mix in mature organic compost. Grade the soil surface flat or with a gentle slope.",
                            },
                            {
                              step: "3",
                              title: "Lay the Blueprint Grid",
                              desc: "Unroll the included biological grid template to map plant positioning.",
                            },
                            {
                              step: "4",
                              title: "Dig & Settle",
                              desc: "Place each plant in its coordinates. Backfill soil, tap down lightly and irrigate immediately.",
                            },
                          ].map((step, idx) => (
                            <div key={idx} className="flex gap-3">
                              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                                {step.step}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-black">
                                  {step.title}
                                </h4>
                                <p className="text-[13px] text-black/90 mt-0.5 leading-relaxed">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: Seasonal Care Guide */}
                {activeTab === "care" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-extrabold text-black">
                        Year-Round Seasonal Maintenance
                      </h2>
                      <p className="text-sm text-black/90 mt-1 leading-relaxed">
                        Calendar routines recommended to keep this garden
                        package vibrant and tidy across the seasons.
                      </p>
                    </div>

                    {garden.seasonal_care ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-brand-cream/30 p-5 border border-black/10">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-1.5 border-b border-black/5 pb-2 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-black block" />{" "}
                            Spring Care
                          </h3>
                          <p className="text-[13px] text-black/90 leading-relaxed">
                            {garden.seasonal_care.spring}
                          </p>
                        </div>

                        <div className="bg-brand-cream/30 p-5 border border-black/10">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-1.5 border-b border-black/5 pb-2 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-black block" />{" "}
                            Summer Care
                          </h3>
                          <p className="text-[13px] text-black/90 leading-relaxed">
                            {garden.seasonal_care.summer}
                          </p>
                        </div>

                        <div className="bg-brand-cream/30 p-5 border border-black/10">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-1.5 border-b border-black/5 pb-2 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-black block" />{" "}
                            Autumn Care
                          </h3>
                          <p className="text-[13px] text-black/90 leading-relaxed">
                            {garden.seasonal_care.autumn}
                          </p>
                        </div>

                        <div className="bg-brand-cream/30 p-5 border border-black/10">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-1.5 border-b border-black/5 pb-2 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-black block" />{" "}
                            Winter Care
                          </h3>
                          <p className="text-[13px] text-black/90 leading-relaxed">
                            {garden.seasonal_care.winter}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[13px] text-black/60">
                        No seasonal instructions configured.
                      </p>
                    )}
                  </div>
                )}

                {/* TAB 4: Compatibility Check */}
                {activeTab === "compatibility" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-extrabold text-black">
                        Site Compatibility Evaluation
                      </h2>
                      <p className="text-sm text-black/90 mt-1 leading-relaxed">
                        Specify your target garden attributes to verify if this
                        package will flourish in your specific space.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      {/* Interactive Selectors */}
                      <div className="md:col-span-5 bg-brand-cream/30 p-5 border border-brand-charcoal/10 space-y-5">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-black">
                            Your Sunlight Levels
                          </label>
                          <select
                            value={userSunlight}
                            onChange={(e) => setUserSunlight(e.target.value)}
                            className="w-full p-2.5 bg-white border border-brand-charcoal/15 text-xs font-semibold focus:outline-none"
                          >
                            <option value="full_sun">
                              Full Sun (6+ hours of direct sunlight)
                            </option>
                            <option value="partial_shade">
                              Partial Shade (3-6 hours / dappled sun)
                            </option>
                            <option value="full_shade">
                              Full Shade (less than 3 hours of direct sunlight)
                            </option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-black">
                            Your Soil Classification
                          </label>
                          <select
                            value={userSoil}
                            onChange={(e) => setUserSoil(e.target.value)}
                            className="w-full p-2.5 bg-white border border-brand-charcoal/15 text-xs font-semibold focus:outline-none"
                          >
                            <option value="well_drained">
                              Well-Drained Loamy Soil
                            </option>
                            <option value="dry">
                              Dry, Sandy / Permeable Soil
                            </option>
                            <option value="gravelly">
                              Gravelly, Stony / Lean Soil
                            </option>
                            <option value="loamy">Rich, Humus-rich soil</option>
                            <option value="moist_well_drained">
                              Moist, damp clay loam
                            </option>
                            <option value="clay">
                              Heavy Clay (Slow draining)
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Match Score Display */}
                      <div className="md:col-span-7 bg-white p-6 border border-brand-charcoal/10 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-black">
                              Estimated Growth Success Match
                            </span>
                            <span
                              className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                                compatibilityReport.status === "perfect"
                                  ? "bg-green-100 text-green-700"
                                  : compatibilityReport.status === "good"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {compatibilityReport.status} Match
                            </span>
                          </div>

                          {/* Matching progress bar */}
                          <div className="my-6">
                            <div className="flex justify-between items-center text-sm font-extrabold text-black mb-1.5">
                              <span>Match Score</span>
                              <span>{compatibilityReport.score}%</span>
                            </div>
                            <div className="w-full bg-brand-cream h-2.5 border border-brand-charcoal/10 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${
                                  compatibilityReport.score > 80
                                    ? "bg-black"
                                    : compatibilityReport.score > 50
                                      ? "bg-amber-600"
                                      : "bg-red-700"
                                }`}
                                initial={{ width: "0%" }}
                                animate={{
                                  width: `${compatibilityReport.score}%`,
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                              />
                            </div>
                          </div>

                          {/* Warnings / Success criteria */}
                          <div className="space-y-2 mt-4">
                            {compatibilityReport.warnings.length === 0 ? (
                              <div className="flex gap-2 text-[13px] font-medium text-black/90 items-center leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                                <span>
                                  Perfect matching. The location&apos;s sun exposure
                                  and soil types match this template seamlessly.
                                </span>
                              </div>
                            ) : (
                              compatibilityReport.warnings.map(
                                (warn, index) => (
                                  <div
                                    key={index}
                                    className="flex gap-2 text-[13px] font-medium text-black/80 items-start"
                                  >
                                    <AlertTriangle className="w-4.5 h-4.5 text-amber-700 shrink-0 mt-0.5" />
                                    <span>{warn}</span>
                                  </div>
                                ),
                              )
                            )}
                          </div>
                        </div>

                        <p className="text-[13px] text-black/90 italic mt-6 leading-relaxed">
                          * If compatibility is less than 100%, consider using
                          our interactive AI Studio page to swap plants and
                          tailor configurations to your soil.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RELATED GARDENS SECTION */}
        {relatedGardens.length > 0 && (
          <div className="border-t border-brand-charcoal/15 pt-12">
            <h2 className="text-2xl font-extrabold text-black mb-8">
              You Might Also Interest In
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedGardens.map((g) => (
                <div
                  key={g.id}
                  onClick={() => router.push(`/gardens/${g.id}`)}
                  className="bg-white overflow-hidden border border-brand-charcoal/10 hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="aspect-video w-full overflow-hidden bg-brand-charcoal/5">
                    <img
                      src={g.image_url}
                      alt={g.title_en}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-black group-hover:text-black transition-colors">
                      {g.title_en}
                    </h3>
                    <p className="text-xs text-black/60 mt-1 line-clamp-2">
                      {g.tagline_en}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-charcoal/10">
                      <span className="text-xs font-extrabold text-black">
                        from €{g.price_eur}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-black flex items-center gap-1">
                        View Concept
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

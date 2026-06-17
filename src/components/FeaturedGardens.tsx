"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Eye,
  X,
  Ruler,
  Sparkles,
  Heart,
  Check,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

interface GardenPackage {
  id: string;
  name: string;
  tag: string;
  description: string;
  priceB2C: number;
  priceB2B: number;
  image: string;
  sunlight: string;
  water: string;
  difficulty: string;
  plants: string[];
  planters: string;
  soil: string;
}

const GARDEN_PACKAGES: GardenPackage[] = [
  {
    id: "garden-01",
    name: "Urban Oasis Balcony",
    tag: "Bestseller",
    description:
      "Sleek wooden paneling paired with structural broad-leaf plants and climbing ivy.",
    priceB2C: 399.0,
    priceB2B: 299.0,
    image: "/garden_1.png",
    sunlight: "Partial Sun",
    water: "Moderate",
    difficulty: "Easy",
    plants: [
      "Ficus Lyrata (Fiddle Leaf Fig)",
      "English Ivy",
      "Boston Fern",
      "Peace Lily",
    ],
    planters: "Premium Cedar Wood Planters (3 Units)",
    soil: "EleDesigns Coco-Coir Aerated Soil Mix",
  },
  {
    id: "garden-02",
    name: "Zen Sanctuary Patio",
    tag: "Minimalist",
    description:
      "Gravel accents, stone water basin features, and elegant Japanese Maple specimens.",
    priceB2C: 599.0,
    priceB2B: 479.0,
    image: "/garden_2.png",
    sunlight: "Filtered Shade",
    water: "Low",
    difficulty: "Medium",
    plants: [
      "Dwarf Bamboo",
      "Ophiopogon (Mondo Grass)",
      "Japanese Maple (Acer Palmatum)",
      "Spagnum Moss",
    ],
    planters: "Handcrafted Granite Stone Basins (2 Units)",
    soil: "Acidic Bark-Peat Premium Drainage Mix",
  },
  {
    id: "garden-03",
    name: "English Cottage Border",
    tag: "Romantic",
    description:
      "Lush perennial borders featuring blooming Lavender, Hydrangeas, and Foxgloves.",
    priceB2C: 480.0,
    priceB2B: 380.0,
    image: "/garden_3.jpeg",
    sunlight: "Full Sun",
    water: "High",
    difficulty: "Medium",
    plants: [
      "French Lavender",
      "Hydrangea Macrophylla",
      "Digitalis (Foxglove)",
      "Culinary Sage",
    ],
    planters: "Terracotta Hand-thrown Pots (5 Units)",
    soil: "Organic Compost and Loam Soil Blend",
  },
  {
    id: "garden-04",
    name: "Minimalist Desert Yard",
    tag: "Water-Wise",
    description:
      "Structured Agaves, golden barrel cacti, and warm volcanic rock base layer designs.",
    priceB2C: 350.0,
    priceB2B: 270.0,
    image: "/garden_4.webp",
    sunlight: "Intense Direct Sun",
    water: "Very Low",
    difficulty: "Extremely Easy",
    plants: [
      "Agave Americana",
      "Golden Barrel Cactus",
      "Blue Fescue Grass",
      "Aloe Vera Barbadensis",
    ],
    planters: "Minimalist Matte Fiber-Clay Troughs (3 Units)",
    soil: "Super Coarse Sand, Perlite & Pumice Mix",
  },
  {
    id: "garden-05",
    name: "Scandinavian Forest Deck",
    tag: "Clean Lines",
    description:
      "Sleek pine decking paired with fragrant Pine shrubs, Birch saplings, and white pebbles.",
    priceB2C: 620.0,
    priceB2B: 490.0,
    image: "/garden_5.webp",
    sunlight: "Partial Sun to Shade",
    water: "Moderate",
    difficulty: "Easy",
    plants: [
      "Dwarf Mugo Pine",
      "Silver Birch Sapling",
      "Feather Reed Grass",
      "Scotch Heather",
    ],
    planters: "Linear Anthracite Aluminum Planters (2 Units)",
    soil: "Coniferous Humus & Fine Sand Layer",
  },
  {
    id: "garden-06",
    name: "Mediterranean Herb Terrace",
    tag: "Edible",
    description:
      "Terracotta planters stocked with aromatic Rosemary, Thyme, Olive bushes, and Citrus.",
    priceB2C: 410.0,
    priceB2B: 320.0,
    image: "/garden_6.webp",
    sunlight: "Full Hot Sun",
    water: "Low to Moderate",
    difficulty: "Easy",
    plants: [
      "Tuscan Rosemary",
      "Sweet Italian Basil",
      "Dwarf Frantoio Olive Tree",
      "Meyer Lemon Tree",
    ],
    planters: "Fluted Tuscan Terracotta Pots (4 Units)",
    soil: "Mediterranean Limestone Gravel & Loam Mix",
  },
  {
    id: "garden-07",
    name: "Tropical Rain Canopy",
    tag: "Exotic Accent",
    description:
      "Vibrant Elephant Ears, Bird of Paradise, and humidity-loving architectural philodendrons.",
    priceB2C: 520.0,
    priceB2B: 410.0,
    image: "/garden_7.webp",
    sunlight: "Bright Indirect Light",
    water: "High",
    difficulty: "Hard",
    plants: [
      "Bird of Paradise (Strelitzia)",
      "Monstera Deliciosa",
      "Alocasia Polly",
      "Calathea Orbifolia",
    ],
    planters: "High-Gloss Ceramic Cylinder Planters (3 Units)",
    soil: "Orchid Bark, Charcoal & Sphagnum Moist Mix",
  },
  {
    id: "garden-08",
    name: "Modernist Rooftop Vista",
    tag: "Wind-Hardy",
    description:
      "Tall ornamental grasses, wind-resistant conifers, and sleek modern metal planters.",
    priceB2C: 750.0,
    priceB2B: 590.0,
    image: "/garden_8.jpg",
    sunlight: "Full Exposed Sun",
    water: "Moderate",
    difficulty: "Medium",
    plants: [
      "Karl Foerster Grass",
      "Mugo Pine Globosa",
      "Blue Spruce Shrub",
      "Sedum Autumn Joy",
    ],
    planters: "Heavy-gauge Corten Steel Planter Boxes (2 Units)",
    soil: "Lightweight Roof-Garden Mineral Soil Complex",
  },
];

const SIZES = [
  { code: "XS", multiplier: 0.75, label: "XS (Balcony up to 4ft)" },
  { code: "S", multiplier: 0.85, label: "S (Terrace 4-8ft)" },
  { code: "M", multiplier: 1.0, label: "M (Standard 8-12ft)" },
  { code: "L", multiplier: 1.25, label: "L (Large 12-16ft)" },
  { code: "XL", multiplier: 1.5, label: "XL (Grand 16-24ft)" },
];

export const FeaturedGardens: React.FC = () => {
  const { isB2B, addToCart } = useApp();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    GARDEN_PACKAGES.reduce((acc, p) => ({ ...acc, [p.id]: "M" }), {}),
  );
  const [activeLayout, setActiveLayout] = useState<GardenPackage | null>(null);
  const [likedList, setLikedList] = useState<Record<string, boolean>>({});

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleSizeChange = (packageId: string, sizeCode: string) => {
    setSelectedSizes((prev) => ({ ...prev, [packageId]: sizeCode }));
  };

  const getPrice = (pkg: GardenPackage, sizeCode: string) => {
    const base = isB2B ? pkg.priceB2B : pkg.priceB2C;
    const mult = SIZES.find((s) => s.code === sizeCode)?.multiplier || 1.0;
    return base * mult;
  };

  const handleAddToCart = (pkg: GardenPackage) => {
    const size = selectedSizes[pkg.id] || "M";

    // Package description format matching custom selections
    const cartPackage = {
      id: `${pkg.id}-${size}`,
      name: `${pkg.name} (${size}-Size)`,
      priceB2C:
        pkg.priceB2C * (SIZES.find((s) => s.code === size)?.multiplier || 1.0),
      priceB2B:
        pkg.priceB2B * (SIZES.find((s) => s.code === size)?.multiplier || 1.0),
      image: pkg.image,
      category: "Readymade Gardens",
    };

    addToCart(cartPackage, 1);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedList((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full bg-brand-cream/30 py-16 md:py-24 border-b border-brand-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-sage leading-none flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Spaces
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-forest">
            Featured Readymade Gardens
          </h2>
          <div className="h-0.5 w-12 bg-brand-sage/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-charcoal/70 max-w-2xl mx-auto font-medium">
            Pre-assembled collections styled by our botanical architects. Select
            your scale, review companion species, and order instantly.
          </p>
        </div>

        {/* Gardens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {GARDEN_PACKAGES.map((pkg) => {
            const size = selectedSizes[pkg.id];
            const price = getPrice(pkg, size);
            const isLiked = likedList[pkg.id] || false;

            return (
              <div
                key={pkg.id}
                className="bg-white border border-brand-charcoal/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-brand-charcoal/10 transition-all duration-300 flex flex-col justify-between premium-card-shadow relative group"
              >
                {/* Image & Overlays */}
                <div className="relative aspect-4/3 overflow-hidden bg-brand-charcoal/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-brand-forest shadow-xs backdrop-blur-xs">
                    {pkg.tag}
                  </span>

                  {/* Favorite Like Button */}
                  <button
                    onClick={(e) => toggleLike(pkg.id, e)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white border border-brand-charcoal/5 text-brand-charcoal/70 hover:text-brand-charcoal shadow-xs transition-transform active:scale-90 cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${isLiked ? "fill-rose-500 text-rose-500" : ""}`}
                    />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-brand-forest leading-snug group-hover:text-brand-forest-light transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-brand-charcoal/60 leading-relaxed font-medium line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Sizing Selector Pill Panel */}
                  <div className="space-y-2 pt-1 border-t border-brand-charcoal/5">
                    <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-wider block">
                      Select Size Scale:
                    </span>
                    <div className="flex gap-1.5 flex-wrap">
                      {SIZES.map((sz) => (
                        <button
                          key={sz.code}
                          onClick={() => handleSizeChange(pkg.id, sz.code)}
                          className={`w-7.5 h-7.5 rounded-full text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                            size === sz.code
                              ? "bg-brand-forest text-white shadow-xs"
                              : "bg-brand-cream hover:bg-brand-charcoal/5 text-brand-charcoal/70"
                          }`}
                          title={sz.label}
                        >
                          {sz.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Drawer */}
                  <div className="space-y-4 pt-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-brand-forest">
                        {formatPrice(price)}
                      </span>
                      {isB2B && (
                        <span className="text-[10px] font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100">
                          Trade Rate
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                      <button
                        onClick={() => handleAddToCart(pkg)}
                        className="py-3 px-2 bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-97 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Buy Package</span>
                      </button>

                      <button
                        onClick={() => setActiveLayout(pkg)}
                        className="py-3 bg-white border border-brand-charcoal/15 hover:border-brand-charcoal/40 text-brand-charcoal/80 text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-97 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-brand-charcoal/50" />
                        <span>View Layout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-out Layout Details Sheet (Side Drawer Panel) */}
      <AnimatePresence>
        {activeLayout && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLayout(null)}
              className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-xs"
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-white border-l border-brand-charcoal/10 flex flex-col shadow-2xl"
              >
                {/* Header */}
                <div className="p-6 border-b border-brand-charcoal/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-sage block mb-1">
                      Botanical Blueprint
                    </span>
                    <h3 className="text-xl font-extrabold text-brand-forest">
                      {activeLayout.name} Layout
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveLayout(null)}
                    className="p-1.5 rounded-full hover:bg-brand-cream border border-transparent hover:border-brand-charcoal/10 text-brand-charcoal/60 hover:text-brand-charcoal transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Banner Image */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-brand-charcoal/5 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeLayout.image}
                      alt={activeLayout.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Microclimate Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-brand-cream/60 border border-brand-charcoal/5 rounded-2xl p-3 text-center">
                      <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase block mb-1">
                        Sunlight
                      </span>
                      <span className="text-xs font-bold text-brand-forest">
                        {activeLayout.sunlight}
                      </span>
                    </div>
                    <div className="bg-brand-cream/60 border border-brand-charcoal/5 rounded-2xl p-3 text-center">
                      <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase block mb-1">
                        Watering
                      </span>
                      <span className="text-xs font-bold text-brand-forest">
                        {activeLayout.water}
                      </span>
                    </div>
                    <div className="bg-brand-cream/60 border border-brand-charcoal/5 rounded-2xl p-3 text-center">
                      <span className="text-[10px] font-bold text-brand-charcoal/40 uppercase block mb-1">
                        Difficulty
                      </span>
                      <span className="text-xs font-bold text-brand-forest">
                        {activeLayout.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Companion Plants List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-sage">
                      Included Plant Inventory:
                    </h4>
                    <ul className="space-y-2">
                      {activeLayout.plants.map((plant, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 px-4 py-3 bg-brand-cream/40 rounded-xl border border-brand-charcoal/5 text-xs font-bold text-brand-charcoal"
                        >
                          <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                          <span>{plant}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hardware details */}
                  <div className="space-y-3 pt-2 border-t border-brand-charcoal/5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-sage">
                      Planters & Soil specs:
                    </h4>
                    <div className="space-y-2 text-xs font-medium text-brand-charcoal/70">
                      <p className="flex justify-between">
                        <span className="font-bold">Structure:</span>
                        <span>{activeLayout.planters}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-bold">Substrate:</span>
                        <span>{activeLayout.soil}</span>
                      </p>
                    </div>
                  </div>

                  {/* Delivery disclaimer */}
                  <div className="p-4 bg-brand-forest/5 rounded-2xl border border-brand-forest/10 space-y-1.5">
                    <h5 className="text-xs font-bold text-brand-forest flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5" />
                      <span>DIY Blueprint Assembly</span>
                    </h5>
                    <p className="text-[11px] text-brand-forest/80 font-medium leading-relaxed">
                      This package arrives securely crated in sections. A
                      complete layout coordinate map is included for foolproof
                      self-installation.
                    </p>
                  </div>
                </div>

                {/* CTA Action in sheet */}
                <div className="p-6 border-t border-brand-charcoal/10 bg-brand-cream/20">
                  <button
                    onClick={() => {
                      handleAddToCart(activeLayout);
                      setActiveLayout(null);
                    }}
                    className="w-full py-4 bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-bold rounded-full flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Purchase Layout Package</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

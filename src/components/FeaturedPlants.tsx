"use client";

import React, { useState } from "react";
import { ShoppingBag, Sparkles, Sun, Droplet, Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface PlantProduct {
  id: string;
  name: string;
  category: string;
  priceB2C: number;
  priceB2B: number;
  sunlight: string;
  water: string;
  image: string;
}

const PLANT_PRODUCTS: PlantProduct[] = [
  {
    id: "plant-01",
    name: "Ficus Lyrata (Fiddle Leaf Fig)",
    category: "Structural Foliage",
    priceB2C: 89.0,
    priceB2B: 65.0,
    sunlight: "Bright Indirect",
    water: "Every 1-2 weeks",
    image: "https://d3r57ia6anwehl.cloudfront.net/Acorus_Argenteostriatus.jpg",
  },
  {
    id: "plant-02",
    name: "Monstera Deliciosa",
    category: "Exotic Climber",
    priceB2C: 75.0,
    priceB2B: 55.0,
    sunlight: "Bright Filtered",
    water: "Every 1-2 weeks",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "plant-03",
    name: "Snake Plant (Sansevieria)",
    category: "Hardy Air Purifier",
    priceB2C: 45.0,
    priceB2B: 32.0,
    sunlight: "Low to Direct",
    water: "Every 3-4 weeks",
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "plant-04",
    name: "ZZ Plant (Zamioculcas)",
    category: "Low Light Champion",
    priceB2C: 49.0,
    priceB2B: 35.0,
    sunlight: "Low Tolerant",
    water: "Every 3-4 weeks",
    image: "https://d3r57ia6anwehl.cloudfront.net/Calamagrostis_x_acutiflora_Overdam_W9A1717%20(1).jpg",
  },
  {
    id: "plant-05",
    name: "Golden Pothos (Devil's Ivy)",
    category: "Vining Shrub",
    priceB2C: 29.0,
    priceB2B: 20.0,
    sunlight: "Low to Bright",
    water: "Every 1 week",
    image: "https://d3r57ia6anwehl.cloudfront.net/elegardens%20(12).JPG",
  },
  {
    id: "plant-06",
    name: "Bird of Paradise",
    category: "Architectural Feature",
    priceB2C: 120.0,
    priceB2B: 95.0,
    sunlight: "Bright Direct",
    water: "Every 1 week",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "plant-07",
    name: "Peace Lily (Spathiphyllum)",
    category: "Bloomer Shrub",
    priceB2C: 38.0,
    priceB2B: 26.0,
    sunlight: "Medium Shade",
    water: "Keep moist",
    image: "https://d3r57ia6anwehl.cloudfront.net/elegardens%20(15).JPG",
  },
  {
    id: "plant-08",
    name: "Rubber Tree (Ficus Elastica)",
    category: "Bold Broad-Leaf",
    priceB2C: 65.0,
    priceB2B: 48.0,
    sunlight: "Bright Indirect",
    water: "Every 1-2 weeks",
    image: "https://d3r57ia6anwehl.cloudfront.net/elegardens%20(14).JPG",
  },
];

export const FeaturedPlants: React.FC = () => {
  const { isB2B, addToCart } = useApp();
  const [likedList, setLikedList] = useState<Record<string, boolean>>({});

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleAddToCart = (plant: PlantProduct) => {
    const cartItem = {
      id: plant.id,
      name: plant.name,
      priceB2C: plant.priceB2C,
      priceB2B: plant.priceB2B,
      image: plant.image,
      category: "Individual Plants",
    };
    addToCart(cartItem, 1);
  };

  const toggleLike = (id: string) => {
    setLikedList((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full bg-brand-cream/15 py-16 md:py-24 border-b border-brand-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-sage leading-none flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Standalone Accents
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-forest">
            Trending Individual Plants
          </h2>
          <div className="h-0.5 w-12 bg-brand-sage/40 mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-brand-charcoal/70 max-w-2xl mx-auto font-medium">
            Fine-tune your layout with specimen plants handselected for shape, color contrast, and resilience.
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLANT_PRODUCTS.map((plant) => {
            const price = isB2B ? plant.priceB2B : plant.priceB2C;
            const isLiked = likedList[plant.id] || false;

            return (
              <div
                key={plant.id}
                className="bg-white border border-brand-charcoal/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-brand-charcoal/10 transition-all duration-300 flex flex-col justify-between premium-card-shadow group relative"
              >
                {/* Image & Favorite Button */}
                <div className="relative aspect-square overflow-hidden bg-brand-charcoal/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-brand-forest shadow-xs">
                    {plant.category}
                  </span>

                  <button
                    onClick={() => toggleLike(plant.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white border border-brand-charcoal/5 text-brand-charcoal/70 hover:text-brand-charcoal shadow-xs transition-transform active:scale-90 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>
                </div>

                {/* Info and Badges */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-brand-forest leading-snug group-hover:text-brand-forest-light transition-colors">
                      {plant.name}
                    </h3>

                    {/* Sunlight & Water Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-charcoal/60 bg-brand-cream/80 border border-brand-charcoal/5 px-2.5 py-1 rounded-full">
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        <span>{plant.sunlight}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-charcoal/60 bg-brand-cream/80 border border-brand-charcoal/5 px-2.5 py-1 rounded-full">
                        <Droplet className="w-3.5 h-3.5 text-sky-500" />
                        <span>{plant.water}</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions Drawer */}
                  <div className="space-y-4 pt-1 border-t border-brand-charcoal/5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-extrabold text-brand-forest">
                        {formatPrice(price)}
                      </span>
                      {isB2B && (
                        <span className="text-[10px] font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 animate-pulse">
                          Partner Price
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(plant)}
                      className="w-full py-3 bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-bold rounded-full flex items-center justify-center gap-2 transition-all shadow-xs active:scale-97 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Project</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

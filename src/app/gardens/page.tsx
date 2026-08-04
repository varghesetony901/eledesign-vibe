"use client";

import { useApp } from "@/context/AppContext";
import { GARDEN_PACKAGES, GardenPackage } from "@/data/gardensData";
import { AnimatePresence, motion } from "framer-motion";
import {
  Droplets,
  Filter,
  RotateCcw,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Wrench,
  X
} from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function GardensPage() {
  const { addToCart, isB2B } = useApp();

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [selectedSunlight, setSelectedSunlight] = useState<string>("all");
  const [selectedWater, setSelectedWater] = useState<string>("all");
  const [selectedMaintenance, setSelectedMaintenance] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "height"
  >("featured");

  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    GARDEN_PACKAGES.forEach((g) => {
      g.tags.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, []);

  // Filter & Sort Logic
  const filteredGardens = useMemo(() => {
    return GARDEN_PACKAGES.filter((garden) => {
      // Search
      if (
        search.trim() !== "" &&
        !garden.title_en.toLowerCase().includes(search.toLowerCase()) &&
        !garden.tagline_en.toLowerCase().includes(search.toLowerCase()) &&
        !garden.featured_plants.some((p) =>
          p.toLowerCase().includes(search.toLowerCase()),
        )
      ) {
        return false;
      }

      // Sunlight
      if (selectedSunlight !== "all") {
        if (!garden.sunlight.includes(selectedSunlight as any)) return false;
      }

      // Water
      if (selectedWater !== "all") {
        if (garden.water_requirement !== selectedWater) return false;
      }

      // Maintenance
      if (selectedMaintenance !== "all") {
        if (garden.maintenance_level !== selectedMaintenance) return false;
      }

      // Price
      if (garden.price_eur > maxPrice) return false;

      // Tag
      if (selectedTag !== "all") {
        if (!garden.tags.includes(selectedTag)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price_eur - b.price_eur;
      if (sortBy === "price-desc") return b.price_eur - a.price_eur;
      if (sortBy === "height") return a.max_height_cm - b.max_height_cm;
      return 0; // featured default
    });
  }, [
    search,
    selectedSunlight,
    selectedWater,
    selectedMaintenance,
    maxPrice,
    selectedTag,
    sortBy,
  ]);

  // Active Filter Count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedSunlight !== "all") count++;
    if (selectedWater !== "all") count++;
    if (selectedMaintenance !== "all") count++;
    if (maxPrice < 200) count++;
    if (selectedTag !== "all") count++;
    if (search.trim() !== "") count++;
    return count;
  }, [
    selectedSunlight,
    selectedWater,
    selectedMaintenance,
    maxPrice,
    selectedTag,
    search,
  ]);

  const resetFilters = () => {
    setSearch("");
    setSelectedSunlight("all");
    setSelectedWater("all");
    setSelectedMaintenance("all");
    setMaxPrice(200);
    setSelectedTag("all");
    setSortBy("featured");
  };

  const handleAddToCart = (e: React.MouseEvent, garden: GardenPackage) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: garden.id,
      name: garden.title_en,
      priceB2C: garden.price_eur,
      priceB2B: Math.round(garden.price_eur * 0.8), // 20% trade discount
      image: garden.image_url,
      category: "Garden Package",
    });
  };

  return (
    <div className="min-h-screen text-brand-charcoal pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="mb-10 text-left">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight "
        >
          Garden Concepts & Packages
        </motion.h1>

        {/* <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-2 text-brand-charcoal/70 text-base sm:text-lg max-w-3xl"
        >
          Explore pre-designed botanical themes meticulously calculated for harmonious heights, colors, and low maintenance. Filter by your garden conditions below.
      </div>

      {/* Main Layout: Left Sidebar + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ================= LEFT SIDEBAR (LARGE SCREENS) ================= */}
          <aside className="hidden lg:block lg:col-span-1 bg-white p-6 pl-0 border-r border-brand-charcoal/10 sticky top-24 self-start space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-none pr-3">
            <div className="flex items-center justify-between border-b border-brand-charcoal/10 pb-4">
              <div className="flex items-center gap-2 font-semibold">
                <SlidersHorizontal className="w-4.5 h-4.5" />
                <span>Filters</span>``
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Search Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider ">
                Search Concepts
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-charcoal/70" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search plants or names..."
                  className="w-full pl-9 pr-4 py-2 bg-brand-cream/50  border border-brand-charcoal/25 text-sm focus:outline-none "
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/70 hover:text-brand-charcoal"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Sunlight Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-black/20 pb-2 ">
                <Sun className="w-4 h-4 text-amber-700" /> Sunlight Exposure
              </label>
              <div className="space-y-1.5 pt-1">
                {[
                  { id: "all", label: "All" },
                  { id: "full_sun", label: "Full Sun (Sonnig)" },
                  {
                    id: "partial_shade",
                    label: "Partial Shade (Halbschatten)",
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-2.5 px-3 py-2  text-sm font-medium cursor-pointer transition-colors ${
                      selectedSunlight === item.id
                        ? "bg-black/90 text-white shadow-sm"
                        : "bg-brand-cream/30 text-brand-charcoal/80 hover:bg-brand-cream/80"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sunlight"
                      checked={selectedSunlight === item.id}
                      onChange={() => setSelectedSunlight(item.id)}
                      className="sr-only"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Water Requirement Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-black/20 pb-2">
                <Droplets className="w-4 h-4 text-sky-600" /> Water Needs
              </label>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[
                  { id: "all", label: "All" },
                  { id: "low", label: "Low" },
                  { id: "medium", label: "Med" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedWater(item.id)}
                    className={`py-1.5 px-2  text-xs font-bold transition-all text-center ${
                      selectedWater === item.id
                        ? "bg-black/90 text-white shadow-sm"
                        : "bg-brand-cream/50 text-brand-charcoal/70 hover:bg-brand-cream"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Maintenance Level Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-black/20 pb-2">
                <Wrench className="w-4 h-4 text-emerald-600" /> Maintenance
              </label>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[
                  { id: "all", label: "All" },
                  { id: "low", label: "Low" },
                  { id: "medium", label: "Med" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMaintenance(item.id)}
                    className={`py-1.5 px-2  text-xs font-bold transition-all text-center ${
                      selectedMaintenance === item.id
                        ? "bg-black/90 text-white shadow-sm"
                        : "bg-brand-cream/50 text-brand-charcoal/70 hover:bg-brand-cream"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="uppercase tracking-wider">Max Price</span>
                <span className=" font-extrabold text-sm">€{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="200"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-forest cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-semibold">
                <span>€100</span>
                <span>€200</span>
              </div>
            </div>

            {/* Specific Tags Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider border-b border-black/20 pb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Features & Tags
              </label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => setSelectedTag("all")}
                  className={`px-2.5 py-1  text-xs font-semibold transition-all ${
                    selectedTag === "all"
                      ? "bg-black/90 text-white"
                      : "bg-brand-cream/60 text-brand-charcoal/70 hover:bg-brand-cream"
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1  text-xs font-semibold capitalize transition-all ${
                      selectedTag === tag
                        ? "bg-black/90 text-white"
                        : "bg-brand-cream/60 text-brand-charcoal/70 hover:bg-brand-cream"
                    }`}
                  >
                    {tag.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ================= RIGHT MAIN CONTENT AREA ================= */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Control Bar (Mobile Filter Toggle + Sort + Count) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 px-0 border-b border-brand-charcoal/10">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-black/90 text-white  font-bold text-sm shadow-sm"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 w-5 h-5 rounded-full bg-white text-brand-forest text-xs flex items-center justify-center font-extrabold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                <span className="text-sm font-bold">
                  Showing{" "}
                  <strong className="text-brand-forest">
                    {filteredGardens.length}
                  </strong>{" "}
                  of {GARDEN_PACKAGES.length} concepts
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <label className="text-xs font-bold uppercase tracking-wider">
                  Sort:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="  font-semibold text-sm py-1.5 px-3  border focus:ouline-none border-black/20 focus:ring-0 ring-0 ring-offset-0"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="height">Max Plant Height</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold ">Active Filters:</span>
                {search && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-xs font-semibold  border border-brand-charcoal/10 shadow-xs">
                    &quot;{search}&quot;
                    <button onClick={() => setSearch("")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {selectedSunlight !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-xs font-semibold  border border-amber-200">
                    Sun: {selectedSunlight.replace(/_/g, " ")}
                    <button onClick={() => setSelectedSunlight("all")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {selectedWater !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-50  text-xs font-semibold  border border-sky-200">
                    Water: {selectedWater}
                    <button onClick={() => setSelectedWater("all")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {selectedMaintenance !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-xs font-semibold  border border-emerald-200">
                    Maint: {selectedMaintenance}
                    <button onClick={() => setSelectedMaintenance("all")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {selectedTag !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-900 text-xs font-semibold  border border-purple-200">
                    Tag: {selectedTag.replace(/_/g, " ")}
                    <button onClick={() => setSelectedTag("all")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {maxPrice < 200 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-brand-charcoal text-xs font-semibold  border border-brand-charcoal/10">
                    Max €{maxPrice}
                    <button onClick={() => setMaxPrice(200)}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs font-extrabold hover:underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredGardens.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredGardens.map((garden, index) => {
                  const effectivePrice = isB2B
                    ? Math.round(garden.price_eur * 0.8)
                    : garden.price_eur;

                  return (
                    <motion.div
                      key={garden.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-0.5"
                    >
                      {/* Image Header */}
                      <Link
                        href={`/gardens/${garden.id}`}
                        className="relative aspect-4/3 w-full overflow-hidden bg-brand-charcoal/5 block"
                      >
                        <img
                          src={garden.image_url}
                          alt={garden.title_en}
                          className="w-full h-full object-cover "
                        />
                      </Link>

                      {/* Card Content */}
                      <div className="p-5 flex flex-col grow justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-extrabold text-brand-charcoal group-hover:text-brand-forest transition-colors">
                              <Link href={`/gardens/${garden.id}`}>
                                {garden.title_en}
                              </Link>
                            </h3>
                          </div>

                          <p className="text-sm text-brand-charcoal mt-2.5 line-clamp-2 leading-relaxed">
                            {garden.tagline_en}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mt-3.5 pt-3 border-t border-brand-charcoal/15">
                            <span className="px-2.5 py-1 bg-green-200/50 text-[12px] font-bold  capitalize">
                              {garden.maintenance_level} Care
                            </span>
                            {garden.sunlight.includes("full_sun") && (
                              <span className="px-2.5 py-1 bg-orange-300/50 text-black/90  text-[12px] font-bold  flex items-center gap-1">
                                <Sun className="w-3 h-3 shrink-0" /> Full Sun
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="pt-4 mt-5 flex items-center justify-between border-t border-brand-charcoal/15">
                          {/* Price Badge */}
                          <div className="bg-black/90  px-3.5 py-2 text-xs font-bold tracking-widest text-white">
                            €{effectivePrice}
                          </div>

                          <div className="flex items-center gap-3">
                            {/* <Link
                              href={`/gardens/${garden.id}`}
                              className="text-xs font-bold hover:underline text-brand-forest"
                            >
                              Details
                            </Link> */}
                            <button
                              onClick={(e) => handleAddToCart(e, garden)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black/90 hover:bg-black/90-light text-white font-bold  text-xs tracking-wide"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-brand-charcoal/15 space-y-4">
                <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-charcoal">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-charcoal">
                  No Garden Concepts Found
                </h3>
                <p className="text-sm text-brand-charcoal max-w-md mx-auto">
                  We couldn&apos;t find any garden concepts matching your filter
                  criteria. Try expanding your search or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-black/90 text-white  font-bold text-sm shadow-sm hover:bg-black/90-light transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= MOBILE FILTER DRAWER ================= */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileFilterOpen(false)}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-xs"
              />
              <motion.div
                initial={{ translateX: "-100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-full max-w-xs bg-white z-50 lg:hidden flex flex-col shadow-2xl p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-4 border-b border-brand-charcoal/10">
                  <div className="flex items-center gap-2 font-semibold">
                    <SlidersHorizontal className="w-4.5 h-4.5" />
                    <span>Filters</span>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1  text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-cream"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="py-6 space-y-6 grow">
                  {/* Search Box */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider">
                      Search Concepts
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-charcoal/70" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search plants or names..."
                        className="w-full pl-9 pr-4 py-2 bg-brand-cream/50  border border-brand-charcoal/25 text-sm focus:outline-none"
                      />
                      {search && (
                        <button
                          onClick={() => setSearch("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/70 hover:text-brand-charcoal"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sunlight Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-black/20 pb-2">
                      <Sun className="w-4 h-4 text-amber-700" /> Sunlight
                      Exposure
                    </label>
                    <div className="space-y-1.5 pt-1">
                      {[
                        { id: "all", label: "All" },
                        { id: "full_sun", label: "Full Sun (Sonnig)" },
                        {
                          id: "partial_shade",
                          label: "Partial Shade (Halbschatten)",
                        },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-center gap-2.5 px-3 py-2  text-sm font-medium cursor-pointer transition-colors ${
                            selectedSunlight === item.id
                              ? "bg-black/90 text-white shadow-sm"
                              : "bg-brand-cream/30 text-brand-charcoal/80 hover:bg-brand-cream/80"
                          }`}
                        >
                          <input
                            type="radio"
                            name="mobile_sunlight"
                            checked={selectedSunlight === item.id}
                            onChange={() => setSelectedSunlight(item.id)}
                            className="sr-only"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Water Requirement Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-black/20 pb-2">
                      <Droplets className="w-4 h-4 text-sky-600" /> Water Needs
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {[
                        { id: "all", label: "All" },
                        { id: "low", label: "Low" },
                        { id: "medium", label: "Med" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedWater(item.id)}
                          className={`py-1.5 px-2  text-xs font-bold transition-all text-center ${
                            selectedWater === item.id
                              ? "bg-black/90 text-white shadow-sm"
                              : "bg-brand-cream/50 text-brand-charcoal/70 hover:bg-brand-cream"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Maintenance Level Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-black/20 pb-2">
                      <Wrench className="w-4 h-4 text-emerald-600" />{" "}
                      Maintenance
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {[
                        { id: "all", label: "All" },
                        { id: "low", label: "Low" },
                        { id: "medium", label: "Med" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedMaintenance(item.id)}
                          className={`py-1.5 px-2  text-xs font-bold transition-all text-center ${
                            selectedMaintenance === item.id
                              ? "bg-black/90 text-white shadow-sm"
                              : "bg-brand-cream/50 text-brand-charcoal/70 hover:bg-brand-cream"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="uppercase tracking-wider">
                        Max Price
                      </span>
                      <span className="font-extrabold text-sm">
                        €{maxPrice}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="200"
                      step="10"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-brand-forest cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-semibold">
                      <span>€100</span>
                      <span>€200</span>
                    </div>
                  </div>

                  {/* Specific Tags Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider border-b border-black/20 pb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Features & Tags
                    </label>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        onClick={() => setSelectedTag("all")}
                        className={`px-2.5 py-1  text-xs font-semibold transition-all ${
                          selectedTag === "all"
                            ? "bg-black/90 text-white"
                            : "bg-brand-cream/60 text-brand-charcoal/70 hover:bg-brand-cream"
                        }`}
                      >
                        All
                      </button>
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className={`px-2.5 py-1  text-xs font-semibold capitalize transition-all ${
                            selectedTag === tag
                              ? "bg-black/90 text-white"
                              : "bg-brand-cream/60 text-brand-charcoal/70 hover:bg-brand-cream"
                          }`}
                        >
                          {tag.replace(/_/g, " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="pt-4 border-t border-brand-charcoal/10 flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-2.5  border border-brand-charcoal/20 font-bold text-xs"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-2.5  bg-black/90 text-white font-bold text-xs shadow-sm"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

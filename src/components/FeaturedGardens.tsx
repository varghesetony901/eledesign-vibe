"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Sprout } from "lucide-react";
import Link from "next/link";
import React from "react";

import { GARDEN_PACKAGES } from "@/data/gardensData";

export const FeaturedGardens: React.FC = () => {
  // Show up to 4 gardens on main page
  const featuredList = GARDEN_PACKAGES.slice(0, 4);

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/30 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
            >
              <Sprout strokeWidth={1.5} className="w-4.5 h-4.5 " />
              <span>Curated Garden Packages</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-tight"
            >
              Featured Garden Concepts
            </motion.h2>

            <p className="text-black/90 mt-3 text-base sm:text-lg leading-relaxed">
              Explore professionally designed plant collections tailored to
              harmonize colors, textures, and seasons in your garden.
            </p>
          </div>

          <Link
            href="/gardens"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-bold  group shrink-0"
          >
            <span>View All Concepts</span>
            <ArrowRight className="w-4.5 h-4.5 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Responsive Grid (1 col on mobile, 2 on sm/md, 4 on lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
          {featuredList.map((garden, index) => (
            <motion.div
              key={garden.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white  bg-green overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col group hover:-translate-y-0.5"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-brand-charcoal/5">
                <img
                  src={garden.image_url}
                  alt={garden.title_en}
                  className="w-full h-full object-cover "
                />
              </div>

              {/* Content */}
              <div className="p-4 pb-6 px-4 flex flex-col grow justify-between">
                <div>
                  <h3 className="text-xl font-bold ">{garden.title_en}</h3>

                  <p className="text-sm mt-2 line-clamp-2 leading-relaxed">
                    {garden.tagline_en}
                  </p>

                  {/* Highlights / Badges */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2.5 py-1 bg-green-200  text-xs font-semibold  bg-green font-sans capitalize">
                      Maintenance: {garden.maintenance_level.replace(/_/g, " ")}
                    </span>
                    <span className="px-2.5 py-1 bg-orange-200  text-xs font-semibold  bg-green font-sans capitalize">
                      height: {garden.min_height_cm}–{garden.max_height_cm} cm
                    </span>
                  </div>
                </div>

                {/* Card Footer / Details Link */}
                <div className="pt-4 mt-4 flex items-center justify-between border-t border-brand-charcoal/20 text-sm">
                  <div className="bg-black/90 backdrop-blur-md px-3 py-1  bg-green text-xs font-extrabold text-white shadow-sm tracking-wide">
                    from €{garden.price_eur}
                  </div>
                  <Link
                    href={`/gardens/${garden.id}`}
                    className="font-bold font-sans flex items-center gap-1 group/btn"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <Link
            href="/gardens"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-700 text-white font-bold  bg-green transition-all shadow-md hover:shadow-lg text-sm tracking-wide group"
          >
            <span>Explore All Garden Concepts</span>
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
};

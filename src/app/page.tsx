"use client";

import { FeaturedGardens } from "@/components/FeaturedGardens";
import { Hero } from "@/components/Hero";
import { PathSelector } from "@/components/PathSelector";
import { TrustBanner } from "@/components/TrustBanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <PathSelector />
      <FeaturedGardens />
      <TrustBanner />
    </div>
  );
}

"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { TrustBanner } from "@/components/TrustBanner";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { FeaturedGardens } from "@/components/FeaturedGardens";
import { AICanvasBento } from "@/components/AICanvasBento";
import { FeaturedPlants } from "@/components/FeaturedPlants";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Footer } from "@/components/Footer";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 2: Hero Slideshow Banner */}
      <Hero />

      {/* Section 3: Trust Banner */}
      <TrustBanner />

      {/* Section 4: Interactive Before & After Slider */}
      <BeforeAfterSlider />

      {/* Section 5: Featured Readymade Gardens */}
      <FeaturedGardens />

      {/* Section 6: AI Custom Design Canvas Bento */}
      <AICanvasBento />

      {/* Section 7: Featured Individual Plants */}
      <FeaturedPlants />

      {/* Section 8: Frequently Asked Questions (FAQ Accordion) */}
      <FAQAccordion />

      {/* Section 9: Customer Reviews & Social Proof */}
      <CustomerReviews />
      <Footer />
    </div>
  );
}

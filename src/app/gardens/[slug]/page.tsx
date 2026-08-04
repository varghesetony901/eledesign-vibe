import React from "react";
import Link from "next/link";
import { getGardenPackageWithDetails } from "@/data/gardensDetailedData";
import { GARDEN_PACKAGES } from "@/data/gardensData";
import { GardenDetailClient } from "@/components/GardenDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Retrieve the full garden metadata with details
  const garden = getGardenPackageWithDetails(slug);

  if (!garden) {
    return (
      <div className="grow flex items-center justify-center p-8 bg-brand-cream text-brand-charcoal min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-3xl font-extrabold ">Concept Not Found</h1>
          <p className="text-brand-charcoal/70">
            We couldn&apos;t locate the garden package <span className="font-mono bg-brand-charcoal/5 px-2 py-1 rounded text-sm">{slug}</span>. It might have been retired or renamed.
          </p>
          <div className="pt-2">
            <Link 
              href="/gardens" 
              className="inline-block bg-black text-white px-6 py-3 font-bold text-xs uppercase tracking-wider"
            >
              Back to Garden Concepts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <GardenDetailClient garden={garden} allGardens={GARDEN_PACKAGES} />;
}


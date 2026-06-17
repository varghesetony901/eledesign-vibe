import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="flex-grow flex items-center justify-center p-8 bg-brand-cream text-brand-charcoal">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-brand-forest">Product Detail</h1>
        <p className="text-brand-charcoal/60">Viewing plant configuration for: <span className="font-mono bg-brand-charcoal/5 px-2 py-1 rounded text-sm">{slug}</span></p>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Star, CheckCircle, Building2, User } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  type: "residential" | "commercial";
  rating: number;
  text: string;
  projectTag: string;
  location: string;
  date: string;
}

export const CustomerReviews: React.FC = () => {

  const reviews: ReviewItem[] = [
    {
      id: "rev-1",
      name: "Marcus Vance",
      role: "Homeowner",
      type: "residential",
      rating: 5,
      text: "The DIY blueprint was incredibly detailed. Every coordinate for soil depth and plant spacing was spot-on. My balcony went from a bare concrete ledge to a stunning botanical oasis in just one afternoon.",
      projectTag: "Balcony Garden - Size M",
      location: "San Francisco, CA",
      date: "May 2026",
    },
    {
      id: "rev-2",
      name: "Elena Rostova",
      role: "Lead Architect, ER Studio",
      type: "commercial",
      rating: 5,
      text: "Using the B2B portal streamlined our procurement for the new tech park atrium. The volume pricing, instant PO generation, and phased delivery plan kept our landscape timeline perfectly synchronized.",
      projectTag: "Tech Atrium - Bulk Order",
      location: "Austin, TX",
      date: "April 2026",
    },
    {
      id: "rev-3",
      name: "Sarah Jenkins",
      role: "Townhouse Owner",
      type: "residential",
      rating: 5,
      text: "I was worried about plants dying in shipping, but the packaging was phenomenal. Each specimen arrived hydrated, secure, and ready for planting. The 30-day health guarantee gave me total peace of mind.",
      projectTag: "Townhouse Courtyard - L",
      location: "Seattle, WA",
      date: "June 2026",
    },
  ];

  return (
    <section 
      id="reviews-section"
      className="py-20 md:py-28 bg-brand-cream/40 text-brand-charcoal border-t border-brand-charcoal/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Minimal Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest leading-none text-brand-sage">
            Social Proof
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-brand-forest">
            Client Testimonials
          </h2>
          <div className="h-0.5 w-12 mx-auto rounded-full bg-brand-sage/40" />
        </div>

        {/* Minimal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="p-8 rounded-3xl border bg-white border-brand-charcoal/5 hover:border-brand-charcoal/10 premium-card-shadow text-brand-charcoal flex flex-col justify-between transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Rating Stars & Verification Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-3.5 h-3.5 fill-current text-brand-forest" 
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide text-brand-forest">
                    <CheckCircle className="w-3 h-3 fill-current" />
                    <span>{review.type === "commercial" ? "Trade Partner" : "Verified Buyer"}</span>
                  </span>
                </div>


                {/* Review Text */}
                <p className="text-sm md:text-base italic font-light leading-relaxed text-brand-charcoal/80">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Identity Details */}
              <div className="pt-6 border-t border-dashed border-current/10 mt-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-extrabold text-sm">{review.name}</h4>
                    <p className="text-brand-charcoal/60">{review.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-brand-charcoal/50">{review.location}</p>
                    <p className="text-brand-charcoal/30">{review.date}</p>
                  </div>
                </div>

                {/* Project Specs Tag */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-forest/5 text-brand-forest">
                    {review.type === "commercial" ? (
                      <Building2 className="w-3.5 h-3.5" />
                    ) : (
                      <User className="w-3.5 h-3.5" />
                    )}
                    <span>{review.projectTag}</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

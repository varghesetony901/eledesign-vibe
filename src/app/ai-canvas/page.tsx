"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check } from "lucide-react";

export default function AICanvasPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail("");
    }, 1000);
  };

  return (
    <div className="grow min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  text-black">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Minimal Icon/Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" /> Coming Soon
          </span>
        </div>

        {/* Clean Typography Headers */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            AI Garden Canvas
          </h1>
          <p className="text-sm font-semibold tracking-wider text-black uppercase">
            Powered by{" "}
            <a
              href="https://neighborbrite.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
            >
              Neighborbrite
            </a>
          </p>

        </div>

        {/* Minimalist description */}
        <p className="text-sm text-black/90 leading-relaxed font-medium">
          An interactive drag-and-drop garden canvas is in development. Define your space, receive companion planting recommendations, and customize mixes tailored to your sunlight and soil levels.
        </p>

        {/* Compact & Clean Subscription Form */}
        <div className="pt-6 border-t border-brand-charcoal/10">
          {subscribed ? (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black text-white p-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <Check className="w-4 h-4" />
              <span>You have been added to the notification list.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-black/90">
                Be the first to know when the studio launches
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-white border border-brand-charcoal/20 text-xs font-semibold focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black hover:bg-black/90 text-white px-6 py-3 font-bold text-xs uppercase tracking-wider transition-all shrink-0 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? "..." : "Notify Me"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

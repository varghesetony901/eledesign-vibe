"use client";

import React, { useState } from "react";
import {  ArrowUp, Send, CheckCircle2, Sprout, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

export const Footer: React.FC = () => {
  const { isB2B } = useApp();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer 
      className={`pt-16 pb-12 transition-colors duration-500 border-t ${
        isB2B 
          ? "bg-[#0b2116] text-white border-white/10" 
          : "bg-brand-cream/80 text-brand-charcoal border-brand-charcoal/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 pb-16">
          
          {/* Column 1: Brand story & Socials */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <Sprout className={`w-5 h-5 ${isB2B ? "text-amber-400" : "text-brand-forest"}`} />
              <span className="font-sans font-bold text-lg tracking-tight uppercase">EleDesigns</span>
            </div>
            
            <p className={`text-sm leading-relaxed max-w-sm font-medium ${
              isB2B ? "text-white/60" : "text-brand-charcoal/70"
            }`}>
              Architectural landscape packages engineered to scale. We supply nursery-grade plants and detailed planting blueprints to elevate your residential and commercial environments.
            </p>

         
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${
              isB2B ? "text-brand-sage-light" : "text-brand-sage"
            }`}>
              Shop & Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {[
                { label: "Garden Packages", href: "#" },
                { label: "Standalone Specimens", href: "#" },
                { label: "AI Canvas Builder", href: "/ai-canvas" },
                { label: "Core Blueprint Tech", href: "#" }
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    className={`transition-colors duration-200 ${
                      isB2B ? "text-white/60 hover:text-amber-300" : "text-brand-charcoal/70 hover:text-brand-forest"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${
              isB2B ? "text-brand-sage-light" : "text-brand-sage"
            }`}>
              Support & Policies
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {[
                { label: "Botanical Shipping Info", href: "#" },
                { label: "Plant Guarantee & Returns", href: "#" },
                { label: "30-Day Health Warranty", href: "#" },
                { label: "Landscape Architect FAQ", href: "#faq-section" }
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    className={`transition-colors duration-200 ${
                      isB2B ? "text-white/60 hover:text-amber-300" : "text-brand-charcoal/70 hover:text-brand-forest"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription ("Join the Green List") */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${
              isB2B ? "text-brand-sage-light" : "text-brand-sage"
            }`}>
              Join the Green List
            </h4>
            <p className={`text-xs leading-relaxed font-medium ${
              isB2B ? "text-white/50" : "text-brand-charcoal/60"
            }`}>
              Receive weekly botanical care logs, modular layout blueprint releases, and exclusive commercial trade portal discounts.
            </p>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="subscribe-form"
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex items-center"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={`w-full text-xs p-3.5 pr-12 rounded-xl border transition-all duration-300 outline-none ${
                      isB2B
                        ? "bg-white/5 border-white/10 focus:border-amber-400 text-white placeholder-white/30"
                        : "bg-white border-brand-charcoal/10 focus:border-brand-forest text-brand-charcoal placeholder-brand-charcoal/45"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Subscribe"
                    className={`absolute right-2 p-2 rounded-lg cursor-pointer transition-all ${
                      isB2B
                        ? "bg-amber-400 hover:bg-amber-500 text-brand-forest"
                        : "bg-brand-forest hover:bg-brand-forest-light text-white"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin block" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className={`flex items-center gap-2 p-3.5 rounded-xl border text-xs font-semibold ${
                    isB2B 
                      ? "bg-amber-400/10 border-amber-400/20 text-amber-300" 
                      : "bg-brand-forest/5 border-brand-forest/15 text-brand-forest"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isB2B ? "border-white/10 text-white/40" : "border-brand-charcoal/10 text-brand-charcoal/40"
        }`}>
          {/* Copyright Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <span>© {new Date().getFullYear()} EleDesigns. All rights reserved.</span>
            <span className="opacity-30">•</span>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Climate Neutral Logistics</span>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer group select-none ${
              isB2B ? "text-white/60 hover:text-white" : "text-brand-charcoal/70 hover:text-brand-charcoal"
            }`}
          >
            <span>Back to top</span>
            <div className={`p-2 rounded-full border transition-all duration-300 group-hover:-translate-y-0.5 ${
              isB2B 
                ? "border-white/10 bg-white/5 text-white" 
                : "border-brand-charcoal/10 bg-white text-brand-charcoal hover:shadow-xs"
            }`}>
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};

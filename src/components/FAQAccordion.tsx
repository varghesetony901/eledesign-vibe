"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Is installation included in my order?",
      answer: "No, we supply the premium plants and a foolproof, detailed planting guide so you can easily install it yourself or with local hands. Each package is designed for clean, straightforward modular placement.",
    },
    {
      question: "Do you support bulk ordering for commercial projects?",
      answer: "Yes, we support bulk trade ordering. You can toggle our B2B interface in the navigation bar to unlock wholesale volume pricing, customizable CAD templates, and dedicated logistics.",
    },
    {
      question: "How do you guarantee plant health during shipping?",
      answer: "Every plant is hand-selected from our premium nurseries, watered right before packing, and secured in customized climate-controlled protective packaging. We back all orders with a 30-day health guarantee.",
    },
    {
      question: "Where do you ship, and what are the delivery costs?",
      answer: "We ship nationwide using specialized carbon-neutral botanical carriers. Standard delivery is free for all readymade garden packages. Individual plant shipping is calculated dynamically at checkout.",
    },
    {
      question: "What is your return policy on live specimens?",
      answer: "Since plants are living organisms, we cannot accept standard returns. However, if any plant arrives damaged or fails within 30 days under our care guidelines, we will ship a replacement free of charge immediately.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq-section"
      className="py-20 md:py-28 bg-brand-cream/40 text-brand-charcoal border-t border-brand-charcoal/10"
    >
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Minimal Centered Header */}
        <div className="text-center space-y-4 mb-16 md:mb-20">
          <span className="text-xs font-extrabold uppercase tracking-widest leading-none text-brand-sage">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-brand-forest">
            Common Inquiries
          </h2>
          <div className="h-0.5 w-12 mx-auto rounded-full bg-brand-sage/40" />
        </div>

        {/* Accordion Stack */}
        <div className="space-y-0">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.question}
                className={`border-t border-brand-charcoal/10 transition-colors duration-300 ${
                  index === faqs.length - 1 ? "border-b" : ""
                }`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-btn-${index}`}
                  className="w-full py-6 md:py-8 flex items-center justify-between gap-6 cursor-pointer select-none text-left group outline-none animate-none"
                >
                  <h3 className={`text-base md:text-lg font-bold tracking-tight transition-colors duration-300 ${
                    isOpen ? "text-brand-forest" : "text-brand-charcoal/80 group-hover:text-brand-forest"
                  }`}>
                    {faq.question}
                  </h3>

                  <div className={`p-1 transition-transform duration-300 shrink-0 ${
                    isOpen ? "text-brand-forest" : "text-brand-charcoal/60 group-hover:text-brand-forest"
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2]" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 md:pb-8 text-sm md:text-base leading-relaxed font-medium text-brand-charcoal/70">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

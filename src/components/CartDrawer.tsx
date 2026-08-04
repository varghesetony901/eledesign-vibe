"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useApp, CartItem } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    isB2B,
  } = useApp();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Get item price based on active mode
  const getItemPrice = (item: CartItem) => {
    if (isB2B) {
      // Check for tier pricing
      if (item.priceB2BTiers && item.priceB2BTiers.length > 0) {
        // Sort tiers descending to find the highest applicable minQty
        const applicableTier = [...item.priceB2BTiers]
          .sort((a, b) => b.minQty - a.minQty)
          .find((t) => item.quantity >= t.minQty);
        return applicableTier ? applicableTier.price : item.priceB2B;
      }
      return item.priceB2B;
    }
    return item.priceB2C;
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = getItemPrice(item);
      return total + price * item.quantity;
    }, 0);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-brand-charcoal cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full max-w-md bg-brand-cream border-l border-brand-charcoal/10 shadow-2xl text-brand-charcoal"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-charcoal/5 bg-brand-cream">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 " />
                <h2 className="text-xl font-bold tracking-tight ">Your Cart</h2>
                <span className="px-2 py-0.5 text-xs font-semibold bg-black/90 text-white ">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                {isB2B && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-800 text-white shadow-sm">
                    B2B Trade Mode
                  </span>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 hover:bg-brand-charcoal/5 transition-colors focus:outline-none focus:ring-0 focus:ring-brand-forest"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-forest/5 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 " />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">Your cart is empty</p>
                    <p className="text-sm  max-w-72">
                      Add premium readymade gardens or plants to start styling your space.
                    </p>
                  </div>
                  <Link
                    href="/gardens"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-black hover:bg-black/90 text-white text-sm font-medium  transition-all duration-200 shadow-sm"
                  >
                    Browse Collections
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-brand-charcoal/5">
                  {cart.map((item) => {
                    const itemPrice = getItemPrice(item);
                    return (
                      <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                        {/* Image */}
                        <div className="relative w-20 h-20  overflow-hidden shrink-0">
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-brand-forest/5 text-brand-forest/40">
                              <ShoppingBag className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-sm line-clamp-1">
                                {item.name}
                              </h3>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 hover:text-red-600 hover:bg-red-50 transition-all focus:outline-none"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs  mt-0.5 capitalize">
                              {item.category || "Plant"}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-white border border-brand-charcoal/10 rounded-full py-1 px-2.5 shadow-sm">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-0.5 rounded-full hover:bg-brand-charcoal/10 transition-colors focus:outline-none"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-6 text-center text-xs font-semibold select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-0.5 rounded-full hover:bg-brand-charcoal/5 transition-colors focus:outline-none"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="font-semibold  text-sm">
                                {formatPrice(itemPrice * item.quantity)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-[10px] text-brand-charcoal/40">
                                  {formatPrice(itemPrice)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-brand-charcoal/10 p-6 bg-white space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="">Estimated Shipping</span>
                    <span className="font-medium ">Calculated at Checkout</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-base font-medium ">Subtotal</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold tracking-tight ">
                        {formatPrice(getSubtotal())}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-forest/3 border border-brand-forest/5 rounded-xl p-3 text-xs  flex flex-col gap-0.5">
                  <div className="font-semibold flex items-center gap-1.5">
                    <span>💡 Delivery Disclaimer</span>
                  </div>
                  <p className="text-brand-charcoal leading-relaxed">
                    All items ship with detailed DIY guides. EleDesigns does not provide installation.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-black hover:bg-black/90 text-white font-medium rounded-full shadow-sm transition-all duration-200"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="flex items-center justify-center w-full py-3 bg-transparent border border-brand-charcoal/20 hover:border-brand-charcoal/45 text-brand-charcoal font-medium rounded-full transition-colors duration-200"
                  >
                    View Shopping Bag
                  </Link> */}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

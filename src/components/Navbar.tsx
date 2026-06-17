"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Building,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const {
    isB2B,
    setIsB2B,
    cart,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Readymade Gardens", href: "/shop?category=readymade" },
    { name: "AI Custom Canvas", href: "/ai-canvas" },
    { name: "Individual Plants", href: "/shop?category=individual" },
    { name: "B2B Bulk Portals", href: "/shop?b2b=true" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const handleB2BPortalClick = (e: React.MouseEvent, href: string) => {
    if (href === "/shop?b2b=true") {
      e.preventDefault();
      setIsB2B(true);
      router.push("/shop?b2b=true");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none"
            >
              <div className="relative w-8 h-8 rounded-lg bg-brand-forest flex items-center justify-center text-white shadow-md shadow-brand-forest/20 group-hover:scale-105 transition-transform duration-200">
                {/* Clean botanical leaf design using inline SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2A7 7 0 0 1 11 20Z" />
                  <path d="M19 2c-2.26 4.33-5.27 7.14-8 8" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-brand-forest font-sans">
                EleDesigns
              </span>
            </Link>
          </div>

          {/* Center: Links (Desktop) */}
          {/* <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isB2BPortal = link.href === "/shop?b2b=true";
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleB2BPortalClick(e, link.href)}
                  className={`relative py-2 text-sm font-medium transition-all duration-200 hover:text-brand-forest focus:outline-none ${
                    isB2BPortal && isB2B
                      ? "text-emerald-800 font-semibold"
                      : isActive
                      ? "text-brand-forest font-semibold"
                      : "text-brand-charcoal/70"
                  }`}
                >
                  {link.name}
         
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-forest scale-x-0 origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "group-hover:scale-x-100"
                    }`}
                  />
                  {isB2BPortal && (
                    <span className="absolute -top-1.5 -right-5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-forest text-brand-cream tracking-wider scale-90">
                      B2B
                    </span>
                  )}
                </Link>
              );
            })}
          </nav> */}

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon / Expanding Search Bar */}
            <div ref={searchRef} className="relative hidden sm:block">
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.form
                    onSubmit={handleSearchSubmit}
                    initial={{ width: 40, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 40, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-brand-charcoal/15 rounded-full pl-3 pr-1 py-1 shadow-sm"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search plants, designs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm focus:outline-none text-brand-charcoal pr-2"
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="p-1 text-brand-charcoal/40 hover:text-brand-charcoal hover:bg-brand-charcoal/5 rounded-full transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2.5 rounded-full text-brand-charcoal/70 hover:text-brand-forest hover:bg-brand-charcoal/5 transition-all duration-200 focus:outline-none"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </AnimatePresence>
            </div>

            {/* User Account / Profile Dropdown */}
            <div ref={profileRef} className="relative hidden sm:block">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`p-2.5 rounded-full text-brand-charcoal/70 hover:text-brand-forest hover:bg-brand-charcoal/5 transition-all duration-200 focus:outline-none flex items-center gap-1 ${
                  isProfileOpen ? "bg-brand-charcoal/5 text-brand-forest" : ""
                }`}
                aria-expanded={isProfileOpen}
                aria-label="Account Menu"
              >
                <div className="relative">
                  <User className="w-5 h-5" />
                  {isB2B && (
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-brand-forest border-2 border-white rounded-full" />
                  )}
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl border border-brand-charcoal/10 shadow-xl py-4 z-50 text-brand-charcoal origin-top-right"
                  >
                    {/* User Info Header */}
                    <div className="px-5 py-3 border-b border-brand-charcoal/5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-forest/10 flex items-center justify-center text-brand-forest font-bold font-sans">
                        {isB2B ? "GP" : "AW"}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-brand-forest">
                          {isB2B ? "Green Trade Partner" : "Alexander Wright"}
                        </h4>
                        <p className="text-xs text-brand-charcoal/50">
                          {isB2B ? "trade@eledesigns.com" : "alexander@gmail.com"}
                        </p>
                      </div>
                    </div>

                    {/* Role Switcher Pill Toggle */}
                    <div className="px-5 py-4 border-b border-brand-charcoal/5 bg-brand-cream/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-brand-charcoal/60 uppercase tracking-wider">
                          Storefront View
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            isB2B
                              ? "bg-brand-forest text-brand-cream"
                              : "bg-brand-charcoal/10 text-brand-charcoal"
                          }`}
                        >
                          {isB2B ? "B2B Trade" : "B2C Retail"}
                        </span>
                      </div>

                      {/* Sliding Toggle Switch */}
                      <div className="relative w-full h-11 bg-brand-charcoal/5 rounded-full p-1 flex items-center cursor-pointer select-none role-switch-shadow">
                        <div
                          onClick={() => setIsB2B(false)}
                          className="w-1/2 h-full flex items-center justify-center text-xs font-medium z-10 text-center transition-colors"
                        >
                          B2C Retail
                        </div>
                        <div
                          onClick={() => setIsB2B(true)}
                          className="w-1/2 h-full flex items-center justify-center text-xs font-medium z-10 text-center transition-colors"
                        >
                          B2B Trade
                        </div>

                        {/* Slide Indicator */}
                        <motion.div
                          className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md z-0"
                          animate={{
                            x: isB2B ? "100%" : "0%",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      </div>
                    </div>

                    {/* Options Links */}
                    <div className="px-3 pt-2 space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm text-brand-charcoal/80 rounded-lg hover:bg-brand-charcoal/5 hover:text-brand-forest transition-colors"
                      >
                        <span className="font-medium">Account Dashboard</span>
                        <ChevronRight className="w-4 h-4 text-brand-charcoal/30" />
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm text-brand-charcoal/80 rounded-lg hover:bg-brand-charcoal/5 hover:text-brand-forest transition-colors"
                      >
                        <span className="font-medium">Order History</span>
                        <ChevronRight className="w-4 h-4 text-brand-charcoal/30" />
                      </Link>

                      {isB2B ? (
                        <Link
                          href="/b2b-portal"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center justify-between w-full px-3 py-2 text-sm text-brand-forest bg-brand-forest/5 rounded-lg hover:bg-brand-forest/10 transition-colors"
                        >
                          <div className="flex items-center gap-1.5 font-semibold">
                            <Briefcase className="w-4 h-4" />
                            <span>B2B Corporate Portal</span>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            setIsB2B(true);
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center justify-between w-full px-3 py-2 text-sm text-brand-charcoal/80 rounded-lg hover:bg-brand-charcoal/5 hover:text-brand-forest transition-colors text-left"
                        >
                          <div className="flex items-center gap-1.5 font-medium">
                            <Building className="w-4 h-4 text-brand-charcoal/40" />
                            <span>Register Trade Profile</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-brand-charcoal/30" />
                        </button>
                      )}

                      <div className="border-t border-brand-charcoal/5 pt-2 mt-2 px-3">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            alert("Logging out...");
                          }}
                          className="w-full py-2.5 text-center text-xs font-semibold hover:bg-red-50 text-red-600 rounded-lg transition-colors border border-red-200/25"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-brand-charcoal/70 hover:text-brand-forest hover:bg-brand-charcoal/5 transition-all duration-200 focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {/* Dynamic Badge Counter with framer-motion */}
              <AnimatePresence>
                {totalCartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key={totalCartCount}
                    className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-bold rounded-full bg-brand-forest text-brand-cream border border-brand-cream shadow-sm"
                  >
                    {totalCartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger Menu (Mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 lg:hidden rounded-full text-brand-charcoal/70 hover:text-brand-forest hover:bg-brand-charcoal/5 transition-all duration-200 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden w-full bg-white border-t border-brand-charcoal/10 overflow-hidden text-brand-charcoal"
            >
              <div className="px-4 py-6 space-y-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search plants & collections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-brand-charcoal/5 border border-brand-charcoal/10 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-brand-forest focus:border-brand-forest text-brand-charcoal"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/50 hover:text-brand-forest"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const isB2BPortal = link.href === "/shop?b2b=true";
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          handleB2BPortalClick(e, link.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-base font-medium transition-colors py-1 ${
                          isB2BPortal && isB2B
                            ? "text-emerald-800 font-bold"
                            : isActive
                            ? "text-brand-forest font-semibold"
                            : "text-brand-charcoal/80 hover:text-brand-forest"
                        }`}
                      >
                        {link.name}
                        {isB2BPortal && (
                          <span className="ml-2 text-[8px] font-bold px-1.5 py-0.5 rounded bg-brand-forest text-brand-cream uppercase tracking-wide">
                            B2B
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* B2B / B2C Toggle in Mobile Menu */}
                <div className="pt-6 border-t border-brand-charcoal/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-brand-charcoal/60 uppercase">
                      Catalog Mode
                    </span>
                    <span className="text-xs font-semibold text-brand-forest">
                      {isB2B ? "B2B Trade" : "B2C Retail"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-brand-charcoal/5 p-1 rounded-full">
                    <button
                      onClick={() => setIsB2B(false)}
                      className={`py-2 text-xs font-medium rounded-full transition-all duration-200 ${
                        !isB2B
                          ? "bg-white text-brand-forest shadow-sm"
                          : "text-brand-charcoal/60 hover:text-brand-charcoal"
                      }`}
                    >
                      B2C Retail
                    </button>
                    <button
                      onClick={() => setIsB2B(true)}
                      className={`py-2 text-xs font-medium rounded-full transition-all duration-200 ${
                        isB2B
                          ? "bg-brand-forest text-brand-cream shadow-sm"
                          : "text-brand-charcoal/60 hover:text-brand-charcoal"
                      }`}
                    >
                      B2B Trade
                    </button>
                  </div>
                </div>

                {/* Mobile Logged In User State */}
                <div className="pt-6 border-t border-brand-charcoal/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-forest/10 flex items-center justify-center text-brand-forest font-bold">
                      {isB2B ? "GP" : "AW"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-brand-forest">
                        {isB2B ? "Green Trade Partner" : "Alexander Wright"}
                      </h4>
                      <p className="text-xs text-brand-charcoal/50">
                        {isB2B ? "trade@eledesigns.com" : "alexander@gmail.com"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      alert("Logging out...");
                    }}
                    className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-full text-xs font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

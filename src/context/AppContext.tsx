"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface CartItem {
  id: string;
  name: string;
  priceB2C: number;
  priceB2B: number; // Single base B2B price, or can be scaled by quantity tier
  priceB2BTiers?: { minQty: number; price: number }[];
  quantity: number;
  image?: string;
  category?: string;
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
}

interface AppContextType {
  isB2B: boolean;
  setIsB2B: (val: boolean) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  toasts: Toast[];
  addToast: (message: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isB2B, setIsB2BState] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdCounter = useRef(0);

  // Load cart and B2B preferences from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("eledesign_cart");
    const savedB2B = localStorage.getItem("eledesign_is_b2b");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setTimeout(() => setCart(parsedCart), 0);
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
      }
    }
    if (savedB2B) {
      const isB2BVal = savedB2B === "true";
      setTimeout(() => setIsB2BState(isB2BVal), 0);
    }
  }, []);

  // Save cart to localStorage when updated
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("eledesign_cart", JSON.stringify(newCart));
  };

  const setIsB2B = (val: boolean) => {
    setIsB2BState(val);
    localStorage.setItem("eledesign_is_b2b", String(val));
    addToast(
      val
        ? "Switched to B2B Partner Portal. Trade pricing and bulk options unlocked."
        : "Switched to B2C Retail storefront.",
      "info"
    );
  };

  const addToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    const id = `toast-${++toastIdCounter.current}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    const existingIndex = cart.findIndex((i) => i.id === item.id);
    const newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex] = {
        ...newCart[existingIndex],
        quantity: newCart[existingIndex].quantity + quantity,
      };
    } else {
      newCart.push({ ...item, quantity });
    }
    saveCart(newCart);
    addToast(`Added ${quantity} x "${item.name}" to your cart.`, "success");
  };

  const removeFromCart = (id: string) => {
    const item = cart.find((i) => i.id === id);
    const newCart = cart.filter((i) => i.id !== id);
    saveCart(newCart);
    if (item) {
      addToast(`Removed "${item.name}" from your cart.`, "info");
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const newCart = cart.map((i) => (i.id === id ? { ...i, quantity } : i));
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
    addToast("Your cart has been cleared.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        isB2B,
        setIsB2B,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
};

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { ToastContainer } from "@/components/ToastContainer";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EleDesigns | Architectural Garden & Botanical Designs",
  description:
    "Premium, high-fidelity garden layouts and plant procurement for homeowners and trade professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-charcoal font-sans ">
        <AppContextProvider>
          <Navbar />
          <CartDrawer />
          <ToastContainer />
          <main className="grow flex flex-col">{children}</main>
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}

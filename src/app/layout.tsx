import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-lato" });

export const metadata: Metadata = {
  title: "De Leela | Premium Vegetarian Dining",
  description: "Experience high-end vegetarian culinary artistry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF9F6] text-[#2C2A29] relative overflow-x-hidden">
        {/* Global Atmospheric Elements */}
        <div className="blob-decorator blob-gold" />
        <div className="blob-decorator blob-dark" />
        
        <ClientProviders>
          <Navbar />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}

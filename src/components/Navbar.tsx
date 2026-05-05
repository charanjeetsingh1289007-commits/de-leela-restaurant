'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-[#FAF9F6]/95 backdrop-blur-xl border-b border-[#D4AF37]/30 shadow-md h-16' 
        : 'bg-[#FAF9F6]/60 backdrop-blur-md border-b border-transparent h-20'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#D4AF37]/40 group-hover:ring-[#D4AF37] transition-all duration-300 shadow-md">
                <Image
                  src="/assets/logo.png"
                  alt="De Leela Veg Resto logo"
                  fill
                  className="object-cover"
                  sizes="44px"
                  priority
                />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-[#2C2A29] group-hover:text-[#D4AF37] transition-colors">
                De Leela
              </span>
            </Link>
          </div>


          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-12">
            <ul className="flex space-x-10">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative text-[14px] font-bold uppercase tracking-widest transition-colors group ${
                        isActive ? 'text-[#D4AF37]' : 'text-[#2C2A29]/80 hover:text-[#D4AF37]'
                      }`}
                    >
                      {label}
                      <span
                        className={`absolute -bottom-1 left-0 h-px bg-[#D4AF37] transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="https://wa.me/919815592582"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#AA8C2C] text-[#1A1A1A] text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-[#D4AF37]/10"
            >
              Reserve
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="text-[#2C2A29] hover:text-[#D4AF37] focus:outline-none p-2 rounded-md transition-colors"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#FAF9F6]/95 backdrop-blur-xl border-t border-[#D4AF37]/20"
          >
            <ul className="flex flex-col px-6 py-4 space-y-1">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 text-sm font-bold uppercase tracking-widest border-b border-[#2C2A29]/5 transition-colors ${
                        isActive ? 'text-[#D4AF37]' : 'text-[#2C2A29]/80 hover:text-[#D4AF37]'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

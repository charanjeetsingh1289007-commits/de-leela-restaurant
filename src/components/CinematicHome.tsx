'use client';
import { useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <></>,
});
const VideoScrubSection = dynamic(() => import('./VideoScrubSection'), {
  ssr: false,
  loading: () => <div className="w-full bg-black" style={{ height: '100vh' }} />,
});
const LocationSection = dynamic(() => import('./LocationSection'), {
  ssr: false,
  loading: () => <div className="py-16 bg-[#FAF9F6]" />,
});

export default function CinematicHome() {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;
    ctx = gsap.context(() => {
      // ── Hero content fade in ──
      if (heroContentRef.current) {
        gsap.fromTo(heroContentRef.current, 
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.5 }
        );
      }

      // ── Hero background parallax ──
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, mainRef);

    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
    <div ref={mainRef} className="grain">

      {/* ══════════════════════════════════════
          HERO — CINEMATIC FULL SCREEN
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div ref={heroBgRef} className="absolute inset-0 scale-110">
          <Image 
            src="/assets/all img/2026-02-08 (2).jpg" 
            alt="De Leela Restaurant interior" 
            fill 
            className="object-cover" 
            priority 
          />
        </div>
        <div className="absolute inset-0 hero-overlay" style={{ zIndex: 3 }} />

        <div ref={heroContentRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto opacity-0">
          <p className="text-[#D4AF37] text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-6">
            Pure Vegetarian Fine Dining
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.9] mb-8 text-glow-gold">
            De Leela
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10">
            Where culinary artistry meets authentic vegetarian tradition.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/menu" className="px-10 py-4 bg-[#D4AF37] text-[#1A1A1A] font-bold uppercase tracking-widest text-xs transition-transform hover:scale-105">
              Explore Menu
            </Link>
            <Link href="/contact" className="px-10 py-4 border border-white/40 text-white font-bold uppercase tracking-widest text-xs backdrop-blur-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
              Reserve Table
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-bounce text-white/50 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
          <svg className="w-5 h-8" viewBox="0 0 20 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="18" height="30" rx="9" />
            <circle cx="10" cy="8" r="3" fill="currentColor" />
          </svg>
        </div>

        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </section>

      {/* ══════════════════════════════════════
          SCROLL-SCRUB VIDEOS
      ══════════════════════════════════════ */}
      <Suspense fallback={<div className="w-full bg-black" style={{ height: '100vh' }} />}>
        <VideoScrubSection
          src="/assets/videos/cooking.mp4"
          poster="/assets/hq/hero_food_1777882539725.png"
          title="The Art of Cooking"
          subtitle="Behind the scenes"
          description="Every dish at De Leela is crafted with precision, passion, and the finest ingredients. Watch our chefs bring authentic vegetarian cuisine to life."
          align="left"
        />
      </Suspense>

      <Suspense fallback={<div className="w-full bg-black" style={{ height: '100vh' }} />}>
        <VideoScrubSection
          src="/assets/videos/coffee.mp4"
          poster="/assets/hq/gallery_dish_2_1777882595741.png"
          title="Liquid Perfection"
          subtitle="Signature Beverages"
          description="From masala chai to chilled mocktails — our beverages are crafted with the same love and attention as every dish on our menu."
          align="right"
          accent="#C8A97E"
        />
      </Suspense>

      {/* ══════════════════════════════════════
          LOCATION & CTA
      ══════════════════════════════════════ */}
      <Suspense fallback={<div className="py-16 bg-[#FAF9F6]" />}>
        <LocationSection />
      </Suspense>

      <section className="cta-section py-32 bg-[#2C2A29] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/all img/2026-02-08 (3).jpg" alt="Ambiance" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#2C2A29]/80" />
        </div>
        <div className="relative z-10 text-center container mx-auto px-4">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-6">Reserve Your Experience</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 text-glow-gold">
            Book Your Table Today
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-12 py-5 bg-[#D4AF37] text-[#1A1A1A] font-bold uppercase tracking-widest text-sm transition-all hover:scale-105">
              Reserve Now
            </Link>
            <Link href="/menu" className="inline-flex items-center justify-center px-12 py-5 border border-white/30 text-white font-bold uppercase tracking-widest text-sm transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

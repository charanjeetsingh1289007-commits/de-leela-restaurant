'use client';

/**
 * SmoothScrollProvider
 * ────────────────────
 * Wraps the app in Lenis smooth scrolling and syncs it with GSAP ScrollTrigger.
 * Must be rendered client-side only (no SSR).
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,           // Slightly slower for luxury feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      touchMultiplier: 1.5,    // Smoother touch
      infinite: false,
    });

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis via GSAP RAF for perfect sync
    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Restore lagSmoothing to prevent sync drift
    gsap.ticker.lagSmoothing(0);

    // Optimized scroll configuration
    ScrollTrigger.config({ 
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' 
    });

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.normalizeScroll(false);
    };
  }, []);

  return <>{children}</>;
}

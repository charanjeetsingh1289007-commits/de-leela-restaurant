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

    // CRITICAL: Restore lagSmoothing(0) to prevent sync drift between Lenis and GSAP
    gsap.ticker.lagSmoothing(0);

    // Normalize scroll for mobile/touch devices to prevent 'jank'
    ScrollTrigger.normalizeScroll(true);
    ScrollTrigger.config({ ignoreMobileResize: true });

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.normalizeScroll(false);
    };
  }, []);

  return <>{children}</>;
}

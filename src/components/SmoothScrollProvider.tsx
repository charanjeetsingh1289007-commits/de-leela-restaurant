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
      duration: 1.4,           // How long each scroll gesture takes (seconds)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing
      smoothWheel: true,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis via GSAP RAF for perfect sync
    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing for exact frame timing

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

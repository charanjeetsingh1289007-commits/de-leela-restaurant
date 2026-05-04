'use client';

/**
 * HeroScene — CSS-only animated logo orb
 * Replaces Three.js icosahedron with:
 * - The De Leela logo at center with soft glow
 * - Two orbiting gold rings (CSS keyframe)
 * - Floating gold particles (CSS)
 * - Mouse parallax via CSS custom properties
 * Zero WebGL = zero lag, no Three.js bundle shipped
 */

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouse = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 28;
      const cy = (e.clientY / window.innerHeight - 0.5) * 18;
      el.style.setProperty('--mx', `${cx}px`);
      el.style.setProperty('--my', `${cy}px`);
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none hero-scene-root"
      style={{ zIndex: 6, '--mx': '0px', '--my': '0px' } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Outer slow ring */}
      <div className="hero-ring hero-ring-outer" />
      {/* Inner medium ring */}
      <div className="hero-ring hero-ring-mid" />
      {/* Inner fast ring */}
      <div className="hero-ring hero-ring-inner" />

      {/* Logo orb */}
      <div className="hero-logo-orb">
        {/* Glow behind logo */}
        <div className="hero-logo-glow" />
        <Image
          src="/assets/logo.png"
          alt="De Leela Veg Resto logo"
          width={180}
          height={180}
          className="relative z-10 rounded-full"
          priority
          style={{ filter: 'drop-shadow(0 0 24px rgba(212,175,55,0.55))' }}
        />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="hero-particle"
          style={{
            '--angle': `${(i / 20) * 360}deg`,
            '--radius': `${160 + Math.sin(i * 2.3) * 60}px`,
            '--dur': `${4 + (i % 5)}s`,
            '--delay': `${-(i * 0.4)}s`,
            '--size': `${2 + (i % 3)}px`,
            '--op': `${0.3 + (i % 3) * 0.15}`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

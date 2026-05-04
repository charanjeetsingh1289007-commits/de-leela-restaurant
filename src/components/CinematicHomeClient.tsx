'use client';
import dynamic from 'next/dynamic';

/**
 * Client-side wrapper for CinematicHome.
 *
 * WHY THIS EXISTS:
 *   `ssr: false` is only allowed inside Client Components in Next.js App Router.
 *   By wrapping here, we prevent the entire CinematicHome tree (framer-motion
 *   initial states, GSAP, video elements) from running through SSR, which
 *   eliminates the insertBefore / removeChild hydration crash on Turbopack.
 */
const CinematicHome = dynamic(() => import('./CinematicHome'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: '100svh',
        background: '#1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid #D4AF37',
          borderTopColor: 'transparent',
          animation: 'cinSpin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes cinSpin{to{transform:rotate(360deg)}}`}</style>
    </div>
  ),
});

export default function CinematicHomeClient() {
  return <CinematicHome />;
}

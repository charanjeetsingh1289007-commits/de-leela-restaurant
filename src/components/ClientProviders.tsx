'use client';

/**
 * ClientProviders
 * Client-side wrapper so we can use dynamic imports with ssr:false
 * inside the Server Component layout.tsx
 */

import dynamic from 'next/dynamic';

const SmoothScrollProvider = dynamic(
  () => import('./SmoothScrollProvider'),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}

'use client';

import dynamic from 'next/dynamic';

const SmoothScrollProvider = dynamic(
  () => import('./SmoothScrollProvider'),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      {children}
    </SmoothScrollProvider>
  );
}

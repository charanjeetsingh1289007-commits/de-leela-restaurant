'use client';
import { useState, useEffect } from 'react';
import CinematicHome from './CinematicHome';

export default function CinematicHomeClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex flex-col relative overflow-hidden">
        {/* Skeleton Hero Backdrop */}
        <div className="absolute inset-0 bg-[#0D0C0B] opacity-40 animate-pulse" />
        
        {/* Skeleton Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="w-48 h-4 bg-[#D4AF37]/20 rounded-full mb-8 animate-pulse" />
          <div className="w-3/4 md:w-1/2 h-20 bg-white/5 rounded-2xl mb-10 animate-pulse" />
          <div className="w-1/2 md:w-1/3 h-6 bg-white/5 rounded-full mb-12 animate-pulse" />
          <div className="flex gap-4">
            <div className="w-40 h-14 bg-[#D4AF37]/20 rounded-sm animate-pulse" />
            <div className="w-40 h-14 bg-white/5 rounded-sm animate-pulse" />
          </div>
        </div>

        {/* Spinner bottom */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-[0.3em] animate-pulse">Loading De Leela</span>
        </div>
      </div>
    );
  }

  return <CinematicHome />;
}

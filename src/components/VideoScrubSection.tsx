'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface VideoScrubSectionProps {
  src: string;
  title: string;
  subtitle: string;
  description: string;
  align?: 'left' | 'right' | 'center';
  accent?: string;
  poster?: string;
}

export default function VideoScrubSection({
  src,
  title,
  subtitle,
  description,
  align  = 'left',
  accent = '#D4AF37',
  poster,
}: VideoScrubSectionProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              // Autoplay might be blocked
            });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(section);

    // Update isPlaying state when video actually starts playing
    const handlePlaying = () => setIsPlaying(true);
    video.addEventListener('playing', handlePlaying);

    return () => {
      observer.disconnect();
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  const flexAlign =
    align === 'right'  ? 'items-end   text-right'  :
    align === 'center' ? 'items-center text-center' :
                         'items-start  text-left';

  const dividerStyle: React.CSSProperties =
    align === 'right'  ? { background: accent, marginLeft: 'auto' }       :
    align === 'center' ? { background: accent, margin: '0 auto 1.25rem' } :
    { background: accent };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden flex items-end"
      style={{ minHeight: '100vh' }}
      aria-label={`${title} — cinematic video section`}
    >
      {/* Poster Image - Fades out when video plays */}
      {poster && (
        <div 
          className={`absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out pointer-events-none ${
            isPlaying ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Video - Fades in when playing */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
        isPlaying ? 'opacity-100' : 'opacity-0'
      }`}>
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={{ willChange: 'transform' }}
        />
      </div>

      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.6) 0%,
            transparent 30%,
            transparent 70%,
            rgba(0,0,0,0.8) 100%
          )`,
        }}
      />

      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 140px rgba(0,0,0,0.50)' }}
      />

      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 35% at ${
            align === 'right'  ? '78%' :
            align === 'center' ? '50%' : '22%'
          } 85%, ${accent}15 0%, transparent 70%)`,
        }}
      />

      <div
        className={`relative z-30 w-full flex flex-col px-8 md:px-24 lg:px-32 pb-24 ${flexAlign}`}
      >
        <p
          className="text-[11px] font-bold uppercase tracking-[0.4em] mb-3"
          style={{ color: accent }}
        >
          {subtitle}
        </p>
        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-none mb-5"
          style={{ textShadow: '0 4px 48px rgba(0,0,0,0.95)' }}
        >
          {title}
        </h2>
        <div className="w-14 h-[2px] mb-5" style={dividerStyle} />
        <p
          className="text-white/80 font-light text-base md:text-lg leading-relaxed"
          style={{
            maxWidth: 420,
            textShadow: '0 2px 18px rgba(0,0,0,0.75)',
            ...(align === 'right'  ? { marginLeft: 'auto' } :
                align === 'center' ? { margin: '0 auto' }   : {}),
          }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}

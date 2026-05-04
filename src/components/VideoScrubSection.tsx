'use client';

import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    // Lazy load and play/pause based on visibility to optimize performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Attempt to play only if visible
            video.play().catch(() => {
              // Ignore play errors (like browser autoplay policies)
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(section);

    return () => {
      observer.disconnect();
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
      <div className="absolute inset-0 pointer-events-none">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.55) 0%,
            rgba(0,0,0,0.02) 28%,
            rgba(0,0,0,0.02) 68%,
            rgba(0,0,0,0.75) 100%
          )`,
          opacity: 0.6,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 140px rgba(0,0,0,0.50)' }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 35% at ${
            align === 'right'  ? '78%' :
            align === 'center' ? '50%' : '22%'
          } 85%, ${accent}12 0%, transparent 70%)`,
        }}
      />

      <div
        className={`relative z-20 w-full flex flex-col px-8 md:px-24 lg:px-32 pb-24 ${flexAlign}`}
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
          className="text-white/72 font-light text-base md:text-lg leading-relaxed"
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

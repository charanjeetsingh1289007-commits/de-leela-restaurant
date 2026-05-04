'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    let ctx: ReturnType<typeof gsap.context> | null = null;
    let observer: IntersectionObserver | null = null;

    const isMobile = window.matchMedia('(max-width: 767px)').matches
      || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    if (contentRef.current) {
      contentRef.current.style.opacity = isMobile ? '1' : '0';
    }

    // Lazy load and play/pause based on visibility to optimize performance
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    if (!isMobile) {
      ctx = gsap.context(() => {
        const contentEl = contentRef.current;
        const wrapperEl = wrapperRef.current;
        const overlayEl = overlayRef.current;

        ScrollTrigger.create({
          trigger: section,
          start:   'top top',
          end:     '+=300%',
          pin:     true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
            if (overlayEl) {
              const p  = self.progress;
              let   op: number;
              if (p < 0.25)      op = gsap.utils.mapRange(0, 0.25, 0.60, 0.12, p);
              else if (p < 0.75) op = 0.12;
              else               op = gsap.utils.mapRange(0.75, 1, 0.12, 0.60, p);
              overlayEl.style.opacity = String(op);
            }
          },
        });

        if (contentEl) {
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start:   'top top',
              end:     '+=300%',
              scrub:   0.5,
            },
          })
            .fromTo(contentEl,
              { opacity: 0, y: 65 },
              { opacity: 1, y: 0, ease: 'power2.out', duration: 0.14 },
              0.07
            )
            .to(contentEl,
              { opacity: 0, y: -40, ease: 'power2.in', duration: 0.10 },
              0.85
            );
        }

        if (wrapperEl) {
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start:   'top top',
              end:     '+=300%',
              scrub:   1.8,
            },
          })
            .fromTo(wrapperEl,
              { scale: 1.10 },
              { scale: 1.00, ease: 'none', duration: 1 },
              0
            );
        }
      }, section);
    }

    return () => {
      if (observer) observer.disconnect();
      if (ctx) ctx.revert();
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
      className="video-scrub-section relative w-full bg-black overflow-hidden"
      style={{ height: '100vh' }}
      aria-label={`${title} — cinematic video section`}
    >
      <div
        ref={wrapperRef}
        className="absolute inset-0"
        style={{ willChange: 'transform', transformOrigin: 'center center' }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      </div>

      <div
        ref={overlayRef}
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
          willChange: 'opacity',
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
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: 'clamp(16px, 2.8vh, 48px)', background: '#000', zIndex: 10 }}
      />
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: 'clamp(16px, 2.8vh, 48px)', background: '#000', zIndex: 10 }}
      />

      <div
        ref={contentRef}
        className={`absolute inset-0 flex flex-col justify-end pb-20 px-8 md:px-24 lg:px-32 ${flexAlign}`}
        style={{ zIndex: 20, opacity: 0, willChange: 'opacity, transform' }}
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

      <div
        className="absolute inset-x-0 hidden md:block"
        style={{ bottom: 'clamp(16px, 2.8vh, 48px)', height: '1px', background: 'rgba(255,255,255,0.08)', zIndex: 25 }}
      >
        <div
          ref={progressRef}
          style={{ width: '0%', height: '100%', background: accent }}
        />
      </div>

      <div
        className="absolute right-8 bottom-16 flex-col items-center gap-2 text-white/28 hidden md:flex"
        style={{ zIndex: 22 }}
        aria-hidden="true"
      >
        <span className="text-[9px] uppercase tracking-widest font-light">Scroll</span>
        <svg width="11" height="19" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="1" y="1" width="10" height="18" rx="5" />
          <circle cx="6" cy="5" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}

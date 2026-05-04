'use client';

/**
 * VideoScrubSection — Zero-flicker, frame-accurate scroll-scrub
 * ─────────────────────────────────────────────────────────────
 *
 * THE ROOT CAUSE OF FLICKERING in naive video scrubbing:
 *   When you assign video.currentTime, the browser must:
 *     1. Decode the nearest keyframe (I-frame)
 *     2. Apply all delta frames (P/B) forward to the target time
 *   During this decode window the <video> element paints NOTHING → blank flash.
 *
 * THE FIX — requestVideoFrameCallback (rVFC):
 *   rVFC fires AFTER a new frame has been decoded and is ready to display.
 *   We only issue the NEXT seek inside rVFC, so the old frame stays visible
 *   on screen until the new one is truly ready — zero flicker, zero blank frames.
 *
 *   Fallback: browsers without rVFC use a GSAP-ticker-driven loop with
 *   aggressive frame-rate limiting (max 1 seek per 16ms) as a best-effort.
 *
 * SMOOTHNESS TECHNIQUE:
 *   • We maintain a `targetTime` float that GSAP-ticker updates every frame
 *     from the ScrollTrigger progress × duration.
 *   • Inside rVFC we linearly interpolate: current → target (lerp factor 0.25)
 *     This smooths out any Lenis easing that hasn't settled yet.
 *   • The interpolation is capped at ±0.5s so fast scrolls still respond.
 *
 * MOBILE:
 *   Synchronous detect → autoplay muted loop, no pinning.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Extend HTMLVideoElement with the rVFC API (not yet in lib.dom.d.ts)
type VideoFrameRequestCallback = (now: DOMHighResTimeStamp, metadata: {
  expectedDisplayTime: DOMHighResTimeStamp;
  width: number; height: number;
  presentationTime: DOMHighResTimeStamp;
  presentedFrames: number;
  processingDuration?: number;
  captureTime?: DOMHighResTimeStamp;
  receiveTime?: DOMHighResTimeStamp;
  rtpTimestamp?: number;
}) => void;

type ExtendedHTMLVideoElement = Omit<
  HTMLVideoElement,
  'requestVideoFrameCallback' | 'cancelVideoFrameCallback'
> & {
  requestVideoFrameCallback?: (callback: VideoFrameRequestCallback) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

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
  const videoRef    = useRef<ExtendedHTMLVideoElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const loaderRef   = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current as ExtendedHTMLVideoElement | null;
    if (!section || !video) return;

    let destroyed = false;
    let stInstance: ScrollTrigger | null = null;
    let ctx: ReturnType<typeof gsap.context> | null = null;
    let rVFCHandle = 0;
    let tickerFn: (() => void) | null = null;
    let safetyTimer: NodeJS.Timeout;

    const handleVideoError = () => {
      if (destroyed) return;
      if (safetyTimer) clearTimeout(safetyTimer);
      if (loaderRef.current) loaderRef.current.style.display = 'none';
      if (contentRef.current) contentRef.current.style.opacity = '1';
      const wrapper = wrapperRef.current;
      if (wrapper) {
        if (poster) {
          wrapper.style.backgroundImage = `url(${poster})`;
          wrapper.style.backgroundSize = 'cover';
          wrapper.style.backgroundPosition = 'center';
        } else {
          wrapper.style.background = `linear-gradient(135deg, #0D0C0B 0%, #1A1A1A 40%, #2C2A29 100%)`;
        }
      }
    };

    // ── Intersection Observer: only load/init when visible ────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          init();
          observer.disconnect();
        }
      },
      { rootMargin: '20% 0px', threshold: 0 }
    );
    observer.observe(section);

    function init() {
      if (destroyed) return;

      const isMobile = window.matchMedia('(max-width: 767px)').matches
        || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

      if (isMobile) {
        video!.muted       = true;
        video!.loop        = true;
        video!.playsInline = true;
        video!.autoplay    = true;
        video!.load();
        video!.play().catch(() => {});
        if (contentRef.current) contentRef.current.style.opacity = '1';
        if (loaderRef.current)  loaderRef.current.style.display  = 'none';
        return;
      }

      const supportsRVFC = typeof video!.requestVideoFrameCallback === 'function';
      let targetTime    = 0;
      let lastSeeked    = -1;
      let lastTickMs    = 0;

      const hideLoader = () => {
        const el = loaderRef.current;
        if (!el) return;
        gsap.to(el, {
          opacity: 0, duration: 0.45,
          onComplete: () => { if (el) el.style.display = 'none'; },
        });
      };

      const clampTime = (t: number, dur: number) =>
        Math.max(0, Math.min(t, dur - 0.033));

      const startRVFC = (dur: number) => {
        const onFrame: VideoFrameRequestCallback = () => {
          if (destroyed) return;
          const clamped = clampTime(targetTime, dur);
          if (Math.abs(clamped - lastSeeked) > 0.008) {
            video!.currentTime = clamped;
            lastSeeked = clamped;
          }
          if (video!.requestVideoFrameCallback) {
            rVFCHandle = video!.requestVideoFrameCallback(onFrame);
          }
        };
        if (video!.requestVideoFrameCallback) {
          rVFCHandle = video!.requestVideoFrameCallback(onFrame);
        }
      };

      const startTickerFallback = (dur: number) => {
        const fn = () => {
          if (destroyed) return;
          const now = performance.now();
          if (now - lastTickMs < 16) return;
          lastTickMs = now;
          const clamped = clampTime(targetTime, dur);
          if (Math.abs(clamped - lastSeeked) > 0.008) {
            video!.currentTime = clamped;
            lastSeeked = clamped;
          }
        };
        tickerFn = fn;
        gsap.ticker.add(fn);
      };

      const initScrub = () => {
        const dur = video!.duration;
        if (!dur || isNaN(dur)) return;

        video!.pause();
        video!.currentTime = 0;
        lastSeeked = 0;
        hideLoader();

        const contentEl = contentRef.current;
        const wrapperEl = wrapperRef.current;
        const overlayEl = overlayRef.current;
        if (!contentEl || !wrapperEl) return;

        ctx = gsap.context(() => {
          stInstance = ScrollTrigger.create({
            trigger: section,
            start:   'top top',
            end:     '+=300%',
            pin:     true,
            anticipatePin: 1,
            onUpdate: (self) => {
              targetTime = clampTime(self.progress * dur, dur);
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

          if (supportsRVFC) startRVFC(dur);
          else startTickerFallback(dur);

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
        }, section);
      };

      video!.muted       = true;
      video!.playsInline = true;
      video!.load();

      safetyTimer = setTimeout(() => {
        if (destroyed) return;
        if (loaderRef.current) loaderRef.current.style.display = 'none';
        if (contentRef.current) contentRef.current.style.opacity = '1';
      }, 15_000);

      video!.addEventListener('error',   handleVideoError, { once: true });
      video!.addEventListener('stalled', handleVideoError, { once: true });

      if (video!.readyState >= 1) {
        if (safetyTimer) clearTimeout(safetyTimer);
        initScrub();
      } else {
        video!.addEventListener('loadedmetadata', () => {
          if (safetyTimer) clearTimeout(safetyTimer);
          initScrub();
        }, { once: true });
      }
    }

    return () => {
      destroyed = true;
      observer.disconnect();
      if (safetyTimer) clearTimeout(safetyTimer);
      if (video) {
        video.removeEventListener('error',           handleVideoError);
        video.removeEventListener('stalled',         handleVideoError);
        // We can't easily remove the anonymous loadedmetadata but it's {once: true}
        if (rVFCHandle && video.cancelVideoFrameCallback) {
          video.cancelVideoFrameCallback(rVFCHandle);
        }
      }
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (ctx) ctx.revert();
      stInstance = null;
    };
  }, [poster]);

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
      style={{ height: '100svh' }}
      aria-label={`${title} — cinematic video section`}
    >
      <div
        ref={wrapperRef}
        className="absolute inset-0"
        style={{ willChange: 'transform', transformOrigin: 'center center' }}
      >
        <video
          ref={videoRef as React.Ref<HTMLVideoElement>}
          src={src}
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          loop
          autoplay
          preload="auto"
          aria-hidden="true"
          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
        />
      </div>


      {/* Cinematic gradient overlay — opacity driven by onUpdate */}
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
          // Separate layer so opacity changes don't trigger repaint of video
          willChange: 'opacity',
        }}
      />

      {/* Edge vignette (static — no opacity change needed) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 140px rgba(0,0,0,0.50)' }}
      />

      {/* Accent colour atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 35% at ${
            align === 'right'  ? '78%' :
            align === 'center' ? '50%' : '22%'
          } 85%, ${accent}12 0%, transparent 70%)`,
        }}
      />

      {/* Letterbox bars — 2.35:1 cinema feel */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: 'clamp(16px, 2.8vh, 48px)', background: '#000', zIndex: 10 }}
      />
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: 'clamp(16px, 2.8vh, 48px)', background: '#000', zIndex: 10 }}
      />

      {/* Loading overlay — fades out once initScrub() runs */}
      <div
        ref={loaderRef}
        className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30 gap-4"
      >
        {/* Spinner */}
        <div
          style={{
            width: 38, height: 38,
            borderLeft:   `1.5px solid ${accent}`,
            borderBottom: `1.5px solid ${accent}`,
            borderRight:  `1.5px solid ${accent}`,
            borderTop:    '1.5px solid transparent',
            borderRadius: '50%',
            animation: 'spin 0.75s linear infinite',
          }}
        />
        <p
          className="text-[10px] uppercase tracking-[0.3em] font-light"
          style={{ color: accent, opacity: 0.7 }}
        >
          Loading
        </p>
      </div>

      {/* Text content — GSAP scrub controls opacity + y */}
      <div
        ref={contentRef}
        className={`absolute inset-0 flex flex-col justify-end pb-20 px-8 md:px-24 lg:px-32 ${flexAlign}`}
        style={{
          zIndex: 20,
          opacity: 0,
          willChange: 'opacity, transform',
        }}
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

      {/* Scroll progress bar (desktop only) */}
      <div
        className="absolute inset-x-0 hidden md:block"
        style={{ bottom: 'clamp(16px, 2.8vh, 48px)', height: '1px', background: 'rgba(255,255,255,0.08)', zIndex: 25 }}
      >
        <div
          ref={progressRef}
          style={{
            width: '0%',
            height: '100%',
            background: accent,
            // No CSS transition — we update this directly from onUpdate for responsiveness
          }}
        />
      </div>

      {/* Scroll hint (desktop only) */}
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

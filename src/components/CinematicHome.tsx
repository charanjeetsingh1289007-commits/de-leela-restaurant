'use client';
import { useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Dynamic imports — each has an explicit loading fallback so React
//    never encounters a null node during hydration (fixes insertBefore crash)
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <></>,
});
const VideoScrubSection = dynamic(() => import('./VideoScrubSection'), {
  ssr: false,
  loading: () => <div className="w-full bg-black" style={{ height: '100svh' }} />,
});
const DishShowcase = dynamic(() => import('./DishShowcase'), {
  ssr: false,
  loading: () => <div className="py-24 bg-[#1A1A1A]" />,
});
const SignatureDishes = dynamic(() => import('./SignatureDishes'), {
  ssr: false,
  loading: () => <div className="py-16 bg-[#FAF9F6]" />,
});
const DiningExperience = dynamic(() => import('./DiningExperience'), {
  ssr: false,
  loading: () => <div className="py-16 bg-white" />,
});
const ServicesSection = dynamic(() => import('./ServicesSection'), {
  ssr: false,
  loading: () => <div className="py-16 bg-[#1A1A1A]" />,
});
const WhyChooseUs = dynamic(() => import('./WhyChooseUs'), {
  ssr: false,
  loading: () => <div className="py-16 bg-[#2C2A29]" />,
});
const LocationSection = dynamic(() => import('./LocationSection'), {
  ssr: false,
  loading: () => <div className="py-16 bg-[#FAF9F6]" />,
});

const stats = [
  { value: '4.8', label: 'Star Rating', suffix: '★' },
  { value: '119', label: 'Happy Guests', suffix: '+' },
  { value: '100', label: 'Pure Vegetarian', suffix: '%' },
  { value: '50', label: 'Menu Items', suffix: '+' },
];

const features = [
  { href: '/menu', label: 'Our Menu', desc: 'From hearty biryanis to street-style chaats — explore 50+ authentic vegetarian dishes crafted with love.', icon: '🍽️' },
  { href: '/gallery', label: 'Gallery', desc: 'Step inside De Leela through our lens — warm lighting, vibrant food, and an ambiance made for memories.', icon: '📸' },
  { href: '/reviews', label: 'Reviews', desc: '"Absolutely fantastic food and service!" — See why 119 guests rate us 4.8 stars.', icon: '⭐' },
];

const stripImages = [
  '/assets/all img/2026-01-30.jpg',
  '/assets/all img/2026-02-06.jpg',
  '/assets/all img/2026-02-08 (1).jpg',
  '/assets/all img/2026-02-11.jpg',
  '/assets/all img/2026-02-15.jpg',
  '/assets/all img/2026-01-30 (1).jpg',
];

export default function CinematicHome() {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const svgLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Defer GSAP init until after first paint to eliminate initial lag
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: object) => void }).requestIdleCallback;
    const schedule = ric
      ? (fn: () => void) => ric(fn, { timeout: 300 })
      : (fn: () => void) => setTimeout(fn, 80);

    let ctx: ReturnType<typeof gsap.context>;
    schedule(() => {
    ctx = gsap.context(() => {
      // ── Hero parallax: bg zooms out as you scroll (scrub = always bidirectional) ──
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 25, scale: 1, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
        });
      }

      // Hero content fades out on scroll down, back in on scroll up
      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          opacity: 0, yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: '20% top', end: '60% top', scrub: 1.5 },
        });
      }

      // ── SVG stroke draw — scrub = bidirectional ──
      if (svgLineRef.current) {
        const length = svgLineRef.current.getTotalLength?.() ?? 600;
        gsap.set(svgLineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(svgLineRef.current, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: storyRef.current, start: 'top 80%', end: 'center 50%', scrub: 1 },
        });
      }

      // ── Story section: bidirectional text reveal ──
      gsap.utils.toArray<HTMLElement>('.story-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { x: -60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1,
            scrollTrigger: {
              trigger: el, start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
            delay: i * 0.08,
          }
        );
      });

      // ── Feature cards 3D stagger — bidirectional ──
      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, rotateX: 15 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 0.85, ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current, start: 'top 82%',
              toggleActions: 'play reverse play reverse',
            },
            delay: i * 0.16,
          }
        );
      });

      // ── Stats — bidirectional ──
      gsap.utils.toArray<HTMLElement>('.stat-item').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7,
            scrollTrigger: {
              trigger: statsRef.current, start: 'top 82%',
              toggleActions: 'play reverse play reverse',
            },
            delay: i * 0.13,
          }
        );
      });

      // ── Horizontal strip: cinematic left-pan with scrub (inherently bidirectional) ──
      if (stripRef.current) {
        const trackWidth = Math.min(
          stripRef.current.scrollWidth - (stripRef.current.parentElement?.offsetWidth ?? 0),
          2400
        );
        gsap.fromTo(stripRef.current,
          { x: 0 },
          {
            x: -trackWidth * 0.65,
            ease: 'none',
            scrollTrigger: {
              trigger: stripRef.current.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // ── Quote reveal — bidirectional ──
      if (quoteRef.current) {
        const qEl = quoteRef.current.querySelector('.quote-reveal');
        if (qEl) {
          gsap.fromTo(qEl,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out',
              scrollTrigger: { trigger: quoteRef.current, start: 'top 82%', toggleActions: 'play reverse play reverse' },
            }
          );
        }
      }

      // ── Section cinematic enter — bidirectional ──
      const cinematicEls = gsap.utils.toArray<HTMLElement>('.section-cinematic-enter');
      cinematicEls.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play reverse play reverse' },
          }
        );
      });

      // ── CTA — bidirectional ──
      const ctaEl = document.querySelector('.cta-reveal');
      const ctaSection = document.querySelector('.cta-section');
      if (ctaEl && ctaSection) {
        gsap.fromTo(ctaEl,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8,
            scrollTrigger: { trigger: ctaSection, start: 'top 85%', toggleActions: 'play reverse play reverse' },
          }
        );
      }

      // ── Why Guests Love Us cards (.reveal-hidden) — bidirectional ──
      gsap.utils.toArray<HTMLElement>('.reveal-hidden').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: {
              trigger: el, start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
            delay: i * 0.12,
          }
        );
      }); // end forEach reveal-hidden


    }); // end gsap.context
    }); // end schedule

    return () => { if (ctx) ctx.revert(); };
  }, []);

  // 3D card tilt
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${cx * 14}deg) rotateX(${-cy * 10}deg) scale(1.03)`;
  };
  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
  };

  return (
    <div className="grain">

      {/* ══════════════════════════════════════
          HERO — CINEMATIC FULL SCREEN
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Layered Background */}
        <div ref={heroBgRef} className="absolute inset-0 scale-110" style={{ willChange: 'transform' }}>
          <Image src="/assets/all img/2026-02-08 (2).jpg" alt="De Leela Restaurant interior — warm, luxurious vegetarian dining ambiance" fill sizes="100vw" className="object-cover" priority quality={85} />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-overlay" style={{ zIndex: 3 }} />

        {/* Gold glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#D4AF37]/10 blur-[120px] pulse-glow pointer-events-none" />

        {/* Floating SVG decorative elements */}
        <div className="absolute top-20 left-8 opacity-30 float-anim-slow pointer-events-none hidden md:block">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="#D4AF37" strokeWidth="1">
            <polygon points="30,5 55,45 5,45" strokeLinejoin="round" className="svg-stroke-anim" style={{ strokeDasharray: 160, strokeDashoffset: 0 }} />
          </svg>
        </div>
        <div className="absolute bottom-32 right-10 opacity-20 float-anim pointer-events-none hidden md:block">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#D4AF37" strokeWidth="1">
            <circle cx="40" cy="40" r="35" />
            <circle cx="40" cy="40" r="20" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-16 opacity-25 spin-slow pointer-events-none hidden lg:block">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="#D4AF37" strokeWidth="0.8">
            <rect x="10" y="10" width="30" height="30" transform="rotate(45 25 25)" />
          </svg>
        </div>

        {/* Hero Content — above 3D scene */}
        <div ref={heroContentRef} className="relative text-center text-white px-4 max-w-5xl mx-auto" style={{ zIndex: 20 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="text-sm font-bold uppercase tracking-[0.35em] text-[#D4AF37] mb-6"
          >
            Pure Vegetarian Fine Dining
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-none mb-6 text-glow-gold"
          >
            De Leela
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-2xl font-light text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Where culinary artistry meets authentic vegetarian tradition
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/menu" className="inline-flex items-center justify-center px-10 py-4 bg-[#D4AF37] hover:bg-[#AA8C2C] text-[#1A1A1A] font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
              Explore Menu
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 border border-white/40 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] font-bold uppercase tracking-widest text-sm transition-all duration-300 backdrop-blur-sm">
              Reserve Table
            </Link>
          </motion.div>
          {/* Stars */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-12 flex items-center justify-center gap-3"
          >
            <div className="flex gap-1 text-[#D4AF37]">
              {[...Array(5)].map((_, i) => <span key={i} className="text-lg">★</span>)}
            </div>
            <span className="text-white/70 text-sm font-light">4.8 / 5 from 119 reviews</span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-bounce text-white/50 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
          <svg className="w-5 h-8" viewBox="0 0 20 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="18" height="30" rx="9" />
            <circle cx="10" cy="8" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* ── THREE.JS 3D SCENE — wrapped in Suspense ── */}
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </section>

      {/* ══════════════════════════════════════
          SCROLL-SCRUB VIDEO 1 — COOKING
      ══════════════════════════════════════ */}
      <Suspense fallback={<div className="w-full bg-black" style={{ height: '100svh' }} />}>
        <VideoScrubSection
          src="/assets/videos/cooking.mp4"
          poster="/assets/hq/hero_food_1777882539725.png"
          title="The Art of Cooking"
          subtitle="Behind the scenes"
          description="Every dish at De Leela is crafted with precision, passion, and the finest ingredients. Watch our chefs bring authentic vegetarian cuisine to life."
          align="left"
        />
      </Suspense>

      {/* ══════════════════════════════════════
          SCROLL-SCRUB VIDEO 2 — COFFEE
      ══════════════════════════════════════ */}
      <Suspense fallback={<div className="w-full bg-black" style={{ height: '100svh' }} />}>
        <VideoScrubSection
          src="/assets/videos/coffee.mp4"
          poster="/assets/hq/gallery_dish_2_1777882595741.png"
          title="Liquid Perfection"
          subtitle="Signature Beverages"
          description="From masala chai to chilled mocktails — our beverages are crafted with the same love and attention as every dish on our menu."
          align="right"
          accent="#C8A97E"
        />
      </Suspense>

      {/* ══════════════════════════════════════
          DISH SHOWCASE
      ══════════════════════════════════════ */}
      <Suspense fallback={<div className="py-24 bg-[#1A1A1A]" />}>
        <DishShowcase />
      </Suspense>

      {/* ══════════════════════════════════════
          SIGNATURE DISHES — NEW
      ══════════════════════════════════════ */}
      <Suspense fallback={<div className="py-16 bg-[#FAF9F6]" />}>
        <SignatureDishes />
      </Suspense>

      {/* ══════════════════════════════════════
          STORY / ABOUT — SEO RICH
      ══════════════════════════════════════ */}
      <section ref={storyRef} className="py-32 bg-[#1A1A1A] text-[#FAF9F6] relative overflow-hidden">
        {/* Gold glow orb */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#D4AF37]/4 blur-[80px] pointer-events-none" />

        {/* SVG decorative path */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
            <path
              ref={svgLineRef}
              d="M0,400 C200,200 400,600 720,400 C1040,200 1240,600 1440,400"
              stroke="#D4AF37" strokeWidth="1.5" fill="none"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="story-reveal text-sm font-bold text-[#D4AF37] uppercase tracking-[0.25em] mb-4">Our Philosophy</p>
              <h2 className="story-reveal text-5xl md:text-6xl font-serif font-bold text-white leading-tight mb-8">
                Where Every Plate<br />Tells a Story
              </h2>
              <div className="story-reveal w-16 h-px bg-[#D4AF37] mb-8" />
              <p className="story-reveal text-[#FAF9F6]/70 text-lg font-light leading-relaxed mb-6">
                At <strong className="text-[#D4AF37]">De Leela Veg Restaurant</strong>, we believe that pure vegetarian food can be a transcendent experience. Founded with a passion for authentic Indian cuisine and a commitment to the highest quality ingredients, we have crafted a dining destination unlike any other.
              </p>
              <p className="story-reveal text-[#FAF9F6]/70 text-lg font-light leading-relaxed mb-6">
                From aromatic <strong className="text-white/90">biryanis</strong> and <strong className="text-white/90">paneer specialties</strong> to indulgent <strong className="text-white/90">street-style chaats</strong> and refreshing <strong className="text-white/90">cold beverages</strong> — every dish is prepared with love, precision, and the freshest locally sourced ingredients.
              </p>
              <p className="story-reveal text-[#FAF9F6]/70 text-lg font-light leading-relaxed">
                Our warm, inviting ambiance makes De Leela the perfect destination for <strong className="text-white/90">family dining</strong>, casual gatherings, and celebratory occasions. We take pride in our impeccable hygiene standards, friendly service, and a menu that caters to every palate.
              </p>
            </div>

            <div className="story-reveal relative h-[550px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/all img/2026-02-06.jpg"
                alt="De Leela Veg Restaurant warm and inviting interior with beautiful lighting and elegant decor"
                fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-[#D4AF37] text-[#1A1A1A] px-6 py-3 font-bold">
                <span className="text-2xl font-serif">4.8★</span><br />
                <span className="text-xs uppercase tracking-widest">119 Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DINING EXPERIENCE — NEW
      ══════════════════════════════════════ */}
      <Suspense fallback={<div className="py-16 bg-white" />}>
        <DiningExperience />
      </Suspense>

      {/* ══════════════════════════════════════
          FEATURE CARDS — 3D PERSPECTIVE
      ══════════════════════════════════════ */}
      <section className="py-28 bg-[#FAF9F6] relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.25em] mb-4">Discover</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2A29]">The De Leela Experience</h2>
          </div>
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <Link key={f.href} href={f.href}>
                <div
                  className="feature-card bg-white rounded-2xl p-10 border border-[#FAF9F6] cursor-pointer"
                  style={{ transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease' }}
                  onMouseMove={handleTilt}
                  onMouseLeave={resetTilt}
                >
                  <div className="text-5xl mb-6">{f.icon}</div>
                  <h3 className="text-2xl font-serif font-bold text-[#2C2A29] mb-4">{f.label}</h3>
                  <p className="text-[#2C2A29]/70 font-light leading-relaxed mb-6">{f.desc}</p>
                  <span className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS — SCROLL TRIGGERED
      ══════════════════════════════════════ */}
      <section ref={statsRef} className="py-24 bg-[#2C2A29] relative overflow-hidden">
        <div className="absolute inset-0 bg-cinematic" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <div className="text-5xl md:text-6xl font-serif font-bold mb-2">
                  <span className="shimmer-text">{s.value}{s.suffix}</span>
                </div>
                <p className="text-[#FAF9F6]/60 text-sm uppercase tracking-widest font-light">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HORIZONTAL GALLERY STRIP — SCRUB
      ══════════════════════════════════════ */}
      <section className="py-20 bg-[#1A1A1A] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-4xl font-serif font-bold text-white text-center">
            A Glimpse of <span className="shimmer-text">De Leela</span>
          </h2>
        </div>
        <div className="overflow-hidden">
          <div ref={stripRef} className="strip-track px-8">
            {[...stripImages, ...stripImages].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-72 h-96 relative rounded-xl overflow-hidden border border-white/10">
                <Image src={src} alt={`De Leela restaurant food and ambiance photo ${i + 1}`} fill sizes="(max-width: 640px) 288px, 288px" className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES — NEW
      ══════════════════════════════════════ */}
      <Suspense fallback={<div className="py-16 bg-[#1A1A1A]" />}>
        <ServicesSection />
      </Suspense>

      {/* ══════════════════════════════════════
          FEATURED TESTIMONIAL
      ══════════════════════════════════════ */}
      <section ref={quoteRef} className="py-32 bg-[#FAF9F6] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />
        {/* Big decorative quote mark */}
        <div className="absolute top-10 left-8 text-[200px] leading-none text-[#D4AF37]/5 font-serif select-none pointer-events-none">"</div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <div className="quote-reveal">
            <div className="flex justify-center gap-1 text-[#D4AF37] text-2xl mb-8">
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2C2A29] leading-tight mb-10 italic">
              "Absolutely the best vegetarian restaurant experience. The flavors are authentic, the ambiance is warm, and the service is impeccable."
            </blockquote>
            <cite className="not-italic">
              <span className="font-bold text-[#2C2A29] text-lg tracking-wide">Rahul M.</span>
              <span className="text-[#2C2A29]/50 ml-3 text-sm">Verified Guest · 2 weeks ago</span>
            </cite>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY CHOOSE US — ENHANCED (new component)
      ══════════════════════════════════════ */}
      <Suspense fallback={<div className="py-16 bg-[#2C2A29]" />}>
        <WhyChooseUs />
      </Suspense>

      {/* ══════════════════════════════════════
          LOCATION — NEW
      ══════════════════════════════════════ */}
      <Suspense fallback={<div className="py-16 bg-[#FAF9F6]" />}>
        <LocationSection />
      </Suspense>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="cta-section py-32 bg-[#2C2A29] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/all img/2026-02-08 (3).jpg" alt="De Leela restaurant ambiance" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#2C2A29]/80" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[100px] pointer-events-none pulse-glow" />
        <div className="relative z-10 text-center container mx-auto px-4">
          <div className="cta-reveal">
            <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-6">Reserve Your Experience</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 text-glow-gold">
              Book Your Table Today
            </h2>
            <p className="text-white/60 font-light text-xl mb-12 max-w-xl mx-auto">
              Join us for an unforgettable vegetarian dining experience. Open every day, 11 AM – 11 PM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center px-12 py-5 bg-[#D4AF37] hover:bg-[#AA8C2C] text-[#1A1A1A] font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                Reserve Now
              </Link>
              <Link href="/menu" className="inline-flex items-center justify-center px-12 py-5 border border-white/30 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] font-bold uppercase tracking-widest text-sm transition-all duration-300">
                View Full Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

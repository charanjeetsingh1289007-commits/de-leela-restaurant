'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UtensilsCrossed, Sparkles, Users, IndianRupee, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    number: '01',
    icon: UtensilsCrossed,
    title: 'Unforgettably Delicious Food',
    desc: 'Every dish starts with the freshest ingredients and ends with a flavour that stays with you long after you leave. Our recipes are rooted in tradition, refined for today.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Premium Ambiance',
    desc: 'Warm lighting, tasteful décor, and a calm atmosphere that feels like a five-star experience at an honest, everyday price. The perfect backdrop for any occasion.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Warm, Friendly Staff',
    desc: 'Our team greets every guest like family. Quick, attentive, and genuinely caring service is not our policy — it is our culture.',
  },
  {
    number: '04',
    icon: IndianRupee,
    title: 'Honest, Affordable Pricing',
    desc: 'Great food should not cost a fortune. We keep our prices fair and transparent so that everyone can enjoy a premium vegetarian meal without hesitation.',
  },
  {
    number: '05',
    icon: ShieldCheck,
    title: 'Spotless Cleanliness',
    desc: 'From our open kitchen to our dining tables, hygiene is non-negotiable. We maintain the highest cleanliness standards every single day — no exceptions.',
  },
  {
    number: '06',
    icon: Leaf,
    title: '100% Pure Vegetarian',
    desc: 'A fully dedicated vegetarian kitchen means no compromise, no cross-contamination. Every ingredient, every meal — pure, honest, and authentically vegetarian.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.wcu-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.wcu-header', start: 'top 88%', toggleActions: 'play reverse play reverse' },
        }
      );
      gsap.utils.toArray<HTMLElement>('.wcu-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play reverse play reverse' },
            delay: (i % 3) * 0.08,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="py-28 bg-[#2C2A29] text-[#FAF9F6] relative overflow-hidden"
    >
      {/* Premium SVG Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none" style={{ backgroundImage: 'var(--pattern-gold)' }} />
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-black/40 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="wcu-header text-center mb-20">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.35em] mb-4">Values & Quality</p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Why Guests Love Us</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-[#FAF9F6]/60 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            In a city full of choices, here is why 119+ guests keep returning to De Leela — and why you will too.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, number, title, desc }, i) => (
            <div
              key={i}
              className="wcu-card group relative rounded-xl p-7 border border-white/8 overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 hover:-translate-y-1.5"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                willChange: 'transform, opacity'
              }}
            >
              {/* Number watermark */}
              <div className="absolute top-4 right-5 text-5xl font-serif font-bold text-white/4 group-hover:text-[#D4AF37]/8 transition-colors duration-500 select-none">
                {number}
              </div>
              {/* Gold top strip on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon */}
              <div className="mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                <Icon className="w-10 h-10 text-[#D4AF37]" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-serif font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                {title}
              </h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-[#D4AF37] font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all duration-300"
          >
            Read Guest Reviews
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M0 6h14M9 1l5 5-5 5" />
            </svg>
          </Link>
          <div className="w-px h-6 bg-white/20 hidden sm:block" />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#D4AF37] font-bold uppercase tracking-widest text-sm transition-colors duration-300"
          >
            Make a Reservation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

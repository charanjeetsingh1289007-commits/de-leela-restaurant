'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <rect x="6" y="8" width="36" height="28" rx="3" />
        <path d="M16 36v4M32 36v4M12 40h24" />
        <circle cx="24" cy="20" r="5" />
        <path d="M14 20h4M30 20h4" />
      </svg>
    ),
    title: 'Dine-In',
    subtitle: 'Restaurant Experience',
    desc: 'Settle into our warm, elegantly designed dining room and let us take care of everything. Enjoy attentive table service, a relaxed ambiance, and food served fresh from our kitchen — all in an environment that feels like a special occasion every single time.',
    highlight: 'Open 11 AM – 11 PM · Everyday',
    color: '#D4AF37',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M12 36V18l12-8 12 8v18" />
        <rect x="18" y="26" width="12" height="10" rx="1" />
        <path d="M24 10v8M8 36h32" />
        <circle cx="16" cy="22" r="2" />
        <circle cx="32" cy="22" r="2" />
      </svg>
    ),
    title: 'Takeaway',
    subtitle: 'Ready in Minutes',
    desc: 'Short on time but never short on flavour. Pre-order your favourite De Leela dishes and pick them up piping hot and perfectly packed. Our takeaway service ensures the same kitchen quality in a bag — ready when you are, wherever you are going.',
    highlight: 'Call Ahead · Zero Wait',
    color: '#C8A97E',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M8 20h32l-4 16H12L8 20z" />
        <path d="M16 20l2-10h12l2 10" />
        <circle cx="18" cy="40" r="3" />
        <circle cx="30" cy="40" r="3" />
        <path d="M24 8V4M20 6l4-2 4 2" />
      </svg>
    ),
    title: 'Home Delivery',
    subtitle: 'At Your Doorstep',
    desc: 'Craving De Leela from the comfort of your home? We deliver within our service area — fast, fresh, and in temperature-controlled packaging. Every meal is handled with the same care whether you are dining with us or dining at home.',
    highlight: 'Local Delivery · Track Your Order',
    color: '#B89A6E',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-header', start: 'top 88%', toggleActions: 'play reverse play reverse' },
        }
      );
      gsap.utils.toArray<HTMLElement>('.svc-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play reverse play reverse' },
            delay: i * 0.14,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-28 bg-[#1A1A1A] relative overflow-hidden"
    >
      {/* Atmospheric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="svc-header text-center mb-20">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-4">How We Serve You</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-5">
            Our Services
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" />
          <p className="text-white/50 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you visit us, call ahead, or stay home — De Leela brings the same premium vegetarian
            experience directly to you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <div
              key={i}
              className="svc-card relative rounded-2xl p-8 border border-white/8 overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
              style={{
                background: 'linear-gradient(135deg, #232120 0%, #1A1A1A 100%)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              {/* Top gold line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)` }}
              />
              {/* Corner decoration */}
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top right, ${svc.color}, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-7 transition-transform duration-400 group-hover:scale-110"
                style={{ background: `${svc.color}18`, color: svc.color }}
              >
                {svc.icon}
              </div>

              {/* Content */}
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: svc.color }}>
                {svc.subtitle}
              </p>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{svc.title}</h3>
              <p className="text-white/55 font-light text-sm leading-relaxed mb-7">{svc.desc}</p>

              {/* Highlight badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest"
                style={{ background: `${svc.color}15`, color: svc.color, border: `1px solid ${svc.color}30` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: svc.color }} />
                {svc.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, ShoppingBag, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Utensils,
    title: 'Dine-In',
    subtitle: 'Restaurant Experience',
    desc: 'Settle into our warm, elegantly designed dining room and let us take care of everything. Enjoy attentive table service, a relaxed ambiance, and food served fresh from our kitchen — all in an environment that feels like a special occasion every single time.',
    highlight: 'Open 11 AM – 11 PM · Everyday',
    color: '#D4AF37',
  },
  {
    icon: ShoppingBag,
    title: 'Takeaway',
    subtitle: 'Ready in Minutes',
    desc: 'Short on time but never short on flavour. Pre-order your favourite De Leela dishes and pick them up piping hot and perfectly packed. Our takeaway service ensures the same kitchen quality in a bag — ready when you are, wherever you are going.',
    highlight: 'Call Ahead · Zero Wait',
    color: '#C8A97E',
  },
  {
    icon: Truck,
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
      {/* Premium SVG Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02] select-none pointer-events-none" style={{ backgroundImage: 'var(--pattern-gold)' }} />
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-black/40 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="svc-header text-center mb-20">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.35em] mb-4">Our Expertise</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">Elevated Services</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-[#FAF9F6]/60 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you visit us, call ahead, or stay home — De Leela brings the same premium vegetarian experience directly to you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, ...svc }, i) => (
            <div
              key={i}
              className="svc-card group relative p-10 rounded-2xl overflow-hidden border border-white/8 transition-all duration-500 hover:-translate-y-2"
              style={{
                background: 'linear-gradient(135deg, #232120 0%, #1A1A1A 100%)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              {/* Animated reveal bg */}
              <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0 opacity-[0.03]"
                style={{ background: svc.color }}
              />

              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-7 transition-transform duration-400 group-hover:scale-110"
                style={{ background: `${svc.color}18`, color: svc.color }}
              >
                <Icon className="w-10 h-10" strokeWidth={1.5} />
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

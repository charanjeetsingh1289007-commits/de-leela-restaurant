'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  {
    src: '/assets/all img/2026-02-08 (2).jpg',
    name: 'Royal Paneer Handi',
    category: 'Signature Main',
    desc: 'Slow-cooked in a traditional handi with aromatic spices, fresh cream, and hand-picked herbs. A dish that defines the De Leela experience — rich, indulgent, and deeply satisfying.',
    tags: ['Chef\'s Pride', 'Bestseller'],
    price: '₹199',
  },
  {
    src: '/assets/all img/2026-02-11 (2).jpg',
    name: 'Dal Makhani Royale',
    category: 'Classic',
    desc: 'Whole black lentils simmered overnight on a slow flame with butter and cream. Pairs perfectly with our warm garlic naan — a vegetarian comfort food elevated to art.',
    tags: ['All-time Favourite'],
    price: '₹149',
  },
  {
    src: '/assets/all img/2026-02-15.jpg',
    name: 'Street Chaat Board',
    category: 'Street Food',
    desc: 'A vibrant sharing board of crispy papdi chaat, pani puri, bhel puri, and sev batata puri — all prepared fresh to order with house-made chutneys that burst with flavor.',
    tags: ['Street Food', 'Must Try'],
    price: '₹129',
  },
  {
    src: '/assets/all img/2026-02-06.jpg',
    name: 'Veg Biryani Dum',
    category: 'Biryani',
    desc: 'Fragrant long-grain basmati rice layered with seasonal vegetables, saffron, and whole spices — sealed and slow-cooked dum style for maximum depth of flavor.',
    tags: ['Crowd Favourite'],
    price: '₹179',
  },
  {
    src: '/assets/all img/2026-02-08 (1).jpg',
    name: 'Masala Chai & Snacks',
    category: 'Beverages',
    desc: 'Our signature masala chai is brewed with a secret blend of 7 spices, served alongside crispy samosas and freshly fried pakoras. The perfect afternoon ritual.',
    tags: ['Warm & Comforting'],
    price: '₹79',
  },
  {
    src: '/assets/all img/2026-02-05.jpg',
    name: 'Gulab Jamun Platter',
    category: 'Dessert',
    desc: 'Melt-in-your-mouth gulab jamun served warm, soaked in rose-infused sugar syrup and topped with crushed pistachios. The sweetest way to end your De Leela experience.',
    tags: ['Dessert', 'Must Try'],
    price: '₹99',
  },
];

export default function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.sd-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.sd-header', start: 'top 88%', toggleActions: 'play reverse play reverse' },
        }
      );
      // Cards stagger
      gsap.utils.toArray<HTMLElement>('.sd-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 70, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play reverse play reverse' },
            delay: (i % 3) * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="signature-dishes"
      className="py-28 bg-[#FAF9F6] relative overflow-hidden"
    >
      {/* Hand-crafted SVG backdrop patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-[0.03] select-none">
        <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none">
          <circle cx="400" cy="200" r="150" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="400" cy="200" r="120" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="400" cy="200" r="90" stroke="#D4AF37" strokeWidth="0.2" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 pointer-events-none opacity-[0.02] select-none">
        <svg width="100%" height="100%" viewBox="0 0 300 400" fill="none">
          <rect x="-100" y="200" width="300" height="300" rx="40" transform="rotate(15 -100 200)" stroke="#D4AF37" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sd-header text-center mb-20">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-4">Curated for You</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2A29] mb-5">
            Signature Dishes
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" />
          <p className="text-[#2C2A29]/60 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Each dish on our menu is a labour of love — crafted from time-honoured recipes, the finest
            locally sourced ingredients, and a deep respect for pure vegetarian cooking.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, i) => (
            <Link
              key={i}
              href="/menu"
              className="sd-card group bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-[#D4AF37]/40 transition-all duration-700 hover:-translate-y-3"
              style={{ 
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05), 0 20px 50px -20px rgba(0,0,0,0.02)',
                willChange: 'transform' 
              }}
            >
              <article>
                {/* Image Container with refined zoom */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={dish.src} alt={dish.name} fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Premium Category Tag */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-black/40 backdrop-blur-md text-[#D4AF37] text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10">
                      {dish.category}
                    </span>
                  </div>
                  
                  {/* Elegant Price Tag */}
                  <div className="absolute bottom-5 right-5">
                    <span className="bg-[#D4AF37] text-[#1A1A1A] px-4 py-2 rounded-xl font-serif font-bold text-lg shadow-xl shadow-[#D4AF37]/20">
                      {dish.price}
                    </span>
                  </div>
                </div>

                {/* Refined Content Area */}
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-5">
                    {dish.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-bold text-[#D4AF37] bg-[#D4AF37]/5 px-3 py-1 rounded-md border border-[#D4AF37]/10 uppercase tracking-[0.15em]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#2C2A29] mb-4 group-hover:text-[#D4AF37] transition-colors duration-500 leading-tight">
                    {dish.name}
                  </h3>
                  <p className="text-[#2C2A29]/50 font-light text-sm leading-relaxed mb-6 italic">
                    &quot;{dish.desc}&quot;
                  </p>
                  <div className="w-12 h-[2px] bg-[#D4AF37]/20 group-hover:w-full group-hover:bg-[#D4AF37]/40 transition-all duration-700" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300"
          >
            View Full Menu
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

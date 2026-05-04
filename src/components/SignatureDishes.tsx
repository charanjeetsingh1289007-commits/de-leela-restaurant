'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
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
            <article
              key={i}
              className="sd-card group bg-white rounded-2xl overflow-hidden border border-[#FAF9F6] hover:border-[#D4AF37]/30 transition-all duration-500 hover:-translate-y-2"
              style={{ boxShadow: '0 8px 30px rgba(44,42,41,0.06)', willChange: 'transform' }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={dish.src} alt={dish.name} fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Category chip */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{dish.category}</span>
                </div>
                {/* Price */}
                <div className="absolute bottom-4 right-4 bg-[#D4AF37] px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-bold text-[#1A1A1A]">{dish.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {dish.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2C2A29] mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {dish.name}
                </h3>
                <p className="text-[#2C2A29]/65 font-light text-sm leading-relaxed mb-5">
                  {dish.desc}
                </p>
                {/* Gold accent line — grows on hover */}
                <div className="h-px bg-[#D4AF37]/20 group-hover:bg-[#D4AF37]/60 transition-colors duration-500" />
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300"
          >
            View Full Menu
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M0 6h14M9 1l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

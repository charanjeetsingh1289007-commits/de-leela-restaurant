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
    name: 'Signature Thali',
    desc: 'A royal spread of authentic flavors — dal makhani, paneer, biryani, breads, and more.',
    tag: 'Chef\'s Pride',
  },
  {
    src: '/assets/all img/2026-02-11 (2).jpg',
    name: 'Paneer Specialties',
    desc: 'Creamy, rich, and aromatic paneer dishes crafted from the finest cottage cheese.',
    tag: 'Bestseller',
  },
  {
    src: '/assets/all img/2026-02-15.jpg',
    name: 'Street Style Chaats',
    desc: 'Bold, tangy, and irresistible — our chaats bring the streets to your table.',
    tag: 'Street Food',
  },
];

export default function DishShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger reveal cards
      gsap.from('.dish-card', {
        y: 80, opacity: 0, scale: 0.9,
        stagger: 0.18, duration: 0.85, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Parallax on each card image
      gsap.utils.toArray<HTMLElement>('.dish-img').forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.dish-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      });

      // Header reveal
      gsap.from('.showcase-header', {
        y: 40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.showcase-header', start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-[#0D0C0B] text-[#FAF9F6] relative overflow-hidden">
      {/* Gold glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="showcase-header text-center mb-20">
          <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-4">
            Signature Creations
          </p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
            The De Leela Dishes
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-8" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, i) => (
            <Link
              key={i}
              href="/menu"
              className="dish-card group relative rounded-2xl overflow-hidden border border-white/8 bg-white/3 cursor-pointer"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 80px rgba(212,175,55,0.15), 0 0 40px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
              }}
            >
              {/* Image with parallax */}
              <div className="relative h-80 overflow-hidden">
                <div className="dish-img absolute inset-0 scale-110">
                  <Image
                    src={dish.src}
                    alt={`De Leela ${dish.name} — ${dish.desc}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B] via-transparent to-transparent" />
                {/* Tag badge */}
                <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                  {dish.tag}
                </div>
              </div>

              {/* Text */}
              <div className="p-7">
                <h3 className="text-2xl font-serif font-bold text-white mb-3">{dish.name}</h3>
                <p className="text-[#FAF9F6]/55 font-light leading-relaxed text-sm">{dish.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                  <span>View on Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

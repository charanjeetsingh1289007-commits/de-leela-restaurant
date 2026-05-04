'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: '🕯️',
    title: 'Serene Ambiance',
    desc: 'Warm lighting, soft background music, and thoughtfully curated décor create an atmosphere where every visit feels like a quiet celebration.',
  },
  {
    icon: '🪑',
    title: 'Comfortable Seating',
    desc: 'From intimate corner tables for two to large family booths — our seating is designed for long, leisurely meals where every guest feels at ease.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family-Welcoming',
    desc: 'Children adore our menu, and parents appreciate the clean, calm environment. De Leela is a place where all generations dine together joyfully.',
  },
  {
    icon: '🧹',
    title: 'Immaculate Hygiene',
    desc: 'Our kitchen and dining areas are cleaned and sanitised multiple times daily. We uphold the highest food-safety standards — always visible, never compromised.',
  },
  {
    icon: '👨‍🍳',
    title: 'Expert Chefs',
    desc: 'Our team of experienced chefs brings decades of culinary expertise to every dish, combining traditional techniques with a modern touch for flavours you won\'t forget.',
  },
  {
    icon: '🌿',
    title: '100% Pure Vegetarian',
    desc: 'Our kitchen is entirely meat-free — no cross-contamination, no compromise. Every ingredient, every utensil, every surface is dedicated to pure vegetarian cooking.',
  },
];

export default function DiningExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.de-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.de-header', start: 'top 88%', toggleActions: 'play reverse play reverse' },
        }
      );
      // Image
      gsap.fromTo('.de-image',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '.de-image', start: 'top 85%', toggleActions: 'play reverse play reverse' },
        }
      );
      // Cards
      gsap.utils.toArray<HTMLElement>('.de-card').forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play reverse play reverse' },
            delay: (i % 3) * 0.09,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dining-experience"
      className="py-28 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="de-header text-center mb-20">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-4">More Than a Meal</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2A29] mb-5">
            The Dining Experience
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" />
          <p className="text-[#2C2A29]/55 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            At De Leela, we believe dining out should be an experience — not just a transaction. Every detail,
            from the lighting to the last bite of dessert, is curated to make you feel truly welcome.
          </p>
        </div>

        {/* Two-column layout: image left, cards right */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <div className="de-image relative h-[560px] rounded-2xl overflow-hidden">
            <Image
              src="/assets/all img/2026-02-08 (2).jpg"
              alt="De Leela restaurant premium dining ambiance with warm lighting"
              fill sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1A]/50 via-transparent to-transparent" />
            {/* Floating stats badge */}
            <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md rounded-xl p-5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold text-[#D4AF37]">4.8★</div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mt-1">Rating</div>
                </div>
                <div className="w-px h-10 bg-white/15" />
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold text-[#D4AF37]">119+</div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mt-1">Happy Guests</div>
                </div>
                <div className="w-px h-10 bg-white/15" />
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold text-[#D4AF37]">50+</div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mt-1">Menu Items</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature list */}
          <div className="space-y-6">
            {experiences.slice(0, 4).map((item, i) => (
              <div key={i} className="de-card flex gap-5 p-5 rounded-xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors duration-300 group">
                <div className="text-3xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#2C2A29] mb-1.5">{item.title}</h3>
                  <p className="text-[#2C2A29]/60 font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 2 cards: full-width */}
        <div className="grid sm:grid-cols-2 gap-8">
          {experiences.slice(4).map((item, i) => (
            <div key={i} className="de-card flex gap-5 p-6 rounded-xl bg-[#FAF9F6] border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors duration-300 group">
              <div className="text-3xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2C2A29] mb-1.5">{item.title}</h3>
                <p className="text-[#2C2A29]/60 font-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

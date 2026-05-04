'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/assets/all img/2026-01-30.jpg',       alt: 'De Leela restaurant fresh vegetarian food platter' },
  { src: '/assets/all img/2026-02-05.jpg',       alt: 'Authentic Indian vegetarian cuisine at De Leela' },
  { src: '/assets/all img/2026-02-06.jpg',       alt: 'De Leela restaurant warm and elegant dining interior' },
  { src: '/assets/all img/2026-02-08 (1).jpg',   alt: 'Freshly prepared vegetarian dishes at De Leela' },
  { src: '/assets/all img/2026-02-11.jpg',       alt: 'De Leela family dining ambiance' },
  { src: '/assets/all img/2026-02-15.jpg',       alt: 'Premium vegetarian food presentation at De Leela' },
  { src: '/assets/all img/2026-01-30 (1).jpg',   alt: 'De Leela restaurant special dishes' },
  { src: '/assets/all img/2026-02-05 (1).jpg',   alt: 'De Leela vegetarian street food and chaats' },
  { src: '/assets/all img/2026-02-08 (3).jpg',   alt: 'De Leela restaurant ambiance evening setting' },
  { src: '/assets/all img/2026-02-11 (2).jpg',   alt: 'De Leela paneer specialty dish beautifully plated' },
  { src: '/assets/all img/2026-02-08 (4).jpg',   alt: 'De Leela vibrant food spread' },
  { src: '/assets/all img/2026-02-06 (1).jpg',   alt: 'De Leela restaurant cozy corner with warm lighting' },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Small delay ensures DOM is fully painted before GSAP runs
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── Header: bidirectional fade+rise ──
        gsap.fromTo('.gallery-header',
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: '.gallery-header',
              start: 'top 95%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // ── Gallery cells: staggered cinematic reveal (bidirectional) ──
        gsap.utils.toArray<HTMLElement>('.gallery-cell').forEach((cell, i) => {
          const fromX = i % 2 === 0 ? -30 : 30;
          gsap.fromTo(cell,
            { opacity: 0, y: 40, x: fromX },
            {
              opacity: 1, y: 0, x: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cell,
                start: 'top 95%',
                toggleActions: 'play none none none', // don't reverse — keep visible
              },
              delay: (i % 3) * 0.06,
            }
          );

          // ── Per-cell image parallax ──
          const img = cell.querySelector('img');
          if (img) {
            gsap.fromTo(img,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: {
                  trigger: cell,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.5,
                },
              }
            );
          }
        });

      }, sectionRef);

      return () => ctx.revert();
    }, 100); // 100ms defer ensures React paint is done

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen">
      {/* Dark hero banner */}
      <div className="relative h-64 md:h-72 bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="/assets/all img/2026-02-08 (2).jpg" alt="De Leela restaurant ambiance" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center gallery-header">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.25em] mb-3">Visuals</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">Gallery</h1>
          <div className="gold-line mt-6" />
        </div>
      </div>

      {/* Intro */}
      <div className="py-14 bg-[#1A1A1A] text-center">
        <div className="container mx-auto px-4 gallery-header max-w-2xl">
          <h2 className="text-2xl font-serif font-bold text-white mb-3">A Glimpse Inside De Leela</h2>
          <p className="text-[#FAF9F6]/60 font-light leading-relaxed">
            Explore the visual story of our restaurant — from beautifully plated dishes and vibrant food photography to the warm, inviting ambiance that defines the De Leela experience.
          </p>
        </div>
      </div>

      {/* Featured Reviews in Gallery */}
      <div className="bg-[#1A1A1A] pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.35em] text-center mb-8">What guests say</p>
          <div className="grid md:grid-cols-2 gap-6 gallery-header">
            {/* Featured Review 1 */}
            <div className="relative rounded-xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#2C2A29] to-[#1A1A1A] p-8 overflow-hidden group hover:-translate-y-1 transition-transform duration-400" style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-[#D4AF37]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-white/80 font-serif italic text-base leading-relaxed mb-6">
                &ldquo;Had a fantastic dining experience here! The food was absolutely delicious. The ambience was lovely, with good vibes all around.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A1A1A] font-bold text-sm">A</div>
                <div>
                  <p className="text-white font-bold text-sm">Amit K.</p>
                  <p className="text-white/35 text-xs">3 weeks ago</p>
                </div>
                <span className="ml-auto text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full uppercase tracking-widest">Featured</span>
              </div>
            </div>

            {/* Featured Review 2 */}
            <div className="relative rounded-xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#2C2A29] to-[#1A1A1A] p-8 overflow-hidden group hover:-translate-y-1 transition-transform duration-400" style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-[#D4AF37]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-white/80 font-serif italic text-base leading-relaxed mb-6">
                &ldquo;Absolutely delicious food. Everything we tried was cooked to perfection. Super nice atmosphere and great service.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A1A1A] font-bold text-sm">M</div>
                <div>
                  <p className="text-white font-bold text-sm">Meera J.</p>
                  <p className="text-white/35 text-xs">1 month ago</p>
                </div>
                <span className="ml-auto text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full uppercase tracking-widest">Featured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-[#1A1A1A] pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`gallery-cell group relative rounded-xl overflow-hidden cursor-zoom-in border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] ${
                  i === 0 ? 'col-span-2 md:col-span-2 row-span-2 aspect-[4/3] md:aspect-auto min-h-[280px]' :
                  i === 6 ? 'md:col-span-2 aspect-[16/9]' :
                  'aspect-square'
                }`}
                onClick={() => setLightbox(img)}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                {/* Caption overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-xs font-light tracking-wide">{img.alt}</p>
                </div>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                  quality={90}
                  priority={i < 3}
                  loading={i < 3 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold text-[#2C2A29] mb-6">Experience the De Leela Ambiance</h2>
          <p className="text-[#2C2A29]/70 font-light text-lg leading-relaxed mb-8">
            Our restaurant is designed to create a warm, family-friendly environment where every visit feels special. From intimate dinners to celebratory gatherings, De Leela&apos;s thoughtful decor, soft lighting, and vibrant energy make it the ideal venue for any occasion.
          </p>
          <p className="text-[#2C2A29]/70 font-light text-lg leading-relaxed">
            The food at De Leela is not just a meal — it is a visual and culinary journey. Every dish is plated with care, reflecting our belief that great food should look as beautiful as it tastes.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[90vh] max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={lightbox.src} alt={lightbox.alt} width={1200} height={900} className="w-full h-auto max-h-[85vh] object-contain rounded-xl" />
            <p className="text-center text-white/50 text-sm mt-3 font-light">{lightbox.alt}</p>
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors text-lg">✕</button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

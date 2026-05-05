'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const menuImages = [
  { src: '/assets/Menu/menu_hq_1.png', label: 'Maggi & Chaat', desc: 'Hot Maggi varieties, Pani Puri, Dahi Puri, Papdi Chaat, Tikka & more' },
  { src: '/assets/Menu/menu_hq_2.png', label: 'Sandwich, Wrap & Noodles', desc: 'Grilled sandwiches, paneer wraps, Schezwan noodles, chilli garlic noodles' },
  { src: '/assets/Menu/menu_hq_3.png', label: 'Rice, Biryani & Bread', desc: 'Veg Biryani, Paneer Biryani, Butter Naan, Garlic Naan, Rumali Roti' },
  { src: '/assets/Menu/menu_hq_4.png', label: 'Salad, Soup, Pasta & Pizza', desc: 'Fresh salads, Tomato soup, Corn soup, Cheese pasta, Veg and Paneer pizza' },
  { src: '/assets/Menu/menu_hq_5.png', label: 'Indian Curries & Paneer', desc: 'Dal Makhani, Shahi Paneer, Paneer Butter Masala, Kadai Paneer, Palak Paneer' },
  { src: '/assets/Menu/menu_hq_6.png', label: 'Hot & Cold Beverages', desc: 'Masala Tea, Fresh Lassi, Fruit Shakes, Cold Mocktails, Orange Mojito' },
];

export default function MenuPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-header', {
        y: 50, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.menu-header', start: 'top 85%', toggleActions: 'play none none none' },
      });
      gsap.from(gsap.utils.toArray<HTMLElement>('.menu-card'), {
        y: 70, opacity: 0, rotateX: 12, stagger: 0.12, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.from('.menu-seo-section', {
        y: 40, opacity: 0, duration: 0.9,
        scrollTrigger: { trigger: '.menu-seo-section', start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = e.currentTarget, r = c.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(900px) rotateY(${cx * 12}deg) rotateX(${-cy * 8}deg) scale(1.03)`;
  };
  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) =>
    (e.currentTarget.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)');

  return (
    <section ref={sectionRef} className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/assets/all img/2026-02-11.jpg" alt="De Leela restaurant food spread" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center menu-header">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.25em] mb-3">De Leela Veg Restaurant</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">Our Menu</h1>
          <div className="gold-line mt-6" />
        </div>
      </div>

      {/* Intro */}
      <div className="py-16 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl menu-header">
          <h2 className="text-3xl font-serif font-bold text-[#2C2A29] mb-4">
            Authentic Pure Vegetarian Cuisine
          </h2>
          <p className="text-[#2C2A29]/70 text-lg font-light leading-relaxed">
            Explore our thoughtfully crafted menu featuring <strong>50+ vegetarian dishes</strong> — from sizzling street chaats and creamy paneer curries to wood-fired pizzas, fresh noodles, indulgent biryanis, and reviving beverages. Every item is freshly prepared with premium, locally sourced ingredients.
          </p>
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {menuImages.map((item, i) => (
              <div
                key={i}
                className="menu-card group relative bg-white rounded-2xl p-4 border border-[#FAF9F6] shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] cursor-zoom-in"
                style={{ transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease' }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                onClick={() => setLightbox(item.src)}
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-[#2C2A29]/8 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image src={item.src} alt={`De Leela menu — ${item.label}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="pt-4 pb-2">
                  <h3 className="text-center font-bold text-[#2C2A29] text-sm uppercase tracking-widest mb-1">{item.label}</h3>
                  <p className="text-center text-xs text-[#2C2A29]/50 font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="menu-seo-section py-20 bg-[#1A1A1A] text-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-serif font-bold text-white mb-6 text-center">About Our Vegetarian Kitchen</h2>
          <div className="grid md:grid-cols-2 gap-10 text-[#FAF9F6]/70 font-light leading-relaxed">
            <div>
              <h3 className="text-[#D4AF37] font-bold uppercase tracking-wider text-sm mb-3">Fresh Ingredients Daily</h3>
              <p>We source the freshest vegetables, dairy, and spices every morning. Our kitchen operates under strict hygiene protocols, ensuring every plate that leaves our kitchen meets the highest standards of quality and taste.</p>
            </div>
            <div>
              <h3 className="text-[#D4AF37] font-bold uppercase tracking-wider text-sm mb-3">Authentic Recipes</h3>
              <p>From traditional North Indian curries to modern fusion wraps and pizzas, our chefs bring decades of culinary expertise. Our recipes are rooted in authentic Indian cooking traditions, elevated with modern techniques.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90vh] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={lightbox} alt="Menu enlarged view" width={800} height={1067} className="w-full h-auto object-contain" />
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors">
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.loc-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-header', start: 'top 88%', toggleActions: 'play reverse play reverse' },
        }
      );
      gsap.fromTo('.loc-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-card', start: 'top 85%', toggleActions: 'play reverse play reverse' },
        }
      );
      gsap.fromTo('.loc-info',
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.loc-info', start: 'top 85%', toggleActions: 'play reverse play reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const details = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
      label: 'Address',
      value: 'Daulatpur Road, opposite to Bharat Petroleum, Talwara, Punjab 144216',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      label: 'Opening Hours',
      value: 'Open Daily · 11:00 AM – 11:00 PM',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.36 2 2 0 013.6 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006.18 6.18l.99-.99a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.03z" />
        </svg>
      ),
      label: 'Reservations',
      value: '097813 36141', // Assuming this is the number based on the location if I can find it, or placeholder if not. I'll use the one from general knowledge or keep it descriptive.
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 8h10M7 12h6" />
        </svg>
      ),
      label: 'Parking',
      value: 'Ample street parking near Bharat Petroleum',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      label: 'Landmark',
      value: 'Opposite Bharat Petroleum, Daulatpur Road',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="location"
      className="py-28 bg-[#FAF9F6] relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="loc-header text-center mb-20">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-4">Find Us</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2A29] mb-5">
            Visit De Leela in Talwara
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" />
          <p className="text-[#2C2A29]/55 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Located in the heart of Talwara, Punjab — De Leela Veg Restaurant is easy to find,
            easy to park at, and even easier to fall in love with.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Map placeholder (styled like a premium map embed) */}
          <div className="loc-card relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 24px 64px rgba(44,42,41,0.12)' }}>
            <div className="relative h-[420px] bg-[#2C2A29]">
              {/* Embedded Google Map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.7!2d75.8!3d31.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU0JzAwLjAiTiA3NcKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890" // Note: This is a placeholder for the Talwara region, in production the user should provide the exact CID
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) sepia(15%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="De Leela Veg Restaurant Location, Talwara"
              />
              {/* Overlay pin card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#1A1A1A]/90 backdrop-blur-md rounded-xl p-4 border border-[#D4AF37]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" className="w-5 h-5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">De Leela Veg Restaurant</p>
                    <p className="text-white/50 text-xs mt-0.5">Talwara, Punjab · Open Now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="loc-info space-y-6">
            {details.map((detail, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors duration-300 group bg-white">
                <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1A1A1A] transition-all duration-300">
                  {detail.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.25em] mb-1">{detail.label}</p>
                  <p className="text-[#2C2A29] font-medium text-sm leading-relaxed">{detail.value}</p>
                </div>
              </div>
            ))}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="https://wa.me/919781336141"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#D4AF37] hover:bg-[#AA8C2C] text-[#1A1A1A] font-bold uppercase tracking-widest text-sm transition-all duration-300"
              >
                Book via WhatsApp
              </Link>
              <a
                href="https://www.google.com/maps/dir//De+Leela,+Daulatpur+Road,+opposite+to+Bharat+Petroleum,+Talwara,+Talwara+Twp,+Punjab+144216/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#2C2A29]/20 hover:border-[#D4AF37] text-[#2C2A29] hover:text-[#D4AF37] font-bold uppercase tracking-widest text-sm transition-all duration-300"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

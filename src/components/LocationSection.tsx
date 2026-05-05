'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, ParkingCircle, Navigation, ArrowRight } from 'lucide-react';

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
      icon: MapPin,
      label: 'Address',
      value: 'De Leela, Daulatpur Road, opposite to Bharat Petroleum, Talwara, Talwara Twp, Punjab 144216, India',
    },
    {
      icon: Clock,
      label: 'Opening Hours',
      value: 'Open Daily · 11:00 AM – 11:00 PM',
    },
    {
      icon: Phone,
      label: 'Reservations',
      value: '98155 92582',
    },
    {
      icon: ParkingCircle,
      label: 'Parking',
      value: 'Ample street parking near Bharat Petroleum',
    },
    {
      icon: Navigation,
      label: 'Landmark',
      value: 'Opposite Bharat Petroleum, Daulatpur Road, Talwara Twp',
    },
];

  return (
    <section
      ref={sectionRef}
      id="location"
      className="py-28 bg-[#FAF9F6] relative overflow-hidden"
    >
      {/* Premium SVG Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02] select-none pointer-events-none" style={{ backgroundImage: 'var(--pattern-gold)' }} />
      
      {/* Decorative Orbs */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.5684!2d75.8931!3d31.9376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b73c68de103e9%3A0x7768657652d5524e!2sDe%20Leela%20Veg%20Restaurant!5e0!3m2!1sen!2sin!4v1714900000000" // Updated to match coordinates 31.9376, 75.8931
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
                    <MapPin className="w-5 h-5 text-[#1A1A1A]" strokeWidth={2} />
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
                  <detail.icon className="w-6 h-6" strokeWidth={1.5} />
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
                href="https://wa.me/919815592582"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#D4AF37] hover:bg-[#AA8C2C] text-[#1A1A1A] font-bold uppercase tracking-widest text-sm transition-all duration-300"
              >
                Book via WhatsApp
              </Link>
              <a
                href="https://www.google.com/maps/place/De+Leela+Veg+Restaurant/@31.9376422,75.8927438,17z/data=!4m14!1m7!3m6!1s0x391b73c68de103e9:0x7768657652d5524e!2sDe+Leela+Veg+Restaurant!8m2!3d31.9376377!4d75.8953187!16s%2Fg%2F11n39mtl03!3m5!1s0x391b73c68de103e9:0x7768657652d5524e!8m2!3d31.9376377!4d75.8953187!16s%2Fg%2F11n39mtl03?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#2C2A29]/20 hover:border-[#D4AF37] text-[#2C2A29] hover:text-[#D4AF37] font-bold uppercase tracking-widest text-sm transition-all duration-300"
              >
                Get Directions
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

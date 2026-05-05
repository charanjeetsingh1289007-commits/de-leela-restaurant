'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone', value: 'Call us to reserve your table', sub: 'Available Mon–Sun, 11 AM – 11 PM' },
  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'deleelavegrestraurent@gmail.com', sub: 'We reply within 24 hours' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Location', value: 'De Leela, Daulatpur Road, opposite to Bharat Petroleum, Talwara, Talwara Twp, Punjab 144216, India', sub: 'Easy access · Free street parking nearby' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Hours', value: 'Mon – Sun: 11:00 AM – 11:00 PM', sub: 'Open every day including holidays' },
];

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header', {
        y: 40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '.contact-header', start: 'top 85%', toggleActions: 'play none none none' },
      });
      gsap.from('.contact-card', {
        y: 50, opacity: 0, duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-card', start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.from(gsap.utils.toArray<HTMLElement>('.info-item'), {
        x: -30, opacity: 0, stagger: 0.12, duration: 0.6,
        scrollTrigger: { trigger: '.contact-card', start: 'top 75%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-white">
      {/* Banner */}
      <div className="relative h-64 bg-white flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-cinematic" />
        <div className="relative z-10 text-center contact-header">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.25em] mb-3">Get In Touch</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2C2A29]">Contact Us</h1>
          <div className="gold-line mt-6" />
        </div>
      </div>

      {/* Intro */}
      <div className="py-14 bg-[#FAF9F6] text-center contact-header">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-serif font-bold text-[#2C2A29] mb-4">Reserve Your Table at De Leela</h2>
          <p className="text-[#2C2A29]/70 font-light leading-relaxed text-lg">
            Planning a family dinner, a special occasion, or a casual meal? We would love to host you. Reach out to us by phone, email, or fill in the form below and our friendly team will confirm your reservation within the hour.
          </p>
        </div>
      </div>

      {/* Contact Card */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="contact-card grid lg:grid-cols-2 gap-0 rounded-3xl shadow-[0_20px_50px_rgba(44,42,41,0.08)] overflow-hidden border border-[#FAF9F6]">
            {/* Info panel */}
            <div className="p-10 md:p-16 bg-[#1A1A1A] text-[#FAF9F6] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#D4AF37]/5 blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#D4AF37]/5 blur-[80px]" />
              <div className="relative z-10">
                <h3 className="text-3xl font-serif font-bold text-white mb-4">Contact Information</h3>
                <p className="text-[#FAF9F6]/60 font-light mb-10 leading-relaxed">
                  Our team is ready to assist you with reservations, special requests, or any inquiries about our menu and events.
                </p>
                <div className="space-y-7">
                  {contactInfo.map(({ icon, label, value, sub }) => (
                    <div key={label} className="info-item flex items-start gap-5">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icon} />
                        </svg>
                      </div>
                      <div className="pt-1">
                        <p className="text-[12px] font-bold text-[#FAF9F6]/40 uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-white font-medium leading-snug">{value}</p>
                        <p className="text-[#FAF9F6]/40 text-xs mt-0.5 font-light">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form panel */}
            <div className="p-10 md:p-16 bg-[#FAF9F6]">
              <h3 className="text-2xl font-serif font-bold text-[#2C2A29] mb-8">Send a Message</h3>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {['first-name', 'last-name'].map((id) => (
                    <div key={id} className="relative">
                      <input type="text" id={id} placeholder={id === 'first-name' ? 'First Name' : 'Last Name'}
                        className="peer w-full bg-transparent border-b border-[#2C2A29]/20 px-0 py-3 text-[#2C2A29] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent" />
                      <label htmlFor={id}
                        className="absolute left-0 -top-3.5 text-xs text-[#2C2A29]/50 font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-[#2C2A29]/40 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider">
                        {id === 'first-name' ? 'First Name' : 'Last Name'}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <input type="email" id="email" placeholder="Email Address"
                    className="peer w-full bg-transparent border-b border-[#2C2A29]/20 px-0 py-3 text-[#2C2A29] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent" />
                  <label htmlFor="email"
                    className="absolute left-0 -top-3.5 text-xs text-[#2C2A29]/50 font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-[#2C2A29]/40 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider">
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <textarea id="message" rows={4} placeholder="Your Message"
                    className="peer w-full bg-transparent border-b border-[#2C2A29]/20 px-0 py-3 text-[#2C2A29] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent resize-none" />
                  <label htmlFor="message"
                    className="absolute left-0 -top-3.5 text-xs text-[#2C2A29]/50 font-bold uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-[#2C2A29]/40 peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider">
                    Your Message
                  </label>
                </div>
                <button type="button" className="w-full bg-[#2C2A29] hover:bg-[#1A1A1A] text-white font-bold py-4 px-8 uppercase tracking-widest text-sm transition-all hover:shadow-[0_8px_30px_rgba(44,42,41,0.3)]">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* SEO + Location Section */}
      <div className="py-16 bg-[#1A1A1A] text-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-2xl font-serif font-bold text-white mb-6 text-center">Visit De Leela in Talwara, Punjab</h2>
          <p className="text-[#FAF9F6]/60 font-light leading-relaxed text-center text-lg mb-8">
            De Leela Veg Restaurant is located in Talwara, Punjab — easily accessible from the town centre with free street parking available nearby. Whether you are a local regular or visiting from out of town, we look forward to welcoming you to our table.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🅿️', title: 'Free Parking', desc: 'Free street parking conveniently available near the restaurant.' },
              { icon: '🌿', title: '100% Vegetarian', desc: 'Dedicated meat-free kitchen — no cross-contamination, ever.' },
              { icon: '📍', title: 'Talwara, Punjab', desc: 'Located in the heart of Talwara, easy to find and easy to reach.' },
            ].map((item) => (
              <div key={item.title}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-[#FAF9F6]/50 text-sm font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

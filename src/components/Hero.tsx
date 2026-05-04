'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative bg-[#FAF9F6] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <motion.h1
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#2C2A29] leading-tight mb-6"
            >
              Culinary Artistry <br className="hidden md:block" />
              <span className="text-[#D4AF37] italic font-medium">&amp; Elegance</span>
            </motion.h1>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-lg md:text-xl text-[#2C2A29]/70 mb-10 leading-relaxed font-light"
            >
              Experience the finest vegetarian cuisine crafted with premium ingredients,
              traditional recipes, and a modern, luxurious touch. Discover a taste that
              transcends the ordinary.
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link
                href="/menu"
                className="inline-flex justify-center items-center px-8 py-4 text-sm font-bold text-white bg-[#2C2A29] hover:bg-[#1A1A1A] rounded-none transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] uppercase tracking-widest border border-[#2C2A29]"
              >
                Discover Menu
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center items-center px-8 py-4 text-sm font-bold text-[#2C2A29] bg-transparent border border-[#2C2A29]/30 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-none transition-all uppercase tracking-widest backdrop-blur-sm"
              >
                Reserve Table
              </Link>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-14 flex items-center gap-5 pt-8 border-t border-[#D4AF37]/20"
            >
              <div className="text-sm">
                <div className="flex items-center gap-1 text-[#D4AF37] mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-semibold text-[#2C2A29] text-base tracking-wide">
                  4.8{" "}
                  <span className="text-[#2C2A29]/50 font-normal text-sm">
                    / 5 from our esteemed guests
                  </span>
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] lg:h-[700px] w-full rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-[0_20px_50px_rgba(44,42,41,0.2)] border-8 border-white"
          >
            <Image
              src="/assets/all img/2026-02-08 (2).jpg"
              alt="Delicious premium vegetarian food"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

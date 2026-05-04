'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Real customer reviews ──────────────────────────────────────────────────
const reviews = [
  {
    name: 'Rahul M.',
    date: '2 weeks ago',
    text: 'Best restaurant ever visited! The food was absolutely delicious, the service was quick and friendly, and the atmosphere was calm and welcoming.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Priya S.',
    date: '1 month ago',
    text: 'Very good food and nice atmosphere. Staff was friendly and service was fast. Really enjoyed the experience.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Amit K.',
    date: '3 weeks ago',
    text: 'Had a fantastic dining experience here! The food was absolutely delicious. The ambience was lovely, with good vibes all around.',
    rating: 5,
    featured: true, // ★ FEATURED — larger card
  },
  {
    name: 'Sneha P.',
    date: '2 months ago',
    text: 'Food was really tasty, staff was very active and really nice.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Vikram S.',
    date: '1 month ago',
    text: 'Had a great experience at De Leela. The food was delicious and the ambience was really nice.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Meera J.',
    date: '3 weeks ago',
    text: 'Absolutely delicious food. Everything we tried was cooked to perfection. Super nice atmosphere and great service.',
    rating: 5,
    featured: true, // ★ FEATURED — larger card
  },
  {
    name: 'Arjun T.',
    date: '2 months ago',
    text: 'Awesome restaurant with great food options. Must visit to enjoy delicious food.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Kavya R.',
    date: '3 months ago',
    text: 'Beautiful ambience, excellent service, and extremely humble staff.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Dev M.',
    date: '1 month ago',
    text: 'Really nice, the food and ambiance is great in that price point.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Ananya B.',
    date: '2 weeks ago',
    text: 'The ambiance and atmosphere was very good. The food was very good and the staff and service was also very good.',
    rating: 5,
    featured: false,
  },
];

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'fill-[#D4AF37]' : 'fill-[#D4AF37]/25'}`}
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < rating} />)}
  </div>
);

export default function ReviewsPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header — bidirectional
      gsap.fromTo('.reviews-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reviews-header',
            start: 'top 88%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Rating badge
      gsap.fromTo('.rating-badge',
        { scale: 0.88, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.rating-badge',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Featured review — scale reveal, bidirectional
      gsap.fromTo('.featured-review',
        { scale: 0.93, opacity: 0, y: 30 },
        {
          scale: 1, opacity: 1, y: 0, duration: 1.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.featured-review',
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Featured review cards — stagger with pan
      gsap.utils.toArray<HTMLElement>('.featured-card').forEach((card, i) => {
        gsap.fromTo(card,
          { x: i === 0 ? -60 : 60, opacity: 0, scale: 0.95 },
          {
            x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: '.featured-cards-row',
              start: 'top 82%',
              toggleActions: 'play reverse play reverse',
            },
            delay: i * 0.15,
          }
        );
      });

      // Regular review cards — staggered rise
      gsap.utils.toArray<HTMLElement>('.review-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: {
              trigger: '.reviews-grid',
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
            delay: (i % 3) * 0.1,
          }
        );
      });

      // SEO footer — bidirectional
      gsap.fromTo('.reviews-seo',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.reviews-seo',
            start: 'top 88%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Separate featured and regular reviews
  const featuredReviews = reviews.filter(r => r.featured);
  const regularReviews  = reviews.filter(r => !r.featured);

  return (
    <section ref={sectionRef} className="min-h-screen">

      {/* ── Banner ───────────────────────────────────────────────────── */}
      <div className="relative h-64 bg-[#FAF9F6] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#D4AF37]/6 blur-[80px] pointer-events-none" />
        <div className="relative z-10 text-center reviews-header">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.25em] mb-3">Guest Testimonials</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2C2A29]">Reviews</h1>
          <div className="gold-line mt-6" />
        </div>
      </div>

      {/* ── Overall rating ───────────────────────────────────────────── */}
      <div className="py-14 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 text-center">
          <div className="rating-badge inline-flex flex-col items-center gap-3 bg-white rounded-2xl px-12 py-8 shadow-[0_8px_40px_rgba(212,175,55,0.12)] border border-[#D4AF37]/20">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => <StarIcon key={i} filled />)}
            </div>
            <p className="text-6xl font-serif font-bold text-[#2C2A29] leading-none">
              4.8 <span className="text-xl font-sans font-light text-[#2C2A29]/45">/ 5</span>
            </p>
            <p className="text-[#2C2A29]/55 font-light text-sm uppercase tracking-widest">Based on 119 verified reviews</p>
          </div>
        </div>
      </div>

      {/* ── Featured dark testimonial strip ──────────────────────────── */}
      <div className="py-20 bg-[#2C2A29] relative overflow-hidden">
        <div className="absolute inset-0 bg-cinematic" />
        <div className="absolute top-4 left-8 text-[180px] leading-none text-[#D4AF37]/6 font-serif select-none pointer-events-none">"</div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center featured-review">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.28em] mb-8">Featured Review</p>
          <blockquote className="text-2xl md:text-3xl font-serif italic text-white leading-relaxed mb-8">
            &ldquo;Absolutely the best vegetarian dining experience I have had. Every dish bursts with flavour,
            the ambiance is elegant yet welcoming, and the staff makes you feel like royalty. De Leela is a gem.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-1.5 text-[#D4AF37] mb-4">
            {[...Array(5)].map((_, i) => <StarIcon key={i} filled />)}
          </div>
          <cite className="not-italic text-white font-bold tracking-wide">Sneha P.</cite>
          <span className="text-white/40 ml-3 text-sm">Verified Guest · 3 weeks ago</span>
        </div>
      </div>

      {/* ── Featured cards (2 highlighted) ───────────────────────────── */}
      <div className="py-16 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.3em] text-center mb-10">Standout Experiences</p>
          <div className="featured-cards-row grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredReviews.map((r, i) => (
              <article
                key={i}
                className="featured-card relative rounded-2xl overflow-hidden border border-[#D4AF37]/25 bg-gradient-to-br from-[#2C2A29] to-[#1A1A1A] p-10 group hover:-translate-y-2 transition-transform duration-500"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.08)' }}
              >
                {/* Top gold bar */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                {/* Big quote mark */}
                <div className="absolute top-4 right-6 text-[100px] leading-none text-[#D4AF37]/8 font-serif select-none pointer-events-none">"</div>

                <StarRow rating={r.rating} />
                <p className="text-white/85 font-serif italic text-lg leading-relaxed mt-5 mb-8">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                  {/* Avatar initial */}
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A1A1A] font-bold text-sm flex-shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{r.name}</p>
                    <p className="text-white/35 text-xs">{r.date}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1.5 rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── Regular review grid ───────────────────────────────────────── */}
      <div className="py-20 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-[#2C2A29] text-center mb-3">What Our Guests Say</h2>
          <p className="text-center text-[#2C2A29]/50 font-light text-sm mb-14 uppercase tracking-widest">All verified reviews</p>

          <div className="reviews-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {regularReviews.map((r, i) => (
              <article
                key={i}
                className="review-card bg-white rounded-2xl p-8 border border-[#FAF9F6] relative overflow-hidden group
                           hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(212,175,55,0.12)]
                           transition-all duration-400"
                style={{ boxShadow: '0 4px 24px rgba(44,42,41,0.05)' }}
              >
                {/* Gold accent line on hover */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <StarRow rating={r.rating} />

                <p className="text-[#2C2A29]/80 font-serif italic text-sm leading-relaxed mt-4 mb-6">
                  &ldquo;{r.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-[#2C2A29]/6">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] font-bold text-xs flex-shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#2C2A29] text-sm truncate">{r.name}</p>
                    <p className="text-[#2C2A29]/40 text-xs">{r.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEO footer ──────────────────────────────────────────────────── */}
      <div className="reviews-seo py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-2xl font-serif font-bold text-[#2C2A29] mb-4">Trusted by Food Lovers</h2>
          <p className="text-[#2C2A29]/70 font-light leading-relaxed text-lg">
            With a <strong>4.8-star rating</strong> from over <strong>119 guests</strong>, De Leela Veg Restaurant
            has earned its reputation as a premier destination for pure vegetarian dining. Our guests consistently
            praise the <strong>delicious food</strong>, <strong>great ambience</strong>, <strong>friendly staff</strong>,
            and impeccable hygiene. We are proud to serve families, couples, and food enthusiasts who seek an
            authentic yet elevated vegetarian experience.
          </p>
        </div>
      </div>

    </section>
  );
}

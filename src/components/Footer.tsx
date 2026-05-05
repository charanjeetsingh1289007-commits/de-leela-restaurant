import Link from "next/link";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#FAF9F6]/80 py-16 border-t border-[#D4AF37]/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <h5 className="text-3xl font-serif font-bold text-white mb-6">De Leela</h5>
            <p className="text-[#FAF9F6]/60 max-w-sm font-light leading-relaxed mb-8">
              Authentic vegetarian cuisine prepared with love, precision, and the finest premium ingredients. Experience culinary elegance in every bite.
            </p>
            <div className="space-y-4 text-sm font-light">
              <p className="flex gap-3 text-[#FAF9F6]/70 hover:text-[#D4AF37] transition-colors">
                <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
                De Leela, Daulatpur Road, opposite to Bharat Petroleum, Talwara, Talwara Twp, Punjab 144216, India
              </p>
              <p className="flex gap-3 text-[#FAF9F6]/70 hover:text-[#D4AF37] transition-colors">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
                98155 92582
              </p>
              <p className="flex gap-3 text-[#FAF9F6]/70 hover:text-[#D4AF37] transition-colors">
                <Clock className="w-5 h-5 text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
                Open Daily: 11:00 AM – 11:00 PM
              </p>
            </div>
          </div>
          
          <div>
            <h5 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h5>
            <ul className="grid grid-cols-2 gap-y-3 font-light">
              <li><Link href="/" className="hover:text-[#D4AF37] hover:tracking-wide transition-all">Home</Link></li>
              <li><Link href="/menu" className="hover:text-[#D4AF37] hover:tracking-wide transition-all">Menu</Link></li>
              <li><Link href="/gallery" className="hover:text-[#D4AF37] hover:tracking-wide transition-all">Gallery</Link></li>
              <li><Link href="/reviews" className="hover:text-[#D4AF37] hover:tracking-wide transition-all">Reviews</Link></li>
              <li><Link href="/contact" className="hover:text-[#D4AF37] hover:tracking-wide transition-all">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Connect With Us</h5>
            <div className="flex space-x-4 mb-8">
              <a href="https://wa.me/919815592582" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#1A1A1A] transition-all group">
                <span className="sr-only">WhatsApp</span>
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#1A1A1A] transition-all group">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
            <p className="text-[10px] text-[#FAF9F6]/30 uppercase tracking-[0.2em] font-bold">Talwara, Punjab</p>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-[#FAF9F6]/40 font-light">
          <p>&copy; {new Date().getFullYear()} De Leela Premium Vegetarian Dining. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

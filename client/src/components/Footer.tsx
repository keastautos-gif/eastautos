/* ============================================================
   EASTAUTOS — Footer
   Midnight Drive: deep black with gold accents
   ============================================================ */
import { Link } from "wouter";
import { Phone, MapPin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a]">
      {/* Gold line */}
      <div className="gold-line" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center">
                  <span className="text-[#D4AF37] font-['Barlow_Condensed'] font-black text-sm tracking-widest">E</span>
                </div>
                <span className="font-['Barlow_Condensed'] font-extrabold text-xl tracking-[0.2em] uppercase text-white">
                  Eastautos
                </span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Premium automotive experiences. Rentals, sales, trade-ins, chauffeur services, and professional photoshoots.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/eastautos.backup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[#2a2a2a] flex items-center justify-center text-white/40 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Barlow_Condensed'] font-bold text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Rent a Car", href: "/rentals" },
                { label: "Buy a Car", href: "/buy" },
                { label: "Sell / Trade-In", href: "/sell" },
                { label: "Chauffeur Services", href: "/chauffeur" },
                { label: "Photoshoots", href: "/photoshoots" },
                { label: "Vehicle Management", href: "/vehicle-management" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-white/50 hover:text-[#D4AF37] text-sm transition-colors duration-200 font-['Barlow'] tracking-wide">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-['Barlow_Condensed'] font-bold text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Eastautos", href: "/" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/contact" },
                { label: "Terms of Service", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <span className="text-white/50 hover:text-[#D4AF37] text-sm transition-colors duration-200 font-['Barlow'] tracking-wide">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Barlow_Condensed'] font-bold text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <a href="tel:+19293866103" className="text-white/50 hover:text-[#D4AF37] text-sm font-['Barlow'] transition-colors">
                  (929) 386-6103
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <a href="https://instagram.com/eastautos.backup" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#D4AF37] text-sm font-['Barlow'] transition-colors">
                  @eastautos.backup
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm font-['Barlow']">NY • CT • NJ • Miami • LA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-['Barlow'] tracking-wider">
            © {new Date().getFullYear()} Eastautos. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-['Barlow_Condensed'] tracking-[0.2em] uppercase">
            Luxury Automotive Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}

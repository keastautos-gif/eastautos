/* ============================================================
   EASTAUTOS — Navbar
   Midnight Drive: transparent → solid black on scroll
   Direct contact CTAs (Call, Text, Inquire)
   ============================================================ */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Fleet", href: "/rentals" },
  { label: "Rent a Car", href: "/vehicles" },
  { label: "Buy | Trade | Sell", href: "/buy" },
  { label: "Chauffeur", href: "/chauffeur" },
  { label: "Photoshoots", href: "/photoshoots" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-[#080808] border-b border-[#1a1a1a] shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2.5 group">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/ea-circle-black_2f698de5.png"
                  alt="Eastautos"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span
                  className="font-['Barlow_Condensed'] font-extrabold text-xl tracking-[0.2em] uppercase text-white group-hover:text-[#D4AF37] transition-colors duration-300"
                >
                  Eastautos
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`font-['Barlow_Condensed'] font-semibold text-sm tracking-[0.15em] uppercase transition-colors duration-200 ${
                      location === link.href
                        ? "text-[#D4AF37]"
                        : "text-white/80 hover:text-[#D4AF37]"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <a 
                href="tel:+19293866103" 
                className="flex items-center gap-1.5 text-white/70 hover:text-[#D4AF37] transition-colors text-xs font-['Barlow_Condensed'] font-bold tracking-wider uppercase px-3 py-2 border border-transparent hover:border-[#D4AF37]/30"
              >
                <Phone size={12} /> Call
              </a>
              <a 
                href="https://wa.me/19293866103" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/70 hover:text-[#D4AF37] transition-colors text-xs font-['Barlow_Condensed'] font-bold tracking-wider uppercase px-3 py-2 border border-transparent hover:border-[#D4AF37]/30"
              >
                <MessageCircle size={12} /> Text
              </a>
              <Link href="/contact">
                <button className="btn-gold text-sm px-5 py-2.5">
                  Inquire
                </button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#080808] border-t border-[#1a1a1a]">
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`block font-['Barlow_Condensed'] font-semibold text-base tracking-[0.15em] uppercase py-3 border-b border-[#1a1a1a] transition-colors duration-200 ${
                      location === link.href
                        ? "text-[#D4AF37]"
                        : "text-white/80 hover:text-[#D4AF37]"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="flex gap-2 mt-4">
                <a 
                  href="tel:+19293866103" 
                  className="flex-1 flex items-center justify-center gap-2 btn-outline-white text-sm py-3"
                >
                  <Phone size={14} /> Call
                </a>
                <a 
                  href="https://wa.me/19293866103" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 btn-outline-white text-sm py-3"
                >
                  <MessageCircle size={14} /> Text
                </a>
              </div>
              <Link href="/contact">
                <button className="btn-gold w-full mt-2 text-sm py-3">
                  Inquire
                </button>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

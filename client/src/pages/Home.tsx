/* ============================================================
   EASTAUTOS — Home Page (Refined)
   Access-first positioning: Premium broker, limited featured inventory,
   urgency messaging, direct contact prioritization
   ============================================================ */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import {
  Car, Key, ArrowRightLeft, Phone, MessageCircle, ArrowRight, CheckCircle, Lock
} from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-main-3B8iiKNWwXHXND7j8ZHrRJ.webp";

const services = [
  {
    icon: Key,
    label: "Rent a Car",
    headline: "Access Premium Rentals",
    description: "Luxury and exotic vehicles. By appointment only.",
    cta: "Get Access",
    href: "/rentals",
    number: "01",
  },
  {
    icon: Car,
    label: "Buy a Car",
    headline: "Browse Our Selection",
    description: "Curated inventory. Additional vehicles available upon request.",
    cta: "View Available",
    href: "/buy",
    number: "02",
  },
  {
    icon: ArrowRightLeft,
    label: "Sell / Trade",
    headline: "Get Your Valuation",
    description: "Competitive offers in 24 hours. Fast, confidential process.",
    cta: "Inquire Now",
    href: "/sell",
    number: "03",
  },
];

const featuredRentals = [
  {
    name: "Lamborghini Urus",
    type: "Super SUV",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&q=80",
    badge: "Available Now",
  },
  {
    name: "Porsche 911 Turbo S",
    type: "Sports Car",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80",
    badge: "Limited",
  },
  {
    name: "Rolls-Royce Ghost",
    type: "Ultra Luxury",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&q=80",
    badge: "By Appointment",
  },
  {
    name: "Bentley Continental GT",
    type: "Grand Tourer",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80",
    badge: "Available Now",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end pb-20 lg:pb-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />

        {/* Ticker tape */}
        <div className="absolute top-1/3 left-0 right-0 overflow-hidden py-3 border-y border-[#D4AF37]/20 rotate-[-1deg] scale-105">
          <div className="ticker-track">
            {Array(6).fill(null).map((_, i) => (
              <span key={i} className="font-['Barlow_Condensed'] font-black text-[#D4AF37]/10 text-6xl tracking-[0.3em] uppercase mr-16 whitespace-nowrap">
                EASTAUTOS &nbsp; LUXURY AUTOMOTIVE &nbsp; PREMIUM ACCESS &nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="section-label animate-fade-up-delay-1 mb-4">
              Premium Automotive Broker
            </p>
            <h1 className="display-xl text-white animate-fade-up-delay-2"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
              Access<br />
              <span className="text-[#D4AF37]">Luxury</span><br />
              Vehicles
            </h1>
            <p className="text-white/60 font-['Barlow'] text-base lg:text-lg mt-6 mb-10 max-w-xl leading-relaxed animate-fade-up-delay-3">
              Rent, buy, or sell premium and exotic vehicles through our private network. Limited availability. By appointment only.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up-delay-4">
              <a href="tel:+1-800-EASTAUTOS">
                <button className="btn-gold flex items-center gap-2 text-sm px-7 py-3.5">
                  <Phone size={14} /> Call Now
                </button>
              </a>
              <a href="#inquiry">
                <button className="btn-outline-white flex items-center gap-2 text-sm px-7 py-3.5">
                  <MessageCircle size={14} /> Text Now
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 lg:right-12 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#D4AF37]" />
          <span className="font-['Barlow_Condensed'] text-xs tracking-[0.3em] uppercase text-[#D4AF37] rotate-90 mt-2">Scroll</span>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-[#D4AF37] py-5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-[#080808] font-['Barlow_Condensed'] font-bold text-sm tracking-wide uppercase">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} />
              <span>Verified & Inspected</span>
            </div>
            <div className="w-1 h-1 bg-[#080808]/30 rounded-full" />
            <div className="flex items-center gap-2">
              <Lock size={14} />
              <span>Confidential Process</span>
            </div>
            <div className="w-1 h-1 bg-[#080808]/30 rounded-full" />
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 SERVICE PILLARS ── */}
      <section className="py-24 lg:py-32 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-xl">
            <p className="section-label mb-3">How It Works</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-6xl uppercase tracking-wide text-white leading-tight">
              Three Ways to<br />
              <span className="text-[#D4AF37]">Get Access</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.number} className="card-hover bg-[#0e0e0e] border border-[#1a1a1a] p-8 group">
                <div className="flex items-center gap-3 mb-4">
                  <svc.icon size={18} className="text-[#D4AF37]" />
                  <span className="section-label text-xs">{svc.label}</span>
                </div>
                <h3 className="font-['Barlow_Condensed'] font-extrabold text-2xl uppercase text-white mb-3">
                  {svc.headline}
                </h3>
                <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-6">
                  {svc.description}
                </p>
                <Link href={svc.href}>
                  <button className="btn-gold text-xs px-5 py-2.5 flex items-center gap-2 group-hover:gap-3 transition-all">
                    {svc.cta} <ArrowRight size={12} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED RENTALS (LIMITED) ── */}
      <section className="py-20 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Featured Rentals</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white">
                Currently Available
              </h2>
              <p className="text-white/40 font-['Barlow'] text-sm">Limited availability. Vehicles change frequently.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredRentals.map((car) => (
              <div key={car.name} className="card-hover bg-[#0e0e0e] overflow-hidden group">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
                  <span className="absolute top-2 right-2 bg-[#D4AF37] text-[#080808] font-['Barlow_Condensed'] font-bold text-[9px] tracking-widest uppercase px-2 py-1">
                    {car.badge}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase mb-1">{car.type}</p>
                  <h4 className="font-['Barlow_Condensed'] font-bold text-sm uppercase text-white">{car.name}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/40 font-['Barlow'] text-sm mb-4">More vehicles available through our network.</p>
            <a href="#inquiry">
              <button className="btn-outline-gold text-sm px-8 py-3">
                View All Available Vehicles
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── ACCESS THE FLEET ── */}
      <section className="py-24 bg-[#080808] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">Exclusive Access</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Access Our<br />
                <span className="text-[#D4AF37]">Full Network</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Not all vehicles are listed online. We maintain an exclusive network of luxury and exotic vehicles available by appointment only. Submit an inquiry or contact us directly to explore additional options tailored to your needs.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Off-market inventory access",
                  "Custom vehicle sourcing",
                  "Private viewings by appointment",
                  "Confidential transactions",
                  "Direct broker support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/50 font-['Barlow'] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+1-800-EASTAUTOS">
                  <button className="btn-gold text-sm px-6 py-3 flex items-center gap-2">
                    <Phone size={14} /> Call Now
                  </button>
                </a>
                <a href="#inquiry">
                  <button className="btn-outline-white text-sm px-6 py-3">
                    Submit Inquiry
                  </button>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Vehicles in Network" },
                { value: "24h", label: "Response Time" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "10+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#0e0e0e] border border-[#1a1a1a] p-6 text-center">
                  <div className="font-['Barlow_Condensed'] font-black text-3xl text-[#D4AF37] leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="font-['Barlow'] text-xs text-white/40 tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK INQUIRY ── */}
      <section id="inquiry" className="py-24 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Get Started</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Inquire<br />
                <span className="text-[#D4AF37]">Today</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Tell us what you're looking for. Our concierge team will respond within 24 hours with available options.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#D4AF37]" />
                  <div>
                    <p className="text-white/70 font-['Barlow'] text-sm">Call or Text</p>
                    <p className="font-['Barlow_Condensed'] font-bold text-white">+1 (800) EASTAUTOS</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-[#D4AF37]" />
                  <div>
                    <p className="text-white/70 font-['Barlow'] text-sm">WhatsApp</p>
                    <p className="font-['Barlow_Condensed'] font-bold text-white">Message us directly</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <InquiryForm
                title="Quick Inquiry"
                subtitle="Response within 24 hours."
                serviceOptions={["Rent a Vehicle", "Purchase Inquiry", "Sell / Trade-In", "Other"]}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

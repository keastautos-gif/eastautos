/* ============================================================
   EASTAUTOS — Home Page
   Midnight Drive: cinematic hero, 3 service pillars, stats,
   testimonials, and lead capture form
   ============================================================ */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import {
  Car, Key, ArrowRightLeft, UserCheck, Camera, Phone,
  ChevronRight, ArrowRight, Star, Shield, Clock, Award
} from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-main-3B8iiKNWwXHXND7j8ZHrRJ.webp";
const RENTALS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-rentals-gyjcZpNHvpKt2eUFsZr34P.webp";
const SALES_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-sales-HaZpNAwDWEqnXwSiDkrfi9.webp";
const CHAUFFEUR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-chauffeur-j55ZWXLRn3gNqrZibTcnv7.webp";
const PHOTOSHOOT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-photoshoot-JKZ5se86WZnAk8ynHTTtcG.webp";

const services = [
  {
    icon: Key,
    label: "Rent a Car",
    headline: "Drive the Dream",
    description: "Access our exclusive fleet of supercars, luxury sedans, and premium SUVs. Daily, weekly, or monthly — on your terms.",
    cta: "Book Now",
    href: "/rentals",
    img: RENTALS_IMG,
    number: "01",
  },
  {
    icon: Car,
    label: "Buy a Car",
    headline: "Own the Extraordinary",
    description: "Browse our curated selection of pre-owned and new luxury vehicles. Every car is inspected, verified, and ready to deliver.",
    cta: "View Inventory",
    href: "/buy",
    img: SALES_IMG,
    number: "02",
  },
  {
    icon: ArrowRightLeft,
    label: "Sell / Trade",
    headline: "Your Car, Top Dollar",
    description: "Get a competitive offer for your vehicle in 24 hours. Trade up or cash out — we make the process seamless.",
    cta: "Get Your Offer",
    href: "/sell",
    img: CHAUFFEUR_IMG,
    number: "03",
  },
];

const stats = [
  { value: "500+", label: "Vehicles Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24h", label: "Response Time" },
  { value: "10+", label: "Years of Excellence" },
];

const additionalServices = [
  {
    icon: UserCheck,
    label: "Chauffeur Services",
    description: "Professional, discreet chauffeurs for corporate events, airport transfers, and special occasions.",
    href: "/chauffeur",
  },
  {
    icon: Camera,
    label: "Automotive Photoshoots",
    description: "Studio and location shoots for your personal vehicle, dealership, or social media content.",
    href: "/photoshoots",
  },
  {
    icon: Phone,
    label: "Concierge Contact",
    description: "Speak directly with our team for bespoke automotive solutions tailored to your lifestyle.",
    href: "/contact",
  },
];

const testimonials = [
  {
    name: "Marcus T.",
    role: "CEO, Tech Ventures",
    text: "Eastautos delivered a Lamborghini Urus to my hotel in under 2 hours. The entire experience was flawless — from booking to drop-off.",
    stars: 5,
  },
  {
    name: "Sophia R.",
    role: "Luxury Lifestyle Blogger",
    text: "I've used them for three photoshoots now. The cars are immaculate, the team is professional, and the results speak for themselves.",
    stars: 5,
  },
  {
    name: "David K.",
    role: "Real Estate Developer",
    text: "Sold my Porsche 911 through Eastautos. Got 15% more than any other offer. The process took less than a week.",
    stars: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end pb-20 lg:pb-32 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />

        {/* Ticker tape */}
        <div className="absolute top-1/3 left-0 right-0 overflow-hidden py-3 border-y border-[#D4AF37]/20 rotate-[-1deg] scale-105">
          <div className="ticker-track">
            {Array(6).fill(null).map((_, i) => (
              <span key={i} className="font-['Barlow_Condensed'] font-black text-[#D4AF37]/10 text-6xl tracking-[0.3em] uppercase mr-16 whitespace-nowrap">
                EASTAUTOS &nbsp; LUXURY AUTOMOTIVE &nbsp; DRIVE THE DREAM &nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="section-label animate-fade-up-delay-1 mb-4">
              Premium Automotive Experience
            </p>
            <h1 className="display-xl text-white animate-fade-up-delay-2"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
              Drive.<br />
              <span className="text-[#D4AF37]">Own.</span><br />
              Elevate.
            </h1>
            <p className="text-white/60 font-['Barlow'] text-base lg:text-lg mt-6 mb-10 max-w-xl leading-relaxed animate-fade-up-delay-3">
              Eastautos is your gateway to the world's finest vehicles. Rent, buy, sell, or trade — we deliver luxury without compromise.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up-delay-4">
              <Link href="/rentals">
                <button className="btn-gold flex items-center gap-2 text-sm px-7 py-3.5">
                  Book Now <ArrowRight size={14} />
                </button>
              </Link>
              <Link href="/buy">
                <button className="btn-outline-white flex items-center gap-2 text-sm px-7 py-3.5">
                  View Inventory <ChevronRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 lg:right-12 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#D4AF37]" />
          <span className="font-['Barlow_Condensed'] text-xs tracking-[0.3em] uppercase text-[#D4AF37] rotate-90 mt-2">Scroll</span>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-[#D4AF37] py-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-black/20">
            <div className="text-center lg:px-8">
              <div className="font-['Barlow_Condensed'] font-black text-3xl lg:text-4xl text-[#080808] leading-none">500+</div>
              <div className="font-['Barlow'] text-xs text-[#080808]/60 tracking-wider uppercase mt-1">Vehicles Delivered</div>
            </div>
            <div className="text-center lg:px-8">
              <div className="font-['Barlow_Condensed'] font-black text-3xl lg:text-4xl text-[#080808] leading-none">98%</div>
              <div className="font-['Barlow'] text-xs text-[#080808]/60 tracking-wider uppercase mt-1">Client Satisfaction</div>
            </div>
            <div className="text-center lg:px-8">
              <div className="font-['Barlow_Condensed'] font-black text-3xl lg:text-4xl text-[#080808] leading-none">24h</div>
              <div className="font-['Barlow'] text-xs text-[#080808]/60 tracking-wider uppercase mt-1">Response Time</div>
            </div>
            <div className="text-center lg:px-8">
              <div className="font-['Barlow_Condensed'] font-black text-3xl lg:text-4xl text-[#080808] leading-none">10+</div>
              <div className="font-['Barlow'] text-xs text-[#080808]/60 tracking-wider uppercase mt-1">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 SERVICE PILLARS ── */}
      <section className="py-24 lg:py-32 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-xl">
            <p className="section-label mb-3">What We Offer</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-6xl uppercase tracking-wide text-white leading-tight">
              Three Ways to<br />
              <span className="text-[#D4AF37]">Experience Luxury</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.number} className="card-hover bg-[#0e0e0e] overflow-hidden group">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={svc.img}
                    alt={svc.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 font-['Barlow_Condensed'] font-black text-5xl text-white/10 leading-none">
                    {svc.number}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <svc.icon size={16} className="text-[#D4AF37]" />
                    <span className="section-label text-xs">{svc.label}</span>
                  </div>
                  <h3 className="font-['Barlow_Condensed'] font-extrabold text-2xl lg:text-3xl uppercase text-white mb-3">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADDITIONAL SERVICES ── */}
      <section className="py-20 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="section-label mb-3">More From Eastautos</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase tracking-wide text-white">
              Beyond the Ordinary
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((svc) => (
              <Link key={svc.label} href={svc.href}>
                <div className="card-hover bg-[#0e0e0e] p-8 group h-full">
                  <div className="w-12 h-12 border border-[#D4AF37]/30 flex items-center justify-center mb-5 group-hover:border-[#D4AF37] transition-colors duration-300">
                    <svc.icon size={20} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-['Barlow_Condensed'] font-bold text-xl uppercase tracking-wide text-white mb-3">
                    {svc.label}
                  </h3>
                  <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-5">
                    {svc.description}
                  </p>
                  <span className="text-[#D4AF37] font-['Barlow_Condensed'] text-sm tracking-[0.15em] uppercase flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200">
                    Learn More <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EASTAUTOS ── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: image */}
            <div className="relative">
              <div className="relative overflow-hidden" style={{ clipPath: "polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)" }}>
                <img
                  src={PHOTOSHOOT_IMG}
                  alt="Eastautos excellence"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent" />
              </div>
              {/* Gold accent box */}
              <div className="absolute -bottom-6 -right-6 bg-[#D4AF37] p-6 w-32 h-32 flex flex-col items-center justify-center">
                <span className="font-['Barlow_Condensed'] font-black text-3xl text-[#080808] leading-none">10+</span>
                <span className="font-['Barlow'] text-xs text-[#080808]/70 tracking-wider uppercase mt-1 text-center">Years of Trust</span>
              </div>
            </div>

            {/* Right: content */}
            <div>
              <p className="section-label mb-4">Why Choose Us</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase tracking-wide text-white mb-6 leading-tight">
                The Eastautos<br />
                <span className="text-[#D4AF37]">Difference</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-base leading-relaxed mb-10">
                We don't just sell or rent cars — we curate experiences. Every vehicle in our collection is hand-selected, meticulously maintained, and delivered with white-glove service.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Shield, title: "Verified & Inspected", desc: "Every vehicle undergoes a 150-point inspection before it reaches you." },
                  { icon: Clock, title: "24-Hour Availability", desc: "Our concierge team is available around the clock for urgent requests." },
                  { icon: Award, title: "Premium Fleet Only", desc: "We exclusively work with luxury and exotic vehicles — no compromises." },
                  { icon: Star, title: "White Glove Delivery", desc: "We deliver to your door, hotel, or preferred location." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={16} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-['Barlow_Condensed'] font-bold text-base uppercase tracking-wide text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-white/40 font-['Barlow'] text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="section-label mb-3">Client Stories</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase tracking-wide text-white">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#0e0e0e] border border-[#1a1a1a] p-8">
                <div className="flex gap-1 mb-4">
                  {Array(t.stars).fill(null).map((_, j) => (
                    <Star key={j} size={12} className="text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-white/60 font-['Barlow'] text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="border-t border-[#1a1a1a] pt-4">
                  <p className="font-['Barlow_Condensed'] font-bold text-sm uppercase tracking-wide text-white">{t.name}</p>
                  <p className="text-white/30 font-['Barlow'] text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY SECTION ── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: CTA copy */}
            <div>
              <p className="section-label mb-4">Ready to Begin?</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-6xl uppercase tracking-wide text-white leading-tight mb-6">
                Your Next<br />
                <span className="text-[#D4AF37]">Luxury Drive</span><br />
                Awaits.
              </h2>
              <p className="text-white/50 font-['Barlow'] text-base leading-relaxed mb-8">
                Whether you're looking to rent for a weekend, purchase your dream car, or get top dollar for your current vehicle — Eastautos is ready.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#D4AF37]" />
                  <span className="text-white/60 font-['Barlow'] text-sm">Response within 24 hours, guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#D4AF37]" />
                  <span className="text-white/60 font-['Barlow'] text-sm">No obligation — just a conversation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#D4AF37]" />
                  <span className="text-white/60 font-['Barlow'] text-sm">Fully confidential and discreet</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

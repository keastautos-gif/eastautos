/* ============================================================
   EASTAUTOS — Rentals Page (Refined)
   Access-first: Limited featured fleet, inquiry-focused,
   direct contact prioritization
   ============================================================ */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { Phone, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-rentals-gyjcZpNHvpKt2eUFsZr34P.webp";

const featuredFleet = [
  {
    name: "Corvette C8 E-Ray",
    type: "American Supercar",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/IMG_0341_f74bbf19.WEBP",
    badge: "Available",
  },
  {
    name: "Ferrari Roma",
    type: "Sports Car",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/IMG_0462_5b55d064.WEBP",
    badge: "Available",
  },
  {
    name: "Lamborghini Huracán EVO",
    type: "Exotic Supercar",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
    badge: "Available",
  },
  {
    name: "Rolls-Royce Ghost",
    type: "Ultra Luxury Sedan",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80",
    badge: "Available",
  },
];

export default function Rentals() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section className="relative h-[55vh] min-h-[350px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="section-label mb-3">Premium Rentals</p>
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Rent a Luxury<br />Vehicle
          </h1>
          <p className="text-white/60 font-['Barlow'] text-sm mt-3 max-w-lg">
            Exclusive access to supercars, luxury sedans, and premium SUVs. Limited availability. By appointment only.
          </p>
        </div>
      </section>

      {/* ── FEATURED FLEET ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Featured Vehicles</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white">
              Currently Available
            </h2>
            <p className="text-white/40 font-['Barlow'] text-sm mt-3">Vehicles change frequently. Additional inventory available upon request.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredFleet.map((car) => (
              <div key={car.name} className="card-hover bg-[#0e0e0e] overflow-hidden group">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
                  <span className="absolute top-2 right-2 bg-[#D4AF37] text-[#080808] font-['Barlow_Condensed'] font-bold text-[8px] tracking-widest uppercase px-2 py-1">
                    {car.badge}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase mb-1">{car.type}</p>
                  <h4 className="font-['Barlow_Condensed'] font-bold text-sm uppercase text-white mb-3">{car.name}</h4>
                  <a href="#inquiry">
                    <button className="btn-gold text-xs px-3 py-2 flex items-center gap-1.5 w-full justify-center">
                      Get Access <ArrowRight size={10} />
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/40 font-['Barlow'] text-sm mb-4">Don't see what you need?</p>
            <a href="#inquiry">
              <button className="btn-outline-gold text-sm px-8 py-3">
                Request a Specific Vehicle
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY RENT WITH US ── */}
      <section className="py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Flexible Pickup", desc: "We deliver to your hotel, home, or event." },
              { title: "Insurance Included", desc: "Comprehensive coverage on every rental." },
              { title: "24/7 Support", desc: "Roadside assistance & concierge available." },
              { title: "No Hidden Fees", desc: "Transparent pricing, guaranteed." },
            ].map((item) => (
              <div key={item.title}>
                <h4 className="font-['Barlow_Condensed'] font-bold text-sm uppercase tracking-wide text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-white/40 font-['Barlow'] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK INQUIRY ── */}
      <section id="inquiry" className="py-24 bg-[#080808] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Book Your Rental</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Get Access<br />
                <span className="text-[#D4AF37]">Today</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Tell us your preferred vehicle, dates, and location. Our team will confirm availability and arrange delivery within 24 hours.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Flexible pickup & delivery",
                  "Comprehensive insurance",
                  "24/7 roadside assistance",
                  "No hidden fees",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/50 font-['Barlow'] text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+19293866103">
                  <button className="btn-gold text-sm px-6 py-3 flex items-center gap-2">
                    <Phone size={14} /> Call Now
                  </button>
                </a>
                <a href="https://wa.me/19293866103" target="_blank" rel="noopener noreferrer">
                  <button className="btn-outline-white text-sm px-6 py-3 flex items-center gap-2">
                    <MessageCircle size={14} /> Text Now
                  </button>
                </a>
              </div>
            </div>
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <InquiryForm
                title="Rental Inquiry"
                subtitle="We'll confirm availability within 2 hours."
                serviceOptions={["Daily Rental", "Weekend Package", "Weekly Rental", "Monthly Rental", "Special Event"]}
                defaultService="Daily Rental"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

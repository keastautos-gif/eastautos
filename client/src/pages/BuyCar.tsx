/* ============================================================
   EASTAUTOS — Buy a Car Page (Refined)
   Access-first: Limited featured inventory, inquiry-focused,
   off-market access positioning
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { Phone, MessageCircle, ArrowRight, CheckCircle, Lock } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-sales-HaZpNAwDWEqnXwSiDkrfi9.webp";

const featuredCars = [
  {
    name: "Lamborghini Huracán EVO",
    year: "2023",
    price: "Contact for pricing",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
    badge: "Featured",
  },
  {
    name: "Mercedes-AMG S580",
    year: "2023",
    price: "Contact for pricing",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    badge: "Available",
  },
  {
    name: "Rolls-Royce Ghost",
    year: "2023",
    price: "Contact for pricing",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80",
    badge: "Featured",
  },
  {
    name: "BMW M5 Competition",
    year: "2022",
    price: "Contact for pricing",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    badge: "Available",
  },
];

export default function BuyCar() {
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
          <p className="section-label mb-3">Curated Inventory</p>
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Buy a Luxury<br />Vehicle
          </h1>
          <p className="text-white/60 font-['Barlow'] text-sm mt-3 max-w-lg">
            Hand-selected vehicles. Full inspection & documentation. Additional inventory available through our network.
          </p>
        </div>
      </section>

      {/* ── FEATURED INVENTORY ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Featured Vehicles</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white">
              Available Now
            </h2>
            <p className="text-white/40 font-['Barlow'] text-sm mt-3">Limited selection shown. More vehicles available upon request.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredCars.map((car) => (
              <div key={car.name} className="card-hover bg-[#0e0e0e] overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
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
                  <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase mb-1">{car.year}</p>
                  <h4 className="font-['Barlow_Condensed'] font-bold text-sm uppercase text-white mb-2">{car.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="font-['Barlow_Condensed'] font-bold text-[#D4AF37] text-sm">{car.price}</span>
                    <a href="#inquiry">
                      <button className="btn-gold text-xs px-3 py-2">
                        Inquire
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/40 font-['Barlow'] text-sm mb-4">Looking for something specific?</p>
            <a href="#inquiry">
              <button className="btn-outline-gold text-sm px-8 py-3">
                Request a Specific Vehicle
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── OFF-MARKET ACCESS ── */}
      <section className="py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8">
            <div className="flex items-start gap-4">
              <Lock size={20} className="text-[#D4AF37] shrink-0 mt-1" />
              <div>
                <h3 className="font-['Barlow_Condensed'] font-bold text-lg uppercase text-white mb-2">
                  Access Off-Market Inventory
                </h3>
                <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed">
                  Not all vehicles are listed online. We maintain an exclusive network of luxury and exotic vehicles available by appointment. Submit an inquiry to explore additional options tailored to your needs and budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUYING PROCESS ── */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="section-label mb-3">Simple Process</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-3xl uppercase text-white">
              How to Purchase
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Inquire", desc: "Tell us what you're looking for." },
              { step: "02", title: "Review", desc: "Get full documentation & history." },
              { step: "03", title: "Inspect", desc: "Private viewing at your convenience." },
              { step: "04", title: "Purchase", desc: "Complete paperwork & delivery." },
            ].map((item) => (
              <div key={item.step}>
                <span className="font-['Barlow_Condensed'] font-black text-4xl text-[#D4AF37]/20 leading-none">{item.step}</span>
                <h4 className="font-['Barlow_Condensed'] font-bold text-base uppercase text-white mt-2 mb-1">{item.title}</h4>
                <p className="text-white/40 font-['Barlow'] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK INQUIRY ── */}
      <section id="inquiry" className="py-24 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Ready to Buy?</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Start Your<br />
                <span className="text-[#D4AF37]">Search</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Submit an inquiry with your preferences. Our team will respond within 24 hours with available options, including off-market inventory.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Full vehicle history & Carfax",
                  "150-point inspection",
                  "Financing available",
                  "Nationwide delivery",
                  "Trade-in accepted",
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
                title="Purchase Inquiry"
                subtitle="Response within 24 hours."
                serviceOptions={["Specific Vehicle", "General Inquiry", "Custom Request", "Financing Question", "Trade-In + Purchase"]}
                defaultService="Specific Vehicle"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

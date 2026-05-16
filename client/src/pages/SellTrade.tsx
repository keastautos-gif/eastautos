/* ============================================================
   EASTAUTOS — Sell / Trade-In Page (Refined)
   Access-first: Quick valuation, inquiry-focused,
   urgency and exclusivity messaging
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { Phone, MessageCircle, CheckCircle, DollarSign, Clock, FileText } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-rentals-gyjcZpNHvpKt2eUFsZr34P.webp";

export default function SellTrade() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section className="relative h-[55vh] min-h-[350px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-[center_40%]"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="section-label mb-3">Vehicle Valuation</p>
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Sell or<br />Trade-In
          </h1>
          <p className="text-white/60 font-['Barlow'] text-sm mt-3 max-w-lg">
            Get a competitive cash offer in 24 hours. No haggling. No lowballing. Fair market value guaranteed.
          </p>
        </div>
      </section>

      {/* ── QUICK PROCESS ── */}
      <section className="py-16 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, step: "01", title: "Submit Details", desc: "Tell us about your vehicle." },
              { icon: DollarSign, step: "02", title: "Get Valuation", desc: "Competitive offer in 24h." },
              { icon: CheckCircle, step: "03", title: "Accept Offer", desc: "No obligation to sell." },
              { icon: Clock, step: "04", title: "Get Paid", desc: "Payment within 48 hours." },
            ].map((item) => (
              <div key={item.step}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-['Barlow_Condensed'] font-black text-3xl text-[#D4AF37]/20">{item.step}</span>
                  <item.icon size={16} className="text-[#D4AF37]" />
                </div>
                <h4 className="font-['Barlow_Condensed'] font-bold text-base uppercase text-white mb-1">{item.title}</h4>
                <p className="text-white/40 font-['Barlow'] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SELL WITH US ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">Why Eastautos?</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Top Dollar<br />
                <span className="text-[#D4AF37]">Guaranteed</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                We consistently offer 10–20% above typical dealer trade-in prices. Our offers are data-driven, transparent, and final.
              </p>
              <div className="space-y-4">
                {[
                  "Top market value",
                  "No haggling or negotiation",
                  "Any condition accepted",
                  "Fast & secure process",
                  "Payment within 48 hours",
                  "We handle all paperwork",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/50 font-['Barlow'] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accepted Brands */}
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8">
              <p className="section-label mb-3">We Buy</p>
              <h3 className="font-['Barlow_Condensed'] font-extrabold text-2xl uppercase text-white mb-6">
                All Luxury Brands
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "Lamborghini", "Ferrari", "Porsche", "Bentley", "Rolls-Royce",
                  "McLaren", "Aston Martin", "Maserati", "Mercedes-AMG", "BMW M",
                ].map((brand) => (
                  <span key={brand} className="bg-[#151515] border border-[#2a2a2a] text-white/60 font-['Barlow_Condensed'] text-xs tracking-[0.1em] uppercase px-3 py-1.5">
                    {brand}
                  </span>
                ))}
              </div>
              <p className="text-white/30 font-['Barlow'] text-xs">
                Not listed? We evaluate all luxury vehicles. Contact us for a custom valuation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK INQUIRY ── */}
      <section id="inquiry" className="py-24 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Get Your Offer</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                What's Your<br />
                <span className="text-[#D4AF37]">Car Worth?</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Submit your vehicle details. We'll provide a competitive, no-obligation offer within 24 hours. Trade up or cash out — your choice.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Free valuation",
                  "No obligation",
                  "Competitive offer",
                  "Trade-in credit available",
                  "Payment within 48 hours",
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
                title="Get Your Valuation"
                subtitle="Free valuation within 24 hours. We'll contact you with your offer and next steps."
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

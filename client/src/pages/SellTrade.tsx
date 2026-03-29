/* ============================================================
   EASTAUTOS — Sell / Trade-In Page
   Midnight Drive: vehicle valuation + trade-in inquiry
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { ArrowRight, CheckCircle, DollarSign, Clock, Handshake, TrendingUp, FileText } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-rentals-gyjcZpNHvpKt2eUFsZr34P.webp";

const process = [
  {
    icon: FileText,
    step: "01",
    title: "Submit Your Details",
    desc: "Fill out the form below with your vehicle's make, model, year, and mileage.",
  },
  {
    icon: TrendingUp,
    step: "02",
    title: "Get Your Valuation",
    desc: "Our experts assess your vehicle against current market data within 24 hours.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Accept the Offer",
    desc: "Review your competitive cash offer or trade-in credit — no obligation.",
  },
  {
    icon: DollarSign,
    step: "04",
    title: "Get Paid Fast",
    desc: "Once accepted, we handle all paperwork and payment within 48 hours.",
  },
];

const whySell = [
  { title: "Top Market Value", desc: "We consistently offer 10–20% above typical dealer trade-in prices." },
  { title: "No Haggling", desc: "Our offers are transparent, data-driven, and final. No back-and-forth." },
  { title: "Any Condition", desc: "We buy luxury vehicles regardless of mileage or minor cosmetic issues." },
  { title: "Fast & Secure", desc: "Funds transferred within 48 hours of acceptance. Fully insured process." },
];

const acceptedBrands = [
  "Lamborghini", "Ferrari", "Porsche", "Bentley", "Rolls-Royce",
  "McLaren", "Aston Martin", "Bugatti", "Maserati", "Mercedes-AMG",
  "BMW M Series", "Audi RS", "Range Rover", "Lexus LC", "Cadillac CT5-V",
];



export default function SellTrade() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-[center_40%]"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="section-label mb-3 animate-fade-up-delay-1">Vehicle Valuation</p>
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none animate-fade-up-delay-2"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
            Sell or<br />Trade-In
          </h1>
          <p className="text-white/60 font-['Barlow'] text-base mt-3 max-w-lg animate-fade-up-delay-3">
            Get a competitive cash offer for your luxury vehicle within 24 hours. No hassle, no lowballing.
          </p>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="py-16 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step) => (
              <div key={step.step} className="flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-['Barlow_Condensed'] font-black text-4xl text-[#D4AF37]/20 leading-none">{step.step}</span>
                  <div className="w-8 h-8 border border-[#D4AF37]/30 flex items-center justify-center">
                    <step.icon size={14} className="text-[#D4AF37]" />
                  </div>
                </div>
                <h3 className="font-['Barlow_Condensed'] font-bold text-base uppercase tracking-wide text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/40 font-['Barlow'] text-sm leading-relaxed">{step.desc}</p>
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
              <p className="section-label mb-4">Our Promise</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Why Sell Through<br />
                <span className="text-[#D4AF37]">Eastautos?</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                We've built our reputation on fair, transparent transactions. Our buyers are serious, our process is fast, and our offers are real.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whySell.map((item) => (
                  <div key={item.title} className="bg-[#0e0e0e] border border-[#1a1a1a] p-5">
                    <h4 className="font-['Barlow_Condensed'] font-bold text-sm uppercase tracking-wide text-[#D4AF37] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-white/40 font-['Barlow'] text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accepted brands */}
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8">
              <p className="section-label mb-4">Accepted Brands</p>
              <h3 className="font-['Barlow_Condensed'] font-extrabold text-2xl uppercase text-white mb-6">
                We Buy These Brands
              </h3>
              <div className="flex flex-wrap gap-2">
                {acceptedBrands.map((brand) => (
                  <span key={brand} className="bg-[#151515] border border-[#2a2a2a] text-white/60 font-['Barlow_Condensed'] text-xs tracking-[0.1em] uppercase px-3 py-1.5">
                    {brand}
                  </span>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-[#1a1a1a]">
                <p className="text-white/30 font-['Barlow'] text-xs">
                  Don't see your brand? We consider all luxury and exotic vehicles. Contact us for a custom evaluation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
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
                Submit your vehicle details and we'll provide a competitive, no-obligation cash offer within 24 hours. Trade up or cash out — your choice.
              </p>
              <div className="space-y-3">
                {[
                  "No obligation — free valuation",
                  "Competitive cash offers",
                  "Trade-in credit available",
                  "We handle all paperwork",
                  "Payment within 48 hours",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/50 font-['Barlow'] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <InquiryForm
                title="Get Your Valuation"
                subtitle="Free, no-obligation offer within 24 hours."
                serviceOptions={["Sell My Car (Cash)", "Trade-In for Another Vehicle", "Trade-In + Rental", "Consignment Sale"]}
                defaultService="Sell My Car (Cash)"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

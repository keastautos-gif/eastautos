/* ============================================================
   EASTAUTOS — Rentals Page
   Midnight Drive: fleet showcase + booking inquiry form
   ============================================================ */
import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { ArrowRight, Fuel, Users, Gauge, Calendar, CheckCircle } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-rentals-gyjcZpNHvpKt2eUFsZr34P.webp";

const fleet = [
  {
    name: "Lamborghini Urus",
    category: "Super SUV",
    price: "From $1,200/day",
    specs: { seats: 5, fuel: "V8 Twin-Turbo", speed: "305 km/h" },
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    tags: ["Most Popular", "AWD"],
  },
  {
    name: "Porsche 911 Turbo S",
    category: "Sports Car",
    price: "From $900/day",
    specs: { seats: 2, fuel: "Flat-6 Turbo", speed: "330 km/h" },
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    tags: ["Track Ready"],
  },
  {
    name: "Rolls-Royce Ghost",
    category: "Ultra Luxury Sedan",
    price: "From $2,500/day",
    specs: { seats: 5, fuel: "V12 Twin-Turbo", speed: "250 km/h" },
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
    tags: ["Chauffeur Ready"],
  },
  {
    name: "Bentley Continental GT",
    category: "Grand Tourer",
    price: "From $1,400/day",
    specs: { seats: 4, fuel: "W12 Twin-Turbo", speed: "333 km/h" },
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    tags: ["Weekend Special"],
  },
  {
    name: "Ferrari 488 Spider",
    category: "Supercar",
    price: "From $1,800/day",
    specs: { seats: 2, fuel: "V8 Twin-Turbo", speed: "325 km/h" },
    img: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
    tags: ["Open Top"],
  },
  {
    name: "Range Rover SV",
    category: "Luxury SUV",
    price: "From $800/day",
    specs: { seats: 5, fuel: "V8 Supercharged", speed: "250 km/h" },
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    tags: ["Family Friendly", "AWD"],
  },
];

const howItWorks = [
  { step: "01", title: "Choose Your Vehicle", desc: "Browse our fleet and select the car that fits your occasion." },
  { step: "02", title: "Submit Your Inquiry", desc: "Fill out the form below with your dates and preferences." },
  { step: "03", title: "Confirm & Pay", desc: "Our team will confirm availability and secure your booking." },
  { step: "04", title: "We Deliver to You", desc: "Your car arrives at your location, hotel, or our showroom." },
];

export default function Rentals() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Sports Car", "Super SUV", "Luxury Sedan", "Grand Tourer"];

  const filtered = activeFilter === "All"
    ? fleet
    : fleet.filter((car) => car.category.includes(activeFilter));

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="section-label mb-3 animate-fade-up-delay-1">Eastautos Fleet</p>
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none animate-fade-up-delay-2"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
            Rent a Car
          </h1>
          <p className="text-white/60 font-['Barlow'] text-base mt-3 max-w-lg animate-fade-up-delay-3">
            Access our exclusive fleet of supercars, luxury sedans, and premium SUVs. Daily, weekly, or monthly rentals available.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.step} className="flex flex-col">
                <span className="font-['Barlow_Condensed'] font-black text-5xl text-[#D4AF37]/20 leading-none mb-3">
                  {step.step}
                </span>
                <h3 className="font-['Barlow_Condensed'] font-bold text-base uppercase tracking-wide text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/40 font-['Barlow'] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEET GRID ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div>
              <p className="section-label mb-2">Available Now</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-3xl lg:text-4xl uppercase text-white">
                Our Fleet
              </h2>
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-200 ${
                    activeFilter === f
                      ? "bg-[#D4AF37] text-[#080808] border-[#D4AF37]"
                      : "bg-transparent text-white/50 border-[#2a2a2a] hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car) => (
              <div key={car.name} className="card-hover bg-[#0e0e0e] overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {car.tags.map((tag) => (
                      <span key={tag} className="bg-[#D4AF37] text-[#080808] font-['Barlow_Condensed'] font-bold text-[10px] tracking-widest uppercase px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase mb-1">{car.category}</p>
                  <h3 className="font-['Barlow_Condensed'] font-extrabold text-xl uppercase text-white mb-4">{car.name}</h3>
                  <div className="flex gap-4 mb-5">
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Users size={12} />
                      <span className="font-['Barlow'] text-xs">{car.specs.seats} seats</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Fuel size={12} />
                      <span className="font-['Barlow'] text-xs">{car.specs.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Gauge size={12} />
                      <span className="font-['Barlow'] text-xs">{car.specs.speed}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-['Barlow_Condensed'] font-bold text-lg text-[#D4AF37]">{car.price}</span>
                    <a href="#inquiry">
                      <button className="btn-gold text-xs px-4 py-2 flex items-center gap-1.5">
                        Book Now <ArrowRight size={11} />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquiry" className="py-24 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Ready to Book?</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Book Your<br />
                <span className="text-[#D4AF37]">Rental Today</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Tell us your preferred vehicle, dates, and pickup location. Our team will confirm availability and send you a personalized quote within hours.
              </p>
              <div className="space-y-3">
                {["Flexible pickup & delivery", "Comprehensive insurance included", "24/7 roadside assistance", "No hidden fees"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/50 font-['Barlow'] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <InquiryForm
                title="Book a Rental"
                subtitle="We'll confirm availability within 2 hours."
                serviceOptions={["Daily Rental", "Weekend Package", "Weekly Rental", "Monthly Rental", "Event Rental"]}
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

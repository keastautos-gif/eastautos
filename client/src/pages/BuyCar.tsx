/* ============================================================
   EASTAUTOS — Buy a Car Page
   Midnight Drive: inventory showcase + purchase inquiry
   ============================================================ */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { ArrowRight, CheckCircle, Shield, FileText, Wrench, TrendingUp } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-sales-HaZpNAwDWEqnXwSiDkrfi9.webp";

const inventory = [
  {
    name: "Lamborghini Huracán EVO",
    year: "2023",
    price: "$285,000",
    mileage: "4,200 mi",
    color: "Giallo Belenus",
    status: "Available",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    badge: "New Arrival",
  },
  {
    name: "Porsche 911 GT3 RS",
    year: "2022",
    price: "$220,000",
    mileage: "8,100 mi",
    color: "Guards Red",
    status: "Available",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    badge: "Certified",
  },
  {
    name: "Rolls-Royce Cullinan",
    year: "2023",
    price: "$380,000",
    mileage: "2,800 mi",
    color: "Black Diamond",
    status: "Available",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
    badge: "Featured",
  },
  {
    name: "Ferrari SF90 Stradale",
    year: "2022",
    price: "$520,000",
    mileage: "1,200 mi",
    color: "Rosso Corsa",
    status: "Reserved",
    img: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
    badge: "Rare Find",
  },
  {
    name: "Bentley Bentayga Speed",
    year: "2023",
    price: "$245,000",
    mileage: "5,600 mi",
    color: "Onyx Black",
    status: "Available",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    badge: "Certified",
  },
  {
    name: "McLaren 720S Spider",
    year: "2021",
    price: "$310,000",
    mileage: "9,400 mi",
    color: "Papaya Spark",
    status: "Available",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    badge: null,
  },
];

const buyingProcess = [
  { icon: FileText, title: "Browse & Select", desc: "Explore our curated inventory and shortlist your favorites." },
  { icon: Shield, title: "Vehicle History", desc: "Receive a full Carfax report and inspection certificate." },
  { icon: Wrench, title: "Test & Inspect", desc: "Schedule a private viewing or test drive at your convenience." },
  { icon: TrendingUp, title: "Secure & Deliver", desc: "Complete paperwork and we deliver to your door." },
];

export default function BuyCar() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Available", "Reserved"];

  const filtered = activeFilter === "All"
    ? inventory
    : inventory.filter((car) => car.status === activeFilter);

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
          <p className="section-label mb-3 animate-fade-up-delay-1">Curated Inventory</p>
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none animate-fade-up-delay-2"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
            Buy a Car
          </h1>
          <p className="text-white/60 font-['Barlow'] text-base mt-3 max-w-lg animate-fade-up-delay-3">
            Every vehicle is hand-selected, fully inspected, and certified. Own the extraordinary.
          </p>
        </div>
      </section>

      {/* ── BUYING PROCESS ── */}
      <section className="py-16 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {buyingProcess.map((step, i) => (
              <div key={step.title} className="flex flex-col">
                <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center mb-4">
                  <step.icon size={16} className="text-[#D4AF37]" />
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

      {/* ── INVENTORY GRID ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div>
              <p className="section-label mb-2">Current Inventory</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-3xl lg:text-4xl uppercase text-white">
                Available Vehicles
              </h2>
            </div>
            <div className="flex gap-2">
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
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
                  {car.badge && (
                    <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#080808] font-['Barlow_Condensed'] font-bold text-[10px] tracking-widest uppercase px-2 py-0.5">
                      {car.badge}
                    </span>
                  )}
                  <span className={`absolute top-3 right-3 font-['Barlow_Condensed'] font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 ${
                    car.status === "Available"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                  }`}>
                    {car.status}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.2em] uppercase mb-1">
                    {car.year} · {car.color}
                  </p>
                  <h3 className="font-['Barlow_Condensed'] font-extrabold text-xl uppercase text-white mb-3">{car.name}</h3>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-white/40 font-['Barlow'] text-xs">{car.mileage}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="text-white/40 font-['Barlow'] text-xs">Certified Pre-Owned</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-['Barlow_Condensed'] font-bold text-xl text-[#D4AF37]">{car.price}</span>
                    <a href="#inquiry">
                      <button className="btn-gold text-xs px-4 py-2 flex items-center gap-1.5">
                        Inquire Now <ArrowRight size={11} />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/30 font-['Barlow'] text-sm mb-4">Don't see what you're looking for?</p>
            <a href="#inquiry">
              <button className="btn-outline-gold text-sm px-8 py-3">
                Request a Specific Vehicle
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquiry" className="py-24 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Interested?</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Inquire About<br />
                <span className="text-[#D4AF37]">Any Vehicle</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Tell us which vehicle interests you and we'll arrange a private viewing, provide full documentation, and discuss financing options.
              </p>
              <div className="space-y-3">
                {[
                  "Full vehicle history & Carfax report",
                  "150-point inspection certificate",
                  "Financing options available",
                  "Nationwide delivery",
                  "Trade-in accepted",
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
                title="Purchase Inquiry"
                subtitle="We'll respond with full details within 24 hours."
                serviceOptions={["Specific Vehicle Inquiry", "General Inventory", "Custom Vehicle Request", "Financing Inquiry", "Trade-In + Purchase"]}
                defaultService="Specific Vehicle Inquiry"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

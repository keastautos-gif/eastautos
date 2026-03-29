/* ============================================================
   EASTAUTOS — Chauffeur Services Page
   Midnight Drive: premium chauffeur service + booking form
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { CheckCircle, Plane, Building2, Heart, Star, Clock, Shield, UserCheck } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-chauffeur-j55ZWXLRn3gNqrZibTcnv7.webp";

const occasions = [
  {
    icon: Plane,
    title: "Airport Transfers",
    desc: "Punctual, private transfers to and from all major airports. Flight tracking included.",
  },
  {
    icon: Building2,
    title: "Corporate Events",
    desc: "Professional transport for executives, board meetings, and corporate functions.",
  },
  {
    icon: Heart,
    title: "Weddings & Special Events",
    desc: "Make your special day unforgettable with our luxury wedding car service.",
  },
  {
    icon: Star,
    title: "VIP Entertainment",
    desc: "Red carpet arrivals, galas, premieres, and exclusive private events.",
  },
  {
    icon: Clock,
    title: "Hourly Hire",
    desc: "Flexible hourly bookings for shopping, dining, and city tours.",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    desc: "Discreet, NDA-signed chauffeurs for high-profile individuals.",
  },
];

const vehicles = [
  {
    name: "Mercedes-Benz S-Class",
    desc: "The pinnacle of executive comfort. Rear entertainment, massage seats, and ambient lighting.",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
  },
  {
    name: "Rolls-Royce Ghost",
    desc: "The ultimate statement of arrival. Whisper-quiet cabin, starlight headliner, and bespoke interiors.",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
  },
  {
    name: "Cadillac Escalade ESV",
    desc: "Spacious luxury SUV for group transfers. Perfect for families and executive teams.",
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
  },
];

export default function Chauffeur() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section className="relative h-[65vh] min-h-[450px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="section-label mb-3 animate-fade-up-delay-1">White Glove Service</p>
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none animate-fade-up-delay-2"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
            Chauffeur<br />Services
          </h1>
          <p className="text-white/60 font-['Barlow'] text-base mt-3 max-w-lg animate-fade-up-delay-3">
            Professional, discreet chauffeurs. Luxury vehicles. Impeccable service — every time.
          </p>
        </div>
      </section>

      {/* ── OCCASIONS ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Every Occasion</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight">
              We Drive You<br />
              <span className="text-[#D4AF37]">Everywhere</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {occasions.map((item) => (
              <div key={item.title} className="card-hover bg-[#0e0e0e] p-7 group">
                <div className="w-11 h-11 border border-[#D4AF37]/30 flex items-center justify-center mb-5 group-hover:border-[#D4AF37] transition-colors duration-300">
                  <item.icon size={18} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-['Barlow_Condensed'] font-bold text-lg uppercase tracking-wide text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/40 font-['Barlow'] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VEHICLES ── */}
      <section className="py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="section-label mb-3">Our Fleet</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-3xl lg:text-4xl uppercase text-white">
              Chauffeur Vehicles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <div key={v.name} className="card-hover bg-[#0e0e0e] overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={v.img}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-['Barlow_Condensed'] font-extrabold text-lg uppercase text-white mb-2">{v.name}</h3>
                  <p className="text-white/40 font-['Barlow'] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAUFFEUR PROMISE ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">Our Standard</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                The Eastautos<br />
                <span className="text-[#D4AF37]">Chauffeur Promise</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Our chauffeurs are professionally trained, background-checked, and committed to delivering a seamless, discreet experience. Every journey is planned to perfection.
              </p>
              <div className="space-y-4">
                {[
                  "Professionally trained & licensed chauffeurs",
                  "Real-time flight tracking for airport pickups",
                  "Meet & greet with name board service",
                  "Complimentary water & refreshments",
                  "NDA available for high-profile clients",
                  "24/7 dispatch and support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/50 font-['Barlow'] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Trips Completed" },
                { value: "100%", label: "On-Time Rate" },
                { value: "5★", label: "Average Rating" },
                { value: "24/7", label: "Availability" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 text-center">
                  <div className="font-['Barlow_Condensed'] font-black text-4xl text-[#D4AF37] leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="font-['Barlow'] text-xs text-white/40 tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquiry" className="py-24 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Book a Chauffeur</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Reserve Your<br />
                <span className="text-[#D4AF37]">Private Driver</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Tell us your occasion, date, and pickup details. We'll match you with the perfect vehicle and chauffeur.
              </p>
            </div>
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <InquiryForm
                title="Book a Chauffeur"
                subtitle="We'll confirm your booking within 2 hours."
                serviceOptions={["Airport Transfer", "Corporate Event", "Wedding / Special Event", "VIP Entertainment", "Hourly Hire", "Multi-Day Booking"]}
                defaultService="Airport Transfer"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

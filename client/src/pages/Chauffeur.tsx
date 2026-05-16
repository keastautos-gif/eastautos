/* ============================================================
   EASTAUTOS — Chauffeur Services Page
   Escalade-only: premium chauffeur service + inquiry form
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import {
  CheckCircle, Plane, Building2, Heart, Star, Clock, Shield,
  Phone, MessageCircle,
} from "lucide-react";

const ESCALADE_EXTERIOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/escalade-real-exterior_f9d8c613.jpeg";
const ESCALADE_REAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/escalade-real-rear_02428248.jpeg";
const ESCALADE_INTERIOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/escalade-real-interior_8f921264.jpeg";

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
    desc: "Make your special day unforgettable with our luxury chauffeur service.",
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

export default function Chauffeur() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section className="relative h-[55vh] min-h-[350px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ESCALADE_EXTERIOR})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="section-label mb-3">White Glove Service</p>
          <h1
            className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Chauffeur<br />Services
          </h1>
          <p className="text-white/60 font-['Barlow'] text-sm mt-3 max-w-lg">
            Professional, discreet chauffeurs. Cadillac Escalade. Impeccable service — every time.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 bg-[#D4AF37] px-5 py-2.5">
            <span className="font-['Barlow_Condensed'] font-black text-[#080808] text-sm sm:text-base tracking-wide uppercase">Limited Offer:</span>
            <span className="font-['Barlow_Condensed'] font-bold text-[#080808] text-sm sm:text-base tracking-wide uppercase">Book 3 Hours, Get the 4th Hour Free</span>
            <span className="font-['Barlow'] font-normal text-[#080808]/70 text-xs sm:text-sm">— First-time clients only</span>
          </div>
        </div>
      </section>

      {/* ── THE ESCALADE ── */}
      <section className="py-20 lg:py-24 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative overflow-hidden">
                <img
                  src={ESCALADE_EXTERIOR}
                  alt="Cadillac Escalade ESV — Exterior"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/10 to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden">
                  <img
                    src={ESCALADE_INTERIOR}
                    alt="Cadillac Escalade ESV — Interior"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src={ESCALADE_REAR}
                    alt="Cadillac Escalade ESV — Rear"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="section-label mb-3">Our Vehicle</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-4">
                Cadillac<br />
                <span className="text-[#D4AF37]">Escalade ESV</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-6">
                Our chauffeur fleet is built around the Cadillac Escalade ESV — the definitive luxury SUV for professional transport. Spacious, commanding, and equipped with every comfort for executives, families, and VIP clients.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Spacious cabin for up to 7 passengers",
                  "Premium leather interior with climate control",
                  "Tinted privacy glass throughout",
                  "Complimentary water & refreshments",
                  "USB charging & Wi-Fi available",
                  "Professional, uniformed chauffeur",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/50 font-['Barlow'] text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#inquiry">
                  <button className="btn-gold text-sm px-7 py-3 flex items-center gap-2">
                    Book Now
                  </button>
                </a>
                <a href="https://wa.me/19293866103" target="_blank" rel="noopener noreferrer">
                  <button className="btn-outline-white text-sm px-7 py-3 flex items-center gap-2">
                    <MessageCircle size={14} /> Text Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OCCASIONS ── */}
      <section className="py-20 bg-[#0a0a0a] border-t border-[#1a1a1a]">
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
                Tell us your occasion, date, and pickup details. We'll confirm your Escalade and chauffeur within 2 hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#D4AF37]" />
                  <div>
                    <p className="text-white/70 font-['Barlow'] text-sm">Call or Text</p>
                    <a href="tel:+19293866103" className="font-['Barlow_Condensed'] font-bold text-white hover:text-[#D4AF37] transition-colors">
                      (929) 386-6103
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-[#D4AF37]" />
                  <div>
                    <p className="text-white/70 font-['Barlow'] text-sm">WhatsApp</p>
                    <a href="https://wa.me/19293866103" target="_blank" rel="noopener noreferrer" className="font-['Barlow_Condensed'] font-bold text-white hover:text-[#D4AF37] transition-colors">
                      Message Us Directly
                    </a>
                  </div>
                </div>
              </div>
            </div>
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

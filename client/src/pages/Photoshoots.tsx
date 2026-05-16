/* ============================================================
   EASTAUTOS — Photoshoots Page
   Midnight Drive: automotive photography service + booking
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { CheckCircle, Camera, MapPin, Clock, Image, Film, Instagram } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-photoshoot-JKZ5se86WZnAk8ynHTTtcG.webp";

const packages = [
  {
    name: "Essential",
    price: "$499",
    duration: "2 hours",
    deliverables: "30 edited photos",
    features: [
      "1 location",
      "1 vehicle",
      "30 professionally edited images",
      "Online gallery delivery",
      "Commercial usage rights",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "$999",
    duration: "4 hours",
    deliverables: "75 edited photos + 1 video reel",
    features: [
      "2 locations",
      "Up to 2 vehicles",
      "75 professionally edited images",
      "1 short cinematic video reel",
      "Online gallery delivery",
      "Commercial usage rights",
      "Priority scheduling",
    ],
    highlight: true,
  },
  {
    name: "Elite",
    price: "$2,499",
    duration: "Full day",
    deliverables: "150+ photos + full video",
    features: [
      "Multiple locations",
      "Unlimited vehicles",
      "150+ professionally edited images",
      "Full cinematic video (2–3 min)",
      "Drone aerial shots",
      "Dedicated creative director",
      "Rush 48h delivery available",
    ],
    highlight: false,
  },
];

const shootTypes = [
  {
    icon: Camera,
    title: "Personal Vehicle Shoots",
    desc: "Showcase your personal supercar or luxury vehicle with professional editorial photography.",
  },
  {
    icon: Instagram,
    title: "Social Media Content",
    desc: "High-impact content optimized for Instagram, TikTok, and YouTube. Grow your automotive brand.",
  },
  {
    icon: Image,
    title: "Dealership Inventory",
    desc: "Professional inventory photography for dealerships and private sellers. Sell faster, sell higher.",
  },
  {
    icon: Film,
    title: "Cinematic Video",
    desc: "Cinematic short films and reels for your vehicle. Perfect for social media and brand campaigns.",
  },
  {
    icon: MapPin,
    title: "Location Shoots",
    desc: "We scout and secure stunning locations — urban, desert, coastal, or mountain backdrops.",
  },
  {
    icon: Clock,
    title: "Golden Hour Sessions",
    desc: "Sunrise and sunset sessions for that iconic warm-light automotive photography look.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
  "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
  "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80",
];

export default function Photoshoots() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section className="relative h-[65vh] min-h-[450px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="section-label mb-3 animate-fade-up-delay-1">Automotive Photography</p>
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none animate-fade-up-delay-2"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
            Photoshoots
          </h1>
          <p className="text-white/60 font-['Barlow'] text-base mt-3 max-w-lg animate-fade-up-delay-3">
            Professional automotive photography and videography. Your car deserves to be seen at its finest.
          </p>
        </div>
      </section>

      {/* ── SHOOT TYPES ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">What We Offer</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight">
              Every Type of<br />
              <span className="text-[#D4AF37]">Automotive Shoot</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shootTypes.map((item) => (
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

      {/* ── GALLERY ── */}
      <section className="py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="section-label mb-3">Portfolio</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-3xl lg:text-4xl uppercase text-white">
              Our Work
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative overflow-hidden group aspect-video">
                <img
                  src={img}
                  alt={`Portfolio ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#080808]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera size={24} className="text-[#D4AF37]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="section-label mb-3">Pricing</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white">
              Shoot Packages
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative p-8 border transition-all duration-300 ${
                  pkg.highlight
                    ? "bg-[#D4AF37]/5 border-[#D4AF37]"
                    : "bg-[#0e0e0e] border-[#1a1a1a] hover:border-[#D4AF37]/50"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#D4AF37] text-[#080808] font-['Barlow_Condensed'] font-bold text-xs tracking-widest uppercase px-4 py-1">
                      Most Popular
                    </span>
                  </div>
                )}
                <p className="section-label mb-2">{pkg.name}</p>
                <div className="font-['Barlow_Condensed'] font-black text-4xl text-white mb-1">{pkg.price}</div>
                <p className="text-white/40 font-['Barlow'] text-xs mb-2">{pkg.duration} · {pkg.deliverables}</p>
                <div className="gold-line my-5" />
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle size={13} className="text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-white/50 font-['Barlow'] text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#inquiry">
                  <button className={`w-full py-3 font-['Barlow_Condensed'] font-bold text-sm tracking-[0.15em] uppercase transition-all duration-200 ${
                    pkg.highlight
                      ? "btn-gold"
                      : "btn-outline-gold"
                  }`}>
                    Book This Package
                  </button>
                </a>
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
              <p className="section-label mb-4">Book a Session</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Let's Create<br />
                <span className="text-[#D4AF37]">Something Epic</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Tell us about your vehicle, your vision, and your preferred dates. Our creative team will reach out to plan the perfect shoot.
              </p>
            </div>
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <InquiryForm
                title="Luxury Concierge Request"
                subtitle="Eastautos will confirm availability, pricing, and delivery options after submission."
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ============================================================
   EASTAUTOS — Vehicle Detail Page
   Premium detail view with image gallery, specs, features,
   and strong booking CTAs
   ============================================================ */
import { useState } from "react";
import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { getVehicleBySlug, vehicles } from "@/data/vehicles";
import {
  Phone,
  MessageCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Zap,
  Settings,
  Users,
  CheckCircle,
} from "lucide-react";

const specIcons: Record<string, React.ReactNode> = {
  Horsepower: <Gauge size={16} className="text-[#D4AF37]" />,
  "0–60 mph": <Zap size={16} className="text-[#D4AF37]" />,
  Engine: <Settings size={16} className="text-[#D4AF37]" />,
  Seats: <Users size={16} className="text-[#D4AF37]" />,
};

export default function VehicleDetail() {
  const params = useParams<{ slug: string }>();
  const vehicle = getVehicleBySlug(params.slug || "");
  const [activeImage, setActiveImage] = useState(0);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-['Barlow_Condensed'] font-extrabold text-4xl uppercase text-white mb-4">
            Vehicle Not Found
          </h1>
          <p className="text-white/50 font-['Barlow'] text-sm mb-8">
            The vehicle you're looking for is not available.
          </p>
          <Link href="/rentals">
            <button className="btn-gold text-sm px-6 py-3">
              Back to Rentals
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const imageLabels = ["Exterior", "Interior", "Rear"];

  const nextImage = () =>
    setActiveImage((prev) => (prev + 1) % vehicle.images.length);
  const prevImage = () =>
    setActiveImage(
      (prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length
    );

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── BACK NAV ── */}
      <div className="pt-20 lg:pt-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/rentals">
            <span className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors font-['Barlow_Condensed'] text-sm tracking-wider uppercase cursor-pointer py-4">
              <ArrowLeft size={14} /> Back to Rentals
            </span>
          </Link>
        </div>
      </div>

      {/* ── HERO GALLERY + INFO ── */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="relative aspect-[16/10] bg-[#0e0e0e] overflow-hidden mb-3">
                <img
                  src={vehicle.images[activeImage]}
                  alt={`${vehicle.name} — ${imageLabels[activeImage] || "View"}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/30 to-transparent pointer-events-none" />

                {/* Nav Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#080808] flex items-center justify-center transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[#D4AF37] text-white hover:text-[#080808] flex items-center justify-center transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-3 right-3 bg-black/70 px-3 py-1 font-['Barlow_Condensed'] text-xs tracking-wider text-white/70">
                  {activeImage + 1} / {vehicle.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-2">
                {vehicle.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-[16/10] overflow-hidden transition-all duration-200 ${
                      activeImage === i
                        ? "ring-2 ring-[#D4AF37] opacity-100"
                        : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${vehicle.name} — ${imageLabels[i] || "View"}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-center font-['Barlow_Condensed'] text-[10px] tracking-wider uppercase text-white/60 py-1">
                      {imageLabels[i] || `View ${i + 1}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Badge & Type */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#D4AF37] text-[#080808] font-['Barlow_Condensed'] font-bold text-[9px] tracking-widest uppercase px-2.5 py-1">
                    {vehicle.badge}
                  </span>
                  <span className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase">
                    {vehicle.type}
                  </span>
                </div>

                {/* Name */}
                <h1
                  className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none mb-3"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                  {vehicle.name}
                </h1>

                {/* Tagline */}
                <p className="font-['Barlow_Condensed'] text-[#D4AF37]/80 text-sm tracking-wider uppercase mb-5">
                  {vehicle.tagline}
                </p>

                {/* Description */}
                <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                  {vehicle.description}
                </p>

                {/* Key Specs Grid */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {vehicle.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-[#0e0e0e] border border-[#1a1a1a] p-3 text-center"
                    >
                      <div className="flex justify-center mb-1.5">
                        {specIcons[spec.label] || (
                          <Settings size={16} className="text-[#D4AF37]" />
                        )}
                      </div>
                      <div className="font-['Barlow_Condensed'] font-black text-lg text-white leading-none mb-0.5">
                        {spec.value}
                      </div>
                      <div className="font-['Barlow'] text-[10px] text-white/40 tracking-wider uppercase">
                        {spec.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="font-['Barlow_Condensed'] font-bold text-sm uppercase tracking-wider text-white/60 mb-3">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle
                          size={12}
                          className="text-[#D4AF37] shrink-0"
                        />
                        <span className="text-white/50 font-['Barlow'] text-xs">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a href="#book">
                  <button className="btn-gold text-sm px-8 py-3.5 flex items-center gap-2">
                    Book This Vehicle
                  </button>
                </a>
                <a href="tel:+19293866103">
                  <button className="btn-outline-white text-sm px-6 py-3.5 flex items-center gap-2">
                    <Phone size={14} /> Call Now
                  </button>
                </a>
                <a
                  href="https://wa.me/19293866103"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-outline-white text-sm px-6 py-3.5 flex items-center gap-2">
                    <MessageCircle size={14} /> Text for Availability
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section
        id="book"
        className="py-20 bg-[#0a0a0a] border-t border-[#1a1a1a]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Book This Vehicle</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Reserve the
                <br />
                <span className="text-[#D4AF37]">{vehicle.name}</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Submit your inquiry and our concierge team will confirm
                availability, pricing, and delivery details within 2 hours.
                Flexible pickup and delivery available across New York,
                Connecticut, New Jersey, Miami, and Los Angeles.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Flexible pickup & delivery",
                  "Comprehensive insurance included",
                  "24/7 roadside assistance",
                  "No hidden fees — transparent pricing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle
                      size={14}
                      className="text-[#D4AF37] shrink-0"
                    />
                    <span className="text-white/50 font-['Barlow'] text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+19293866103">
                  <button className="btn-gold text-sm px-6 py-3 flex items-center gap-2">
                    <Phone size={14} /> Call Now
                  </button>
                </a>
                <a
                  href="https://wa.me/19293866103"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-outline-white text-sm px-6 py-3 flex items-center gap-2">
                    <MessageCircle size={14} /> Text Now
                  </button>
                </a>
              </div>
            </div>
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <InquiryForm
                title="Luxury Concierge Request"
                subtitle="Eastautos will confirm availability, pricing, and delivery options after submission."
                prefilledVehicle={vehicle.name}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER VEHICLES ── */}
      <section className="py-16 bg-[#080808] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3">More Vehicles</p>
          <h2 className="font-['Barlow_Condensed'] font-extrabold text-3xl uppercase text-white mb-8">
            Explore Our Fleet
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {vehicles
              .filter((v) => v.slug !== vehicle.slug)
              .slice(0, 4)
              .map((car) => (
                <Link key={car.slug} href={`/rentals/${car.slug}`}>
                  <div className="card-hover bg-[#0e0e0e] overflow-hidden group cursor-pointer">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={car.images[0]}
                        alt={car.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
                    </div>
                    <div className="p-3">
                      <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-[10px] tracking-[0.15em] uppercase mb-0.5">
                        {car.type}
                      </p>
                      <h4 className="font-['Barlow_Condensed'] font-bold text-xs uppercase text-white">
                        {car.name}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ============================================================
   EASTAUTOS — Vehicle Detail Page (Airtable-Powered)
   Premium detail view with swipeable photo gallery, breadcrumbs,
   and inquiry-based CTAs
   ============================================================ */
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { trpc } from "@/lib/trpc";
import {
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function VehicleDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [activeImage, setActiveImage] = useState(0);

  const { data: vehicle, isLoading, error } = trpc.vehicles.getById.useQuery(
    { id: params.id || "" },
    { enabled: !!params.id }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <Loader2 size={32} className="mx-auto mb-4 animate-spin text-[#D4AF37]" />
          <p className="text-white/50 font-['Barlow'] text-sm">
            Loading vehicle details...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <AlertCircle size={32} className="mx-auto mb-4 text-[#D4AF37]" />
          <h1 className="font-['Barlow_Condensed'] font-extrabold text-4xl uppercase text-white mb-4">
            Vehicle Not Found
          </h1>
          <p className="text-white/50 font-['Barlow'] text-sm mb-8">
            The vehicle you're looking for is not available.
          </p>
          <Link href="/rentals">
            <button className="btn-gold text-sm px-6 py-3">
              Back to Rent a Car
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const photos = vehicle.photos && vehicle.photos.length > 0 ? vehicle.photos : [vehicle.image];
  const nextImage = () => setActiveImage((prev) => (prev + 1) % photos.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── BREADCRUMB ── */}
      <div className="pt-20 lg:pt-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-white/50 font-['Barlow'] text-sm mb-8">
            <Link href="/">
              <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                Home
              </span>
            </Link>
            <span className="text-white/30">/</span>
            <Link href="/rentals">
              <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                Fleet
              </span>
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/70">{vehicle.name}</span>
          </nav>
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
                {photos[activeImage] ? (
                  <img
                    src={photos[activeImage]}
                    alt={`${vehicle.name} — Photo ${activeImage + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <AlertCircle size={32} className="text-[#D4AF37]/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/30 to-transparent pointer-events-none" />

                {/* Nav Arrows */}
                {photos.length > 1 && (
                  <>
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
                      {activeImage + 1} / {photos.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {photos.map((photo, i) => (
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
                        src={photo}
                        alt={`${vehicle.name} — Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Brand & Category */}
                <div className="mb-6">
                  <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase mb-2">
                    {vehicle.brand}
                  </p>
                  <h1
                    className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none mb-3"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    {vehicle.name}
                  </h1>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  <div
                    className={`inline-block px-3 py-1.5 rounded-sm text-xs font-['Barlow_Condensed'] font-bold tracking-wider uppercase border ${
                      vehicle.status === "Available"
                        ? "bg-green-600/20 text-green-400 border-green-600/30"
                        : vehicle.status === "Booked"
                        ? "bg-amber-600/20 text-amber-400 border-amber-600/30"
                        : "bg-red-600/20 text-red-400 border-red-600/30"
                    }`}
                  >
                    {vehicle.status}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-8 pb-8 border-b border-[#1a1a1a]">
                  <p className="text-white/50 font-['Barlow'] text-xs tracking-wider uppercase mb-2">
                    Estimated Daily Rate
                  </p>
                  <p className="text-[#D4AF37] font-['Barlow_Condensed'] font-black text-3xl">
                    ${vehicle.suggestedRate.toLocaleString()}
                  </p>
                  <p className="text-white/40 font-['Barlow'] text-xs mt-3">
                    Availability confirmed after inquiry submission.
                  </p>
                </div>

                {/* Location */}
                {vehicle.location && (
                  <div className="mb-8">
                    <p className="text-white/50 font-['Barlow'] text-xs tracking-wider uppercase mb-2">
                      Location
                    </p>
                    <p className="text-white font-['Barlow_Condensed'] font-semibold">
                      {vehicle.location}
                    </p>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <a href="#inquiry">
                  <button className="btn-gold w-full text-sm px-8 py-3.5">
                    Request Availability
                  </button>
                </a>
                <div className="flex gap-3">
                  <a href="tel:+19293866103" className="flex-1">
                    <button className="btn-outline-white w-full text-sm px-6 py-3.5 flex items-center justify-center gap-2">
                      <Phone size={14} /> Call Now
                    </button>
                  </a>
                  <a
                    href="https://wa.me/19293866103"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <button className="btn-outline-white w-full text-sm px-6 py-3.5 flex items-center justify-center gap-2">
                      <MessageCircle size={14} /> Text Now
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section
        id="inquiry"
        className="py-20 bg-[#0a0a0a] border-t border-[#1a1a1a]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Request<br />
                <span className="text-[#D4AF37]">Availability</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Submit your inquiry and our team will confirm availability, pricing, and scheduling options. We'll respond within 24 hours.
              </p>
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
              <InquiryForm prefilledVehicle={vehicle.name} />
            </div>
          </div>
        </div>
      </section>

      {/* ── MORE VEHICLES ── */}
      <section className="py-16 bg-[#080808] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3">Explore More</p>
          <h2 className="font-['Barlow_Condensed'] font-extrabold text-3xl uppercase text-white mb-8">
            Other Vehicles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link href="/rentals">
              <button className="btn-outline-gold w-full text-sm px-6 py-3">
                View All Vehicles
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

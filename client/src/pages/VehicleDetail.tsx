/* ============================================================
   EASTAUTOS — Vehicle Detail Page (Airtable-Powered)
   Premium detail view with swipeable photo gallery, performance
   specs, luxury descriptions, FAQs, and inquiry-based CTAs
   ============================================================ */
import { useState, useRef } from "react";
import { useParams, Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { trpc } from "@/lib/trpc";
import {
  getVehicleContent,
  getGenericVehicleContent,
} from "@/data/vehicleContent";
import {
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  Loader2,
  Gauge,
} from "lucide-react";

export default function VehicleDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const inquiryFormRef = useRef<HTMLDivElement>(null);

  // Try to fetch from Airtable first (if ID looks like an Airtable record ID)
  const isAirtableId = params.id && params.id.length > 10;
  const shouldFetchAirtable = isAirtableId && !!params.id;
  const { data: vehicle, isLoading, error } = shouldFetchAirtable
    ? trpc.vehicles.getById.useQuery({ id: params.id! })
    : { data: null, isLoading: false, error: null };

  // Fallback: Try to find vehicle in static data if Airtable fetch fails or ID is a slug
  let staticVehicle: any = null;
  if (!shouldFetchAirtable && params.id) {
    try {
      const staticVehicles = require("@/data/vehicles").vehicles;
      staticVehicle = staticVehicles.find((v: any) => v.slug === params.id);
    } catch (e) {
      // Static vehicles data not available
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <Loader2 size={40} className="animate-spin mx-auto text-[#D4AF37] mb-4" />
          <p className="text-white/50">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  const displayVehicle = vehicle || staticVehicle;

  if (!displayVehicle) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <AlertCircle size={40} className="mx-auto text-[#D4AF37] mb-4" />
          <h2 className="font-['Barlow_Condensed'] font-bold text-2xl uppercase mb-2">
            Vehicle Not Found
          </h2>
          <p className="text-white/50 mb-6">The vehicle you're looking for is not available.</p>
          <Link href="/rentals">
            <button className="btn-gold text-sm px-6 py-3">Back to Fleet</button>
          </Link>
        </div>
      </div>
    );
  }

  const photos = (displayVehicle?.photos && displayVehicle.photos.length > 0 
    ? displayVehicle.photos 
    : [displayVehicle?.image || ""]).filter(Boolean);
  
  const nextImage = () => {
    if (photos.length === 0) return;
    setActiveImage((prev) => (prev + 1) % photos.length);
  };
  const prevImage = () => {
    if (photos.length === 0) return;
    setActiveImage((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const scrollToInquiry = () => {
    inquiryFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Get curated content (description, specs, FAQs)
  const vehicleName = displayVehicle?.name || "";
  const vehicleBrand = displayVehicle?.brand || "";
  const content =
    getVehicleContent(vehicleName) ||
    getGenericVehicleContent(vehicleName, vehicleBrand);

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── MAIN CONTENT ── */}
      <section className="bg-[#080808] py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand & Title Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase">
                {displayVehicle?.brand || displayVehicle?.type}
              </p>
              {displayVehicle?.brand && (
                <img
                  src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${displayVehicle.brand.toLowerCase().replace(/\s+/g, '')}.svg`}
                  alt={displayVehicle.brand}
                  className="w-4 h-4 opacity-70"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
            </div>
            <h1
              className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {displayVehicle?.name}
            </h1>
            {/* Short specs line */}
            {content.specs.length > 0 && (
              <p className="text-white/50 font-['Barlow'] text-sm">
                {content.specs.slice(0, 4).map((s) => s.value).join(" • ")}
              </p>
            )}
          </div>

          {/* Hero Image & Gallery + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Gallery */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/10] bg-[#0e0e0e] overflow-hidden mb-4">
                {photos.length > 0 && photos[activeImage] ? (
                  <img
                    src={photos[activeImage]}
                    alt={`${displayVehicle?.name || "Vehicle"} — Photo ${activeImage + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                    <AlertCircle size={32} className="text-[#D4AF37]/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/30 to-transparent pointer-events-none" />

                {/* Gallery Controls */}
                {photos && photos.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-sm transition-colors"
                    >
                      <ChevronLeft size={20} className="text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-sm transition-colors"
                    >
                      <ChevronRight size={20} className="text-white" />
                    </button>
                    {photos.length > 0 && (
                      <div className="absolute bottom-3 right-3 bg-black/70 px-3 py-1 font-['Barlow_Condensed'] text-xs tracking-wider text-white/70">
                        {activeImage + 1} / {photos.length}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {photos && photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {photos.filter(Boolean).map((photo: string, i: number) => (
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
                        alt={`${displayVehicle?.name || "Vehicle"} — Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Breadcrumb (below gallery) */}
              <nav className="flex items-center gap-2 text-sm font-['Barlow'] text-white/50 py-3 border-t border-[#1a1a1a]">
                <Link href="/">
                  <span className="hover:text-white/70 cursor-pointer">Home</span>
                </Link>
                <span className="text-white/30">/</span>
                <Link href="/rentals">
                  <span className="hover:text-white/70 cursor-pointer">Fleet</span>
                </Link>
                <span className="text-white/30">/</span>
                <span className="text-white/70">{displayVehicle?.name}</span>
              </nav>
            </div>

            {/* Vehicle Info Sidebar */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Status Badge */}
                {displayVehicle?.status && (
                  <div className="mb-6">
                    <div
                      className={`inline-block px-3 py-1.5 rounded-sm text-xs font-['Barlow_Condensed'] font-bold tracking-wider uppercase border ${
                        displayVehicle.status === "Available"
                          ? "bg-green-600/20 text-green-400 border-green-600/30"
                          : displayVehicle.status === "Booked"
                          ? "bg-amber-600/20 text-amber-400 border-amber-600/30"
                          : displayVehicle.status === "Unavailable"
                          ? "bg-red-600/20 text-red-400 border-red-600/30"
                          : "bg-gray-600/20 text-gray-400 border-gray-600/30"
                      }`}
                    >
                      {displayVehicle.status}
                    </div>
                  </div>
                )}

                {/* Pricing & Request Button */}
                <div className="mb-8 pb-8 border-b border-[#1a1a1a]">
                  <p className="text-white/50 font-['Barlow'] text-xs tracking-wider uppercase mb-2">
                    Estimated Daily Rate
                  </p>
                  <p className="text-[#D4AF37] font-['Barlow_Condensed'] font-black text-3xl mb-6">
                    ${(displayVehicle?.suggestedRate ?? displayVehicle?.price ?? 0).toLocaleString()}
                  </p>
                  <button
                    onClick={scrollToInquiry}
                    className="btn-gold text-sm px-6 py-3 w-full flex items-center justify-center gap-2 mb-4"
                  >
                    Request Availability
                  </button>
                  <p className="text-white/40 font-['Barlow'] text-xs">
                    Availability confirmed after inquiry submission.
                  </p>
                </div>

                {/* Location */}
                {displayVehicle?.location && (
                  <div className="mb-8">
                    <p className="text-white/50 font-['Barlow'] text-xs tracking-wider uppercase mb-2">
                      Location
                    </p>
                    <p className="text-white font-['Barlow_Condensed'] font-semibold">
                      {displayVehicle.location}
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Contact (Sticky Secondary Actions) */}
              <div className="space-y-3 pt-4">
                <a href="tel:+19293866103" className="w-full">
                  <button className="btn-gold text-sm px-4 py-3 flex items-center justify-center gap-2 w-full">
                    <Phone size={14} /> Call Now
                  </button>
                </a>
                <a href="https://wa.me/19293866103" target="_blank" rel="noopener noreferrer" className="w-full">
                  <button className="btn-outline-white text-sm px-4 py-3 flex items-center justify-center gap-2 w-full">
                    <MessageCircle size={14} /> Text Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VEHICLE DESCRIPTION ── */}
      <section className="py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase mb-4">
              About This Vehicle
            </p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-2xl lg:text-3xl uppercase text-white mb-6">
              {displayVehicle?.name}
            </h2>
            <p className="text-white/60 font-['Barlow'] text-sm lg:text-base leading-relaxed">
              {content.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── PERFORMANCE SPECS ── */}
      {content.specs.length > 0 && (
        <section className="py-16 bg-[#080808] border-t border-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Gauge size={18} className="text-[#D4AF37]" />
              <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase">
                Performance Specifications
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {content.specs.map((spec, i) => (
                <div
                  key={i}
                  className="bg-[#0e0e0e] border border-[#1a1a1a] p-5"
                >
                  <p className="text-white/40 font-['Barlow'] text-xs tracking-wider uppercase mb-2">
                    {spec.label}
                  </p>
                  <p className="text-white font-['Barlow_Condensed'] font-bold text-sm lg:text-base">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── VEHICLE FAQs ── */}
      {content.faqs.length > 0 && (
        <section className="py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase mb-4">
                Frequently Asked Questions
              </p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-2xl lg:text-3xl uppercase text-white mb-8">
                {displayVehicle?.name} — FAQs
              </h2>
              <div className="space-y-3">
                {content.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-[#0e0e0e] border border-[#1a1a1a] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                    >
                      <span className="text-white font-['Barlow'] text-sm font-medium pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === i ? "max-h-60 pb-5" : "max-h-0"
                      }`}
                    >
                      <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed px-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── INQUIRY FORM ── */}
      <section ref={inquiryFormRef} className="py-24 bg-[#080808] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="font-['Barlow_Condensed'] font-black text-3xl uppercase text-white mb-3">
                Request Availability
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm">
                Submit your inquiry and our team will confirm availability within 24 hours.
              </p>
            </div>
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8">
              <InquiryForm prefilledVehicle={displayVehicle?.name} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

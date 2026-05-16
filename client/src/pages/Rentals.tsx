/* ============================================================
   EASTAUTOS — Fleet Page (Refined)
   Broader inventory network, inquiry-focused,
   direct contact prioritization. Cards link to detail pages.
   Filter + Sort bar for luxury marketplace feel.
   ============================================================ */
import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { trpc } from "@/lib/trpc";
import {
  Phone, MessageCircle, ArrowRight, CheckCircle,
  SlidersHorizontal, ChevronDown, X, Gauge, Zap, DollarSign
} from "lucide-react";
import { getCardSpecs } from "@/data/vehicleCardSpecs";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-rentals-gyjcZpNHvpKt2eUFsZr34P.webp";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price Low → High" },
  { value: "price-high", label: "Price High → Low" },
  { value: "brand-az", label: "Brand A → Z" },
  { value: "popular", label: "Most Popular" },
];

export default function Rentals() {
  const { data: airtableVehicles = [] } = trpc.vehicles.getAvailable.useQuery();
  const [displayVehicles, setDisplayVehicles] = useState<any[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (airtableVehicles.length > 0) {
      setDisplayVehicles(airtableVehicles);
    } else {
      try {
        const { vehicles: staticVehicles } = require("@/data/vehicles");
        setDisplayVehicles(staticVehicles);
      } catch {
        setDisplayVehicles([]);
      }
    }
  }, [airtableVehicles]);

  // Extract unique brands from vehicles
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    displayVehicles.forEach((car) => {
      const brand = (car.brand || car.type || "").trim();
      if (brand) brandSet.add(brand);
    });
    return ["All", ...Array.from(brandSet).sort()];
  }, [displayVehicles]);

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let result = [...displayVehicles];

    // Apply brand filter
    if (selectedBrand !== "All") {
      result = result.filter((car) => {
        const brand = (car.brand || car.type || "").trim();
        return brand === selectedBrand;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.dailyRate || 0) - (b.dailyRate || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.dailyRate || 0) - (a.dailyRate || 0));
        break;
      case "brand-az":
        result.sort((a, b) => {
          const brandA = (a.brand || a.type || "").toLowerCase();
          const brandB = (b.brand || b.type || "").toLowerCase();
          return brandA.localeCompare(brandB);
        });
        break;
      case "popular":
        // Sort by daily rate descending as a proxy for popularity
        result.sort((a, b) => (b.dailyRate || 0) - (a.dailyRate || 0));
        break;
      case "newest":
      default:
        // Keep original order (newest from Airtable)
        break;
    }

    return result;
  }, [displayVehicles, selectedBrand, sortBy]);

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section className="relative h-[55vh] min-h-[350px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Browse Our<br />Collection
          </h1>
          <p className="text-white/60 font-['Barlow'] text-sm mt-3 max-w-lg">
            Explore luxury, exotic, and executive vehicles available through the Eastautos network. Submit an inquiry for availability, pricing, and scheduling.
          </p>
        </div>
      </section>

      {/* ── FILTER + SORT BAR ── */}
      <section className="bg-[#080808] border-b border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Filter Bar */}
          <div className="hidden lg:flex items-center justify-between py-5">
            {/* Brand Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`font-['Barlow_Condensed'] font-semibold text-xs tracking-[0.1em] uppercase px-4 py-2 border transition-all duration-300 ${
                    selectedBrand === brand
                      ? "bg-[#D4AF37] text-[#080808] border-[#D4AF37]"
                      : "bg-transparent text-white/60 border-[#2a2a2a] hover:border-[#D4AF37]/50 hover:text-white"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 font-['Barlow_Condensed'] font-semibold text-xs tracking-[0.1em] uppercase text-white/60 border border-[#2a2a2a] px-4 py-2 hover:border-[#D4AF37]/50 hover:text-white transition-all duration-300">
                <SlidersHorizontal size={12} />
                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                <ChevronDown size={12} />
              </button>
              <div className="absolute right-0 top-full mt-1 bg-[#0e0e0e] border border-[#2a2a2a] min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`block w-full text-left font-['Barlow'] text-xs px-4 py-2.5 transition-colors ${
                      sortBy === option.value
                        ? "text-[#D4AF37] bg-[#D4AF37]/5"
                        : "text-white/60 hover:text-white hover:bg-[#1a1a1a]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filter Bar */}
          <div className="lg:hidden py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex-1 flex items-center justify-center gap-2 font-['Barlow_Condensed'] font-semibold text-xs tracking-[0.1em] uppercase text-white/80 border border-[#2a2a2a] px-4 py-3 hover:border-[#D4AF37]/50 transition-all"
              >
                <SlidersHorizontal size={14} />
                Filter{selectedBrand !== "All" ? `: ${selectedBrand}` : ""}
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent font-['Barlow_Condensed'] font-semibold text-xs tracking-[0.1em] uppercase text-white/80 border border-[#2a2a2a] px-4 py-3 pr-8 hover:border-[#D4AF37]/50 transition-all cursor-pointer"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#0e0e0e] text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            {mobileFiltersOpen && (
              <div className="mt-3 bg-[#0e0e0e] border border-[#2a2a2a] p-4 animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-['Barlow_Condensed'] font-bold text-xs tracking-[0.15em] uppercase text-[#D4AF37]">
                    Filter by Brand
                  </span>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-white/40 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setMobileFiltersOpen(false);
                      }}
                      className={`font-['Barlow_Condensed'] font-semibold text-xs tracking-[0.1em] uppercase px-3 py-2 border transition-all duration-300 ${
                        selectedBrand === brand
                          ? "bg-[#D4AF37] text-[#080808] border-[#D4AF37]"
                          : "bg-transparent text-white/60 border-[#2a2a2a] hover:border-[#D4AF37]/50 hover:text-white"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="pb-4 flex items-center justify-between">
            <span className="font-['Barlow'] text-xs text-white/40">
              {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? "s" : ""} available
            </span>
            {selectedBrand !== "All" && (
              <button
                onClick={() => setSelectedBrand("All")}
                className="flex items-center gap-1 font-['Barlow'] text-xs text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors"
              >
                <X size={12} /> Clear filter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── VEHICLE GRID ── */}
      <section className="py-10 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((car) => {
                const linkId = car.id || car.slug;
                const linkPath = car.id ? `/vehicles/${car.id}` : `/rentals/${car.slug}`;
                const carImage = car.image || car.images?.[0] || "";
                const carType = car.brand || car.type || "Vehicle";
                const carBadge = car.status || car.badge || "Available";
                const carName = car.name || "Unknown Vehicle";
                const dailyRate = car.suggestedRate || car.dailyRate || 0;
                const specs = getCardSpecs(carName);

                // Strip brand from display name for cleaner look
                const displayName = carName.replace(new RegExp(`^${carType}\\s*`, 'i'), '') || carName;

                if (!carImage && !carName) return null;

                return (
                  <div key={linkId} className="group bg-[#0c0c0c] border border-[#1a1a1a] hover:border-[#D4AF37]/40 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]">
                    {/* Image */}
                    <div className="relative h-52 sm:h-56 overflow-hidden bg-[#111]">
                      {carImage ? (
                        <img
                          src={carImage}
                          alt={carName}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/30">
                          <span className="text-xs">No Image</span>
                        </div>
                      )}
                      {/* Badge */}
                      <span className="absolute top-3 right-3 bg-[#D4AF37]/95 text-[#080808] font-['Barlow_Condensed'] font-bold text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 backdrop-blur-sm">
                        {carBadge}
                      </span>
                    </div>

                    {/* Info Section */}
                    <div className="p-5">
                      {/* Brand + Name + Rate */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <p className="text-[#D4AF37] font-['Barlow_Condensed'] font-semibold text-[11px] tracking-[0.2em] uppercase mb-1">
                            {carType}
                          </p>
                          <h4 className="font-['Barlow_Condensed'] font-bold text-lg text-white leading-tight">
                            {displayName}
                          </h4>
                        </div>
                        {dailyRate > 0 && (
                          <div className="text-right shrink-0">
                            <p className="text-[#D4AF37] font-['Barlow_Condensed'] font-semibold text-[9px] tracking-[0.2em] uppercase">
                              Starting at
                            </p>
                            <p className="font-['Barlow_Condensed'] font-black text-xl text-white leading-none">
                              ${dailyRate.toLocaleString()}
                              <span className="text-white/40 font-normal text-xs">/day</span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/10 to-transparent mb-4" />

                      {/* Specs Row */}
                      {specs && (
                        <div className="grid grid-cols-3 gap-0 mb-5">
                          <div className="text-center border-r border-[#2a2a2a] pr-2">
                            <p className="font-['Barlow'] font-semibold text-white text-[11px] leading-tight truncate">
                              {specs.engine}
                            </p>
                            <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-[9px] tracking-[0.15em] uppercase mt-0.5">
                              Engine
                            </p>
                          </div>
                          <div className="text-center border-r border-[#2a2a2a] px-2">
                            <p className="font-['Barlow'] font-semibold text-white text-[11px] leading-tight">
                              {specs.horsepower}
                            </p>
                            <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-[9px] tracking-[0.15em] uppercase mt-0.5">
                              HP
                            </p>
                          </div>
                          <div className="text-center pl-2">
                            <p className="font-['Barlow'] font-semibold text-white text-[11px] leading-tight">
                              {specs.msrp}
                            </p>
                            <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-[9px] tracking-[0.15em] uppercase mt-0.5">
                              MSRP
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Dual Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href="#inquiry"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-[#D4AF37] text-[#080808] font-['Barlow_Condensed'] font-bold text-xs tracking-[0.1em] uppercase text-center py-2.5 px-3 hover:bg-[#e5c44a] transition-colors duration-300"
                        >
                          Request
                        </a>
                        <Link
                          href={linkPath}
                          className="border border-[#D4AF37]/60 text-[#D4AF37] font-['Barlow_Condensed'] font-bold text-xs tracking-[0.1em] uppercase text-center py-2.5 px-3 hover:bg-[#D4AF37]/10 transition-colors duration-300"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-['Barlow_Condensed'] font-bold text-xl uppercase text-white/40 mb-3">
                No vehicles found
              </p>
              <p className="text-white/30 font-['Barlow'] text-sm mb-6">
                Try adjusting your filters or contact us for specific requests.
              </p>
              <button
                onClick={() => setSelectedBrand("All")}
                className="btn-outline-gold text-sm px-6 py-2.5"
              >
                View All Vehicles
              </button>
            </div>
          )}

          <div className="mt-10 text-center">
            <p className="text-white/40 font-['Barlow'] text-sm mb-4">Don't see what you need?</p>
            <a href="#inquiry">
              <button className="btn-outline-gold text-sm px-8 py-3">
                Request a Specific Vehicle
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY RENT WITH US ── */}
      <section className="py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Flexible Pickup", desc: "We deliver to your hotel, home, or event." },
              { title: "Insurance Included", desc: "Comprehensive coverage on every rental." },
              { title: "24/7 Support", desc: "Roadside assistance & concierge available." },
              { title: "No Hidden Fees", desc: "Transparent pricing, guaranteed." },
            ].map((item) => (
              <div key={item.title}>
                <h4 className="font-['Barlow_Condensed'] font-bold text-sm uppercase tracking-wide text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-white/40 font-['Barlow'] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK INQUIRY ── */}
      <section id="inquiry" className="py-24 bg-[#080808] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Book Your Rental</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Get Access<br />
                <span className="text-[#D4AF37]">Today</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Tell us your preferred vehicle, dates, and location. Our team will confirm availability and arrange delivery within 24 hours.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Flexible pickup & delivery",
                  "Comprehensive insurance",
                  "24/7 roadside assistance",
                  "No hidden fees",
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
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

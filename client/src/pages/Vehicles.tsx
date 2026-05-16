/* ============================================================
   EASTAUTOS — Rent a Car Page
   Live inventory from Airtable Cars table
   Displays currently available vehicles with real-time status
   ============================================================ */
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Phone, MessageCircle, ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "wouter";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-rentals-gyjcZpNHvpKt2eUFsZr34P.webp";

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  status: "Available" | "Booked" | "Unavailable";
  suggestedRate: number;
  image: string;
  showOnWebsite: boolean;
  location: string;
  inquiryLink: string;
}

function getStatusColor(status: string) {
  switch (status) {
    case "Available":
      return "bg-green-600/20 text-green-400 border-green-600/30";
    case "Booked":
      return "bg-amber-600/20 text-amber-400 border-amber-600/30";
    case "Unavailable":
      return "bg-red-600/20 text-red-400 border-red-600/30";
    default:
      return "bg-gray-600/20 text-gray-400 border-gray-600/30";
  }
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="bg-[#0e0e0e] border border-[#1a1a1a] overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#1a1a1a]">
        {vehicle.image ? (
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <AlertCircle size={32} className="text-[#D4AF37]/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />

        {/* Status Badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1.5 rounded-sm text-xs font-['Barlow_Condensed'] font-bold tracking-wider uppercase border ${getStatusColor(
            vehicle.status
          )}`}
        >
          {vehicle.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[#D4AF37] font-['Barlow_Condensed'] text-xs tracking-[0.15em] uppercase mb-2">
          {vehicle.brand}
        </p>
        <h3 className="font-['Barlow_Condensed'] font-bold text-base uppercase text-white mb-3">
          {vehicle.name}
        </h3>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div>
            <p className="text-white/50 font-['Barlow'] text-[10px] uppercase tracking-wider mb-1">
              Daily Rate
            </p>
            <p className="text-[#D4AF37] font-['Barlow_Condensed'] font-bold">
              ${vehicle.suggestedRate.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-white/50 font-['Barlow'] text-[10px] uppercase tracking-wider mb-1">
              Location
            </p>
            <p className="text-white font-['Barlow_Condensed'] font-semibold">
              {vehicle.location}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <Link href={`/rentals/${vehicle.id}`} className="flex-1">
            <button className="btn-gold w-full text-xs px-3 py-2.5 flex items-center justify-center gap-1.5">
              View Details <ArrowRight size={12} />
            </button>
          </Link>
          <a
            href="https://wa.me/19293866103"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <button className="btn-outline-white w-full text-xs px-3 py-2.5 flex items-center justify-center gap-1.5">
              <MessageCircle size={10} /> Text
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Vehicles() {
  const { data: vehicles = [], isLoading, error } = trpc.vehicles.getAvailable.useQuery();
  const [displayVehicles, setDisplayVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    setDisplayVehicles(vehicles);
  }, [vehicles]);

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
          <p className="section-label mb-3">Available Now</p>
          <h1
            className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Rent a<br />
            Luxury Vehicle
          </h1>
          <p className="text-white/60 font-['Barlow'] text-sm mt-3 max-w-lg">
            Real-time availability from our curated network. Status updates instantly as vehicles are booked.
          </p>
        </div>
      </section>

      {/* ── VEHICLES GRID ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Fleet Status</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white">
                {isLoading ? "Loading..." : `${displayVehicles.length} Vehicle${displayVehicles.length !== 1 ? "s" : ""}`}
              </h2>
              <p className="text-white/40 font-['Barlow'] text-sm">
                {isLoading
                  ? "Fetching from Airtable..."
                  : "Updated in real-time from Airtable"}
              </p>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-8 bg-red-600/10 border border-red-600/30 rounded-sm p-4">
              <p className="text-red-400 font-['Barlow'] text-sm">
                Unable to load vehicles. Please try again later.
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#0e0e0e] border border-[#1a1a1a] h-80 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Vehicles Grid */}
          {!isLoading && displayVehicles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && displayVehicles.length === 0 && !error && (
            <div className="text-center py-16">
              <p className="text-white/60 font-['Barlow'] text-sm mb-6">
                No vehicles currently available for display.
              </p>
              <Link href="/contact">
                <button className="btn-outline-gold text-sm px-8 py-3">
                  Request a Vehicle
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3">Not Seeing What You Need?</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-3xl lg:text-4xl uppercase text-white mb-4">
                Request a<br />
                <span className="text-[#D4AF37]">Specific Vehicle</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-6">
                Our network has access to hundreds of vehicles. If you don't see what you're looking for, submit an inquiry and we'll source it for you.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+19293866103">
                  <button className="btn-gold text-sm px-6 py-3 flex items-center gap-2">
                    <Phone size={14} /> Call Now
                  </button>
                </a>
                <Link href="/contact">
                  <button className="btn-outline-white text-sm px-6 py-3">
                    Submit Inquiry
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Vehicles in Network" },
                { value: "24h", label: "Response Time" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "4+", label: "Years in Business" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0e0e0e] border border-[#1a1a1a] p-6 text-center"
                >
                  <div className="font-['Barlow_Condensed'] font-black text-3xl text-[#D4AF37] leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="font-['Barlow'] text-xs text-white/40 tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

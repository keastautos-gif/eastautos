/* ============================================================
   EASTAUTOS — Vehicle Management Program Page
   Premium positioning: Income generation through managed vehicles
   ============================================================ */
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Lock } from "lucide-react";
import { toast } from "sonner";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-main-3B8iiKNWwXHXND7j8ZHrRJ.webp";

function VehicleManagementForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicleType: "",
    investmentInterest: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.vehicleType) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Application received! We'll contact you within 48 hours.");
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="text-[#D4AF37] mb-4" size={48} />
        <h3 className="font-['Barlow_Condensed'] font-bold text-2xl uppercase tracking-wider text-white mb-2">
          Application Received
        </h3>
        <p className="text-white/50 font-['Barlow'] text-sm">
          Thanks, {form.name}. Our team will review your application and contact you within 48 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 btn-outline-gold text-xs px-4 py-2"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="section-label mb-2">Application</p>
        <h2 className="font-['Barlow_Condensed'] font-extrabold text-2xl lg:text-3xl uppercase tracking-wide text-white mb-1">
          Program Application
        </h2>
        <p className="text-white/50 font-['Barlow'] text-xs">Quick 2-minute application</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            className="input-dark"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="input-dark"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Vehicle Type *
          </label>
          <select
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            className="input-dark appearance-none"
            required
          >
            <option value="">Select vehicle type</option>
            <option value="Luxury Sedan">Luxury Sedan</option>
            <option value="Sports Car">Sports Car</option>
            <option value="Exotic Car">Exotic Car</option>
            <option value="Luxury SUV">Luxury SUV</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Investment Interest (Optional)
          </label>
          <textarea
            name="investmentInterest"
            value={form.investmentInterest}
            onChange={handleChange}
            placeholder="Tell us about your vehicle and goals..."
            rows={3}
            className="input-dark resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full flex items-center justify-center gap-2 py-3 text-sm font-['Barlow_Condensed'] font-bold tracking-wide uppercase"
        >
          {loading ? (
            <span className="animate-spin w-4 h-4 border-2 border-black/30 border-t-black rounded-full" />
          ) : (
            <>
              <ArrowRight size={13} />
              Apply Now
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function VehicleManagement() {
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
          <p className="section-label mb-3">Premium Program</p>
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Vehicle<br />Management
          </h1>
          <p className="text-white/60 font-['Barlow'] text-sm mt-3 max-w-lg">
            Earn income from your vehicle without managing bookings, clients, or operations.
          </p>
        </div>
      </section>

      {/* ── PROGRAM OVERVIEW ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="section-label mb-4">How It Works</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-8">
              Eastautos Vehicle<br />
              <span className="text-[#D4AF37]">Management Program</span>
            </h2>
            <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed max-w-2xl mb-12">
              Through our network and client base, we connect your vehicle to qualified renters and buyers while handling the full process. Our goal is to generate consistent returns while maintaining a premium experience.
            </p>
          </div>

          {/* Three-step breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Submit",
                desc: "Apply for the vehicle management program and tell us about your vehicle.",
              },
              {
                step: "02",
                title: "Manage",
                desc: "We handle bookings, clients, scheduling, and operations on your behalf.",
              },
              {
                step: "03",
                title: "Earn",
                desc: "Your vehicle generates income and you receive payouts based on usage.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-[#0e0e0e] border border-[#1a1a1a] p-8">
                <span className="font-['Barlow_Condensed'] font-black text-5xl text-[#D4AF37]/20 leading-none mb-4 block">
                  {item.step}
                </span>
                <h3 className="font-['Barlow_Condensed'] font-bold text-2xl uppercase text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSITIONING STATEMENT ── */}
      <section className="py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock size={18} className="text-[#D4AF37]" />
              <p className="font-['Barlow_Condensed'] font-bold text-xs tracking-[0.2em] uppercase text-[#D4AF37]">
                Exclusive Program
              </p>
            </div>
            <h3 className="font-['Barlow_Condensed'] font-extrabold text-3xl uppercase text-white mb-4">
              Private Program.<br />
              Professional Management.<br />
              <span className="text-[#D4AF37]">For Serious Vehicle Owners Only.</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-white/40 font-['Barlow'] text-xs tracking-wider uppercase">
              <span>Limited Availability</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Vehicles Selected Based on Demand</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Not All Applications Accepted</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM BENEFITS ── */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="section-label mb-3">Why Join?</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white">
              Program Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Zero operational overhead",
              "Professional client vetting",
              "Insurance & liability handled",
              "Monthly payouts",
              "24/7 customer support",
              "Fleet optimization",
              "Premium brand positioning",
              "Nationwide network access",
              "Flexible vehicle terms",
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-[#D4AF37] shrink-0 mt-1" />
                <span className="text-white/50 font-['Barlow'] text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="py-24 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">Apply Now</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Get<br />
                <span className="text-[#D4AF37]">Access</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Submit your application and our team will review your vehicle and qualifications. We'll be in touch within 48 hours to discuss next steps.
              </p>
              <div className="space-y-4">
                {[
                  "Dedicated account manager",
                  "Transparent revenue sharing",
                  "Professional marketing",
                  "Flexible program terms",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/50 font-['Barlow'] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <VehicleManagementForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

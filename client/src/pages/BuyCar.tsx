/* ============================================================
   EASTAUTOS — Buy a Car (Vehicle Sourcing)
   Inquiry-driven layout: no placeholder inventory,
   focused on sourcing through our network
   ============================================================ */
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone, MessageCircle, CheckCircle, Search, Send, ArrowRight,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-sales-HaZpNAwDWEqnXwSiDkrfi9.webp";

export default function BuyCar() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    budget: "",
    timeline: "",
  });

  const submitLead = trpc.leads.submit.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }

    try {
      const details = [
        form.budget && `Budget: ${form.budget}`,
        form.timeline && `Timeline: ${form.timeline}`,
      ]
        .filter(Boolean)
        .join(" | ");

      const result = await submitLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        inquiryType: "Vehicle Purchase",
        vehicleInterest: form.vehicle || undefined,
        additionalInfo: details || undefined,
      });

      if (result.success) {
        setSubmitted(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[350px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="section-label mb-3">Vehicle Sourcing</p>
          <h1
            className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Find Your Next<br />
            <span className="text-[#D4AF37]">Luxury Vehicle</span>
          </h1>
          <p className="text-white/60 font-['Barlow'] text-sm mt-3 max-w-lg">
            We source premium and exotic vehicles through our private network.
            Tell us what you're looking for — we'll find it.
          </p>
        </div>
      </section>

      {/* ── SOURCING INTRO ── */}
      <section className="py-20 lg:py-24 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — messaging */}
            <div>
              <p className="section-label mb-4">How It Works</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                We Source.<br />
                <span className="text-[#D4AF37]">You Drive.</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-6">
                Eastautos is not a traditional dealership. We operate as a
                private automotive broker, sourcing luxury and exotic vehicles
                through an exclusive network of dealers, collectors, and
                off-market sellers nationwide.
              </p>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Most of our inventory is not listed online. Submit an inquiry
                with the vehicle you're looking for, and our team will locate
                options that match your exact specifications, budget, and
                timeline.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  "Access to off-market & unlisted inventory",
                  "Full vehicle history & 150-point inspection",
                  "Financing options available",
                  "Nationwide delivery to your door",
                  "Trade-ins accepted toward purchase",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/50 font-['Barlow'] text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#inquiry">
                  <button className="btn-gold text-sm px-7 py-3 flex items-center gap-2">
                    <Search size={14} /> Submit Inquiry
                  </button>
                </a>
                <a
                  href="https://wa.me/19293866103"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-outline-white text-sm px-7 py-3 flex items-center gap-2">
                    <MessageCircle size={14} /> Text Now
                  </button>
                </a>
              </div>
            </div>

            {/* Right — process steps */}
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Tell Us What You Want",
                  desc: "Submit your preferred make, model, year, budget, and timeline.",
                },
                {
                  step: "02",
                  title: "We Search Our Network",
                  desc: "We tap into our private network of dealers, auctions, and collectors.",
                },
                {
                  step: "03",
                  title: "Review Your Options",
                  desc: "Receive curated options with full history, photos, and pricing.",
                },
                {
                  step: "04",
                  title: "Inspect & Purchase",
                  desc: "Schedule a private viewing. We handle paperwork and delivery.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#0e0e0e] border border-[#1a1a1a] p-5 flex items-start gap-4"
                >
                  <span className="font-['Barlow_Condensed'] font-black text-3xl text-[#D4AF37]/25 leading-none shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-['Barlow_Condensed'] font-bold text-sm uppercase text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-white/40 font-['Barlow'] text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NOT ALL INVENTORY LISTED BANNER ── */}
      <section className="bg-[#D4AF37] py-5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[#080808] text-center">
            <p className="font-['Barlow_Condensed'] font-bold text-sm tracking-wide uppercase">
              Not all inventory is listed online — submit an inquiry to access
              our full network
            </p>
            <a href="#inquiry">
              <button className="bg-[#080808] text-[#D4AF37] font-['Barlow_Condensed'] font-bold text-xs tracking-wider uppercase px-5 py-2 hover:bg-[#1a1a1a] transition-colors flex items-center gap-2">
                Inquire Now <ArrowRight size={12} />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── SOURCING INQUIRY FORM ── */}
      <section id="inquiry" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — context */}
            <div>
              <p className="section-label mb-4">Get Started</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Tell Us What<br />
                <span className="text-[#D4AF37]">You're Looking For</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                Describe the vehicle you want — make, model, year, color,
                features — and we'll search our network. Our team responds
                within 24 hours with available options and pricing.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#D4AF37]" />
                  <div>
                    <p className="text-white/70 font-['Barlow'] text-sm">
                      Call or Text
                    </p>
                    <a
                      href="tel:+19293866103"
                      className="font-['Barlow_Condensed'] font-bold text-white hover:text-[#D4AF37] transition-colors"
                    >
                      (929) 386-6103
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-[#D4AF37]" />
                  <div>
                    <p className="text-white/70 font-['Barlow'] text-sm">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/19293866103"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-['Barlow_Condensed'] font-bold text-white hover:text-[#D4AF37] transition-colors"
                    >
                      Message Us Directly
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-white/30 font-['Barlow'] text-xs leading-relaxed">
                Prefer to talk? Call us anytime. We're available 7 days a week
                for serious inquiries.
              </p>
            </div>

            {/* Right — form */}
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="text-[#D4AF37] mb-4" size={48} />
                  <h3 className="font-['Barlow_Condensed'] font-bold text-2xl uppercase tracking-wider text-white mb-2">
                    Inquiry Received
                  </h3>
                  <p className="text-white/50 font-['Barlow'] text-sm">
                    We'll search our network and get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        phone: "",
                        vehicle: "",
                        budget: "",
                        timeline: "",
                      });
                    }}
                    className="mt-6 btn-outline-gold text-xs px-4 py-2"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <p className="section-label mb-2">Vehicle Sourcing</p>
                    <h2 className="font-['Barlow_Condensed'] font-extrabold text-2xl lg:text-3xl uppercase tracking-wide text-white mb-1">
                      Purchase Inquiry
                    </h2>
                    <p className="text-white/50 font-['Barlow'] text-xs">
                      Response within 24 hours.
                    </p>
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
                        Vehicle You're Looking For
                      </label>
                      <input
                        type="text"
                        name="vehicle"
                        value={form.vehicle}
                        onChange={handleChange}
                        placeholder="e.g. 2024 Porsche 911 GT3"
                        className="input-dark"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="input-dark appearance-none"
                      >
                        <option value="" className="bg-[#111]">
                          Select budget range
                        </option>
                        <option value="Under $50K" className="bg-[#111]">
                          Under $50K
                        </option>
                        <option value="$50K – $100K" className="bg-[#111]">
                          $50K – $100K
                        </option>
                        <option value="$100K – $200K" className="bg-[#111]">
                          $100K – $200K
                        </option>
                        <option value="$200K – $500K" className="bg-[#111]">
                          $200K – $500K
                        </option>
                        <option value="$500K+" className="bg-[#111]">
                          $500K+
                        </option>
                        <option value="Flexible" className="bg-[#111]">
                          Flexible
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={form.timeline}
                        onChange={handleChange}
                        className="input-dark appearance-none"
                      >
                        <option value="" className="bg-[#111]">
                          When do you need it?
                        </option>
                        <option value="ASAP" className="bg-[#111]">
                          As soon as possible
                        </option>
                        <option value="Within 2 weeks" className="bg-[#111]">
                          Within 2 weeks
                        </option>
                        <option value="Within 1 month" className="bg-[#111]">
                          Within 1 month
                        </option>
                        <option value="Within 3 months" className="bg-[#111]">
                          Within 3 months
                        </option>
                        <option value="Just browsing" className="bg-[#111]">
                          Just exploring options
                        </option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submitLead.isPending}
                      className="btn-gold w-full flex items-center justify-center gap-2 py-3 text-sm font-['Barlow_Condensed'] font-bold tracking-wide uppercase"
                    >
                      {submitLead.isPending ? (
                        <span className="animate-spin w-4 h-4 border-2 border-black/30 border-t-black rounded-full" />
                      ) : (
                        <>
                          <Send size={13} />
                          Submit Inquiry
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ============================================================
   EASTAUTOS — Buy | Trade | Sell (Combined Page)
   Three-section inquiry-based page: Buy (sourcing), Trade, Sell
   ============================================================ */
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import {
  Phone,
  MessageCircle,
  CheckCircle,
  Send,
  Search,
  ArrowRightLeft,
  DollarSign,
  Clock,
  FileText,
} from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-main-3B8iiKNWwXHXND7j8ZHrRJ.webp";

type Tab = "buy" | "trade" | "sell";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "buy", label: "Buy", icon: Search },
  { id: "trade", label: "Trade", icon: ArrowRightLeft },
  { id: "sell", label: "Sell", icon: DollarSign },
];

/* ── BUY FORM ── */
function BuyForm() {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const result = await submitLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        inquiryType: "Vehicle Purchase",
        vehicleInterest: form.vehicle || undefined,
        additionalInfo:
          [form.budget && `Budget: ${form.budget}`, form.timeline && `Timeline: ${form.timeline}`]
            .filter(Boolean)
            .join(" | ") || undefined,
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="text-[#D4AF37] mb-4" size={48} />
        <h3 className="font-['Barlow_Condensed'] font-bold text-2xl uppercase tracking-wider text-white mb-2">
          Inquiry Received
        </h3>
        <p className="text-white/50 font-['Barlow'] text-sm">
          We'll search our network and get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", phone: "", vehicle: "", budget: "", timeline: "" });
          }}
          className="mt-6 btn-outline-gold text-xs px-4 py-2"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Your Name *
        </label>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="input-dark" required />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Phone Number *
        </label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="input-dark" required />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Vehicle You're Looking For
        </label>
        <input type="text" name="vehicle" value={form.vehicle} onChange={handleChange} placeholder="e.g. 2024 Porsche 911 GT3" className="input-dark" />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Budget Range
        </label>
        <select name="budget" value={form.budget} onChange={handleChange} className="input-dark appearance-none">
          <option value="" className="bg-[#111]">Select budget range</option>
          <option value="Under $50K" className="bg-[#111]">Under $50K</option>
          <option value="$50K – $100K" className="bg-[#111]">$50K – $100K</option>
          <option value="$100K – $200K" className="bg-[#111]">$100K – $200K</option>
          <option value="$200K – $500K" className="bg-[#111]">$200K – $500K</option>
          <option value="$500K+" className="bg-[#111]">$500K+</option>
          <option value="Flexible" className="bg-[#111]">Flexible</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Timeline
        </label>
        <select name="timeline" value={form.timeline} onChange={handleChange} className="input-dark appearance-none">
          <option value="" className="bg-[#111]">When do you need it?</option>
          <option value="ASAP" className="bg-[#111]">As soon as possible</option>
          <option value="Within 2 weeks" className="bg-[#111]">Within 2 weeks</option>
          <option value="Within 1 month" className="bg-[#111]">Within 1 month</option>
          <option value="Within 3 months" className="bg-[#111]">Within 3 months</option>
          <option value="Just browsing" className="bg-[#111]">Just exploring options</option>
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
          <><Send size={13} /> Submit Purchase Inquiry</>
        )}
      </button>
    </form>
  );
}

/* ── TRADE FORM ── */
function TradeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    currentVehicle: "",
    desiredVehicle: "",
    condition: "",
  });
  const submitLead = trpc.leads.submit.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const result = await submitLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        inquiryType: "Trade-In",
        vehicleInterest: form.desiredVehicle || undefined,
        additionalInfo:
          [form.currentVehicle && `Current: ${form.currentVehicle}`, form.condition && `Condition: ${form.condition}`]
            .filter(Boolean)
            .join(" | ") || undefined,
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="text-[#D4AF37] mb-4" size={48} />
        <h3 className="font-['Barlow_Condensed'] font-bold text-2xl uppercase tracking-wider text-white mb-2">
          Trade-In Inquiry Received
        </h3>
        <p className="text-white/50 font-['Barlow'] text-sm">
          We'll evaluate your trade and respond within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", phone: "", currentVehicle: "", desiredVehicle: "", condition: "" });
          }}
          className="mt-6 btn-outline-gold text-xs px-4 py-2"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Your Name *
        </label>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="input-dark" required />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Phone Number *
        </label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="input-dark" required />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Your Current Vehicle *
        </label>
        <input type="text" name="currentVehicle" value={form.currentVehicle} onChange={handleChange} placeholder="e.g. 2022 BMW M5 Competition" className="input-dark" required />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Vehicle You Want
        </label>
        <input type="text" name="desiredVehicle" value={form.desiredVehicle} onChange={handleChange} placeholder="e.g. 2025 Porsche 911 Turbo S" className="input-dark" />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Vehicle Condition
        </label>
        <select name="condition" value={form.condition} onChange={handleChange} className="input-dark appearance-none">
          <option value="" className="bg-[#111]">Select condition</option>
          <option value="Excellent" className="bg-[#111]">Excellent</option>
          <option value="Good" className="bg-[#111]">Good</option>
          <option value="Fair" className="bg-[#111]">Fair</option>
          <option value="Needs Work" className="bg-[#111]">Needs Work</option>
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
          <><ArrowRightLeft size={13} /> Submit Trade-In Inquiry</>
        )}
      </button>
    </form>
  );
}

/* ── SELL FORM ── */
function SellForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    mileage: "",
    askingPrice: "",
  });
  const submitLead = trpc.leads.submit.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const result = await submitLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        inquiryType: "Sell My Car",
        vehicleInterest: form.vehicle || undefined,
        additionalInfo:
          [form.mileage && `Mileage: ${form.mileage}`, form.askingPrice && `Asking: ${form.askingPrice}`]
            .filter(Boolean)
            .join(" | ") || undefined,
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="text-[#D4AF37] mb-4" size={48} />
        <h3 className="font-['Barlow_Condensed'] font-bold text-2xl uppercase tracking-wider text-white mb-2">
          Sell Inquiry Received
        </h3>
        <p className="text-white/50 font-['Barlow'] text-sm">
          We'll provide a competitive offer within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", phone: "", vehicle: "", mileage: "", askingPrice: "" });
          }}
          className="mt-6 btn-outline-gold text-xs px-4 py-2"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Your Name *
        </label>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="input-dark" required />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Phone Number *
        </label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="input-dark" required />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Vehicle Details *
        </label>
        <input type="text" name="vehicle" value={form.vehicle} onChange={handleChange} placeholder="e.g. 2023 Mercedes-AMG GT 63" className="input-dark" required />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Mileage
        </label>
        <input type="text" name="mileage" value={form.mileage} onChange={handleChange} placeholder="e.g. 12,000 miles" className="input-dark" />
      </div>
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
          Asking Price (optional)
        </label>
        <input type="text" name="askingPrice" value={form.askingPrice} onChange={handleChange} placeholder="e.g. $85,000" className="input-dark" />
      </div>
      <button
        type="submit"
        disabled={submitLead.isPending}
        className="btn-gold w-full flex items-center justify-center gap-2 py-3 text-sm font-['Barlow_Condensed'] font-bold tracking-wide uppercase"
      >
        {submitLead.isPending ? (
          <span className="animate-spin w-4 h-4 border-2 border-black/30 border-t-black rounded-full" />
        ) : (
          <><DollarSign size={13} /> Get My Offer</>
        )}
      </button>
    </form>
  );
}

/* ── TAB DESCRIPTIONS ── */
const tabContent: Record<Tab, { heading: string; highlight: string; description: string; formTitle: string; formSubtitle: string }> = {
  buy: {
    heading: "Source Your",
    highlight: "Dream Vehicle",
    description:
      "Not all vehicles are listed online. We source luxury and exotic cars through our private dealer network. Tell us what you're looking for — we'll find it.",
    formTitle: "Purchase Inquiry",
    formSubtitle: "We'll search our network and respond within 24 hours.",
  },
  trade: {
    heading: "Trade Up to",
    highlight: "Something Better",
    description:
      "Ready for an upgrade? Submit your current vehicle details and what you want next. We handle the valuation, paperwork, and sourcing — all in one seamless process.",
    formTitle: "Trade-In Inquiry",
    formSubtitle: "Get your trade-in value and upgrade options.",
  },
  sell: {
    heading: "Get Top Dollar",
    highlight: "For Your Car",
    description:
      "Competitive cash offers within 24 hours. No haggling, no lowballing. We buy all luxury brands in any condition. Fast, secure, and confidential.",
    formTitle: "Sell Your Vehicle",
    formSubtitle: "Free valuation. No obligation. Payment within 48 hours.",
  },
};

const processSteps: Record<Tab, { icon: React.ElementType; step: string; title: string; desc: string }[]> = {
  buy: [
    { icon: FileText, step: "01", title: "Submit Inquiry", desc: "Tell us what you want." },
    { icon: Search, step: "02", title: "We Source It", desc: "Network-wide search." },
    { icon: CheckCircle, step: "03", title: "Review Options", desc: "Curated matches for you." },
    { icon: Clock, step: "04", title: "Close the Deal", desc: "Seamless purchase." },
  ],
  trade: [
    { icon: FileText, step: "01", title: "Submit Details", desc: "Your car + what you want." },
    { icon: DollarSign, step: "02", title: "Get Valuation", desc: "Fair trade-in value." },
    { icon: Search, step: "03", title: "We Source", desc: "Find your upgrade." },
    { icon: ArrowRightLeft, step: "04", title: "Make the Swap", desc: "One smooth transaction." },
  ],
  sell: [
    { icon: FileText, step: "01", title: "Submit Details", desc: "Tell us about your car." },
    { icon: DollarSign, step: "02", title: "Get Offer", desc: "Competitive offer in 24h." },
    { icon: CheckCircle, step: "03", title: "Accept Offer", desc: "No obligation to sell." },
    { icon: Clock, step: "04", title: "Get Paid", desc: "Payment within 48 hours." },
  ],
};

export default function BuyTradeSell() {
  const [activeTab, setActiveTab] = useState<Tab>("buy");
  const content = tabContent[activeTab];
  const steps = processSteps[activeTab];

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[50vh] min-h-[320px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-[center_40%]"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="section-label mb-3">Buy | Trade | Sell</p>
          <h1
            className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Your Vehicle,<br />
            <span className="text-[#D4AF37]">Your Way</span>
          </h1>
          <p className="text-white/60 font-['Barlow'] text-sm mt-3 max-w-lg">
            Whether you're buying, trading, or selling — we make the process simple, fast, and premium.
          </p>
        </div>
      </section>

      {/* ── TAB SELECTOR ── */}
      <section className="bg-[#0a0a0a] border-b border-[#1a1a1a] sticky top-16 lg:top-20 z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-['Barlow_Condensed'] font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? "text-[#D4AF37] border-[#D4AF37]"
                    : "text-white/40 border-transparent hover:text-white/70"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="py-12 bg-[#080808] border-b border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => (
              <div key={item.step}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-['Barlow_Condensed'] font-black text-3xl text-[#D4AF37]/20">
                    {item.step}
                  </span>
                  <item.icon size={16} className="text-[#D4AF37]" />
                </div>
                <h4 className="font-['Barlow_Condensed'] font-bold text-base uppercase text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-white/40 font-['Barlow'] text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + FORM ── */}
      <section className="py-20 lg:py-24 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — info */}
            <div>
              <p className="section-label mb-4">{content.formTitle}</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                {content.heading}
                <br />
                <span className="text-[#D4AF37]">{content.highlight}</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-8">
                {content.description}
              </p>

              {/* Benefits */}
              <div className="space-y-3 mb-10">
                {(activeTab === "buy"
                  ? [
                      "Access to off-market inventory",
                      "Custom vehicle sourcing",
                      "Nationwide dealer network",
                      "Competitive pricing",
                      "Full inspection & verification",
                    ]
                  : activeTab === "trade"
                    ? [
                        "Fair market trade-in value",
                        "One seamless transaction",
                        "We handle all paperwork",
                        "Upgrade to any brand",
                        "No separate buy/sell hassle",
                      ]
                    : [
                        "Top market value guaranteed",
                        "No haggling or negotiation",
                        "Any condition accepted",
                        "Payment within 48 hours",
                        "We handle all paperwork",
                      ]
                ).map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/50 font-['Barlow'] text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Contact CTAs */}
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

              <p className="text-white/30 font-['Barlow'] text-xs leading-relaxed mt-6">
                Not all inventory is listed online. Submit an inquiry or contact
                us directly for the full range of options.
              </p>
            </div>

            {/* Right — form */}
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <div className="mb-6">
                <p className="section-label mb-2">
                  {activeTab === "buy" ? "Vehicle Sourcing" : activeTab === "trade" ? "Trade-In" : "Sell Your Car"}
                </p>
                <h2 className="font-['Barlow_Condensed'] font-extrabold text-2xl lg:text-3xl uppercase tracking-wide text-white mb-1">
                  {content.formTitle}
                </h2>
                <p className="text-white/50 font-['Barlow'] text-xs">
                  {content.formSubtitle}
                </p>
              </div>
              {activeTab === "buy" && <BuyForm />}
              {activeTab === "trade" && <TradeForm />}
              {activeTab === "sell" && <SellForm />}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCEPTED BRANDS (for sell/trade) ── */}
      {(activeTab === "sell" || activeTab === "trade") && (
        <section className="py-16 bg-[#0a0a0a] border-t border-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="section-label mb-3">We Accept</p>
            <h3 className="font-['Barlow_Condensed'] font-extrabold text-2xl uppercase text-white mb-6">
              All Luxury Brands
            </h3>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {[
                "Lamborghini", "Ferrari", "Porsche", "Bentley", "Rolls-Royce",
                "McLaren", "Aston Martin", "Maserati", "Mercedes-AMG", "BMW M",
                "Corvette", "Cadillac", "Range Rover", "Audi RS",
              ].map((brand) => (
                <span
                  key={brand}
                  className="bg-[#151515] border border-[#2a2a2a] text-white/60 font-['Barlow_Condensed'] text-xs tracking-[0.1em] uppercase px-3 py-1.5"
                >
                  {brand}
                </span>
              ))}
            </div>
            <p className="text-white/30 font-['Barlow'] text-xs">
              Not listed? We evaluate all luxury vehicles. Contact us for a custom valuation.
            </p>
          </div>
        </section>
      )}

      {/* bottom padding for sticky contact bar */}
      <div className="h-16 lg:h-0" />

      <Footer />
    </div>
  );
}

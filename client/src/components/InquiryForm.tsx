/* ============================================================
   EASTAUTOS — InquiryForm
   Reusable lead-capture form with dark luxury styling
   ============================================================ */
import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";

interface InquiryFormProps {
  title?: string;
  subtitle?: string;
  serviceOptions?: string[];
  defaultService?: string;
  compact?: boolean;
}

export default function InquiryForm({
  title = "Send an Inquiry",
  subtitle = "Our team will respond within 24 hours.",
  serviceOptions = ["Rent a Car", "Buy a Car", "Sell / Trade-In", "Chauffeur Service", "Photoshoot", "General Inquiry"],
  defaultService = "",
  compact = false,
}: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService || serviceOptions[0],
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Inquiry sent! We'll be in touch shortly.");
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="text-[#D4AF37] mb-4" size={48} />
        <h3 className="font-['Barlow_Condensed'] font-bold text-2xl uppercase tracking-wider text-white mb-2">
          Inquiry Received
        </h3>
        <p className="text-white/50 font-['Barlow'] text-sm">
          Thank you, {form.name}. Our team will contact you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 btn-outline-gold text-xs px-4 py-2"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div>
      {!compact && (
        <div className="mb-8">
          <p className="section-label mb-2">Inquire Now</p>
          <h2 className="font-['Barlow_Condensed'] font-extrabold text-3xl lg:text-4xl uppercase tracking-wide text-white mb-2">
            {title}
          </h2>
          <p className="text-white/50 font-['Barlow'] text-sm">{subtitle}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={compact ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
          <div>
            <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Smith"
              className="input-dark"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="input-dark"
              required
            />
          </div>
        </div>

        <div className={compact ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
          <div>
            <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
              Phone *
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
              Service
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="input-dark appearance-none"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#111]">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!compact && (
          <div>
            <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your needs..."
              rows={4}
              className="input-dark resize-none"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full flex items-center justify-center gap-2 py-3.5"
        >
          {loading ? (
            <span className="animate-spin w-4 h-4 border-2 border-black/30 border-t-black rounded-full" />
          ) : (
            <>
              <Send size={14} />
              {compact ? "Inquire Now" : "Submit Inquiry"}
            </>
          )}
        </button>
      </form>
    </div>
  );
}

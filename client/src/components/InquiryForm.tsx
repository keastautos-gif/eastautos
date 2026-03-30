/* ============================================================
   EASTAUTOS — InquiryForm (Simplified)
   Streamlined lead-capture: name, phone, interest only
   ============================================================ */
import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface InquiryFormProps {
  title?: string;
  subtitle?: string;
  serviceOptions?: string[];
  defaultService?: string;
}

export default function InquiryForm({
  title = "Send an Inquiry",
  subtitle = "Our team will respond within 24 hours.",
  serviceOptions = ["Rent a Car", "Buy a Car", "Sell / Trade-In", "Chauffeur Service", "Photoshoot", "General Inquiry"],
  defaultService = "",
}: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: defaultService || serviceOptions[0],
  });

  const submitLead = trpc.leads.submit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        inquiryType: form.service,
      });

      if (result.success) {
        setSubmitted(true);
        toast.success(result.message);
        setForm({ name: "", phone: "", service: defaultService || serviceOptions[0] });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
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
          Thanks, {form.name}. We'll contact you within 24 hours.
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
      <div className="mb-6">
        <p className="section-label mb-2">Inquire Now</p>
        <h2 className="font-['Barlow_Condensed'] font-extrabold text-2xl lg:text-3xl uppercase tracking-wide text-white mb-1">
          {title}
        </h2>
        <p className="text-white/50 font-['Barlow'] text-xs">{subtitle}</p>
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
            I'm Interested In
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
  );
}

/* ============================================================
   EASTAUTOS — InquiryForm (Concierge Model)
   Luxury availability request form with expanded fields
   ============================================================ */
import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface InquiryFormProps {
  title?: string;
  subtitle?: string;
  prefilledVehicle?: string;
}

const SERVICE_TYPES = [
  "Self-Drive Rental",
  "Chauffeur Service",
  "Airport Transfer",
  "Photoshoot / Video Shoot",
  "Wedding",
  "Prom / Graduation",
  "Event / Birthday",
  "Buy / Trade / Sell",
  "Other",
];

const OCCASIONS = [
  "Weekend Getaway",
  "Business Trip",
  "Special Event",
  "Photoshoot",
  "Wedding",
  "Birthday",
  "Anniversary",
  "Other",
];

export default function InquiryForm({
  title = "Luxury Concierge Request",
  subtitle = "Eastautos will confirm availability, pricing, and delivery options after submission.",
  prefilledVehicle = "",
}: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleRequested: prefilledVehicle,
    pickupDate: "",
    returnDate: "",
    serviceType: SERVICE_TYPES[0],
    occasion: OCCASIONS[0],
    additionalInfo: "",
  });

  const submitLead = trpc.leads.submit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        email: form.email || undefined,
        inquiryType: form.serviceType,
        vehicleInterest: form.vehicleRequested || undefined,
        additionalInfo: form.additionalInfo || undefined,
        pickupDate: form.pickupDate || undefined,
        returnDate: form.returnDate || undefined,
        occasion: form.occasion || undefined,
      });

      if (result.success) {
        setSubmitted(true);
        toast.success(result.message);
        setForm({
          name: "",
          phone: "",
          email: "",
          vehicleRequested: prefilledVehicle,
          pickupDate: "",
          returnDate: "",
          serviceType: SERVICE_TYPES[0],
          occasion: OCCASIONS[0],
          additionalInfo: "",
        });
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
          Request Received
        </h3>
        <p className="text-white/50 font-['Barlow'] text-sm max-w-md">
          Thank you, {form.name}. Our concierge team will contact you within 24 hours to confirm availability and discuss your options.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 btn-outline-gold text-xs px-4 py-2"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="section-label mb-2">Request Availability</p>
        <h2 className="font-['Barlow_Condensed'] font-extrabold text-2xl lg:text-3xl uppercase tracking-wide text-white mb-1">
          {title}
        </h2>
        <p className="text-white/50 font-['Barlow'] text-xs">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name */}
        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="input-dark"
            required
          />
        </div>

        {/* Phone */}
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

        {/* Email */}
        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="input-dark"
          />
        </div>

        {/* Vehicle Requested */}
        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Vehicle Requested
          </label>
          <input
            type="text"
            name="vehicleRequested"
            value={form.vehicleRequested}
            onChange={handleChange}
            placeholder="e.g., Mercedes-Benz S580"
            className="input-dark"
          />
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Service Type
          </label>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="input-dark appearance-none"
          >
            {SERVICE_TYPES.map((opt) => (
              <option key={opt} value={opt} className="bg-[#111]">
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Occasion */}
        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Occasion
          </label>
          <select
            name="occasion"
            value={form.occasion}
            onChange={handleChange}
            className="input-dark appearance-none"
          >
            {OCCASIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-[#111]">
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Pickup Date */}
        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Pickup Date
          </label>
          <input
            type="date"
            name="pickupDate"
            value={form.pickupDate}
            onChange={handleChange}
            className="input-dark"
          />
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Return Date
          </label>
          <input
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={handleChange}
            className="input-dark"
          />
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-xs font-['Barlow_Condensed'] tracking-[0.15em] uppercase text-white/40 mb-1.5">
            Additional Details
          </label>
          <textarea
            name="additionalInfo"
            value={form.additionalInfo}
            onChange={handleChange}
            placeholder="Any special requests or details..."
            className="input-dark resize-none"
            rows={3}
          />
        </div>

        {/* Submit Button */}
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
              Request Availability
            </>
          )}
        </button>
      </form>
    </div>
  );
}

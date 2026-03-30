/* ============================================================
   EASTAUTOS — Contact Page
   Midnight Drive: full contact page with form + info
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { Phone, MapPin, Clock, Instagram, MessageCircle } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663491125776/9PUjxLiqBNTsZ9XadNwzZw/hero-main-3B8iiKNWwXHXND7j8ZHrRJ.webp";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(929) 386-6103",
    sub: "Mon–Sat, 9am–8pm",
    href: "tel:+19293866103",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message Us Directly",
    sub: "Quick response guaranteed",
    href: "https://wa.me/19293866103",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@eastautos.backup",
    sub: "DM us anytime",
    href: "https://instagram.com/eastautos.backup",
  },
  {
    icon: MapPin,
    label: "Service Areas",
    value: "NY • LA • Miami • CT • NJ",
    sub: "Nationwide delivery available",
    href: "#",
  },
];

const faqs = [
  {
    q: "How quickly can I get a rental car?",
    a: "We can typically arrange a rental within 2–4 hours of confirmed booking, depending on vehicle availability and your location.",
  },
  {
    q: "Do you deliver vehicles to my location?",
    a: "Yes. We offer complimentary delivery and pickup to hotels, airports, residences, and event venues within our service area.",
  },
  {
    q: "What documents do I need to rent a car?",
    a: "A valid driver's license, passport or government ID, and a credit card in your name. International licenses are accepted.",
  },
  {
    q: "How long does the sell/trade-in process take?",
    a: "We provide a valuation within 24 hours. Once accepted, payment is processed within 48 hours.",
  },
  {
    q: "Are your vehicles insured?",
    a: "All rental vehicles include comprehensive insurance. Additional coverage options are available at checkout.",
  },
  {
    q: "Do you offer financing for vehicle purchases?",
    a: "Yes. We work with premium financing partners to offer competitive rates for qualified buyers.",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="section-label mb-3 animate-fade-up-delay-1">We're Here for You</p>
          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none animate-fade-up-delay-2"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
            Contact Us
          </h1>
          <p className="text-white/60 font-['Barlow'] text-base mt-3 max-w-lg animate-fade-up-delay-3">
            Reach out for any inquiry. Our concierge team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="py-16 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((item) => (
              <a key={item.label} href={item.href} className="card-hover bg-[#0e0e0e] p-7 group block">
                <div className="w-11 h-11 border border-[#D4AF37]/30 flex items-center justify-center mb-5 group-hover:border-[#D4AF37] transition-colors duration-300">
                  <item.icon size={18} className="text-[#D4AF37]" />
                </div>
                <p className="font-['Barlow_Condensed'] font-bold text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-1">
                  {item.label}
                </p>
                <p className="font-['Barlow_Condensed'] font-bold text-base uppercase text-white mb-1">{item.value}</p>
                <p className="text-white/30 font-['Barlow'] text-xs">{item.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTACT SECTION ── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Info */}
            <div>
              <p className="section-label mb-4">Send a Message</p>
              <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white leading-tight mb-6">
                Let's Start a<br />
                <span className="text-[#D4AF37]">Conversation</span>
              </h2>
              <p className="text-white/50 font-['Barlow'] text-sm leading-relaxed mb-10">
                Whether you have a question, a specific request, or you're ready to get started — our team is standing by. Fill out the form and we'll be in touch within 24 hours.
              </p>

              {/* Social links */}
              <div className="mb-10">
                <p className="font-['Barlow_Condensed'] font-bold text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, label: "@eastautos.backup", href: "https://instagram.com/eastautos.backup" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#0e0e0e] border border-[#1a1a1a] px-4 py-2.5 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200 group"
                    >
                      <social.icon size={14} className="text-[#D4AF37]" />
                      <span className="font-['Barlow_Condensed'] text-xs tracking-wider uppercase text-white/50 group-hover:text-[#D4AF37] transition-colors">
                        {social.label}
                      </span>
                    </a>
                  ))
                }
                </div>
              </div>

              {/* Hours */}
              <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-[#D4AF37]" />
                  <p className="font-['Barlow_Condensed'] font-bold text-xs tracking-[0.2em] uppercase text-[#D4AF37]">
                    Business Hours
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    { day: "Monday – Friday", hours: "9:00 AM – 8:00 PM" },
                    { day: "Saturday", hours: "10:00 AM – 6:00 PM" },
                    { day: "Sunday", hours: "By Appointment" },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between items-center">
                      <span className="text-white/40 font-['Barlow'] text-sm">{row.day}</span>
                      <span className="text-white/70 font-['Barlow'] text-sm">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-[#0e0e0e] border border-[#1a1a1a] p-8 lg:p-10">
              <InquiryForm
                title="Send an Inquiry"
                subtitle="Our concierge team responds within 24 hours."
                serviceOptions={[
                  "Rent a Car",
                  "Buy a Car",
                  "Sell / Trade-In",
                  "Chauffeur Service",
                  "Photoshoot",
                  "General Inquiry",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="section-label mb-3">Common Questions</p>
            <h2 className="font-['Barlow_Condensed'] font-extrabold text-4xl lg:text-5xl uppercase text-white">
              FAQs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0e0e0e] border border-[#1a1a1a] p-6">
                <h4 className="font-['Barlow_Condensed'] font-bold text-base uppercase tracking-wide text-white mb-3">
                  {faq.q}
                </h4>
                <p className="text-white/40 font-['Barlow'] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

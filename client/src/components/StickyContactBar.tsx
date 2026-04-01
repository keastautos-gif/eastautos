/* ============================================================
   EASTAUTOS — Sticky Contact Bar
   Always-visible CTA bar at the bottom of the screen on mobile
   and a floating bar on desktop for instant contact access.
   ============================================================ */
import { Phone, MessageCircle } from "lucide-react";

export default function StickyContactBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:bottom-6 lg:left-auto lg:right-6 lg:w-auto">
      {/* Mobile: full-width bottom bar */}
      <div className="lg:hidden flex bg-[#080808]/95 backdrop-blur-md border-t border-[#D4AF37]/30">
        <a
          href="tel:+19293866103"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white font-['Barlow_Condensed'] font-bold text-sm tracking-wider uppercase hover:bg-[#D4AF37] hover:text-[#080808] transition-colors"
        >
          <Phone size={15} /> Call Now
        </a>
        <div className="w-px bg-[#D4AF37]/30" />
        <a
          href="https://wa.me/19293866103"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[#080808] bg-[#D4AF37] font-['Barlow_Condensed'] font-bold text-sm tracking-wider uppercase hover:bg-[#c9a432] transition-colors"
        >
          <MessageCircle size={15} /> Text Now
        </a>
      </div>

      {/* Desktop: floating pill */}
      <div className="hidden lg:flex items-center gap-1 bg-[#080808]/95 backdrop-blur-md border border-[#D4AF37]/30 rounded-full px-1 py-1 shadow-2xl">
        <a
          href="tel:+19293866103"
          className="flex items-center gap-2 px-5 py-2.5 text-white font-['Barlow_Condensed'] font-bold text-xs tracking-wider uppercase hover:text-[#D4AF37] transition-colors rounded-full"
        >
          <Phone size={13} /> Call
        </a>
        <a
          href="https://wa.me/19293866103"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-[#080808] font-['Barlow_Condensed'] font-bold text-xs tracking-wider uppercase hover:bg-[#c9a432] transition-colors rounded-full"
        >
          <MessageCircle size={13} /> Text Now
        </a>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Phone } from "lucide-react";
import { BUSINESS_DETAILS } from "@/constants/content";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 flex gap-3 animate-in slide-in-from-bottom duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <AnimatedButton
        href="/contact#form"
        text="Free Consultation"
        openModal={true}
        className="flex-1 !py-3 !text-[13px] !rounded-xl"
      />
      <a
        href={`tel:${BUSINESS_DETAILS.phone}`}
        className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-[#EA580C] text-[#EA580C] active:scale-95 transition-transform"
        aria-label="Call us"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}

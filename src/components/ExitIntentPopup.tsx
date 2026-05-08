"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !show) {
      const dismissed = sessionStorage.getItem("exit_popup_dismissed");
      if (!dismissed) {
        setShow(true);
      }
    }
  }, [show]);

  useEffect(() => {
    // Only on desktop — mobile doesn't have mouse leave
    if (window.innerWidth < 768) return;

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 15000); // Wait 15s before arming

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("exit_popup_dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={dismiss} />
      <div className="relative w-full max-w-lg bg-white rounded-[28px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-[#EA580C] px-8 py-6 text-white text-center relative">
          <button onClick={dismiss} className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <p className="text-xs font-bold tracking-widest uppercase mb-2 opacity-80">Wait! Before you go...</p>
          <h2 className="text-2xl font-black leading-tight">Get a Free 3D Design for Your Home</h2>
          <p className="text-sm mt-2 opacity-90">No cost. No obligation. Just beautiful design ideas.</p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="px-8 pb-4 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            ✅ 100% Free · ✅ Response within 24 hrs · ✅ 5,000+ Happy Families
          </p>
        </div>
      </div>
    </div>
  );
}

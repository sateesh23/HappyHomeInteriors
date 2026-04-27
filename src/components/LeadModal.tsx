"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

export default function LeadModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-lead-modal", handleOpen);
    return () => window.removeEventListener("open-lead-modal", handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-xl bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start border-b border-gray-50">
          <div>
            <h2 className="text-2xl font-black text-[#0D0D0D] leading-tight">
              Book Your Free Consultation
            </h2>
            <p className="text-sm text-[#6B5F4B] mt-1 font-medium">
              We'll get back to you within 24 hours.
            </p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <ContactForm />
        </div>

        {/* Footer info */}
        <div className="px-8 py-4 bg-gray-50 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            ✅ 100% Free · ✅ No Obligation · ✅ Trusted by 5,000+ Families
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper function to open the modal
export const openLeadModal = () => {
  window.dispatchEvent(new CustomEvent("open-lead-modal"));
};

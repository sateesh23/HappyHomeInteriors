"use client";

import { useState, useEffect } from "react";
import { X, ChefHat, Home, Paintbrush, Bed, Droplets, Building2, ArrowRight } from "lucide-react";
import { BUSINESS_DETAILS } from "@/constants/content";

const SERVICES_LIST = [
  { id: "modular-kitchen", label: "Modular Kitchen", icon: ChefHat, whatsappText: "modular kitchen design" },
  { id: "full-home", label: "Full Home Interior", icon: Home, whatsappText: "full home turnkey interior" },
  { id: "false-ceiling", label: "False Ceiling & Flooring", icon: Paintbrush, whatsappText: "false ceiling and flooring design" },
  { id: "bedroom", label: "Bedroom & Wardrobes", icon: Bed, whatsappText: "bedroom and wardrobe design" },
  { id: "waterproofing", label: "Waterproofing & Cooling", icon: Droplets, whatsappText: "waterproofing and roof cooling" },
  { id: "construction", label: "Construction", icon: Building2, whatsappText: "commercial and residential construction" },
];

export default function ServicePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"service" | "details">("service");
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Only show popup if user hasn't already seen it in this session
    const alreadySeen = sessionStorage.getItem("hhi-popup-seen");
    if (alreadySeen) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("hhi-popup-seen", "true");
    }, 4000); // Show after 4 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep("details");
  };

  const handleSubmit = () => {
    const service = SERVICES_LIST.find(s => s.id === selectedService);
    const text = `Hi Happy Home Interiors! 👋\n\nI'm interested in *${service?.whatsappText || "interior design"}*.\n\n*Name:* ${name}\n*Phone:* ${phone}\n\nPlease share more details.`;
    const whatsappUrl = `https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-[28px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
           style={{ animation: "popupSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-black text-[#0D0D0D] leading-tight">
              {step === "service" ? "What are you looking for?" : "Almost there! 🎉"}
            </h2>
            <p className="text-xs text-[#6B5F4B] mt-1 font-medium">
              {step === "service"
                ? "Select a service to get a free consultation"
                : "Share your details — we'll connect on WhatsApp instantly"}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900 flex-shrink-0"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 overflow-y-auto">
          {step === "service" ? (
            <div className="grid grid-cols-2 gap-3">
              {SERVICES_LIST.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 border-gray-100 bg-gray-50/50 hover:border-[#EA580C] hover:bg-[#EA580C]/5 transition-all duration-200 active:scale-95"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#EA580C]/30 group-hover:bg-[#EA580C]/10 transition-colors">
                      <Icon className="w-5 h-5 text-[#EA580C]" />
                    </div>
                    <span className="text-xs font-bold text-[#0D0D0D] text-center leading-tight">
                      {service.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Selected service pill */}
              <div className="flex items-center gap-2 bg-[#EA580C]/5 border border-[#EA580C]/20 rounded-xl px-4 py-2.5">
                <span className="text-xs font-bold text-[#EA580C]">
                  ✓ {SERVICES_LIST.find(s => s.id === selectedService)?.label}
                </span>
                <button onClick={() => setStep("service")} className="ml-auto text-[10px] text-[#6B5F4B] underline">Change</button>
              </div>

              {/* Name */}
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:bg-white transition-colors"
              />

              {/* Phone */}
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-200 rounded-l-xl bg-gray-50 text-[#6B5F4B] text-sm font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-r-xl px-4 py-3 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:bg-white transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !phone.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] text-white font-bold text-sm py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#25D366]/25"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.004 2c-5.46 0-9.89 4.43-9.89 9.892 0 1.745.457 3.447 1.326 4.947L2 22l5.35-1.405a9.852 9.852 0 004.654 1.157c5.459 0 9.889-4.432 9.889-9.893C21.893 6.43 17.463 2 12.004 2zm5.412 14.18c-.22.617-1.282 1.189-1.8 1.29-.444.086-1.025.143-3.238-.773-2.65-1.1-4.358-3.823-4.488-3.996-.13-.173-1.073-1.425-1.073-2.716 0-1.291.674-1.928.918-2.188.244-.26.531-.325.707-.325.176 0 .353 0 .506.008.16.009.378-.063.593.46.223.541.71 1.734.775 1.864.065.13.108.282.022.455-.087.174-.13.282-.26.434-.131.152-.275.32-.393.435-.13.124-.265.26-.118.513.146.252.651 1.076 1.398 1.746.963.864 1.76 1.135 2.005 1.258.245.123.388.101.533-.064.145-.165.626-.732.792-.984.166-.252.331-.21.554-.124.223.086 1.411.666 1.654.788.244.122.406.182.464.283.058.101.058.587-.162 1.204z" clipRule="evenodd" /></svg>
                Chat on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 text-center border-t border-gray-100">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
            ✅ 100% Free · ✅ No Obligation · ✅ Instant Response
          </p>
        </div>
      </div>

      {/* Popup animation */}
      <style>{`
        @keyframes popupSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

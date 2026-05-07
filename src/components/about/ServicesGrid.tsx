"use client";

import {
  Home,
  UtensilsCrossed,
  Layers,
  Key,
  HardHat,
  Shield,
  Wrench,
  LayoutTemplate,
} from "lucide-react";
import { openLeadModal } from "@/components/LeadModal";

const SERVICES = [
  { number: "01", label: "Interior Design", sub: "2BHK, 3BHK, Villas & Commercial — designed around your life, not a catalogue.", Icon: Home },
  { number: "02", label: "Modular Kitchen & Wardrobes", sub: "Built in our own factory. Installed by our own team. Backed by warranty.", Icon: UtensilsCrossed },
  { number: "03", label: "False Ceiling & Lighting", sub: "Gypsum, POP, cove lighting — every ceiling engineered to elevate every room.", Icon: Layers },
  { number: "04", label: "Turnkey Interiors", sub: "One team, one timeline, one point of accountability. Zero coordination headache.", Icon: Key },
  { number: "05", label: "Home Construction", sub: "From bare slab to finished structure — quality civil execution you can stand on.", Icon: HardHat },
  { number: "06", label: "Waterproofing Solutions", sub: "Stop leaks before they start. Premium terrace and bathroom waterproofing, guaranteed.", Icon: Shield },
  { number: "07", label: "Renovation & Remodeling", sub: "Upgrade what exists without tearing apart what works. Smart, minimal-disruption renovation.", Icon: Wrench },
  { number: "08", label: "Space Planning & 3D Design", sub: "See your home before a single nail is driven. Photorealistic 3D walkthroughs included.", Icon: LayoutTemplate },
];

export default function ServicesGrid() {
  return (
    <section aria-label="Our interior design services" className="bg-white py-16 sm:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[#EA580C] font-black text-xs uppercase tracking-widest px-4 py-2 border border-[#EA580C]/20 rounded-full mb-6 inline-block bg-[#EA580C]/5">
            Everything Under One Roof
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0D0D0D] mb-4 sm:mb-5 leading-tight mt-4">
            Stop Coordinating 7 Contractors.<br className="hidden sm:block" /> Let Us <span className="text-[#EA580C]">Handle</span> All of It.
          </h2>
          <p className="text-[#6B5F4B] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            From the first design sketch to the final snag fix — every service you need to build, furnish, and finish your home, under one accountable team.
          </p>
        </div>

        {/* 8-card grid */}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map(({ number, label, sub, Icon }) => (
            <article
              key={number}
              className="
                group relative bg-white border border-gray-100 rounded-2xl p-5 sm:p-7
                flex flex-col gap-4 sm:gap-5 cursor-pointer overflow-hidden
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(234,88,12,0.13)]
                hover:border-[#EA580C]/30
              "
            >
              {/* Orange top accent bar — slides in on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C2410C] to-[#FB923C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-t-2xl" aria-hidden="true" />

              {/* Number */}
              <span className="text-[11px] font-black tracking-widest text-[#EA580C]/40 uppercase group-hover:text-[#EA580C]/80 transition-colors duration-300 self-start">
                {number}
              </span>

              {/* Icon — centered */}
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-[#EA580C]/8 group-hover:bg-[#EA580C]/12 flex items-center justify-center transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#EA580C] group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </div>
              </div>

              {/* Label */}
              <h3 className="font-black text-[#0D0D0D] text-[16px] leading-snug group-hover:text-[#EA580C] transition-colors duration-300 text-center">
                {label}
              </h3>

              {/* Sub-text */}
              <p className="text-[#6B5F4B] text-sm leading-relaxed flex-1 text-center">
                {sub}
              </p>

              {/* Slide-in arrow */}
              <div className="flex items-center justify-center gap-1 text-[#EA580C] font-bold text-sm opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                Learn more <span>→</span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button
            onClick={() => openLeadModal()}
            className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl bg-[#EA580C] text-white font-black text-[14px] sm:text-[16px] hover:bg-[#C2410C] active:scale-95 transition-all duration-200 shadow-lg shadow-[#EA580C]/25 whitespace-nowrap w-full sm:w-auto cursor-pointer focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2"
            aria-label="Get a free design consultation"
          >
            Get Your Free Design Consultation →
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { BadgeCheck, CircleDollarSign, Clock } from "lucide-react";
import { openLeadModal } from "./LeadModal";

export default function CTABanner() {
  return (
    <section aria-label="Call to action — Book a free consultation" suppressHydrationWarning className="w-full px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-white">
      {/* Compact orange card */}
      <div
        suppressHydrationWarning
        className="relative mx-auto max-w-7xl rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #C2410C 0%, #EA580C 55%, #FB923C 100%)" }}
      >
        {/* Subtle top-right glow */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)" }}
        />

        {/* Content — fully centred, compact */}
        <div suppressHydrationWarning className="relative z-10 flex flex-col items-center text-center px-6 py-10 sm:px-16 sm:py-12">

          {/* Eyebrow */}
          <span className="inline-block text-[10px] font-bold tracking-[0.22em] text-white/75 uppercase mb-4 py-1 px-3 border border-white/20 rounded-full bg-white/10">
            Take the First Step Today
          </span>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.1] mb-3 tracking-tight max-w-3xl">
            Your Family Deserves a Home They&apos;re <span className="text-orange-200">Proud</span> to Live In.
          </h2>

          {/* Subtext */}
          <p className="text-white/80 text-sm sm:text-base mb-7 max-w-xl leading-relaxed font-medium">
            Book a free 30-minute design consultation — no pressure, no commitment. Just clarity on what your home could look like.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              onClick={() => openLeadModal()}
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-white text-[#EA580C] font-black text-[14px] hover:bg-orange-50 active:scale-95 transition-all duration-200 shadow-lg shadow-black/15 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Book a free design consultation"
            >
              Book Free Consultation
            </button>
            <button
              onClick={() => openLeadModal()}
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-white/35 text-white font-bold text-[14px] hover:bg-white/10 active:scale-95 transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Get a price quote for your project"
            >
              Get a Quote →
            </button>
          </div>

          {/* Trust strip — Lucide icons instead of emojis */}
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            <div className="flex items-center gap-1.5 text-white/70 text-[11px] font-bold uppercase tracking-widest">
              <BadgeCheck className="w-3.5 h-3.5 text-white/90 flex-shrink-0" />
              100% Free
            </div>
            <div className="flex items-center gap-1.5 text-white/70 text-[11px] font-bold uppercase tracking-widest">
              <CircleDollarSign className="w-3.5 h-3.5 text-white/90 flex-shrink-0" />
              No Obligation
            </div>
            <div className="flex items-center gap-1.5 text-white/70 text-[11px] font-bold uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5 text-white/90 flex-shrink-0" />
              Reply Within 24 Hrs
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
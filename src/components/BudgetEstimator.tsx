"use client";

import { useState } from "react";
import { BUSINESS_DETAILS } from "@/constants/content";
import SectionLabel from "@/components/ui/SectionLabel";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const PROPERTY_TYPES = ["1 BHK", "2 BHK", "3 BHK", "4 BHK / Villa"];
const SCOPE_OPTIONS = [
  { id: "kitchen", label: "Modular Kitchen", base: 150000 },
  { id: "bedroom", label: "Bedroom & Wardrobe", base: 120000 },
  { id: "living", label: "Living Room", base: 100000 },
  { id: "ceiling", label: "False Ceiling", base: 50000 },
  { id: "painting", label: "Painting", base: 40000 },
  { id: "fullhome", label: "Full Home Turnkey", base: 500000 },
];
const TIERS = [
  { id: "essential", label: "Essential", multiplier: 1 },
  { id: "comfort", label: "Comfort", multiplier: 1.6 },
  { id: "premium", label: "Premium", multiplier: 2.5 },
];

export default function BudgetEstimator() {
  const [property, setProperty] = useState("");
  const [scope, setScope] = useState<string[]>([]);
  const [tier, setTier] = useState("comfort");
  const [showResult, setShowResult] = useState(false);

  const bhkMultiplier = property === "1 BHK" ? 0.7 : property === "2 BHK" ? 1 : property === "3 BHK" ? 1.4 : 1.9;
  const tierData = TIERS.find((t) => t.id === tier) || TIERS[1];
  const total = scope.reduce((sum, id) => {
    const s = SCOPE_OPTIONS.find((o) => o.id === id);
    return sum + (s ? s.base : 0);
  }, 0) * bhkMultiplier * tierData.multiplier;

  const toggleScope = (id: string) => {
    if (id === "fullhome") {
      setScope(["fullhome"]);
    } else {
      setScope((prev) => {
        const filtered = prev.filter((s) => s !== "fullhome");
        return filtered.includes(id) ? filtered.filter((s) => s !== id) : [...filtered, id];
      });
    }
  };

  const formatPrice = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)} Lakhs`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  return (
    <section className="w-full py-16 sm:py-20 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <SectionLabel>Budget Estimator</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0D] leading-tight tracking-tight mb-3">
            Get an <span className="text-[#EA580C]">Instant</span> Budget Estimate
          </h2>
          <p className="text-sm text-[#6B5F4B] max-w-xl mx-auto">
            Select your property type, choose the scope, and pick a quality tier to get an approximate budget. For an exact quote, book a free consultation.
          </p>
        </div>

        {/* Step 1: Property Type */}
        <div className="mb-8">
          <p className="text-xs font-bold text-[#0D0D0D] uppercase tracking-widest mb-3">Step 1 — Property Type</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PROPERTY_TYPES.map((p) => (
              <button key={p} onClick={() => { setProperty(p); setShowResult(false); }}
                className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${property === p ? "border-[#EA580C] bg-[#EA580C]/5 text-[#EA580C]" : "border-gray-200 text-[#6B5F4B] hover:border-[#EA580C]/30"}`}
              >{p}</button>
            ))}
          </div>
        </div>

        {/* Step 2: Scope */}
        <div className="mb-8">
          <p className="text-xs font-bold text-[#0D0D0D] uppercase tracking-widest mb-3">Step 2 — What do you need?</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SCOPE_OPTIONS.map((o) => (
              <button key={o.id} onClick={() => { toggleScope(o.id); setShowResult(false); }}
                className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all text-left ${scope.includes(o.id) ? "border-[#EA580C] bg-[#EA580C]/5 text-[#EA580C]" : "border-gray-200 text-[#6B5F4B] hover:border-[#EA580C]/30"}`}
              >{o.label}</button>
            ))}
          </div>
        </div>

        {/* Step 3: Quality Tier */}
        <div className="mb-8">
          <p className="text-xs font-bold text-[#0D0D0D] uppercase tracking-widest mb-3">Step 3 — Quality Tier</p>
          <div className="grid grid-cols-3 gap-3">
            {TIERS.map((t) => (
              <button key={t.id} onClick={() => { setTier(t.id); setShowResult(false); }}
                className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${tier === t.id ? "border-[#EA580C] bg-[#EA580C]/5 text-[#EA580C]" : "border-gray-200 text-[#6B5F4B] hover:border-[#EA580C]/30"}`}
              >{t.label}</button>
            ))}
          </div>
        </div>

        {/* Estimate Button */}
        <button
          onClick={() => setShowResult(true)}
          disabled={!property || scope.length === 0}
          className="w-full py-4 rounded-xl bg-[#EA580C] text-white font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#C2410C] transition-colors active:scale-[0.98]"
        >
          Calculate Estimate
        </button>

        {/* Result */}
        {showResult && total > 0 && (
          <div className="mt-8 p-6 sm:p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center animate-in fade-in duration-300">
            <p className="text-xs font-bold text-[#6B5F4B] uppercase tracking-widest mb-2">Estimated Budget Range</p>
            <p className="text-4xl sm:text-5xl font-black text-[#EA580C] tracking-tight mb-1">
              {formatPrice(total * 0.85)} — {formatPrice(total * 1.15)}
            </p>
            <p className="text-xs text-[#6B5F4B] mb-6">
              {property} · {tierData.label} package · Approximate range
            </p>
            <AnimatedButton href="/contact#form" text="Get Exact Quote — Free Consultation →" openModal={true} />
            <p className="text-[10px] text-gray-400 mt-4">
              This is an indicative estimate. Actual costs depend on site conditions, material selections, and customization.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

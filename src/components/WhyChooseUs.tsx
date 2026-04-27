import React from "react";
import { WHY_CHOOSE_US_ITEMS } from "@/constants/content";
import { Trophy, Handshake, Banknote, Lightbulb, Search, Zap } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import SectionLabel from "@/components/ui/SectionLabel";

const ICON_MAP = [Trophy, Handshake, Banknote, Lightbulb, Search, Zap];

export default function WhyChooseUs() {
  return (
    <section suppressHydrationWarning className="w-full py-20 md:py-28 bg-white diagonal-texture">
      <div suppressHydrationWarning className="max-w-7xl mx-auto w-full px-5 sm:px-8">

        {/* Header */}
        <div suppressHydrationWarning className="flex flex-col flex-wrap justify-center items-center text-center mb-14 md:mb-20">
          {/* Eyebrow */}
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-4">
            The Happy Home Promise
          </span>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-[#0D0D0D] leading-[1.05] tracking-tight mb-6 max-w-4xl">
            Why 5,000+ Homeowners <span className="text-[#EA580C]">Trusted</span> Us — and Never Had to Look Elsewhere Again
          </h2>
          <p className="text-sm md:text-lg text-[#6B5F4B] max-w-3xl text-center leading-relaxed font-medium mb-10">
            Most homeowners dread the interior design process — late contractors, hidden costs, designs that look nothing like the render. We built our entire company to fix exactly that. Here's how we're different.
          </p>
          <div className="flex justify-center w-full">
            <AnimatedButton href="/contact" text="Book Your Free Consultation →" />
          </div>
        </div>

        {/* 3×2 USP Grid */}
        <div suppressHydrationWarning className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {WHY_CHOOSE_US_ITEMS.map((item : any, idx) => {
            const Icon = ICON_MAP[idx];
            return (
            <div
              suppressHydrationWarning
              key={idx}
              className="bg-white rounded-2xl p-8 sm:p-10 flex flex-col items-start text-left border border-[#1A1A1A]/5 shadow-xl shadow-black/5 transition-all duration-500 hover:-translate-y-2 hover:border-[#EA580C] hover:shadow-[0_30px_60px_-15px_rgba(234,88,12,0.15)] group"
            >
              <div className="mb-8 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#EA580C]/5 border border-[#EA580C]/10 group-hover:bg-[#EA580C] transition-colors duration-500">
                <Icon
                  size={40}
                  strokeWidth={1.5}
                  className="text-[#EA580C] group-hover:text-white transition-colors duration-500"
                />
              </div>
              <p className="text-[10px] font-black tracking-widest text-[#EA580C] uppercase mb-2">
                {item.title}
              </p>
              <h3 className="text-[#0D0D0D] font-black text-2xl mb-4 leading-tight">
                {item.headline || item.title}
              </h3>
              <p className="text-[#6B5F4B] text-base leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
}

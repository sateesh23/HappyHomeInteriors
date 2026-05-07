import Image from "next/image";
import CountUpBadge from "./CountUpBadge";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

interface HeroProps {
  location?: string;
}

export default function Hero({ location = "Visakhapatnam" }: HeroProps) {
  return (
    <section aria-label="Hero banner — Interior Designers in Visakhapatnam" className="w-full h-screen bg-white p-[10px]">
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#1A1A1A]">

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero_Background2.png"
            alt="Interior Designers in Visakhapatnam - Modern luxury interior by Happy Home Interiors"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" aria-hidden="true" />
        </div>

        {/* Content — bottom-left anchored */}
        <div
          suppressHydrationWarning
          className="absolute bottom-8 left-5 right-5 sm:bottom-10 sm:left-8 sm:right-8 lg:bottom-16 lg:left-14 lg:right-auto z-10 flex flex-col items-start text-left"
        >
          {/* Location pill */}
          <div className="flex items-center gap-1.5 text-white/80 text-xs font-semibold mb-4 sm:mb-5 tracking-wide">
            <MapPin className="w-3.5 h-3.5" />
            <span>Based in {location}, AP &amp; Telangana</span>
          </div>

          {/* Counting Badge Array */}
          <CountUpBadge />

          {/* Headline */}
          <h1 className="text-[2rem] min-[375px]:text-[2.2rem] sm:text-[3rem] lg:text-[3.75rem] font-black text-white leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-5 tracking-tight w-full flex flex-col">
            <span className="text-xs sm:text-sm lg:text-base font-bold text-[#EA580C] uppercase tracking-[0.15em] mb-1 sm:mb-2 opacity-90">
              Interior Designers in {location}
            </span>
            <div className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-3">
              <span>Your</span>
              <GooeyText 
                texts={["Dream Home", "Residential Projects", "Commercial Spaces", "Restaurant & Bar"]}
                textClassName="text-[#EA580C]"
              />
            </div>
            <div className="mt-1 sm:mt-2">Designed &amp; Delivered.</div>
          </h1>

          {/* Subtext */}
          <p className="text-white/80 text-[14px] sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-[95%] sm:max-w-lg font-medium">
            From modular kitchens to full home turnkey projects — we&apos;ve transformed 5,000+ homes across India with award-winning design and zero compromise on quality.
          </p>

          {/* CTA Buttons */}
          <div suppressHydrationWarning className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <AnimatedButton
              href="/contact#form"
              text="Start My Home Transformation"
              openModal={true}
              className="w-full sm:w-auto px-4 py-3.5 sm:px-5 sm:py-3 text-[14px] sm:text-sm whitespace-nowrap flex-shrink-0"
            />
            <Link
              href="#projects"
              className="w-full sm:w-auto group flex flex-row items-center justify-center gap-1.5 text-[14px] sm:text-sm font-bold text-[#EA580C] border-2 border-[#EA580C] hover:bg-[#EA580C] hover:text-white transition-colors rounded-xl px-4 py-3 sm:px-5 sm:py-2.5 whitespace-nowrap flex-shrink-0 bg-transparent"
            >
              See Our Work
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

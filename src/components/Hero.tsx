import Image from "next/image";
import CountUpBadge from "./CountUpBadge";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export default function Hero() {
  return (
    <div suppressHydrationWarning className="w-full h-screen bg-white p-[10px]">
      <section className="relative w-full h-full rounded-3xl overflow-hidden bg-[#1A1A1A]">

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero_Background2.png"
            alt="Modern luxury interior by Happy Home Interiors"
            fill
            priority
            className="object-cover object-center"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>

        {/* Content — bottom-left anchored */}
        <div
          suppressHydrationWarning
          className="absolute bottom-10 left-8 lg:bottom-16 lg:left-14 z-10 flex flex-col items-start text-left max-w-xl lg:max-w-2xl"
        >
          {/* Location pill */}
          <div className="flex items-center gap-1.5 text-white/80 text-xs font-semibold mb-5 tracking-wide">
            <MapPin className="w-3.5 h-3.5" />
            <span>Based in Visakhapatnam, AP &amp; Telangana</span>
          </div>

          {/* Counting Badge Array */}
          <CountUpBadge />

          {/* Headline */}
          <h1 className="text-[1.75rem] min-[375px]:text-[2rem] sm:text-[3rem] lg:text-[3.75rem] font-black text-white leading-[1.2] sm:leading-[1.1] mb-5 tracking-tight w-full">
            <div className="inline-flex items-baseline flex-nowrap whitespace-nowrap">
              <span className="mr-2 sm:mr-3">Your</span>
              <GooeyText 
                texts={["Dream Home", "Residential Projects", "Commercial Projects", "Restaurant & Bar"]}
                textClassName="text-[#EA580C]"
              />
            </div>
            <div className="mt-1 sm:mt-2">Designed &amp; Delivered.</div>
          </h1>

          {/* Subtext */}
          <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-medium">
            From modular kitchens to full home turnkey projects — we&apos;ve transformed 5,000+ homes across India with award-winning design and zero compromise on quality.
          </p>

          {/* CTA Buttons */}
          <div suppressHydrationWarning className="flex flex-row items-center gap-2 sm:gap-3 w-full">
            <AnimatedButton
              href="/contact#form"
              text="Start My Home Transformation"
              openModal={true}
              className="px-3 py-2.5 text-[12px] sm:text-sm sm:px-5 sm:py-3 whitespace-nowrap flex-shrink-0"
            />
            <Link
              href="#projects"
              className="group flex flex-row items-center justify-center gap-1.5 text-[12px] sm:text-sm font-bold text-[#EA580C] border-2 border-[#EA580C] hover:bg-[#EA580C] hover:text-white transition-colors rounded-xl px-3 py-2 sm:px-5 sm:py-2.5 whitespace-nowrap flex-shrink-0 bg-transparent"
            >
              See Our Work
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}

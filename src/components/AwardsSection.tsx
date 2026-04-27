"use client";

import React, { useState, useEffect } from "react";
import { AWARDS } from "@/constants/content";
import SafeImg from "@/components/ui/SafeImg";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const CLIENT_LOGOS = [
  { name: "ISM Focal Point", initials: "ISM" },
  { name: "Our MoneyLines", initials: "ML" },
  { name: "Shhaamys Designers", initials: "SD" },
  { name: "Sri Hanuma Catering", initials: "SH" },
];

export default function AwardsSection() {
  const [projects, setProjects] = useState(0);
  const [years, setYears] = useState(0);
  const [rating, setRating] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    const projectIncrement = 5000 / steps;
    const yearIncrement = 12 / steps;
    const ratingIncrement = 4.9 / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setProjects(5000);
        setYears(12);
        setRating(4.9);
        clearInterval(timer);
      } else {
        setProjects(Math.floor(projectIncrement * currentStep));
        setYears(Math.floor(yearIncrement * currentStep));
        setRating(parseFloat((ratingIncrement * currentStep).toFixed(1)));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView]);

  // Use a fallback render for the stats section to avoid hydration mismatch
  const displayProjects = mounted ? projects.toLocaleString() : "5,000";
  const displayYears = mounted ? years : "12";
  const displayRating = mounted ? (Number.isInteger(rating) ? `${rating}.0` : rating) : "4.9";

  // Split the 13 awards into 3 rows
  const row1Base = AWARDS.slice(0, 5); // 5 items
  const row2Base = AWARDS.slice(5, 9); // 4 items
  const row3Base = AWARDS.slice(9, 13); // 4 items

  // Multiply arrays so they are long enough for continuous loop without visual snapping
  const row1 = [...row1Base, ...row1Base, ...row1Base, ...row1Base]; 
  const row2 = [...row2Base, ...row2Base, ...row2Base, ...row2Base];
  const row3 = [...row3Base, ...row3Base, ...row3Base, ...row3Base];

  const renderCard = (award: typeof AWARDS[0], index: number) => (
    <div
      suppressHydrationWarning
      key={`${award.id}-${index}`}
      className="flex-shrink-0 w-[140px] sm:w-[180px] md:w-[240px] lg:w-[300px] rounded-xl relative bg-white border border-[#EA580C] p-2 sm:p-4"
    >
      <div suppressHydrationWarning className="relative w-full aspect-[4/3] sm:aspect-[3/2] bg-transparent">
        <SafeImg
          src={award.image}
          alt={award.title}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );

  return (
    <section suppressHydrationWarning className="flex flex-col justify-center w-full py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      <div suppressHydrationWarning className="max-w-7xl mx-auto w-full px-5 sm:px-8 mb-8 md:mb-16">
        <div suppressHydrationWarning className="flex flex-col flex-wrap justify-center items-center text-center animate-reveal is-visible">
          {/* Eyebrow */}
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-4">
            Why Families Choose Us First
          </span>
          
          <h2 className="text-3xl lg:text-5xl font-black text-[#0D0D0D] leading-[1.1] tracking-tight mb-6 max-w-4xl">
            Trusted by 5,000+ Families. <span className="text-[#EA580C]">Awarded</span> by the Industry. Loved by Both.
          </h2>
          
          <p className="text-sm md:text-lg text-[#6B5F4B] max-w-3xl text-center leading-relaxed font-medium mb-10">
            We don't just win awards — we win the trust of homeowners who never want to redo their interiors again. Every recognition we've earned reflects a promise we kept to a real family.
          </p>
          
          <div suppressHydrationWarning className="flex justify-center w-full mt-4 mb-16">
            <AnimatedButton href="/about" text="View Our Awards & Certifications →" />
          </div>

          {/* Seamless Stats Row */}
          <div ref={sectionRef} suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full max-w-5xl pt-4">
             <div suppressHydrationWarning className="text-center group">
                <p suppressHydrationWarning className="text-4xl sm:text-5xl font-black text-[#0D0D0D] tracking-tighter mb-2 group-hover:text-[#EA580C] transition-colors">
                  {displayProjects}+
                </p>
                <p className="text-xs sm:text-sm font-bold tracking-widest text-[#1A1A1A] uppercase">
                  Spaces Designed
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">
                  Every single one delivered with care
                </p>
             </div>
             
             <div suppressHydrationWarning className="text-center group">
                <p suppressHydrationWarning className="text-4xl sm:text-5xl font-black text-[#0D0D0D] tracking-tighter mb-2 group-hover:text-[#EA580C] transition-colors">
                  {displayYears}+
                </p>
                <p className="text-xs sm:text-sm font-bold tracking-widest text-[#1A1A1A] uppercase">
                  Years of Experience
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">
                  Thousands of problems solved before yours
                </p>
             </div>
             
             <div suppressHydrationWarning className="text-center group">
                <p suppressHydrationWarning className="text-4xl sm:text-5xl font-black text-[#0D0D0D] tracking-tighter mb-2 group-hover:text-[#EA580C] transition-colors">
                  {displayRating}
                </p>
                <p className="text-xs sm:text-sm font-bold tracking-widest text-[#1A1A1A] uppercase">
                  Average Rating
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">
                  Rated by real homeowners, not us
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div suppressHydrationWarning className="w-full space-y-3 sm:space-y-4 md:space-y-6 flex flex-col items-center">
        
        {/* ROW 1: Auto Scroll Left */}
        <div suppressHydrationWarning className="w-[110%] flex overflow-hidden">
          <div suppressHydrationWarning className="flex gap-3 md:gap-4 animate-[scroll-left_30s_linear_infinite] md:animate-[scroll-left_40s_linear_infinite] w-max px-2">
            {row1.map(renderCard)}
          </div>
        </div>

        {/* ROW 2: Auto Scroll Right */}
        <div suppressHydrationWarning className="w-[110%] flex overflow-hidden">
          <div suppressHydrationWarning className="flex gap-3 md:gap-4 animate-[scroll-right_30s_linear_infinite] md:animate-[scroll-right_40s_linear_infinite] w-max px-2">
            {row2.map(renderCard)}
          </div>
        </div>

        {/* ROW 3: Auto Scroll Left */}
        <div suppressHydrationWarning className="w-[110%] flex overflow-hidden">
          <div suppressHydrationWarning className="flex gap-3 md:gap-4 animate-[scroll-left_30s_linear_infinite] md:animate-[scroll-left_40s_linear_infinite] w-max px-2">
            {row3.map(renderCard)}
          </div>
        </div>

      </div>
    </section>
  );
}

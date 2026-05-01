"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function CountUpBadge() {
  const [projects, setProjects] = useState(0);
  const [years, setYears] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    const projectIncrement = 5000 / steps;
    const yearIncrement = 12 / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setProjects(5000);
        setYears(12);
        clearInterval(timer);
      } else {
        setProjects(Math.floor(projectIncrement * currentStep));
        setYears(Math.floor(yearIncrement * currentStep));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div suppressHydrationWarning className="flex flex-row items-center gap-2 sm:gap-3 mb-6 overflow-x-auto pb-1 max-w-[95vw] scrollbar-hide">
      
      {/* Avatar Stack + Projects Badge */}
      <div className="flex items-center shrink-0 bg-white/40 border border-gray-200/50 backdrop-blur-xl rounded-[4px] pr-3 sm:pr-4 pl-1.5 sm:pl-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <div className="hidden sm:flex items-center -space-x-3 mr-2.5">
          <div className="relative w-7 h-7 rounded-full border-2 border-[#1A1A1A] overflow-hidden shrink-0">
            <Image 
              src="/images/client-1.png"
              alt="Sunitha Lavanya - Happy Home Interiors client, Visakhapatnam"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <div className="relative w-7 h-7 rounded-full border-2 border-[#1A1A1A] overflow-hidden shrink-0 z-10">
            <Image 
              src="/images/client-2.png"
              alt="Siva Dosapati - Happy Home Interiors client, Visakhapatnam"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <div className="relative w-7 h-7 rounded-full border-2 border-[#1A1A1A] overflow-hidden shrink-0 z-20">
            <Image 
              src="/images/client-3.png"
              alt="Praveen Koppuravuri - Happy Home Interiors client, Visakhapatnam"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
        </div>
        <span suppressHydrationWarning className="text-[#0D0D0D] text-[10px] sm:text-[13px] font-bold tracking-widest leading-none shrink-0 whitespace-nowrap">
          <span className="text-[#EA580C] mr-0.5">{projects}+</span> PROJECTS
        </span>
      </div>

      {/* Years of Experience Badge */}
      <div suppressHydrationWarning className="flex items-center gap-1.5 sm:gap-2 shrink-0 bg-white/40 border border-gray-200/50 backdrop-blur-xl rounded-md px-3 sm:px-4 py-1.5 sm:py-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EA580C]" strokeWidth={2.5} />
        <span suppressHydrationWarning className="text-[#0D0D0D] text-[10px] sm:text-[13px] font-bold tracking-widest leading-none whitespace-nowrap">
          {years}+ YEARS EXPERIENCE
        </span>
      </div>

    </div>
  );
}

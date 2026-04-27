"use client";

import React from "react";
import Image from "next/image";
import SubServiceCard from "./SubServiceCard";
import type { SubService } from "@/data/servicesData";
import { BUSINESS_DETAILS } from "@/constants/content";
import SectionLabel from "@/components/ui/SectionLabel";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface MainServiceSectionProps {
  id: string;
  serviceNumber: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  subServices: SubService[];
  ctaText: string;
  priceFrom: string;
  bg: string;
}

export default function MainServiceSection({
  id,
  label,
  title,
  description,
  image,
  imageAlt,
  imagePosition,
  subServices,
  ctaText,
  priceFrom,
  bg,
}: MainServiceSectionProps) {
  const isImageLeft = imagePosition === "left";
  
  return (
    <section id={id} className={`py-24 scroll-mt-28 ${bg}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
        {/* Top row: text + image alternating */}
        <div className={`flex flex-col gap-16 lg:gap-20 items-center justify-between ${isImageLeft ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
          
          {/* Text block */}
          <div className="w-full lg:w-5/12 flex flex-col items-start animate-reveal is-visible">
            <SectionLabel centered={false} className="text-center lg:text-left">
              {label}
            </SectionLabel>
            <h2 className="font-playfair text-4xl sm:text-[44px] font-black text-[#0D0D0D] leading-[1.1] mb-6">
              {title}
            </h2>
            <div className="font-dmsans text-[16px] text-[#1C1C1C] leading-relaxed mb-8 flex flex-col gap-4 whitespace-pre-wrap">
              {description}
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4 w-full">
              <AnimatedButton 
                href="/contact#form" 
                text="Book Consultation" 
                className="flex-1 sm:flex-none !px-8 !py-3"
                openModal={true}
              />
              <a 
                href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=${encodeURIComponent(`Hi Happy Home Interiors, I am interested in ${title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-[#EA580C]/20 text-[#EA580C] font-bold text-[15px] hover:bg-[#EA580C]/5 transition-all active:scale-95 whitespace-nowrap"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          
          {/* Image block */}
          <div className="w-full lg:w-7/12 relative animate-reveal is-visible delay-100">
            <div className="aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
               <Image 
                 src={image} 
                 alt={imageAlt} 
                 fill 
                 className="object-cover" 
                 sizes="(max-width: 1024px) 100vw, 58vw"
               />
            </div>
          </div>
          
        </div>

        {/* Sub-services Grid */}
        {subServices && subServices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 lg:mt-24">
            {subServices.map((sub) => (
              <SubServiceCard key={sub.title} {...sub} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

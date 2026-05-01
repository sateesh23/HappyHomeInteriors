import { Service, BUSINESS_DETAILS } from "@/constants/content";
import SafeImg from "@/components/ui/SafeImg";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { ExternalLink, MessageCircle } from "lucide-react";

interface Props {
  services: Service[];
}

export default function ServicesSection({ services }: Props) {
  return (
    <section suppressHydrationWarning className="flex flex-col justify-center w-full py-20 md:py-32 bg-white">
      <div suppressHydrationWarning className="max-w-7xl mx-auto w-full px-5 sm:px-8">

        <div suppressHydrationWarning className="flex flex-col flex-wrap justify-center items-center text-center mb-14 md:mb-20">
          {/* Eyebrow */}
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-4">
            What We Do Best
          </span>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-[#0D0D0D] leading-[1.05] tracking-tight mb-6 max-w-4xl">
            Premium Modular Kitchens & Turnkey Home Interiors. One Team That Gets It <span className="text-[#EA580C]">Right.</span>
          </h2>
          <p className="text-sm md:text-lg text-[#6B5F4B] max-w-3xl text-center leading-relaxed font-medium mb-10">
            From the first wall to the last coat of paint — we handle everything so you don't have to coordinate with 10 different vendors. One team. One timeline. Zero chaos.
          </p>
          <div className="flex justify-center w-full">
            <AnimatedButton href="/services" text="Explore All Our Services →" />
          </div>
        </div>

        {/* 2-Column Grid */}
        <div suppressHydrationWarning className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16 lg:gap-x-12 lg:gap-y-24">
          {services.map((service : any) => (
            <div key={service.id} className="group flex flex-col">

              {/* Image */}
              <div suppressHydrationWarning className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-gray-100 shadow-xl shadow-black/5">
                <SafeImg
                  src={service.image}
                  alt={service.title}
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.04] rounded-2xl"
                />
                <span className="absolute top-5 left-5 bg-white shadow-xl text-[#EA580C] text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-lg z-10">
                  {service.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 px-2">
                <h3 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-4 leading-tight group-hover:text-[#EA580C] transition-colors">
                  {service.headline || service.title}
                </h3>
                <p className="text-[#6B5F4B] text-base leading-relaxed mb-6 flex-1 font-medium">
                  {service.description}
                </p>

                {/* Feature tags */}
                {(service.features || []).length > 0 && (
                  <ul className="flex flex-wrap gap-2.5 mb-8">
                    {(service.features || []).map((feat : any) => (
                      <li
                        key={feat}
                        className="text-[10px] font-bold text-[#EA580C] bg-[#EA580C]/5 border border-[#EA580C]/10 rounded-lg px-4 py-1.5 uppercase tracking-wider"
                      >
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-3 mt-auto">
                  <AnimatedButton 
                    href="/contact#form" 
                    text="Book Consultation" 
                    className="flex-1 !py-3 !text-xs sm:!text-[13px]"
                    openModal={true}
                  />
                  <Link 
                    href={`/services#${service.id}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl border-2 border-[#EA580C]/20 text-[#EA580C] text-xs sm:text-[13px] font-bold hover:bg-[#EA580C]/5 transition-all active:scale-95 whitespace-nowrap"
                  >
                    View Designs
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

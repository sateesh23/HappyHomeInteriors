
import React from "react";
import ServicesNavBar from "@/components/services/ServicesNavBar";
import MainServiceSection from "@/components/services/MainServiceSection";
import { SERVICES_DATA } from "@/data/servicesData";
import { getSupabaseClient } from "@/lib/supabase";
import { Palette, Factory, HardHat, KeyRound } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

import CTABanner from "@/components/CTASection";

const BASE_URL = "https://happyhomeinteriors.in";

export const metadata = {
  title: "Interior Design Services in Visakhapatnam | Happy Home Interiors",
  description:
    "From modular kitchens to full home turnkey projects — explore all interior design services by Happy Home Interiors. Serving Vizag, Hyderabad, Vijayawada & more.",
  keywords: ["interior design services visakhapatnam", "modular kitchen services vizag", "turnkey interior solutions ap", "false ceiling contractors andhra pradesh", "wardrobe designers near me"],
  alternates: { canonical: `${BASE_URL}/services` },
  openGraph: {
    title: "Interior Design Services in Visakhapatnam | Happy Home Interiors",
    description: "From modular kitchens to full home turnkey projects — explore all interior design services by Happy Home Interiors. Serving Vizag, Hyderabad, Vijayawada & more.",
    url: `${BASE_URL}/services`,
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Services in Visakhapatnam | Happy Home Interiors",
    description: "From modular kitchens to full home turnkey projects — explore all interior design services. Serving Vizag, Hyderabad & more.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

async function getServicesData() {
  let finalData = [...SERVICES_DATA];
  
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("order_index");
        
      if (!error && data && data.length > 0) {
        // Merge db overrides into fallback data based on slug or title match.
        // For simplicity and to fit the exact block count, we map by ID where possible.
        finalData = finalData.map(service => {
          const dbMatch = data.find(dbS => (dbS.slug && service.id.includes(dbS.slug)) || dbS.title.toLowerCase().includes(service.title.split(' ')[0].toLowerCase()));
          if (dbMatch) {
            return {
              ...service,
              description: dbMatch.description || service.description,
              image: dbMatch.image_url || service.image,
              title: dbMatch.title || service.title,
            };
          }
          return service;
        });
      }
    } catch(e) {
      // Fallback silently
    }
  }
  return finalData;
}

export default async function ServicesPage() {
  const mergedServices = await getServicesData();

  return (
    <>
      {/* 1. Services Navigation Strip */}
      <div className="pt-24 md:pt-32 bg-white">
        <ServicesNavBar />
      </div>

      {/* 3-8. Main Service Sections */}
      <div className="bg-white">
        {mergedServices.map((service, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <MainServiceSection 
              key={service.id}
              {...service}
              imagePosition={isEven ? "left" : "right"}
              bg="bg-white"
            />
          );
        })}
      </div>

      {/* 9. Process Section */}
      <section className="bg-white py-16 sm:py-24 md:py-32 relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 w-full animate-reveal is-visible">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <SectionLabel>Our Process</SectionLabel>

            <h2 className="font-playfair text-3xl sm:text-4xl md:text-[44px] font-black text-[#0D0D0D] leading-[1.2] mb-4 sm:mb-6 whitespace-pre-wrap">
              {"Long-lasting Home Interiors\nTailored to Fulfill Your Needs"}
            </h2>
            <p className="font-dmsans text-[#6B5F4B] text-sm sm:text-[16px] leading-relaxed max-w-2xl mx-auto">
              "Made for you" expresses exactly what we do. We have been designing and executing exquisite home interiors since 2004. Our interior designers possess incredible ability to understand client requirements and provide the best space planning for a house or flat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mt-10 sm:mt-16 position-relative">
            {/* Steps */}
            {[
              { id: "1", Icon: Palette, title: "Design", text: "Understanding your dreams through deep consultation and creative 3D visualisation." },
              { id: "2", Icon: Factory, title: "Production", text: "Premium materials crafted in our factory with quality checks at every stage." },
              { id: "3", Icon: HardHat, title: "Execution", text: "A production of highly skilled and systematic on-site installation and execution." },
              { id: "4", Icon: KeyRound, title: "Project Handover", text: "Completed in 45-90 days with complete walkthrough, snag fixing and warranty document." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col relative group">
                <div className="w-14 h-14 rounded-xl border-2 border-[#EA580C] text-[#EA580C] flex items-center justify-center mb-6 relative z-10 bg-[#EA580C]/5">
                  <step.Icon className="w-6 h-6 text-[#EA580C]" />
                </div>
                {/* Dashed connector for desktop */}
                {idx !== 3 && (
                  <div className="hidden lg:block absolute top-[27px] left-14 w-[calc(100%-14px)] h-0 border-t-2 border-dashed border-[#EA580C]/30" />
                )}
                <h3 className="font-dmsans text-[#0D0D0D] text-[20px] font-bold mb-3 flex items-center gap-2">
                  <span>{step.title}</span>
                </h3>
                <p className="font-dmsans text-[#6B5F4B] text-[15px] leading-[1.6]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Final CTA */}
      <CTABanner />

      {/* JSON-LD Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": mergedServices.map((service, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Service",
                "name": service.title,
                "description": service.description,
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "Happy Home Interiors"
                }
              }
            }))
          }) 
        }} 
      />
    </>
  );
}

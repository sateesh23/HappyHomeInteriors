"use client";

import React, { useEffect, useState } from "react";
import { SECTIONS_NAV } from "@/data/servicesData";
import * as LucideIcons from "lucide-react";

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const Icon = IconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export default function ServicesNavBar() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers = SECTIONS_NAV.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });

    return () => {
      observers.forEach((o) => o?.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    /* No border-b, no shadow line */
    <div className="sticky top-[64px] z-[99] bg-white overflow-x-auto scrollbar-hide border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-start md:justify-center py-3.5 gap-2.5 font-dmsans">
        {SECTIONS_NAV.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-[#EA580C] text-white shadow-[0_6px_18px_rgba(234,88,12,0.30)] -translate-y-0.5"
                  : "bg-white text-[#0D0D0D] border border-gray-200 hover:border-[#EA580C] hover:text-[#EA580C] hover:shadow-[0_6px_18px_rgba(234,88,12,0.15)] hover:-translate-y-0.5"
              }`}
            >
              <DynamicIcon
                name={s.icon}
                className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#EA580C]"}`}
              />
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

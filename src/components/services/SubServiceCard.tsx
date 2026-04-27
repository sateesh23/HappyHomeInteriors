import React from "react";
import type { SubService } from "@/data/servicesData";
import * as LucideIcons from "lucide-react";


function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconMap = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const Icon = IconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export default function SubServiceCard({ icon, title, description }: SubService) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 ease-in-out hover:border-[#EA580C] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(234,88,12,0.12)] flex flex-col items-start text-left">
      <div className="w-11 h-11 rounded-xl bg-[#EA580C]/10 flex items-center justify-center mb-1">
        <DynamicIcon name={icon} className="w-5 h-5 text-[#EA580C]" />
      </div>
      <h3 className="font-dmsans text-[15px] font-bold text-[#0D0D0D] mt-3">
        {title}
      </h3>
      <p className="font-dmsans text-[13px] text-[#6B5F4B] mt-2 leading-[1.6]">
        {description}
      </p>
    </div>
  );
}

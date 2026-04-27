import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export default function SectionLabel({ 
  children, 
  className = "", 
  centered = true 
}: SectionLabelProps) {
  return (
    <span
      suppressHydrationWarning
      className={`
        inline-block text-[#EA580C] text-[11px] md:text-[12px] font-bold tracking-[0.25em] uppercase mb-4
        ${centered ? "text-center w-full" : "text-left"}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

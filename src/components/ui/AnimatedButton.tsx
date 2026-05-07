"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { openLeadModal } from '../LeadModal';

interface AnimatedButtonProps {
  href?: string;
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  isButton?: boolean;
  icon?: React.ReactNode;
  openModal?: boolean;
}

/**
 * Primary CTA component — used across all pages for key conversion actions:
 * - "Book Free Consultation" (opens lead modal)
 * - "See Our Work" (navigates to projects)
 * - "Explore Services" (navigates to services)
 */
export function AnimatedButton({ 
  href, 
  text, 
  className = "", 
  type = "button", 
  onClick, 
  isButton = false,
  icon,
  openModal = false
}: AnimatedButtonProps) {
  
  const handleClick = (e: React.MouseEvent) => {
    if (openModal) {
      e.preventDefault();
      openLeadModal();
    }
    if (onClick) onClick();
  };
  
  const content = (
    <>
      <span className="flex items-center justify-center w-full h-full translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300" aria-hidden="true">
        {text}
      </span>
      <div suppressHydrationWarning className="flex gap-1.5 text-[#EA580C] bg-white border-2 border-[#EA580C] pointer-events-none z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.15)]" aria-hidden="true">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{text}</span>
        {!icon && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
      </div>
    </>
  );

  const baseClasses = `group relative inline-flex cursor-pointer border-2 border-[#EA580C] bg-[#EA580C] rounded-xl overflow-hidden text-white text-center text-[15px] font-semibold whitespace-nowrap shadow-[0_4px_14px_rgba(234,88,12,0.2)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.3)] active:scale-95 transition-all duration-300 px-6 py-3 focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2 ${className}`;

  if (isButton) {
    return (
      <button type={type} onClick={handleClick} className={baseClasses} aria-label={text}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href || "#"} onClick={handleClick} className={baseClasses} aria-label={text}>
      {content}
    </Link>
  );
}

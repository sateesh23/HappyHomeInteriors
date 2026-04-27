"use client";

import React from "react";
import { LumaSpin } from "@/components/ui/luma-spin";

export default function Loading() {
  return (
    <div suppressHydrationWarning className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        <LumaSpin />
        
        <p className="mt-16 text-[#EA580C] text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
          Loading Excellence
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function ErrorProjects({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Projects Error:", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-white text-center px-4">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-3xl font-black text-[#0D0D0D] mb-4 tracking-tight">Something went wrong!</h2>
      <p className="text-[#6B5F4B] max-w-md mx-auto mb-8 leading-relaxed">
        We couldn't load the projects portfolio. Please try reloading the page or contact our team if the issue persists.
      </p>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="bg-[#EA580C] text-white px-8 py-3.5 rounded-lg font-bold text-[15px] hover:bg-[#D94A08] transition-colors shadow-lg shadow-[#EA580C]/20"
        >
          Try Again
        </button>
        <AnimatedButton href="/contact" text="Contact Support" />
      </div>
    </main>
  );
}

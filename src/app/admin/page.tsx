"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? "Incorrect password. Please try again.");
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#FFF8F5] flex items-center justify-center px-5 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-[#EA580C]/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[15%] right-[10%] w-[450px] h-[450px] bg-orange-50/50 rounded-full blur-[110px] animate-pulse" />
      </div>

      <div className="w-full max-w-[440px] z-10">
        {/* Branding Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="group relative">
            <div className="absolute inset-0 bg-orange-400/20 blur-2xl rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-24 h-24 rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(234,88,12,0.15)] bg-white p-1 transform group-hover:scale-[1.03] transition-all duration-500 ease-out">
              <Image
                src="/images/IMG_6359.JPG"
                alt="Happy Home Interiors"
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-[24px]"
                priority
              />
            </div>
          </div>
          
          <div className="mt-8 space-y-2">
            <h1 className="text-4xl font-black text-[#0D0D0D] tracking-tight font-playfair">
              Happy Home <span className="text-[#EA580C]">Interiors</span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-gray-200" />
              <p className="text-[#EA580C] font-black text-[11px] tracking-[0.25em] uppercase">Admin Portal</p>
              <div className="h-px w-8 bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Elegant Login Card */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/80 rounded-[40px] p-8 sm:p-11 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] ring-1 ring-black/5 overflow-hidden relative">
          {/* Subtle top highlights */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-200/50 to-transparent" />
          
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-orange-50/50 flex items-center justify-center mb-5 ring-1 ring-orange-100/50">
              <Lock className="w-6 h-6 text-[#EA580C]" />
            </div>
            <h2 className="text-[#0D0D0D] font-bold text-2xl tracking-tight">Secure Access</h2>
            <p className="text-[#6B5F4B] text-sm mt-3 font-medium">Verify your credentials to manage workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="space-y-2.5">
              <label htmlFor="admin-password" className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white/50 border border-gray-100 rounded-2xl px-6 py-4.5 text-[#0D0D0D] text-base placeholder-gray-300 focus:outline-none focus:border-[#EA580C] focus:ring-[6px] focus:ring-[#EA580C]/5 transition-all font-semibold shadow-sm hover:border-orange-100"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50/60 backdrop-blur-sm border border-red-100 rounded-2xl px-5 py-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <p className="text-red-700 text-[13px] font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending || !password}
              className="group w-full relative h-[60px] overflow-hidden rounded-2xl bg-[#0D0D0D] text-white transition-all duration-300 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#EA580C] to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-3 font-black text-sm tracking-widest uppercase">
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Authorize <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
        
        <div className="mt-12 text-center space-y-1">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Happy Home Interiors · Security Protocol
          </p>
          <div className="flex justify-center gap-4 text-[10px] font-bold text-gray-300 uppercase underline decoration-gray-200/50 underline-offset-4 pointer-events-none">
            <span>Encrypted Connection</span>
            <span>Auth v1.2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

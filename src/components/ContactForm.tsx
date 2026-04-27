"use client";

import { useState } from "react";
import { BUSINESS_DETAILS } from "@/constants/content";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName  = formData.get("firstName") as string;
    const lastName   = formData.get("lastName") as string;
    const email      = formData.get("email") as string;
    const phone      = formData.get("phone") as string;
    const message    = formData.get("message") as string;

    const text = `Hi Happy Home Interiors,\n\nI'd like to enquire about a design consultation.\n\n*Name:* ${firstName} ${lastName}\n*Email:* ${email}\n*Phone:* ${phone}\n\n*Message:* ${message || "N/A"}`;
    const whatsappUrl = `https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      window.open(whatsappUrl, "_blank");
    }, 500);
  };

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-12 h-12 rounded-full bg-[#EA580C]/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-[#EA580C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-bold text-[#0D0D0D] text-lg mb-1">Message sent!</h3>
        <p className="text-[#6B5F4B] text-sm">Redirecting you to WhatsApp to complete your enquiry.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* First name + Last name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-xs text-[#6B5F4B] mb-1.5">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="First name"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:bg-white transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs text-[#6B5F4B] mb-1.5">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs text-[#6B5F4B] mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:bg-white transition-colors"
        />
      </div>

      {/* Phone number */}
      <div>
        <label htmlFor="phone" className="block text-xs text-[#6B5F4B] mb-1.5">
          Phone number
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 border border-r-0 border-gray-200 rounded-l-xl bg-gray-50 text-[#6B5F4B] text-sm">
            +91
          </span>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Phone number"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-r-xl px-4 py-2.5 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs text-[#6B5F4B] mb-1.5">
          Enter your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your project, room dimensions, style preferences…"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#EA580C] hover:bg-[#C2410C] active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 disabled:opacity-60"
      >
        {loading ? "Connecting…" : "Send message"}
      </button>

      <p className="text-center text-[10px] text-gray-400">
        By submitting this form you agree to our{" "}
        <span className="underline cursor-pointer">privacy policy</span>.
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { BUSINESS_DETAILS } from "@/constants/content";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /**
   * Primary user flow: Lead submission
   * 1. User fills first name, last name, email, phone, message
   * 2. Form validates required fields (firstName, phone)
   * 3. Constructs WhatsApp deep link with form data
   * 4. Opens WhatsApp in new tab for direct messaging
   */
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
      <div className="text-center py-10" role="status" aria-live="polite">
        <div className="w-12 h-12 rounded-full bg-[#EA580C]/10 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
          <svg className="w-6 h-6 text-[#EA580C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-bold text-[#0D0D0D] text-lg mb-1">Message sent!</h3>
        <p className="text-[#6B5F4B] text-sm">Redirecting you to WhatsApp to complete your enquiry.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Contact form — Book a free consultation">

      {/* First name + Last name */}
      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
        <legend className="sr-only">Your name</legend>
        <div>
          <label htmlFor="contact-firstName" className="block text-xs text-[#6B5F4B] mb-1.5 font-medium">
            First name <span className="text-[#EA580C]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-firstName"
            name="firstName"
            type="text"
            required
            aria-required="true"
            autoComplete="given-name"
            placeholder="First name"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 focus:bg-white transition-colors"
          />
        </div>
        <div>
          <label htmlFor="contact-lastName" className="block text-xs text-[#6B5F4B] mb-1.5 font-medium">
            Last name
          </label>
          <input
            id="contact-lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 focus:bg-white transition-colors"
          />
        </div>
      </fieldset>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-xs text-[#6B5F4B] mb-1.5 font-medium">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 focus:bg-white transition-colors"
        />
      </div>

      {/* Phone number */}
      <div>
        <label htmlFor="contact-phone" className="block text-xs text-[#6B5F4B] mb-1.5 font-medium">
          Phone number <span className="text-[#EA580C]" aria-hidden="true">*</span>
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 border border-r-0 border-gray-200 rounded-l-xl bg-gray-50 text-[#6B5F4B] text-sm" aria-hidden="true">
            +91
          </span>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            aria-required="true"
            autoComplete="tel-national"
            placeholder="Phone number"
            pattern="[0-9]{10}"
            inputMode="numeric"
            aria-describedby="phone-hint"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-r-xl px-4 py-2.5 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 focus:bg-white transition-colors"
          />
        </div>
        <p id="phone-hint" className="sr-only">Enter your 10-digit Indian mobile number</p>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-xs text-[#6B5F4B] mb-1.5 font-medium">
          Enter your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell us about your project, room dimensions, style preferences…"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#0D0D0D] placeholder-gray-400 focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        aria-label={loading ? "Submitting your consultation request" : "Submit consultation request"}
        className="w-full bg-[#EA580C] hover:bg-[#C2410C] active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 disabled:opacity-60 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2"
      >
        {loading ? "Connecting…" : "Send message"}
      </button>

      <p className="text-center text-[10px] text-gray-400">
        By submitting this form you agree to our{" "}
        <a href="/privacy" className="underline cursor-pointer hover:text-[#EA580C]">privacy policy</a>.
      </p>
    </form>
  );
}

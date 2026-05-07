import { Metadata } from "next";
import { BUSINESS_DETAILS } from "@/constants/content";
import ContactForm from "@/components/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Headphones,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import dynamic from "next/dynamic";

const GoogleReviewsMarquee = dynamic(() => import("@/components/GoogleReviewsMarquee"), {
  ssr: true,
});

const BASE_URL = "https://happyhomeinteriors.in";

export const metadata: Metadata = {
  title: "Contact Happy Home Interiors | Free Design Consultation Visakhapatnam",
  description:
    "Book a free interior design consultation in Visakhapatnam. Call, WhatsApp, or fill our form. We serve Vizag, Vijayawada, Hyderabad, Tirupati & more cities across AP & Telangana.",
  keywords: ["contact happy home interiors", "interior design consultation visakhapatnam", "book interior designer vizag", "reach happy home interiors"],
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact Happy Home Interiors | Free Design Consultation Visakhapatnam",
    description: "Book a free interior design consultation. We serve Vizag, Vijayawada, Hyderabad, Tirupati & more cities across AP & Telangana.",
    url: `${BASE_URL}/contact`,
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Happy Home Interiors | Free Design Consultation Visakhapatnam",
    description: "Book a free interior design consultation in Visakhapatnam. Call, WhatsApp, or fill our form.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

const contactBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
    { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${BASE_URL}/contact` },
  ],
};

const localBusinessContactSchema = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  "name": "Happy Home Interiors",
  "url": BASE_URL,
  "telephone": "+919177699570",
  "email": "happyhomeinteriorsvizag@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Akkayapalem",
    "addressLocality": "Visakhapatnam",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "530016",
    "addressCountry": "IN",
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "19:00",
  },
};


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-28 pb-0">

      {/* ── SECTION 1: Hero — Contact Info + Form Split ─── */}
      <section aria-label="Contact information and consultation form" className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT COLUMN — Contact Information */}
          <div className="flex flex-col">
            <SectionLabel centered={false}>Contact Us</SectionLabel>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D0D0D] leading-[1.1] mb-4 tracking-tight">
              Let&apos;s <span className="text-[#EA580C]">Design</span> Your Dream Home
            </h1>

            <p className="text-[#6B5F4B] text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Email, call, or complete the form to learn how Happy Home Interiors can transform your space. Our team responds within 24 hours.
            </p>

            {/* Direct contact links */}
            <address className="not-italic space-y-4 mb-10">
              <a
                href={`mailto:${BUSINESS_DETAILS.email}`}
                className="flex items-center gap-3 text-[#0D0D0D] hover:text-[#EA580C] transition-colors group cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#EA580C]" aria-hidden="true" />
                <span className="text-sm font-medium">{BUSINESS_DETAILS.email}</span>
              </a>
              <a
                href={`tel:${BUSINESS_DETAILS.phone}`}
                className="flex items-center gap-3 text-[#0D0D0D] hover:text-[#EA580C] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#EA580C]" aria-hidden="true" />
                <span className="text-sm font-medium">{BUSINESS_DETAILS.phone}</span>
              </a>
            </address>
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hi, I'd like a free consultation for my home interiors.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#EA580C] text-sm font-bold hover:underline mt-1 cursor-pointer"
              aria-label="Chat with us on WhatsApp"
            >
              Chat on WhatsApp <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            {/* Support cards — 3 across */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#EA580C]/10 flex items-center justify-center mb-3">
                  <Headphones className="w-5 h-5 text-[#EA580C]" />
                </div>
                <h3 className="font-bold text-[#0D0D0D] text-sm mb-1">Design Support</h3>
                <p className="text-[#6B5F4B] text-xs leading-relaxed">
                  Our team is available to address any design queries you may have.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#EA580C]/10 flex items-center justify-center mb-3">
                  <MessageCircle className="w-5 h-5 text-[#EA580C]" />
                </div>
                <h3 className="font-bold text-[#0D0D0D] text-sm mb-1">Free Consultation</h3>
                <p className="text-[#6B5F4B] text-xs leading-relaxed">
                  Book a no-obligation consultation. We visit your home and plan together.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#EA580C]/10 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-[#EA580C]" />
                </div>
                <h3 className="font-bold text-[#0D0D0D] text-sm mb-1">Quick Response</h3>
                <p className="text-[#6B5F4B] text-xs leading-relaxed">
                  We reply within 24 hours. Urgent? Call us directly anytime.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Form Card */}
          <div className="w-full">
            <div id="form" className="border border-gray-200 rounded-[28px] p-6 sm:p-10 bg-white shadow-[0_8px_40px_rgb(0,0,0,0.06)]">
              <h2 className="text-xl sm:text-2xl font-black text-[#0D0D0D] mb-1 text-center">Get in Touch</h2>
              <p className="text-[#6B5F4B] text-xs sm:text-sm mb-6 text-center">You can reach us anytime</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Location + Map ─────────────────────── */}
      <section className="bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Map */}
            <div className="w-full rounded-[28px] overflow-hidden border border-gray-200 shadow-[0_8px_40px_rgb(0,0,0,0.06)] h-72 sm:h-80 lg:h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.3271!2d83.334!3d17.7231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395b7e!2sVisakhapatnam!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office location"
              />
            </div>

            {/* Location Info */}
            <div className="flex flex-col justify-center">
              <SectionLabel centered={false}>Our Location</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0D] leading-[1.1] mb-6 tracking-tight">
                Visit Our <span className="text-[#EA580C]">Studio</span>
              </h2>

              <div className="mb-6">
                <h3 className="font-bold text-[#0D0D0D] text-base mb-2">Headquarters</h3>
                <div className="text-[#6B5F4B] text-sm leading-relaxed space-y-1">
                  <p>Happy Home Interiors</p>
                  <p>{BUSINESS_DETAILS.location}</p>
                  <p>Andhra Pradesh, 530016</p>
                  <p>India</p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Akkayapalem+Visakhapatnam"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[#EA580C] text-sm font-bold hover:underline"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Google Reviews ──────────────────────── */}
      <GoogleReviewsMarquee />

      {/* ── Service Areas strip ───────────────────────────── */}
      <section className="bg-[#EA580C]/5 border-t border-[#EA580C]/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-12 text-center">
          <SectionLabel>We Serve Across</SectionLabel>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-2">
            {["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Hyderabad", "Secunderabad", "Warangal", "Chennai"].map((city) => (
              <span
                key={city}
                className="text-xs sm:text-sm font-bold text-[#6B5F4B] bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-gray-200 shadow-sm"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessContactSchema) }} />
    </main>
  );
}

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
  Star,
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
    <main className="min-h-screen bg-gray-50/20 pt-24 pb-20">

      {/* ── SECTION 1: Info + Form ─────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 flex flex-col items-center text-center">

        {/* Top: Info column */}
        <div className="mb-12 flex flex-col items-center">
          <SectionLabel>Contact us</SectionLabel>
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#0D0D0D] leading-[1.1] mb-6 font-playfair">
            We&apos;re here to <span className="text-[#EA580C]">help</span>
          </h1>
          <p className="text-[#6B5F4B] text-[16px] leading-relaxed mb-10 max-w-2xl font-dmsans">
            Need a design consultation or have a question? Reach out — call, email,
            or fill the form. Tirupathi Rao&apos;s team will get back to you fast.
          </p>

          {/* Contact details pills */}
          <div className="flex flex-row flex-wrap gap-2.5 sm:gap-4 justify-center items-center">
            <div className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm hover:border-[#EA580C]/30 hover:shadow-md transition-all duration-300">
              <Mail className="w-3.5 h-3.5 text-[#EA580C]" />
              <a
                href={`mailto:${BUSINESS_DETAILS.email}`}
                className="text-[#0D0D0D] text-[12px] sm:text-sm font-bold hover:text-[#EA580C] transition-colors"
                title={BUSINESS_DETAILS.email}
              >
                Email
              </a>
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm hover:border-[#EA580C]/30 hover:shadow-md transition-all duration-300">
              <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
              <a
                href={`tel:${BUSINESS_DETAILS.phone}`}
                className="text-[#0D0D0D] text-[12px] sm:text-sm font-bold hover:text-[#EA580C] transition-colors"
              >
                Call
              </a>
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm">
              <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
              <span className="text-[#0D0D0D] text-[12px] sm:text-sm font-bold whitespace-nowrap">
                9 AM – 7 PM
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Form card */}
        <div id="form" className="w-full max-w-3xl border border-gray-200 rounded-[28px] p-8 sm:p-12 bg-white shadow-[0_8px_40px_rgb(0,0,0,0.06)]">
          <h2 className="text-2xl font-bold text-[#0D0D0D] mb-8 font-dmsans">Send a Request</h2>
          <ContactForm />
        </div>
      </section>

      {/* ── SECTION 2: Location + Map ─────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 flex flex-col items-center text-center">

        {/* Location details */}
        <div className="mb-12 flex flex-col items-center">
          <SectionLabel>Our location</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] leading-[1.1] mb-6 font-playfair">
            Find our studio
          </h2>
          <p className="text-[#6B5F4B] text-[16px] leading-relaxed mb-8 max-w-2xl font-dmsans">
            Come visit us for a walkthrough of our material samples, finish
            options, and 3D design previews. Or connect with us online.
          </p>
        </div>

        {/* Map embed */}
        <div className="w-full rounded-[28px] overflow-hidden border border-gray-200 shadow-[0_8px_40px_rgb(0,0,0,0.06)] h-80 lg:h-[450px]">
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
      </section>

      {/* ── SECTION 3: Support cards ──────────────────────── */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <div className="flex flex-col items-center text-center mb-16">
            <SectionLabel>Support</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] leading-[1.1] mb-6 font-playfair">
              Other ways to connect
            </h2>
            <p className="text-[#6B5F4B] text-[16px] max-w-2xl font-dmsans">
              Explore more options and find what you&apos;re looking for — free consultation,
              design support, or a pricing estimate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {/* Card 1 */}
            <div className="flex flex-col items-center text-center bg-gray-50 border border-gray-200 rounded-[28px] p-8 lg:p-10 hover:border-[#EA580C] hover:shadow-[0_8px_30px_rgba(234,88,12,0.08)] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-6 group-hover:border-[#EA580C] transition-colors shadow-sm">
                <MessageCircle className="w-6 h-6 text-[#EA580C]" />
              </div>
              <h3 className="font-bold text-[#0D0D0D] text-[18px] mb-3 font-dmsans">WhatsApp Chat</h3>
              <p className="text-[#6B5F4B] text-sm leading-relaxed mb-8 flex-grow">
                Fastest way to reach us. Chat directly with our design team on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}?text=Hi, I'd like a free consultation for my home interiors.`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex justify-center items-center gap-2 text-[14px] font-bold text-[#EA580C] border-2 border-[#EA580C]/20 bg-white px-6 py-3.5 rounded-xl hover:bg-[#EA580C] hover:text-white transition-all duration-300"
              >
                Chat now
              </a>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center bg-gray-50 border border-gray-200 rounded-[28px] p-8 lg:p-10 hover:border-[#EA580C] hover:shadow-[0_8px_30px_rgba(234,88,12,0.08)] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-6 group-hover:border-[#EA580C] transition-colors shadow-sm">
                <Headphones className="w-6 h-6 text-[#EA580C]" />
              </div>
              <h3 className="font-bold text-[#0D0D0D] text-[18px] mb-3 font-dmsans">Call us directly</h3>
              <p className="text-[#6B5F4B] text-sm leading-relaxed mb-8 flex-grow">
                Speak with Tirupathi Rao personally and get answers to all your design questions.
              </p>
              <a
                href={`tel:${BUSINESS_DETAILS.phone}`}
                className="w-full flex justify-center items-center gap-2 text-[14px] font-bold text-[#EA580C] border-2 border-[#EA580C]/20 bg-white px-6 py-3.5 rounded-xl hover:bg-[#EA580C] hover:text-white transition-all duration-300"
              >
                Call now
              </a>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center bg-gray-50 border border-gray-200 rounded-[28px] p-8 lg:p-10 hover:border-[#EA580C] hover:shadow-[0_8px_30px_rgba(234,88,12,0.08)] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mb-6 group-hover:border-[#EA580C] transition-colors shadow-sm">
                <Star className="w-6 h-6 text-[#EA580C]" />
              </div>
              <h3 className="font-bold text-[#0D0D0D] text-[18px] mb-3 font-dmsans">Free consultation</h3>
              <p className="text-[#6B5F4B] text-sm leading-relaxed mb-8 flex-grow">
                Book a no-obligation design consultation. We come to your home and plan together.
              </p>
              <Link
                href="/contact#form"
                className="w-full flex justify-center items-center gap-2 text-[14px] font-bold text-[#EA580C] border-2 border-[#EA580C]/20 bg-white px-6 py-3.5 rounded-xl hover:bg-[#EA580C] hover:text-white transition-all duration-300"
              >
                Book now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Google Reviews ──────────────────────── */}
      <GoogleReviewsMarquee />

      {/* ── Service Areas strip ───────────────────────────── */}
      <section className="bg-[#EA580C]/5 border-t border-[#EA580C]/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 text-center">
          <SectionLabel>We serve across</SectionLabel>
          <div className="flex flex-wrap justify-center gap-3">
            {["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Hyderabad", "Secunderabad", "Warangal", "Chennai"].map((city) => (
              <span
                key={city}
                className="text-sm font-bold text-[#6B5F4B] bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm"
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

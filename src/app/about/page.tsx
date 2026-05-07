import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS_DETAILS } from "@/constants/content";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import SectionLabel from "@/components/ui/SectionLabel";
import AwardsSection from "@/components/AwardsSection";
import CTABanner from "@/components/CTASection";
import ServicesGrid from "@/components/about/ServicesGrid";

const BASE_URL = "https://happyhomeinteriors.in";

export const metadata: Metadata = {
  title: "About Us | 12+ Years of Interior Design Excellence | Happy Home Interiors",
  description:
    "Meet the team behind 5,000+ beautifully designed homes in AP & Telangana. Asian Paints Gold Contractor. Trusted by families across Visakhapatnam since 2012.",
  keywords: ["about happy home interiors", "best interior design team visakhapatnam", "tirupathi rao interior designer", "top interior company in ap", "interior design experts andhra pradesh"],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About Us | 12+ Years of Interior Design Excellence | Happy Home Interiors",
    description: "Meet the team behind 5,000+ beautifully designed homes in AP & Telangana. Asian Paints Gold Contractor. Trusted by families across Visakhapatnam since 2012.",
    url: `${BASE_URL}/about`,
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Happy Home Interiors Founder Tirupathi Rao Visakhapatnam" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | 12+ Years of Interior Design Excellence | Happy Home Interiors",
    description: "Meet the team behind 5,000+ beautifully designed homes in AP & Telangana.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
    { "@type": "ListItem", "position": 2, "name": "About", "item": `${BASE_URL}/about` },
  ],
};


export default function AboutPage() {
  return (
    <main
      suppressHydrationWarning
      className="min-h-screen bg-white text-[#0D0D0D] overflow-hidden pt-24 sm:pt-28"
    >
      {/* ── PAGE HEADER — Center Aligned ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-4 sm:pt-10 sm:pb-6 text-center">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-[#6B5F4B] mb-3 sm:mb-4 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#EA580C] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-[#EA580C]">About Us</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D0D0D] leading-[1.15] tracking-tight mb-2 sm:mb-3">
          The Story Behind <span className="text-[#EA580C]">5,000+</span> Happy Homes
        </h1>
        <p className="text-[#6B5F4B] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          12+ years of designing, building, and delivering dream homes across Andhra Pradesh &amp; Telangana — with zero families left mid-project.
        </p>
      </section>

      {/* ── 1. FOUNDER SECTION ── */}
      <section
        suppressHydrationWarning
        className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14 lg:py-16"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">

          {/* Founder Photo */}
          <div className="w-full lg:w-[38%] flex-shrink-0">
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] mx-auto lg:mx-0 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/services/founderimage.png"
                alt="Tirupathi Rao — Founder of Happy Home Interiors, Visakhapatnam"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 38vw"
              />
            </div>
          </div>

          {/* Founder Copy */}
          <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
            <SectionLabel centered={false} className="lg:text-left text-center">The Person Behind Every Project</SectionLabel>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0D] leading-[1.15] mb-4 sm:mb-5 tracking-tight">
              Your Home Deserves Someone Who&apos;s Done This <span className="text-[#EA580C]">5,000</span> Times.
            </h2>

            <div className="space-y-3 sm:space-y-4 text-[#6B5F4B] text-[14px] sm:text-[16px] leading-relaxed">
              <p>
                Happy Home Interiors was built on one belief: every family in Andhra Pradesh and Telangana deserves a home they&apos;re genuinely proud of. Over 12+ years, we&apos;ve turned that belief into a proven system for modular kitchens, wardrobes, false ceilings, turnkey projects, and full home construction.
              </p>
              <p>
                Every kitchen, wardrobe, and ceiling is planned around how your family actually lives — not how it looks in a catalogue. We engineer your home to work for decades, not just for the photoshoot.
              </p>
              <p>
                Our work has earned recognition from the Rotary Club, BNI, and India&apos;s most respected building material brands — because 5,000+ families chose to tell other families about us.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
              <AnimatedButton
                text="See How We Work →"
                href="/services"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. AWARDS & RECOGNITION ── */}
      <AwardsSection />

      {/* ── 3. SERVICES SECTION ── */}
      <ServicesGrid />

      {/* ── 4. MEET THE TEAM ── */}
      <section
        suppressHydrationWarning
        className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 text-center"
      >
        <SectionLabel>The People You&apos;ll Work With</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0D0D0D] mb-3 sm:mb-4 leading-tight">
          Every Person on This Team Has Stood Inside Your <span className="text-[#EA580C]">Future</span> Home.
        </h2>
        <p className="text-[#6B5F4B] text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          Our designers, site supervisors, and project managers visit, measure, and problem-solve on-site. 5,000+ homes delivered — zero families left mid-project.
        </p>

        {/* Landscape Team Image */}
        <div className="w-full aspect-[16/9] sm:aspect-[2.35/1] bg-gray-100 rounded-2xl sm:rounded-[48px] overflow-hidden relative shadow-2xl">
          <Image
            src="/images/Team_image.png"
            alt="The Happy Home Interiors team — designers, site supervisors and project managers"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-[#9C8F80] font-medium">
          The team behind 5,000+ happy homes across AP &amp; Telangana.
        </p>
      </section>

      {/* ── 5. FINAL CTA BANNER ── */}
      <CTABanner />

      {/* Breadcrumb JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </main>
  );
}

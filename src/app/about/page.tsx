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
      className="min-h-screen bg-white text-[#0D0D0D] overflow-hidden pt-28"
    >
      {/* ── 1. FOUNDER SECTION ── */}
      <section
        suppressHydrationWarning
        className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24"
      >
        {/* Breadcrumb */}
        <div className="text-sm font-semibold text-[#6B5F4B] mb-12 tracking-widest uppercase text-center">
          <Link href="/" className="hover:text-[#EA580C] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#EA580C]">Our Story</span>
        </div>

        {/* Two-column layout: photo left, copy right */}
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          {/* Founder Photo — rectangular portrait, no circle */}
          <div className="w-full lg:w-2/5 flex-shrink-0">
            <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/founderimage.png"
                alt="Founder of Happy Home Interiors — 12+ years of interior design experience"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Founder Copy */}
          <div className="flex-1 flex flex-col justify-center">
            <SectionLabel centered={false}>The Person Behind Every Project</SectionLabel>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-[#0D0D0D] leading-[1.1] mb-8 tracking-tight">
              Your Home Deserves Someone Who&apos;s Done This <span className="text-[#EA580C]">5,000</span> Times.
            </h1>

            <div className="space-y-5 text-[#6B5F4B] text-[17px] leading-relaxed">
              <p>
                Happy Home Interiors was built on one belief: that every family in Andhra Pradesh and Telangana deserves a home they are genuinely proud of — not just one that &ldquo;looks okay.&rdquo; Over 12+ years, we have turned that belief into a proven system for modular kitchens, wardrobes, false ceilings, turnkey projects, and full home construction. Quality and durability are not a promise here — they are the only standard we know.
              </p>
              <p>
                Our team combines sharp aesthetic design with practical, hands-on execution. Every kitchen, every wardrobe, every ceiling is planned around how your family actually lives — not how it looks in a catalogue. From TV units to lighting concepts to space optimization, we engineer your home to work for you for decades, not just for the photoshoot.
              </p>
              <p>
                Beyond design, our work has earned recognition from the Rotary Club (End Polio Chair Member), BNI, and some of India&apos;s most respected building material brands. Not because we chased awards — but because 5,000+ families chose to tell other families about us.
              </p>
            </div>

            <div className="mt-10">
              <AnimatedButton
                text="See How We Work →"
                href="/services"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. AWARDS & RECOGNITION (from homepage) ── */}
      <AwardsSection />


      {/* ── 4. SERVICES SECTION ── */}
      <ServicesGrid />

      {/* ── 5. MEET THE TEAM ── */}
      <section
        suppressHydrationWarning
        className="max-w-7xl mx-auto px-5 sm:px-8 py-24 text-center"
      >
        <SectionLabel>The People You&apos;ll Work With</SectionLabel>
        <h2 className="text-4xl sm:text-5xl font-black text-[#0D0D0D] mb-6 leading-tight">
          Every Person on This Team Has Stood Inside Your <span className="text-[#EA580C]">Future</span> Home.
        </h2>
        <p className="text-[#6B5F4B] text-lg max-w-3xl mx-auto mb-14 leading-relaxed">
          Our designers, site supervisors, and project managers do not just work from plans — they visit, they measure, they problem-solve on-site. This is the team that has delivered 5,000+ homes without a single family being left mid-project.
        </p>

        {/* Landscape Team Image */}
        <div className="w-full aspect-[16/9] sm:aspect-[2.35/1] bg-gray-100 rounded-[32px] sm:rounded-[48px] overflow-hidden relative shadow-2xl">
          <Image
            src="/images/Team_image.png"
            alt="The Happy Home Interiors team — designers, site supervisors and project managers"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <p className="mt-6 text-sm text-[#9C8F80] font-medium">
          The team behind 5,000+ happy homes across AP &amp; Telangana.
        </p>
      </section>

      {/* ── 6. FINAL CTA BANNER ── */}
      <CTABanner />

      {/* Breadcrumb JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </main>
  );
}

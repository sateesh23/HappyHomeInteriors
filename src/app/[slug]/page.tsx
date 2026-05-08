import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SERVICE_LOCATION_PAGES } from "@/data/serviceLocationPages";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import SectionLabel from "@/components/ui/SectionLabel";
import CTABanner from "@/components/CTASection";

const BASE_URL = "https://happyhomeinteriorsvizag.com";

export async function generateStaticParams() {
  return SERVICE_LOCATION_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = SERVICE_LOCATION_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Happy Home Interiors" };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `${BASE_URL}/${slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${BASE_URL}/${slug}`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function ServiceLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = SERVICE_LOCATION_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": page.title,
    "description": page.metaDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Happy Home Interiors",
      "telephone": "+919177699570",
      "address": { "@type": "PostalAddress", "addressLocality": "Visakhapatnam", "addressRegion": "Andhra Pradesh", "addressCountry": "IN" },
    },
    "areaServed": { "@type": "City", "name": "Visakhapatnam" },
  };

  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-28 pb-0">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <nav className="text-xs font-semibold text-[#6B5F4B] mb-4 tracking-widest uppercase">
              <Link href="/" className="hover:text-[#EA580C] transition-colors">Home</Link>
              <span className="mx-2 text-gray-300">/</span>
              <Link href="/services" className="hover:text-[#EA580C] transition-colors">Services</Link>
              <span className="mx-2 text-gray-300">/</span>
              <span className="text-[#EA580C]">{page.title}</span>
            </nav>
            <SectionLabel centered={false}>{page.title} in Vizag</SectionLabel>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black text-[#0D0D0D] leading-[1.1] tracking-tight mb-5">
              {page.h1}
            </h1>
            <p className="text-[#6B5F4B] text-base leading-relaxed mb-8 font-medium">{page.intro}</p>
            <div className="flex flex-wrap gap-3">
              <AnimatedButton href="/contact#form" text="Get Free Consultation →" openModal={true} />
              <Link
                href={`/services#${page.serviceId}`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-[#EA580C]/20 text-[#EA580C] font-bold text-sm hover:bg-[#EA580C]/5 transition-all"
              >
                View Designs
              </Link>
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <Image src={page.image} alt={page.h1} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="space-y-5">
            {page.content.map((para, i) => (
              <p key={i} className="text-[#6B5F4B] text-base leading-relaxed font-medium">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <SectionLabel>Frequently Asked Questions</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-8 text-center">
          Common Questions About {page.title} in <span className="text-[#EA580C]">Visakhapatnam</span>
        </h2>
        <div className="space-y-4">
          {page.faqs.map((faq, i) => (
            <details key={i} className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-[#0D0D0D] font-bold text-[15px] leading-snug list-none">
                {faq.q}
                <span className="flex-shrink-0 ml-4 w-6 h-6 rounded-full bg-[#EA580C]/5 text-[#EA580C] flex items-center justify-center text-sm font-bold group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-5 text-[#6B5F4B] text-sm leading-relaxed font-medium">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Areas Served */}
      <section className="bg-[#EA580C]/5 border-t border-[#EA580C]/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-12 text-center">
          <SectionLabel>Areas We Serve for {page.title}</SectionLabel>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-3">
            {page.areas.map((area) => (
              <span key={area} className="text-xs sm:text-sm font-bold text-[#6B5F4B] bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-gray-200 shadow-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </main>
  );
}

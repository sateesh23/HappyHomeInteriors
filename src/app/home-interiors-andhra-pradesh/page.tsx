import { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import CTABanner from "@/components/CTASection";
import dynamic from "next/dynamic";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/seo";

const MaterialBrands = dynamic(() => import("@/components/MaterialBrands"), { ssr: true });
const GoogleReviewsMarquee = dynamic(() => import("@/components/GoogleReviewsMarquee"), { ssr: true });

const BASE_URL = "https://happyhomeinteriors.in";

const CITIES_AP = ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kakinada", "Rajamahendravaram"];
const CITIES_TS = ["Hyderabad", "Secunderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"];

const FAQS_AP = [
  { q: "Who are the best interior designers in Andhra Pradesh?", a: "Happy Home Interiors is rated 4.9/5 with 5,000+ projects completed across Andhra Pradesh. We serve all major cities including Visakhapatnam, Vijayawada, Guntur, Tirupati, and Nellore with modular kitchens, full home interiors, and turnkey projects." },
  { q: "How much does interior design cost in Andhra Pradesh?", a: "Interior design costs in AP range from ₹5–7 Lakhs for a basic 2BHK to ₹20+ Lakhs for premium turnkey. Costs vary by city — Visakhapatnam and Vijayawada tend to be similar, while smaller cities are 10–15% lower." },
  { q: "Does Happy Home Interiors serve all of Andhra Pradesh?", a: "Yes. We have executed projects across all major cities in AP. Our headquarters are in Visakhapatnam with project teams covering Vijayawada, Guntur, Tirupati, Nellore, Kakinada, and Rajamahendravaram." },
];

const FAQS_TS = [
  { q: "Who are the best interior designers in Telangana?", a: "Happy Home Interiors serves Hyderabad, Secunderabad, Warangal, and other cities in Telangana. We are rated 4.9/5 on Google with 5,000+ completed projects across AP and Telangana." },
  { q: "How much does interior design cost in Hyderabad?", a: "Interior design in Hyderabad ranges from ₹6–8 Lakhs for a basic 2BHK to ₹25+ Lakhs for premium turnkey interiors. Costs are slightly higher than other Telangana cities due to premium material availability." },
];

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const isAP = true; // This page is always AP
  const state = "Andhra Pradesh";
  return {
    title: `Best Interior Designers in ${state} | Happy Home Interiors`,
    description: `Award-winning interior designers serving all of ${state}. Modular kitchens, full home turnkey, wardrobes, false ceilings. 5,000+ homes delivered. Free consultation.`,
    keywords: [`interior designers ${state}`, `home interiors ${state}`, `modular kitchen ${state}`, "best interior designers AP"],
    alternates: { canonical: `${BASE_URL}/home-interiors-andhra-pradesh` },
    openGraph: {
      title: `Best Interior Designers in ${state} | Happy Home Interiors`,
      description: `Award-winning interior designers serving all of ${state}. 5,000+ homes delivered.`,
      url: `${BASE_URL}/home-interiors-andhra-pradesh`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default function APInteriors() {
  const state = "Andhra Pradesh";
  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-28 pb-0">
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Andhra Pradesh" }]} />
        <SectionLabel>Interior Design Across {state}</SectionLabel>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D0D0D] leading-[1.1] tracking-tight mb-5 max-w-4xl">
          Best Interior Designers in <span className="text-[#EA580C]">{state}</span>
        </h1>
        <p className="text-[#6B5F4B] text-base leading-relaxed mb-8 max-w-3xl">
          Happy Home Interiors is the most trusted interior design company in Andhra Pradesh with 12+ years of experience and 5,000+ completed projects. We serve every major city with modular kitchens, full home turnkey interiors, false ceilings, wardrobes, and commercial construction.
        </p>
        <AnimatedButton href="/contact#form" text="Get Free Consultation →" openModal={true} />
      </section>

      {/* Cities Grid */}
      <section className="bg-gray-50 border-y border-gray-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionLabel>Cities We Serve in {state}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-8 text-center">
            Interior Design Services Across <span className="text-[#EA580C]">{state}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CITIES_AP.map((city) => (
              <Link key={city} href={`/interior-designers-${city.toLowerCase()}`}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#EA580C]/20 transition-all group text-center"
              >
                <span className="text-lg font-black text-[#0D0D0D] group-hover:text-[#EA580C] transition-colors">{city}</span>
                <span className="block text-[10px] font-bold text-[#EA580C] uppercase tracking-widest mt-1">View Services →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <SectionLabel>Frequently Asked Questions</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-8 text-center">
          Interior Design in <span className="text-[#EA580C]">{state}</span>
        </h2>
        <div className="space-y-4">
          {FAQS_AP.map((faq, i) => (
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

      <GoogleReviewsMarquee />
      <MaterialBrands />
      <CTABanner />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema("Visakhapatnam", state, "home-interiors-andhra-pradesh")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS_AP)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", path: "/" }, { name: state, path: "/home-interiors-andhra-pradesh" }])) }} />
    </main>
  );
}

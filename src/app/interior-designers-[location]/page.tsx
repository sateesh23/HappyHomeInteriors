import { Metadata } from "next";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import dynamic from "next/dynamic";
import { SERVICES, PROJECTS, type Service, type Project } from "@/constants/content";
import { getSupabaseClient } from "@/lib/supabase";
import SectionLabel from "@/components/ui/SectionLabel";

const AwardsSection = dynamic(() => import("@/components/AwardsSection"), { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-64 w-full bg-gray-50 animate-pulse my-12 hidden md:block"></div>,
});
const GoogleReviewsMarquee = dynamic(() => import("@/components/GoogleReviewsMarquee"), { ssr: true });
const ProjectsGrid = dynamic(() => import("@/components/Projects"), { ssr: true });
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), { ssr: true });
const CTABanner = dynamic(() => import("@/components/CTASection"), { ssr: true });
const MaterialBrands = dynamic(() => import("@/components/MaterialBrands"), { ssr: true });

export const revalidate = 60;
const BASE_URL = "https://happyhomeinteriorsvizag.com";

interface LocationData {
  id: string;
  name: string;
  state: string;
  areas: string[];
  faqs: { q: string; a: string }[];
}

const LOCATIONS: LocationData[] = [
  {
    id: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh",
    areas: ["Madhurawada", "MVP Colony", "Seethammadhara", "Gajuwaka", "Pendurthi", "Rushikonda", "Yendada", "NAD Junction", "Dwaraka Nagar"],
    faqs: [
      { q: "Who are the best interior designers in Visakhapatnam?", a: "Happy Home Interiors is rated 4.9/5 on Google with 5,000+ completed projects in Visakhapatnam. We specialize in modular kitchens, full home turnkey interiors, false ceilings, and wardrobes — with transparent pricing and on-time delivery." },
      { q: "How much does interior design cost in Visakhapatnam?", a: "Interior design costs in Visakhapatnam range from ₹5–7 Lakhs for a basic 2BHK package to ₹20+ Lakhs for premium turnkey interiors. Modular kitchens start from ₹1.5 Lakhs. We offer free site visits and detailed quotations." },
      { q: "Do you serve all areas in Visakhapatnam?", a: "Yes. We serve all areas including Madhurawada, MVP Colony, Seethammadhara, Gajuwaka, Pendurthi, Rushikonda, Yendada, NAD Junction, Dwaraka Nagar, and every other locality in the city." },
    ],
  },
  {
    id: "hyderabad", name: "Hyderabad", state: "Telangana",
    areas: ["Gachibowli", "Jubilee Hills", "Banjara Hills", "Kondapur", "Madhapur", "Kukatpally", "Miyapur", "Secunderabad"],
    faqs: [
      { q: "Does Happy Home Interiors operate in Hyderabad?", a: "Yes. We have an active presence in Hyderabad serving Gachibowli, Jubilee Hills, Banjara Hills, Kondapur, Madhapur, Kukatpally, and surrounding areas with the same quality and commitment as our Visakhapatnam headquarters." },
      { q: "How much does a modular kitchen cost in Hyderabad?", a: "Modular kitchen costs in Hyderabad range from ₹1.5–5 Lakhs depending on size, material, and finish. We offer free design consultations and transparent, itemized pricing." },
    ],
  },
  {
    id: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh",
    areas: ["Benz Circle", "Governorpet", "Labbipet", "Moghalrajpuram", "Patamata", "Tadepalli", "Mangalagiri"],
    faqs: [
      { q: "Do you provide interior design services in Vijayawada?", a: "Yes. We serve Vijayawada and surrounding areas including Benz Circle, Governorpet, Labbipet, Patamata, Tadepalli, and Mangalagiri with complete interior design and execution services." },
    ],
  },
  {
    id: "guntur", name: "Guntur", state: "Andhra Pradesh",
    areas: ["Brodipet", "Arundelpet", "Lakshmipuram", "Kothapet", "Naaz Center"],
    faqs: [
      { q: "Is Happy Home Interiors available in Guntur?", a: "Yes. We serve Guntur city and surrounding areas with modular kitchens, wardrobes, false ceilings, and complete turnkey interior projects." },
    ],
  },
  { id: "tirupati", name: "Tirupati", state: "Andhra Pradesh", areas: ["Tirumala", "Alipiri", "RC Road"], faqs: [] },
  { id: "secunderabad", name: "Secunderabad", state: "Telangana", areas: ["Begumpet", "Trimulgherry", "Tarnaka"], faqs: [] },
  { id: "warangal", name: "Warangal", state: "Telangana", areas: ["Hanamkonda", "Kazipet", "Subedari"], faqs: [] },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", areas: ["T. Nagar", "Anna Nagar", "Velachery"], faqs: [] },
];

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ location: loc.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location: locId } = await params;
  const loc = LOCATIONS.find(l => l.id === locId) || LOCATIONS[0];

  return {
    title: `Best Interior Designers in ${loc.name} | Modular Kitchen & Home Interiors`,
    description: `Award-winning interior designers in ${loc.name}. Modular kitchens, full home turnkey projects, false ceilings, wardrobes. 5,000+ homes delivered. Free consultation.`,
    keywords: [`interior designers in ${loc.name}`, `modular kitchens ${loc.name}`, `turnkey interiors ${loc.name}`, `home interiors ${loc.name}`, `best interior designers ${loc.name}`],
    alternates: { canonical: `${BASE_URL}/interior-designers-${locId}` },
    openGraph: {
      title: `Best Interior Designers in ${loc.name} | Happy Home Interiors`,
      description: `Award-winning interior designers in ${loc.name}. 5,000+ homes delivered.`,
      url: `${BASE_URL}/interior-designers-${locId}`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: `Happy Home Interiors ${loc.name}` }],
    },
  };
}

async function getPageData() {
  const supabase = getSupabaseClient();
  let services: Service[] = SERVICES;
  let projects: Project[] = PROJECTS;

  if (supabase) {
    try {
      const fetchPromise = supabase.from("projects").select("*").eq("is_featured", true).order("order_index").limit(6);
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase Timeout")), 5000));
      const prjRes = await Promise.race([fetchPromise, timeoutPromise]) as any;
      if (prjRes?.data?.length) projects = prjRes.data as Project[];
    } catch {}
  }
  return { services, projects };
}

export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location: locId } = await params;
  const { services, projects } = await getPageData();
  const loc = LOCATIONS.find(l => l.id === locId) || LOCATIONS[0];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    "name": "Happy Home Interiors",
    "image": `${BASE_URL}/og-image.jpg`,
    "url": `${BASE_URL}/interior-designers-${locId}`,
    "telephone": "+919177699570",
    "address": { "@type": "PostalAddress", "addressLocality": loc.name, "addressRegion": loc.state, "addressCountry": "IN" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "5000" },
  };

  const faqSchema = loc.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": loc.faqs.map((faq) => ({
      "@type": "Question", "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  } : null;

  return (
    <>
      <Hero location={loc.name} />
      <AwardsSection />
      <ServicesSection services={services} />
      <TestimonialsSection />
      <GoogleReviewsMarquee />
      <ProjectsGrid projects={projects} />
      <WhyChooseUs />
      <MaterialBrands />

      {/* FAQ Section */}
      {loc.faqs.length > 0 && (
        <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-8 text-center">
              Interior Design in <span className="text-[#EA580C]">{loc.name}</span> — Your Questions Answered
            </h2>
            <div className="space-y-4">
              {loc.faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-[#0D0D0D] font-bold text-[15px] leading-snug list-none">
                    {faq.q}
                    <span className="flex-shrink-0 ml-4 w-6 h-6 rounded-full bg-[#EA580C]/5 text-[#EA580C] flex items-center justify-center text-sm font-bold group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-[#6B5F4B] text-sm leading-relaxed font-medium">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Areas Served */}
      {loc.areas.length > 0 && (
        <section className="bg-[#EA580C]/5 border-t border-[#EA580C]/10">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-12 text-center">
            <SectionLabel>Areas We Serve in {loc.name}</SectionLabel>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-3">
              {loc.areas.map((area) => (
                <span key={area} className="text-xs sm:text-sm font-bold text-[#6B5F4B] bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-gray-200 shadow-sm">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </>
  );
}

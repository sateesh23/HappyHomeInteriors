import { Metadata } from "next";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import dynamic from "next/dynamic";
import { SERVICES, PROJECTS, type Service, type Project } from "@/constants/content";
import { getSupabaseClient } from "@/lib/supabase";

const AwardsSection = dynamic(() => import("@/components/AwardsSection"), { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-64 w-full bg-gray-50 animate-pulse my-12 hidden md:block"></div>,
});
const GoogleReviewsMarquee = dynamic(() => import("@/components/GoogleReviewsMarquee"), { ssr: true });
const ProjectsGrid = dynamic(() => import("@/components/Projects"), { ssr: true });
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), { ssr: true });
const CTABanner = dynamic(() => import("@/components/CTASection"), { ssr: true });

export const revalidate = 60;
const BASE_URL = "https://happyhomeinteriors.in";

const LOCATIONS = [
  { id: "visakhapatnam", name: "Visakhapatnam" },
  { id: "hyderabad", name: "Hyderabad" },
  { id: "vijayawada", name: "Vijayawada" },
  { id: "guntur", name: "Guntur" }
];

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    location: loc.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locId = resolvedParams.location;
  const locName = LOCATIONS.find(l => l.id === locId)?.name || "Visakhapatnam";
  
  return {
    title: `Interior Designers in ${locName} | Happy Home Interiors`,
    description: `Award-winning interior designers in ${locName}. We specialize in modular kitchens, full home turnkey projects, and false ceilings.`,
    keywords: [`interior designers in ${locName}`, `modular kitchens ${locName}`, `turnkey interiors ${locName}`],
    alternates: { canonical: `${BASE_URL}/interior-designers-${locId}` },
    openGraph: {
      title: `Interior Designers in ${locName} | Happy Home Interiors`,
      description: `Award-winning interior designers in ${locName}.`,
      url: `${BASE_URL}/interior-designers-${locId}`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: `Happy Home Interiors ${locName}` }],
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
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase Timeout")), 1500));
      const prjRes = await Promise.race([fetchPromise, timeoutPromise]) as any;
      if (prjRes?.data?.length) {
        projects = prjRes.data as Project[];
      }
    } catch {}
  }
  return { services, projects };
}

export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const resolvedParams = await params;
  const { services, projects } = await getPageData();
  const locId = resolvedParams.location;
  const locName = LOCATIONS.find(l => l.id === locId)?.name || "Visakhapatnam";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    "name": "Happy Home Interiors",
    "image": `${BASE_URL}/og-image.jpg`,
    "url": `${BASE_URL}/interior-designers-${locId}`,
    "telephone": "+919177699570",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": locName,
      "addressRegion": "Andhra Pradesh",
      "addressCountry": "IN",
    },
  };

  return (
    <>
      <Hero location={locName} />
      <AwardsSection />
      <ServicesSection services={services} />
      <TestimonialsSection />
      <GoogleReviewsMarquee />
      <ProjectsGrid projects={projects} />
      <WhyChooseUs />
      <CTABanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </>
  );
}

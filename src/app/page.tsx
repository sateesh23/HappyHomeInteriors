import { Metadata } from "next";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import dynamic from "next/dynamic";
import {
  SERVICES,
  PROJECTS,
  type Service,
  type Project,
} from "@/constants/content";
import { getSupabaseClient } from "@/lib/supabase";

const AwardsSection = dynamic(() => import("@/components/AwardsSection"), {
  ssr: true,
});

const TestimonialsSection = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-64 w-full bg-gray-50 animate-pulse my-12 hidden md:block"></div>,
});

const ProjectsGrid = dynamic(() => import("@/components/Projects"), {
  ssr: true,
});

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  ssr: true,
});

const CTABanner = dynamic(() => import("@/components/CTASection"), {
  ssr: true,
});

const GoogleReviewsMarquee = dynamic(() => import("@/components/GoogleReviewsMarquee"), {
  ssr: true,
});


export const revalidate = 60; // Re-fetch Supabase data max every 60s


const BASE_URL = "https://happyhomeinteriors.in";

export const metadata: Metadata = {
  title: "Interior Designers in Vizag | Modular Kitchen & Home Interiors",
  description:
    "Affordable & premium interior designers in Vizag. 5000+ homes delivered. Book free consultation today.",
  keywords: ["interior designers in vizag", "interior designers in visakhapatnam", "modular kitchens vizag", "home interiors visakhapatnam", "affordable interior designers vizag"],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Interior Designers in Vizag | Modular Kitchen & Home Interiors",
    description: "Affordable & premium interior designers in Vizag. 5000+ homes delivered. Book free consultation today.",
    url: BASE_URL,
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Happy Home Interiors Vizag" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Designers in Vizag | Modular Kitchen & Home Interiors",
    description: "Affordable & premium interior designers in Vizag. 5000+ homes delivered. Book free consultation today.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

// ── JSON-LD Schemas ──────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  "name": "Happy Home Interiors",
  "image": `${BASE_URL}/og-image.jpg`,
  "url": BASE_URL,
  "telephone": "+919177699570",
  "email": "happyhomeinteriors9@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Akkayapalem",
    "addressLocality": "Visakhapatnam",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "530016",
    "addressCountry": "IN",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "17.7231", "longitude": "83.3012" },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "19:00",
  },
  "areaServed": ["Visakhapatnam","Vijayawada","Guntur","Tirupati","Hyderabad","Secunderabad","Warangal","Chennai"],
  "priceRange": "₹₹",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "5000" },
  "foundingDate": "2012",
  "founder": { "@type": "Person", "name": "Tirupathi Rao" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does interior design cost in Visakhapatnam?",
      "acceptedAnswer": { "@type": "Answer", "text": "Interior design costs in Visakhapatnam vary based on scope. Happy Home Interiors offers transparent pricing starting from budget-friendly options to full premium turnkey projects. Book a free consultation to get an accurate estimate for your home." },
    },
    {
      "@type": "Question",
      "name": "Does Happy Home Interiors do full home turnkey projects?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. We handle complete turnkey interior projects — from design and material selection to construction, supervision, and final handover. We serve Visakhapatnam, Hyderabad, Vijayawada, and other cities across AP and Telangana." },
    },
    {
      "@type": "Question",
      "name": "How long does a full home interior project take?",
      "acceptedAnswer": { "@type": "Answer", "text": "A typical 2BHK interior project takes 45–60 days. Full home turnkey projects may take 90–120 days. We commit to delivery timelines upfront and track progress with strict milestone planning." },
    },
    {
      "@type": "Question",
      "name": "Is Happy Home Interiors authorized by Asian Paints?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Happy Home Interiors is an Asian Paints Gold Contractor — the highest certification tier — along with being an Ultratech Authorized Contractor and Mapei Authorized Applicator." },
    },
  ],
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": { "@type": "LocalBusiness", "name": "Happy Home Interiors" },
  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
  "author": { "@type": "Person", "name": "Sunitha Lavanya" },
  "reviewBody": "Switching to Happy Home Interiors was a game-changer. The process was seamless and the execution was noticeably faster and more efficient than we ever imagined.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Modular Kitchen & Interior Design",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Happy Home Interiors"
  },
  "areaServed": [
    { "@type": "City", "name": "Visakhapatnam" },
    { "@type": "City", "name": "Hyderabad" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Interior Design Services",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Modular Kitchens",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Modular Kitchen Design" } }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Full Home Interiors",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Turnkey Interior Projects" } }
        ]
      }
    ]
  }
};


// Fetch data server-side, fallback to hardcoded if Supabase not configured
async function getPageData() {
  const supabase = getSupabaseClient();

  let services: Service[] = SERVICES;
  let projects: Project[] = PROJECTS;

  if (supabase) {
    try {
      const fetchPromise = supabase.from("projects").select("*").eq("is_featured", true).order("order_index").limit(6);
      // Timeout after 1.5s so development or cold-starts don't block render
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase Timeout")), 1500));
      
      const prjRes = await Promise.race([fetchPromise, timeoutPromise]) as any;

      if (prjRes?.data?.length) {
        projects = prjRes.data as Project[];
      }
    } catch {
      // Silently fall back to hardcoded data
    }
  }

  return { services, projects };
}


export default async function HomePage() {
  const { services, projects } = await getPageData();


  return (
    <>
      {/* SECTION 1 — Hero */}
      <Hero />

      {/* SECTION 2 — Awards & Recognition (Trust factor directly after Hero) */}
      <AwardsSection />

      {/* SECTION 3 — Services */}
      <ServicesSection services={services} />

      {/* SECTION 4 — Testimonials Video Marquee */}
      <TestimonialsSection />

      {/* SECTION 4.5 — Google Reviews Marquee */}
      <GoogleReviewsMarquee />

      {/* SECTION 5 — Featured Projects */}
      <ProjectsGrid projects={projects} />

      {/* SECTION 6 — Why Choose Us */}
      <WhyChooseUs />

      {/* SECTION 7 — Final CTA */}
      <CTABanner />

      {/* JSON-LD Structured Data — invisible to visitors, read by Google */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  );
}

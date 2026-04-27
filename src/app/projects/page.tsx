import { Metadata } from "next";
import { getSupabaseClient } from "@/lib/supabase";
import { Project } from "@/constants/content";
import ProjectsClient from "./ProjectsClient";

const BASE_URL = "https://happyhomeinteriors.in";

export const metadata: Metadata = {
  title: "Interior Design Projects Portfolio | Happy Home Interiors Vizag",
  description:
    "Browse 5,000+ completed interior design projects — modular kitchens, bedrooms, living rooms, and full home turnkey projects across Andhra Pradesh & Telangana.",
  keywords: ["interior design portfolio vizag", "modular kitchen projects ap", "completed turnkey homes hyderabad", "interior design gallery visakhapatnam", "recent interior projects andhra pradesh"],
  alternates: { canonical: `${BASE_URL}/projects` },
  openGraph: {
    title: "Interior Design Projects Portfolio | Happy Home Interiors Vizag",
    description: "Browse 5,000+ completed interior design projects — modular kitchens, bedrooms, living rooms, and full home turnkey projects across AP & Telangana.",
    url: `${BASE_URL}/projects`,
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Projects Portfolio | Happy Home Interiors Vizag",
    description: "Browse 5,000+ completed interior design projects across AP & Telangana.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "f1",
    title: "Modern Executive Office",
    description: "Office · Visakhapatnam · Modern executive office with textured wall panels and ambient lighting.",
    image_url: "/images/services/Full-Home-Turnkey.png",
    project_type: "Office",
    is_featured: true, order_index: 1, created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "f2",
    title: "Lavender Dream Bedroom",
    description: "Bedroom · MVP Colony · Contemporary bedroom in lilac with wardrobe wall and false ceiling design.",
    image_url: "/images/services/Bedroom-Wardrobes.png",
    project_type: "Bedroom",
    is_featured: true, order_index: 2, created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "f3",
    title: "Neutral Master Bedroom",
    description: "Bedroom · Madhurawada · Warm neutral bedroom with wooden wardrobe and cove ceiling lighting.",
    image_url: "/images/services/False-Ceiling-Floorings.png",
    project_type: "Bedroom",
    is_featured: true, order_index: 3, created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "f4",
    title: "Sky Blue Modular Kitchen",
    description: "Modular Kitchen · Steel Plant Area · L-shaped modular kitchen with sky blue acrylic shutters.",
    image_url: "/images/services/Modular-Kitchen.png",
    project_type: "Modular Kitchen",
    is_featured: true, order_index: 4, created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "f5",
    title: "Elegant Exterior Design",
    description: "Exterior · Seethammadhara · Modern exterior with premium textures and landscape lighting.",
    image_url: "/images/services/Exterior-Design.png",
    project_type: "Exterior",
    is_featured: true, order_index: 5, created_at: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "f6",
    title: "Waterproofing & Cooling",
    description: "Exterior · KRM Colony · Complete waterproofing and heat reduction solution.",
    image_url: "/images/services/Waterproof-Roof-Cooling.png",
    project_type: "Exterior",
    is_featured: true, order_index: 6, created_at: "2024-01-01T00:00:00.000Z"
  }
];

export const revalidate = 60;

export default async function ProjectsPage() {
  const supabase = getSupabaseClient();
  let projects: Project[] = [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data && data.length > 0) {
        projects = data as Project[];
      }
    } catch {
      // Silently fallback
    }
  }

  // Always show at least 6 projects — supplement with fallbacks
  if (projects.length < 3) {
    // Deduplicate by id before merging
    const existingIds = new Set(projects.map((p) => p.id));
    const extras = FALLBACK_PROJECTS.filter((p) => !existingIds.has(p.id));
    projects = [...projects, ...extras];
  }

  return (
    <main className="min-h-screen bg-white">
      <ProjectsClient initialProjects={projects} />
      
      {/* JSON-LD Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Interior Design Projects Portfolio",
            "description": "Browse 5,000+ completed interior design projects across Andhra Pradesh & Telangana.",
            "url": `${BASE_URL}/projects`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Happy Home Interiors"
            }
          }) 
        }} 
      />
    </main>
  );
}

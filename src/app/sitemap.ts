import { MetadataRoute } from "next";

const BASE_URL = "https://happyhomeinteriors.in";

const LOCATIONS = ["visakhapatnam", "hyderabad", "vijayawada", "guntur"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Location pages (high priority for local SEO)
  const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/interior-designers-${loc}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...corePages, ...locationPages];
}

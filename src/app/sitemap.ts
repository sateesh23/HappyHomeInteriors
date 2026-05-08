import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blogPosts";
import { SERVICE_LOCATION_PAGES } from "@/data/serviceLocationPages";

const BASE_URL = "https://happyhomeinteriors.in";

const LOCATIONS = ["visakhapatnam", "hyderabad", "vijayawada", "guntur", "tirupati", "secunderabad", "warangal", "chennai"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Location pages (high priority for local SEO)
  const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/interior-designers-${loc}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Service-specific location pages
  const serviceLocationPages: MetadataRoute.Sitemap = SERVICE_LOCATION_PAGES.map((p) => ({
    url: `${BASE_URL}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // State-level pages
  const statePages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/home-interiors-andhra-pradesh`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/interior-designers-telangana`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  return [...corePages, ...locationPages, ...statePages, ...serviceLocationPages, ...blogPages];
}

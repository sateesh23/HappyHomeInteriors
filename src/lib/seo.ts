/**
 * Reusable SEO Utilities — Schema generators, metadata helpers
 * Used across all pages for consistent structured data
 */

const BASE_URL = "https://happyhomeinteriorsvizag.com";

// ── Breadcrumb Schema Generator ──
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.path}`,
    })),
  };
}

// ── FAQ Schema Generator ──
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };
}

// ── Service Schema Generator ──
export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": `${BASE_URL}${url}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Happy Home Interiors",
      "telephone": "+919177699570",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Visakhapatnam",
        "addressRegion": "Andhra Pradesh",
        "addressCountry": "IN",
      },
    },
    "areaServed": [
      { "@type": "State", "name": "Andhra Pradesh" },
      { "@type": "State", "name": "Telangana" },
    ],
  };
}

// ── Article Schema Generator ──
export function articleSchema(title: string, description: string, image: string, date: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": `${BASE_URL}${image}`,
    "datePublished": date,
    "dateModified": date,
    "author": { "@type": "Organization", "name": "Happy Home Interiors" },
    "publisher": {
      "@type": "Organization",
      "name": "Happy Home Interiors",
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/icon.jpg` },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/${slug}` },
  };
}

// ── Review Schema Generator ──
// NOTE: Removed aggregateRating from standalone schemas.
// Google only supports aggregateRating on LocalBusiness when reviews are real and verifiable.
// The global LocalBusiness schema in layout.tsx is the single source of truth.

// ── Local Business Schema Generator ──
export function localBusinessSchema(city: string, state: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Happy Home Interiors",
    "image": `${BASE_URL}/og-image.jpg`,
    "url": `${BASE_URL}/${slug}`,
    "telephone": "+919177699570",
    "email": "happyhomeinteriorsvizag@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": state,
      "addressCountry": "IN",
    },
    "geo": { "@type": "GeoCoordinates", "latitude": "17.7231", "longitude": "83.3012" },
    "priceRange": "₹₹",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00",
    },
  };
}

// ── ImageObject Schema Generator ──
export function imageObjectSchema(url: string, caption: string, width = 1200, height = 630) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": `${BASE_URL}${url}`,
    "caption": caption,
    "width": width,
    "height": height,
    "creator": { "@type": "Organization", "name": "Happy Home Interiors" },
  };
}

// ── Page Metadata Generator ──
export function generatePageMetadata(title: string, description: string, path: string, keywords: string[] = []) {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [`${BASE_URL}/og-image.jpg`],
    },
  };
}

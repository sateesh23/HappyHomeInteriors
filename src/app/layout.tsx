import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollObserver from "@/components/ScrollObserver";
import LeadModal from "@/components/LeadModal";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const BASE_URL = "https://happyhomeinteriors.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Site identity (shows "Happy Home Interiors" in Google results) ──
  title: {
    default: "Happy Home Interiors | Interior Designers in Visakhapatnam",
    template: "%s | Happy Home Interiors",
  },
  description:
    "Award-winning interior designers in Visakhapatnam. Modular kitchens, full home turnkey, false ceilings & more. 5,000+ homes delivered. Book a free consultation today.",

  // ── Favicon & Icons (shows in Google search results and browser tab) ──
  icons: {
    icon: [
      { url: "/icon.jpg", type: "image/jpeg" },
    ],
    apple: [
      { url: "/icon.jpg", type: "image/jpeg" },
    ],
    shortcut: "/icon.jpg",
  },

  keywords: [
    "interior designers visakhapatnam",
    "interior design vizag",
    "modular kitchen vizag",
    "home interiors visakhapatnam",
    "turnkey interior projects andhra pradesh",
    "false ceiling design vizag",
    "bedroom wardrobe design visakhapatnam",
    "full home interior hyderabad",
    "happy home interiors",
    "interior design near me visakhapatnam",
    "best interior designers andhra pradesh",
    "happy home interiors visakhapatnam",
    "interior designers near me vizag",
  ],
  authors: [{ name: "Happy Home Interiors", url: BASE_URL }],
  creator: "Happy Home Interiors",
  publisher: "Happy Home Interiors",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // ── Open Graph (WhatsApp/Facebook/LinkedIn previews) ──
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Happy Home Interiors",
    title: "Happy Home Interiors | Interior Designers in Visakhapatnam",
    description:
      "Award-winning interior designers in Visakhapatnam. Modular kitchens, full home turnkey, false ceilings & more. 5,000+ homes delivered.",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Happy Home Interiors — Interior Designers in Visakhapatnam",
      },
    ],
  },

  // ── Twitter Card ──
  twitter: {
    card: "summary_large_image",
    title: "Happy Home Interiors | Interior Designers in Visakhapatnam",
    description:
      "Award-winning interior designers in Visakhapatnam. Modular kitchens, full home turnkey, false ceilings & more. 5,000+ homes delivered.",
    images: [`${BASE_URL}/og-image.jpg`],
  },

  // ── Geo & local signals ──
  other: {
    "geo.region": "IN-AP",
    "geo.placename": "Visakhapatnam",
    "geo.position": "17.7231;83.3012",
    "ICBM": "17.7231, 83.3012",
  },
};

// ── WebSite Schema → enables Sitelinks Search Box + site name in Google ──
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Happy Home Interiors",
  "alternateName": "Happy Home Interiors Vizag",
  "url": BASE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/projects?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ── Organization Schema → enables Knowledge Panel in Google ──
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "InteriorDesigner"],
  "@id": `${BASE_URL}/#organization`,
  "name": "Happy Home Interiors",
  "legalName": "Happy Home Interiors",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/icon.jpg`,
    "width": 512,
    "height": 512,
  },
  "image": `${BASE_URL}/og-image.jpg`,
  "description":
    "Award-winning interior designers in Visakhapatnam with 12+ years experience. Modular kitchens, full home turnkey projects, false ceilings, wardrobes, waterproofing, and commercial & residential construction across Andhra Pradesh and Telangana.",
  "telephone": "+919177699570",
  "email": "happyhomeinteriors9@gmail.com",
  "foundingDate": "2012",
  "founder": {
    "@type": "Person",
    "name": "Tirupathi Rao",
    "jobTitle": "Founder & Principal Interior Designer",
  },
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": "20" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Akkayapalem",
    "addressLocality": "Visakhapatnam",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "530016",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.7231",
    "longitude": "83.3012",
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "19:00",
  },
  "areaServed": [
    { "@type": "City", "name": "Visakhapatnam" },
    { "@type": "City", "name": "Vijayawada" },
    { "@type": "City", "name": "Guntur" },
    { "@type": "City", "name": "Tirupati" },
    { "@type": "City", "name": "Hyderabad" },
    { "@type": "City", "name": "Secunderabad" },
    { "@type": "City", "name": "Warangal" },
    { "@type": "City", "name": "Chennai" },
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Interior Design Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Modular Kitchen Design", "url": `${BASE_URL}/services` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Home Turnkey Interior", "url": `${BASE_URL}/services` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "False Ceiling & Flooring", "url": `${BASE_URL}/services` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bedroom & Wardrobe Design", "url": `${BASE_URL}/services` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Waterproof Roof & Cooling", "url": `${BASE_URL}/services` } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial & Residential Construction", "url": `${BASE_URL}/services` } },
    ],
  },
  "priceRange": "₹₹",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "5000",
  },
  "award": [
    "Asian Paints Gold Contractor",
    "Ultratech Authorized Contractor",
    "Mapei Authorized Applicator",
  ],
  "knowsAbout": [
    "Interior Design",
    "Modular Kitchen",
    "Home Construction",
    "Turnkey Projects",
    "False Ceiling",
    "Wardrobe Design",
    "Space Planning",
    "Waterproofing",
  ],
  "sameAs": [
    "https://www.instagram.com/happyhomeinteriors",
    "https://www.facebook.com/happyhomeinteriors",
    "https://www.youtube.com/@happyhomeinteriors",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} font-sans`}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#EA580C" />
        <link rel="apple-touch-icon" href="/icon.jpg" />
        <link rel="shortcut icon" href="/icon.jpg" type="image/jpeg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" as="image" href="/images/hero_Background2.png" />

        {/* WebSite + Organization JSON-LD — required for site name & Knowledge Panel in Google */}
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

        {/* Strip browser-extension bis_skin_checked attributes before React hydration */}
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `(function(){function r(){document.querySelectorAll('[bis_skin_checked]').forEach(function(e){e.removeAttribute('bis_skin_checked');});}r();if(typeof MutationObserver!=='undefined'){new MutationObserver(r).observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:['bis_skin_checked']});}})();` }} />
      </head>
      <body
        className="min-h-screen flex flex-col bg-white text-gray-900 overflow-x-hidden"
        suppressHydrationWarning
      >
        <Navbar />
        <main suppressHydrationWarning className="flex-grow">{children}</main>
        <Footer />
        <ScrollObserver />
        <LeadModal />
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}

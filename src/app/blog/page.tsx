import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blogPosts";
import SectionLabel from "@/components/ui/SectionLabel";
import CTABanner from "@/components/CTASection";

const BASE_URL = "https://happyhomeinteriors.in";

export const metadata: Metadata = {
  title: "Interior Design Blog | Tips, Costs & Trends | Happy Home Interiors",
  description:
    "Expert interior design tips, cost guides, and trend reports for homeowners in Visakhapatnam. Learn about modular kitchens, bedroom designs, false ceilings, and budgeting.",
  keywords: ["interior design blog", "modular kitchen cost vizag", "interior design tips visakhapatnam", "home interior budget guide", "false ceiling cost vizag"],
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "Interior Design Blog | Happy Home Interiors",
    description: "Expert interior design tips, cost guides, and trend reports for homeowners in Visakhapatnam.",
    url: `${BASE_URL}/blog`,
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-28">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-4 sm:pt-10 sm:pb-6 text-center">
        <nav className="text-xs font-semibold text-[#6B5F4B] mb-3 sm:mb-4 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#EA580C] transition-colors">Home</Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-[#EA580C]">Blog</span>
        </nav>
        <SectionLabel>Interior Design Insights</SectionLabel>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D0D0D] leading-[1.15] tracking-tight mb-3">
          Expert Guides for <span className="text-[#EA580C]">Smarter</span> Home Decisions
        </h1>
        <p className="text-[#6B5F4B] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Practical tips, real cost breakdowns, and design trends — written by our team of interior designers with 12+ years of experience in Visakhapatnam.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-5 shadow-sm">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-4 left-4 bg-white shadow-lg text-[#EA580C] text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-lg">
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold text-[#9C8F80]">{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span className="text-[11px] text-gray-300">•</span>
                <span className="text-[11px] font-bold text-[#9C8F80]">{post.readTime}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-[#0D0D0D] leading-snug mb-2 group-hover:text-[#EA580C] transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-[#6B5F4B] leading-relaxed line-clamp-2 font-medium">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CTABanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Happy Home Interiors Blog",
            "description": "Expert interior design tips, cost guides, and trend reports for homeowners in Visakhapatnam.",
            "url": `${BASE_URL}/blog`,
            "publisher": { "@type": "Organization", "name": "Happy Home Interiors" },
            "blogPost": BLOG_POSTS.map((p) => ({
              "@type": "BlogPosting",
              "headline": p.title,
              "description": p.description,
              "url": `${BASE_URL}/blog/${p.slug}`,
              "datePublished": p.date,
            })),
          }),
        }}
      />
    </main>
  );
}

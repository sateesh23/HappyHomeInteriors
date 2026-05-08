import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blogPosts";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import SectionLabel from "@/components/ui/SectionLabel";

const BASE_URL = "https://happyhomeinteriors.in";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Blog | Happy Home Interiors" };

  return {
    title: post.title,
    description: post.description,
    keywords: [post.category.toLowerCase(), "interior design vizag", "happy home interiors blog"],
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      images: [{ url: `${BASE_URL}${post.image}`, width: 1200, height: 630 }],
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let inTable = false;
  let headerRow = false;

  const flush = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`t-${elements.length}`} className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[#EA580C]/5">
                {tableRows[0].map((cell, i) => (
                  <th key={i} className="px-4 py-3 text-left font-bold text-[#0D0D0D] border-b border-gray-200">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-[#6B5F4B] border-b border-gray-100">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) { headerRow = true; continue; }
      if (!inTable) inTable = true;
      tableRows.push(cells);
      continue;
    }

    if (inTable) { flush(); inTable = false; }

    if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-xl font-black text-[#0D0D0D] mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (/^\d+\.\s\*\*/.test(line)) {
      const text = line.replace(/\*\*/g, "");
      const match = text.match(/^(\d+)\.\s(.+)/);
      if (match) elements.push(<p key={i} className="text-[#0D0D0D] text-base leading-relaxed mb-2"><strong className="font-bold">{match[1]}. {match[2]}</strong></p>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={i} className="text-[#0D0D0D] font-bold text-base mt-4 mb-1">{line.replace(/\*\*/g, "")}</p>);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(<li key={i} className="text-[#6B5F4B] text-base leading-relaxed ml-6 mb-1 list-disc">{line.slice(2)}</li>);
    } else if (line.trim() === "") {
      continue;
    } else {
      const processed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      elements.push(<p key={i} className="text-[#6B5F4B] text-base leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: processed }} />);
    }
  }
  flush();
  return elements;
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": `${BASE_URL}${post.image}`,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": "Happy Home Interiors" },
    "publisher": { "@type": "Organization", "name": "Happy Home Interiors", "logo": { "@type": "ImageObject", "url": `${BASE_URL}/icon.jpg` } },
  };

  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-28 pb-0">
      <article className="max-w-3xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-[#6B5F4B] mb-6 tracking-widest uppercase">
          <Link href="/" className="hover:text-[#EA580C] transition-colors">Home</Link>
          <span className="mx-2 text-gray-300">/</span>
          <Link href="/blog" className="hover:text-[#EA580C] transition-colors">Blog</Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-[#EA580C]">{post.category}</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold text-[#EA580C] bg-[#EA580C]/5 px-3 py-1 rounded-full">{post.category}</span>
          <span className="text-xs font-bold text-[#9C8F80]">{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span className="text-xs text-gray-300">•</span>
          <span className="text-xs font-bold text-[#9C8F80]">{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black text-[#0D0D0D] leading-[1.15] tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 mb-10 shadow-lg">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
        </div>

        {/* Content */}
        <div className="prose-custom">{renderMarkdown(post.content)}</div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center">
          <SectionLabel>Ready to Start?</SectionLabel>
          <h3 className="text-2xl font-black text-[#0D0D0D] mb-3">Book Your Free Design Consultation</h3>
          <p className="text-[#6B5F4B] text-sm mb-6 max-w-lg mx-auto">Get a personalized quote for your home. Our designers visit your space, understand your needs, and provide a detailed plan — completely free.</p>
          <AnimatedButton href="/contact#form" text="Get Free Consultation →" openModal={true} />
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}

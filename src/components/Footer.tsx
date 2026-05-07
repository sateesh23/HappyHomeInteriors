"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BUSINESS_DETAILS } from "@/constants/content";
import { MapPin, Phone, Mail } from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Our Projects" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const SERVICES_FOOTER = [
  { name: "Modular Kitchen", id: "modular-kitchen" },
  { name: "Full Home Turnkey", id: "full-home-turnkey" },
  { name: "Bedroom & Wardrobes", id: "bedroom-wardrobes" },
  { name: "Exterior Design", id: "exterior-design" },
  { name: "False Ceiling & Floors", id: "false-ceiling" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer suppressHydrationWarning className="bg-white text-[#0D0D0D] border-t border-gray-100">
      {/* Main footer grid */}
      <div suppressHydrationWarning className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

        {/* Col 1: Brand */}
        <div suppressHydrationWarning className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6 group">
            <div className="w-10 h-10 rounded-md overflow-hidden border-2 border-[#EA580C]/50 group-hover:border-[#EA580C] transition-colors">
              <Image
                src="/images/IMG_6359.JPG"
                alt="Happy Home Interiors"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-lg text-[#0D0D0D] tracking-tight">
              Happy Home Interiors
            </span>
          </Link>
          <p className="text-[#6B5F4B] text-base leading-relaxed mb-8 font-medium">
            Designing Homes. Building Memories. Since 2012.
          </p>
          <div className="flex gap-4">
            <a
              href={BUSINESS_DETAILS.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all duration-300 text-gray-400 shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href={BUSINESS_DETAILS.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all duration-300 text-gray-400 shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={BUSINESS_DETAILS.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all duration-300 text-gray-400 shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h3 className="font-black text-xs tracking-widest uppercase mb-8 text-[#0D0D0D]">
            Quick Links
          </h3>
          <ul className="space-y-4">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#6B5F4B] hover:text-[#EA580C] text-[15px] font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Services */}
        <div>
          <h3 className="font-black text-xs tracking-widest uppercase mb-8 text-[#0D0D0D]">
            Services
          </h3>
          <ul className="space-y-4">
            {SERVICES_FOOTER.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services#${service.id}`}
                  className="text-[#6B5F4B] hover:text-[#EA580C] text-[15px] font-medium transition-colors duration-200"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div>
          <h3 className="font-black text-xs tracking-widest uppercase mb-8 text-[#0D0D0D]">
            Contact
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Phone className="text-[#EA580C] flex-shrink-0 w-5 h-5" />
              <a
                href={`tel:${BUSINESS_DETAILS.phone}`}
                className="text-[#6B5F4B] hover:text-[#EA580C] text-[15px] font-medium transition-colors"
              >
                {BUSINESS_DETAILS.phone}
              </a>
            </div>
            <div className="flex gap-4">
              <Mail className="text-[#EA580C] flex-shrink-0 w-5 h-5" />
              <a
                href={`mailto:${BUSINESS_DETAILS.email}`}
                className="text-[#6B5F4B] hover:text-[#EA580C] text-[15px] font-medium transition-colors break-all"
              >
                {BUSINESS_DETAILS.email}
              </a>
            </div>
            <div className="flex gap-4">
              <MapPin className="text-[#EA580C] flex-shrink-0 w-5 h-5" />
              <p className="text-[#6B5F4B] text-[15px] font-medium leading-relaxed">
                {BUSINESS_DETAILS.location}, India
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 uppercase tracking-widest text-[10px] font-black text-[#EA580C]">
             Ready to start? → <Link href="/contact" className="hover:underline">Book Your Free Consultation</Link>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div suppressHydrationWarning className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
              &copy; {CURRENT_YEAR} Happy Home Interiors. All Rights Reserved.
            </p>
            <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-[#EA580C]">Privacy Policy</Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-[#EA580C]">Terms of Service</Link>
            </div>
          </div>
          <p className="text-[#EA580C] text-sm italic font-bold">
            "5,000+ families trusted us with their homes. You're next."
          </p>
        </div>
      </div>
    </footer>
  );
}

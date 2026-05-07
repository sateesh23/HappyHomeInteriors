"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const BLACK = "#000000";
const ORANGE = "#EA580C";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* ── MAIN NAV — semantic <header> + <nav> ── */}
      <header
        suppressHydrationWarning
        role="banner"
        className="fixed top-[10px] left-[10px] w-[calc(100%-20px)] z-50 pointer-events-none pt-4 sm:pt-5"
      >
        <nav
          suppressHydrationWarning
          aria-label="Main navigation"
          className="max-w-[1280px] mx-auto px-4 sm:px-6 pointer-events-auto"
        >
          <div
            suppressHydrationWarning
            className="flex items-center justify-between pl-4 pr-2 h-[60px] rounded-2xl bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          >

            {/* ── LOGO ── */}
            <Link href="/" aria-label="Happy Home Interiors — Home" className="flex items-center gap-2.5 flex-shrink-0">
              <figure className="w-9 h-9 rounded-md overflow-hidden flex-shrink-0 m-0">
                <Image
                  src="/images/IMG_6359.JPG"
                  alt="Happy Home Interiors logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  priority
                />
              </figure>
              <div className="flex flex-col">
                <span style={{ color: BLACK }} className="font-bold text-[14px] tracking-tight whitespace-nowrap leading-none">
                  Happy Home Interiors
                </span>
                <span className="text-[9px] text-gray-500 font-medium tracking-wider uppercase mt-0.5">
                  Design · Build · Deliver
                </span>
              </div>
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <ul
              suppressHydrationWarning
              role="menubar"
              className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 list-none m-0 p-0"
            >
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      aria-current={active ? "page" : undefined}
                      style={{ color: active ? ORANGE : BLACK }}
                      className="relative text-[13px] font-semibold transition-colors duration-200 group/nav hover:!text-[#EA580C] cursor-pointer"
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-[#EA580C] rounded-full transition-all duration-300 ${
                          active ? "w-full" : "w-0 group-hover/nav:w-full"
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ── CTA + Hamburger ── */}
            <div suppressHydrationWarning className="flex items-center gap-2">
              <div className="hidden lg:block">
                <AnimatedButton 
                  href="/contact#form" 
                  text="Book Free Consultation →" 
                  icon={<Phone className="w-3.5 h-3.5" />}
                  className="!px-5 !py-2 !h-[45px] !text-[13px]"
                  openModal={true}
                />
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex flex-col gap-[5px] p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] rounded-md cursor-pointer"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
              >
                <span style={{ backgroundColor: BLACK }} className={`block w-5 h-0.5 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} aria-hidden="true" />
                <span style={{ backgroundColor: BLACK }} className={`block w-5 h-0.5 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} aria-hidden="true" />
                <span style={{ backgroundColor: BLACK }} className={`block w-5 h-0.5 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <aside
        id="mobile-nav-drawer"
        suppressHydrationWarning
        role="dialog"
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[70] lg:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div suppressHydrationWarning className="absolute inset-0 bg-white flex flex-col px-6 py-8">
          <div className="flex items-center justify-between w-full mb-12">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5" aria-label="Happy Home Interiors — Home">
              <figure className="w-9 h-9 rounded-md overflow-hidden m-0">
                <Image src="/images/IMG_6359.JPG" alt="Happy Home Interiors logo" width={36} height={36} className="w-full h-full object-cover" />
              </figure>
              <span style={{ color: BLACK }} className="font-bold text-[14px]">Happy Home Interiors.</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              style={{ color: "#6b7280" }}
              className="text-sm font-semibold hover:!text-[#EA580C] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#EA580C] rounded-md p-1"
              aria-label="Close navigation menu"
            >
              ✕ Close
            </button>
          </div>

          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-6 list-none m-0 p-0">
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={active ? "page" : undefined}
                      style={{ color: active ? ORANGE : BLACK, transitionDelay: `${isOpen ? i * 60 : 0}ms` }}
                      className={`text-4xl font-bold tracking-tight transition-all duration-300 hover:!text-[#EA580C] cursor-pointer ${
                        isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto">
            <AnimatedButton 
              href="/contact#form" 
              text="Book Free Consultation →" 
              onClick={() => setIsOpen(false)}
              className="w-full !py-4"
              icon={<Phone className="w-4 h-4" />}
              openModal={true}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  Menu, X, Home, 
  BarChart2, Image as ImageIcon, MessageSquare, Mail, 
  LogOut, Globe, Settings, Video
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart2 },
  { href: "/admin/dashboard/projects", label: "Projects", icon: ImageIcon },
  { href: "/admin/dashboard/video-testimonials", label: "Video Testimonials", icon: Video },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 w-full fixed z-20 top-0 left-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shadow-sm">
            <Image
              src="/images/IMG_6359.JPG"
              alt="Happy Home"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-gray-900 font-bold tracking-tight">Admin Dashboard</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Core */}
      <aside 
        className={`fixed lg:static top-0 left-0 z-40 w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-screen transition-transform duration-300 ease-in-out shadow-sm ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 hidden lg:block bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-white">
              <Image
                src="/images/IMG_6359.JPG"
                alt="Happy Home Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-900 text-sm font-bold leading-tight">Happy Home</p>
              <p className="text-gray-500 text-[11px] uppercase tracking-widest mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Padding for mobile offset since top bar is fixed */}
        <div className="lg:hidden h-20" />

        {/* Nav */}
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive 
                    ? "bg-orange-50 text-[#EA580C] border border-orange-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#EA580C]" : "text-gray-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 space-y-1 bg-gray-50/50">
          <Link
            href="/admin/dashboard/settings"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
              pathname.startsWith("/admin/dashboard/settings")
                ? "bg-orange-50 text-[#EA580C] border border-orange-100" 
                : "text-gray-600 hover:text-gray-900 hover:bg-white border border-transparent"
            }`}
          >
            <Settings className={`w-5 h-5 ${pathname.startsWith("/admin/dashboard/settings") ? "text-[#EA580C]" : "text-gray-400"}`} />
            Settings
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white text-sm font-medium transition-colors"
          >
            <Globe className="w-5 h-5 text-gray-400" />
            View Live Site
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 text-sm font-medium transition-colors border border-transparent hover:border-red-100 mt-1"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

import { getSupabaseClient } from "@/lib/supabase";
import Link from "next/link";
import SupabaseBadge from "@/components/admin/SupabaseBadge";
import { FolderOpen, Video, ArrowRight } from "lucide-react";

async function getCounts() {
  const supabase = getSupabaseClient();
  if (!supabase) return { projects: "—", testimonials: "—", connected: false };

  const [p, t] = await Promise.allSettled([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("video_testimonials").select("id", { count: "exact", head: true }), // Assuming table name is video_testimonials, fallback to static if err
  ]);

  return {
    connected: true,
    projects: p.status === "fulfilled" ? String(p.value.count ?? 0) : "—",
    testimonials: t.status === "fulfilled" ? String(t.value.count ?? 0) : "—",
  };
}

const QUICK_ACTIONS = [
  { href: "/admin/dashboard/projects", label: "Manage Projects", desc: "Add, edit or delete portfolio projects", icon: FolderOpen, color: "text-blue-600 bg-blue-50" },
  { href: "/admin/dashboard/video-testimonials", label: "Manage Video Testimonials", desc: "Add, edit or delete video testimonials", icon: Video, color: "text-purple-600 bg-purple-50" },
];

export default async function DashboardPage() {
  const counts = await getCounts();

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-0.5">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back to Happy Home Interiors admin.</p>
        </div>
        <SupabaseBadge />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { label: "Total Projects", value: counts.projects, icon: FolderOpen, color: "border-gray-200 bg-white", textColor: "text-blue-600", dot: "bg-blue-600" },
          { label: "Video Testimonials", value: counts.testimonials, icon: Video, color: "border-gray-200 bg-white", textColor: "text-purple-600", dot: "bg-purple-600" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${stat.color} border rounded-2xl p-6 shadow-sm relative overflow-hidden group`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <span className={`w-2 h-2 rounded-full ${stat.dot}`}></span>
              </div>
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-gray-900 text-4xl font-black tracking-tight">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-5 bg-[#EA580C] rounded-full"></div>
          <h2 className="text-gray-900 font-bold text-sm uppercase tracking-wider">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-4 p-4 bg-gray-50/50 border border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-50 hover:shadow-sm transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-bold group-hover:text-[#EA580C] transition-colors">{action.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">{action.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-orange-200 group-hover:bg-white transition-all flex-shrink-0 shadow-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4 text-[#EA580C]" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

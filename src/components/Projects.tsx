import Image from "next/image";
import { Project } from "@/constants/content";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface Props {
  projects: Project[];
}

const FALLBACK_GRADIENT = [
  "from-gray-700 to-gray-900",
  "from-orange-900/40 to-stone-900",
  "from-stone-700 to-stone-500",
  "from-slate-700 to-black",
  "from-slate-600 to-slate-500",
  "from-amber-900 to-amber-700",
];

function getImageUrl(raw: string): string {
  if (!raw) return "";
  // Handle JSON array format e.g. ["/path/img.jpg", ...]
  if (raw.trim().startsWith("[")) {
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length > 0) return arr[0];
    } catch { /* noop */ }
  }
  // Plain path — return as-is
  return raw;
}

export default function ProjectsGrid({ projects }: Props) {
  return (
    <section suppressHydrationWarning className="flex flex-col justify-center w-full py-20 md:py-28 bg-white">
      <div suppressHydrationWarning className="max-w-7xl mx-auto w-full px-5 sm:px-8">

        {/* Header */}
        <div suppressHydrationWarning className="flex flex-col flex-wrap justify-center items-center text-center mb-14 md:mb-20">
          {/* Eyebrow */}
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-4">
            Our Work Speaks Louder Than Any Brochure
          </span>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-[#0D0D0D] leading-[1.05] tracking-tight mb-6 max-w-4xl">
            5,000+ Spaces Designed. Every One Built Around a Real Family's Life.
          </h2>
          <p className="text-sm md:text-lg text-[#6B5F4B] max-w-3xl text-center leading-relaxed font-medium mb-10">
            No two homes are the same — and no two designs should be either. Browse real projects we've completed and imagine what we could do with yours.
          </p>
          <div className="flex justify-center w-full">
            <AnimatedButton href="/projects" text="View Full Project Gallery →" />
          </div>
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <p className="text-[#6B5F4B] text-center py-16">No projects yet.</p>
        ) : (
          <div suppressHydrationWarning className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {projects.slice(0, 6).map((project, idx) => {
              const ytId = (project as any).youtube_url ? new URLSearchParams(new URL((project as any).youtube_url).search).get("v") || (project as any).youtube_url.split("shorts/")[1]?.split("?")[0] : null;
              
              // Automatically fetch YouTube thumbnail if it's a video, otherwise use uploaded image (hqdefault always loads)
              const imgUrl = getImageUrl((project as any).image_url) || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "");
              
              const uiLocation = (project as any).location || "Visakhapatnam";
              const uiCategory = (project as any).project_type || "Interior Design";

              return (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                >
                   {/* Uniform Image block for both image and video */}
                   <div suppressHydrationWarning className="rounded-[4px] overflow-hidden relative w-full aspect-[4/5] bg-gray-100 group">
                     {imgUrl ? (
                       <Image
                         src={imgUrl}
                         alt={project.title || "Project"}
                         fill
                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                         className={`object-cover transition-transform duration-500 ease-out ${ytId ? "scale-[1.35] group-hover:scale-[1.40]" : "group-hover:scale-[1.03]"}`}
                         loading={idx === 0 ? "eager" : "lazy"}
                         unoptimized={imgUrl.includes("supabase.co")}
                       />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white font-bold">Media Error</div>
                     )}
                     
                     {/* Universal Video Play Overlay */}
                     {ytId && (
                       <>
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <svg viewBox="0 0 68 48" className="w-12 h-12 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                              <path className="transition-colors duration-300 fill-[#FF0000] group-hover:fill-[#CC0000]" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.26,4.81,1.48,7.74C.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" />
                              <path fill="#ffffff" d="M 45,24 27,14 v 20 z" />
                            </svg>
                         </div>
                       </>
                     )}
                   </div>
                   
                   {/* Info block — strictly below images */}
                   <div className="mt-3 px-1">
                      <p className="text-[13px] sm:text-[14px] font-bold text-[#0D0D0D] leading-snug line-clamp-1 mb-2">
                         {project.title}
                      </p>
                      <div className="space-y-1.5 flex flex-col justify-end">
                         <p className="text-[11px] sm:text-[12px] text-[#9C8F80] leading-none flex items-center gap-1.5 font-medium">
                            <svg className="w-3.5 h-3.5 text-[#EA580C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span className="truncate">{uiLocation}</span>
                         </p>
                         <p className="text-[11px] sm:text-[12px] text-[#9C8F80] leading-none flex items-center gap-1.5 font-medium">
                            <svg className="w-3.5 h-3.5 text-[#EA580C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            <span className="truncate">{uiCategory}</span>
                         </p>
                      </div>
                   </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

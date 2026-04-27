"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  UtensilsCrossed,
  BedDouble,
  Sofa,
  Layers,
  HousePlus,
  Building2,
} from "lucide-react";
import { Project } from "@/constants/content";
import SectionLabel from "@/components/ui/SectionLabel";

export interface UIProject extends Project {
  uiCategory: string;
  uiLocation: string;
  uiDescription: string;
  imagesList: string[];
  youtube_url?: string;
  ytId: string | null;
}

function getYoutubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match && match[1] ? match[1] : null;
}


const CATEGORIES: { label: string; Icon: LucideIcon }[] = [
  { label: "All",            Icon: Home },
  { label: "Modular Kitchen", Icon: UtensilsCrossed },
  { label: "Bedroom",        Icon: BedDouble },
  { label: "Living Room",    Icon: Sofa },
  { label: "False Ceiling",  Icon: Layers },
  { label: "Full Home",      Icon: HousePlus },
  { label: "Exterior",       Icon: Building2 },
];

interface Props {
  initialProjects: Project[];
}

// ─── Single Uniform Thumbnail ───────────────────────
function ProjectMedia({ project }: { project: UIProject }) {
  // If video is provided, show video thumbnail. If image is provided, show image. (hqdefault always exists, maxresdefault often 404s for Shorts)
  const imageUrl = project.imagesList[0] || (project.ytId ? `https://img.youtube.com/vi/${project.ytId}/hqdefault.jpg` : "");
  
  return (
    <div className="rounded-[20px] overflow-hidden relative w-full aspect-[4/5] bg-gray-100 group shadow-sm border border-gray-100">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-transform duration-500 ease-out ${project.ytId ? "scale-[1.35] group-hover:scale-[1.40]" : "group-hover:scale-[1.03]"}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold">
           Media Error
        </div>
      )}
      
      {/* Universal Video Play Overlay */}
      {project.ytId && (
        <>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-14 h-14 bg-[#FCD34D] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="black" className="ml-1">
                   <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
             </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ProjectsClient({ initialProjects }: Props) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState<UIProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(18);

  const normalizedProjects: UIProject[] = useMemo(() => {
    return initialProjects.map((p) => {
      const descParts = p.description?.split("·").map((s) => s.trim()) || [];
      const uiCategory = p.project_type || descParts[0] || "Interior Design";
      const uiLocation =
        p.location || (descParts.length > 1 ? descParts[1] : "Visakhapatnam");
      const uiDescription =
        descParts.length > 2
          ? descParts.slice(2).join(" · ")
          : `A premium ${uiCategory.toLowerCase()} space crafted by Happy Home Interiors.`;

      let imagesList: string[] = [];
      try {
        const arr = JSON.parse(p.image_url);
        if (Array.isArray(arr)) imagesList = arr.filter(Boolean);
        else imagesList = [p.image_url].filter(Boolean);
      } catch {
        imagesList = p.image_url ? [p.image_url] : [];
      }

      const ytId = getYoutubeId(p.youtube_url);
      if (ytId && imagesList.length === 0) {
        imagesList = [`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`];
      }

      return { ...p, uiCategory, uiLocation, uiDescription, imagesList, ytId };
    });
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return normalizedProjects.filter((p) =>
      activeTab === "All"
        ? true
        : p.uiCategory.toLowerCase().includes(activeTab.toLowerCase())
    );
  }, [normalizedProjects, activeTab]);


  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  return (
    <>
      {/* ── FILTER BAR ── */}
      <div className="pt-32 pb-8 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionLabel>Portfolio</SectionLabel>
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2.5 justify-start md:justify-center px-4 md:px-0 pb-4">
            {CATEGORIES.map(({ label, Icon }) => {
              const isActive = activeTab === label;
              return (
                <button
                  key={label}
                  onClick={() => {
                    setActiveTab(label);
                    setVisibleCount(18);
                  }}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-[13px] font-bold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-[#EA580C] text-white shadow-[0_4px_12px_rgba(234,88,12,0.25)] -translate-y-0.5"
                      : "bg-transparent text-[#6B5F4B] border border-gray-100 hover:border-[#EA580C] hover:text-[#EA580C] hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
                  }`}
                >
                  <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-[#EA580C]"}`} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PROJECT GRID ── */}
      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6B5F4B] text-base">No projects found for this category.</p>
            <button
              onClick={() => setActiveTab("All")}
              className="mt-4 text-[#EA580C] font-semibold text-sm hover:underline"
            >
              Show all projects
            </button>
          </div>
        ) : (
          <>
            {/* Grid: 2 cols mobile, 3 cols desktop — matching reference exactly */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {displayedProjects.slice(0, 6).map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project);
                    setCurrentImageIndex(0);
                  }}
                >
                  {/* Uniform Image block for both image and video */}
                  <ProjectMedia project={project} />

                  {/* Info block — strictly below images */}
                  <div className="mt-3 px-1">
                    <p className="text-[14px] font-bold text-[#0D0D0D] leading-snug line-clamp-1 mb-2">
                      {project.title}
                    </p>
                    <div className="space-y-1.5 flex flex-col justify-end">
                      <p className="text-[12px] text-[#9C8F80] leading-none flex items-center gap-1.5 font-medium">
                        <svg className="w-3.5 h-3.5 text-[#EA580C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="truncate">{project.uiLocation}</span>
                      </p>
                      <p className="text-[12px] text-[#9C8F80] leading-none flex items-center gap-1.5 font-medium">
                        <svg className="w-3.5 h-3.5 text-[#EA580C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        <span className="truncate">{project.uiCategory}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 18)}
                  className="px-8 py-3 rounded-[2px] border border-[#D1CBC1] text-[#EA580C] text-[14px] font-semibold hover:border-[#EA580C] transition-colors"
                >
                  Load More Projects
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ── LIGHTBOX MODAL ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col justify-center items-center"
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedProject(null)
          }
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/5 hover:bg-[#EA580C] rounded-[2px] flex items-center justify-center text-[#0D0D0D] hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Core Image Viewer */}
          <div className="relative w-full max-w-5xl h-[85vh] flex items-center justify-center p-4 sm:p-12 mb-10" onClick={(e) =>
            e.target === e.currentTarget && setSelectedProject(null)
          }>
            {selectedProject.ytId ? (
              <div className="w-full aspect-[9/16] max-h-[85vh] bg-black rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl relative mx-auto" style={{ maxWidth: 'min(100%, 48vh)'}}>
                 <iframe 
                   src={`https://www.youtube.com/embed/${selectedProject.ytId}?autoplay=1&rel=0&modestbranding=1`} 
                   title={selectedProject.title}
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                   className="absolute inset-0 w-full h-full border-0"
                 />
              </div>
            ) : (
              <Image
                src={selectedProject.imagesList[currentImageIndex] || ""}
                alt={selectedProject.title}
                fill
                className="object-contain rounded-md select-none"
                sizes="90vw"
              />
            )}
          </div>

          {/* Navigation Controls (Only if multiple images and not a video) */}
          {!selectedProject.ytId && selectedProject.imagesList.length > 1 && (
            <div className="absolute bottom-8 flex gap-4 items-center justify-center z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? selectedProject.imagesList.length - 1 : prev - 1
                  );
                }}
                className="w-14 h-14 bg-black/5 hover:bg-[#EA580C] backdrop-blur-md rounded-[2px] text-[#0D0D0D] hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-105"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              
              <div className="flex gap-2 mx-4">
                {selectedProject.imagesList.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(i);
                    }}
                    className={`h-1.5 transition-all duration-300 ${i === currentImageIndex ? "bg-[#EA580C] w-10" : "bg-black/20 w-4 hover:bg-black/40"}`}
                    style={{ borderRadius: '1px' }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

               <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % selectedProject.imagesList.length
                  );
                }}
                className="w-14 h-14 bg-black/5 hover:bg-[#EA580C] backdrop-blur-md rounded-[2px] text-[#0D0D0D] hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-105"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface VideoTestimonial {
  id: string;
  youtube_url: string;
}

function extractVideoId(url: string): string | null {
  try {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    const match = regex.exec(url);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export default function TestimonialsSection() {
  const [videos, setVideos] = useState<VideoTestimonial[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/video-testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.videos)) setVideos(data.videos);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const hasVideos = loaded && videos.length > 0;

  // Enough duplicates to always fill 2× viewport width for seamless loop
  const looped = hasVideos
    ? [...videos, ...videos, ...videos, ...videos, ...videos]
    : [];

  return (
    <section suppressHydrationWarning className="bg-[#FAFAF9] py-20 md:py-28 overflow-hidden border-t border-gray-100">
      {/* Section heading */}
      <div suppressHydrationWarning className="max-w-7xl mx-auto px-5 sm:px-8 mb-12">
        <p className="text-[#EA580C] text-[12px] font-bold tracking-[0.18em] uppercase mb-4">
          5,000+ Happy Families Can't Be Wrong
        </p>
        <h2 className="text-4xl lg:text-[3.5rem] font-black text-[#0D0D0D] leading-[1.05] tracking-tight mb-6 max-w-4xl">
          Real Homes. Real Families. <span className="text-[#EA580C]">Real Results.</span>
        </h2>
        <p className="text-[#6B5F4B] text-base md:text-lg max-w-2xl leading-relaxed font-medium">
          We let our homeowners do the talking. No stock photos. No made-up reviews. Just honest stories from families who trusted us with the most important space in their lives — and never looked back.
        </p>
      </div>

      {/* Content area */}
      {!loaded ? null : hasVideos ? (
        /* ── MARQUEE TRACK (visible when videos exist) ── */
        <div
          suppressHydrationWarning
          className="relative w-full overflow-hidden"
          onMouseLeave={() => setActiveVideo(null)}
        >
          <div
            className="testimonials-track flex gap-4 px-5"
            style={{ width: "max-content" }}
          >
            {looped.map((v, idx) => {
              const videoId = extractVideoId(v.youtube_url);
              if (!videoId) return null;

              const key = `${videoId}-${idx}`;
              const isPlaying = activeVideo === key;

              return (
                <div
                  key={key}
                  className="flex-shrink-0 flex flex-col"
                  style={{ width: "220px" }}
                >
                  {/* Video card — 9:16 portrait matching reference */}
                  <div
                    className="relative rounded-[20px] overflow-hidden cursor-pointer bg-gray-900 shadow-md transform transition-transform hover:scale-[1.02]"
                    style={{ width: "220px", height: "390px" }}
                    onClick={() => setActiveVideo(isPlaying ? null : key)}
                  >
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                        title="Client testimonial"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-none rounded-[20px]"
                      />
                    ) : (
                      <>
                        {/* Thumbnail */}
                        <Image
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt="Client testimonial"
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="220px"
                          onError={(e) => {
                            // Fallback for maxresdefault not existing for all videos
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('hqdefault.jpg')) {
                              target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                            }
                          }}
                        />
                        {/* Subtle darkening at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        {/* Play button — exactly as reference */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                            <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[13px] border-transparent border-l-[#EA580C] ml-[3px]" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── EMPTY STATE (clean, no loading spinner) ── */
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-[20px] bg-gray-100 animate-pulse"
                style={{ height: "320px" }}
              />
            ))}
          </div>
          <p className="text-center text-[#9C8F80] text-sm mt-6">
            Client video testimonials will appear here once added.
          </p>
        </div>
      )}
    </section>
  );
}

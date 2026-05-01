"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import React from "react";

const GOOGLE_REVIEW_URL = "https://maps.app.goo.gl/DN6WEc3n8i73bZY28";

const REVIEWS = [
  {
    name: "Srinivas Maruboyina",
    stats: "1 review · 4 photos",
    time: "6 months ago",
    text: "I had an amazing experience with Happy Home interiors and waterproofing solutions.The customer service was excellent and the workmanship and products used for slab waterproofing exceeded my expectations. I highly recommend HH to anyone looking for quality works...",
    avatar: "/images/client-4.png",  // Male — young man
  },
  {
    name: "Siva Dosapati",
    stats: "3 reviews · 4 photos",
    time: "2 years ago",
    text: "I recently renovated my kitchen with the help of Happy home interior , and the results are outstanding. The open kitchen design they provided not only looks modern and stylish but is also incredibly functional.",
    avatar: "/images/client-2.png",  // Male — young man
  },
  {
    name: "Deepthi Chintalapati",
    stats: "1 review · 1 photo",
    time: "2 years ago",
    text: "Our home got a glam makeover thanks to Happy Home Interiors. The open kitchen is so stylish, it practically makes my cooking look gourmet. The TV unit is cooler than my jokes—no small feat!",
    avatar: "/images/client-1.png",  // Female — woman in saree
  },
  {
    name: "Venkatesh Sai",
    stats: "2 reviews",
    time: "5 months ago",
    text: "Best quality of work and on time professional workers.. Taken the services of kitchen interior work, well professional quality of team work....",
    avatar: "/images/client-5.png",  // Male — man with glasses
  },
  {
    name: "prince Prakash",
    stats: "Local Guide · 13 reviews · 8 photos",
    time: "5 months ago",
    text: "Very satisfied with work, not demanding higher money , always in budget, very good team work",
    avatar: "/images/client-2.png",  // Male — young man
  },
  {
    name: "Chintala Jyothi",
    stats: "3 reviews",
    time: "6 months ago",
    text: "Quality and quantity super Experience candidate there Fastly do work",
    avatar: "/images/client-1.png",  // Female — woman in saree
  },
  {
    name: "dugar19tanvi",
    stats: "1 review",
    time: "6 months ago",
    text: "Very commitment service, all work also complete intime",
    avatar: "/images/client-4.png",  // Male — young man
  },
  {
    name: "Harshavardhan Reddy",
    stats: "Local Guide · 3 reviews",
    time: "2 years ago",
    text: "I recently had the pleasure of working with happy home interiors for all the interior work in my home and the experience has been nothing short of exceptional from the initial consultation to the final touches their team demonstrated professionalism...",
    avatar: "/images/client-3.png",  // Male — senior man
  },
  {
    name: "Sunitha Lavanya",
    stats: "Local Guide · 7 reviews · 29 photos",
    time: "2 years ago",
    text: "Excellent service with affordable pricing. Very much satisfied with quality of work",
    avatar: "/images/client-1.png",  // Female — woman in saree
  },
  {
    name: "Praveen Koppuravuri",
    stats: "10 reviews",
    time: "2 years ago",
    text: "Wonderful teamwork and Value for money with Innovation",
    avatar: "/images/client-3.png",  // Male — senior man
  },
  {
    name: "Raju G",
    stats: "1 review",
    time: "4 years ago",
    text: "Positive Quality",
    avatar: "/images/client-5.png",  // Male — man with glasses
  },
];

// Split reviews into two rows for dual-direction scrolling
const ROW_1 = REVIEWS.slice(0, 6);
const ROW_2 = REVIEWS.slice(6);

const ReviewCard = ({ review }: { review: typeof REVIEWS[0] }) => {
  return (
    <div className="flex-shrink-0 w-[350px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#EA580C]/20 transition-all duration-300 mx-3 flex flex-col h-[240px] whitespace-normal">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
            <Image src={review.avatar} alt={`${review.name} - Happy Home Interiors client review`} fill className="object-cover" unoptimized />
          </div>
          <div>
            <h4 className="font-bold text-[#0D0D0D] text-sm leading-tight">{review.name}</h4>
            <span className="text-[11px] text-gray-500 block mt-0.5">{review.stats}</span>
          </div>
        </div>
        <div className="w-5 h-5 flex-shrink-0">
          <svg viewBox="0 0 48 48" className="w-full h-full"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"></path><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"></path><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"></path><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"></path></svg>
        </div>
      </div>
      
      <div className="flex items-center gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-3.5 h-3.5 fill-[#EA580C] text-[#EA580C]" />
        ))}
        <span className="text-xs text-gray-400 ml-2 font-medium">{review.time}</span>
      </div>

      <p className="text-[13px] text-[#6B5F4B] leading-relaxed line-clamp-4 mt-1 font-medium">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
};

export default function GoogleReviewsMarquee() {
  return (
    <section className="py-20 md:py-28 bg-gray-50 overflow-hidden relative border-y border-gray-100">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12 md:mb-16 text-center">
        {/* Google icon + orange stars */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg viewBox="0 0 48 48" className="w-8 h-8"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"></path><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"></path><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"></path><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"></path></svg>
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-[#EA580C] text-[#EA580C]" />
            ))}
          </div>
        </div>

        <h2 className="text-3xl md:text-[2.5rem] font-black text-[#0D0D0D] mb-4 tracking-tight leading-tight">
          Rated <span className="text-[#EA580C]">4.9/5</span> on <span className="text-[#EA580C]">Google</span>
        </h2>
        <p className="text-sm md:text-base text-[#6B5F4B] font-medium max-w-2xl mx-auto mb-8">
          Don&apos;t just take our word for it. Read real reviews from homeowners across Andhra Pradesh and Telangana who chose Happy Home Interiors.
        </p>

        {/* CTA — Write a Google Review */}
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] active:scale-[0.98] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#EA580C]/20 hover:shadow-[#EA580C]/35 hover:-translate-y-0.5"
        >
          <Star className="w-4 h-4 fill-white" />
          Write a Google Review
          <span className="transition-transform">→</span>
        </a>
      </div>

      {/* ── ROW 1 — Scrolls LEFT ── */}
      <div className="relative w-full overflow-hidden select-none mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
          {ROW_1.map((review, idx) => (
            <ReviewCard key={`r1a-${idx}`} review={review} />
          ))}
          {ROW_1.map((review, idx) => (
            <ReviewCard key={`r1b-${idx}`} review={review} />
          ))}
        </div>
      </div>

      {/* ── ROW 2 — Scrolls RIGHT (opposite direction) ── */}
      <div className="relative w-full overflow-hidden select-none">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
          {ROW_2.map((review, idx) => (
            <ReviewCard key={`r2a-${idx}`} review={review} />
          ))}
          {ROW_2.map((review, idx) => (
            <ReviewCard key={`r2b-${idx}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

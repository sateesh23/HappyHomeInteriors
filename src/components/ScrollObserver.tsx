"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    const activate = (el: Element) => el.classList.add("is-visible");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,           // Trigger earlier
        rootMargin: "60px 0px 0px 0px", // Trigger slightly before element enters view
      }
    );

    const elements = document.querySelectorAll(".animate-reveal");

    elements.forEach((el) => {
      // If already visible in viewport on mount, activate immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        activate(el);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

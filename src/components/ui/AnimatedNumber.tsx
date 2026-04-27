"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimatedNumberProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedNumber({ end, suffix = "", duration = 2000 }: AnimatedNumberProps) {
  const [value, setValue] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const interval = 20;
    const steps = duration / interval;
    const increment = end / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(increment * currentStep));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, end, duration]);

  const displayValue = value.toLocaleString();

  return (
    <span ref={ref} suppressHydrationWarning>
      {displayValue}{suffix}
    </span>
  );
}

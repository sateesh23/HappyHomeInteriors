"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  fallbackClass?: string;
}

const CREAM_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGNUYwRTgiLz48L3N2Zz4=";

/**
 * SafeImg — a fill-mode next/image wrapper.
 * Parent MUST have  `position: relative`  and explicit dimensions.
 * Pass className for the <Image> element (e.g. "object-cover").
 */
export default function SafeImg({ src, alt, className = "", fallbackClass = "" }: Props) {
  const [imgSrc, setImgSrc] = useState(src || CREAM_PLACEHOLDER);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      placeholder="blur"
      blurDataURL={CREAM_PLACEHOLDER}
      sizes="(max-width: 768px) 100vw, 50vw"
      onError={() => setImgSrc(CREAM_PLACEHOLDER)}
    />
  );
}

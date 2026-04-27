import { Playfair_Display, DM_Sans } from "next/font/google";
import React from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  weight: ["400", "500", "700"],
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} ${dmSans.variable} font-sans`}>
      {children}
    </div>
  );
}

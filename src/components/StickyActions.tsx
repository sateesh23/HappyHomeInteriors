"use client";

import { useState } from "react";
import { BUSINESS_DETAILS } from "@/constants/content";

export default function StickyActions() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <a
        href={`https://wa.me/${BUSINESS_DETAILS.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto bg-[#25D366] text-white rounded-md shadow-2xl flex items-center overflow-hidden transition-all duration-300 ease-in-out border border-white/20 h-14"
        style={{ width: hovered ? '260px' : '56px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="WhatsApp Us"
      >
        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
          <svg className="w-8 h-8 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12.004 2c-5.46 0-9.89 4.43-9.89 9.892 0 1.745.457 3.447 1.326 4.947L2 22l5.35-1.405a9.852 9.852 0 004.654 1.157c5.459 0 9.889-4.432 9.889-9.893C21.893 6.43 17.463 2 12.004 2zm5.412 14.18c-.22.617-1.282 1.189-1.8 1.29-.444.086-1.025.143-3.238-.773-2.65-1.1-4.358-3.823-4.488-3.996-.13-.173-1.073-1.425-1.073-2.716 0-1.291.674-1.928.918-2.188.244-.26.531-.325.707-.325.176 0 .353 0 .506.008.16.009.378-.063.593.46.223.541.71 1.734.775 1.864.065.13.108.282.022.455-.087.174-.13.282-.26.434-.131.152-.275.32-.393.435-.13.124-.265.26-.118.513.146.252.651 1.076 1.398 1.746.963.864 1.76 1.135 2.005 1.258.245.123.388.101.533-.064.145-.165.626-.732.792-.984.166-.252.331-.21.554-.124.223.086 1.411.666 1.654.788.244.122.406.182.464.283.058.101.058.587-.162 1.204z" clipRule="evenodd" />
          </svg>
        </div>
        <span 
          className="whitespace-nowrap font-bold text-sm tracking-tight pr-5"
          style={{ 
            opacity: hovered ? 1 : 0, 
            transition: 'opacity 0.2s', 
            transitionDelay: hovered ? '0.1s' : '0s' 
          }}
        >
          Message the team directly!
        </span>
      </a>
    </div>
  );
}

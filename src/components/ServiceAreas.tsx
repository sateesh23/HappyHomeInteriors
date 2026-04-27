import { SERVICE_AREAS } from "@/constants/content";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function ServiceAreas() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center w-full py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col flex-wrap justify-center items-center text-center animate-reveal is-visible mb-14 md:mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-[#0D0D0D] leading-[1.1] tracking-tight mb-4 max-w-4xl">
            Serving <span className="text-[#EA580C]">Homes</span> Across South India
          </h2>
          <p className="text-sm md:text-base text-[#6B5F4B] max-w-2xl text-center leading-relaxed font-medium mb-8">
            For 12 years, we’ve been delivering beautiful, custom turnkey homes across Andhra Pradesh, Telangana, and Tamil Nadu.
          </p>
          <div className="flex justify-center w-full">
            <AnimatedButton href="/contact" text="Check Availability" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: SVG Map */}
          <div className="animate-reveal flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Simplified South India Map SVG */}
              <svg
                viewBox="0 0 300 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full drop-shadow-xl"
              >
                {/* Background glow */}
                <ellipse cx="150" cy="190" rx="130" ry="170" fill="rgba(201,168,76,0.04)" />

                {/* Telangana (upper left area) */}
                <path
                  d="M80 80 L160 70 L185 95 L190 130 L170 155 L140 160 L110 148 L75 130 L70 105 Z"
                  fill="#EA580C"
                  fillOpacity="0.25"
                  stroke="#EA580C"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <text x="118" y="122" fill="#EA580C" fontSize="9" fontWeight="700" textAnchor="middle">TELANGANA</text>

                {/* Andhra Pradesh (right and lower area) */}
                <path
                  d="M185 95 L230 85 L250 110 L255 150 L240 185 L215 210 L190 230 L175 255 L160 275 L145 290 L135 280 L140 255 L155 225 L165 200 L155 175 L140 160 L170 155 L190 130 Z"
                  fill="#EA580C"
                  fillOpacity="0.2"
                  stroke="#EA580C"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <text x="210" y="165" fill="#EA580C" fontSize="9" fontWeight="700" textAnchor="middle">ANDHRA</text>
                <text x="210" y="177" fill="#EA580C" fontSize="9" fontWeight="700" textAnchor="middle">PRADESH</text>

                {/* Tamil Nadu (bottom) */}
                <path
                  d="M135 280 L145 290 L150 310 L140 340 L120 355 L100 345 L90 325 L95 300 L110 285 Z"
                  fill="#6B5F4B"
                  fillOpacity="0.15"
                  stroke="#6B5F4B"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <text x="120" y="320" fill="#6B5F4B" fontSize="8" textAnchor="middle">Tamil Nadu</text>

                {/* City dots */}
                {/* Visakhapatnam (HQ) */}
                <circle cx="238" cy="140" r="7" fill="#EA580C" />
                <circle cx="238" cy="140" r="12" fill="#EA580C" fillOpacity="0.2" />
                <text x="248" y="137" fill="white" fontSize="7.5" fontWeight="700">Vizag (HQ)</text>

                {/* Hyderabad */}
                <circle cx="118" cy="122" r="4" fill="#EA580C" />
                <text x="128" y="122" fill="#6B5F4B" fontSize="6.5">Hyderabad</text>

                {/* Vijayawada */}
                <circle cx="188" cy="190" r="3.5" fill="#EA580C" />
                <text x="196" y="193" fill="#6B5F4B" fontSize="6.5">Vijayawada</text>

                {/* Guntur */}
                <circle cx="183" cy="210" r="3" fill="#EA580C" />
                <text x="191" y="213" fill="#6B5F4B" fontSize="6.5">Guntur</text>

                {/* Chennai */}
                <circle cx="140" cy="340" r="3.5" fill="#6B5F4B" />
                <text x="148" y="343" fill="#6B5F4B" fontSize="6.5">Chennai</text>
              </svg>
            </div>
          </div>

          {/* Right: Location badges + text */}
          <div className="animate-reveal delay-200">
            <div className="grid grid-cols-2 gap-3 mb-8">
              {SERVICE_AREAS.map((area) => (
                <div
                  key={area.name}
                  className={`location-pill ${area.isHQ ? "bg-[#EA580C]/10 border-[#EA580C] font-bold" : ""}`}
                >
                  <span className="text-[#EA580C] text-base">📍</span>
                  <span className="text-[#0D0D0D] text-sm">
                    {area.name}
                    {area.isHQ && <span className="ml-1 text-[#EA580C] text-xs">(HQ)</span>}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-[2px] p-6 shadow-sm">
              <p className="text-[#EA580C] text-xs font-bold tracking-widest uppercase mb-3">
                Service Coverage
              </p>
              <p className="text-[#6B5F4B] text-sm leading-relaxed">
                Available for residential & commercial projects across all
                districts of Andhra Pradesh and Telangana. Now expanding to
                Chennai and Tamil Nadu.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Andhra Pradesh", "Telangana", "Tamil Nadu"].map((state) => (
                  <span
                    key={state}
                    className="text-xs font-semibold text-[#EA580C] bg-[#EA580C]/10 border border-[#EA580C]/25 rounded-[2px] px-3 py-1"
                  >
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

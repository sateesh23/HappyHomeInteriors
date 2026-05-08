import SectionLabel from "@/components/ui/SectionLabel";

const BRANDS = [
  { name: "Asian Paints", tag: "Gold Contractor" },
  { name: "Hettich", tag: "Hardware" },
  { name: "Hafele", tag: "Fittings" },
  { name: "Greenply", tag: "Plywood" },
  { name: "Century Ply", tag: "Laminates" },
  { name: "Ultratech", tag: "Authorized" },
  { name: "Mapei", tag: "Applicator" },
  { name: "Ebco", tag: "Accessories" },
];

export default function MaterialBrands() {
  return (
    <section className="w-full py-16 md:py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
        <SectionLabel>Materials We Trust</SectionLabel>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0D0D0D] leading-tight tracking-tight mb-3 max-w-3xl mx-auto">
          Built With India&apos;s <span className="text-[#EA580C]">Most Trusted</span> Brands
        </h2>
        <p className="text-sm md:text-base text-[#6B5F4B] max-w-2xl mx-auto leading-relaxed font-medium mb-10">
          We only use certified, industry-leading materials — because your home deserves products that last decades, not months.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#EA580C]/20 transition-all duration-300 flex flex-col items-center justify-center gap-2 group"
            >
              <span className="text-lg sm:text-xl font-black text-[#0D0D0D] group-hover:text-[#EA580C] transition-colors">
                {brand.name}
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#EA580C] uppercase">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

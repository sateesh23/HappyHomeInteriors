import { PROCESS } from "@/constants/content";

export default function Process() {
  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-4">
            How It <span className="text-[#EA580C]">Works</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-textSecondary max-w-2xl mx-auto">
            A simple, stress-free process designed for homeowners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line for large screens */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-200 z-0"></div>
          
          {PROCESS.map((p, idx) => (
            <div key={p.step} className={`animate-reveal ${idx === 1 ? 'delay-100' : idx === 2 ? 'delay-200' : idx === 3 ? 'delay-300' : ''} relative z-10 flex flex-col items-center text-center`}>
              <div className="w-16 h-16 bg-white rounded-md border-4 border-primary flex items-center justify-center shadow-md mb-6 text-2xl font-bold text-primary">
                {p.step}
              </div>
              <h3 className="font-bold text-xl text-textPrimary">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

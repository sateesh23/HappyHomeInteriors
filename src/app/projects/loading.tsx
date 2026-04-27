export default function LoadingProjects() {
  return (
    <main className="min-h-screen bg-white">
      {/* Skeleton Filter Bar */}
      <div className="pt-32 pb-8 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="w-24 h-10 rounded-full bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Skeleton Masonry Grid Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-24">
        {/* Empty state shimmer items imitating project blocks */}
        <div className="flex flex-col gap-16">
          {[1, 2].map((row) => (
            <div key={row} className="flex flex-col mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                <div className="aspect-[4/5] bg-gray-100 rounded-xl animate-pulse" />
                <div className="aspect-[4/5] bg-gray-100 rounded-xl animate-pulse hidden md:block" />
                <div className="aspect-[4/5] bg-gray-100 rounded-xl animate-pulse hidden lg:block" />
              </div>
              <div className="flex flex-col gap-2 mt-4 ml-2">
                <div className="h-5 bg-gray-100 w-48 rounded animate-pulse" />
                <div className="h-4 bg-gray-50 w-32 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function ReviewsLoading() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        <div className="mb-10">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-56 bg-gray-200 rounded mt-3 animate-pulse" />
          <div className="h-4 w-72 bg-gray-200 rounded mt-3 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="w-5 h-5 bg-gray-200 rounded" />
                ))}
              </div>
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded mt-2" />
              <div className="h-3 w-24 bg-gray-200 rounded mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
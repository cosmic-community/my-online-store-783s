export default function CategoriesLoading() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        <div className="mb-10">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-48 bg-gray-200 rounded mt-3 animate-pulse" />
          <div className="h-4 w-72 bg-gray-200 rounded mt-3 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
import type { Metadata } from 'next'
import { getCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const metadata: Metadata = {
  title: 'Categories | My Online Store',
  description: 'Browse our product categories.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        <div className="mb-10">
          <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Browse By</span>
          <h1 className="section-heading mt-2">All Categories</h1>
          <p className="mt-3 text-gray-500 max-w-2xl">
            Explore our {categories.length} product categories to find exactly what you need.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <svg className="mx-auto w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <p className="mt-4 text-gray-500 text-lg font-medium">No categories available yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
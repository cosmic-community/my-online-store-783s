import type { Metadata } from 'next'
import { getProducts, getReviews } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Products | My Online Store',
  description: 'Browse our full collection of quality products.',
}

export default async function ProductsPage() {
  const [products, reviews] = await Promise.all([
    getProducts(),
    getReviews(),
  ])

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        {/* Page Header */}
        <div className="mb-10">
          <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Our Collection</span>
          <h1 className="section-heading mt-2">All Products</h1>
          <p className="mt-3 text-gray-500 max-w-2xl">
            Discover our curated selection of {products.length} quality products.
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} reviews={reviews} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <svg className="mx-auto w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="mt-4 text-gray-500 text-lg font-medium">No products available yet</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for new arrivals!</p>
          </div>
        )}
      </div>
    </div>
  )
}
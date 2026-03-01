import Link from 'next/link'
import { getProducts, getCategories, getReviews } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ])

  const featuredProducts = products.slice(0, 4)
  const latestReviews = reviews.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="page-container relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-300 text-sm font-semibold rounded-full mb-6 backdrop-blur-sm border border-accent-500/30">
              Welcome to Our Store
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Discover Quality{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
                Products
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-200 leading-relaxed max-w-xl">
              Browse our curated collection of products, explore categories, and see what our customers are saying.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl shadow-lg shadow-accent-500/30 transition-all duration-300 hover:shadow-accent-500/50 hover:-translate-y-0.5"
              >
                Shop Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="page-container py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-brand-600">{products.length}</p>
              <p className="text-sm text-gray-500 mt-1">Products</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-600">{categories.length}</p>
              <p className="text-sm text-gray-500 mt-1">Categories</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-600">{reviews.length}</p>
              <p className="text-sm text-gray-500 mt-1">Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="page-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Our Collection</span>
              <h2 className="section-heading mt-2">Featured Products</h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              View All
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} reviews={reviews} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 text-lg">No products available yet.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for new arrivals!</p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              View All Products
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Browse By</span>
            <h2 className="section-heading mt-2">Shop Categories</h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              Find exactly what you&apos;re looking for by browsing our curated categories.
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-500 text-lg">No categories available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="page-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Testimonials</span>
              <h2 className="section-heading mt-2">Customer Reviews</h2>
            </div>
            <Link
              href="/reviews"
              className="hidden sm:inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              All Reviews
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {latestReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 text-lg">No reviews yet.</p>
              <p className="text-gray-400 text-sm mt-2">Be the first to leave a review!</p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/reviews"
              className="inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              View All Reviews
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-700 to-brand-900">
        <div className="page-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to Start Shopping?
          </h2>
          <p className="mt-4 text-brand-200 text-lg max-w-md mx-auto">
            Explore our full catalog and find the perfect products for you.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl shadow-lg shadow-accent-500/30 transition-all duration-300 hover:shadow-accent-500/50 hover:-translate-y-0.5"
          >
            Browse All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
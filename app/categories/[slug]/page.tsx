// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategoryBySlug, getProductsByCategory, getReviews } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found | My Online Store' }
  }

  return {
    title: `${category.metadata?.name || category.title} | My Online Store`,
    description: category.metadata?.description || 'Browse products in this category.',
  }
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const [products, reviews] = await Promise.all([
    getProductsByCategory(category.id),
    getReviews(),
  ])

  const imageUrl = category.metadata?.category_image?.imgix_url
  const description = category.metadata?.description || ''

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/categories" className="hover:text-brand-600 transition-colors">Categories</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">{category.metadata?.name || category.title}</span>
        </nav>

        {/* Category Header */}
        <div className="relative rounded-2xl overflow-hidden mb-10">
          {imageUrl ? (
            <div className="relative h-48 sm:h-64">
              <img
                src={`${imageUrl}?w=1400&h=500&fit=crop&auto=format,compress`}
                alt={category.metadata?.name || category.title}
                width={1400}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {category.metadata?.name || category.title}
                </h1>
                {description && (
                  <p className="mt-2 text-white/80 max-w-xl">{description}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {category.metadata?.name || category.title}
              </h1>
              {description && (
                <p className="mt-2 text-white/80 max-w-xl">{description}</p>
              )}
            </div>
          )}
        </div>

        {/* Products in Category */}
        <div className="mb-6">
          <p className="text-gray-500">
            {products.length} product{products.length !== 1 ? 's' : ''} in this category
          </p>
        </div>

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
            <p className="mt-4 text-gray-500 text-lg font-medium">No products in this category yet</p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center text-brand-600 hover:text-brand-700 font-semibold"
            >
              Browse all products
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
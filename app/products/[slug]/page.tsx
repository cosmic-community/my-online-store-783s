// app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { getProductBySlug, getReviewsByProduct } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found | My Online Store' }
  }

  return {
    title: `${product.metadata?.name || product.title} | My Online Store`,
    description: product.metadata?.description || 'View product details.',
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)

  const price = product.metadata?.price
  const formattedPrice = price != null ? `$${Number(price).toFixed(2)}` : 'Price unavailable'
  const isInStock = product.metadata?.in_stock === true || product.metadata?.in_stock === 'true'
  const imageUrl = product.metadata?.product_image?.imgix_url
  const category = product.metadata?.category
  const description = product.metadata?.description || product.content || ''

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.metadata?.rating || 0), 0) / reviews.length
      : 0

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/products" className="hover:text-brand-600 transition-colors">Products</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium truncate">{product.metadata?.name || product.title}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative">
            {imageUrl ? (
              <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                <img
                  src={`${imageUrl}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={product.metadata?.name || product.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200">
                <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Stock Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  isInStock
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isInStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                {isInStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex self-start items-center px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full hover:bg-brand-100 transition-colors mb-4"
              >
                {category.metadata?.name || category.title}
              </Link>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {product.metadata?.name || product.title}
            </h1>

            {/* Rating */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                <StarRating rating={averageRating} />
                <span className="text-sm text-gray-500">
                  {averageRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            )}

            {/* Price */}
            <p className="mt-6 text-4xl font-bold text-brand-600">{formattedPrice}</p>

            {/* Description */}
            {description && (
              <div className="mt-6 prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                disabled={!isInStock}
                className={`flex-1 sm:flex-none px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  isInStock
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isInStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <Link
                href="/products"
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews ({reviews.length})
          </h2>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
              <svg className="mx-auto w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="mt-3 text-gray-500">No reviews yet for this product.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
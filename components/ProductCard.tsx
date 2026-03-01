import Link from 'next/link'
import type { ProductObject, ReviewObject } from '@/types'
import StarRating from '@/components/StarRating'

interface ProductCardProps {
  product: ProductObject
  reviews?: ReviewObject[]
}

export default function ProductCard({ product, reviews = [] }: ProductCardProps) {
  const price = product.metadata?.price
  const formattedPrice = price != null ? `$${Number(price).toFixed(2)}` : 'Price N/A'
  const isInStock = product.metadata?.in_stock === true || product.metadata?.in_stock === 'true'
  const imageUrl = product.metadata?.product_image?.imgix_url
  const category = product.metadata?.category
  const name = product.metadata?.name || product.title

  const productReviews = reviews.filter(
    (r) => r.metadata?.product?.id === product.id
  )

  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + Number(r.metadata?.rating || 0), 0) / productReviews.length
      : 0

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Stock Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                isInStock
                  ? 'bg-emerald-100/90 text-emerald-700'
                  : 'bg-red-100/90 text-red-700'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isInStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {isInStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          {category && (
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
              {category.metadata?.name || category.title}
            </span>
          )}

          {/* Name */}
          <h3 className="mt-1.5 text-base font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
            {name}
          </h3>

          {/* Rating */}
          {productReviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={averageRating} size="sm" />
              <span className="text-xs text-gray-500">({productReviews.length})</span>
            </div>
          )}

          {/* Price */}
          <p className="mt-3 text-xl font-bold text-brand-600">{formattedPrice}</p>
        </div>
      </div>
    </Link>
  )
}
import Link from 'next/link'
import type { ReviewObject } from '@/types'
import StarRating from '@/components/StarRating'

interface ReviewCardProps {
  review: ReviewObject
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous'
  const rating = Number(review.metadata?.rating || 0)
  const comment = review.metadata?.comment || ''
  const product = review.metadata?.product

  const initials = reviewerName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 card-hover flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-white">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm">{reviewerName}</p>
          <div className="mt-1">
            <StarRating rating={rating} size="sm" />
          </div>
        </div>
      </div>

      {/* Comment */}
      {comment && (
        <p className="mt-4 text-gray-600 text-sm leading-relaxed flex-1 line-clamp-4">
          &ldquo;{comment}&rdquo;
        </p>
      )}

      {/* Product Link */}
      {showProduct && product && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            {product.metadata?.product_image?.imgix_url && (
              <img
                src={`${product.metadata.product_image.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={product.metadata?.name || product.title}
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-cover border border-gray-100"
              />
            )}
            <span className="truncate">{product.metadata?.name || product.title}</span>
          </Link>
        </div>
      )}
    </div>
  )
}
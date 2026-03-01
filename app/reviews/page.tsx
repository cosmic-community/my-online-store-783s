import type { Metadata } from 'next'
import { getReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export const metadata: Metadata = {
  title: 'Customer Reviews | My Online Store',
  description: 'See what our customers are saying about our products.',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.metadata?.rating || 0), 0) / reviews.length
      : 0

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        <div className="mb-10">
          <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Testimonials</span>
          <h1 className="section-heading mt-2">Customer Reviews</h1>
          <p className="mt-3 text-gray-500 max-w-2xl">
            See what our customers are saying about their purchases.
          </p>
        </div>

        {/* Summary */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-brand-600">{averageRating.toFixed(1)}</p>
              <div className="flex items-center justify-center mt-2 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-accent-400' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="hidden sm:block w-px h-20 bg-gray-200" />
            <div className="flex-1 w-full space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => Math.round(Number(r.metadata?.rating || 0)) === star).length
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-3">{star}</span>
                    <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <svg className="mx-auto w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="mt-4 text-gray-500 text-lg font-medium">No reviews yet</p>
            <p className="text-gray-400 text-sm mt-2">Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  )
}
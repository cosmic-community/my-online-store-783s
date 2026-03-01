import Link from 'next/link'
import type { CategoryObject } from '@/types'

interface CategoryCardProps {
  category: CategoryObject
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl = category.metadata?.category_image?.imgix_url
  const name = category.metadata?.name || category.title
  const description = category.metadata?.description || ''

  return (
    <Link href={`/categories/${category.slug}`} className="group">
      <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 card-hover">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={name}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
              <svg className="w-16 h-16 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-xl font-bold text-white group-hover:text-accent-300 transition-colors">
              {name}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-white/80 line-clamp-2">{description}</p>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="px-5 py-3 flex items-center justify-between bg-gray-50/50">
          <span className="text-sm font-medium text-brand-600">Browse Products</span>
          <svg
            className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
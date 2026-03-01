export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

export interface CategoryObject extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
    category_image?: {
      url: string
      imgix_url: string
    }
  }
}

export interface ProductObject extends CosmicObject {
  type: 'products'
  metadata: {
    name?: string
    description?: string
    product_image?: {
      url: string
      imgix_url: string
    }
    price?: string | number
    in_stock?: boolean | string
    category?: CategoryObject
  }
}

export interface ReviewObject extends CosmicObject {
  type: 'reviews'
  metadata: {
    reviewer_name?: string
    rating?: number | string
    comment?: string
    product?: ProductObject
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}
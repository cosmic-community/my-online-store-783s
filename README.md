# My Online Store

![My Online Store](https://imgix.cosmicjs.com/0c523900-d95b-11ee-bfe4-0f27d2b90184-grocery.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive e-commerce storefront built with **Next.js 16** and **Cosmic CMS**. Browse products, explore categories, and read customer reviews — all powered by headless content management.

## Features

- 🛍️ **Product Catalog** — Beautiful product cards with images, pricing, and stock indicators
- 🏷️ **Category Browsing** — Organized product categories with dedicated pages
- ⭐ **Customer Reviews** — Star ratings and authentic customer feedback
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js 16 App Router
- 🎨 **Modern UI** — Tailwind CSS with smooth animations and transitions
- 🔍 **SEO Optimized** — Proper metadata and semantic HTML

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a4b954bc78fb157ac1dd9b&clone_repository=69a4baa7bc78fb157ac1ddc3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'My Online Store'. The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic CMS](https://www.cosmicjs.com/docs) — Headless content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file with:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the store.

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Reviews for a Product

```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three content types from Cosmic:

| Object Type | Fields | Purpose |
|---|---|---|
| **Products** | name, description, product_image, price, in_stock, category | Product catalog |
| **Categories** | name, description, category_image | Product organization |
| **Reviews** | reviewer_name, rating, comment, product | Customer feedback |

All data is fetched server-side using the Cosmic SDK with `depth(1)` for related object data.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add your environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY)
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Add your environment variables
5. Deploy

<!-- README_END -->
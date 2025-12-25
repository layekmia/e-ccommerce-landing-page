import { Metadata } from 'next'
import { getProduct } from '@/lib/sanity/product'

/**
 * Generate dynamic metadata for the page based on product data
 */
export async function getPageMetadata(): Promise<Metadata> {
  const product = await getProduct()
  
  // Fallback metadata if product not found
  const defaultTitle = "Premium Skincare Products - Bangladesh"
  const defaultDescription = "High-quality skincare products with Cash on Delivery. Free delivery all over Bangladesh."
  
  if (!product) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: defaultTitle,
        description: defaultDescription,
      },
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const title = `${product.name} - ${product.headline}`
  const description = product.subheadline || `${product.name}. ${product.offerText}. ${product.freeDeliveryText}`
  const imageUrl = product.heroImage?.url || `${siteUrl}/og-image.jpg`

  return {
    title: {
      default: title,
      template: `%s | ${product.brandName}`,
    },
    description,
    keywords: [
      product.name,
      product.brandName,
      'skincare',
      'beauty products',
      'Bangladesh',
      'COD',
      'cash on delivery',
      'free delivery',
    ],
    authors: [{ name: product.brandName }],
    creator: product.brandName,
    publisher: product.brandName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: product.brandName,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.heroImage?.alt || product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: siteUrl,
    },
    other: {
      'product:price:amount': product.discountedPrice.toString(),
      'product:price:currency': product.currency === '৳' ? 'BDT' : 'USD',
    },
  }
}


"use client";

import { Product } from "@/types/product";
import { useEffect } from "react";

interface SEOProps {
  product: Product;
}

export default function SEO({ product }: SEOProps) {
  useEffect(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
    const title = `${product.name} - ${product.headline}`;
    const description = product.subheadline || `${product.name}. ${product.offerText}. ${product.freeDeliveryText}`;
    const imageUrl = product.heroImage?.url || `${siteUrl}/og-image.jpg`;
    
    // Calculate average rating from reviews
    const averageRating = product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 5;

    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', `${product.name}, ${product.brandName}, skincare, beauty, Bangladesh, COD, cash on delivery`);
    updateMetaTag('author', product.brandName);
    
    // Open Graph tags
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', siteUrl, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', imageUrl, true);
    updateMetaTag('og:site_name', product.brandName, true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', imageUrl);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', siteUrl);

    // Structured Data (JSON-LD) for Product
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: description,
      image: imageUrl,
      brand: {
        "@type": "Brand",
        name: product.brandName,
      },
      offers: {
        "@type": "Offer",
        url: siteUrl,
        priceCurrency: product.currency === "৳" ? "BDT" : "USD",
        price: product.discountedPrice.toString(),
        priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        ...(product.codEnabled && {
          paymentMethod: "CashOnDelivery",
        }),
      },
      ...(product.reviews.length > 0 && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: averageRating.toFixed(1),
          reviewCount: product.reviews.length,
          bestRating: "5",
          worstRating: "1",
        },
        review: product.reviews.slice(0, 5).map((review) => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: review.name,
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating.toString(),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: review.comment,
        })),
      }),
      ...(product.faqs && product.faqs.length > 0 && {
        mainEntity: {
          "@type": "FAQPage",
          mainEntity: product.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      }),
    };

    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [product]);

  return null;
}


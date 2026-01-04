// lib/sanity/fetch-client.ts
import { client } from "./client";

// Cache profiles for your single product
type CacheProfile = "product" | "page" | "layout" | "max";

export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
  profile = "product" as CacheProfile, // Default to 'product'
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  profile?: CacheProfile;
}): Promise<T> {
  try {
    // For single product, we can optimize
    const isSingleProduct = query.includes('_id == "product"');

    // Development: no cache
    if (process.env.NODE_ENV === "development") {
      return await client.fetch(query, params, {
        next: { revalidate: 0 },
      });
    }

    // Production cache configuration
    const cacheConfig: any = {
      next: { tags },
    };

    // Set revalidate based on profile
    if (profile !== "max") {
      switch (profile) {
        case "product": // Your single product
          cacheConfig.next.revalidate = 60; // 1 minute fallback
          cacheConfig.next.profile = "product"; // Use product profile from next.config
          break;
        case "layout":
          cacheConfig.next.revalidate = 3600; // 1 hour
          break;
        case "page":
        default:
          cacheConfig.next.revalidate = 300; // 5 minutes
          break;
      }
    }

    return await client.fetch(query, params, cacheConfig);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw error;
  }
}

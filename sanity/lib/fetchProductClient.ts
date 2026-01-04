// lib/sanity/fetch-client.ts
import { client } from "./client";

// Cache profiles for your single product
type CacheProfile = "product" | "page" | "layout" | "max";

// Update fetch-client.ts
export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
  profile = "product" as CacheProfile, // Always use "product"
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  profile?: CacheProfile;
}): Promise<T> {
  try {
    // Always use "product" profile for everything
    const cacheConfig: any = {
      next: {
        tags,
        profile: "product", // Force product profile
      },
    };

    return await client.fetch(query, params, cacheConfig);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw error;
  }
}

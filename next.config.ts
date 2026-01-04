import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  experimental: {
    cacheLife: {
      // For single product page
      product: {
        stale: 0, // No stale content
        revalidate: 3600, // 1 hour
        expire: 7200, // 2 hours
      },
    },
  },
};

export default nextConfig;

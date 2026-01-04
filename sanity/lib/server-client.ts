// sanity/lib/server-client.ts
import { createClient } from "@sanity/client";

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_TOKEN, // NEW: Add server token
  useCdn: false, // Important: Disable CDN for writes
});

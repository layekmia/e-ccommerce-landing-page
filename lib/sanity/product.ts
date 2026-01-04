import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";

/**
 * GROQ query to fetch product data from Sanity
 */
const productQuery = `*[_type == "product" && _id == "product"][0] {
  _id,
  name,
  headline,
  subheadline,
  heroImage,
  originalPrice,
  discountedPrice,
  currency,
  offerText,
  sections,
  problemSolution,
  benefits,
  howToUse,
  ingredients,
  beforeAfter,
  reviews,
  faqs,
  brandName,
  whatsappNumber,
  facebookUrl,
  codEnabled,
  codText,
  freeDeliveryText
}`;

/**
 * Fetch product data from Sanity CMS
 */
export async function getProduct(): Promise<Product | null> {
  try {
    const data = await client.fetch(
      productQuery,
      {},
      {
        // Remove cache: "no-store" and next.revalidate: 0
        // Add cache tag for revalidation
        next: { tags: ["product"] },
      }
    );

    if (!data) {
      console.warn(
        "No product found in Sanity. Make sure to seed your product data."
      );
      return null;
    }

    // Transform Sanity data to match Product interface
    // The structure should already match, but we ensure type safety
    return {
      name: data.name || "",
      headline: data.headline || "",
      subheadline: data.subheadline || "",
      heroImage: data.heroImage || { url: "", alt: "" },
      originalPrice: data.originalPrice || 0,
      discountedPrice: data.discountedPrice || 0,
      currency: data.currency || "৳",
      offerText: data.offerText || "",
      sections: data.sections || {
        hero: true,
        problemSolution: true,
        benefits: true,
        howToUse: true,
        ingredients: true,
        beforeAfter: false,
        reviews: true,
        pricing: true,
        orderForm: true,
        faq: true,
        footer: true,
      },
      problemSolution: data.problemSolution || [],
      benefits: data.benefits || [],
      howToUse: data.howToUse || [],
      ingredients: data.ingredients || [],
      beforeAfter: data.beforeAfter,
      reviews: data.reviews || [],
      faqs: data.faqs || [],
      brandName: data.brandName || "",
      whatsappNumber: data.whatsappNumber || "",
      facebookUrl: data.facebookUrl || "",
      codEnabled: data.codEnabled ?? true,
      codText: data.codText || "Cash on Delivery Available",
      freeDeliveryText:
        data.freeDeliveryText || "Free Delivery All Over Bangladesh",
    } as Product;
  } catch (error) {
    console.error("Error fetching product from Sanity:", error);
    return null;
  }
}

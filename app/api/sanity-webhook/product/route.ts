// app/api/sanity-webhook/product/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    // Verify secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 200 });
    }

    console.log("🔄 Product updated - revalidating cache");

    // Clear cache for product tag on homepage route
    revalidateTag("product", "/"); // Add the route as second argument

    // Also revalidate the API route if needed
    revalidateTag("product", "/api/product");

    return NextResponse.json({
      success: true,
      message: "Product cache cleared",
      time: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 200 }
    );
  }
}

// app/api/sanity-webhook/product/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    // Verify secret
    const secret = request.nextUrl.searchParams.get("secret");
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;

    if (!expectedSecret) {
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    const body = await request.json();
    console.log("Product webhook triggered:", body._id);

    // Since you only have one product with _id == "product"
    revalidateTag("product", "product"); // tag, profile

    return NextResponse.json({
      success: true,
      revalidatedAt: new Date().toISOString(),
      message: "Product cache cleared",
    });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

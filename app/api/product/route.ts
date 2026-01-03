import { NextResponse } from "next/server";
import { getProduct } from "@/lib/sanity/product";

export async function GET() {
  try {
    const product = await getProduct();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error in product API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

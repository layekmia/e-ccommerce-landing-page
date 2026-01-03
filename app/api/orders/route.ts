import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/sanity/order";
import { ordersFromIPLast24h } from "@/lib/sanity/ipAddress";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const ipOrderCount = await ordersFromIPLast24h(ip);

    if (ipOrderCount >= 1) {
      return NextResponse.json(
        {
          error:
            "আপনি ২৪ ঘন্টার মধ্যে ২টি অর্ডার করেছেন। আরো অর্ডার করতে চাইলে আমাদের হেল্পলাইন (01794700226) এ কল করুন।",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "productName",
      "customerName",
      "customerPhone",
      "customerAddress",
      "quantity",
      "unitPrice",
      "totalPrice",
      "currency",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate phone number format (11 digits)
    if (!/^[0-9]{11}$/.test(body.customerPhone)) {
      return NextResponse.json(
        { error: "Phone number must be exactly 11 digits" },
        { status: 400 }
      );
    }

    // Validate quantity
    if (body.quantity < 1 || !Number.isInteger(Number(body.quantity))) {
      return NextResponse.json(
        { error: "Quantity must be a positive integer" },
        { status: 400 }
      );
    }

    // Create order in Sanity
    const result = await createOrder({
      productName: body.productName,
      productReference: body.productReference || undefined,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerAddress: body.customerAddress,
      quantity: Number(body.quantity),
      unitPrice: Number(body.unitPrice),
      totalPrice: Number(body.totalPrice),
      currency: body.currency,
      paymentMethod: body.paymentMethod || "cod",
      ipAddress: ip,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        orderNumber: result.orderNumber,
        orderId: result.orderId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in orders API route:", error);

    // Check if it's a Sanity API error
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to create order",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

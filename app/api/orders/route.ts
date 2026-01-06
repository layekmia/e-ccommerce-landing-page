// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/sanity/order";
import { checkOrderLimits } from "@/lib/sanity/orderCheck";

// Helper function to send email notification (fire and forget)
async function sendOrderEmailNotification(orderData: any) {
  try {
    // Use absolute URL to avoid CORS issues
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    const response = await fetch(`${baseUrl}/api/email_notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: orderData.customerName,
        phone: orderData.customerPhone,
        address: orderData.customerAddress,
        quantity: orderData.quantity,
        totalPrice: orderData.totalPrice,
        orderNumber: orderData.orderNumber,
        productName: orderData.productName,
      }),
    });

    if (!response.ok) {
      console.error("Email API responded with error:", response.status);
    } else {
      console.log("✅ Order notification email sent");
    }
  } catch (error) {
    console.error("Email notification failed (non-critical):", error);
    // Don't throw - email failure shouldn't fail the order
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const body = await request.json();

    // Validate required fields FIRST (before making Sanity calls)
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

    // Check BOTH IP and Phone number limits
    const { isLimited, message, ipOrders, phoneOrders } =
      await checkOrderLimits(ip, body.customerPhone);

    if (isLimited) {
      return NextResponse.json(
        {
          error: message,
          details: {
            ipOrders,
            phoneOrders,
            ip: ip,
            phone: body.customerPhone,
          },
        },
        { status: 429 }
      );
    }

    // Create order in Sanity
    const result = await createOrder({
      productName: body.productName,
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

    // Send email notification ASYNC (don't await - fire and forget)
    sendOrderEmailNotification({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerAddress: body.customerAddress,
      quantity: body.quantity,
      totalPrice: body.totalPrice,
      orderNumber: result.orderNumber,
      productName: body.productName,
    }).catch((err) => {
      console.error("Background email error (ignored):", err);
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

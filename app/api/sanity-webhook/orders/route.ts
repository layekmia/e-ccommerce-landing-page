// app/api/sanity-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  createSteadfastOrder,
  SteadfastOrderResponse,
} from "@/lib/steadfast/api";
import { serverClient } from "@/sanity/lib/server-client";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify webhook signature
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      // Return 200 to prevent retry even on auth failure
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 200 }
      ); // ⬅️ 200 not 401
    }

    const payload = await request.json();
    const order = payload;

    // CRITICAL: Check if already processed to prevent duplicates
    if (order.trackingCode || order.orderStatus === "sent_to_courier") {
      return NextResponse.json({
        success: true,
        message: "Order already processed - no duplicate",
      });
    }

    // Only process if status is "approved" and no tracking
    if (order.orderStatus === "approved") {
      const courierResult = await sendOrderToSteadfast(order);

      return NextResponse.json({
        success: true,
        message: "Order sent to courier successfully",
        data: courierResult,
      });
    }
    return NextResponse.json({
      success: true,
      message: "No action taken",
    });
  } catch (error: any) {
    console.error("❌ Webhook error:", error.message);

    // CRITICAL: Return 200 even on error to prevent retry
    return NextResponse.json(
      {
        success: false,
        error: "Webhook processing failed",
        details: error.message,
      },
      { status: 200 } // ⬅️ 200 not 500 - THIS STOPS RETRY
    );
  }
}

async function sendOrderToSteadfast(order: any) {
  try {
    const steadfastData = {
      invoice: order.orderNumber,
      recipient_name: order.customerName,
      recipient_phone: order.customerPhone,
      recipient_address: order.customerAddress,
      cod_amount: order.totalPrice,
      note: `${order.productName} (${order.quantity} pcs) - Order: ${order.orderNumber}`,
      item_description: order.productName,
      total_lot: Number(order.quantity),
      delivery_type: 0,
    };

    const steadfastResponse = await createSteadfastOrder(steadfastData);

    // Cast to SteadfastOrderResponse since we know it's successful
    const successResponse = steadfastResponse as SteadfastOrderResponse;

    // Update order in Sanity with tracking info

    await serverClient
      .patch(order._id)
      .set({
        orderStatus: "sent_to_courier",
        trackingCode: successResponse.consignment.tracking_code,
        consignmentId: successResponse.consignment.consignment_id,
        sentToCourierAt: new Date().toISOString(),
      })
      .commit();

    console.log("Order sent to courier successfully!");

    return {
      success: true,
      steadfastResponse: successResponse,
    };
  } catch (error: any) {
    console.error(
      "❌ Unexpected error in sendOrderToSteadfast:",
      error.message
    );

    // Update order status to cancelled
    await serverClient
      .patch(order._id)
      .set({
        orderStatus: "pending",
        note: `Unexpected error: ${error.message}`,
      })
      .commit();

    return {
      success: false,
      error: error.message,
    };
  }
}

// app/api/sanity-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { createSteadfastOrder } from "@/lib/steadfast/api";

export async function POST(request: NextRequest) {
  console.log("=== WEBHOOK TRIGGERED ===");

  try {
    // 1. Verify webhook signature - USE HEADERS
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      console.log(searchParams);
      console.log(secret);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("✅ Webhook authenticated successfully");

    const payload = await request.json();
    console.log("Webhook payload received");

    // Skip operation check for now - just process the order
    const order = payload;
    console.log(`📦 Processing order: ${order.orderNumber || order._id}`);
    console.log(`Current status: ${order.orderStatus}`);

    // 4. Check if status is "approved"
    if (order.orderStatus === "approved" && !order.trackingCode) {
      console.log("✅ Order approved, sending to courier...");

      // 5. Send to courier
      const courierResult = await sendOrderToSteadfast(order);

      return NextResponse.json({
        success: true,
        message: "Order sent to courier successfully",
        data: courierResult,
      });
    }

    console.log("⚠️ No action needed - order not approved or already sent");
    return NextResponse.json({
      success: true,
      message: "No action taken",
    });
  } catch (error: any) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

async function sendOrderToSteadfast(order: any) {
  try {
    console.log("🚚 Preparing data for Steadfast...");

    // Prepare data for Steadfast API
    const steadfastData = {
      invoice: order.orderNumber,
      recipient_name: order.customerName,
      recipient_phone: order.customerPhone,
      recipient_address: order.customerAddress,
      cod_amount: order.totalPrice,
      note: `${order.productName} (${order.quantity} pcs) - Order: ${order.orderNumber}`,
      item_description: order.productName,
      total_lot: Number(order.quantity),
      delivery_type: 0, // 0 = home delivery
    };

    console.log("📤 Sending to Steadfast API...");
    const steadfastResponse = await createSteadfastOrder(steadfastData);
    console.log("✅ Steadfast response received:", steadfastResponse);

    // Update order in Sanity with tracking info
    console.log("🔄 Updating Sanity order...");

    await client
      .patch(order._id)
      .set({
        orderStatus: "sent_to_courier",
        trackingCode: steadfastResponse.consignment.tracking_code,
        consignmentId: steadfastResponse.consignment.consignment_id,
        courierStatus: steadfastResponse.consignment.status,
        sentToCourierAt: new Date().toISOString(),
      })
      .commit();

    console.log("🎉 Order sent to courier successfully!");

    return {
      success: true,
      steadfastResponse,
    };
  } catch (error: any) {
    console.error("❌ Failed to send order to Steadfast:", error);

    // Update order status to show failure
    await client
      .patch(order._id)
      .set({
        orderStatus: "courier_failed",
        note: `Courier error: ${error.message}`,
      })
      .commit();

    throw error;
  }
}

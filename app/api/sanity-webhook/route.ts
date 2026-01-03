// app/api/sanity-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

// Import the Steadfast API utility we'll create next
import { createSteadfastOrder } from "@/lib/steadfast/api";

// Store webhook secret in environment variable
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    // 1. Verify webhook signature (basic check)
    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
      console.error("Webhook unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse the webhook payload
    const payload = await request.json();
    console.log("Webhook received:", JSON.stringify(payload, null, 2));

    // 3. Check if this is an order update
    if (payload.operation !== "update") {
      console.log("Not an update operation, skipping");
      return NextResponse.json({
        success: true,
        message: "Not an update operation",
      });
    }

    const order = payload.result;

    // 4. Get the previous version to check what changed
    const previousOrder = await client.fetch(
      `*[_id == $id][0]{
        orderStatus,
        trackingCode,
        consignmentId
      }`,
      { id: order._id }
    );

    console.log("Previous order status:", previousOrder?.orderStatus);
    console.log("Current order status:", order.orderStatus);

    // 5. Check if status changed from something to "approved"
    if (
      previousOrder?.orderStatus !== "approved" &&
      order.orderStatus === "approved" &&
      !order.trackingCode // Don't process if already has tracking
    ) {
      console.log(`Order ${order.orderNumber} approved, sending to courier...`);

      // 6. Send to courier
      const courierResult = await sendOrderToSteadfast(order);

      return NextResponse.json({
        success: true,
        message: "Order sent to courier successfully",
        data: courierResult,
      });
    }

    // 7. If already processed or status didn't change to approved
    console.log("No action needed for this update");
    return NextResponse.json({
      success: true,
      message: "No action taken",
    });
  } catch (error: any) {
    console.error("Webhook error:", error);

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
    console.log("Preparing Steadfast order data for:", order.orderNumber);

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

    console.log("Calling Steadfast API with:", steadfastData);

    // Call Steadfast API
    const steadfastResponse = await createSteadfastOrder(steadfastData);
    console.log("Steadfast response:", steadfastResponse);

    if (steadfastResponse.status !== 200) {
      throw new Error(`Steadfast API error: ${steadfastResponse.message}`);
    }

    // Update order in Sanity with tracking info
    console.log("Updating Sanity order with tracking info...");

    const updatedOrder = await client
      .patch(order._id)
      .set({
        orderStatus: "sent_to_courier",
        trackingCode: steadfastResponse.consignment.tracking_code,
        consignmentId: steadfastResponse.consignment.consignment_id,
        courierStatus: steadfastResponse.consignment.status,
        sentToCourierAt: new Date().toISOString(),
      })
      .commit();

    console.log("Order updated successfully:", order.orderNumber);

    return {
      success: true,
      order: updatedOrder,
      steadfastResponse,
    };
  } catch (error: any) {
    console.error("Failed to send order to Steadfast:", error);

    // Update order status to show failure
    await client
      .patch(order._id)
      .set({
        orderStatus: "courier_failed",
        note: `Courier error: ${error.message}`,
      })
      .commit();

    throw error; // Re-throw to be caught by webhook
  }
}

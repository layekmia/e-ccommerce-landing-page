import { createClient } from "@sanity/client";
import { dataset, projectId } from "@/sanity/env";

// Create a write client for order creation
// Note: This requires a token with write permissions
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-12-25",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export interface CreateOrderData {
  productName: string;
  productReference?: string; // Optional product document ID
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  paymentMethod?: string;
  ipAddress?: string;
}

/**
 * Generate a unique order number
 */
function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD-${timestamp}-${random}`;
}

/**
 * Create a new order in Sanity CMS
 */
export async function createOrder(orderData: CreateOrderData) {
  try {
    const orderNumber = generateOrderNumber();
    const now = new Date().toISOString();

    const order = {
      _type: "order",
      orderNumber,
      productName: orderData.productName,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      quantity: orderData.quantity,
      unitPrice: orderData.unitPrice,
      totalPrice: orderData.totalPrice,
      currency: orderData.currency,
      paymentMethod: orderData.paymentMethod || "cod",
      orderStatus: "pending",
      deliveryStatus: "not_started",
      orderedAt: now,
      ...(orderData.productReference && {
        productReference: {
          _type: "reference",
          _ref: orderData.productReference,
        },
      }),
      ipAddress: orderData.ipAddress,
    };

    const result = await writeClient.create(order);

    return {
      success: true,
      orderId: result._id,
      orderNumber,
    };
  } catch (error) {
    console.error("Error creating order in Sanity:", error);
    throw error;
  }
}

// lib/steadfast/api.ts
const BASE_URL = "https://portal.packzy.com/api/v1";

// Get API keys from environment variables
const API_KEY = process.env.STEADFAST_API_KEY;
const SECRET_KEY = process.env.STEADFAST_SECRET_KEY;

export interface SteadfastOrderData {
  invoice: string;
  recipient_name: string;
  recipient_phone: string;
  alternative_phone?: string;
  recipient_email?: string;
  recipient_address: string;
  cod_amount: number;
  note?: string;
  item_description?: string;
  total_lot?: number;
  delivery_type?: number; // 0 = home delivery, 1 = point delivery
}

export interface SteadfastOrderResponse {
  status: number;
  message: string;
  consignment: {
    consignment_id: number;
    invoice: string;
    tracking_code: string;
    recipient_name: string;
    recipient_phone: string;
    recipient_address: string;
    cod_amount: number;
    status: string;
    note?: string;
    created_at: string;
    updated_at: string;
  };
}

// Create Single Order in Steadfast - NO THROWING ERRORS
export async function createSteadfastOrder(
  orderData: SteadfastOrderData
): Promise<SteadfastOrderResponse | { success: false; error: string }> {
  try {
    if (!API_KEY || !SECRET_KEY) {
      console.error("Steadfast API keys are not configured");
      return { success: false, error: "Steadfast API keys are not configured" };
    }

    const headers = {
      "Api-Key": API_KEY,
      "Secret-Key": SECRET_KEY,
      "Content-Type": "application/json",
    };

    console.log("Making request to Steadfast API...");

    const response = await fetch(`${BASE_URL}/create_order`, {
      method: "POST",
      headers,
      body: JSON.stringify(orderData),
      cache: "no-store",
    });

    const responseText = await response.text();
    console.log("Steadfast raw response:", responseText);

    if (!response.ok) {
      console.error("Steadfast API error response:", responseText);
      return {
        success: false,
        error: `Steadfast API error (${response.status}): ${responseText}`,
      };
    }

    try {
      const result = JSON.parse(responseText);

      // Also check if Steadfast returned an error in their response
      if (result.status !== 200) {
        console.error("Steadfast returned error:", result.message);
        return { success: false, error: result.message };
      }

      return result;
    } catch (error) {
      console.error("Failed to parse Steadfast response:", error);
      return { success: false, error: "Invalid response from Steadfast API" };
    }
  } catch (error: any) {
    console.error("Unexpected error in createSteadfastOrder:", error);
    return { success: false, error: error.message };
  }
}

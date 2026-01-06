import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      name,
      phone,
      address,
      quantity,
      totalPrice,
      orderNumber,
      productName,
    } = await req.json();

    // Owner email
    await resend.emails.send({
      from: "GlowMax Orders <no-reply@nexotechit.com>",
      to: "layekofficial63@gmail.com",
      subject: `🎉 New Order Received - #${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Order #${orderNumber}</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }
                .content {
                    background: white;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .order-details {
                    background: #f8f9fa;
                    border-left: 4px solid #667eea;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 5px;
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eee;
                }
                .detail-label {
                    font-weight: 600;
                    color: #555;
                }
                .detail-value {
                    color: #222;
                    text-align: right;
                }
                .highlight {
                    background: #fff3cd;
                    padding: 15px;
                    border-radius: 5px;
                    border-left: 4px solid #ffc107;
                    margin: 20px 0;
                }
                .action-buttons {
                    text-align: center;
                    margin: 30px 0;
                }
                .btn {
                    display: inline-block;
                    padding: 12px 30px;
                    background: #667eea;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: 600;
                    margin: 0 10px;
                }
                .btn-secondary {
                    background: #6c757d;
                }
                .btn:hover {
                    opacity: 0.9;
                    transform: translateY(-2px);
                    transition: all 0.3s ease;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                    color: #666;
                    font-size: 14px;
                }
                .status-badge {
                    display: inline-block;
                    padding: 5px 15px;
                    background: #ffc107;
                    color: #212529;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    margin-left: 10px;
                }
                @media (max-width: 600px) {
                    .action-buttons {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .btn {
                        margin: 5px 0;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🎉 New Order Received!</h1>
                <p style="font-size: 18px; opacity: 0.9;">Order #${orderNumber}</p>
            </div>
            
            <div class="content">
                <p>Hello Admin,</p>
                <p>A new order has been placed on your <strong>GlowMax</strong> landing page.</p>
                
                <div class="order-details">
                    <div class="detail-row">
                        <span class="detail-label">Product:</span>
                        <span class="detail-value">${productName || "GlowMax Vitamin C Serum"}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Customer Name:</span>
                        <span class="detail-value">${name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Phone Number:</span>
                        <span class="detail-value">
                            <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">
                                ${phone}
                            </a>
                        </span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Delivery Address:</span>
                        <span class="detail-value">${address}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Quantity:</span>
                        <span class="detail-value">${quantity} units</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Total Amount:</span>
                        <span class="detail-value" style="color: #28a745; font-weight: 700; font-size: 18px;">
                            ৳${totalPrice}
                        </span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Order Status:</span>
                        <span class="detail-value">
                            Pending Review 
                            <span class="status-badge">Action Required</span>
                        </span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Order Time:</span>
                        <span class="detail-value">${new Date().toLocaleString("en-BD", { timeZone: "Asia/Dhaka" })}</span>
                    </div>
                </div>

                <div class="highlight">
                    <strong>💡 Next Steps:</strong>
                    <p>1. Review order details above<br>
                    2. Contact customer if needed<br>
                    3. Update status in admin panel<br>
                    4. Prepare for shipping</p>
                </div>

                <div class="action-buttons">
                    <a href="https://manage.sanity.io/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/dataset/production/type/order" 
                       class="btn" target="_blank">
                        📝 Manage Order in Sanity
                    </a>
                    <a href="tel:${phone}" class="btn btn-secondary">
                        📞 Call Customer
                    </a>
                </div>

                <p>You can also manage this order by:</p>
                <ul>
                    <li>Visiting your <a href="https://manage.sanity.io" target="_blank">Sanity Studio</a></li>
                    <li>Searching for order number: <strong>${orderNumber}</strong></li>
                    <li>Changing status to "Approved" to send to courier automatically</li>
                </ul>

                <p style="color: #dc3545; font-weight: 600;">
                    ⏰ <strong>Important:</strong> Please review and process this order within 24 hours.
                </p>

                <div class="footer">
                    <p>This is an automated notification from your GlowMax landing page.</p>
                    <p>© ${new Date().getFullYear()} GlowMax. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    });

    // Optional: Also send SMS via Twilio/other service
    // await sendSMSNotification(phone, orderNumber);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("EMAIL API ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

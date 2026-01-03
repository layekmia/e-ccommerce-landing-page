import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      readOnly: true,
      initialValue: () => `ORD-${Date.now()}`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productName",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerPhone",
      title: "Customer Phone",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[0-9]{11}$/, {
            name: "phone",
            invert: false,
          })
          .error("Phone number must be 11 digits"),
    }),
    defineField({
      name: "customerAddress",
      title: "Customer Address",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
      initialValue: 1,
    }),
    defineField({
      name: "unitPrice",
      title: "Unit Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
      description: "Price per unit at the time of order",
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
      description: "Total order amount (unitPrice × quantity)",
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "৳",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Cash on Delivery (COD)", value: "cod" },
          { title: "Online Payment", value: "online" },
          { title: "Bank Transfer", value: "bank" },
        ],
      },
      initialValue: "cod",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderStatus",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deliveryStatus",
      title: "Delivery Status",
      type: "string",
      options: {
        list: [
          { title: "Not Started", value: "not_started" },
          { title: "In Transit", value: "in_transit" },
          { title: "Out for Delivery", value: "out_for_delivery" },
          { title: "Delivered", value: "delivered" },
          { title: "Failed", value: "failed" },
        ],
      },
      initialValue: "not_started",
    }),
    defineField({ name: "ipAddress", title: "Ip Address", type: "string" }),
    defineField({
      name: "orderedAt",
      title: "Ordered At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "deliveredAt",
      title: "Delivered At",
      type: "datetime",
      description: "Date and time when order was delivered",
    }),
  ],
  preview: {
    select: {
      orderNumber: "orderNumber",
      customerName: "customerName",
      productName: "productName",
      orderStatus: "orderStatus",
      totalPrice: "totalPrice",
      currency: "currency",
    },
    prepare({
      orderNumber,
      customerName,
      productName,
      orderStatus,
      totalPrice,
      currency,
    }) {
      return {
        title: `${orderNumber || "Order"} - ${customerName || "Unknown"}`,
        subtitle: `${productName || "Product"} | ${currency || "৳"}${totalPrice || 0} | ${orderStatus || "pending"}`,
      };
    },
  },
  orderings: [
    {
      title: "Order Date (Newest)",
      name: "orderedAtDesc",
      by: [{ field: "orderedAt", direction: "desc" }],
    },
    {
      title: "Order Date (Oldest)",
      name: "orderedAtAsc",
      by: [{ field: "orderedAt", direction: "asc" }],
    },
    {
      title: "Order Number",
      name: "orderNumberAsc",
      by: [{ field: "orderNumber", direction: "asc" }],
    },
  ],
});

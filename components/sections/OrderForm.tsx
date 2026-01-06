"use client";

import { Product } from "@/types/product";
import { useState, FormEvent } from "react";
import {
  ShoppingBag,
  Phone,
  User,
  MapPin,
  Package,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

interface OrderFormProps {
  product: Product;
}

const bdPhoneRegex = /^(01)[3-9]\d{8}$/;

export default function OrderForm({ product }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: "1",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const quantity = parseInt(formData.quantity);
      const unitPrice = product.discountedPrice;
      const totalPrice = unitPrice * quantity;

      if (!bdPhoneRegex.test(formData.phone?.trim())) {
        return toast.error("দয়া করে সঠিক একটি বাংলাদেশি মোবাইল নাম্বার লিখুন।");
      }
      if (formData?.address?.length < 15) {
        return toast.error("দয়া করে সম্পূর্ণ ও সঠিক ঠিকানা লিখুন।");
      }

      // Prepare order data
      const orderData = {
        productName: product.name,
        productReference: "product", // Fixed product ID from Sanity
        customerName: formData.name,
        customerPhone: formData?.phone?.trim(),
        customerAddress: formData.address,
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        currency: product.currency,
        paymentMethod: product.codEnabled ? "cod" : "online",
      };

      // Submit order to API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to place order");
      }
      
      // Reset form on success
      setFormData({
        name: "",
        phone: "",
        address: "",
        quantity: "1",
      });

      // Show success toast with order number
      toast.success(
        `Order placed successfully! Order #${result.orderNumber}. We will contact you soon.`,
        {
          duration: 6000,
          position: "top-center",
          style: {
            background: "#10b981",
            color: "#fff",
            fontSize: "16px",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );
    } catch (error) {
      console.error("Order submission error:", error);

      // Show error toast
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again.",
        {
          duration: 5000,
          position: "top-center",
          style: {
            background: "#ef4444",
            color: "#fff",
            fontSize: "16px",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = product.discountedPrice * parseInt(formData.quantity);

  return (
    <section
      id="order-form"
      className="py-16 md:py-24 bg-white px-4 scroll-mt-20"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            আপনার অর্ডার করুন
          </h2>
          <p className="text-lg text-gray-600">
            নিচের ফর্মটি পূরণ করুন এবং আমরা আপনার সাথে যোগাযোগ করব
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                <User className="w-4 h-4 inline mr-2" />
                আপনার নাম
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                placeholder="আপনার পূর্ণ নাম"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                <Phone className="w-4 h-4 inline mr-2" />
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                placeholder="01XXXXXXXXX"
                pattern="[0-9]{11}"
              />
              <p className="text-xs text-gray-500 mt-1">
                11 digit mobile number
              </p>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                <MapPin className="w-4 h-4 inline mr-2" />
                সম্পূর্ণ ঠিকানা
              </label>
              <textarea
                id="address"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-none"
                placeholder="বাড়ি নম্বর, রোড, এলাকা, জেলা"
              />
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                <Package className="w-4 h-4 inline mr-2" />
                পরিমাণ
              </label>
              <select
                id="quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num} {num === 1 ? "পিস" : "পিস"}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Price */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">মোট মূল্য:</span>
                <span className="text-2xl font-bold text-orange-600">
                  {product.currency} {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* COD Notice */}
            {product.codEnabled && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 text-center">
                  <strong>✓ Cash on Delivery (COD):</strong> আপনি পণ্য পেয়ে
                  payment করবেন। কোন advance payment লাগবে না।{" "}
                  {product.freeDeliveryText}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Confirm Order
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              আপনার তথ্য নিরাপদে সংরক্ষণ করা হবে
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

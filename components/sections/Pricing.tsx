"use client";

import { Product } from "@/types/product";
import { Check } from "lucide-react";

interface PricingProps {
  product: Product;
  onOrderClick: () => void;
}

export default function Pricing({ product, onOrderClick }: PricingProps) {
  const discount = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );
  
  return (
    <section id="pricing" className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 px-4 scroll-mt-20">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-orange-200">
          <div className="text-center mb-8">
            <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              {discount}% OFF - Limited Time Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              বিশেষ মূল্য
            </h2>
            <p className="text-lg text-gray-600">{product.offerText}</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <p className="text-gray-500 line-through text-xl mb-2">
                {product.currency} {product.originalPrice.toLocaleString()}
              </p>
              <p className="text-5xl md:text-6xl font-bold text-orange-600">
                {product.currency} {product.discountedPrice.toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-gray-700">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Free Delivery All Over Bangladesh</span>
            </div>
            {product.codEnabled && (
              <div className="flex items-center gap-3 text-gray-700">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Cash on Delivery (COD) Available</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-gray-700">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>7 Days Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Original & Authentic Product</span>
            </div>
          </div>
          
          <button
            onClick={onOrderClick}
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Order Now - {product.currency} {product.discountedPrice.toLocaleString()}
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            ⚡ Hurry! Only a few left in stock
          </p>
        </div>
      </div>
    </section>
  );
}


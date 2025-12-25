"use client";

import { Product } from "@/types/product";
import { Star } from "lucide-react";

interface ReviewsProps {
  product: Product;
}

export default function Reviews({ product }: ReviewsProps) {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 px-4 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            গ্রাহকদের মতামত
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            হাজারো সন্তুষ্ট গ্রাহক আমাদের সাথে আছেন
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{review.comment}"
              </p>
              
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-600">{review.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


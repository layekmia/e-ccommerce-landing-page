"use client";

import { Product } from "@/types/product";
import { Leaf } from "lucide-react";

interface IngredientsProps {
  product: Product;
}

export default function Ingredients({ product }: IngredientsProps) {
  return (
    <section id="ingredients" className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white px-4 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              প্রাকৃতিক উপাদান
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            শুধুমাত্র প্রাকৃতিক এবং নিরাপদ উপাদান দিয়ে তৈরি
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {ingredient.name}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {ingredient.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


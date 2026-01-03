"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

interface HeroProps {
  product: Product;
  onOrderClick: () => void;
}

export default function Hero({ product, onOrderClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-10 flex items-center bg-gradient-to-br from-amber-50 via-white to-rose-50 py-12 md:py-20 px-4 scroll-mt-20"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left space-y-6">
            {product.codEnabled && (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {product.codText}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {product.headline}
            </h1>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {product.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <button
                onClick={onOrderClick}
                className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Order Now
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-gray-600 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span>{product.freeDeliveryText}</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src={product.heroImage.url}
                alt={product.heroImage.alt}
                fill
                className="object-contain rounded-2xl"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-200 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-rose-200 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

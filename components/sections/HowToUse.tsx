"use client";

import { Product } from "@/types/product";
import Image from "next/image";

interface HowToUseProps {
  product: Product;
}

export default function HowToUse({ product }: HowToUseProps) {
  return (
    <section id="how-to-use" className="py-16 md:py-24 bg-white px-4 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            কিভাবে ব্যবহার করবেন?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            সহজ ৩টি ধাপে আপনার ত্বকের যত্ন নিন
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {product.howToUse.map((step, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="relative w-full aspect-square max-w-xs mx-auto mb-6 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={step.image.url}
                  alt={step.image.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              {step.description && (
                <p className="text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


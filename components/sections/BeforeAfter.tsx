"use client";

import { Product } from "@/types/product";
import Image from "next/image";

interface BeforeAfterProps {
  product: Product;
}

export default function BeforeAfter({ product }: BeforeAfterProps) {
  if (!product.beforeAfter) return null;
  
  return (
    <section id="before-after" className="py-16 md:py-24 bg-white px-4 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Before & After
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            আসল গ্রাহকদের আসল ফলাফল
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={product.beforeAfter.beforeImage.url}
                alt={product.beforeAfter.beforeImage.alt}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-red-600/90 text-white py-3 px-4 text-center font-bold text-lg">
                Before
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={product.beforeAfter.afterImage.url}
                alt={product.beforeAfter.afterImage.alt}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-green-600/90 text-white py-3 px-4 text-center font-bold text-lg">
                After
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 italic">
            * Results may vary. These are real customer results after 14 days of regular use.
          </p>
        </div>
      </div>
    </section>
  );
}


"use client";

import { Product } from "@/types/product";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ProblemSolutionProps {
  product: Product;
}

export default function ProblemSolution({ product }: ProblemSolutionProps) {
  return (
    <section id="problem-solution" className="py-16 md:py-24 bg-white px-4 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            আপনার ত্বকের সমস্যা কি?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            আমরা আপনার সমস্যা বুঝি এবং সমাধান দিয়েছি
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {product.problemSolution.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.problem}
                  </h3>
                  <div className="flex items-start gap-3 mt-4">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


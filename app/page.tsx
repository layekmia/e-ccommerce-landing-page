"use client";

import { useRef } from "react";
import { useProduct } from "@/lib/sanity/product-client";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Benefits from "@/components/sections/Benefits";
import HowToUse from "@/components/sections/HowToUse";
import Ingredients from "@/components/sections/Ingredients";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Reviews from "@/components/sections/Reviews";
import Pricing from "@/components/sections/Pricing";
import OrderForm from "@/components/sections/OrderForm";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";

export default function HomePage() {
  const orderFormRef = useRef<HTMLDivElement>(null);
  const { product, loading, error } = useProduct();

  const scrollToOrder = () => {
    orderFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to Load Product
          </h1>
          <p className="text-gray-600 mb-4">
            {error ||
              "Product data not found. Please make sure you've seeded your Sanity CMS."}
          </p>
          <p className="text-sm text-gray-500">
            Run{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              npm run seed:product
            </code>{" "}
            to seed your data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO product={product} />
      <Header product={product} onOrderClick={scrollToOrder} />
      {product.sections.hero && (
        <Hero product={product} onOrderClick={scrollToOrder} />
      )}

      {product.sections.problemSolution && (
        <ProblemSolution product={product} />
      )}

      {product.sections.benefits && <Benefits product={product} />}

      {product.sections.howToUse && <HowToUse product={product} />}

      {product.sections.ingredients && <Ingredients product={product} />}

      {product.sections.beforeAfter && <BeforeAfter product={product} />}

      {product.sections.reviews && <Reviews product={product} />}

      {product.sections.pricing && (
        <Pricing product={product} onOrderClick={scrollToOrder} />
      )}

      <div ref={orderFormRef}>
        {product.sections.orderForm && <OrderForm product={product} />}
      </div>

      {product.sections.faq && <FAQ product={product} />}

      {product.sections.footer && <Footer product={product} />}
    </div>
  );
}

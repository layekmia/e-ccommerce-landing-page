"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { Menu, X, ShoppingBag } from "lucide-react";

interface HeaderProps {
  product: Product;
  onOrderClick: () => void;
}

export default function Header({ product, onOrderClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "hero", label: "Home", show: product.sections.hero },
    { id: "problem-solution", label: "Problem", show: product.sections.problemSolution },
    { id: "benefits", label: "Benefits", show: product.sections.benefits },
    { id: "how-to-use", label: "How to Use", show: product.sections.howToUse },
    { id: "ingredients", label: "Ingredients", show: product.sections.ingredients },
    { id: "before-after", label: "Results", show: product.sections.beforeAfter },
    { id: "reviews", label: "Reviews", show: product.sections.reviews },
    { id: "pricing", label: "Pricing", show: product.sections.pricing },
    { id: "faq", label: "FAQ", show: product.sections.faq },
  ].filter((link) => link.show);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl md:text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
            >
              {product.brandName}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors text-sm"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOrderClick();
                setIsMobileMenuOpen(false);
              }}
              className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-orange-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-gray-700 hover:text-orange-600 font-medium transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onOrderClick();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold mt-2 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Order Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


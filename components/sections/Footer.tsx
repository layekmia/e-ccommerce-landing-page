"use client";

import { Product } from "@/types/product";
import { Facebook, MessageCircle } from "lucide-react";

interface FooterProps {
  product: Product;
}

export default function Footer({ product }: FooterProps) {
  const whatsappUrl = `https://wa.me/${product.whatsappNumber.replace(/[^0-9]/g, "")}`;
  
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{product.brandName}</h3>
            <p className="text-gray-400">
              আপনার ত্বকের জন্য সবচেয়ে ভালো পণ্য
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#order-form" className="hover:text-white transition">
                  Order Now
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors w-fit"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={product.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors w-fit"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {product.brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


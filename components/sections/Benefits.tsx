"use client";

import { Product } from "@/types/product";
import { 
  Sparkles, 
  Shield, 
  Droplet, 
  Leaf, 
  Zap, 
  Gem,
  Star,
  Heart,
  CheckCircle,
  Award,
  Sun,
  Moon,
  Flame,
  Wind,
  Waves,
  Flower2,
  LucideIcon
} from "lucide-react";

interface BenefitsProps {
  product: Product;
}

// Icon mapping - component handles all icons, backend just sends iconName
// Backend can send any of these icon names, or omit it for auto-selection
const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  shield: Shield,
  droplet: Droplet,
  leaf: Leaf,
  zap: Zap,
  gem: Gem,
  star: Star,
  heart: Heart,
  checkCircle: CheckCircle,
  award: Award,
  sun: Sun,
  moon: Moon,
  flame: Flame,
  wind: Wind,
  waves: Waves,
  flower: Flower2,
};

// Default icons array for fallback when iconName is not provided
const defaultIcons: LucideIcon[] = [
  Sparkles,
  Shield,
  Droplet,
  Leaf,
  Zap,
  Gem,
];

export default function Benefits({ product }: BenefitsProps) {
  const getIcon = (iconName: string | undefined, index: number): LucideIcon => {
    if (iconName && iconMap[iconName]) {
      return iconMap[iconName];
    }
    // Fallback to default icons based on index
    return defaultIcons[index % defaultIcons.length];
  };

  return (
    <section id="benefits" className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50 px-4 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            কেন {product.name}?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            আপনার ত্বকের জন্য সবচেয়ে ভালো পছন্দ
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {product.benefits.map((benefit, index) => {
            const IconComponent = getIcon(benefit.iconName, index);
            return (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 mb-4 bg-gradient-to-br from-orange-100 to-rose-100 rounded-xl flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


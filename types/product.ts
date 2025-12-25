export interface ProductImage {
  url: string;
  alt: string;
}

export interface Benefit {
  iconName?: string; // Optional: backend can send icon name, component will map it
  title: string;
  description: string;
}

export interface HowToUseStep {
  title: string;
  image: ProductImage;
  description?: string;
}

export interface Ingredient {
  name: string;
  description: string;
}

export interface Review {
  name: string;
  city: string;
  rating: number;
  comment: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProblemSolution {
  problem: string;
  solution: string;
}

export interface Product {
  // Basic Info
  name: string;
  headline: string;
  subheadline: string;
  heroImage: ProductImage;
  
  // Pricing
  originalPrice: number;
  discountedPrice: number;
  currency: string;
  offerText: string;
  
  // Sections Control
  sections: {
    hero: boolean;
    problemSolution: boolean;
    benefits: boolean;
    howToUse: boolean;
    ingredients: boolean;
    beforeAfter: boolean;
    reviews: boolean;
    pricing: boolean;
    orderForm: boolean;
    faq: boolean;
    footer: boolean;
  };
  
  // Section Content
  problemSolution: ProblemSolution[];
  benefits: Benefit[];
  howToUse: HowToUseStep[];
  ingredients: Ingredient[];
  beforeAfter?: {
    beforeImage: ProductImage;
    afterImage: ProductImage;
  };
  reviews: Review[];
  faqs: FAQ[];
  
  // Footer
  brandName: string;
  whatsappNumber: string;
  facebookUrl: string;
  
  // COD
  codEnabled: boolean;
  codText: string;
  freeDeliveryText: string;
}


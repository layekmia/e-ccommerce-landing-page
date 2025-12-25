import { Product } from "@/types/product";

export const productData: Product = {
  name: "GlowMax Vitamin C Serum",
  headline: "Transform Your Skin in Just 14 Days",
  subheadline: "Bangladesh's #1 Vitamin C Serum for Bright, Glowing Skin",
  heroImage: {
    url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    alt: "GlowMax Vitamin C Serum",
  },

  originalPrice: 2999,
  discountedPrice: 1499,
  currency: "৳",
  offerText: "Limited Time: 50% OFF + Free Delivery",

  sections: {
    hero: true,
    problemSolution: true,
    benefits: true,
    howToUse: true,
    ingredients: true,
    beforeAfter: false,
    reviews: true,
    pricing: true,
    orderForm: true,
    faq: true,
    footer: true,
  },

  problemSolution: [
    {
      problem: "Dull, uneven skin tone",
      solution:
        "Our Vitamin C serum brightens and evens out your complexion, giving you radiant, glowing skin.",
    },
    {
      problem: "Dark spots and hyperpigmentation",
      solution:
        "Powerful antioxidants fade dark spots and prevent new ones from forming.",
    },
    {
      problem: "Premature aging signs",
      solution:
        "Boosts collagen production to reduce fine lines and wrinkles naturally.",
    },
    {
      problem: "Dry, dehydrated skin",
      solution:
        "Deep hydration that lasts all day, leaving your skin plump and supple.",
    },
  ],

  benefits: [
    {
      iconName: "sparkles",
      title: "Instant Brightening",
      description:
        "See visible results in just 7 days with our concentrated Vitamin C formula.",
    },
    {
      iconName: "shield",
      title: "UV Protection",
      description:
        "Helps protect your skin from harmful sun damage and environmental stressors.",
    },
    {
      iconName: "droplet",
      title: "Deep Hydration",
      description:
        "Lightweight formula that penetrates deep without feeling greasy or heavy.",
    },
    {
      iconName: "leaf",
      title: "100% Natural",
      description:
        "Made with pure, natural ingredients safe for all skin types including sensitive skin.",
    },
    {
      iconName: "zap",
      title: "Fast Absorption",
      description:
        "Quick-absorbing formula that works immediately without leaving residue.",
    },
    {
      iconName: "gem",
      title: "Premium Quality",
      description:
        "Clinically tested and dermatologist-approved for maximum effectiveness.",
    },
  ],

  howToUse: [
    {
      title: "Step 1: Cleanse",
      description:
        "Start with a clean face. Wash with your regular cleanser and pat dry.",
      image: {
        url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80",
        alt: "Cleanse your face",
      },
    },
    {
      title: "Step 2: Apply Serum",
      description:
        "Take 2-3 drops and gently massage onto your face and neck in upward motions.",
      image: {
        url: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&q=80",
        alt: "Apply serum",
      },
    },
    {
      title: "Step 3: Moisturize",
      description:
        "Wait 2 minutes, then apply your favorite moisturizer and sunscreen.",
      image: {
        url: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&q=80",
        alt: "Apply moisturizer",
      },
    },
  ],

  ingredients: [
    {
      name: "Vitamin C (L-Ascorbic Acid)",
      description:
        "20% pure Vitamin C for maximum brightening and antioxidant protection.",
    },
    {
      name: "Hyaluronic Acid",
      description:
        "Deep hydration that holds 1000x its weight in water for plump, smooth skin.",
    },
    {
      name: "Niacinamide",
      description:
        "Reduces pores, controls oil, and improves skin texture and tone.",
    },
    {
      name: "Vitamin E",
      description:
        "Powerful antioxidant that works with Vitamin C to enhance skin protection.",
    },
    {
      name: "Aloe Vera Extract",
      description: "Soothes and calms skin while providing natural hydration.",
    },
  ],

  beforeAfter: {
    beforeImage: {
      url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
      alt: "Before using GlowMax Serum",
    },
    afterImage: {
      url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
      alt: "After using GlowMax Serum",
    },
  },

  reviews: [
    {
      name: "Fatima Rahman",
      city: "Dhaka",
      rating: 5,
      comment:
        "এটা সত্যিই কাজ করে! ২ সপ্তাহ ব্যবহারের পর আমার ত্বক অনেক উজ্জ্বল হয়ে গেছে। সবাই প্রশংসা করছে।",
    },
    {
      name: "Ayesha Khan",
      city: "Chittagong",
      rating: 5,
      comment:
        "Best serum I've ever used! My dark spots are fading and my skin feels so smooth. Highly recommend!",
    },
    {
      name: "Rashida Begum",
      city: "Sylhet",
      rating: 5,
      comment:
        "দামের তুলনায় quality অনেক ভালো। COD পেয়েছি, delivery খুব দ্রুত হয়েছে।",
    },
    {
      name: "Nusrat Jahan",
      city: "Rajshahi",
      rating: 5,
      comment:
        "My skin looks younger and brighter. The serum absorbs quickly and doesn't feel sticky. Love it!",
    },
    {
      name: "Sharmin Akter",
      city: "Khulna",
      rating: 5,
      comment:
        "১০ দিনেই পার্থক্য বুঝতে পারছি। আমার বন্ধুরাও order করেছে। Thank you!",
    },
  ],

  faqs: [
    {
      question: "কিভাবে ব্যবহার করবো?",
      answer:
        "সকালে এবং রাতে, মুখ পরিষ্কার করার পর ২-৩ ফোঁটা serum নিয়ে মুখে এবং ঘাড়ে ম্যাসাজ করুন। তারপর moisturizer ব্যবহার করুন।",
    },
    {
      question: "কতদিনে ফলাফল দেখা যাবে?",
      answer:
        "বেশিরভাগ গ্রাহক ৭-১৪ দিনের মধ্যে উজ্জ্বলতা এবং ত্বকের উন্নতি লক্ষ্য করেন। সর্বোচ্চ ফলাফলের জন্য নিয়মিত ব্যবহার করুন।",
    },
    {
      question: "সব ধরনের ত্বকে ব্যবহার করা যাবে?",
      answer:
        "হ্যাঁ, আমাদের serum সব ধরনের ত্বকের জন্য নিরাপদ, এমনকি sensitive ত্বকের জন্যও। তবে প্রথমবার ব্যবহারের আগে patch test করুন।",
    },
    {
      question: "COD (Cash on Delivery) পাওয়া যাবে?",
      answer:
        "হ্যাঁ, আমরা সারা বাংলাদেশে COD সেবা দিয়ে থাকি। কোন advance payment লাগবে না। পণ্য পেয়ে payment করবেন।",
    },
    {
      question: "Delivery কতদিন লাগবে?",
      answer:
        "Dhaka city তে ১-২ দিন, এবং অন্যান্য জেলায় ৩-৫ দিনের মধ্যে delivery হয়ে থাকে। Free delivery সারা বাংলাদেশে।",
    },
    {
      question: "যদি পছন্দ না হয়?",
      answer:
        "আমরা ৭ দিনের money-back guarantee দিয়ে থাকি। যদি সন্তুষ্ট না হন, full refund পাবেন।",
    },
  ],

  brandName: "GlowMax Beauty",
  whatsappNumber: "+8801712345678",
  facebookUrl: "https://facebook.com/glowmaxbeauty",

  codEnabled: true,
  codText: "Cash on Delivery Available",
  freeDeliveryText: "Free Delivery All Over Bangladesh",
};

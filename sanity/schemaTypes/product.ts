import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // Basic Info
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'productImage',
      validation: (Rule) => Rule.required(),
    }),

    // Pricing
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'discountedPrice',
      title: 'Discounted Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: '৳',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'offerText',
      title: 'Offer Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Sections Control
    {
      name: 'sections',
      title: 'Sections Visibility',
      type: 'object',
      fields: [
        {
          name: 'hero',
          title: 'Hero Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'problemSolution',
          title: 'Problem Solution Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'benefits',
          title: 'Benefits Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'howToUse',
          title: 'How to Use Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'ingredients',
          title: 'Ingredients Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'beforeAfter',
          title: 'Before After Section',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'reviews',
          title: 'Reviews Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'pricing',
          title: 'Pricing Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'orderForm',
          title: 'Order Form Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'faq',
          title: 'FAQ Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'footer',
          title: 'Footer Section',
          type: 'boolean',
          initialValue: true,
        },
      ],
    },

    // Section Content
    {
      name: 'problemSolution',
      title: 'Problem & Solution Items',
      type: 'array',
      of: [{ type: 'problemSolution' }],
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'benefit' }],
    },
    {
      name: 'howToUse',
      title: 'How to Use Steps',
      type: 'array',
      of: [{ type: 'howToUseStep' }],
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'ingredient' }],
    },
    {
      name: 'beforeAfter',
      title: 'Before & After Images',
      type: 'object',
      fields: [
        {
          name: 'beforeImage',
          title: 'Before Image',
          type: 'productImage',
        },
        {
          name: 'afterImage',
          title: 'After Image',
          type: 'productImage',
        },
      ],
    },
    {
      name: 'reviews',
      title: 'Customer Reviews',
      type: 'array',
      of: [{ type: 'review' }],
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'faq' }],
    },

    // Footer
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),

    // COD
    defineField({
      name: 'codEnabled',
      title: 'Cash on Delivery Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'codText',
      title: 'COD Text',
      type: 'string',
      initialValue: 'Cash on Delivery Available',
    }),
    defineField({
      name: 'freeDeliveryText',
      title: 'Free Delivery Text',
      type: 'string',
      initialValue: 'Free Delivery All Over Bangladesh',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'headline',
      media: 'heroImage.url',
    },
  },
})


import { defineField, defineType } from "sanity";

export default defineType({
  name: "productImage",
  title: "Product Image",
  type: "image",
  options: {
    hotspot: true, // Enables cropping
    accept: "image/*", // Accepts all image types
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description: "Important for SEO and accessibility",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption for the image",
    }),
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      alt: "alt",
      caption: "caption",
    },
    prepare({ imageUrl, alt, caption }) {
      return {
        title: alt || "Product Image",
        subtitle: caption || "No caption",
        imageUrl: imageUrl ? `${imageUrl}?w=100&h=100&fit=crop` : "",
      };
    },
  },
});

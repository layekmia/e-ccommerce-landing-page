import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      city: 'city',
      rating: 'rating',
    },
    prepare({ name, city, rating }) {
      return {
        title: name || 'Review',
        subtitle: `${city || ''} - ${rating ? '⭐'.repeat(rating) : ''}`,
      }
    },
  },
})


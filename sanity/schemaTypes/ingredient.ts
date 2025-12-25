import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Ingredient Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      description: 'description',
    },
    prepare({ title, description }) {
      return {
        title: title || 'Ingredient',
        subtitle: description || 'No description',
      }
    },
  },
})


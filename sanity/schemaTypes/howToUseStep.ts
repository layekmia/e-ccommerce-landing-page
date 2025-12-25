import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'howToUseStep',
  title: 'How to Use Step',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Step Image',
      type: 'productImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({ title, description }) {
      return {
        title: title || 'How to Use Step',
        subtitle: description || 'No description',
      }
    },
  },
})


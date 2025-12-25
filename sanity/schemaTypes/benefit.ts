import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'benefit',
  title: 'Benefit',
  type: 'object',
  fields: [
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Optional: Icon name for the component to map (e.g., sparkles, shield, droplet)',
      options: {
        list: [
          { title: 'Sparkles', value: 'sparkles' },
          { title: 'Shield', value: 'shield' },
          { title: 'Droplet', value: 'droplet' },
          { title: 'Leaf', value: 'leaf' },
          { title: 'Zap', value: 'zap' },
          { title: 'Gem', value: 'gem' },
          { title: 'Star', value: 'star' },
          { title: 'Heart', value: 'heart' },
          { title: 'Check Circle', value: 'checkCircle' },
          { title: 'Award', value: 'award' },
          { title: 'Sun', value: 'sun' },
          { title: 'Moon', value: 'moon' },
          { title: 'Flame', value: 'flame' },
          { title: 'Wind', value: 'wind' },
          { title: 'Waves', value: 'waves' },
          { title: 'Flower', value: 'flower' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
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
      title: 'title',
      iconName: 'iconName',
    },
    prepare({ title, iconName }) {
      return {
        title: title || 'Benefit',
        subtitle: iconName ? `Icon: ${iconName}` : 'No icon',
      }
    },
  },
})


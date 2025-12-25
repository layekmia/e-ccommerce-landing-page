import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      question: 'question',
      answer: 'answer',
    },
    prepare({ question, answer }) {
      return {
        title: question || 'FAQ',
        subtitle: answer ? answer.substring(0, 60) + '...' : 'No answer',
      }
    },
  },
})


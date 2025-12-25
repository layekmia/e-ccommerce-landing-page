import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'problemSolution',
  title: 'Problem & Solution',
  type: 'object',
  fields: [
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      problem: 'problem',
      solution: 'solution',
    },
    prepare({ problem, solution }) {
      return {
        title: problem || 'Problem & Solution',
        subtitle: solution ? solution.substring(0, 60) + '...' : 'No solution',
      }
    },
  },
})


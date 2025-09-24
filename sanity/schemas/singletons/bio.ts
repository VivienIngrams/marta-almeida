import { BookIcon, LinkIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'bio',
  title: 'Bio',
  type: 'document',
  icon: BookIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your biography page.',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'pt',
          title: 'Português',
          type: 'string',
          validation: (rule) => rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'bgColor',
      title: 'Backgroung color',
      type: 'color',
    }),
    defineField({
      name: 'bio',
      description: 'This text is your biography.',
      title: 'Biography text',
     type: 'object',
      fields: [
        {
          name: 'pt',
          title: 'Português',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              lists: [],
              marks: {
                annotations: [],
                decorators: [
                  { title: 'Italic', value: 'em' },
                  { title: 'Strong', value: 'strong' },
                ],
              },
              styles: [],
            }),
          ],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              lists: [],
              marks: {
                annotations: [],
                decorators: [
                  { title: 'Italic', value: 'em' },
                  { title: 'Strong', value: 'strong' },
                ],
              },
              styles: [],
            }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title.pt', 
    },
    prepare({ title }) {
      return {
        title: title,
      }
    },
  },
})




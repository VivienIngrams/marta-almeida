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
      preview: {
        select: {
          bioPt: 'pt',
          bioEn: 'en',
        },
        prepare({ bioPt, bioEn }) {
          const extractFirst = (arr) =>
            Array.isArray(arr) && arr.length && arr[0]?.children?.length
              ? arr[0].children[0].text
              : ''
          return {
            title: 'Biography',
            subtitle: extractFirst(bioEn) || extractFirst(bioPt) || 'No content',
          }
        },
      },
    }),
  ],

  preview: {
    select: {
      titlePt: 'title.pt',
      titleEn: 'title.en',
    },
    prepare({ titlePt, titleEn }) {
      return {
        title: titleEn || titlePt || 'Untitled Bio',
      }
    },
  },
})




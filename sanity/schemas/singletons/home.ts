import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',

  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your website.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'overview',
      title: 'Overview',
      description:
        'Text used to describe website on internet search engines and on home page intro (in both languages)',
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
          overviewPt: 'pt',
          overviewEn: 'en',
        },
        prepare({ overviewPt, overviewEn }) {
          const extractFirst = (arr) =>
            Array.isArray(arr) && arr.length && arr[0]?.children?.length
              ? arr[0].children[0].text
              : ''
          return {
            title: 'Overview',
            subtitle: extractFirst(overviewEn) || extractFirst(overviewPt) || 'No content',
          }
        },
      },
    }),
    defineField({
      name: 'homeImage',
      title: 'Home Image Desktops',
      description:
        'This image will be displayed on larger screens (landscape).',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'homeMobileImage',
      title: 'Home Image Mobile',
      description: 'This image will be displayed on mobile devices.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bgColor',
      title: 'Backgroung color',
      type: 'color',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})

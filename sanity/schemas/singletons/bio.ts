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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
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
            subtitle:
              extractFirst(bioEn) || extractFirst(bioPt) || 'No content',
          }
        },
      },
    }),
    defineField({
      name: 'bgColor',
      title: 'Backgroung color',
      type: 'color',
    }),
    defineField({
          name: 'images',
          title: 'Carousel Images',
          description:
            'These images will be used in the carousel on the Interpretação page. You can rearrange the display order by dragging each image.',
          type: 'array',

          of: [
            defineArrayMember({
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  title: 'Caption',
                  name: 'caption',
                  type: 'object',
                  fields: [
                    { name: 'pt', title: 'Português', type: 'string' },
                    { name: 'en', title: 'English', type: 'string' },
                  ],
                  description: '(Optional) Caption below the image (bilingual)',
                  preview: {
                    select: {
                      captionPt: 'pt',
                      captionEn: 'en',
                    },
                    prepare({ captionPt, captionEn }) {
                      return {
                        title: 'Caption',
                        subtitle: captionEn || captionPt || 'No caption',
                      }
                    },
                  },
                },
              ],
              preview: {
                select: {
                  media: 'asset',
                  captionPt: 'caption.pt',
                  captionEn: 'caption.en',
                },
                prepare({ media, captionPt, captionEn }) {
                  return {
                    title: 'Carousel Image',
                    subtitle: captionEn || captionPt || '',
                    media,
                  }
                },
              },
            }),
          ],
        }),
    
  ],

  preview: {
    select: {
      titlePt: 'title.pt',
      titleEn: 'title.en',
    },
    prepare({ titlePt, titleEn }) {
      return {
        title: titlePt || titleEn || 'Untitled Bio',
      }
    },
  },
})

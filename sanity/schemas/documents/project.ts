import { ImageIcon, PlayIcon, StarIcon, TextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: StarIcon,
  fields: [
    // TITLE
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Project title in both languages',
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
    }),

    // SLUG
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Click "Generate" to create the slug (it will define the page address at marta-almeida.com/projects/<slug>).',
      type: 'slug',
      options: {
        source: 'title.pt',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),

    // COVER IMAGE
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'This image will be used as the main image for the project.',
      type: 'image',
      options: { hotspot: true },
    }),

    // OVERVIEW
    defineField({
      name: 'overview',
      title: 'Overview',
      description: 'Project overview in both languages',
      type: 'object',
      fields: [
        {
          name: 'pt',
          title: 'Português',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
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

    // YEAR
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description:
        '(Optional) Freeform field for year or type of your project. Shown next to title in project list and below title on the project page.',
    }),

    // SITE
    defineField({
      name: 'site',
      title: 'Website link',
      type: 'object',
      options: { columns: 2 },
      fields: [
        defineField({ title: 'URL Title', name: 'urltitle', type: 'string' }),
        defineField({ title: 'URL link', name: 'url', type: 'url' }),
      ],
    }),

    // BACKGROUND COLOR
    defineField({
      name: 'bgColor',
      title: 'Background color',
      type: 'color',
    }),

    // CONTENT BUILDER
    defineField({
      title: 'Content builder',
      name: 'content',
      type: 'array',
      of: [
        // SINGLE IMAGE
        defineArrayMember({
          title: 'Single Image',
          name: 'singleImage',
          type: 'object',
          icon: ImageIcon,
          fields: [
            defineField({ title: 'Photo', name: 'photo', type: 'image', options: { hotspot: true } }),
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'object',
              fields: [
                defineField({ name: 'pt', title: 'Português', type: 'string' }),
                defineField({ name: 'en', title: 'English', type: 'string' }),
              ],
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
            }),
          ],
          preview: {
            select: { media: 'photo', captionEn: 'caption.en', captionPt: 'caption.pt' },
            prepare({ media, captionEn, captionPt }) {
              return {
                title: 'Single image',
                subtitle: captionEn || captionPt || '',
                media,
              }
            },
          },
        }),

        // TWO IMAGES
        defineArrayMember({
          title: 'Two Images',
          name: 'twoImages',
          type: 'object',
          icon: ImageIcon,
          fields: [
            defineField({ title: 'Left photo', name: 'photoOne', type: 'image', options: { hotspot: true } }),
            defineField({ title: 'Right photo', name: 'photoTwo', type: 'image', options: { hotspot: true } }),
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'object',
              fields: [
                defineField({ name: 'pt', title: 'Português', type: 'string' }),
                defineField({ name: 'en', title: 'English', type: 'string' }),
              ],
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
            }),
          ],
          preview: {
            select: { media: 'photoOne', captionEn: 'caption.en', captionPt: 'caption.pt' },
            prepare({ media, captionEn, captionPt }) {
              return {
                title: 'Two images',
                subtitle: captionEn || captionPt || '',
                media,
              }
            },
          },
        }),

        // TEXT BLOCK
        defineArrayMember({
          title: 'Text Block',
          name: 'textBlock',
          type: 'object',
          icon: TextIcon,
          fields: [
            defineField({
              name: 'description',
              title: 'Text Block',
              type: 'object',
              fields: [
                defineField({ name: 'pt', title: 'Português', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
                defineField({ name: 'en', title: 'English', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
              ],
            }),
          ],
          preview: {
            select: { descEn: 'description.en', descPt: 'description.pt' },
            prepare({ descEn, descPt }) {
              const extractFirst = (arr) =>
                Array.isArray(arr) && arr.length && arr[0]?.children?.length
                  ? arr[0].children[0].text
                  : ''
              return {
                title: extractFirst(descEn) || extractFirst(descPt) || 'Text block',
              }
            },
          },
        }),

        // SINGLE VIDEO
        defineArrayMember({
          title: 'Single Video',
          name: 'singleVideo',
          type: 'object',
          icon: PlayIcon,
          fields: [
            defineField({ title: 'Youtube/Vimeo link', name: 'videoLink', type: 'url' }),
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'object',
              fields: [
                defineField({ name: 'pt', title: 'Português', type: 'string' }),
                defineField({ name: 'en', title: 'English', type: 'string' }),
              ],
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
            }),
          ],
          preview: {
            select: { videoLink: 'videoLink', captionEn: 'caption.en', captionPt: 'caption.pt' },
            prepare({ videoLink, captionEn, captionPt }) {
              return {
                title: 'Single video',
                subtitle: captionEn || captionPt || videoLink || '',
              }
            },
          },
        }),

        // TWO VIDEOS
        defineArrayMember({
          title: 'Two Videos',
          name: 'twoVideos',
          type: 'object',
          icon: PlayIcon,
          fields: [
            defineField({ title: 'Left video link', name: 'videoOneLink', type: 'url' }),
            defineField({ title: 'Right video link', name: 'videoTwoLink', type: 'url' }),
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'object',
              fields: [
                defineField({ name: 'pt', title: 'Português', type: 'string' }),
                defineField({ name: 'en', title: 'English', type: 'string' }),
              ],
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
            }),
          ],
          preview: {
            select: { videoOneLink: 'videoOneLink', videoTwoLink: 'videoTwoLink', captionEn: 'caption.en', captionPt: 'caption.pt' },
            prepare({ videoOneLink, videoTwoLink, captionEn, captionPt }) {
              return {
                title: 'Two videos',
                subtitle: captionEn || captionPt || [videoOneLink, videoTwoLink].filter(Boolean).join(' | '),
              }
            },
          },
        }),
      ],
    }),
  ],

  // DOCUMENT PREVIEW
  preview: {
    select: {
      titlePt: 'title.pt',
      titleEn: 'title.en',
      media: 'coverImage',
      subtitle: 'year',
    },
    prepare({ titlePt, titleEn, media, subtitle }) {
      return {
        title: titleEn || titlePt || 'Untitled project',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})

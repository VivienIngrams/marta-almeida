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
        defineField({
          name: 'pt',
          title: 'Português',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    // SLUG
    defineField({
      name: 'slug',
      description:
        'Please click the button "Generate" to generate the slug (it will create the page address at marta-almeida.com/projects/<slug>).',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.pt', // ✅ safer to use pt title for slug
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
      options: {
        hotspot: true,
      },
    }),

    // OVERVIEW
    defineField({
      name: 'overview',
      title: 'Overview',
      description: 'Project overview in both languages',
      type: 'object',
      fields: [
        defineField({
          name: 'pt',
          title: 'Português',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    // YEAR
    defineField({
      name: 'year',
      description:
        '(Optional) This freeform field is for year or type of your project. It will be displayed next to title in the projects list within the homepage and below title at project page.',
      title: 'Year',
      type: 'string',
    }),

    // SITE
    defineField({
      name: 'site',
      title: 'Website link',
      description:
        '(Optional) External link related to your project, it is displayed below your project overview text.',
      type: 'object',
      options: { columns: 2 },
      fields: [
        defineField({
          title: 'URL Title',
          name: 'urltitle',
          type: 'string',
        }),
        defineField({
          title: 'URL link',
          name: 'url',
          type: 'url',
        }),
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
      description:
        'This is a content builder for your project page, choose content type and add your content. You can rearrange your blocks later.',
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
            defineField({
              title: 'Photo',
              name: 'photo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'object',
              fields: [
                defineField({ name: 'pt', title: 'Português', type: 'string' }),
                defineField({ name: 'en', title: 'English', type: 'string' }),
              ],
              description: '(Optional) Caption below the image (bilingual)',
            }),
          ],
          preview: {
            select: { photo: 'photo' },
            prepare({ photo }) {
              return { title: 'Single image', media: photo }
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
            defineField({
              title: 'Left photo',
              name: 'photoOne',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              title: 'Right photo',
              name: 'photoTwo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'object',
              fields: [
                defineField({ name: 'pt', title: 'Português', type: 'string' }),
                defineField({ name: 'en', title: 'English', type: 'string' }),
              ],
              description: '(Optional) Caption below the images (bilingual)',
            }),
          ],
          preview: {
            select: { photo: 'photoOne' },
            prepare({ photo }) {
              return { title: 'Two images', media: photo }
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
                defineField({
                  name: 'pt',
                  title: 'Português',
                  type: 'array',
                  of: [defineArrayMember({ type: 'block' })],
                }),
                defineField({
                  name: 'en',
                  title: 'English',
                  type: 'array',
                  of: [defineArrayMember({ type: 'block' })],
                }),
              ],
            }),
          ],
        }),

        // SINGLE VIDEO
        defineArrayMember({
          title: 'Single Video (Youtube/Video link)',
          name: 'singleVideo',
          type: 'object',
          icon: PlayIcon,
          fields: [
            defineField({
              title: 'Youtube or Vimeo link',
              name: 'videoLink',
              type: 'url',
            }),
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'object',
              fields: [
                defineField({ name: 'pt', title: 'Português', type: 'string' }),
                defineField({ name: 'en', title: 'English', type: 'string' }),
              ],
              description: '(Optional) Caption below the video (bilingual)',
            }),
          ],
          preview: {
            select: { link: 'videoLink' },
            prepare({ link }) {
              return { title: 'Single video', subtitle: link }
            },
          },
        }),

        // TWO VIDEOS
        defineArrayMember({
          title: 'Two Videos (Youtube/Video link)',
          name: 'twoVideos',
          type: 'object',
          icon: PlayIcon,
          fields: [
            defineField({
              title: 'Left video (Youtube/Video link)',
              name: 'videoOneLink',
              type: 'url',
            }),
            defineField({
              title: 'Right video (Youtube/Video link)',
              name: 'videoTwoLink',
              type: 'url',
            }),
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'object',
              fields: [
                defineField({ name: 'pt', title: 'Português', type: 'string' }),
                defineField({ name: 'en', title: 'English', type: 'string' }),
              ],
              description: '(Optional) Caption below 2 videos (bilingual)',
            }),
          ],
          preview: {
            select: {
              desc: 'description',
            },
            prepare({ desc }) {
              const text =
                (desc?.pt && desc.pt[0]?.children?.[0]?.text) ||
                (desc?.en && desc.en[0]?.children?.[0]?.text) ||
                'Text block'
              return { title: text }
            },
          },
        }),
      ],
    }),
  ],
})

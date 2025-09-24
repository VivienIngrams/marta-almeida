import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'interpretacao',
  title: 'Interpretacao',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your personal website.',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'pt', title: 'Português', type: 'string', validation: rule => rule.required() },
        { name: 'en', title: 'English', type: 'string', validation: rule => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
   
    defineField({
      name: 'overview',
      description:
        'This text is your description of this page to the internet search engines.',
      title: 'Page description',
      type: 'object',
       fields: [
        {
           name: 'pt',
          title: 'Português',
          type: 'array',
          of: [
            // Paragraphs
            defineArrayMember({
              lists: [],
              marks: {
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'Url',
                      },
                    ],
                  },
                ],
                decorators: [
                  {
                    title: 'Italic',
                    value: 'em',
                  },
                  {
                    title: 'Strong',
                    value: 'strong',
                  },
                ],
              },
              styles: [],
              type: 'block',
            }),
          ],
          validation: (rule) => rule.max(155),
        },
        {
           name: 'en',
          title: 'Inglês',
          type: 'array',
          of: [
            // Paragraphs
            defineArrayMember({
              lists: [],
              marks: {
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'Url',
                      },
                    ],
                  },
                ],
                decorators: [
                  {
                    title: 'Italic',
                    value: 'em',
                  },
                  {
                    title: 'Strong',
                    value: 'strong',
                  },
                ],
              },
              styles: [],
              type: 'block',
            }),
          ],
          validation: (rule) => rule.max(155),
        },
      ],
    }),
    defineField({
      name: 'showcaseProjects',
      title: 'Showcase projects',
      description:
        'These are the projects that will appear on your Interpretacao page. First create your set of projects and then add to the list below. You can rearrange the display order by dragging each project.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
    defineField({
      name: 'bgColor',
      title: 'Background color',
      description:
        'This is the background color of your Interpretacao page. It will be used for the entire page.',
      type: 'color',
      options: {
        disableAlpha: true,
        color: '#000000',
      },
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
            },
          ]
        }),
      ],
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Interpretacao',
        title,
      }
    },
  },
})

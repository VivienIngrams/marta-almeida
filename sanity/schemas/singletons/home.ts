import { BookIcon, LinkIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
   name: 'home',
    title: 'Home',
    type: 'document',
    icon: BookIcon,
    // Uncomment below to have edits publish automatically as you type
    // liveEdit: true,
    fields: [
      defineField({
        name: 'title',
        description: 'This field is the title of your personal website.',
        title: 'Title',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'customLogo',
        description: 
          'Upload your custom logo, it will replace your title in the header of your website. Use SVG or PNG with a transparent background.',
        title: 'Custom logo (Optional)',
        type: 'image',
      }),
      defineField({
        name: 'overview',
        description:
          'This text is your description. Used for the introduction paragraph at a Home page and also for the <meta> description tag for SEO.',
        title: 'Introduction text',
        type: 'object',
        fields:[
          {
          name: 'text',
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
          validation: (rule) => rule.max(155).required(),
          },
        
        ],
      }),
    defineField({
      name: 'homeImage',
      title: 'Home Image',
      description:
        '(Optional) This image will be displayed next to your  description.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'links',
      title: 'External links',
      description: '(Optional) Here you can add a list of external links, it will be displayed below your HomePage description text.',
      type: 'array',
      of: [
        {
        title: 'Link',
        name: 'navLink',
        type: 'object',
        icon: LinkIcon,
        fields: [
          {
            title: 'Title',
            name: 'title',
            type: 'string',
            description: 'Display Text'
          },
          {
            title: 'URL',
            name: 'url',
            type: 'url',
            description: 'enter an external URL',
            validation: Rule =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel']
            }),
          },
        ],
        preview: {
          select: {
            title: 'title',
            url: 'url'
          },
          prepare({ title, url }) {
            return {
              title: title,
              subtitle: url,
              media: LinkIcon,
            }
          },
        },
      },
    ],
  }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home page',
      }
    },
  },
})


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
        description:
          'This text is your description. Used for the introduction paragraph at a Home page and also for the <meta> description tag for SEO (to describe the website to the internet search engines).',
        title: 'Brief description of yourself',
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
      description:
        'This image will be displayed on mobile devices.',
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
    prepare() {
      return {
        title: 'Home page',
      }
    },
  },
})

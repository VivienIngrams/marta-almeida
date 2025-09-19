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
        description: 'This field is the title of your biogra^hy page.',
        title: 'Title',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
    
    
   
     defineField({
      name: 'bgColor',
      title: 'Backgroung color',
      type: 'color',
    }),
    defineField({
        name: 'bio',
        description:
          'This text is your biography.',
        title: 'Biography text',
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Biography page',
      }
    },
  },
})


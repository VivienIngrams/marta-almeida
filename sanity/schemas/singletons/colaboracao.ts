import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'colaboracao',
  title: 'Colaboracao',
  type: 'document',
  icon: HomeIcon,
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
      name: 'overview',
      description:
"This text is your description of this page to the internet search engines." ,
     title: 'Page description',
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
      name: 'bgColor',
      title: 'Backgroung color',
      type: 'color',
    }),
    defineField({
      name: 'showcaseProjectsOutros',
      title: 'Showcase projects (Outros)',
      description:
        'These are the projects that will appear on your Colaboracao page. First create your set of projects and then add to the list below. You can rearrange the display order by dragging each project.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
    defineField({
      name: 'showcaseProjectsEnsino',
      title: 'Showcase projects (Ensino)',
      description:
        'These are the projects that will appear on your Colaboracao page. First create your set of projects and then add to the list below. You can rearrange the display order by dragging each project.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
    defineField({
      name: 'showcaseProjectsProducao',
      title: 'Showcase projects (Produção)',
      description:
        'These are the projects that will appear on your Colaboracao page. First create your set of projects and then add to the list below. You can rearrange the display order by dragging each project.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
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
        subtitle: 'Colaboracao',
        title,
      }
    },
  },
})

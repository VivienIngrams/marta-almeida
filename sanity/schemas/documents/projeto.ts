import { ImageIcon, PlayIcon, StarIcon, TextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'projeto',
  title: 'Projetos',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your personal website.',
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
],
preview: {
    select: {
      titlePt: 'title.pt',
      titleEn: 'title.en',
    },
    prepare({ titlePt, titleEn }) {
      return {
        title: titleEn || titlePt || 'Untitled Colaboracao',
      }
    },
  },

})
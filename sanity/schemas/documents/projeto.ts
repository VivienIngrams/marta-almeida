import { ImageIcon, PlayIcon, StarIcon, TextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'projeto',
  title: 'Projetos',
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
// 
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

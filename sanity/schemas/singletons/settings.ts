import { CogIcon, LinkIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results. It should be 1200 X 630 pixels.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favIcon',
      title: 'Favicon Image',
      type: 'image',
      description: 'Displayed on a tab in a browser before your website title.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bgColor',
      title: 'Backgroung color',
      type: 'color',
    }),
    defineField({
      name: 'textColor',
      title: 'Text color',
      type: 'color',
    }),
    defineField({
      title: 'Display "Last updated" at the footer of the website',
      description: 'Turn on to display time whe you last added new project to your Home page',
      name: 'displayLastUpdated',
      type: 'boolean',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})

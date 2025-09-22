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
      name: 'favIcon',
      title: 'Favicon Image',
      type: 'image',
      description: 'Displayed on a tab in a browser before your website title.',
      options: {
        hotspot: true,
      },
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

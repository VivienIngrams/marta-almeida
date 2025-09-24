import { ImageIcon, PlayIcon, StarIcon, TextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Project title in both languages',
      type: 'object',
      fields: [
        { name: 'pt', title: 'Português', type: 'string', validation: rule => rule.required() },
        { name: 'en', title: 'English', type: 'string', validation: rule => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      description:
        'Please click the button "Generate" to generate the slug (it will create the page address at marta-almeida.com/projects/<slug>).',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be used as the main image for the project.',
      type: 'image',
      options: {
        hotspot: true,
      },
    
    }),
    // BILINGUAL OVERVIEW
    defineField({
      name: 'overview',
      title: 'Overview',
      description: 'Project overview in both languages',
      type: 'object',
      fields: [
        {
          name: 'pt',
          title: 'Português',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              lists: [],
              marks: {
                annotations: [],
                decorators: [
                  { title: 'Italic', value: 'em' },
                  { title: 'Strong', value: 'strong' },
                ],
              },
              styles: [],
            }),
          ],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              lists: [],
              marks: {
                annotations: [],
                decorators: [
                  { title: 'Italic', value: 'em' },
                  { title: 'Strong', value: 'strong' },
                ],
              },
              styles: [],
            }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      description:
        '(Optional) This freeform field is for year or type of your project. It will be displayed next to title in the projects list within the homepage and below title at project page.',
      title: 'Year',
      type: 'string',
    }),
       defineField({
      name: 'site',
      title: 'Website link',
      description:
        '(Optional) External link related to your project, it is displayed below your project overview text.',
      type: 'object',
      options: {
        columns: 2,
      },
      fields: [
        {
          title: 'URL Title',
          name: 'urltitle',
          type: 'string',
        },
        {
          title: 'URL link',
          name: 'url',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'bgColor',
      title: 'Background color',
      type: 'color',
    }),
    // Content blocks
    defineField({
      title: 'Content builder',
      description:
        'This is a content builder for your project page, choose content type and add your content. You can rearrange your blocks later.',
      name: 'content',
      type: 'array',
      of: [
        // Single image block
        defineArrayMember({
          title: 'Single Image',
          name: 'singleImage',
          type: 'object',
          icon: ImageIcon,
          fields: [
            {
              title: 'Photo',
              name: 'photo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
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
          ],
          preview: {
            select: {
              photo: 'photo',
            },
            prepare({ photo }) {
              return {
                title: 'Single image',
                media: photo,
              }
            },
          },
        }),
        // Two images block
        defineArrayMember({
          title: 'Two Images',
          name: 'twoImages',
          type: 'object',
          icon: ImageIcon,
          fields: [
            {
              title: 'Left photo',
              name: 'photoOne',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              title: 'Right photo',
              name: 'photoTwo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
           {
              title: 'Caption',
              name: 'caption',
              type: 'object',
              fields: [
                { name: 'pt', title: 'Português', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
              ],
              description: '(Optional) Caption below the images (bilingual)',
            },
          ],
          preview: {
            select: {
              photo: 'photoOne',
            },
            prepare({ photo }) {
              return {
                title: 'Two images',
                media: photo,
              }
            },
          },
        }),
        // Text block
        defineArrayMember({
          title: 'Text Block',
          name: 'textBlock',
          type: 'object',
          icon: TextIcon,
          fields: [
            {
              name: 'description',
              title: 'Text Block',
              type: 'object',
              fields: [
                {
                  name: 'pt',
                  title: 'Português',
                  type: 'array',
                  of: [
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
                          { title: 'Italic', value: 'em' },
                          { title: 'Strong', value: 'strong' },
                        ],
                      },
                      styles: [],
                      type: 'block',
                    }),
                  ],
                },
                {
                  name: 'en',
                  title: 'English',
                  type: 'array',
                  of: [
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
                          { title: 'Italic', value: 'em' },
                          { title: 'Strong', value: 'strong' },
                        ],
                      },
                      styles: [],
                      type: 'block',
                    }),
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              content: 'description',
            },
            prepare({ content }) {
              return {
                title: 'Text Block',
              }
            },
          },
        }),
        // Single video
        defineArrayMember({
          title: 'Single Video (Youtube/Video link)',
          name: 'singleVideo',
          type: 'object',
          icon: PlayIcon,
          fields: [
            {
              title: 'Youtube or Vimeo link',
              name: 'videoLink',
              type: 'url',
            },
            {
              title: 'Caption',
              name: 'caption',
              type: 'object',
              fields: [
                { name: 'pt', title: 'Português', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
              ],
              description: '(Optional) Caption below the video (bilingual)',
            },
          ],
          preview: {
            select: {
              link: 'videoLink',
            },
            prepare({ link }) {
              return {
                title: 'Single video',
                subtitle: link,
              }
            },
          },
        }),
        // Two videos
        defineArrayMember({
          title: 'Two Videos (Youtube/Video link)',
          name: 'twoVideos',
          type: 'object',
          icon: PlayIcon,
          fields: [
            {
              title: 'Left video (Youtube/Video link)',
              name: 'videoOneLink',
              type: 'url',
            },
            {
              title: 'Right video (Youtube/Video link)',
              name: 'videoTwoLink',
              type: 'url',
            },
            {
              title: 'Caption',
              name: 'caption',
              type: 'string',
              description: '(Optional) Caption below 2 videos',
            },
          ],
          preview: {
            select: {
              linkOne: 'videoOneLink',
              linkTwo: 'videoTwoLink',
            },
            prepare({ linkOne, linkTwo }) {
              return {
                title: 'Two videos',
                subtitle: linkOne + ` + ` + linkTwo,
              }
            },
          },
        }),
      ],
    }),
  ],
})

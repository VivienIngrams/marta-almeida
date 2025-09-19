'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */

import { colorInput } from '@sanity/color-input'
import { visionTool } from '@sanity/vision'
import { defineConfig, NavbarProps, useWorkspace } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'


import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { Logo } from '@/sanity/plugins/Logo'
import * as resolve from '@/sanity/plugins/resolve'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import project from '@/sanity/schemas/documents/project'
import home from '@/sanity/schemas/singletons/home'
import criacao from '@/sanity/schemas/singletons/criacao'
import colaboracao from './sanity/schemas/singletons/colaboracao'
import interpretacao from './sanity/schemas/singletons/interpretacao'
import settings from '@/sanity/schemas/singletons/settings'
import bio from '@/sanity/schemas/singletons/bio'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Collected | Portolio website editor with Sanity.io'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  icon: Logo,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      criacao,
      interpretacao,
      colaboracao,
      bio,
      home,
      settings,
      // Documents
      project,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([criacao, colaboracao, interpretacao, settings, bio, home]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([interpretacao.name, colaboracao.name, criacao.name, settings.name, bio.name,home.name]),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
  
  ],
})

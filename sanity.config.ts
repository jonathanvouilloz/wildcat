// Config du studio Sanity embarqué (servi par @sanity/astro sur /studio).
// projectId/dataset : lus depuis l'env au build — fallback 'placeholder' tant que
// le projet sanity.io n'est pas créé (le studio monte mais ne se connecte pas).
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';

import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'wildcat',
  title: 'Wildcat Muay Thai',

  projectId: process.env.SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool(), // playground GROQ (onglet Vision)
    // i18n document-level : un document blogPost PAR langue → slugs traduits
    // gratuits (règle Q6). Les autres types restent en field-level (localeString/localeText).
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'fr', title: 'Français' },
      ],
      schemaTypes: ['blogPost'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});

// Config du studio Sanity embarqué (servi par @sanity/astro sur /studio).
// ⚠️ Ce fichier est bundlé CÔTÉ NAVIGATEUR (le studio est une island React) :
// pas de `process.env` ici → import.meta.env + variables préfixées PUBLIC_
// (le projectId n'est pas un secret). Fallback process.env guardé pour les
// contextes Node (sanity CLI : schema extract/typegen).
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { schemaTypes } from './sanity/schemaTypes';

const projectId =
  import.meta.env?.PUBLIC_SANITY_PROJECT_ID ??
  (typeof process !== 'undefined' ? process.env.PUBLIC_SANITY_PROJECT_ID : undefined) ??
  'placeholder';

const dataset =
  import.meta.env?.PUBLIC_SANITY_DATASET ??
  (typeof process !== 'undefined' ? process.env.PUBLIC_SANITY_DATASET : undefined) ??
  'production';

export default defineConfig({
  name: 'wildcat',
  title: 'Wildcat Muay Thai',

  projectId,
  dataset,

  // NB : pas de basePath ici — l'intégration @sanity/astro l'ignore ;
  // le chemin du studio est studioBasePath dans astro.config.mjs.

  // i18n : field-level only (localeString/localeText). Le plugin
  // documentInternationalization (blogPost) est retiré — blog = Content
  // Collections .md depuis E8 (DECISIONS.md 2026-06-05).
  plugins: [
    structureTool(),
    visionTool(), // playground GROQ (onglet Vision)
  ],

  schema: {
    types: schemaTypes,
  },
});

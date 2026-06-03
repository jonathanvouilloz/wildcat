// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // TODO(Q5): confirmer le domaine définitif (wildcatmuaythai.com ?). Sert au sitemap, hreflang et canonical.
  site: 'https://wildcatmuaythai.com',

  // i18n — V1 : EN + FR (TH/DE/ES/RU repoussés en V1.1). URLs préfixées : /en, /fr.
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },

  // La racine renvoie vers la langue par défaut (les pages vivent sous /[lang]).
  redirects: {
    '/': '/en',
  },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel(),
  integrations: [
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } } }),
    icon(),
  ]
});
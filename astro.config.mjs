// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

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
    plugins: [
      tailwindcss(),
      // Paraglide — strings UI typées (source : messages/{locale}.json, output compilé : src/paraglide/).
      // SSG : la locale est posée par src/middleware.ts (setLocale) au build, pas par paraglideMiddleware.
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
        // 'globalVariable' est indispensable en SSG : côté serveur la strategy 'url'
        // est ignorée (pas de window) ; le middleware pose la locale via setLocale,
        // qui écrit la variable globale lue ici. 'url' sert au client, 'baseLocale' = fallback.
        strategy: ['url', 'globalVariable', 'baseLocale'],
        urlPatterns: [
          {
            pattern: '/:path(.*)?',
            localized: [
              ['en', '/en/:path(.*)?'],
              ['fr', '/fr/:path(.*)?'],
            ],
          },
        ],
      }),
    ]
  },

  adapter: vercel(),
  integrations: [
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } } }),
    icon(),
  ]
});
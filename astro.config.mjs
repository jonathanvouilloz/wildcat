// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// Sanity — projectId/dataset doivent être connus au niveau config (build-time).
// Préfixe PUBLIC_ : le studio embarqué (island React) lit ces valeurs côté
// navigateur via import.meta.env (le projectId n'est pas un secret).
// Fallback 'placeholder' : le build du site public passe même sans .env.
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  ''
);

// https://astro.build/config
export default defineConfig({
  // Q5 tranchée (2026-06-05) : wildcatmuaythai.com. Sert au sitemap, hreflang et canonical.
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

  // Images distantes autorisées pour <Image> (astro:assets) — en SSG elles
  // sont TÉLÉCHARGÉES et ré-hébergées en local au build. Indispensable pour
  // le feed Instagram : les URLs CDN scontent sont signées et expirent.
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
    ],
  },

  vite: {
    server: {
      watch: {
        // Windows EMFILE ("too many open files") : sans ces ignores, le
        // watcher scanne dist/ et .vercel/ (node_modules bundlés = milliers
        // de fichiers), épuise les handles et meurt → HMR cassé, vieux
        // modules servis (page "à moitié stylée").
        // ⚠️ Piège : PAS de '**/wildcat/**' ici — le repo s'appelle wildcat,
        // ce glob ignorerait tout le projet. Le bundle design est ciblé en
        // relatif depuis la racine.
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/dist/**',
          '**/.vercel/**',
          '**/.seo-data/**',
          '**/PNG/**',
          '**/content/**',
          '**/tests/**',
          'wildcat/**', // bundle design (maquettes HTML/CSS), relatif racine
          '**/moodboard/**',
        ],
      },
    },
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
    // Studio Sanity embarqué : en SSG le studio est une page statique unique,
    // routing interne en hash router (/studio#/...). React requis par le studio
    // uniquement — aucune island React sur le site public.
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID || 'placeholder',
      dataset: PUBLIC_SANITY_DATASET || 'production',
      useCdn: false, // SSG : contenu frais au moment du build, pas de cache CDN
      studioBasePath: '/studio',
    }),
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } },
      // Le studio est un outil interne : exclu du sitemap (+ Disallow dans robots.txt).
      // /api/* : routes on-demand (POST only), jamais indexables — exclusion explicite.
      filter: (page) => !page.includes('/studio') && !page.includes('/api/'),
    }),
    icon(),
  ]
});
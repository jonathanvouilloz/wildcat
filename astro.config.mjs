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
import mdx from '@astrojs/mdx';

// Sanity — projectId/dataset doivent être connus au niveau config (build-time).
// Préfixe PUBLIC_ : le studio embarqué (island React) lit ces valeurs côté
// navigateur via import.meta.env (le projectId n'est pas un secret).
// Fallback 'placeholder' : le build du site public passe même sans .env.
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  ''
);

// Rehype — ouvre les liens externes (http/https absolus) dans un nouvel onglet.
// Les liens internes (chemins relatifs comme /stay-train) et les ancres restent
// dans l'onglet courant. S'applique au markdown ET au MDX (qui hérite de la
// config markdown par défaut). Plugin local : pas de dépendance, walk manuel.
function rehypeExternalLinks() {
  const visit = (node) => {
    if (
      node.type === 'element' &&
      node.tagName === 'a' &&
      typeof node.properties?.href === 'string' &&
      /^https?:\/\//.test(node.properties.href)
    ) {
      node.properties.target = '_blank';
      node.properties.rel = 'noopener noreferrer';
    }
    if (Array.isArray(node.children)) node.children.forEach(visit);
  };
  return (tree) => visit(tree);
}

// Rehype — préfixe les liens internes racine-relatifs des articles avec la
// locale du fichier. Les liens in-body sont écrits sans préfixe (/stay-train) ;
// le site ne sert que /en/... et /fr/... → sans ça ils partent en 404.
// La locale vient du chemin : src/content/blog/en|fr/slug.(md|mdx).
// S'applique md ET mdx. Plugin local : pas de dépendance, walk manuel.
function rehypeLocalizeInternalLinks() {
  return (tree, file) => {
    const path = (file?.path ?? file?.history?.[0] ?? '').replace(/\\/g, '/');
    const m = path.match(/\/blog\/(en|fr)\//);
    if (!m) return; // hors collection blog → on ne touche à rien
    const locale = m[1];
    const visit = (node) => {
      if (
        node.type === 'element' &&
        node.tagName === 'a' &&
        typeof node.properties?.href === 'string'
      ) {
        const href = node.properties.href;
        // racine-relatif, PAS déjà préfixé /en|/fr, PAS protocol-relative //,
        // PAS ancre/mailto/tel/http (ceux-ci sont laissés tels quels).
        if (
          href.startsWith('/') &&
          !href.startsWith('//') &&
          !/^\/(en|fr)(?=[\/?#]|$)/.test(href)
        ) {
          node.properties.href = `/${locale}${href}`;
        }
      }
      if (Array.isArray(node.children)) node.children.forEach(visit);
    };
    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  // Q5 tranchée (2026-06-05) : wildcatmuaythai.com. Sert au sitemap, hreflang et canonical.
  site: 'https://wildcatmuaythai.com',

  // trailingSlash 'never' (2026-06-13) — alignement URL canonique.
  // Sans cette ligne, Astro défaut sur 'ignore' : le canonical sortait AVEC slash
  // (`/en/`, artefact de build.format:'directory') alors que tous les liens internes
  // (localePath, blogPath) et le redirect racine pointent SANS slash (`/en`). Résultat :
  // /en et /en/ servis tous deux en 200 (aucun 301 d'enforcement) + self-canonical en
  // désaccord à chaque navigation. 'never' aligne canonical/hreflang/og:url/sitemap sur la
  // forme sans slash (déjà celle des liens) ET déclenche l'adaptateur Vercel qui écrit
  // `trailingSlash: false` dans .vercel/output/config.json → 301 réel /en/ → /en.
  // Détail complet : docs/trailing-slash-canonical.md.
  trailingSlash: 'never',

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

  // LCP : les <link rel="stylesheet"> bloquaient le first paint (~14 Ko sur 3
  // requêtes, audit 2026-06-07). 'always' inline tout le CSS dans le HTML —
  // zéro requête bloquante ; perte du cache inter-pages acceptable à cette
  // taille (SSG vitrine).
  build: {
    inlineStylesheets: 'always',
  },

  // Liens externes du contenu markdown/MDX → nouvel onglet (voir plugin ci-dessus).
  markdown: {
    rehypePlugins: [rehypeExternalLinks, rehypeLocalizeInternalLinks],
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
          // ⚠️ relatif racine ('content/**', drafts skills SEO), PAS '**/content/**'
          // qui matcherait aussi src/content/ (articles blog E8) → HMR mort dessus.
          'content/**',
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
    // MDX — opt-in par article de blog (quiz interactif mid-contenu). Les
    // articles standards restent en .md pur (pipeline /seo-write → commit).
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } },
      // Le studio est un outil interne : exclu du sitemap (+ Disallow dans robots.txt).
      // /styleguide, /home-test-loading, /dtv-review : pages internes noindex — jamais dans le sitemap.
      // /rss.xml : feed, pas une page.
      filter: (page) =>
        !page.includes('/studio') &&
        !page.includes('/styleguide') &&
        !page.includes('/home-test-loading') &&
        !page.includes('/dtv-review') &&
        !page.includes('/rss.xml'),
      // Articles blog (E8) : slugs TRADUITS par locale → le mapping i18n du
      // sitemap (symétrique) émettrait des xhtml:link vers des 404. On retire
      // les links des entrées articles (l'URL reste listée ; les hreflang
      // corrects sont dans le <head> des pages). L'index /blog, lui, est
      // symétrique → links conservés.
      serialize: (item) =>
        /\/(en|fr)\/blog\/.+/.test(new URL(item.url).pathname)
          ? { ...item, links: undefined }
          : item,
    }),
    icon(),
  ]
});

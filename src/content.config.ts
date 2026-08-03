import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Catégories blog — alignées sur les 6 clusters du calendrier éditorial
 * (docs/structure-blog.md). Labels traduits via messages Paraglide
 * (`blog_cat_*`), jamais ici. Slug = valeur utilisée dans l'URL `?category=`.
 */
export const BLOG_CATEGORIES = [
  'choosing-a-camp',
  'beginners',
  'benefits',
  'chiang-mai-life',
  'visa',
  'culture',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/**
 * Collection blog — Astro Content Collections (.md / .mdx), décision 2026-06-05
 * (DECISIONS.md, renverse Q6/E4 : Sanity blogPost retiré en E8).
 *
 * Arborescence : src/content/blog/{en,fr}/slug-traduit.md
 *   → id = "en/burning-season-chiang-mai" (la locale est le 1er segment,
 *     le slug d'URL est le reste — slugs TRADUITS par locale).
 *
 * i18n : `translationKey` apparie les versions EN/FR d'un même article
 * (hreflang + LangSwitcher). Un article EN sans FR est valide : il n'émet
 * que hreflang en + x-default (jamais de lien vers un 404).
 *
 * Quiz : les articles avec mini-quiz utilisent l'extension .mdx et importent
 * <ArticleQuiz> directement dans le contenu (positionnable mid-article).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /**
       * H1 visible de l'article — DISTINCT du `title` (title = optimisé
       * SERP/CTR dans <title>/og ; h1 = développe l'angle, peut dépasser
       * 60 car.). Optionnel : le layout retombe sur `title` si absent, mais
       * /seo-brief + /seo-enrich imposent un h1 ≠ title (règle Critical
       * /seo-review). Sans ce champ, zod (mode par défaut) strippe la clé.
       */
      h1: z.string().optional(),
      /** Meta description SEO — ~150 car. max (audit /seo-review). */
      description: z.string().max(170),
      /**
       * TL;DR — 2 à 5 points à retenir, rendus en Callout brief (◆) sous la
       * byline. REQUIS (décision 2026-06-06) : le pipeline /seo-write produit
       * toujours un TLDR ; un article sans = erreur de build volontaire.
       */
      tldr: z.array(z.string()).min(2).max(5),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(BLOG_CATEGORIES),
      /** Cover co-localisée (ex: ../covers/slug.webp) — optimisée par astro:assets. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** true = visible en dev, exclu du build prod. */
      draft: z.boolean().default(false),
      /** Slug stable commun EN/FR — appariement des traductions. */
      translationKey: z.string(),
    }),
});

const localeString = z.object({ en: z.string().default(''), fr: z.string().default('') });
const localImage = z.object({ src: z.string(), alt: z.string() });

/** Contenus auparavant gérés dans Sanity, désormais versionnés avec le site. */
const coaches = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/coaches' }),
  schema: z.object({ name: z.string(), role: localeString, bio: localeString.optional(), featured: z.boolean().default(false), order: z.number().default(0), photo: localImage.optional() }),
});
const fighters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fighters' }),
  schema: z.object({ name: z.string(), fightName: z.string().optional(), countryCode: z.string().length(2).optional(), year: z.number().int().optional(), fights: z.number().int().nonnegative().default(0), venues: z.array(z.string()).default([]), quote: localeString.optional(), achievements: z.array(z.string()).default([]), featured: z.boolean().default(false), photo: localImage.optional() }),
});
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({ name: z.string(), country: z.string().optional(), service: z.enum(['dtv', 'training', 'general']).default('general'), content: localeString, rating: z.number().int().min(1).max(5).default(5), date: z.string().optional(), featured: z.boolean().default(false), screenshot: localImage.optional() }),
});
const scooters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/scooters' }),
  schema: z.object({ name: z.string(), year: z.number().int().optional(), color: z.string().optional(), cc: z.number().int().optional(), priceDaily: z.number().int().nonnegative(), priceMonthly: z.number().int().nonnegative(), note: localeString.optional(), available: z.boolean().default(true), order: z.number().default(0), photo: localImage.optional() }),
});

export const collections = { blog, coaches, fighters, testimonials, scooters };

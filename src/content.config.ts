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

export const collections = { blog };

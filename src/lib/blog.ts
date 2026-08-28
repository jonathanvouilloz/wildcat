/**
 * Helpers blog — Content Collections (E8).
 *
 * Convention id : "{lang}/{slug}" (glob loader, base src/content/blog).
 * Le slug d'URL est TRADUIT par locale ; `translationKey` (frontmatter)
 * apparie les versions EN/FR pour les hreflang et le LangSwitcher.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export { BLOG_CATEGORIES, type BlogCategory } from '../content.config';

export type BlogEntry = CollectionEntry<'blog'>;

export interface BlogAlternate {
  lang: string;
  href: string;
}

/** Drafts : visibles en dev, exclus du build prod.
 *  publishDate : articles futurs visibles en dev, exclus du build prod. */
const isVisible = (entry: BlogEntry) => {
  if (!import.meta.env.PROD) return !entry.data.draft;
  if (entry.data.draft) return false;
  return entry.data.publishDate.valueOf() <= Date.now();
};

export function parseBlogId(id: string): { lang: 'en' | 'fr'; slug: string } {
  const [lang, ...rest] = id.split('/');
  return { lang: lang as 'en' | 'fr', slug: rest.join('/') };
}

/** Path relatif de l'article (préfixe locale inclus) : /en/blog/slug. */
export function blogPath(entry: BlogEntry): string {
  const { lang, slug } = parseBlogId(entry.id);
  return `/${lang}/blog/${slug}`;
}

/** Articles publiés d'une locale, du plus récent au plus ancien. */
export async function getPostsByLang(lang: string): Promise<BlogEntry[]> {
  const posts = await getCollection(
    'blog',
    (entry) => entry.id.startsWith(`${lang}/`) && isVisible(entry)
  );
  return posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

/**
 * Alternates hreflang d'un article — UNIQUEMENT les locales où la traduction
 * existe (appariement translationKey). Jamais de lien vers un 404 : un article
 * EN-only retourne [{ lang: 'en', … }] et BaseLayout n'émet que en + x-default.
 * Hrefs absolus (BaseLayout les rend tels quels).
 */
export async function getAlternates(entry: BlogEntry): Promise<BlogAlternate[]> {
  const base = import.meta.env.SITE;
  const siblings = await getCollection(
    'blog',
    (e) => e.data.translationKey === entry.data.translationKey && isVisible(e)
  );
  return ['en', 'fr']
    .map((lang) => {
      const match = siblings.find((e) => e.id.startsWith(`${lang}/`));
      return match ? { lang, href: new URL(blogPath(match), base).href } : null;
    })
    .filter((alt): alt is BlogAlternate => alt !== null);
}

/**
 * Articles liés ("Keep reading") : même catégorie d'abord, complétés par les
 * plus récents si la catégorie ne suffit pas. Exclut l'article courant.
 */
export async function getRelated(entry: BlogEntry, count = 3): Promise<BlogEntry[]> {
  const { lang } = parseBlogId(entry.id);
  const posts = (await getPostsByLang(lang)).filter((p) => p.id !== entry.id);
  const sameCategory = posts.filter((p) => p.data.category === entry.data.category);
  const rest = posts.filter((p) => p.data.category !== entry.data.category);
  return [...sameCategory, ...rest].slice(0, count);
}

/**
 * Articles publiés d'une catégorie dans une locale (feed des pages hub, ex.
 * /chiang-mai-guide). Réutilise getPostsByLang (filtre draft/publishDate).
 * `count` optionnel = limite (les plus récents d'abord).
 */
export async function getPostsByCategory(
  lang: string,
  category: string,
  count?: number
): Promise<BlogEntry[]> {
  const posts = (await getPostsByLang(lang)).filter((p) => p.data.category === category);
  return count ? posts.slice(0, count) : posts;
}

/**
 * Articles désignés par `translationKey`, dans l'ordre demandé, filtrés sur
 * la locale courante — c'est le résolveur du maillage service → blog (ReadNext).
 *
 * Une clé sans traduction dans cette locale est simplement OMISE : le bloc
 * appelant rend moins de cartes, ou rien du tout. C'est ce qui rend les liens
 * service → blog sûrs sans `lang === 'en'` codé en dur, et auto-réparants
 * le jour où une traduction FR arrive. Une clé inconnue est ignorée de même ;
 * tests/audit-links.py reste le filet contre les fautes de frappe (le bloc
 * disparaît au lieu de pointer un 404).
 */
export async function getPostsByKeys(lang: string, keys: string[]): Promise<BlogEntry[]> {
  const posts = await getPostsByLang(lang);
  return keys
    .map((key) => posts.find((post) => post.data.translationKey === key))
    .filter((post): post is BlogEntry => post !== undefined);
}

/** Nombre d'articles par catégorie (pour masquer les chips vides). */
export async function getCategoryCounts(lang: string): Promise<Record<string, number>> {
  const posts = await getPostsByLang(lang);
  const counts: Record<string, number> = {};
  for (const post of posts) {
    counts[post.data.category] = (counts[post.data.category] ?? 0) + 1;
  }
  return counts;
}

/**
 * Construction des props BlogCard depuis des entrées de collection.
 *
 * Extrait de blog/index.astro, blog/[slug].astro et chiang-mai-guide.astro,
 * qui en avaient chacun une copie identique (covers résolues au build via
 * astro:assets, date formatée par locale, label de catégorie localisé).
 * BlogCard reste muet : il reçoit des strings déjà traduites.
 */
import { getImage } from 'astro:assets';
import { parseBlogId, type BlogEntry } from './blog';
import { localePath } from './routes';
import { m } from '../paraglide/messages.js';

export interface BlogCardProps {
  href: string;
  title: string;
  excerpt: string;
  category: string;
  /** Valeur brute de catégorie — filtrage client de /blog (BlogFilters). */
  categoryValue: string;
  date: { iso: string; label: string };
  image?: { src: string; alt: string };
}

/** Records explicites valeur → message (pattern achLabels de /fighters). */
export function categoryLabels(): Record<string, string> {
  return {
    'choosing-a-camp': m.blog_cat_choosing_a_camp(),
    beginners: m.blog_cat_beginners(),
    benefits: m.blog_cat_benefits(),
    'chiang-mai-life': m.blog_cat_chiang_mai_life(),
    visa: m.blog_cat_visa(),
    culture: m.blog_cat_culture(),
  };
}

export async function toBlogCards(lang: string, posts: BlogEntry[]): Promise<BlogCardProps[]> {
  const labels = categoryLabels();
  const dateFmt = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return Promise.all(
    posts.map(async (post) => {
      const { slug } = parseBlogId(post.id);
      const cover = post.data.cover
        ? {
            src: (await getImage({ src: post.data.cover, width: 640, format: 'webp' })).src,
            alt: post.data.coverAlt ?? '',
          }
        : undefined;
      return {
        href: localePath(lang, `/blog/${slug}`),
        title: post.data.title,
        excerpt: post.data.description,
        category: labels[post.data.category],
        categoryValue: post.data.category as string,
        date: {
          iso: post.data.publishDate.toISOString().slice(0, 10),
          label: dateFmt.format(post.data.publishDate),
        },
        image: cover,
      };
    })
  );
}

import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPostsByLang, parseBlogId } from '../../../lib/blog';
import { m } from '../../../paraglide/messages.js';
import { site } from '../../../config/site';

/**
 * RSS par locale (E8) : /en/blog/rss.xml + /fr/blog/rss.xml.
 * Items = articles publiés de la locale (drafts exclus en prod via
 * getPostsByLang). La locale Paraglide est posée par le middleware
 * (route [lang]) — m.* rend la bonne langue.
 */
export function getStaticPaths() {
  return [{ params: { lang: 'en' } }, { params: { lang: 'fr' } }];
}

export const GET: APIRoute = async (context) => {
  const lang = (context.params.lang as string) ?? 'en';
  const posts = await getPostsByLang(lang);

  return rss({
    title: `${site.name} — ${m.blog_hero_head()}`,
    description: m.blog_meta_desc(),
    site: new URL(`/${lang}/blog`, context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: new URL(`/${lang}/blog/${parseBlogId(post.id).slug}`, context.site).href,
      categories: [post.data.category],
    })),
    customData: `<language>${lang}</language>`,
  });
};

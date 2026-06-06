/**
 * Instagram feed — fetch des derniers posts publics au BUILD via Apify
 * (Instagram Scraper, apify/instagram-scraper).
 *
 * Pourquoi Apify : la Basic Display API est morte (déc. 2024), le profil
 * public n'est plus fetchable sans auth (login wall + IP datacenter
 * bloquées), et on n'a pas accès au compte IG pour l'OAuth (Behold/Meta).
 * Apify maintient le scraping (proxies résidentiels) et expose un endpoint
 * synchrone qui rend les items du dataset directement. Coût : ~0,006 $ par
 * build (4-6 posts) — couvert par le plan gratuit (5 $/mois).
 *
 * Pattern safeQuery : APIFY_TOKEN absent ou fetch en échec → null, le
 * composant InstagramFeed retombe sur les placeholders. Build toujours vert.
 *
 * ⚠️ Les displayUrl Instagram (CDN scontent) sont SIGNÉES et EXPIRENT après
 * quelques jours/semaines : ne jamais les hotlinker telles quelles dans du
 * HTML statique. InstagramFeed les passe à <Image> (astro:assets) qui les
 * télécharge et les ré-héberge en local au build → plus d'expiration.
 * Corollaire : re-builder régulièrement (cron deploy hook, tous les 3-4 j)
 * rafraîchit le feed — pas les images déjà publiées, qui restent valides.
 *
 * Source interchangeable : pour migrer vers Behold/Meta plus tard, seule
 * cette lib change — le contrat InstagramPost reste identique.
 */
import { site } from '../config/site';

export interface InstagramPost {
  /** URL CDN Instagram (signée, expirante) — à passer à <Image>, jamais en <img> direct. */
  src: string;
  /** Caption tronquée (alt) — peut être vide, le composant a un fallback message. */
  alt: string;
  /** Permalien du post sur instagram.com. */
  permalink: string;
}

const APIFY_ACTOR = 'apify~instagram-scraper';
const APIFY_ENDPOINT = `https://api.apify.com/v2/acts/${APIFY_ACTOR}/run-sync-get-dataset-items`;

/** Username extrait de la source unique site.ts (https://www.instagram.com/<username>/). */
const INSTAGRAM_USERNAME =
  site.social
    .find((s) => s.label === 'Instagram')
    ?.href.replace(/\/+$/, '')
    .split('/')
    .pop() ?? '';

// Cache module-level : le composant est rendu sur /en ET /fr (× pages) —
// un seul appel Apify par build, toutes les instances partagent la promesse.
let cache: Promise<InstagramPost[] | null> | undefined;

export function fetchInstagramPosts(limit = 6): Promise<InstagramPost[] | null> {
  cache ??= run(limit);
  return cache;
}

async function run(limit: number): Promise<InstagramPost[] | null> {
  const token = import.meta.env.APIFY_TOKEN;
  if (!token || !INSTAGRAM_USERNAME) return null;

  // En dev, le scrape Apify (~30-60 s) bloquerait le premier rendu de la
  // page à chaque restart du serveur. Opt-in explicite via INSTAGRAM_DEV_FETCH=1 ;
  // `npm run build` + preview reste le chemin normal pour voir le vrai feed.
  if (import.meta.env.DEV && import.meta.env.INSTAGRAM_DEV_FETCH !== '1') {
    console.info('[instagram] dev : fetch Apify désactivé (INSTAGRAM_DEV_FETCH=1 pour forcer)');
    return null;
  }

  try {
    console.info(`[instagram] fetch des ${limit} derniers posts de @${INSTAGRAM_USERNAME} via Apify…`);
    const res = await fetch(`${APIFY_ENDPOINT}?token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        directUrls: [`https://www.instagram.com/${INSTAGRAM_USERNAME}/`],
        resultsType: 'posts',
        resultsLimit: limit,
        addParentData: false,
      }),
      // L'actor met typiquement 30-90 s ; au-delà de 3 min on abandonne
      // (fallback placeholders) plutôt que de bloquer le build.
      signal: AbortSignal.timeout(180_000),
    });
    if (!res.ok) throw new Error(`Apify HTTP ${res.status}`);

    const items: unknown = await res.json();
    if (!Array.isArray(items)) throw new Error('réponse Apify inattendue (pas un tableau)');

    const posts = items
      .filter(
        (it): it is { displayUrl: string; url: string; caption?: string } =>
          typeof it === 'object' &&
          it !== null &&
          typeof (it as Record<string, unknown>).displayUrl === 'string' &&
          typeof (it as Record<string, unknown>).url === 'string'
      )
      .slice(0, limit)
      .map((it) => ({
        src: it.displayUrl,
        // Caption brute → alt court : espaces normalisés, 100 ch max.
        alt: (it.caption ?? '').replace(/\s+/g, ' ').trim().slice(0, 100),
        permalink: it.url,
      }));

    if (posts.length === 0) throw new Error('0 post exploitable dans la réponse');
    console.info(`[instagram] ${posts.length} posts récupérés.`);
    return posts;
  } catch (err) {
    // Jamais bloquant : feed indisponible = placeholders, build vert.
    console.warn('[instagram] feed indisponible, fallback placeholders —', err);
    return null;
  }
}

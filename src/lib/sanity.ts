// Client Sanity côté Astro — fourni par l'intégration @sanity/astro
// (configuré dans astro.config.mjs : projectId/dataset depuis l'env, useCdn:false).
// En SSG, toutes les requêtes tournent au build, côté Node.
import { sanityClient } from 'sanity:client';

export { sanityClient };

/**
 * Helper de requête générique — à consommer par les pages (E5).
 * Usage : const coaches = await loadQuery<Coach[]>({ query: COACHES_QUERY });
 */
export async function loadQuery<T>({
  query,
  params,
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {});
}

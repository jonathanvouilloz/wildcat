// safeQuery — wrapper de loadQuery qui ne casse JAMAIS le build.
// Dataset vide / projectId placeholder / réseau down au build → fallback statique.
// Convention E5 : toute requête Sanity dans une page passe par ici, avec un
// fallback sourcé des messages (pages publiables sans contenu CMS).
import { loadQuery } from './sanity';

export async function safeQuery<T>(
  args: { query: string; params?: Record<string, unknown> },
  fallback: T,
): Promise<T> {
  try {
    const result = await loadQuery<T>(args);
    return result ?? fallback;
  } catch (err) {
    console.warn(
      `[content] Sanity query failed, using static fallback: ${err instanceof Error ? err.message : err}`,
    );
    return fallback;
  }
}

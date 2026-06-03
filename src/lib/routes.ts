/**
 * routes.ts — construction des liens internes localisés.
 *
 * Convention E5 : slugs EN dans toutes les locales (`/fr/dtv-visa`, pas `/fr/visa-dtv`).
 * Les paths sont stockés SANS préfixe locale (site.ts, composants) et passés par
 * localePath() au rendu. Pure function, aucun accès aux messages (tree-shaking).
 */
export function localePath(lang: string, path: string): string {
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  const normalized = path === '/' ? '' : path;
  return `/${lang}${normalized}`;
}

// Livre d'or fighters — constantes + helpers partagés (FighterCard,
// AchievementStamp, page /fighters, styleguide).
// Les achievements sont des célébrations cochables (jamais de W/L) ; l'ordre
// ci-dessous = priorité d'affichage quand la carte tronque à 3 stamps.

/** Valeurs du champ `achievements` (schéma fighter) — miroir de la liste studio. */
export const ACHIEVEMENT_VALUES = [
  'first-fight',
  'stadium-win',
  'ko-win',
  'five-fights',
  'zero-to-hero',
  'title-belt',
  'main-event',
  'round-two',
  'long-stay',
  'family-og',
] as const;
export type AchievementValue = (typeof ACHIEVEMENT_VALUES)[number];

/** Valeurs du champ `venues` (schéma fighter) — stades de Chiang Mai. */
export const VENUE_VALUES = ['thapae', 'kalare', 'loikroh', 'other'] as const;
export type VenueValue = (typeof VENUE_VALUES)[number];

/**
 * Rotation pseudo-aléatoire mais stable au build (hash du seed → -max..+max deg).
 * Seed = nom du fighter (+ valeur du stamp) → mêmes angles à chaque rebuild.
 */
export function seedRot(seed: string, max = 6): number {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return (h % (max * 2 + 1)) - max;
}

/** Choix pseudo-aléatoire stable au build : index 0..n-1 dérivé du seed. */
export function seedPick(seed: string, n: number): number {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return h % n;
}

/** Initiales (fallback sans photo). */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Drapeau emoji depuis un code ISO alpha-2 (regional indicators, zéro dep).
 * ⚠️ Chrome/Windows ne rend pas les drapeaux → dégrade en lettres « FR » (assumé).
 */
export function flagOf(cc: string): string {
  return String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

/** Nom du pays localisé au build via Intl.DisplayNames (EN « France », FR « France »…). */
export function regionName(cc: string, lang = 'en'): string {
  return new Intl.DisplayNames([lang], { type: 'region' }).of(cc.toUpperCase()) ?? cc;
}

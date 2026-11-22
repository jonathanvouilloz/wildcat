export type PublicScooter = { slug: string; available: boolean };

/** Parses the /public/scooters payload into a slug -> available map, ignoring malformed entries. */
export function scooterAvailabilityMap(list: unknown): Record<string, boolean> {
  if (!Array.isArray(list)) return {};
  const map: Record<string, boolean> = {};
  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const { slug, available } = item as Partial<PublicScooter>;
    if (typeof slug === 'string' && slug && typeof available === 'boolean') {
      map[slug] = available;
    }
  }
  return map;
}

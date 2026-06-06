// Résolution des champs i18n field-level de Sanity (localeString/localeText)
// selon la locale Astro courante. Fallback EN si la traduction FR manque
// (même politique que Paraglide : baseLocale = en).
// Usage : pickLocale(coach.bio, Astro.currentLocale)

export type LocaleField = { en?: string; fr?: string } | null | undefined;

export function pickLocale(field: LocaleField, locale: string | undefined): string {
  if (!field) return '';
  if (locale === 'fr' && field.fr) return field.fr;
  return field.en ?? '';
}

/**
 * « June 2026 » / « juin 2026 » depuis une date ISO Sanity (type date).
 * Usage : signature des testimonials (le jour est ignoré).
 */
export function formatMonthYear(iso: string | null | undefined, locale: string | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr' : 'en', {
    month: 'long',
    year: 'numeric',
  }).format(d);
}

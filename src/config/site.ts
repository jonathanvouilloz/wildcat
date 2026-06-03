/**
 * site.ts — source de vérité unique du contenu transverse (Footer, OG defaults,
 * futur JSON-LD E7, pricing E5). Modifier ICI, jamais dans les composants.
 *
 * NB : les URLs canoniques/OG se construisent depuis `Astro.site` (astro.config.mjs,
 * Q5 domaine) — ce fichier ne sert PAS à construire les URLs.
 *
 * i18n (E3) : ce fichier ne contient QUE des données brutes non traduisibles
 * (coordonnées, hrefs, prix, horaires). Les libellés traduisibles vivent dans
 * messages/{locale}.json ; les listes portent une clé (dayKey, key) que les
 * composants mappent vers les messages via un record explicite.
 */
export const site = {
  name: 'Wildcat Muay Thai', // marque — jamais traduite
  domain: 'wildcatmuaythai.com', // TODO(Q5): domaine définitif
  // tagline / motto / contact.note → messages : site_tagline, site_motto, footer_contact_note

  contact: {
    address: '132 หมู่ 7 Chaw Fa Vlg, Tambon Nong Kwai, Hang Dong District, Chiang Mai 50230, Thailand',
    email: 'hello@wildcatmuaythai.com', // TODO(real data): email réel à confirmer
    phone: '+66 85 720 9620',
    phoneHref: 'tel:+66857209620',
  },

  // TODO(real data): horaires réels à confirmer (valeurs maquette)
  // dayKey → messages footer_hours_* (libellés des jours)
  hours: [
    { dayKey: 'monfri', time: '07:00 – 21:00' },
    { dayKey: 'sat', time: '09:00 – 16:00' },
    { dayKey: 'sun', time: '09:00 – 13:00' },
  ],

  social: [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/wildcatmuaythai/',
      icon: 'tabler:brand-instagram',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/wildcatmuaythai/',
      icon: 'tabler:brand-facebook',
    },
  ],

  // Silos principaux (ancres maquette → vraies routes en E5)
  // key → messages footer_explore_* (libellés)
  exploreLinks: [
    { key: 'classes', href: '#programs' },
    { key: 'schedule', href: '#schedule' },
    { key: 'coaches', href: '#coaches' },
    { key: 'pricing', href: '#pricing' },
    { key: 'dtv', href: '#dtv' },
  ],

  /** Image OG par défaut (chemin public, résolu via Astro.site). TODO: vraie cover OG. */
  defaultOgImage: '/assets/gym-garden.jpg',

  /**
   * Tarifs réels (THB) — fournis 2026-06-03, pour E5 (page Pricing, prix publics).
   * NB i18n : les labels restent EN ici — extraction vers messages reportée à E5
   * (donnée de page, pas du shell ; structure finale décidée avec la page Pricing).
   */
  pricing: {
    currency: 'THB',
    groupAdults: [
      { label: 'Drop in', price: 350 },
      { label: '10 times', price: 3000 },
      { label: 'One month (once a day)', price: 4000 },
      { label: 'One month (unlimited)', price: 5000 },
      { label: 'One week unlimited', price: 2000 },
    ],
    groupKids: [
      { label: 'Drop in', price: 300 },
      { label: '10 times', price: 2500 },
      { label: 'One month unlimited', price: 3000 },
      { label: 'One week unlimited', price: 1500 },
    ],
    fighter: [{ label: 'Fighter program — one month advance (twice a day)', price: 7000 }],
    private: [
      { label: 'Head Coach (1.5 hour)', price: 1000 },
      { label: 'Normal Coach (1.5 hour)', price: 800 },
    ],
  },
} as const;

/**
 * site.ts — source de vérité unique du contenu transverse (Footer, OG defaults,
 * futur JSON-LD E7, pricing E5). Modifier ICI, jamais dans les composants.
 *
 * NB : les URLs canoniques/OG se construisent depuis `Astro.site` (astro.config.mjs,
 * Q5 domaine) — ce fichier ne sert PAS à construire les URLs.
 */
export const site = {
  name: 'Wildcat Muay Thai',
  domain: 'wildcatmuaythai.com', // TODO(Q5): domaine définitif
  tagline: 'A warm, community-led Muay Thai gym in Chiang Mai, Thailand. Train together, grow together.',
  motto: 'Train together. Grow together.',

  contact: {
    address: '132 หมู่ 7 Chaw Fa Vlg, Tambon Nong Kwai, Hang Dong District, Chiang Mai 50230, Thailand',
    email: 'hello@wildcatmuaythai.com', // TODO(real data): email réel à confirmer
    phone: '+66 85 720 9620',
    phoneHref: 'tel:+66857209620',
    note: 'Closed on Thai holidays',
  },

  // TODO(real data): horaires réels à confirmer (valeurs maquette)
  hours: [
    { days: 'Mon – Fri', time: '07:00 – 21:00' },
    { days: 'Saturday', time: '09:00 – 16:00' },
    { days: 'Sunday', time: '09:00 – 13:00' },
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
  exploreLinks: [
    { label: 'Classes', href: '#programs' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Coaches', href: '#coaches' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'DTV Visa', href: '#dtv' },
  ],

  /** Image OG par défaut (chemin public, résolu via Astro.site). TODO: vraie cover OG. */
  defaultOgImage: '/assets/gym-garden.jpg',

  /**
   * Tarifs réels (THB) — fournis 2026-06-03, pour E5 (page Pricing, prix publics).
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

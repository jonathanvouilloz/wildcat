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
    // Adresse confirmée 2026-06-04 (Jonathan) — Nong Kwai, Hang Dong.
    address: '132 หมู่ 7 Chaw Fa Vlg, Tambon Nong Kwai, Hang Dong District, Chiang Mai 50230, Thailand',
    email: 'hello@wildcatmuaythai.com', // TODO(real data): email réel à confirmer
    phone: '+66 85 720 9620',
    phoneHref: 'tel:+66857209620',
    whatsapp: 'https://wa.me/66857209620',
    /** Embed Google Maps (fiche "Wildcat Muay Thai") — iframe /contact. */
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3778.482255504113!2d98.94739027580049!3d18.73198396268106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da31b5ac152bff%3A0x4367b10faa0b58fb!2zV2lsZGNhdCBNdWF5IFRoYWkg4LmE4Lin4Lil4LmM4LiU4LmB4LiE4LiX4Lih4Lin4Lii4LmE4LiX4Lii!5e0!3m2!1sfr!2sch!4v1780584479313!5m2!1sfr!2sch',
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

  // Silos principaux (E5) — paths SANS préfixe locale ; les composants
  // les passent par localePath() (src/lib/routes.ts).
  // key → messages footer_explore_* (libellés)
  exploreLinks: [
    { key: 'classes', href: '/classes' },
    { key: 'schedule', href: '/classes#schedule' },
    { key: 'coaches', href: '/about#coaches' },
    { key: 'pricing', href: '/classes#pricing' },
    { key: 'dtv', href: '/dtv-visa' },
  ],

  /** Image OG par défaut (chemin public, résolu via Astro.site). TODO: vraie cover OG. */
  defaultOgImage: '/assets/gym-garden.jpg',

  /**
   * Tarifs réels (THB) — fournis 2026-06-03, prix publics (E5).
   * i18n : `key` → messages pricing_label_* (record explicite dans les composants).
   * `popular` → badge "Most popular" (PricingCard).
   */
  pricing: {
    currency: 'THB',
    groupAdults: [
      { key: 'dropin', price: 350 },
      { key: 'times10', price: 3000 },
      { key: 'month_once', price: 4000 },
      { key: 'month_unlimited', price: 5000, popular: true },
      { key: 'week_unlimited', price: 2000 },
    ],
    groupKids: [
      { key: 'dropin', price: 300 },
      { key: 'times10', price: 2500 },
      { key: 'month_unlimited', price: 3000 },
      { key: 'week_unlimited', price: 1500 },
    ],
    fighter: [{ key: 'fighter_month', price: 7000 }],
    private: [
      { key: 'private_head', price: 1000 },
      { key: 'private_normal', price: 800 },
    ],
  },
} as const;

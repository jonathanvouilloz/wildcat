// Livre d'or des combattants (PRD §5, re-cadré E5d) : les guests venus
// s'entraîner qui ont fait ≥1 combat à Chiang Mai grâce à Wildcat Family.
// Pas de record W/L — la stat unique est le nombre de combats pris ; les
// victoires se célèbrent via les achievements (stamps façon passeport).
import { defineField, defineType } from 'sanity';

// Miroir studio de src/lib/guestbook.ts (ACHIEVEMENT_VALUES / VENUE_VALUES).
const ACHIEVEMENTS = [
  { title: 'First fight', value: 'first-fight' },
  { title: 'Stadium win', value: 'stadium-win' },
  { title: 'KO win', value: 'ko-win' },
  { title: '5+ fights', value: 'five-fights' },
  { title: 'Zero to hero (no experience on arrival)', value: 'zero-to-hero' },
  { title: 'Title belt', value: 'title-belt' },
  { title: 'Main event', value: 'main-event' },
  { title: 'Round two (came back for another stay)', value: 'round-two' },
  { title: 'Long stay (6+ months)', value: 'long-stay' },
  { title: 'Family OG', value: 'family-og' },
];

const VENUES = [
  { title: 'Thapae Boxing Stadium', value: 'thapae' },
  { title: 'Kalare Boxing Stadium', value: 'kalare' },
  { title: 'Loi Kroh Boxing Stadium', value: 'loikroh' },
  { title: 'Other venue', value: 'other' },
];

export const fighter = defineType({
  name: 'fighter',
  title: 'Fighter',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fightName',
      title: 'Fight name',
      type: 'string',
      description: 'Optionnel — comment la personne veut être nommée sur le ring (« Sarah Wildcat », « Tora »…).',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'countryCode',
      title: 'Country code',
      type: 'string',
      description: 'Code pays ISO à 2 lettres majuscules (FR, AU, JP…) — drapeau + nom du pays sur la carte.',
      validation: (rule) =>
        rule.regex(/^[A-Z]{2}$/, { name: 'ISO alpha-2', invert: false }).error('2 lettres majuscules (ex. FR).'),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: "L'année du passage au camp — le « tampon d'entrée » du livre d'or.",
      validation: (rule) => rule.min(2015).max(2035).integer(),
    }),
    defineField({
      name: 'fights',
      title: 'Fights',
      type: 'number',
      description: 'Nombre de combats pris à Chiang Mai — la seule stat affichée.',
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'venues',
      title: 'Venues',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: VENUES, layout: 'grid' },
      description: 'Stades où la personne a combattu (cocher tout ce qui s’applique).',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'localeString',
      description: 'L’entrée du livre d’or — une phrase, dans ses mots (« I came for two weeks, I stayed four months. »).',
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ACHIEVEMENTS, layout: 'grid' },
      description: 'Tampons mérités (cocher) — la carte affiche les 3 premiers par ordre de priorité.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mis en avant (livre d’or / home future).',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', year: 'year', fights: 'fights', media: 'photo' },
    prepare({ title, year, fights, media }) {
      const parts = [year, fights != null ? `${fights} fight${fights === 1 ? '' : 's'}` : null].filter(Boolean);
      return { title, subtitle: parts.join(' · ') || undefined, media };
    },
  },
});

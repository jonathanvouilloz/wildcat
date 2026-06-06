// Flotte de scooters à louer (page /stay-train/scooter-rental).
// Gestion simple au studio : un document par scooter, toggle `available`
// pour marquer loué/disponible sans toucher au code. Prix en THB.
import { defineField, defineType } from 'sanity';

export const scooter = defineType({
  name: 'scooter',
  title: 'Scooter',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Modèle complet — « Honda Scoopy i Prestige », « Honda Click »…',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.min(2010).max(2035).integer(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'En anglais, affiché tel quel (« Grey », « Black »…).',
    }),
    defineField({
      name: 'cc',
      title: 'Engine (cc)',
      type: 'number',
      description: 'Cylindrée — ex. 110.',
      validation: (rule) => rule.min(50).max(500).integer(),
    }),
    defineField({
      name: 'priceDaily',
      title: 'Price per day (THB)',
      type: 'number',
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      name: 'priceMonthly',
      title: 'Price per month (THB)',
      type: 'number',
      validation: (rule) => rule.required().min(0).integer(),
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
      name: 'note',
      title: 'Note',
      type: 'localeString',
      description: 'Optionnel — une ligne d’ambiance (« Easy to ride, perfect first scooter »).',
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      description: 'Décocher quand le scooter est loué — la carte passe en « currently rented ».',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Ordre d’affichage dans la flotte (croissant).',
    }),
  ],
  preview: {
    select: { title: 'name', year: 'year', available: 'available', media: 'photo' },
    prepare({ title, year, available, media }) {
      const parts = [year, available === false ? 'rented' : 'available'].filter(Boolean);
      return { title, subtitle: parts.join(' · ') || undefined, media };
    },
  },
});

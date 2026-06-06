// Avis clients (PRD §5) — affichés home / DTV / Stay & Train selon `service`.
import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      options: {
        list: [
          { title: 'DTV visa', value: 'dtv' },
          { title: 'Training', value: 'training' },
          { title: 'General', value: 'general' },
        ],
        layout: 'radio',
      },
      initialValue: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Mois de l’avis — affiché « June 2026 » sur le site (le jour est ignoré).',
    }),
    defineField({
      name: 'screenshot',
      title: 'Screenshot (9:16)',
      type: 'image',
      description:
        'Capture WhatsApp/IG story de l’approval, format 9:16 (story Insta). ⚠️ Uniquement les captures SANS infos privées (passeport, e-visa, n° de dossier…). Affichée dans la bande « approvals » des pages DTV.',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'De 1 à 5.',
      validation: (rule) => rule.min(1).max(5).integer(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'service' },
  },
});

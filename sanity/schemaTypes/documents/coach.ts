// Équipe Kru (PRD §5 — Q3 : coach ET fighter coexistent).
import { defineField, defineType } from 'sanity';

export const coach = defineType({
  name: 'coach',
  title: 'Coach',
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
      name: 'role',
      title: 'Role',
      type: 'localeString',
      description: 'Ex. « Head Trainer », « Kru » — affiché sous le nom.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'localeText',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mis en avant sur la home / page About.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Ordre d’affichage (croissant).',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role.en', media: 'photo' },
  },
});

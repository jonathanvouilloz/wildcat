// Livre d'or des combattants (PRD §5 — current + alumni).
import { defineField, defineType } from 'sanity';

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
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      description: 'Ex. « Thai », « French », « Australian ».',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Current', value: 'current' },
          { title: 'Alumni', value: 'alumni' },
        ],
        layout: 'radio',
      },
      initialValue: 'current',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fights',
      title: 'Fights',
      type: 'number',
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'wins',
      title: 'Wins',
      type: 'number',
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'losses',
      title: 'Losses',
      type: 'number',
      validation: (rule) => rule.min(0).integer(),
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
      description: 'Mis en avant (livre d’or / fight team).',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'status', media: 'photo' },
  },
});

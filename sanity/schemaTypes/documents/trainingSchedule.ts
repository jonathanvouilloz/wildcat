// Grille des horaires d'entraînement — éditable par l'owner (PRD §5).
// `day` est une clé stable (mon..sun) mappée côté front sur les messages Paraglide.
import { defineField, defineType } from 'sanity';

const DAYS = [
  { title: 'Monday', value: 'mon' },
  { title: 'Tuesday', value: 'tue' },
  { title: 'Wednesday', value: 'wed' },
  { title: 'Thursday', value: 'thu' },
  { title: 'Friday', value: 'fri' },
  { title: 'Saturday', value: 'sat' },
  { title: 'Sunday', value: 'sun' },
];

export const trainingSchedule = defineType({
  name: 'trainingSchedule',
  title: 'Training schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      options: { list: DAYS, layout: 'dropdown' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'timeSlots',
      title: 'Time slots',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'timeSlot',
          fields: [
            defineField({
              name: 'start',
              title: 'Start',
              type: 'string',
              description: 'Format 24h, ex. « 07:00 ».',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'end',
              title: 'End',
              type: 'string',
              description: 'Format 24h, ex. « 09:00 ».',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localeString',
              description: 'Optionnel — ex. « Morning class », « Sparring ».',
            }),
          ],
          preview: {
            select: { start: 'start', end: 'end', label: 'label.en' },
            prepare: ({ start, end, label }) => ({
              title: `${start ?? '?'} – ${end ?? '?'}`,
              subtitle: label,
            }),
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'All levels', value: 'all' },
          { title: 'Beginner', value: 'beginner' },
          { title: 'Kids', value: 'kids' },
          { title: 'Fighter', value: 'fighter' },
          { title: 'Women', value: 'women' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'localeText',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Ordre d’affichage (croissant) — utile si plusieurs entrées par jour.',
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
    select: { day: 'day', level: 'level' },
    prepare: ({ day, level }) => {
      const dayTitle = DAYS.find((d) => d.value === day)?.title ?? day;
      return { title: dayTitle, subtitle: level };
    },
  },
});

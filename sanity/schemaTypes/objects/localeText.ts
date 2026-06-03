// i18n field-level : text multi-ligne {en, fr}. Même contrat que localeString.
import { defineField, defineType } from 'sanity';

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fieldsets: [
    {
      name: 'translations',
      title: 'Translations',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'text',
      rows: 4,
      fieldset: 'translations',
    }),
  ],
});

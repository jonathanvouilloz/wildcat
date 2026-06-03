// i18n field-level : string {en, fr}. EN = champ principal, FR dans un fieldset
// "Translations" repliable. Résolu côté front par pickLocale() (src/lib/i18n-content.ts).
import { defineField, defineType } from 'sanity';

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
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
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'string',
      fieldset: 'translations',
    }),
  ],
});

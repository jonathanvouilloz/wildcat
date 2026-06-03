// Catégorie de blog (DTV / Training / Life) — référencée par blogPost.
// Field-level i18n : le nom est traduit, le slug reste unique (partagé EN/FR).
import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en' },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name.en', subtitle: 'slug.current' },
  },
});

// Agrégation des schémas Sanity — consommé par sanity.config.ts.
// i18n : blogPost = document-level (plugin documentInternationalization) ;
// les autres types = field-level via localeString/localeText.
import { localeString } from './objects/localeString';
import { localeText } from './objects/localeText';
import { coach } from './documents/coach';
import { fighter } from './documents/fighter';
import { blogPost } from './documents/blogPost';
import { trainingSchedule } from './documents/trainingSchedule';
import { testimonial } from './documents/testimonial';
import { category } from './documents/category';
import { scooter } from './documents/scooter';

export const schemaTypes = [
  // Objects
  localeString,
  localeText,
  // Documents
  coach,
  fighter,
  blogPost,
  trainingSchedule,
  testimonial,
  category,
  scooter,
];

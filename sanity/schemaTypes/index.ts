// Agrégation des schémas Sanity — consommé par sanity.config.ts.
// i18n : field-level via localeString/localeText.
// Blog : Content Collections .md depuis E8 (DECISIONS.md 2026-06-05) —
// blogPost + category + plugin doc-internationalization retirés.
import { localeString } from './objects/localeString';
import { localeText } from './objects/localeText';
import { coach } from './documents/coach';
import { fighter } from './documents/fighter';
import { trainingSchedule } from './documents/trainingSchedule';
import { testimonial } from './documents/testimonial';
import { scooter } from './documents/scooter';

export const schemaTypes = [
  // Objects
  localeString,
  localeText,
  // Documents
  coach,
  fighter,
  trainingSchedule,
  testimonial,
  scooter,
];

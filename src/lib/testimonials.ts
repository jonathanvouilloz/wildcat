// Mapping testimonial Sanity → props TestimonialQuote v2 (2026-06-07).
// Centralisé : signature (country · mois année) + tampon localisé par service
// (dtv = gold, training = forest, general = aucun) — partagé par les 8 pages.
import { m } from '../paraglide/messages.js';
import { pickLocale, formatMonthYear } from './i18n-content';
import type { FEATURED_TESTIMONIALS_QUERY_RESULT } from './sanity.types';

export type TestimonialDoc = FEATURED_TESTIMONIALS_QUERY_RESULT[number];

export interface TestimonialProps {
  content: string;
  name: string;
  country?: string;
  dateLabel?: string;
  stamp?: string;
  stampTone?: 'gold' | 'forest';
  rating: number;
}

export function mapTestimonial(doc: TestimonialDoc, lang: string): TestimonialProps {
  const stamp =
    doc.service === 'dtv'
      ? m.testimonial_stamp_dtv()
      : doc.service === 'training'
        ? m.testimonial_stamp_training()
        : undefined;
  return {
    content: pickLocale(doc.content, lang),
    name: doc.name ?? '',
    country: doc.country ?? undefined,
    dateLabel: formatMonthYear(doc.date, lang) || undefined,
    stamp,
    stampTone: doc.service === 'training' ? 'forest' : 'gold',
    rating: doc.rating ?? 5,
  };
}

// Requêtes GROQ par entité — préparées en E4, consommées par les pages en E5.
// Convention : defineQuery (groq typé) pour que `sanity typegen` génère les types
// de résultats (XxxQueryResult dans src/lib/sanity.types.ts).
import { defineQuery } from 'groq';

/** Tous les coachs, ordre d'affichage. */
export const COACHES_QUERY = defineQuery(`
  *[_type == "coach"] | order(order asc) {
    _id, name, slug, photo, role, bio, featured, order
  }
`);

/** Fighters mis en avant (livre d'or / home future). */
export const FEATURED_FIGHTERS_QUERY = defineQuery(`
  *[_type == "fighter" && featured == true] | order(year desc, name asc) {
    _id, name, slug, photo, fightName, countryCode, year, fights, venues, quote, achievements
  }
`);

/** Tout le livre d'or, passages récents d'abord. */
export const FIGHTERS_QUERY = defineQuery(`
  *[_type == "fighter"] | order(year desc, name asc) {
    _id, name, slug, photo, fightName, countryCode, year, fights, venues, quote, achievements, featured
  }
`);

/** Témoignages mis en avant, optionnellement filtrés par service (dtv|training|general). */
export const FEATURED_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && featured == true && ($service == null || service == $service)] {
    _id, name, country, service, content, rating
  }
`);

/**
 * Grille horaires complète, ordonnée.
 * ⚠️ Inutilisée depuis le planning en dur (site.schedule, flyer 2026-06-04) —
 * le schéma trainingSchedule reste en place, réactivable si les horaires varient.
 */
export const SCHEDULE_QUERY = defineQuery(`
  *[_type == "trainingSchedule"] | order(order asc) {
    _id, day, timeSlots, level, notes, order
  }
`);

// Blog : Content Collections .md depuis E8 (src/lib/blog.ts) — les queries
// blogPost/category sont retirées avec leurs schémas (DECISIONS.md 2026-06-05).

/** Flotte de scooters à louer, ordre d'affichage (page scooter-rental). */
export const SCOOTERS_QUERY = defineQuery(`
  *[_type == "scooter"] | order(order asc, name asc) {
    _id, name, year, color, cc, priceDaily, priceMonthly, photo, note, available
  }
`);

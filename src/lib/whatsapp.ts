// WhatsApp deep links — wa.me pré-rempli par intention (PRD : WhatsApp = canal
// de conversation principal du camp). Le texte vient des messages Paraglide au
// call site (localisé) ; sans texte, on retombe sur le lien nu de site.ts.
import { site } from '../config/site';

/** Lien wa.me, pré-rempli si un message est fourni. */
export function waLink(text?: string): string {
  if (!text) return site.contact.whatsapp;
  return `${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

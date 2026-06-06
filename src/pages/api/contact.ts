// POST /api/contact — formulaire contact intent-driven (PRD §8).
// Seule route on-demand du site (SSG partout ailleurs) : prerender=false →
// serverless function via l'adapter Vercel.
// Envoi email via l'API REST Resend en fetch (zéro dépendance npm), gardé par
// RESEND_API_KEY — sans clé, le message est loggé et l'UX reste intacte.
// Anti-spam : honeypot `website` (drop silencieux).
// v2 : champ `intent` (class/stay/scooter/dtv/general) + champs contextuels
// whitelistés par intention → email pré-qualifié pour Meaw. Le form soumet
// aussi les champs des intentions non choisies (toggle CSS only) : on ne lit
// QUE ceux de l'intention active. `from` whitelisté = page de retour du POST.
import type { APIRoute } from 'astro';
import { site } from '../../config/site';

export const prerender = false;

const LOCALES = new Set(['en', 'fr']);

// Page de retour post-POST (path + ancre éventuelle).
const RETURN_PAGES: Record<string, { path: string; hash?: string }> = {
  contact: { path: 'contact' },
  'stay-train': { path: 'stay-train', hash: '#plan' },
};

// Intentions connues → label du subject (EN : email interne pour Meaw) +
// champs contextuels à lire (clé form → label email).
const INTENTS: Record<string, { label: string; fields: [string, string][] }> = {
  class: {
    label: 'Class booking',
    fields: [
      ['cls_date', 'Preferred date'],
      ['cls_level', 'Experience level'],
    ],
  },
  stay: {
    label: 'Stay & Train',
    fields: [
      ['stay_arrival', 'Arrival date'],
      ['stay_duration', 'Duration'],
      ['stay_people', 'People'],
      ['stay_acc', 'Needs accommodation'],
      ['stay_scoot', 'Needs a scooter'],
    ],
  },
  scooter: {
    label: 'Scooter rental',
    fields: [
      ['sct_from', 'From'],
      ['sct_to', 'Until'],
      ['sct_model', 'Model'],
    ],
  },
  dtv: { label: 'DTV visa', fields: [] },
  general: { label: 'General', fields: [] },
};

// Anciennes valeurs `topic` (form v1) → intent.
const LEGACY_TOPICS: Record<string, string> = {
  classes: 'class',
  stay: 'stay',
  dtv: 'dtv',
  other: 'general',
};

function redirectTo(lang: string, from: string, sent: '1' | 'error') {
  const locale = LOCALES.has(lang) ? lang : 'en';
  const page = RETURN_PAGES[from] ?? RETURN_PAGES.contact;
  return new Response(null, {
    status: 303,
    headers: { Location: `/${locale}/${page.path}?sent=${sent}${page.hash ?? ''}` },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirectTo('en', 'contact', 'error');
  }

  const lang = String(form.get('lang') ?? 'en');
  const from = String(form.get('from') ?? 'contact');
  const honeypot = String(form.get('website') ?? '');
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  const rawIntent = String(form.get('intent') ?? form.get('topic') ?? 'general').trim();
  const intentKey = INTENTS[rawIntent] ? rawIntent : (LEGACY_TOPICS[rawIntent] ?? 'general');
  const intent = INTENTS[intentKey];

  // Bot probable : on fait comme si tout allait bien, sans rien envoyer.
  if (honeypot) return redirectTo(lang, from, '1');

  // Message libre requis pour `general` only — une intention qualifiée
  // (dates, durée…) se suffit (form inline /stay-train : textarea optionnel).
  if (!name || !email.includes('@') || (!message && intentKey === 'general')) {
    return redirectTo(lang, from, 'error');
  }

  // Détails contextuels de l'intention active only (champs vides ignorés).
  const details = intent.fields
    .map(([key, label]) => {
      const value = String(form.get(key) ?? '').trim();
      return value ? `${label}: ${value === 'yes' ? 'Yes' : value}` : null;
    })
    .filter(Boolean)
    .join('\n');

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Request: ${intent.label}`,
    `Lang: ${lang}`,
    details ? `\n${details}` : null,
    message ? `\n${message}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: import.meta.env.CONTACT_FROM ?? 'Wildcat Website <onboarding@resend.dev>',
          to: [import.meta.env.CONTACT_EMAIL ?? site.contact.email],
          reply_to: email,
          subject: `[Wildcat] ${intent.label} — ${name}`,
          text,
        }),
      });
      if (!res.ok) {
        console.error('[contact] Resend error', res.status, await res.text());
        return redirectTo(lang, from, 'error');
      }
    } catch (err) {
      console.error('[contact] Resend fetch failed', err);
      return redirectTo(lang, from, 'error');
    }
  } else {
    // Pas de clé (dev / preview) : on logge pour ne pas perdre le message.
    console.warn('[contact] RESEND_API_KEY missing — message logged only:', {
      name,
      email,
      intent: intentKey,
      lang,
      text,
    });
  }

  return redirectTo(lang, from, '1');
};

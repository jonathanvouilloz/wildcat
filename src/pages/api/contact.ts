// POST /api/contact — formulaire contact (PRD §8).
// Seule route on-demand du site (SSG partout ailleurs) : prerender=false →
// serverless function via l'adapter Vercel.
// Envoi email via l'API REST Resend en fetch (zéro dépendance npm), gardé par
// RESEND_API_KEY — sans clé, le message est loggé et l'UX reste intacte.
// Anti-spam : honeypot `website` (drop silencieux).
import type { APIRoute } from 'astro';
import { site } from '../../config/site';

export const prerender = false;

const LOCALES = new Set(['en', 'fr']);

function redirectTo(lang: string, sent: '1' | 'error') {
  const locale = LOCALES.has(lang) ? lang : 'en';
  return new Response(null, {
    status: 303,
    headers: { Location: `/${locale}/contact?sent=${sent}` },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirectTo('en', 'error');
  }

  const lang = String(form.get('lang') ?? 'en');
  const honeypot = String(form.get('website') ?? '');
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const topic = String(form.get('topic') ?? 'other').trim();
  const message = String(form.get('message') ?? '').trim();

  // Bot probable : on fait comme si tout allait bien, sans rien envoyer.
  if (honeypot) return redirectTo(lang, '1');

  if (!name || !email.includes('@') || !message) {
    return redirectTo(lang, 'error');
  }

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
          subject: `[Contact] ${topic} — ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\nLang: ${lang}\n\n${message}`,
        }),
      });
      if (!res.ok) {
        console.error('[contact] Resend error', res.status, await res.text());
        return redirectTo(lang, 'error');
      }
    } catch (err) {
      console.error('[contact] Resend fetch failed', err);
      return redirectTo(lang, 'error');
    }
  } else {
    // Pas de clé (dev / preview) : on logge pour ne pas perdre le message.
    console.warn('[contact] RESEND_API_KEY missing — message logged only:', {
      name,
      email,
      topic,
      lang,
      message,
    });
  }

  return redirectTo(lang, '1');
};

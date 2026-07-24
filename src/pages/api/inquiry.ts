/**
 * inquiry.ts — routeur d'intake (couche additive, feature contact-intake-router).
 *
 * Reçoit une COPIE fire-and-forget de chaque soumission de formulaire (envoyée
 * en plus du POST Web3Forms par src/scripts/wa-form.ts). But unique : réduire le
 * délai avant qu'un humain sache qu'un lead est arrivé, et répondre en secondes
 * aux demandes déterministes (cours, scooter) sans humain.
 *
 * Deux étages :
 *  - class | scooter → auto-réponse email au client (Resend) + résumé Telegram.
 *  - stay  | dtv     → résumé Telegram seul (un humain répond).
 *  - general | vide  → le SEUL cas LLM : message redacté → Mistral → notif taguée.
 *                       JAMAIS d'auto-réponse (risque de répondre à un démarcheur).
 *
 * Rien n'est bloquant : le mail Web3Forms reste la voie de secours. Chaque helper
 * externe s'auto-désactive (early-return) si sa clé d'env est absente → build et
 * requêtes verts même sans les secrets posés.
 *
 * ⚠️ Secrets lus via `process.env` (runtime Node Vercel), PAS `import.meta.env`
 *    (qui serait inliné au build → undefined à la requête sur ce site SSG).
 */
import type { APIRoute } from 'astro';
import { site } from '../../config/site';

// ← bascule CETTE route en fonction serverless à la demande ; le reste reste SSG.
export const prerender = false;

/**
 * Lecture des secrets serveur. `process.env` = runtime Node Vercel (source de
 * vérité en prod, lu à la requête). Fallback `import.meta.env` = dev local :
 * `astro dev` charge `.env` via Vite sur import.meta.env mais NE peuple PAS
 * process.env — sans ce fallback, tester en local ne marcherait pas. process.env
 * gagne toujours en prod. Ces valeurs sont server-only (route SSR) → jamais dans
 * le bundle client. JAMAIS de préfixe PUBLIC_ sur ces vars.
 */
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? import.meta.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? import.meta.env.TELEGRAM_CHAT_ID;
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY ?? import.meta.env.MISTRAL_API_KEY;

/**
 * Adresse où atterrissent les réponses des clients à l'auto-réponse.
 * TODO(real data): inbox réelle de Meaw (docs/checklist.md). Générique en attendant.
 */
const REPLY_TO = 'hello@wildcatmuaythai.com';

/** Seuls intents à réponse déterministe (données structurées → auto-réponse). */
const AUTO = new Set(['class', 'scooter']);

export const POST: APIRoute = async ({ request }) => {
  // On fait tout le travail AVANT de répondre : la réponse est ignorée côté client
  // (fetch keepalive), mais Vercel gèlerait la fonction si on rendait la main trop tôt.
  try {
    const form = await request.formData();
    const get = (k: string) => String(form.get(k) ?? '').trim();

    // 1. Honeypot — présent seulement si coché (donc bot). Drop silencieux.
    if (form.get('botcheck')) return new Response(null, { status: 204 });

    const intent = get('intent') || 'general';
    const message = get('message');
    const lang = get('lang') || 'en';

    if (AUTO.has(intent)) {
      // 2. Auto-réponse client (Resend) + résumé équipe (Telegram). Zéro IA.
      await autoReply(intent, get('email'), get('name'), lang);
      await notify(summaryFor(intent, form));
    } else if (intent === 'stay' || intent === 'dtv') {
      // 3. Humain : notif Telegram seule.
      await notify(summaryFor(intent, form));
    } else {
      // 4. general : le SEUL cas LLM. PII redactée AVANT le modèle ; le tag de
      //    classification s'ajoute à l'en-tête, mais la notif reste exhaustive
      //    (coordonnées + message complet). Jamais d'auto-réponse.
      const clas = await classify(redact(message));
      const tag = clas
        ? `${clas.category}${clas.urgent ? ' · ⚠️ urgent' : ''}${clas.summary ? ` — ${clas.summary}` : ''}`
        : 'non classé';
      await notify(summaryFor('general', form, tag));
    }
  } catch {
    /* jamais bloquant : le mail Web3Forms reste la voie de secours */
  }
  return new Response(null, { status: 204 });
};

/* ------------------------------------------------------------------ *
 * Telegram — notification équipe (groupe commun Jon + Meaw)
 * ------------------------------------------------------------------ */

async function notify(text: string): Promise<void> {
  const token = TELEGRAM_BOT_TOKEN;
  const chat = TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
  }).catch(() => {});
}

/**
 * Message Telegram EXHAUSTIF : toutes les infos du formulaire, coordonnées
 * incluses (nom, email, et surtout téléphone — c'est par là que Meaw rappelle).
 * Décision Jonathan 2026-07-24 : Meaw ne lit jamais le mail Web3Forms → Telegram
 * devient la source complète (renverse la règle « pas de coordonnées » du
 * feature file, qui la disait ajustable). `headerExtra` = tag optionnel ajouté à
 * la 1re ligne (classification LLM pour les `general`).
 */
function summaryFor(intent: string, form: FormData, headerExtra?: string): string {
  const g = (k: string) => String(form.get(k) ?? '').trim();
  const tag: Record<string, string> = {
    class: '🥊 Class booking',
    stay: '🏝️ Stay & Train',
    scooter: '🛵 Scooter rental',
    dtv: '🛂 DTV visa',
    general: '📥 General',
  };
  const header = tag[intent] ?? '📥 Lead';
  const lines: string[] = [headerExtra ? `${header} · ${headerExtra}` : header];

  // Coordonnées — le téléphone est la donnée clé (« non fourni » si absent,
  // pour que Meaw sache tout de suite s'il faut répondre par email/WhatsApp).
  lines.push('');
  const name = g('name');
  const email = g('email');
  const phone = g('phone');
  if (name) lines.push(`👤 ${name}`);
  if (email) lines.push(`📧 ${email}`);
  lines.push(`📞 ${phone || 'non fourni'}`);

  // Champs spécifiques à l'intention.
  const details = detailsFor(intent, g);
  if (details.length) {
    lines.push('');
    lines.push(...details);
  }

  const msg = g('message');
  if (msg) {
    lines.push('');
    lines.push(`💬 ${msg.slice(0, 1000)}`);
  }
  return lines.join('\n');
}

/** Lignes « label: valeur » des champs propres à chaque intention. */
function detailsFor(intent: string, g: (k: string) => string): string[] {
  const out: string[] = [];
  if (intent === 'class') {
    if (g('cls_level')) out.push(`Level: ${g('cls_level')}`);
    if (g('cls_date')) out.push(`Preferred date: ${g('cls_date')}`);
  } else if (intent === 'stay') {
    if (g('stay_arrival')) out.push(`Arrival: ${g('stay_arrival')}`);
    if (g('stay_duration')) out.push(`Duration: ${g('stay_duration')}`);
    if (g('stay_people')) out.push(`People: ${g('stay_people')}`);
    const extras = [g('stay_acc') && 'accommodation', g('stay_scoot') && 'scooter'].filter(Boolean);
    if (extras.length) out.push(`Also wants: ${extras.join(', ')}`);
  } else if (intent === 'scooter') {
    if (g('sct_model')) out.push(`Model: ${g('sct_model')}`);
    if (g('sct_from')) out.push(`From: ${g('sct_from')}`);
    if (g('sct_to')) out.push(`To: ${g('sct_to')}`);
  } else if (intent === 'dtv') {
    if (g('dtv_package')) out.push(`Package: ${g('dtv_package')}`);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Auto-réponse Resend (class | scooter) — prix tirés de site.ts
 * ------------------------------------------------------------------ */

async function autoReply(intent: string, email: string, name: string, lang: string): Promise<void> {
  const key = RESEND_API_KEY;
  if (!key || !email) return;
  const { subject, html } = replyTemplate(intent, name, lang);
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: 'Wildcat Muay Thai <hello@wildcatmuaythai.com>',
      to: email,
      reply_to: REPLY_TO, // les réponses du client atterrissent chez Meaw
      subject,
      html,
    }),
  }).catch(() => {});
}

type FleetItem = { name: string; priceDaily: number | null; priceMonthly: number | null };

/**
 * Templates EN + FR. Volontairement hors Paraglide : emails serveur, pas de l'UI.
 * Ton : accusé + info utile + « on revient vers toi ». Ne prétend PAS clôturer la vente.
 * Tous les prix viennent de site.ts (source unique) — jamais de valeur en dur.
 */
function replyTemplate(intent: string, name: string, lang: string): { subject: string; html: string } {
  const fr = lang === 'fr';
  const hi = name
    ? fr
      ? `Salut ${name},`
      : `Hi ${name},`
    : fr
      ? 'Salut,'
      : 'Hi,';
  // Prix nul (ex. Honda Click) → « sur demande », jamais un montant vide.
  const thb = (n: number | null | undefined) =>
    n == null ? (fr ? 'sur demande' : 'on request') : `${n.toLocaleString('en-US')} THB`;
  const shell = (bodyHtml: string) =>
    `<div style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:520px">` +
    bodyHtml +
    `<p style="margin-top:24px;color:#555">— Wildcat Muay Thai · Nong Kwai, Hang Dong, Chiang Mai<br>` +
    `<a href="https://wildcatmuaythai.com" style="color:#2E5D3C">wildcatmuaythai.com</a></p></div>`;

  if (intent === 'class') {
    const p = (k: string) => thb(site.pricing.groupAdults.find((x) => x.key === k)?.price);
    const sessions = site.schedule.group.join(' · '); // horaires réels, 7j/7 (site.ts)
    const subject = fr ? 'Wildcat Muay Thai — infos cours' : 'Wildcat Muay Thai — class info';
    const body = fr
      ? `<p>${hi}</p><p>Merci d'avoir écrit ! Voici l'essentiel pour venir t'entraîner :</p>` +
        `<ul><li>Cours à l'unité : ${p('dropin')}</li><li>10 cours : ${p('times10')}</li>` +
        `<li>Mois illimité : ${p('month_unlimited')}</li><li>Semaine illimitée : ${p('week_unlimited')}</li></ul>` +
        `<p>Cours collectifs tous les jours à : ${sessions}.</p>` +
        `<p>Pas besoin de réserver — présente-toi 10 min avant un créneau (gants et bandes prêtés si besoin). Meaw revient vers toi personnellement pour le reste.</p>`
      : `<p>${hi}</p><p>Thanks for reaching out! Here's the quick version so you can come train:</p>` +
        `<ul><li>Drop-in class: ${p('dropin')}</li><li>10 classes: ${p('times10')}</li>` +
        `<li>Monthly unlimited: ${p('month_unlimited')}</li><li>Weekly unlimited: ${p('week_unlimited')}</li></ul>` +
        `<p>Group classes run every day at: ${sessions}.</p>` +
        `<p>No need to book ahead — just show up 10 min before a session (gloves and wraps provided if you need them). Meaw will follow up personally with anything else.</p>`;
    return { subject, html: shell(body) };
  }

  // scooter
  const scoopy = site.scooterFleet.find((s) => s.key === 'scoopy') as FleetItem | undefined;
  const click = site.scooterFleet.find((s) => s.key === 'click') as FleetItem | undefined;
  const fleetLine = (s: FleetItem | undefined) =>
    s
      ? `${s.name} — ${thb(s.priceDaily)}${fr ? '/jour' : '/day'} · ${thb(s.priceMonthly)}${fr ? '/mois' : '/month'}`
      : '';
  const subject = fr ? 'Wildcat Muay Thai — location scooter' : 'Wildcat Muay Thai — scooter rental';
  const body = fr
    ? `<p>${hi}</p><p>Merci pour ta demande de scooter ! Notre flotte :</p>` +
      `<ul><li>${fleetLine(scoopy)}</li><li>${fleetLine(click)}</li></ul>` +
      `<p>Caution, casque et permis : on te dit tout au moment de la réservation. Meaw revient vers toi pour les dispos.</p>`
    : `<p>${hi}</p><p>Thanks for the scooter enquiry! Here's our fleet:</p>` +
      `<ul><li>${fleetLine(scoopy)}</li><li>${fleetLine(click)}</li></ul>` +
      `<p>Deposit, helmet and licence: we'll walk you through it when you book. Meaw will get back to you on availability.</p>`;
  return { subject, html: shell(body) };
}

/* ------------------------------------------------------------------ *
 * Classification LLM (general uniquement) — PII redactée avant l'appel
 * ------------------------------------------------------------------ */

/** Masque emails et numéros inline AVANT d'envoyer le texte au modèle. */
function redact(text: string): string {
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[email]')
    .replace(/(\+?\d[\d\s().-]{7,}\d)/g, '[phone]');
}

async function classify(
  text: string,
): Promise<{ category: string; summary: string; urgent: boolean } | null> {
  const key = MISTRAL_API_KEY;
  if (!key || !text) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 2000); // 2 s → sinon on notifie « non classé »
  try {
    const r = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      signal: ctrl.signal,
      body: JSON.stringify({
        model: 'mistral-small-latest',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'Classe ce message de contact reçu par un camp de Muay Thai. Réponds STRICTEMENT en JSON : ' +
              '{"category": une valeur parmi ["prospect","partenariat","presse","démarchage","autre"], ' +
              '"summary": string (1 ligne FR, max 120 caractères), ' +
              '"urgent": boolean (true si une date proche ou une urgence est mentionnée)}.',
          },
          { role: 'user', content: text },
        ],
      }),
    });
    const j = await r.json();
    const raw = j?.choices?.[0]?.message?.content;
    if (typeof raw !== 'string') return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.category !== 'string') return null;
    return {
      category: parsed.category,
      summary: String(parsed.summary ?? ''),
      urgent: !!parsed.urgent,
    };
  } catch {
    return null; // timeout ou erreur → l'appelant notifie « non classé »
  } finally {
    clearTimeout(timer);
  }
}

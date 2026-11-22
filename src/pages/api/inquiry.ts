/**
 * inquiry.ts — routeur d'intake (couche additive, feature contact-intake-router).
 *
 * Reçoit une COPIE fire-and-forget de chaque soumission de formulaire (envoyée
 * en plus du POST Web3Forms par src/scripts/wa-form.ts). But unique : réduire le
 * délai avant qu'un humain sache qu'un lead est arrivé (alerte Telegram immédiate).
 *
 * L'accusé de réception email au client est géré de façon centralisée par
 * l'assistant (wildcat-assistant) pour tous les intents — zéro doublon, zéro
 * prix/horaire dupliqué ici.
 *
 * Deux chemins :
 *  - class | scooter | stay | dtv → résumé Telegram complet (zéro IA).
 *  - general | vide               → message redacté → OpenRouter (mistral-small) → notif taguée.
 *
 * Rien n'est bloquant : le mail Web3Forms reste la voie de secours. Chaque helper
 * externe s'auto-désactive (early-return) si sa clé d'env est absente → build et
 * requêtes verts même sans les secrets posés.
 *
 * ⚠️ Secrets lus via `process.env` (Worker Cloudflare, nodejs_compat), PAS `import.meta.env`
 *    (qui serait inliné au build → undefined à la requête sur ce site SSG).
 */
import type { APIRoute } from 'astro';

// ← bascule CETTE route en fonction serverless à la demande ; le reste reste SSG.
export const prerender = false;

/**
 * Lecture des secrets serveur. `process.env` = Worker Cloudflare (nodejs_compat ; source de
 * vérité en prod, lu à la requête). Fallback `import.meta.env` = dev local :
 * `astro dev` charge `.env` via Vite sur import.meta.env mais NE peuple PAS
 * process.env — sans ce fallback, tester en local ne marcherait pas. process.env
 * gagne toujours en prod. Ces valeurs sont server-only (route SSR) → jamais dans
 * le bundle client. JAMAIS de préfixe PUBLIC_ sur ces vars.
 */
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? import.meta.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? import.meta.env.TELEGRAM_CHAT_ID;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY ?? import.meta.env.OPENROUTER_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  // On fait tout le travail AVANT de répondre : la réponse est ignorée côté client
  // (fetch keepalive), mais le runtime gèlerait la fonction si on rendait la main trop tôt.
  try {
    const form = await request.formData();
    const get = (k: string) => String(form.get(k) ?? '').trim();

    // 1. Honeypot — présent seulement si coché (donc bot). Drop silencieux.
    if (form.get('botcheck')) return new Response(null, { status: 204 });

    const intent = get('intent') || 'general';
    const message = get('message');

    if (intent === 'class' || intent === 'scooter' || intent === 'stay' || intent === 'dtv') {
      await notify(summaryFor(intent, form));
    } else {
      // general : le SEUL cas LLM. PII redactée AVANT le modèle ; le tag de
      // classification s'ajoute à l'en-tête, mais la notif reste exhaustive.
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
 * devient la source complète. `headerExtra` = tag optionnel ajouté à la 1re ligne
 * (classification LLM pour les `general`).
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

/** Valeurs brutes du <select> forfait → libellé lisible dans le message. */
const PACKAGE_LABELS: Record<string, string> = {
  stay_train: 'Stay & Train (all inclusive)',
  training_only: 'Training only',
};

/** Lignes « label: valeur » des champs propres à chaque intention. */
function detailsFor(intent: string, g: (k: string) => string): string[] {
  const out: string[] = [];
  const pkg = () => {
    const raw = g('package');
    if (raw) out.push(`Package: ${PACKAGE_LABELS[raw] ?? raw}`);
  };
  if (intent === 'class') {
    if (g('cls_level')) out.push(`Level: ${g('cls_level')}`);
    if (g('cls_date')) out.push(`Preferred date: ${g('cls_date')}`);
  } else if (intent === 'stay') {
    if (g('stay_arrival')) out.push(`Arrival: ${g('stay_arrival')}`);
    if (g('stay_duration')) out.push(`Duration: ${g('stay_duration')}`);
    if (g('stay_people')) out.push(`People: ${g('stay_people')}`);
    pkg();
    const extras = [g('stay_acc') && 'accommodation', g('stay_scoot') && 'scooter'].filter(Boolean);
    if (extras.length) out.push(`Also wants: ${extras.join(', ')}`);
  } else if (intent === 'scooter') {
    if (g('sct_model')) out.push(`Model: ${g('sct_model')}`);
    if (g('sct_from')) out.push(`From: ${g('sct_from')}`);
    if (g('sct_to')) out.push(`To: ${g('sct_to')}`);
  } else if (intent === 'dtv') {
    if (g('dtv_nationality')) out.push(`Nationality: ${g('dtv_nationality')}`);
    if (g('dtv_arrival')) out.push(`Arrival: ${g('dtv_arrival')}`);
    if (g('dtv_duration')) out.push(`Training: ${g('dtv_duration')}`);
    pkg();
  }
  return out;
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
  const key = OPENROUTER_API_KEY;
  if (!key || !text) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 2000); // 2 s → sinon on notifie « non classé »
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      signal: ctrl.signal,
      body: JSON.stringify({
        model: 'mistralai/mistral-small-3.2-24b-instruct',
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

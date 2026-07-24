# Contact intake — routeur & vitesse de réponse (Telegram + auto-réponse)

**Complexité : M · Statut : DEV DONE (2026-07-24) — reste env Vercel + domaine Resend avant prod** — couche *additive* par-dessus
l'intake existant (`contact-intake.md`). Aucune modification du chemin du lead : le mail Web3Forms
part exactement comme aujourd'hui. On ajoute une **copie fire-and-forget** vers une route serverless
qui trie la demande et, selon l'intention, **répond automatiquement au client** ou **notifie l'équipe
sur Telegram**.

> Ce fichier **est** le plan de build. On le suit dans l'ordre, on câble à la main. Contexte éditorial
> et thèse « vitesse de réponse » → `atelier/ideas/051-vitesse-de-reponse-lead/`.

---

## Etat session 2026-07-24

**Fait :**
- **Route `src/pages/api/inquiry.ts` créée** (tout inline : `notify` / `autoReply` + `replyTemplate` EN-FR / `summaryFor` + `detailsFor` / `redact` / `classify` Mistral). `prerender = false` → 1re fonction serverless du site, SSG intact (build vert, `[@astrojs/vercel] Bundling function`).
- **Copie fire-and-forget câblée** dans `src/scripts/wa-form.ts` (+9 lignes après le fetch Web3Forms) → couvre ContactForm **et** StayInquiryForm d'un coup.
- **Correction du draft** : secrets lus via **`process.env` → fallback `import.meta.env`** (pas `import.meta.env` seul) — sinon inlinés au build (undefined en prod) ET invisibles en dev local. Le fallback fait marcher le test local via `.env`.
- **Telegram rendu EXHAUSTIF** (décision Jonathan, renverse « pas de coordonnées dans TG » du plan) : nom + email + **téléphone** (`non fourni` si absent) + tous les champs de l'intent + message complet, sur les 5 intents. `general` : tag de classification Mistral sur l'en-tête + infos complètes, jamais d'auto-réponse.
- **Auto-réponse `class` enrichie** des horaires réels (`site.schedule.group`), pas que les prix.
- **Testé en local (5 intents)** : tous 204, timings cohérents (stay/dtv 90-210ms = TG seul ; class/scooter 400-545ms = +Resend ; general 605ms = +Mistral). Protection CSRF Astro `checkOrigin` validée (403 sans header `Origin`, OK avec).

**Prochain :** rien côté dev. **Jonathan** pose les 4 vars sur Vercel (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `RESEND_API_KEY`, `MISTRAL_API_KEY`, **sans `PUBLIC_`**) + vérifie le domaine `wildcatmuaythai.com` dans Resend (SPF/DKIM) pour que l'auto-réponse parte. Remplacer `REPLY_TO` (const en tête de `inquiry.ts`) par l'inbox réelle de Meaw. Mistral : clé free tier OK pour tester, **payante** en prod (le free tier peut entraîner sur les prompts).

**Pièges :**
- Vite ne lit `.env` **qu'au démarrage** du dev server → après avoir ajouté des clés, **redémarrer `npm run dev`** (sinon early-return silencieux, réponse en ~5ms au lieu d'un vrai appel réseau).
- Astro `checkOrigin` (défaut Astro 6) bloque tout POST form cross-origin en 403 → le fetch same-origin du client passe, mais un test `curl` doit forcer `-H "Origin: <host>"`.
- Auto-réponse Resend = **échec silencieux** tant que le domaine n'est pas vérifié → si Telegram reçoit mais pas l'email, c'est Resend, pas le code.

**Commit :** [à venir] feat(contact): routeur intake Telegram + auto-réponse

## Carte du code
> Mise à jour : 2026-07-24

| Fichier | Rôle |
|---------|------|
| `src/pages/api/inquiry.ts` | **NEUF.** Route serverless `prerender=false` : parse la copie form, botcheck, switch intent, `notify`/`autoReply`/`summaryFor`/`classify` — tout inline. Secrets via `process.env` (fallback `import.meta.env`). |
| `src/scripts/wa-form.ts` | Copie fire-and-forget `fetch('/api/inquiry', {keepalive:true})` juste après le POST Web3Forms (partagé par les 2 forms). |
| `src/config/site.ts` | Lecture seule : `pricing.groupAdults` + `schedule.group` (auto-réponse class), `scooterFleet` (auto-réponse scooter). |
| `.env` / `.env.example` | 4 vars serveur documentées (sans `PUBLIC_`). |

### Decisions clés
- **Telegram = source complète, coordonnées incluses** (Meaw ne lit jamais le mail Web3Forms) — renverse la règle « pas de coordonnées dans TG » du plan initial.
- **Auto-réponse UNIQUEMENT sur intent structuré** (`class`/`scooter`), jamais sur `general` (risque de répondre à un démarcheur). La donnée structurée répond ; le LLM ne fait que *trier* le résidu.
- **PII redactée avant le modèle** : la notif Telegram affiche les vraies coordonnées, mais Mistral ne reçoit que le message masqué.
- **`process.env` d'abord** pour les secrets runtime (pattern net-new sur ce site SSG), fallback `import.meta.env` pour le dev local.

---

## Objectif

Le SEO amène la demande ; elle se perd pendant que la boîte mail dort. On réduit le délai
avant qu'un humain sache qu'il a quelque chose à traiter — et pour les demandes à réponse
déterministe, on répond en secondes sans humain.

**Deux étages de réponse :**

| intent | étage | action |
|---|---|---|
| `class` | **auto-réponse** | email Resend (horaires + tarifs depuis `site.ts`) → client · + résumé Telegram |
| `scooter` | **auto-réponse** | email Resend (tarifs flotte) → client · + résumé Telegram |
| `stay` | humain | notif Telegram (dépend des dispos, Meaw répond) |
| `dtv` | humain | notif Telegram (cas perso, humain répond) |
| `general` | humain | LLM classe (PII redactée) → notif Telegram taguée · **jamais d'auto-réponse** |

**Règle d'or non négociable :** l'auto-réponse ne part **que** sur un intent structuré (`class`/`scooter`),
**jamais** sur une sortie LLM ni sur `general`. Répondre auto à un `general`, c'est risquer de répondre
à un démarcheur. La donnée structurée *répond* ; l'IA se contente de *trier* le résidu.

---

## Architecture

```
visiteur ─POST natif (keepalive)─► api.web3forms.com/submit  (INCHANGÉ)  ──► mail brut chez Meaw
    │                                                                          (voie de secours, toujours)
    └─ 2e fetch keepalive (copie) ─► /api/inquiry.ts  ◄── SEUL fichier neuf
                                          │
              botcheck rempli ?  ─────────┤─► 204, drop silencieux
              intent = class|scooter ─────┤─► Resend email client (template site.ts) + Telegram résumé
              intent = stay|dtv ──────────┤─► Telegram notif
              intent = general|vide ──────┘─► redact PII → mistral-small (2s) → catégorie
                                              ├─ OK      → Telegram, tag catégorie + résumé
                                              └─ échec   → Telegram, tag « non classé » + texte brut
```

- **Un seul groupe Telegram commun** (Jon + Meaw dedans). Tout arrive là. La catégorie LLM est un
  **tag dans le message**, pas un aiguilleur. → une seule variable `TELEGRAM_CHAT_ID`.
- **Coordonnées jamais dans Telegram** — elles restent dans le mail Web3Forms. Telegram sert à
  *décider* (« il y a un lead, urgent »), le mail à *répondre*. (Décision ajustable si Meaw préfère
  tout sur le tél.)
- **PII jamais dans le LLM** — pas « jamais dans l'API ». La route voit l'email (elle en a besoin pour
  l'auto-réponse) ; le *modèle*, lui, ne reçoit que le texte du message, redacté.

---

## Faisabilité (vérifiée 2026-07-24)

- `astro ^6.4.3` + `adapter: vercel()` (^10), `output` non défini = **static** par défaut. Une route
  qui déclare `export const prerender = false` bascule en **fonction serverless à la demande** sur
  Vercel — le reste du site reste SSG. **Aucun changement à `astro.config.mjs`.** C'est la première
  route sous `src/pages/api/`.
- Le form **ne navigue pas** au submit quand le JS est actif : `wa-form.ts` fait `preventDefault()`
  puis `fetch(..., {keepalive:true})` vers Web3Forms et reste sur la page (modal). Notre copie = une
  **2e ligne fetch au même endroit**. Le point de navigation qu'on redoutait n'existe pas.
- No-JS (fallback) : POST natif → email seul, pas de notif/auto-réponse. Dégradation acceptée et
  assumée à l'écran.
- Aucune dépendance npm nécessaire : Resend, Mistral et Telegram sont appelés en `fetch` brut depuis
  la fonction (SDK Resend optionnel, non requis).

---

## Env (Vercel — Production + Preview)

| Variable | Rôle | Note |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | bot créé via BotFather | secret |
| `TELEGRAM_CHAT_ID` | id du **groupe commun** Jon+Meaw | voir prep pour le récupérer |
| `RESEND_API_KEY` | envoi auto-réponse | free tier, domaine `wildcatmuaythai.com` à vérifier |
| `MISTRAL_API_KEY` | classification `general` | **tier payant**, pas Experiment (le gratuit peut entraîner sur les prompts) |

Pas de préfixe `PUBLIC_` : ces clés sont **serveur uniquement**, elles ne doivent jamais finir dans
le bundle client (contrairement à `PUBLIC_WEB3FORMS_KEY`).

---

## Carte du code

| Fichier | Rôle | État |
|---|---|---|
| `src/pages/api/inquiry.ts` | **NEUF.** Route serverless : parse la copie, botcheck, switch intent, Resend, Mistral, Telegram. | à créer |
| `src/scripts/wa-form.ts` | **ÉDIT.** +1 fetch keepalive vers `/api/inquiry` juste après le fetch Web3Forms. | +4 lignes |
| `src/lib/inquiry/telegram.ts` | Helper `notify(text)` → `sendMessage`. | à créer (optionnel, inline OK) |
| `src/lib/inquiry/reply.ts` | Templates auto-réponse `class`/`scooter`, tirés de `site.ts`. | à créer (optionnel, inline OK) |
| `src/config/site.ts` | Source des prix (lecture seule) : `pricing.groupAdults`, `scooterFleet`. | inchangé |

Champs reçus (noms réels du form) : toujours `intent · name · email · phone · message · consent · lang · botcheck` ;
selon intent : `cls_date cls_level` · `stay_arrival stay_duration stay_people stay_acc stay_scoot` ·
`sct_from sct_to sct_model` · `dtv_package`. (Les champs des intents inactifs sont `disabled` au submit
→ absents de la copie. Propre.)

---

## Le build, dans l'ordre

### 1. Env + bot Telegram (avant de coder)
- [ ] BotFather → `/newbot` → récupérer `TELEGRAM_BOT_TOKEN`.
- [ ] Créer le groupe Telegram, y ajouter le bot + Meaw. Envoyer un message dans le groupe, puis
      `https://api.telegram.org/bot<TOKEN>/getUpdates` → lire `chat.id` (négatif pour un groupe) = `TELEGRAM_CHAT_ID`.
- [ ] Resend : vérifier le domaine `wildcatmuaythai.com` (SPF + DKIM), récupérer `RESEND_API_KEY`.
- [ ] Mistral : clé **payante**.
- [ ] Poser les 4 variables dans Vercel (Production + Preview).

### 2. La route `src/pages/api/inquiry.ts`

```ts
import type { APIRoute } from 'astro';
import { site } from '../../config/site';

export const prerender = false; // ← bascule cette route en serverless (le reste reste SSG)

const AUTO = new Set(['class', 'scooter']); // seuls intents à réponse déterministe

export const POST: APIRoute = async ({ request }) => {
  // La réponse est ignorée (fetch keepalive côté client). On fait le travail
  // AVANT de répondre pour que Vercel ne gèle pas la fonction.
  try {
    const form = await request.formData();
    const get = (k: string) => String(form.get(k) ?? '').trim();

    // 1. honeypot — présent seulement si coché (bot). Drop silencieux.
    if (form.get('botcheck')) return new Response(null, { status: 204 });

    const intent = get('intent') || 'general';
    const message = get('message');

    if (AUTO.has(intent)) {
      // 2. auto-réponse client (Resend) + résumé équipe (Telegram). Zéro IA.
      await autoReply(intent, get('email'), get('name'), get('lang') || 'en');
      await notify(summaryFor(intent, form)); // résumé sans coordonnées
    } else if (intent === 'stay' || intent === 'dtv') {
      // 3. humain : notif Telegram seule.
      await notify(summaryFor(intent, form));
    } else {
      // 4. general : le SEUL cas LLM. PII redactée, jamais d'auto-réponse.
      const clas = await classify(redact(message)); // {category, summary, urgent} | null
      await notify(
        clas
          ? `📥 general · ${clas.category}${clas.urgent ? ' · ⚠️ urgent' : ''}\n${clas.summary}`
          : `📥 general · non classé\n${message.slice(0, 400)}`,
      );
    }
  } catch {
    /* jamais bloquant : le mail Web3Forms reste la voie de secours */
  }
  return new Response(null, { status: 204 });
};
```

- [x] Créer le fichier avec le squelette ci-dessus.
- [x] `summaryFor(intent, form)` = résumé lisible depuis les champs de l'intent. ⚠️ **Décision
      renversée** : coordonnées (name/email/phone) **incluses** (Meaw ne lit pas le mail) + message
      complet + `detailsFor()` pour les champs par intent.

### 3. Le branchement dans `src/scripts/wa-form.ts` (la seule édition)

Juste après le bloc `fetch(form.action, …)` existant (l'email Web3Forms), ajouter :

```ts
// copie fire-and-forget vers le routeur interne (Telegram + auto-réponse).
// keepalive → survit à toute navigation ; échec silencieux → le POST natif reste la vérité.
fetch('/api/inquiry', { method: 'POST', body: new FormData(form), keepalive: true }).catch(() => {});
```

- [x] Ajouter ces lignes. **Ne toucher à rien d'autre** dans ce fichier.
- [ ] À dire à l'écran : un visiteur sans JS n'a pas de notif — il a toujours son mail. Dégradation OK.

### 4. Telegram — `notify(text)`

```ts
async function notify(text: string): Promise<void> {
  const token = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chat = import.meta.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
  }).catch(() => {});
}
```

- [x] Implémenter (inline dans la route — choix « tout dans un fichier »).

### 5. Auto-réponse Resend — `autoReply(intent, email, name, lang)`

Templates courts, factuels, tirés de `site.ts` (jamais de prix en dur → une seule source) :
- `class` → tarifs `site.pricing.groupAdults` : drop-in **350 THB**, 10 séances **3000**, mois illimité
  **5000**, semaine illimitée **2000** ; horaires + « viens, pas besoin de réserver » + Meaw revient vers toi.
- `scooter` → `site.scooterFleet` : Scoopy **350/j · 3000/mois**. ⚠️ Honda Click a ses prix à `null` →
  **ne pas afficher un prix nul**, écrire « dispo sur demande » pour ce modèle.

```ts
async function autoReply(intent: string, email: string, name: string, lang: string): Promise<void> {
  const key = import.meta.env.RESEND_API_KEY;
  if (!key || !email) return;
  const { subject, html } = replyTemplate(intent, name, lang); // depuis site.ts
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: 'Wildcat Muay Thai <hello@wildcatmuaythai.com>',
      to: email,
      reply_to: 'MEAW_EMAIL_ICI', // les réponses du client atterrissent chez Meaw
      subject,
      html,
    }),
  }).catch(() => {});
}
```

- [x] Écrire `replyTemplate(intent, name, lang)` (EN + FR ; le form envoie `lang`). `class` inclut
      aussi les horaires réels (`site.schedule.group`), pas que les prix.
- [ ] Remplacer `REPLY_TO` (const en tête) par l'adresse réelle de Meaw. **Générique en attendant.**
- [x] Ton : accusé + info utile + « on revient vers toi ». **Ne prétend pas** clôturer la vente.

### 6. Classification Mistral — `classify(text)` + `redact(text)`

```ts
function redact(text: string): string {
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[email]')          // emails inline
    .replace(/(\+?\d[\d\s().-]{7,}\d)/g, '[phone]');          // numéros inline
}

async function classify(text: string): Promise<{ category: string; summary: string; urgent: boolean } | null> {
  const key = import.meta.env.MISTRAL_API_KEY;
  if (!key) return null;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 2000); // timeout 2 s → sinon on notifie « non classé »
  try {
    const r = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      signal: ctrl.signal,
      body: JSON.stringify({
        model: 'mistral-small-latest',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'Classe ce message de contact. Réponds en JSON: {"category": one of ["prospect","partenariat","presse","démarchage","autre"], "summary": string (1 ligne FR), "urgent": boolean (date proche mentionnée)}.' },
          { role: 'user', content: text },
        ],
      }),
    });
    const j = await r.json();
    return JSON.parse(j.choices?.[0]?.message?.content ?? 'null');
  } catch {
    return null; // timeout ou erreur → l'appelant notifie « non classé »
  } finally {
    clearTimeout(t);
  }
}
```

- [x] Implémenter `redact` + `classify`.
- [x] Le prompt ne reçoit **que** le message redacté — jamais name/email/phone.

---

## À préparer avant la capture (checklist tournage)
- [ ] Bot Telegram créé + groupe commun + `TELEGRAM_CHAT_ID` récupéré
- [ ] Domaine `wildcatmuaythai.com` vérifié dans Resend (SPF/DKIM)
- [ ] `RESEND_API_KEY` · `MISTRAL_API_KEY` (payant) posés sur Vercel
- [ ] Deux soumissions de test écrites d'avance pour le Beat 6 (preuve) :
      un `class` (auto-réponse en direct) + un démarchage `general` (classé, notif seule)
- [ ] OK Meaw : elle a Telegram, elle est dans le groupe
- [ ] `MEAW_EMAIL` (reply_to) confirmé

## Pièges / limites (à assumer à l'écran)
- **Pas de déduplication** : un double submit = deux notifications / deux auto-réponses. Connu, hors V1.
- **La classif `general` se trompera** — elle ne fait que *notifier*, jamais supprimer ni répondre.
- **Honda Click sans prix** dans `site.ts` (`null`) : le template scooter doit dire « sur demande »,
  pas afficher un prix vide.
- **`prerender = false` obligatoire** sur la route, sinon Astro tente de la pré-rendre au build (échec/404).
- **Clés sans `PUBLIC_`** : si tu les préfixes par erreur, elles fuient dans le bundle client.
- **Rien ne répond à la place de l'humain.** L'objectif unique : réduire le délai avant qu'un humain sache.

## Vérif
- [x] `npm run build` vert (la route serverless ne casse pas le SSG).
- [x] Submit `class`/`scooter`/`stay`/`dtv`/`general` en local (curl + Origin) → tous 204, timings
      cohérents par branche. Vérif visuelle du groupe Telegram par Jonathan (5 messages exhaustifs).
- [x] `general` (démarchage) → notif taguée Mistral, **aucune** auto-réponse.
- [ ] Submit réel en prod (Vercel) une fois les 4 vars posées + domaine Resend vérifié.
- [ ] JS coupé → email Web3Forms arrive toujours, pas de notif (dégradation attendue).

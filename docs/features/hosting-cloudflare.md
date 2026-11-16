# Hébergement Cloudflare Workers

> **Statut** : DONE (bascule en prod 2026-11-16) · **Livré** : 2026-11-16 · **Commits** : `3368ccf`, `ad299db`, `b3994e0` (base `a8a5409`)
> Reste ouvert : redirection www → apex, `APIFY_TOKEN`, ménage Vercel (voir Limites).

## Ce que ça fait
Le site wildcatmuaythai.com est servi par un Worker Cloudflare `wildcat` (compte de Jon) au lieu de Vercel. Le site reste statique (SSG) ; seule `/api/inquiry` (routeur d'intake, voir [contact-intake-router.md](contact-intake-router.md)) s'exécute sur le Worker. Les visiteurs ne voient aucun changement ; Jon gère l'hébergement et le DNS dans Cloudflare.

## Comment ça marche
```
push main ─► Workers Builds (npm run build ; npx wrangler deploy)
                │ build en Node : prérendu Astro, feed Instagram (Apify), sharp (images)
                ▼
          dist/client (assets statiques, binding ASSETS) + dist/server (Worker)
                ▼
 wildcatmuaythai.com / www.…  ─► Worker `wildcat`
      ├─ chemin = asset ─► servi tel quel (html_handling drop-trailing-slash : /en/ ─► /en en 307)
      └─ POST /api/inquiry ─► code Worker (nodejs_compat, secrets via process.env)
                                  ─► Telegram / Resend / OpenRouter
```
- Adaptateur : `@astrojs/cloudflare` ^13.7.0 (remplace `@astrojs/vercel`), `wrangler` en devDependency. `astro.config.mjs` : `cloudflare({ prerenderEnvironment: 'node', imageService: 'compile' })` : prérendu, feed Instagram et sharp tournent au build en Node, comme sur Vercel.
- `wrangler.jsonc` : Worker `wildcat`, `nodejs_compat`, assets avec `html_handling: "drop-trailing-slash"` (équivalent de la règle `trailingSlash: 'never'` que Vercel appliquait), observability activée.
- `src/pages/api/inquiry.ts` : les secrets restent lus par `process.env.X ?? import.meta.env.X` ; la classification des demandes `general` passe de Mistral direct à **OpenRouter** (`https://openrouter.ai/api/v1/chat/completions`), même modèle `mistralai/mistral-small-3.2-24b-instruct`, clé `OPENROUTER_API_KEY` (remplace `MISTRAL_API_KEY`). Timeout 2 s inchangé.
- Rebuild quotidien (publication des articles programmés) : `.github/workflows/scheduled-rebuild.yml` POST sur un deploy hook Workers Builds ; secret GitHub `DEPLOY_HOOK` (avant : `VERCEL_DEPLOY_HOOK`).

## Carte du code
> Mise à jour : 2026-11-16

| Fichier | Rôle |
|---|---|
| `wrangler.jsonc` | Config du Worker : nom, compat, assets, `html_handling`, observability |
| `astro.config.mjs` | Adaptateur `cloudflare({...})` |
| `package.json` | Dépendances `@astrojs/cloudflare`, `wrangler` ; `allowScripts` (esbuild, sharp, workerd) |
| `src/pages/api/inquiry.ts` | Seule route exécutée sur le Worker ; `classify()` appelle OpenRouter |
| `.github/workflows/scheduled-rebuild.yml` | Rebuild planifié via deploy hook Cloudflare |
| `.env.example` | `OPENROUTER_API_KEY` à la place de `MISTRAL_API_KEY` |
| `CLAUDE.md` | Ligne Hosting et commande build mises à jour |

### Décisions clés
- Cloudflare Workers plutôt que Vercel (détail daté → [DECISIONS.md](DECISIONS.md), 2026-11-16).
- Build en Node (`prerenderEnvironment: 'node'`, `imageService: 'compile'`) : évite de porter le feed Instagram et sharp dans le runtime Worker.
- `html_handling: drop-trailing-slash` : garde la politique `trailingSlash: 'never'` ([trailing-slash-canonical.md](../trailing-slash-canonical.md)).
- OpenRouter au lieu de Mistral direct : même modèle, une seule clé/facturation.

## Comment débuguer
- **Par où entrer** : tableau de bord Cloudflare > Workers > `wildcat` (Builds pour le build, Observability/logs pour `/api/inquiry`). En local : `npm run build` puis `npx wrangler dev`.
- **Ce qu'on observe** : historique Workers Builds ; logs du Worker (observability activée) ; `curl -sI https://wildcatmuaythai.com/en/` (attendu 307 vers `/en`) ; run GitHub Actions « Scheduled rebuild » (réponse HTTP du hook).
- **Pannes connues** :
  - `/api/inquiry` répond 204 mais rien dans Telegram/Resend → secret Worker absent (les helpers s'auto-désactivent sans clé) → `npx wrangler secret put <NOM>`.
  - Instagram en placeholders → `APIFY_TOKEN` pas posé dans les variables de build.
  - Rebuild planifié sans effet → secret GitHub `DEPLOY_HOOK` absent (le workflow sort en warning, exit 0).
- **Pièges** :
  - Secrets runtime (Telegram, Resend, OpenRouter) = `wrangler secret` sur le Worker ; variables de build (`NODE_VERSION=24`, `PUBLIC_WEB3FORMS_KEY`, `PUBLIC_SITE_URL`, `APIFY_TOKEN`) = réglages Workers Builds. Les deux listes sont distinctes.
  - `PUBLIC_*` sont inlinées au build : les changer exige un nouveau build.
  - `/en/` → `/en` est en 307 (Vercel : 308) ; sans conséquence SEO attendue, à surveiller.
  - www sert le site en 200 tant que la Redirect Rule www → apex n'existe pas : duplicate content possible (les canonical pointent vers l'apex).
- **Retour arrière** : détacher `wildcatmuaythai.com` et `www.` du Worker, recréer les anciens enregistrements DNS : A apex → `216.150.1.1` (Vercel), CNAME `www` → vercel-dns. Copie des enregistrements d'avant bascule sur le VPS jonlabs : `~/.config/cloudflare/wildcat-dns-before-cutover.txt`. Le projet Vercel existe encore (ménage non fait), mais il ne se redéploie plus depuis ce code (adaptateur retiré) : un retour arrière DNS sert l'ancien déploiement figé.

## Configuration
- **Secrets runtime Worker** (`wrangler secret`) : `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (bot/groupe de l'assistant wildcat), `RESEND_API_KEY`, `OPENROUTER_API_KEY`.
- **Variables de build (Workers Builds, branche `main`)** : `NODE_VERSION=24`, `PUBLIC_WEB3FORMS_KEY`, `PUBLIC_SITE_URL`. `APIFY_TOKEN` : pas encore posé.
- Build `npm run build`, deploy `npx wrangler deploy`.
- **GitHub Actions** : secret `DEPLOY_HOOK` (deploy hook Workers Builds, branche `main` ; copie privée sur le VPS jonlabs `~/.config/cloudflare/wildcat-deploy-hook`).
- Non reprises depuis Vercel : `OWNER_WHATSAPP_NUMBER` (non lue par le code), `PUBLIC_SANITY_*` (fallback dans le code). Les variables Vercel étaient de type sensitive (illisibles), donc recréées à la main.
- Aucune migration, aucun cron côté Cloudflare (le cron est GitHub Actions).

## Tests et vérifications
| Vérif | Commande | Résultat réel |
|---|---|---|
| Codes HTTP identiques à Vercel sur 13 URL | curl comparatif | OK (rapporté, non relancé) |
| Origin check (`checkOrigin`) de `/api/inquiry` | requête cross-origin | identique à Vercel (rapporté, non relancé) |
| `/en/` | `curl -sI` | 307 vers `/en` au lieu de 308 (écart connu) |
| www → apex | `curl -sI https://www.wildcatmuaythai.com/` | 200, pas de redirection (à créer) |

## Limites et dettes
- **Redirection www → apex à créer** (Redirect Rule Cloudflare, par Jon).
- **`APIFY_TOKEN` à poser** : flux Instagram en placeholders d'ici là.
- **Ménage Vercel pas fait** : projet, domaine, connexion Git.
- 307 au lieu de 308 sur `/x/` → `/x` (limite de `html_handling`).
- Le commentaire de `wrangler.jsonc` dit « 307/308 » ; en pratique 307.
- Docs historiques qui citent encore Vercel/Mistral (état d'origine) : `contact-intake-router.md`, `E10-deploy.md`, `PRD.md`, `trailing-slash-canonical.md` (bandeau ajouté).
- Commentaires de code périmés (non corrigés, hors docs) : en-tête de `scheduled-rebuild.yml` (« aucune fonction serverless… ») et mention « site SSG » dans `inquiry.ts`.

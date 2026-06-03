# DECISIONS — Log des décisions techniques

Format : `Date | Décision | Contexte | Alternatives considérées`

---

### 2026-06-03 | Icônes : Tabler (set unique via astro-icon)
- **Contexte** : besoin d'icônes UI + logos réseaux cohérents sur tout le site (nav, DTV, contact, fighters…). Volonté d'**une seule lib** pour la cohérence.
- **Choix** : **Tabler** via `astro-icon` + `@iconify-json/tabler` — couvre 55/55 besoins du PRD (UI + `brand-*` réseaux + `karate`/`motorbike`), style ligne identique au sprite d'origine. Tailles via tokens `--icon-*`. Custom hors-lib : swoosh (`ArrowWild`), tigre, DTV stamp, ◆. Drapeaux fighters = texte pour l'instant.
- **Alternatives** : Lucide (exclut les logos de marque → forcerait Simple Icons en 2ᵉ lib) ; Phosphor (plus rond) ; multi-lib via Iconify (rejeté pour la cohérence).

### 2026-06-03 | Framework : Astro 6 (révision du PRD qui disait "Astro 5")
- **Contexte** : site vitrine SEO-first, multi-langue, peu d'interactivité lourde. Besoin de SSG + quelques routes on-demand (API DTV).
- **Alternatives** : Next.js (overkill), SvelteKit, 11ty ; Astro 5 (majeure précédente).
- **Choix** : **Astro 6** — `create-astro` scaffolde la dernière stable (^6.4.x). Pour un greenfield démarré aujourd'hui, partir sur l'ancienne majeure (5) n'a pas de sens. La doc Tailwind v4 (`@tailwindcss/vite`) et i18n routing que j'ai vérifiée cible v6. Le PRD mentionnait "Astro 5" par anticipation — révisé ici. i18n natif, SEO/perf, islands inchangés.

### 2026-06-03 | CMS : Sanity v3
- **Contexte** : l'owner doit gérer contenu (coaches, blog, horaires, témoignages) sans toucher au code. i18n nécessaire.
- **Alternatives** : Contentful, Storyblok, Markdown/Astro Content Collections.
- **Choix** : Sanity v3 — déjà connu, API flexible, i18n. Content Collections envisageables pour le contenu très statique.

### 2026-06-03 | Styling : Tailwind v4 + tokens CSS
- **Contexte** : design system précis fourni (maquettes). Cohérence couleur/typo critique.
- **Choix** : Tailwind v4 mappé sur des variables CSS issues de `landing.css`. Single source of truth = tokens.

### 2026-06-03 | Direction visuelle : palette "Tropical Garden" (Direction B)
- **Contexte** : le brand board explorait 3 directions (A Golden Hour / B Tropical Garden / C Ring Side). La landing de prod (`landing.css`) verrouille la palette verte forêt + gold + cream (Direction B).
- **Choix** : palette Tropical Garden verrouillée. Câblée en tokens (`src/styles/tokens.css`).

### 2026-06-03 | Typographie : Satoshi + Fraunces (remplace Bricolage + Literata)
- **Contexte** : E1 avait posé Bricolage Grotesque + Literata (issus de `landing.css`) en placeholder. Jonathan a tranché une autre direction typo, avec un lockup signature (*come for the fight / stay for the family*).
- **Choix** : **Satoshi** Bold (titres) + Satoshi (corps) ; **Fraunces 72pt SemiBold Italic** (accents en or). Satoshi n'étant ni sur Google Fonts ni Fontsource, il est **self-hosté depuis Fontshare** (licence gratuite usage commercial) dans `public/fonts/satoshi/`. Fraunces via `@fontsource-variable/fraunces` (axe opsz + italic). Système détaillé dans `docs/DESIGN.md`, rendu sur `/styleguide`.
- **Alternatives** : garder Bricolage/Literata ; Hanken Grotesk (Fontsource, zéro self-host) — écartées au profit du choix explicite de Jonathan.

### 2026-06-03 | i18n : Astro i18n natif (routing) + Paraglide JS 2.x (messages)
- **Contexte** : E3 — extraire toutes les strings UI en dur (Nav ~115, Footer, home, FileUpload) avec type-safety et scalabilité V1.1 (TH/DE/ES/RU + pipeline DeepL).
- **Choix** : **Astro i18n natif** garde le routing (`/en` `/fr`, hreflang, sitemap) ; **Paraglide JS 2.x** compile `messages/{locale}.json` en fonctions typées `m.*()` (clé inexistante = erreur build, tree-shaking, zéro runtime client). En SSG la locale est posée par `src/middleware.ts` → `setLocale(assertIsLocale(context.currentLocale))` (pattern SSG officiel). **Piège résolu** : la strategy doit inclure `globalVariable` (`['url','globalVariable','baseLocale']`) — côté serveur `url` est ignorée (pas de `window`), c'est la variable globale écrite par `setLocale` qui porte la locale au build.
- **Conventions** : source éditoriale = `messages/` (versionné) ; `src/paraglide/` = output compilé (gitignored, régénéré au build) ; clés snake_case préfixées par domaine (`nav_*`, `footer_*`, `home_*`, `cta_*`, `site_*`, `form_*`, `meta_*`) ; **jamais d'accès dynamique** `m['…']` → records explicites pour les listes ; FR = tutoiement ; marque "Wildcat" et badge DTV/Visa jamais traduits.
- **Alternatives** : JSON maison + helper `t()` (zéro dep mais typage/parité à maintenir à la main, faible scalabilité V1.1) ; `paraglideMiddleware` ALS (pensé pour `output: server`, inutile/fragile en SSG) ; `{ locale }` explicite à chaque appel (~200 call sites, trop verbeux).
- **Limite connue** : clé FR manquante = fallback EN **silencieux** (build vert ≠ FR complet) → vérifier la parité des sets de clés à chaque ajout.

### 2026-06-03 | E4 — Studio Sanity embarqué (/studio) + i18n CMS mixte
- **Contexte** : E4 — brancher Sanity sur le site Astro 6 SSG (adapter Vercel), studio gérable par l'owner, i18n EN/FR cohérente avec Paraglide. Le projet sanity.io n'existait pas encore au moment de l'init.
- **Choix** :
  - **Studio embarqué** via `@sanity/astro` (`studioBasePath: '/studio'`) plutôt que repo séparé — un seul deploy, une seule URL. En SSG le studio est une page statique unique en **hash router** (`/studio#/...`) : pas de SSR requis. React (`@astrojs/react`) installé **pour le studio uniquement** — zéro island React sur le site public.
  - **i18n CMS mixte** (conforme PLAN.md) : **document-level** pour `blogPost` (plugin `@sanity/document-internationalization`, un document par langue → **slugs traduits gratuits, Q6 réglée**) ; **field-level** pour `coach`/`fighter`/`testimonial`/`trainingSchedule`/`category` (objets `localeString`/`localeText` `{en, fr}`, résolus côté front par `pickLocale()` avec fallback EN — même politique que Paraglide).
  - **Client** : `sanity:client` fourni par l'intégration (pas de `@sanity/client` direct) + `useCdn: false` (SSG = contenu frais au build). Requêtes GROQ en `defineQuery` (package `groq`) → types de résultats générés par `sanity typegen` (`npm run sanity:types`, 100 % local, aucun login). `src/lib/sanity.types.ts` committé.
  - **Placeholder projectId** : `PUBLIC_SANITY_PROJECT_ID` lu via `loadEnv` avec fallback `'placeholder'` — le build du site passe sans projet réel (aucune page ne consomme Sanity en E4) ; le studio monte mais ne se connecte pas tant que `.env` n'est pas rempli.
- **Pièges notés** : `sanity.config.ts` est **bundlé côté navigateur** (le studio est une island React) → **jamais de `process.env` dedans** (`ReferenceError: process is not defined` à l'hydratation) ; on utilise `import.meta.env.PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET` (préfixe `PUBLIC_` requis pour l'exposition client — pas des secrets ; `SANITY_TOKEN` reste sans préfixe), avec fallback `process.env` guardé (`typeof process !== 'undefined'`) pour les contextes Node (sanity CLI). `basePath` dans `sanity.config.ts` est ignoré par l'intégration (warning) → seul `studioBasePath` d'astro.config.mjs compte. Ne pas dupliquer le champ `language` de blogPost (posé par le plugin) ; studio exclu du sitemap (`filter`) + `Disallow: /studio` dans robots.txt (header `X-Robots-Tag: noindex` à ajouter en E10 côté Vercel) ; la config typegen vit dans `sanity.cli.ts` (clé `typegen`), le fichier séparé `sanity-typegen.json` est déprécié.
- **Alternatives** : studio repo séparé / dossier séparé sur son propre port (2 deploys, déconnecté du site) ; field-level partout (slugs non traduits) ; document-level partout (lourd pour coachs/témoignages).

### 2026-06-03 | Communication DTV : WhatsApp deep link
- **Contexte** : l'owner travaille déjà sur WhatsApp. Zéro friction souhaitée.
- **Choix** : `wa.me` avec message pré-rempli (nom + réf dossier) à la soumission du formulaire, plutôt qu'une intégration API WhatsApp Business.

---

### 2026-06-03 | Q2 — Langues V1 : EN + FR seulement
- Conforme à la maquette. Lancement rapide, i18n simple. TH/DE/ES/RU repoussés en V1.1 (DeepL + review).

### 2026-06-03 | Q3 — Personnes : Coaches **ET** Fighters
- Schéma `coach` (équipe Kru, ambiance familiale, maquette) + schéma `fighter` (livre d'or palmarès, PRD). Les deux coexistent.

### 2026-06-03 | Q4 — Pricing : prix publics
- Drop-in 350 / Monthly 3500 / Long Stay dès 2800 THB. Transparence + conversion. Éditables via Sanity.

## Décisions EN ATTENTE (questions ouvertes restantes)

| # | Sujet | Options | Impact |
|---|-------|---------|--------|
| Q1 | **Storage DTV** | Google Drive API ⟷ Supabase Storage | ⏳ **Tranché avant E6.** On construit E1→E5 d'abord. |
| Q5 | **Domaine** | wildcatmuaythai.com (maquette) ⟷ wildcatchiangmai.com (PRD) | hreflang, sitemap, env (avant E10) |
| ~~Q6~~ | ~~Slugs traduits~~ | **RÉGLÉE (E4)** : blogPost en document-level i18n → un slug par langue, traduits gratuitement par document. | — |

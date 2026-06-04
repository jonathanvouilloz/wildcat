# CLAUDE.md — Wildcat Muay Thai Chiang Mai

## Résumé du projet

Site vitrine SEO multi-langue (Astro 6 + Sanity CMS) pour **Wildcat Muay Thai**, un camp de Muay Thai familial et open-air à Chiang Mai. Objectif : capter des clients étrangers via le SEO global/local et professionnaliser la gestion des visas DTV grâce à une mini-app de dépôt de dossier intégrée (formulaire multi-étapes + upload documents + WhatsApp + email). Positionnement de marque : chaleureux, accueillant, familial — **pas** un fight camp hardcore.

## Stack technique

| Couche | Choix |
|--------|-------|
| Framework | Astro 6 (latest stable ; SSG + routes on-demand, i18n natif) |
| Styling | Tailwind CSS v4 |
| CMS | Sanity v3 (headless) |
| i18n | Astro i18n natif (routing) + Paraglide JS 2.x (messages typés) — EN/FR en V1 |
| Email | Resend |
| Storage DTV | À valider — Google Drive API **ou** Supabase Storage |
| Comm DTV | WhatsApp deep link (`wa.me`) |
| Traduction auto | DeepL API (pour langues secondaires éventuelles) |
| Hosting | Vercel |

## Commandes utiles

```bash
npm install            # dépendances
npm run dev            # serveur dev (localhost:4321) — studio sur /studio
npm run build          # build production (→ dist/ + .vercel/output)
npm run preview        # preview du build
npm run sanity:types   # extract schéma + typegen → src/lib/sanity.types.ts (100% local)
```

## Conventions de code

- **Commits** : Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`) avec scope. Ex : `feat(dtv): add multi-step form stepper`.
- **Composants** : Astro components (`.astro`) en `PascalCase`, îlots interactifs minimalistes (vanilla JS ou framework léger seulement si nécessaire).
- **Styles** : design tokens en variables CSS (voir `docs/STYLEGUIDE.md`), Tailwind v4 mappé sur ces tokens. Pas de couleurs en dur.
- **i18n** : aucune string en dur dans les composants — tout passe par les messages de traduction.
- Détails complets dans `docs/STYLEGUIDE.md`.

## Pointeurs de contexte

| Fichier | Contenu |
|---------|---------|
| `docs/PRD.md` | Product Requirements complet (vision, scope, data model, SEO, sécurité) |
| `docs/PLAN.md` | Plan d'exécution maître (epics + statuts) |
| `docs/DESIGN.md` | **Système design complet** (essence, voix, couleurs, typo Satoshi/Fraunces, motifs, composants) |
| `/styleguide` | Page live interne (noindex) — référence visuelle vivante |
| `docs/STYLEGUIDE.md` | Conventions de **code** (pointe vers DESIGN.md pour le visuel) |
| `docs/DECISIONS.md` | Log des décisions techniques |
| `docs/features/*.md` | Détail par feature/epic |
| `wildcat/project/` | **Bundle Claude Design** — maquettes HTML/CSS de référence (à recréer pixel-perfect) |
| `wildcat/project/Wildcat Landing.html` + `landing.css` | Direction visuelle **verrouillée** (page d'accueil de prod) |
| `wildcat/project/Wildcat Mega Menu.html` + `meganav.css` | Architecture de navigation + silos SEO |
| `wildcat/project/Wildcat Brand Board.html` | 3 directions explorées (contexte, A/B/C) |

## Design — direction verrouillée

Palette **"Tropical Garden"** (Direction B) + typo Satoshi / Fraunces :
- **Couleurs** : échelle verte `forest-light #3B6645` / `forest #2E5D3C` / `forest-deep #21422C` ; gold `#E0A62B` (gold-deep `#C98A12`) ; cream `#F6F1E6` ; orange/terracotta `#D97732` ; charcoal `#111`.
- **Typo** : **Satoshi** Bold (titres `.display/.h1/.h2/.h3`) + Satoshi (corps) ; **Fraunces 72pt SemiBold Italic** (accents or, classe `.em`). Lockup signature : *Come for the fight / Stay for the family*.
- **Icônes** : set unique **Tabler** via `astro-icon` (`<Icon name="tabler:..." />`) + logos `tabler:brand-*`. Custom : swoosh (`ArrowWild`), tigre, DTV stamp, ◆.
- **Marque** : toujours **Wildcat** (jamais de C majuscule).
- **Vibe** : open-air, golden hour, garden & pool. Photographie candide et dorée, jamais "warrior gym" sombre/agressif.
- **Source de vérité design : `docs/DESIGN.md` + page live `/styleguide`.** Tokens : `src/styles/tokens.css`. Conventions code : `docs/STYLEGUIDE.md`.

## État actuel

**Phase : E1→E5 complets + satellites DTV (E5b) + silo Train (E5c). Prochain : contenu studio, vérif faits [À VÉRIFIER] (DTV + Train), puis E6 (DTV app) ou satellites Stay & Train.**

- [x] PRD lu et analysé · bundle de design analysé · docs projet créés
- [x] Décisions tranchées : langues **EN+FR** (V1), **Coaches + Fighters**, **prix publics**, **Astro 6**, **icônes Tabler**, **marque Wildcat**
- [x] **E1 — Scaffold** Astro 6 + Tailwind v4 : tokens, i18n EN/FR (`/en` `/fr`), adapter Vercel + sitemap, assets
- [x] **Design system** : palette verte 3 tons + gold/cream/charcoal/orange ; typo Satoshi + Fraunces + titres canoniques `.display/.h1/.h2/.h3` ; **boutons** (gold/forest/outline/link + flat + swoosh `ArrowWild`) ; **nav/mega menu** + drawer + utility bar ; **icônes Tabler** (`astro-icon`) ; focus-visible + reduced-motion ; `docs/DESIGN.md` + `/styleguide`
- [x] **E2 — App shell & design-system completion** : couleurs sémantiques (`--success/--warning/--error` harmonisées) ; `BaseLayout` complet (OG/Twitter, slot `jsonld`, preload satoshi-700, Nav+Footer) ; **`Footer`** 4 colonnes ; primitives **`Container`/`Section`** (+ `--gutter`/`--section-y`/`--maxw-narrow`) ; **système de formulaire** (`.wc-control` + `Field/Input/Textarea/Select/Checkbox/FileUpload`) ; **`Card`** de base ; **`src/config/site.ts`** = source unique contenu transverse (contact réel, Instagram/Facebook réels, **pricing THB réel** ; email + horaires `TODO(real data)`). `npm run build` ✅
- [x] **E3 — i18n** : **Paraglide JS 2.x** (plugin Vite, strategy `url > globalVariable > baseLocale`, middleware SSG `setLocale`) ; source `messages/{en,fr}.json` (**144 clés, parité vérifiée**), output `src/paraglide/` gitignored ; **zéro string UI en dur** (Nav ~115 clés, Footer, BaseLayout, home, FileUpload) ; `site.ts` = données brutes only (listes à clés `dayKey`/`key` mappées par records explicites) ; **`LangSwitcher`** (préserve le path, aria-current, zéro JS) ; conventions dans `docs/STYLEGUIDE.md` ; décision + pièges dans `docs/DECISIONS.md`. `npm run build` ✅ (`/fr` rend FR, `/en` rend EN, bundle client inchangé)
- [x] **E4 — Sanity** : **studio embarqué `/studio`** (`@sanity/astro`, hash router en SSG, React pour le studio only) ; **6 schémas** (`sanity/schemaTypes/` : coach, fighter, blogPost, trainingSchedule, testimonial, category) + objets **`localeString`/`localeText`** (field-level {en, fr}) ; **blogPost en document-level** (`@sanity/document-internationalization` → slugs traduits, **Q6 réglée**) ; client `src/lib/sanity.ts` (`sanity:client`, `useCdn:false`) + `image.ts` (`urlFor`) + `i18n-content.ts` (`pickLocale`) + `queries.ts` (GROQ `defineQuery`) ; **typegen** `npm run sanity:types` (local, sans login) → `sanity.types.ts` committé ; robots.txt `Disallow: /studio` + sitemap filter. **Projet `etmrqgb2`** créé, dataset `production` public, CORS localhost OK, studio vérifié (login screen, zéro erreur d'hydratation). ⚠️ Env : **`PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET`** — `sanity.config.ts` est bundlé client, jamais de `process.env` dedans. `npm run build` ✅
- [x] **E5 — Pages cœur (prioritaires)** : **7 pages EN+FR** — Home (port fidèle de `Wildcat Landing.html` sur le thème, **zéro import de landing.css**), `/dtv-visa` (pillar, JSON-LD FAQPage, #eligibility #faq), `/stay-train` (cross-sell DTV), `/classes` (#schedule #pricing, **prix publics complets**), `/fighters` (CMS-only, coming soon si vide), `/about` (#coaches), `/contact` + **`/api/contact`** (seule route on-demand : `prerender=false`, fetch REST Resend gardé par `RESEND_API_KEY`, honeypot). ~20 composants sections build-as-you-go (Hero, PageHero, DtvTeaser/Steps/Stamp, Program/Coach/Fighter/Pricing cards, ScheduleTable, TestimonialQuote, Faq `<details>`, CtaBanner, Breadcrumb, FeatureGrid, ContactForm…). **`safeQuery`** (`src/lib/content.ts`) + fallbacks messages → build vert dataset vide ; `localePath()` (`src/lib/routes.ts`) pour tous les liens (slugs EN dans toutes les locales). Nav/Footer re-pointés (clusters → pillar+anchor, zéro 404 ; Blog `#` jusqu'à E8). **466 clés messages, parité EN/FR vérifiée.** JSON-LD : SportsClub (home), FAQPage (dtv), BreadcrumbList. `npm run build` ✅
- [x] **E5b — Satellites DTV (2026-06-04, branche `feat/dtv-satellites`)** : **5 pages EN+FR data-driven** — recherche **DataForSEO** (EN/US, `.seo-data/keywords-*.json`) + **scans SERP** (×5 sub-agents, `.seo-data/serp-*.json`) + **briefs Module C YMYL** (`content/_drafts/pages/`) → `/dtv-visa/eligibility` (+**DtvQuiz** 6 Q → 3 verdicts), `/dtv-visa/how-to-apply` (+**DocChecklist** localStorage, **HowTo JSON-LD** 7 steps), `/dtv-visa/muay-thai` (table **DTV vs ED vs Tourist**, kw "muay thai visa" diff 0), `/dtv-visa/long-stay-training` (+**BudgetEstimator** prix `site.ts`), `/dtv-visa/faq` (30 Q / 7 thèmes +**FaqSearch**, **FAQPage JSON-LD déplacé du pillar** — 1 seul par silo). Interactifs : `src/components/interactive/`, **vanilla `<script>` IIFE + `data-*`** (pattern Nav), zéro island, progressive enhancement, a11y (aria-live, reduced-motion). Contexte SEO créé : **`docs/identity.md` + `docs/voice.md` + `docs/seo-context.md`** (auteur E-E-A-T : **Meaw Boonpradub**, owner). **1029 clés messages (parité OK)**, Nav/drawer/pillar remaillés (zéro ancre), tests **Playwright 26/26** (`tests/e2e-interactives.py`). `npm run build` ✅
- [x] **E5c — Silo Train (2026-06-04, branche `feat/train-cluster`)** : **architecture data-driven 9 pages → 2** (`docs/structure-train.md`, DataForSEO US/UK/FR ×6 + scans SERP ×2 — women/kids/all-levels/private/schedule/pricing invalidés, 0 volume) → **`/classes/beginners`** créé (kw "beginner muay thai classes" **1000/mo diff 0**, variante A, **byline Meaw + Article JSON-LD**, walkthrough minute-par-minute 5 H3, +**FirstClassChecklist** = `DocChecklist` réutilisé via prop `storageKey`, 106 clés `classes_beg_*`) + **re-cadrage pillar `/classes`** (7 modifs : variante A, cards enrichies + Beginner→satellite/Fight Team→`/fighters`, section `#camp` dark, transparence pricing + liens long-stay, FAQ → 5 PAA SERP — l'ex-FAQ DTV/scooter migrée sans perte). Nav "Beginner" → satellite (seul changement menu) ; maillage home/stay-train/eligibility. Pipeline : 2 sub-agents rédaction parallèles → checkpoint → intégration → reviews. **1165 clés (parité OK)**, `/seo-review` ×2 PASS, **Playwright 51/51**. ⚠️ Insight FR : "camp/stage muay thai thailande" (210+140/mo) → backlog Stay & Train batch 2. `npm run build` ✅
- [ ] Questions ouvertes : **Q1** storage DTV (avant E6), **Q5** domaine. Env prod à poser : `RESEND_API_KEY`, `CONTACT_EMAIL`. Redirect `/muay-thai-training` → `/stay-train` (E7/E10). Faits `[À VÉRIFIER]` avant prod : visa DTV (source officielle) + Train auprès de Meaw (adresse/quartier — `site.ts` dit Hang Dong, angle "proche Old City" invalidé · gants prêtés · âge mini kids).
- [ ] Prochain : saisir le vrai contenu dans le studio (coaches/schedule/testimonials/fighters) ; puis **E6 DTV app** ou satellites Stay & Train (batch 2 + re-ciblage FR "camp/stage")

_Dernière mise à jour : 2026-06-04._

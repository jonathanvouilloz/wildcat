# PLAN — Wildcat Muay Thai

Plan d'exécution maître. Statuts : `TODO` · `EN COURS` · `DONE` · `BLOQUÉ`.

---

## Vue d'ensemble des epics

| # | Epic | Complexité | Statut | Détail |
|---|------|:---:|:---:|--------|
| E1 | Foundation & Setup | M | **DONE** | [E1-foundation.md](features/E1-foundation.md) |
| — | Design system (typo, boutons, nav/mega menu, icônes Tabler) | M | **DONE** | `docs/DESIGN.md` + `/styleguide` |
| E2 | App shell & design-system completion | M | **DONE** | [E2-design-system.md](features/E2-design-system.md) |
| E3 | i18n (EN/FR) | M | **DONE** | [E3-i18n.md](features/E3-i18n.md) |
| E4 | Sanity CMS | M | **DONE** | [E4-sanity-cms.md](features/E4-sanity-cms.md) |
| E5 | Pages cœur & silos SEO | L | **DONE** (pages prioritaires + satellites DTV) | [E5-core-pages.md](features/E5-core-pages.md) |
| E6 | Mini-app DTV | L | TODO | [E6-dtv-app.md](features/E6-dtv-app.md) |
| E7 | SEO technique | M | TODO | [E7-seo-technical.md](features/E7-seo-technical.md) |
| E8 | Blog & contenu | M | TODO | [E8-blog-content.md](features/E8-blog-content.md) |
| E9 | Médias & galerie | S | TODO | [E9-media.md](features/E9-media.md) |
| E10 | Déploiement Vercel | S | TODO | [E10-deploy.md](features/E10-deploy.md) |

---

## Ordre d'exécution proposé

```
E1 Foundation
  └─> E2 Design System ──┐
  └─> E3 i18n            ├─> E5 Pages cœur ──> E7 SEO technique ──> E8 Blog ──> E9 Médias ──> E10 Deploy
  └─> E4 Sanity ─────────┘                └─> E6 DTV app
```

1. **E1 Foundation** — scaffold Astro/Tailwind, tokens, fonts, structure. (socle de tout)
2. **E2 / E3 / E4 en parallèle après E1** — layout+nav, i18n, schémas Sanity.
3. **E5 Pages cœur** — Home → DTV pillar → Stay & Train → Classes → About → Contact.
4. **E6 DTV app** — peut démarrer dès que E5 (page pillar) + storage (Q1) tranchés.
5. **E7 SEO technique** — sitemap, hreflang, schema.org, OG (une fois les pages en place).
6. **E8 Blog** + **E9 Médias** — contenu et galerie.
7. **E10 Deploy** — Vercel + domaine + env de prod.

## Prochaines étapes prioritaires (reprise session suivante)

1. ✅ **E1–E4 faits** : scaffold + design system + app shell + i18n Paraglide + Sanity (studio `/studio`, projet `etmrqgb2`). Détails : entrées précédentes + `docs/DECISIONS.md`.
2. ✅ **E5 (pages prioritaires) fait** — 7 pages EN+FR : **Home** (port fidèle de la maquette landing sur le thème), **/dtv-visa** (pillar + FAQPage JSON-LD), **/stay-train**, **/classes** (#schedule #pricing — prix publics complets), **/fighters** (CMS-only, coming soon si vide), **/about** (#coaches), **/contact** (+ **`/api/contact`** : serverless, fetch→Resend gardé par `RESEND_API_KEY`). ~20 composants sections (Hero, PageHero, ValueStrip, DtvTeaser/Steps/Stamp, Program/Coach/Fighter/Pricing cards+grids, ScheduleTable, TestimonialQuote, Faq, CtaBanner, FeatureGrid, Breadcrumb, ContactForm…). **`safeQuery`** + fallbacks messages → build vert dataset vide. Nav/Footer re-pointés (clusters → pillar+anchor, zéro 404 ; Blog `#` jusqu'à E8). 466 clés messages, parité EN/FR vérifiée. JSON-LD : SportsClub (home), FAQPage (dtv), BreadcrumbList (pages intérieures).
3. ✅ **Satellites DTV (E5b, 2026-06-04, branche `feat/dtv-satellites`)** — 5 pages EN+FR data-driven (DataForSEO + SERP scans + briefs YMYL dans `content/_drafts/pages/`) : eligibility (+quiz), how-to-apply (+checklist docs, HowTo JSON-LD), muay-thai (table DTV vs ED, kw diff 0), long-stay-training (+estimateur budget), faq (30 Q, FAQPage JSON-LD déplacé du pillar). 4 composants interactifs vanilla (`src/components/interactive/`), Nav/pillar remaillés, +563 clés (1029, parité OK), tests Playwright 26/26. Contexte SEO projet créé : `docs/identity.md`, `docs/voice.md`, `docs/seo-context.md` (auteur contenus : Meaw Boonpradub).
4. ✅ **Satellites Train (E5c, 2026-06-04, branche `feat/train-cluster`)** — architecture data-driven 9 pages → 2 (`docs/structure-train.md`, recherche DataForSEO US/UK/FR + 2 scans SERP) : **`/classes/beginners`** créé (kw "beginner muay thai classes" 1000/mo diff 0, variante A, byline Meaw + Article JSON-LD, walkthrough 5 étapes, **FirstClassChecklist** = réutilisation `DocChecklist` via prop `storageKey`) + **re-cadrage pillar `/classes`** (7 modifs : title/meta/H1 variante A, cards enrichies, section `#camp` dark "open-air family camp", transparence pricing 300-700 THB + liens long-stay, FAQ → 5 PAA SERP). Nav "Beginner Muay Thai" → satellite (seul changement menu). Maillage : home, /stay-train, /dtv-visa/eligibility, pillar (card + FAQ). +146 clés (1165, parité OK), `/seo-review` ×2 PASS, Playwright **51/51**. Insight FR "camp/stage muay thai thailande" (210+140/mo) → backlog Stay & Train batch 2 (`structure-train.md` §5). Faits vérifiés (Jonathan, 2026-06-04) : ✅ adresse Nong Kwai/Hang Dong (copy camp ancrée + map embed `/contact`) · ✅ gants+bandes prêtés · ⏳ âge mini kids (~6 ans estimé, à valider — non publié).
5. ✅ **Fighters livre d'or (E5d, 2026-06-04, branche `feat/train-cluster`)** — re-cadrage `/fighters` en **guest book** (guests ayant combattu à Chiang Mai grâce à la famille) : **pas de record W/L** (stat unique = combats pris, victoires = stamps), pas de status current/alumni. Schéma migré (−status/wins/losses/bio/nationality ; +fightName, countryCode, year, venues ×4, quote localeString, **achievements ×10 en checkboxes**), design **polaroid** validé après 4 protos `/styleguide` (F·A passport / **F·B polaroid ⭐** / F·C stadium / F·D ticket) : `FighterCard` réécrit + `AchievementStamp` (CSS fond papier → swap webp encre via `STAMP_ASSETS`, prompts de génération fournis à Jonathan) + `src/lib/guestbook.ts`. Compteur agrégé build-time, grille punaisée, 1179 clés (parité OK), build vert dataset vide. ⏳ Attente : 10 assets stamps (fond blanc) → `public/assets/stamps/`.
6. ▶️ **Prochain** : trancher le **hero home** (4 directions sur `/styleguide`) ; saisir le vrai contenu dans le studio (coaches, schedule, testimonials, fighters) ; **vérifier les faits DTV + Train marqués [À VÉRIFIER] avant mise en prod** ; puis **E6 (DTV app)** — trancher **Q1** storage avant ; ou satellites Stay & Train (batch 2 : /accommodation, /location, /chiang-mai-guide… + re-ciblage FR "camp/stage").
7. Trancher **Q5** (domaine) — placeholder `wildcatmuaythai.com`. Env prod à poser : `RESEND_API_KEY`, `CONTACT_EMAIL` (+ `CONTACT_FROM` après vérif domaine Resend).
8. Données réelles manquantes : email + horaires (`src/config/site.ts` + `nav_util_open_today`) — `TODO(real data)`. Redirect `/muay-thai-training` → `/stay-train` (E7/E10). ~~Pillar FR : title/meta à raccourcir~~ (réglé par le re-cadrage E5c — title 50ch / meta 143ch).

## Build-as-you-go restant (à créer avec leur page)
DTVStepper (E6), TestimonialSlider (si besoin réel — quote statique en E5), liste/article blog + `.prose` (E8), galerie + HeroVideo (E9), composants motifs additionnels (BrushDivider standalone/stripes).

## Pages prioritaires lancement (rappel PRD)

Home · DTV Visa (pillar) · DTV Apply (formulaire) · Stay & Train · Classes · About · Contact.

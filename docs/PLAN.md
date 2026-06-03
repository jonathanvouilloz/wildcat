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
| E5 | Pages cœur & silos SEO | L | **DONE** (pages prioritaires) | [E5-core-pages.md](features/E5-core-pages.md) |
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
3. ▶️ **Prochain** : saisir le vrai contenu dans le studio (coaches, schedule, testimonials, fighters) ; puis **E6 (DTV app)** — trancher **Q1** storage avant ; ou satellites E5 (dtv-visa/eligibility, how-to-apply, classes/*…).
4. Trancher **Q5** (domaine) — placeholder `wildcatmuaythai.com`. Env prod à poser : `RESEND_API_KEY`, `CONTACT_EMAIL` (+ `CONTACT_FROM` après vérif domaine Resend).
5. Données réelles manquantes : email + horaires (`src/config/site.ts` + `nav_util_open_today`) — `TODO(real data)`. Redirect `/muay-thai-training` → `/stay-train` (E7/E10).

## Build-as-you-go restant (à créer avec leur page)
DTVStepper (E6), TestimonialSlider (si besoin réel — quote statique en E5), liste/article blog + `.prose` (E8), galerie + HeroVideo (E9), composants motifs additionnels (BrushDivider standalone/stripes).

## Pages prioritaires lancement (rappel PRD)

Home · DTV Visa (pillar) · DTV Apply (formulaire) · Stay & Train · Classes · About · Contact.

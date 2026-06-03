# PLAN — Wildcat Muay Thai

Plan d'exécution maître. Statuts : `TODO` · `EN COURS` · `DONE` · `BLOQUÉ`.

---

## Vue d'ensemble des epics

| # | Epic | Complexité | Statut | Détail |
|---|------|:---:|:---:|--------|
| E1 | Foundation & Setup | M | **DONE** | [E1-foundation.md](features/E1-foundation.md) |
| E2 | Design System & Layout | M | TODO | [E2-design-system.md](features/E2-design-system.md) |
| E3 | i18n (EN/FR) | M | TODO | [E3-i18n.md](features/E3-i18n.md) |
| E4 | Sanity CMS | M | TODO | [E4-sanity-cms.md](features/E4-sanity-cms.md) |
| E5 | Pages cœur & silos SEO | L | TODO | [E5-core-pages.md](features/E5-core-pages.md) |
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

## Prochaines étapes prioritaires

1. ✅ **E1 fait** : scaffold Astro 6 + Tailwind v4 + tokens + fonts + i18n EN/FR + Vercel/sitemap.
2. ▶️ **Lancer E2** : layout complet, mega menu (desktop + drawer mobile), footer, primitives `ui/` depuis la maquette.
3. Trancher Q5 (domaine) — placeholder actuel `wildcatmuaythai.com` dans `astro.config.mjs` + `.env.example`.
4. Q1 (storage DTV) avant E6 ; Q6 (slugs) avant E5.

## Pages prioritaires lancement (rappel PRD)

Home · DTV Visa (pillar) · DTV Apply (formulaire) · Stay & Train · Classes · About · Contact.

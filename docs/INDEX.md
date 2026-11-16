# INDEX — Wildcat Muay Thai
> Mis à jour : 2026-11-16 · Reprise de session → HANDOFF.md

## Features
| Feature | Statut | Doc | Points d'entrée code |
|---|---|---|---|
| E8 Blog & contenu | EN COURS | [features/E8-blog-content.md](features/E8-blog-content.md) | `src/content/blog/`, `src/lib/blog.ts` |
| E10 Déploiement (spec Vercel obsolète) | EN COURS | [features/E10-deploy.md](features/E10-deploy.md) | `wrangler.jsonc` |
| Contact intake router | DONE (dev) | [features/contact-intake-router.md](features/contact-intake-router.md) | `src/pages/api/inquiry.ts` |
| Hébergement Cloudflare Workers | DONE | [features/hosting-cloudflare.md](features/hosting-cloudflare.md) | `wrangler.jsonc`, `astro.config.mjs`, `.github/workflows/scheduled-rebuild.yml` |
| E6 Mini-app DTV | TODO | [features/E6-dtv-app.md](features/E6-dtv-app.md) | n/a |
| E7 SEO technique | TODO | [features/E7-seo-technical.md](features/E7-seo-technical.md) | n/a |
| E9 Médias & galerie | TODO | [features/E9-media.md](features/E9-media.md) | n/a |

## Transverse
- [PLAN.md](PLAN.md) — feuille de route
- [DECISIONS.md](DECISIONS.md) — décisions datées
- [PRD.md](PRD.md) — cahier des charges (hosting Vercel : obsolète, voir hosting-cloudflare)
- [trailing-slash-canonical.md](trailing-slash-canonical.md) — politique trailing slash
- Autres docs existants : `DESIGN.md`, `STYLEGUIDE.md`, `editorial-calendar.md`, `seo/`, `project/` (copie posée par init-project, non déplacée)
- `architecture.md` : absent, à créer (non fait ici)

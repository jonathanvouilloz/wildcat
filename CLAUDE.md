# CLAUDE.md — Wildcat Muay Thai Chiang Mai

## Résumé du projet

Site vitrine SEO multi-langue (Astro 5 + Sanity CMS) pour **Wildcat Muay Thai**, un camp de Muay Thai familial et open-air à Chiang Mai. Objectif : capter des clients étrangers via le SEO global/local et professionnaliser la gestion des visas DTV grâce à une mini-app de dépôt de dossier intégrée (formulaire multi-étapes + upload documents + WhatsApp + email). Positionnement de marque : chaleureux, accueillant, familial — **pas** un fight camp hardcore.

## Stack technique

| Couche | Choix |
|--------|-------|
| Framework | Astro 6 (latest stable ; SSG + routes on-demand, i18n natif) |
| Styling | Tailwind CSS v4 |
| CMS | Sanity v3 (headless) |
| i18n | Astro i18n natif + Paraglide JS (EN/FR en V1, voir question ouverte) |
| Email | Resend |
| Storage DTV | À valider — Google Drive API **ou** Supabase Storage |
| Comm DTV | WhatsApp deep link (`wa.me`) |
| Traduction auto | DeepL API (pour langues secondaires éventuelles) |
| Hosting | Vercel |

## Commandes utiles

```bash
npm install            # dépendances
npm run dev            # serveur dev (localhost:4321)
npm run build          # build production (→ dist/ + .vercel/output)
npm run preview        # preview du build
# npx sanity dev       # studio Sanity (E4 — pas encore en place)
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
- **Couleurs** : forest `#1F3B2E`, jungle `#345C3E`, gold `#E0A62B` (gold-deep `#C98A12`), cream `#F6F1E6`, orange/terracotta `#D97732`, charcoal `#111`.
- **Typo** : **Satoshi** Bold (titres) + Satoshi (corps) ; **Fraunces 72pt SemiBold Italic** (accents or, classe `.em`). Lockup signature : *come for the fight / stay for the family*.
- **Vibe** : open-air, golden hour, garden & pool. Photographie candide et dorée, jamais "warrior gym" sombre/agressif.
- **Source de vérité design : `docs/DESIGN.md` + page live `/styleguide`.** Tokens : `src/styles/tokens.css`. Conventions code : `docs/STYLEGUIDE.md`.

## État actuel

**Phase : E1 Foundation terminée. Prochain : E2 (Design System & Layout).**

- [x] PRD lu et analysé
- [x] Bundle de design analysé (direction verrouillée identifiée)
- [x] Documentation projet créée (CLAUDE.md, PLAN, features, DECISIONS, STYLEGUIDE)
- [x] Décisions clés tranchées : langues **EN+FR** (V1), **Coaches + Fighters** (les 2), **prix publics**
- [x] **E1 — Scaffold Astro 6 + Tailwind v4** : tokens, i18n EN/FR (`/en` `/fr`), BaseLayout, adapter Vercel + sitemap, assets. `npm run build` ✅
- [x] **Base design verrouillée** : typo **Satoshi** (self-host Fontshare) + **Fraunces** ; `docs/DESIGN.md` ; page live `/styleguide` ; primitives `ui/Button` + `ui/SectionHead`. `npm run build` ✅
- [ ] Restent ouvertes : Q1 storage DTV (avant E6), Q5 domaine, Q6 slugs traduits
- [ ] E2 (Design System & Layout : nav/mega menu, footer) → suite : voir `docs/PLAN.md`

_Dernière mise à jour : 2026-06-03._

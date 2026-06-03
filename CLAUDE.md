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
- **Couleurs** : échelle verte `forest-light #3B6645` / `forest #2E5D3C` / `forest-deep #21422C` ; gold `#E0A62B` (gold-deep `#C98A12`) ; cream `#F6F1E6` ; orange/terracotta `#D97732` ; charcoal `#111`.
- **Typo** : **Satoshi** Bold (titres `.display/.h1/.h2/.h3`) + Satoshi (corps) ; **Fraunces 72pt SemiBold Italic** (accents or, classe `.em`). Lockup signature : *Come for the fight / Stay for the family*.
- **Icônes** : set unique **Tabler** via `astro-icon` (`<Icon name="tabler:..." />`) + logos `tabler:brand-*`. Custom : swoosh (`ArrowWild`), tigre, DTV stamp, ◆.
- **Marque** : toujours **Wildcat** (jamais de C majuscule).
- **Vibe** : open-air, golden hour, garden & pool. Photographie candide et dorée, jamais "warrior gym" sombre/agressif.
- **Source de vérité design : `docs/DESIGN.md` + page live `/styleguide`.** Tokens : `src/styles/tokens.css`. Conventions code : `docs/STYLEGUIDE.md`.

## État actuel

**Phase : Thème + i18n complets (E1 + design system + E2 + E3). Prochain : E4 (Sanity).**

- [x] PRD lu et analysé · bundle de design analysé · docs projet créés
- [x] Décisions tranchées : langues **EN+FR** (V1), **Coaches + Fighters**, **prix publics**, **Astro 6**, **icônes Tabler**, **marque Wildcat**
- [x] **E1 — Scaffold** Astro 6 + Tailwind v4 : tokens, i18n EN/FR (`/en` `/fr`), adapter Vercel + sitemap, assets
- [x] **Design system** : palette verte 3 tons + gold/cream/charcoal/orange ; typo Satoshi + Fraunces + titres canoniques `.display/.h1/.h2/.h3` ; **boutons** (gold/forest/outline/link + flat + swoosh `ArrowWild`) ; **nav/mega menu** + drawer + utility bar ; **icônes Tabler** (`astro-icon`) ; focus-visible + reduced-motion ; `docs/DESIGN.md` + `/styleguide`
- [x] **E2 — App shell & design-system completion** : couleurs sémantiques (`--success/--warning/--error` harmonisées) ; `BaseLayout` complet (OG/Twitter, slot `jsonld`, preload satoshi-700, Nav+Footer) ; **`Footer`** 4 colonnes ; primitives **`Container`/`Section`** (+ `--gutter`/`--section-y`/`--maxw-narrow`) ; **système de formulaire** (`.wc-control` + `Field/Input/Textarea/Select/Checkbox/FileUpload`) ; **`Card`** de base ; **`src/config/site.ts`** = source unique contenu transverse (contact réel, Instagram/Facebook réels, **pricing THB réel** ; email + horaires `TODO(real data)`). `npm run build` ✅
- [x] **E3 — i18n** : **Paraglide JS 2.x** (plugin Vite, strategy `url > globalVariable > baseLocale`, middleware SSG `setLocale`) ; source `messages/{en,fr}.json` (**144 clés, parité vérifiée**), output `src/paraglide/` gitignored ; **zéro string UI en dur** (Nav ~115 clés, Footer, BaseLayout, home, FileUpload) ; `site.ts` = données brutes only (listes à clés `dayKey`/`key` mappées par records explicites) ; **`LangSwitcher`** (préserve le path, aria-current, zéro JS) ; conventions dans `docs/STYLEGUIDE.md` ; décision + pièges dans `docs/DECISIONS.md`. `npm run build` ✅ (`/fr` rend FR, `/en` rend EN, bundle client inchangé)
- [ ] Questions ouvertes : **Q1** storage DTV (avant E6), **Q5** domaine, **Q6** slugs traduits (réglée de facto si Sanity document-level en E4)
- [ ] Puis E5 (pages) — assemblage des primitives, sans retoucher le thème

_Dernière mise à jour : 2026-06-03._

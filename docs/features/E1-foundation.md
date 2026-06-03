# E1 — Foundation & Setup

**Complexité : M · Statut : TODO**

## Description
Scaffold du projet Astro 5 + Tailwind v4, structure de dossiers, intégration des design tokens et des fonts, config de base.

## Tâches
- [ ] `npm create astro@latest` (template minimal, TypeScript strict)
- [ ] Ajouter Tailwind v4 (`@tailwindcss/vite` ou intégration Astro)
- [ ] Créer `src/styles/tokens.css` depuis `landing.css` (palette, radius, shadows)
- [ ] Charger Bricolage Grotesque + Literata (self-host ou Google Fonts avec preconnect)
- [ ] Mettre en place la structure `src/` (voir STYLEGUIDE)
- [ ] Config `astro.config.mjs` : i18n (E3), sitemap, adapter Vercel
- [ ] `.env.example` avec toutes les variables du PRD §9
- [ ] `.gitignore`, `git init`, premier commit
- [ ] Copier les assets de `wildcat/project/assets/` (logos, gym-garden.jpg) vers `public/` ou `src/assets/`

## Décisions techniques
- Adapter Vercel pour le SSR des routes API (DTV submit, contact).
- Tokens centralisés — voir `docs/STYLEGUIDE.md`.

## Notes / edge cases
- Le projet vit dans `C:\Users\jojo-\Desktop\apps\wildcat`. Le bundle de design est dans `wildcat/project/` — **ne pas écraser**, c'est la référence.
- Pas de repo git encore (`Is a git repository: false`).

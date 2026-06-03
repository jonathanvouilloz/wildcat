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
| Q6 | **Slugs traduits** | Slugs EN partout ⟷ slugs localisés `/fr/visa-dtv` | SEO local, complexité routing (avant E5) |

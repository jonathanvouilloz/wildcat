# E2 — App shell & design-system completion

**Complexité : M · Statut : DONE (2026-06-03)**

## Description
Le design system de marque est **déjà fait** (typo/titres, boutons, nav/mega menu + drawer + utility bar, icônes Tabler — voir `docs/DESIGN.md` + `/styleguide`). E2 ferme les **trous "niveau thème"** restants (tokens + coquille + primitives) pour pouvoir empiler les pages E5+ **sans jamais retoucher le thème**. (Cf. audit de complétude, session 2026-06-03.)

## Déjà livré (hors E2, ne pas refaire)
- [x] `Nav` / `MegaMenu` (4 panneaux + Blog/Contact + CTA Join dynamique flat)
- [x] `MobileDrawer` accordéon + `UtilityBar`
- [x] Comportement hover/clic/clavier + clamp anti-débordement
- [x] Primitives `ui/Button`, `ui/SectionHead`, `ui/ArrowWild`
- [x] Tokens couleurs/typo/radius/ombres/icônes + @theme
- [x] Icônes : set unique **Tabler** (`astro-icon`)

## Livré (les 5 points de complétion) ✅
1. [x] **Couleurs sémantiques** — `--success #5BB487` / `--warning #C98A12` / `--error #C0492B` (harmonisées palette) + `--success-glow` ; dot "open" du nav tokenisé.
2. [x] **Coquille de page**
   - [x] `BaseLayout.astro` : OG + Twitter card + og:locale, slot `jsonld` (E7), preload `satoshi-700` (Fraunces non préloadable — Fontsource/Vite), prop `noindex`, intègre `<Nav/>` + `<Footer/>`.
   - [x] `Footer` 4 colonnes + bottom bar — contenu depuis **`src/config/site.ts`** (source unique : contact réel Hang Dong, tél réel, Instagram/Facebook réels, **pricing THB réel pour E5** ; email + horaires en placeholder `TODO(real data)`).
3. [x] **Primitives de layout** — `layout/Container` (`--maxw`/`--maxw-narrow 760px`/`--gutter`) et `layout/Section` (`--section-y`, variantes `dark`/`soft`, auto-Container) + `scroll-margin-top` ancres.
4. [x] **Système de formulaire** — base globale `.wc-control` + tokens `--field-*` ; composants `ui/forms/` : `Field` (label/helper/erreur `role=alert`, propagation `data-error`), `Input`, `Textarea`, `Select` (caret Tabler), `Checkbox`, `FileUpload` (dropzone progressive enhancement, upload réel en E6).
5. [x] **`Card` de base** — surface/`--line`/`--r-md`/`--shadow-sm` + hover lift + `href` carte entière + reduced-motion.

Le tout démontré sur `/styleguide` (sémantiques, primitives full-bleed, forms tous états, cards, footer live).

## Décisions techniques
- Mega menu/drawer en vanilla JS (fait).
- `<image-slot>` (maquette) → `<Image>` Astro / asset Sanity.
- Motifs (`BrushDivider`, tiger stripes) : composants créés au besoin (build-as-you-go), pas bloquant pour E2.

## Notes
- Référence verrouillée : `wildcat/project/landing.css` + `meganav.css`.
- Après E2 : E5 (pages) = assemblage de Container/Section/Card/Button/Icon, **sans toucher au thème**.

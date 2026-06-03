# E2 — App shell & design-system completion

**Complexité : M · Statut : TODO (next)**

## Description
Le design system de marque est **déjà fait** (typo/titres, boutons, nav/mega menu + drawer + utility bar, icônes Tabler — voir `docs/DESIGN.md` + `/styleguide`). E2 ferme les **trous "niveau thème"** restants (tokens + coquille + primitives) pour pouvoir empiler les pages E5+ **sans jamais retoucher le thème**. (Cf. audit de complétude, session 2026-06-03.)

## Déjà livré (hors E2, ne pas refaire)
- [x] `Nav` / `MegaMenu` (4 panneaux + Blog/Contact + CTA Join dynamique flat)
- [x] `MobileDrawer` accordéon + `UtilityBar`
- [x] Comportement hover/clic/clavier + clamp anti-débordement
- [x] Primitives `ui/Button`, `ui/SectionHead`, `ui/ArrowWild`
- [x] Tokens couleurs/typo/radius/ombres/icônes + @theme
- [x] Icônes : set unique **Tabler** (`astro-icon`)

## À faire (les 5 points de complétion)
1. **Couleurs sémantiques** — ajouter `--success` / `--error` / `--warning` dans `tokens.css` + `@theme` ; tokeniser le point "open today" du nav (actuellement `#5bb487` en dur).
2. **Coquille de page**
   - [ ] `BaseLayout.astro` fini : head SEO complet (title/description, **OG + Twitter card**, slot **JSON-LD**), `font preload`, intègre `<Nav/>` + `<Footer/>`.
   - [ ] `Footer` (4 colonnes : brand/social, explore, hours, contact + bottom bar — cf. `landing.css`).
3. **Primitives de layout** — `Container` (max-width + gutter tokenisés) et `Section` (rythme vertical `clamp(...)` + variante `dark` fond forest). Remplace les `mx-auto max-w-[...]` ad hoc.
4. **Tokens de formulaire** — base `Input` / `Textarea` / `Select` / `Checkbox` / `FileUpload` + `Label` + helper/erreur + focus ring. (Sert E6 DTV + Contact.)
5. **`Card` de base** — surface/bordure `--line`/radius `--r-md`/`--shadow-sm` + hover lift. Réutilisée par programs, pricing, coaches, fighters, blog, témoignages.

## Décisions techniques
- Mega menu/drawer en vanilla JS (fait).
- `<image-slot>` (maquette) → `<Image>` Astro / asset Sanity.
- Motifs (`BrushDivider`, tiger stripes) : composants créés au besoin (build-as-you-go), pas bloquant pour E2.

## Notes
- Référence verrouillée : `wildcat/project/landing.css` + `meganav.css`.
- Après E2 : E5 (pages) = assemblage de Container/Section/Card/Button/Icon, **sans toucher au thème**.

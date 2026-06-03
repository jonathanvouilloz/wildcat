# E2 — Design System & Layout

**Complexité : M · Statut : TODO**

## Description
Recréer pixel-perfect le shell de la maquette : layout de base, navigation (mega menu desktop + drawer mobile), footer, utility bar, et les primitives réutilisables.

## Tâches
- [ ] `BaseLayout.astro` : `<head>` SEO, fonts, slots, nav + footer
- [ ] Composant `Nav` / `MegaMenu` (4 panneaux : Train, Stay & Train, DTV Visa, About + Blog/Contact + CTA Join)
  - [ ] Comportement hover/clic/clavier (Échap), `aria-expanded`, clamp anti-débordement (voir JS `Wildcat Mega Menu.html`)
- [ ] `MobileDrawer` accordéon (`<details>`)
- [ ] `UtilityBar` (localisation, horaires, tel, socials, lang switcher)
- [ ] `Footer` (4 colonnes : brand/social, explore, hours, contact + bottom bar)
- [ ] Primitives `ui/` : `Button` (gold/forest/outline + on-dark), `Badge`, `Card`, `SectionHead` (◆ CAPS), `DtvStamp`, `BrushDivider`
- [ ] Mapper les tokens dans Tailwind (theme extend)

## Décisions techniques
- Mega menu et drawer en vanilla JS (les maquettes le font déjà proprement).
- `<image-slot>` → remplacé par `<Image>` Astro / asset Sanity.

## Notes / edge cases
- Référence verrouillée : `wildcat/project/landing.css` + `meganav.css`.
- Nav sticky, fond `--forest`, logo `logo-cream.png`.
- Le clamp du mega menu force un reflow synchrone — reproduire le comportement responsive.

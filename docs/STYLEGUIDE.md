# STYLEGUIDE — WildCat Muay Thai

Conventions de **code**. La source de vérité **visuelle** (couleurs, typo, motifs, voix) est `docs/DESIGN.md` + la page live `/styleguide`. Les tokens techniques vivent dans `src/styles/tokens.css` + `@theme` de `src/styles/global.css`.

---

## 1. Design tokens

### Couleurs (variables CSS)

```css
:root{
  /* core palette — Direction B "Tropical Garden" */
  --forest:#1F3B2E;     /* nav, footer, sections sombres, headings */
  --jungle:#345C3E;     /* accents secondaires, labels */
  --gold:#E0A62B;       /* CTA principal, accents */
  --gold-deep:#C98A12;  /* emphase texte, liens "more" */
  --cream:#F6F1E6;      /* fond clair principal */
  --orange:#D97732;     /* accent terracotta (◆ section heads) */
  --charcoal:#111111;

  /* surfaces & lines */
  --surface:#FFFFFF;
  --soft:#FAF7F0;
  --soft-2:#F2ECE1;
  --line:#E6DDC9; --line-2:#D8CBB3; --line-3:#B5A98C;

  /* ink (texte) */
  --ink:#1B2A22; --ink-2:#556157; --ink-3:#8A9389;

  /* layout */
  --maxw:1200px;
  --r-sm:8px; --r-md:12px; --r-lg:20px; --r-xl:28px;
  --shadow-sm:0 2px 10px -6px rgba(20,35,25,.4);
  --shadow-md:0 18px 44px -28px rgba(20,35,25,.5);
  --shadow-lg:0 36px 80px -44px rgba(20,35,25,.6);
}
```

### Typographie

- **Satoshi** (self-hostée, Fontshare) — titres (Bold 700 / Extrabold 800, Black 900 display) ET corps (Regular 400 / Medium 500). Utilitaire `font-display`.
- **Fraunces** variable (Fontsource) — accent **72pt SemiBold Italic** uniquement (classe `.em`), en or : `--gold-deep` sur fond clair / `.em.on-dark` → `--gold` sur fond sombre. Utilitaire `font-accent`.
- Corps : `17px`, `line-height:1.6`. H1 hero : `clamp(40px,6.2vw,72px)`, `line-height:.98`, `letter-spacing:-0.03em`. H2 : `clamp(28px,4vw,44px)`.
- Détail complet (échelle, lockup signature, do/don't) : `docs/DESIGN.md` §4.

### Composants signature (depuis la maquette)

- **`.sec-head`** : label CAPS `◆` (orange) avant chaque section, `letter-spacing:.16em`, couleur forest (ou gold sur fond sombre).
- **Boutons** (`ui/Button.astro`) : variantes `gold` / `forest` / `outline` (+ `onDark`). **Pill, Satoshi Bold casse normale**, relief vert `#3B6645`, swoosh maison (`ui/ArrowWild.astro`), états hover/press/focus. Détail : `docs/DESIGN.md` §8.
- **DTV stamp** : sceau circulaire doré (radial-gradient or, bordure charcoal) — élément de marque récurrent.
- **Mega menu** : 4 panneaux riches (Train / Stay & Train / DTV Visa / About) + liens simples (Blog, Contact) + CTA Join. Drawer accordéon en mobile.
- **Brush divider** : séparateur SVG "coup de pinceau" entre hero et value strip.
- Motifs de marque : tiger stripes (dividers), claw slash (accent hover), round stamp (sceaux/DTV).

### Responsive (mobile-first)

Breakpoints maquette : `1024px` (nav → burger), `860px` (grilles → 1 col), `520px`. Tailwind : `sm 640 / md 768 / lg 1024 / xl 1280`.

---

## 2. Conventions de code

### Structure de fichiers (prévue)

```
src/
├── components/        # PascalCase .astro (Nav, Footer, FighterCard, DTVStepper…)
│   ├── ui/            # primitives réutilisables (Button, Badge, Card)
│   └── sections/      # sections de page (Hero, DtvPillar, Pricing…)
├── layouts/           # BaseLayout.astro (head, SEO, fonts, nav, footer)
├── pages/
│   └── [lang]/        # routing localisé
├── lib/               # sanity client, helpers seo, schema.org
├── paraglide/         # messages i18n (en.json, fr.json…)
├── styles/            # tokens.css + global.css
└── content/           # collections statiques éventuelles
```

### Règles

- **Tokens, pas de magie** : couleurs/spacing/radius via variables CSS ou classes Tailwind mappées. Jamais de hex en dur dans un composant.
- **i18n strict** : aucune string UI en dur — tout via Paraglide.
- **SEO par défaut** : chaque page passe par `BaseLayout` qui exige `title`, `description`, `lang`, et génère `hreflang` + OG.
- **Images** : WebP, `alt` obligatoire, `loading="lazy"` sauf hero (LCP). Le `<image-slot>` des maquettes = placeholder à remplacer par `<Image>` Astro / asset Sanity.
- **Accessibilité** : `aria-expanded` sur les toggles mega menu, focus visibles, navigation clavier (Échap ferme les panneaux).
- **Composants interactifs** : vanilla JS dans `<script>` Astro tant que possible (le mega menu et la stepper le permettent). Framework client seulement si justifié.

### Commits — Conventional Commits

`feat:` `fix:` `docs:` `style:` `refactor:` `test:` `chore:` + scope.
Ex : `feat(nav): add mega menu with SEO silos`, `fix(dtv): handle upload failure retry`.

### Nommage

- Composants : `PascalCase.astro`.
- Fichiers utilitaires/lib : `kebab-case.ts`.
- Variables/fonctions : `camelCase`. Constantes : `UPPER_SNAKE`.
- Slugs d'URL : `kebab-case`, anglais par défaut (traduction des slugs = question ouverte).

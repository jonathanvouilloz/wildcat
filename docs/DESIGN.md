# DESIGN — Wildcat Muay Thai

Système design complet et **verrouillé**. Source de vérité visuelle pour tout le site.
Référence vivante : page `/styleguide` (interne, `noindex`). Conventions de code : `docs/STYLEGUIDE.md`.
Tokens techniques : `src/styles/tokens.css` + `@theme` dans `src/styles/global.css`.

---

## 1. Essence de marque

Wildcat n'est **pas** un fight camp hardcore. C'est un **jardin, une piscine et un ring** où chacun — débutant, voyageur ou nomade installé — pratique le vrai Muay Thai et se sent accueilli comme en famille. Tenu par une femme, bâti sur la chaleur humaine, pas l'intimidation.

| # | Valeur | En clair |
|---|--------|----------|
| 01 | **Family-first** | Tout le monde est bienvenu — femmes, enfants, couples, débutants. No ego at the door. |
| 02 | **Open-air & alive** | Jardin tropical, bananiers, piscine près du ring. Le décor EST la marque. |
| 03 | **Real Muay Thai** | Technique et entraîneurs thaïs authentiques — sérieux à l'entraînement, chaleureux dans le ton. |
| 04 | **Stay & belong** | Une semaine ou une saison. DTV-ready, scooter sur place, ta base à Chiang Mai. |

**Personas** : (01) Expats & nomades · DTV + long terme · (02) Voyageurs · drop-in & stay-train · (03) Familles & débutants.

---

## 2. Voix & ton

Chaleureux, simple, encourageant. Comme un·e ami·e qui tient une salle — jamais un sergent instructeur. Bilingue **EN / FR**.

**Tone words** : Warm · Welcoming · Genuine · Encouraging · Down-to-earth
**Bannis** : ~~Aggressive~~ · ~~Elitist~~ · ~~Hardcore-bro~~ · ~~bloodied/warrior imagery~~

> **Nom de marque** : toujours écrit **Wildcat** (W majuscule, c minuscule) — **jamais** de C majuscule (~~WildCat~~). Vaut pour copy, titres, `alt`, méta. Les noms de fichiers du logo restent inchangés.

### Taglines
- **Come for the fight. *Stay for the family.*** ← lockup signature (voir §4)
- Train. Stay. *Belong.* / Entraîne-toi. Reste. *Trouve ta place.*
- Your Muay Thai *home* in Chiang Mai. / Ton Muay Thai à Chiang Mai, *comme à la maison.*
- Real training, *family* vibe. / Du vrai entraînement, *l'esprit famille.*

### Une ligne par persona
- **Expat / nomade · DTV** : "Settle in Chiang Mai, train every day, and we'll help with your DTV visa."
- **Voyageur · drop-in** : "Passing through? Jump into a class or stay & train for the week."
- **Famille & débutant** : "Never thrown a kick? Perfect. Everyone starts somewhere — and everyone's welcome."

### Microcopy boutons
`Book a class` · `Stay & Train` · `DTV Visa info` · `Rent a scooter` · `Start your DTV` · `View schedule`

---

## 3. Système couleur — « Tropical Garden »

Palette verrouillée. Tokens dans `src/styles/tokens.css`. **Ne jamais mettre de hex en dur** dans un composant.

### Core

Échelle verte à 3 tons (clair → foncé) — c'est l'ossature de la marque.

| Nom | Hex | Token | Rôle |
|-----|-----|-------|------|
| Forest Light | `#3B6645` | `--forest-light` | Surfaces vertes en relief (bouton forest) |
| Forest (Palm Green) | `#2E5D3C` | `--forest` | Base — nav, footer, sections sombres, titres, fond du lockup |
| Forest Deep | `#21422C` | `--forest-deep` | Ombres / ledges des reliefs, util bar |
| Gold | `#E0A62B` | `--gold` | CTA principal, accents, accents sur fond sombre |
| Gold Deep | `#C98A12` | `--gold-deep` | Emphase texte / liens sur fond clair |
| Cream | `#F6F1E6` | `--cream` | Fond clair principal, texte sur fond sombre |
| Orange | `#D97732` | `--orange` | Terracotta — puce `◆` des section heads |
| Charcoal | `#111111` | `--charcoal` | Contraste extrême, texte sur or |

### Surfaces & lignes
`--surface #FFFFFF` · `--soft #FAF7F0` · `--soft-2 #F2ECE1` · `--line #E6DDC9` · `--line-2 #D8CBB3` · `--line-3 #B5A98C`

### Ink (texte)
`--ink #1B2A22` (principal) · `--ink-2 #556157` (secondaire) · `--ink-3 #8A9389` (tertiaire/légendes)

### Sémantiques (états)
Harmonisées à la palette — pas de verts/rouges génériques. Utilisées par les formulaires (E6 DTV, Contact) et le dot « open » du nav.

| Nom | Hex | Token | Rôle |
|-----|-----|-------|------|
| Success | `#5BB487` | `--success` (+ `--success-glow` rgba .2) | Validations, « open today » (nav), fichier OK |
| Warning | `#C98A12` | `--warning` | Avertissements (= gold-deep, alias sémantique) |
| Error | `#C0492B` | `--error` | Erreurs formulaire, messages bloquants (terracotta rougie) |

### Règles d'association
- **Fond sombre** : `forest` `#2E5D3C` (ou dégradé sombre → forest) + texte `cream` + accents `gold`.
- **Fond clair** : `cream`/`surface` + texte `ink` + accents `gold-deep`.
- CTA primaire : `gold` + texte `charcoal`. CTA sombre : `forest` + texte `cream`.
- Sur or, le texte est toujours `charcoal` (jamais blanc).

---

## 4. Typographie

Deux familles. **Satoshi** (self-hostée, Fontshare) porte titres et corps ; **Fraunces** (variable, Fontsource) donne l'accent éditorial.

| Usage | Police | Réglage |
|-------|--------|---------|
| Titres (H1–H3) | **Satoshi** | Bold 700 / Extrabold 800, `letter-spacing:-0.02/-0.03em` |
| Display géant | **Satoshi** | Black 900 (hero) |
| Corps / lead | **Satoshi** | Regular 400 / Medium 500, `line-height:1.6` |
| Eyebrow / label | **Satoshi** | 700, UPPERCASE, `letter-spacing:0.16em`, puce `◆` orange |
| **Accent / variation de titre** | **Fraunces** | **72pt SemiBold Italic** — `opsz 72`, `wght 600`, italic, couleur or |

### Lockup signature
> **Come for the fight.** *(Satoshi Bold, cream)*
> ***Stay for the family.*** *(Fraunces 72 SemiBold Italic, gold)*

Sur fond `forest` `#2E5D3C`. C'est LE pattern de marque : une affirmation directe en Satoshi + une chute chaleureuse en Fraunces or. Classe d'accent : `.em` (or profond) / `.em.on-dark` (or vif). **Tracking serré** (`-0.035em`) sur le display.

### Échelle canonique (classes dans `src/styles/global.css`)
Utiliser ces classes plutôt que des utilitaires ad hoc — cohérence garantie sur tout le site.

| Classe | Poids | Taille | line-height | letter-spacing |
|--------|------|--------|-------------|----------------|
| `.display` | 800 | `clamp(40px,6vw,72px)` | .98 | -0.03em |
| `.h1` | 800 | `clamp(34px,5vw,56px)` | 1.0 | -0.025em |
| `.h2` | 700 | `clamp(28px,4vw,44px)` | 1.05 | -0.02em |
| `.h3` | 700 | `clamp(20px,2.4vw,26px)` | 1.15 | -0.01em |

Couleur par défaut `--forest`. Accent via `.em` (Fraunces). `text-wrap: balance`.
- Body : 17px · Lead : 18–21px · Label/eyebrow : 13px (Satoshi 700 caps, `◆`).

### Do / Don't
- **Do** : Satoshi pour 95 % du texte ; Fraunces réservé aux accents courts (1–4 mots) et toujours en or.
- **Don't** : Fraunces en paragraphe, en non-italique, ou dans une autre couleur que l'or. Pas de 3e police.

---

## 5. Spacing, radius, ombres, breakpoints

- **Radius** : boutons = **pill** (`999px`) · `--r-sm 8px` (badges, petits) · `--r-md 12px` (cards) · `--r-lg 20px` (blocs/médias) · `--r-xl 28px`.
- **Boutons — même boîte** : toutes les variantes partagent `min-height 44px`, padding `10px 24px`, pill `999px`, bordure `1.5px` (transparente sur les pleins) → proportions 100 % identiques. Offsets de relief alignés : base `7px` / hover `8px` / press `3px`.
- **Élévation** (surface claire + ombre foncée) : forest = surface `#3B6645` + pastille/ombre vert foncé `#21422C` ; gold = surface `gold` + pastille `--gold-deep` ; **outline** (tertiaire) = **totalement transparent** (ni fond ni bordure), texte seul → vert foncé (forest) sur fond clair, crème sur fond sombre. Même boîte que les pleins ; hover = léger fond teinté.
- **Hiérarchie** : `gold` = primaire · `forest` = secondaire · `outline` = tertiaire · `link` = navbar. Hover = lift (`-1px`) ; press = pastille enfoncée (`scale .99`). Respecte `prefers-reduced-motion`.
- **Modifieur `flat`** : même couleur (gold/forest) mais **sans relief ni lift** — utilisé pour le **CTA du nav** (Join), avec swoosh. Le libellé du CTA nav est **dynamique selon la page** (`Start your DTV` sur /dtv-visa, `Plan your stay` sur /stay-train, `Book a class` sur /classes…, sinon `Join now`).
- **Variante `link`** (navbar) : texte seul, sans bordure ni relief, Satoshi 600, soulignement or animé au survol (couleur → `gold-deep` clair / `gold` sombre).
- **Ombres** : `--shadow-sm` (cards) · `--shadow-md` (hover, médias) · `--shadow-lg` (flottants).
- **Largeur max** : `--maxw 1200px` · `--maxw-narrow 760px` (prose/formulaires) · gouttières `--gutter clamp(20px, 4vw, 40px)` → primitive `layout/Container` (`size="narrow"`).
- **Rythme de section** : `--section-y clamp(56px, 7vw, 88px)` → primitive `layout/Section` (variantes `dark` fond forest / `soft`). `dark` n'auto-flip pas les enfants : passer `onDark` aux SectionHead/Button et `.on-dark` au Fraunces. Ancres : `scroll-margin-top 90px` (nav sticky 74px).
- **Champs de formulaire** : base globale `.wc-control` + tokens `--field-*` (bg blanc, bordure `--line-2`, radius `--r-sm`, focus = bordure gold + ring `--field-ring`, erreur = bordure/ring `--error` propagés par `Field` via `data-error`, disabled = `--soft-2`). `font-size 16px` (pas de zoom iOS).
- **Fonts — chargement** : preload de `satoshi-700.woff2` uniquement (titres + nav, LCP). Satoshi 400 non préchargée (below the fold). **Fraunces non préchargeable** (bundlée par Vite via Fontsource, URL fingerprintée) — acceptable : accent-only, jamais LCP.
- **Breakpoints** (Tailwind) : `sm 640` · `md 768` · `lg 1024` · `xl 1280`. Bascules clés : `1024px` (nav → burger), `860px` (grilles → 1 col). **Mobile-first absolu.**

---

## 6. Photographie & art direction

**Sun, sweat & green.** Candide et doré, pas studio-glossy. Shooter le vrai lieu : lumière du matin à travers la canopée, la piscine qui reflète le ring, des mains qu'on bande, un coach qui rit avec un élève. C'est ce qui vit déjà sur l'Instagram — on le rend cohérent.

**Do**
- Lumière naturelle, balance des blancs chaude, ombres douces
- Vrais membres & entraîneurs — divers, tous âges, souriants
- Jardin, piscine, verdure tropicale en décor
- Action candide & moments calmes entre les rounds

**Don't**
- Salle sombre/gritty « warrior », tons bleus froids
- Poses agressives, ego, imagerie sanglante
- Filtres lourds, faux HDR, néons sursaturés
- Photo fitness-model générique de banque d'images

---

## 7. Iconographie & motifs

### Set d'icônes : Tabler (une seule famille)
Toutes les icônes UI viennent de **Tabler** via `astro-icon` : `<Icon name="tabler:karate" />`. Logos réseaux inclus dans le même set (`tabler:brand-instagram`, `brand-whatsapp`…). Tailles via tokens : `--icon-sm 16` / `--icon-md 20` / `--icon-lg 24`. Inventaire complet rendu sur `/styleguide`. **Custom hors-lib** : le swoosh (`ArrowWild`), le tigre (logo), le DTV stamp, le `◆`.

### Motifs de marque
Le **tigre** est le cœur de la marque — mascotte à conserver. Autour, un petit kit de devices reproductibles, construits à partir des couleurs de marque.

| Motif | Description | Usage |
|-------|-------------|-------|
| **Master mark** | Lock-up complet (tigre + wordmark), SVG vectorisé en 2 orientations (`logo-horizontal.svg`, `logo-vertical.svg`). Clear space ≥ 1× la hauteur du tigre. | Header, footer (variantes `-cream` sur forest). Safe-area solide sur photo/fond sombre. |
| **Tiger stripes** | `repeating-linear-gradient(60deg, forest 0 14px, gold 14px 28px)` | Dividers, bords, cadrage photo |
| **Claw slash** | 3 griffes or inclinées sur charcoal | Accent sur boutons / liens actifs (hover) |
| **Round stamp** | Sceau circulaire bord charcoal, texte mono « Wildcat · Est. Chiang Mai · Muay Thai » | Merch, stickers, story |
| **DTV stamp** | Sceau doré radial, « DTV / Visa Friendly / Muay Thai · Soft Power » | Header/footer DTV, badge pilier |

**Variantes logo** (dans `public/assets/`, SVG 100 % vectorisés — texte outliné, jamais de `<text>` vivant) :

| Fichier | Contenu | Fond |
|---------|---------|------|
| `logo-only.svg` | Tigre seul (= favicon du site) | Tous fonds (clair, forest, gold) |
| `logo-horizontal.svg` | Tigre + script + « MUAY THAI CHIANG MAI » (wordmark sombre) | Fonds clairs |
| `logo-horizontal-cream.svg` | Idem, wordmark cream `#F6F1E6` | Forest / fonds sombres — **utilisé nav + footer** |
| `logo-vertical.svg` | Lockup empilé (script / tigre / baseline), wordmark sombre | Fonds clairs |
| `logo-vertical-cream.svg` | Idem, wordmark cream | Forest / fonds sombres |

⚠️ Les couleurs internes du logo (`#231f20`, `#e4b021`, `#ea8723`…) sont **fixes** — propres à la marque, jamais mappées sur les tokens. Les variantes cream sont générées par recoloration des paths du wordmark uniquement (le tigre garde ses couleurs). **Favicon** : `favicon.svg` = tigre + `favicon.ico` (16/32/48) régénéré depuis `logo-only.svg`.

---

## 8. Inventaire composants

Spécifiés visuellement ici, implémentés en E2 (`src/components/ui` + `sections`) et E5.

| Composant | Statut | Notes |
|-----------|--------|-------|
| `Button` (gold/forest/outline/link + on-dark) | ✅ `ui/Button.astro` | **Pill · Satoshi Bold casse normale · même boîte sur toutes les variantes · surface claire + ombre foncée · swoosh maison · `link` = navbar · états hover(lift)/press/focus** |
| `ArrowWild` (swoosh maison) | ✅ `ui/ArrowWild.astro` | icône vectorielle `currentColor` (public/assets/arrow-wild.svg) |
| `SectionHead` (◆ CAPS) | ✅ `ui/SectionHead.astro` | center / on-dark |
| `Container` | ✅ `layout/Container.astro` | `--maxw`/`--maxw-narrow` + `--gutter` |
| `Section` | ✅ `layout/Section.astro` | `--section-y` · variantes `dark`/`soft` · auto-Container |
| `Card` | ✅ `ui/Card.astro` | surface/`--line`/`--r-md`/`--shadow-sm` · hover lift · `href` carte entière |
| `Field` + `Input`/`Textarea`/`Select`/`Checkbox`/`FileUpload` | ✅ `ui/forms/*.astro` | base `.wc-control` + tokens `--field-*` · états focus/erreur/disabled · upload réel en E6 |
| `Nav` / `MegaMenu` + `MobileDrawer` | ✅ `sections/Nav.astro` | 4 panneaux + drawer accordéon + utility bar (infos depuis `config/site.ts`) |
| `Footer` | ✅ `sections/Footer.astro` | 4 colonnes + bottom bar — contenu depuis `config/site.ts` |
| `BaseLayout` | ✅ `layouts/BaseLayout.astro` | head SEO complet (OG/Twitter/canonical/hreflang), slot `jsonld` (E7), preload fonts, Nav+Footer |
| `Callout` (note/brief/tip × stripe/stamp/board) | ✅ `ui/Callout.astro` | encart infos essentielles — `variant` = job (disclaimer YMYL / BLUF faits ◆ / conseil) · `theme` = habillage (bande tiger-stripes / papier cream double bordure + sceau via slot `badge` / forest-deep inversé) · slots `badge`/`footer` · strings via props (i18n) |
| `DtvStamp` | ✅ `ui/DtvStamp.astro` | sceau doré (cf. /styleguide) — aussi badge du `Callout` stamp |
| Tiger stripes / Claw / Round stamp | spec | motifs CSS |
| `FighterCard` / `CoachCard` | E5 | photo + stats (fighter) / rôle (coach) |
| `TestimonialSlider` | E9 | photo, pays, étoiles |
| `TrainingSchedule` | E5 | grille horaires (Sanity) |
| Pricing plan / FAQ accordion | E5 | prix publics — **tarifs réels dans `config/site.ts`** |

> **Contenu transverse** (contact, horaires, réseaux, tagline, pricing) : source unique `src/config/site.ts`. Modifier là, jamais dans les composants.

---

_Dernière mise à jour : 2026-06-03 — E2 : sémantiques, primitives layout, forms, Card, Footer, BaseLayout._

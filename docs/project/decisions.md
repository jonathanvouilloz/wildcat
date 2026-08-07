# DECISIONS — Log des décisions techniques

Format : `Date | Décision | Contexte | Alternatives considérées`

---

### 2026-07-16 | Cannibalisation « coût » : différenciation intention (pas de 301), blog owner du générique
- **Contexte** : audit `/seo-cannibalisation` (GSC) → 1 seul vrai conflit vivant sur le site. `/blog/muay-thai-training-thailand-cost` (pos 67) et `/dtv-visa/long-stay-training` (pos 87) se disputaient « cost of muay thai training in thailand » — même intention, titles jumeaux, silos différents (`/blog` vs `/dtv-visa`) → signal réparti, les deux perdent. Canonical impuissant (chaque page légitimement self-canonical).
- **Choix** (doctrine `cannibalisation.md` Type B) : **différenciation + maillage croisé, pas de fusion ni 301**. Le blog reste l'owner de l'intention générique « coût » ; la page DTV est re-scopée sur son intention propre « budget d'un long séjour SUR visa DTV » (title/H1/H2 réécrits EN+FR) ; lien retour DTV→blog ajouté (EN-only) pour router la requête générique vers le blog.
- **Alternatives** : 301 de la page DTV vers le blog — écarté (les deux pages sont légitimes, micro-intentions séparables : coût générique vs budget long-séjour DTV ; une 301 tuerait la page DTV qui a sa propre raison d'être) ; ne rien toucher — écarté (le splitting persiste tant que les deux titles restent jumeaux).
- **Parqués** (hors cannibalisation) : home http/https, trailing-slash `/fr/dtv-visa/` (self-heal via canonical + `trailingSlash:'never'`), fantôme `muay-thai-for-women` (404 = artefact `publishDate` futur, se republie le 30/07, aucune 301).
- **Portée** : repo (commit 3e988ca) ; rapport local `.seo-data/cannibalisation-*.json` (le hub `/seo` ne rend pas encore le type `cannibalization`).

### 2026-07-03 | Blog : champ frontmatter `h1` distinct du `title` + skill `/seo-sources`
- **Contexte** : le template E8 `[slug].astro` rendait `<h1>{post.data.title}</h1>` et le `<title>` sortait du même champ → title == H1 sur les 14 articles (violation Critical `/seo-review`, que `/seo-brief` + `/seo-enrich` imposaient déjà). Séparément, aucune étape du pipeline n'ouvrait de vraies sources externes → sections « Sources » en prose sans URL (faiblesse YMYL/GEO).
- **Choix** : (1) champ `h1: z.string().optional()` au schéma `blog`, template `{post.data.h1 ?? post.data.title}` (fallback title, zéro régression) ; `<title>`/JSON-LD `headline` restent sur `title`. (2) Skill `/seo-sources` (fetch WebFetch réel + triple-statut `seo-rules.md`, seul un `Confirmé` devient un lien), inséré Étape 3 de `@article-producer` (après humanizer, avant enrich).
- **Alternatives** : durcir `/seo-review` pour comparer le H1 rendu — écarté (le fix site suffit : le champ `h1` produit par enrich coule tout seul) ; sources pré-fournies par le brief sans vérif live — écarté (c'était le statu quo qui produisait des sources non vérifiables).
- **Portée** : le fix H1 est dans le repo (commit 9b545a2) ; `/seo-sources` + wiring sont dans `~/.claude/` (hors repo site).

### 2026-06-13 | URLs : `trailingSlash: 'never'` (alignement canonical / liens / 301)
- **Contexte** : `/en` et `/en/` servaient tous deux un 200 (aucun 301 d'enforcement), et le canonical sortait AVEC slash (`/en/`) alors que tous les liens internes (`localePath`, `blogPath`) et le redirect racine pointent SANS slash (`/en`). Cause : aucune politique `trailingSlash` définie → défaut Astro `'ignore'` (un non-choix : canonical, liens et hébergeur tranchaient chacun différemment).
- **Choix** : **`trailingSlash: 'never'`** dans `astro.config.mjs`. Aligne canonical/hreflang/og:url/sitemap sur la forme sans slash (celle déjà émise par le code) ET déclenche l'adaptateur Vercel, qui écrit une règle `^/(.*)/$` → `/$1` en **308** dans `.vercel/output/config.json` (la redirection est le travail de l'hébergeur en SSG, pas d'Astro). Zéro fichier applicatif modifié (tout était déjà sans slash).
- **Alternatives** : `'always'` (forme avec slash) — écartée car aurait imposé de réécrire `localePath`, le redirect racine et la gestion des ancres `#…` pour le même résultat ; rester en `'ignore'` — écartée (duplicate content auto-infligé, self-canonical en désaccord).
- **Détail complet** (diagnostic, impact SEO, vérif, checklist) : `docs/trailing-slash-canonical.md`.

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

### 2026-06-03 | i18n : Astro i18n natif (routing) + Paraglide JS 2.x (messages)
- **Contexte** : E3 — extraire toutes les strings UI en dur (Nav ~115, Footer, home, FileUpload) avec type-safety et scalabilité V1.1 (TH/DE/ES/RU + pipeline DeepL).
- **Choix** : **Astro i18n natif** garde le routing (`/en` `/fr`, hreflang, sitemap) ; **Paraglide JS 2.x** compile `messages/{locale}.json` en fonctions typées `m.*()` (clé inexistante = erreur build, tree-shaking, zéro runtime client). En SSG la locale est posée par `src/middleware.ts` → `setLocale(assertIsLocale(context.currentLocale))` (pattern SSG officiel). **Piège résolu** : la strategy doit inclure `globalVariable` (`['url','globalVariable','baseLocale']`) — côté serveur `url` est ignorée (pas de `window`), c'est la variable globale écrite par `setLocale` qui porte la locale au build.
- **Conventions** : source éditoriale = `messages/` (versionné) ; `src/paraglide/` = output compilé (gitignored, régénéré au build) ; clés snake_case préfixées par domaine (`nav_*`, `footer_*`, `home_*`, `cta_*`, `site_*`, `form_*`, `meta_*`) ; **jamais d'accès dynamique** `m['…']` → records explicites pour les listes ; FR = tutoiement ; marque "Wildcat" et badge DTV/Visa jamais traduits.
- **Alternatives** : JSON maison + helper `t()` (zéro dep mais typage/parité à maintenir à la main, faible scalabilité V1.1) ; `paraglideMiddleware` ALS (pensé pour `output: server`, inutile/fragile en SSG) ; `{ locale }` explicite à chaque appel (~200 call sites, trop verbeux).
- **Limite connue** : clé FR manquante = fallback EN **silencieux** (build vert ≠ FR complet) → vérifier la parité des sets de clés à chaque ajout.

### 2026-06-03 | E4 — Studio Sanity embarqué (/studio) + i18n CMS mixte
- **Contexte** : E4 — brancher Sanity sur le site Astro 6 SSG (adapter Vercel), studio gérable par l'owner, i18n EN/FR cohérente avec Paraglide. Le projet sanity.io n'existait pas encore au moment de l'init.
- **Choix** :
  - **Studio embarqué** via `@sanity/astro` (`studioBasePath: '/studio'`) plutôt que repo séparé — un seul deploy, une seule URL. En SSG le studio est une page statique unique en **hash router** (`/studio#/...`) : pas de SSR requis. React (`@astrojs/react`) installé **pour le studio uniquement** — zéro island React sur le site public.
  - **i18n CMS mixte** (conforme PLAN.md) : **document-level** pour `blogPost` (plugin `@sanity/document-internationalization`, un document par langue → **slugs traduits gratuits, Q6 réglée**) ; **field-level** pour `coach`/`fighter`/`testimonial`/`trainingSchedule`/`category` (objets `localeString`/`localeText` `{en, fr}`, résolus côté front par `pickLocale()` avec fallback EN — même politique que Paraglide).
  - **Client** : `sanity:client` fourni par l'intégration (pas de `@sanity/client` direct) + `useCdn: false` (SSG = contenu frais au build). Requêtes GROQ en `defineQuery` (package `groq`) → types de résultats générés par `sanity typegen` (`npm run sanity:types`, 100 % local, aucun login). `src/lib/sanity.types.ts` committé.
  - **Placeholder projectId** : `PUBLIC_SANITY_PROJECT_ID` lu via `loadEnv` avec fallback `'placeholder'` — le build du site passe sans projet réel (aucune page ne consomme Sanity en E4) ; le studio monte mais ne se connecte pas tant que `.env` n'est pas rempli.
- **Pièges notés** : `sanity.config.ts` est **bundlé côté navigateur** (le studio est une island React) → **jamais de `process.env` dedans** (`ReferenceError: process is not defined` à l'hydratation) ; on utilise `import.meta.env.PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET` (préfixe `PUBLIC_` requis pour l'exposition client — pas des secrets ; `SANITY_TOKEN` reste sans préfixe), avec fallback `process.env` guardé (`typeof process !== 'undefined'`) pour les contextes Node (sanity CLI). `basePath` dans `sanity.config.ts` est ignoré par l'intégration (warning) → seul `studioBasePath` d'astro.config.mjs compte. Ne pas dupliquer le champ `language` de blogPost (posé par le plugin) ; studio exclu du sitemap (`filter`) + `Disallow: /studio` dans robots.txt (header `X-Robots-Tag: noindex` à ajouter en E10 côté Vercel) ; la config typegen vit dans `sanity.cli.ts` (clé `typegen`), le fichier séparé `sanity-typegen.json` est déprécié.
- **Alternatives** : studio repo séparé / dossier séparé sur son propre port (2 deploys, déconnecté du site) ; field-level partout (slugs non traduits) ; document-level partout (lourd pour coachs/témoignages).

### 2026-06-04 | E5 — Pages cœur : slugs EN partout, fallbacks CMS, contact fetch→Resend
- **Contexte** : E5 — construire les 7 pages prioritaires (Home, /dtv-visa, /stay-train, /classes, /fighters, /about, /contact) à partir des primitives E1–E4, sans toucher au thème, dataset Sanity encore vide.
- **Choix** :
  - **Slugs EN dans toutes les locales** (`/fr/dtv-visa`, pas `/fr/visa-dtv`) — Q "slugs traduits" du PRD §13 tranchée : gain SEO marginal vs coût (table de routing custom, LangSwitcher complexifié). Helper unique `localePath()` (`src/lib/routes.ts`) pour tous les liens internes ; paths stockés sans préfixe locale (site.ts, composants).
  - **Home = port fidèle de la maquette sur le thème verrouillé** — structure/layout/contenu de `WildCat Landing.html` reproduits avec les composants du design system (Satoshi/Fraunces + tokens), **zéro import de `landing.css`** (palette/typo divergentes). Motifs (DTV stamp) repris du styleguide en CSS scopé.
  - **`safeQuery()` + fallbacks statiques** (`src/lib/content.ts`) : toute requête Sanity passe par un try/catch → fallback sourcé des messages. Build toujours vert (dataset vide / projectId placeholder), pages publiables sans CMS. Exceptions volontaires : témoignages DTV/training (pas de fausse review en fallback) et fighters (état "coming soon" — pas de faux palmarès). **Seed du contenu via le Studio** (pas de script NDJSON : localeString/images pénibles à la main, et ça valide l'UX studio).
  - **Contact = API route `fetch` → Resend REST** (`src/pages/api/contact.ts`, `prerender = false` → seule serverless function du site). Pas de dépendance npm `resend`. Gardé par `RESEND_API_KEY` (absent : log serveur, UX intacte). Form natif POST (zéro JS pour soumettre), honeypot anti-spam, redirect 303 `?sent=1|error` ; bannières togglées par script inline (page statique = pas de query params au build). Pas d'Astro Action (PRD §8 spécifie `POST /api/contact`, et le no-JS reste complet).
  - **Maillage navigation** : les liens mega menu vers les clusters pas encore construits pointent **pillar + anchor le plus proche** (zéro 404 au lancement) ; Blog reste `#` jusqu'à E8 ; tarifs marketing (3 cards home/stay) vs **liste complète des prix publics** sur /classes#pricing (source unique `site.ts`, labels `pricing_label_*`).
  - **Pas de slider témoignages en E5** (PRD §10 listait TestimonialSlider) — quote statique, zéro island hors Nav. Carousel = plus tard si besoin réel.
- **Pièges notés** : titre/desc par page ET par locale via messages (`*_meta_title`/`_meta_desc`) ; JSON-LD SportsClub sur la home (horaires/adresse/sameAs depuis site.ts), FAQPage sur /dtv-visa, BreadcrumbList émis par `<Breadcrumb>` inline body (valide Google) ; parité messages vérifiée par one-liner node (466 clés EN = FR). PRD `/muay-thai-training` → slug maquette `/stay-train` : **redirect à poser en E7/E10**.
- **Alternatives** : slugs traduits FR (rejeté V1) ; SDK `resend` (inutile, fetch suffit) ; Astro Action (couplage JS) ; seed NDJSON `sanity dataset import` (sur-ingénierie pour ~10 documents).

### 2026-06-04 | CSS : styles globaux des titres dans `@layer base` (piège cascade Tailwind v4)
- **Contexte** : audit espacement post-E5 — les marges utilitaires posées sur les titres dans toutes les pages (`mt-2`, `mb-3`, `mb-7`…) calculaient à **0px**. Cause : le bloc canonique `.display/.h1/.h2/.h3 { margin: 0; … }` de `global.css` était **non-layéré**, et en CSS un style non-layéré gagne sur **toutes** les `@layer` — y compris `@layer utilities` de Tailwind v4. Les espacements écrits en E5 n'avaient jamais été rendus.
- **Choix** : bloc titres déplacé dans **`@layer base`** → les utilitaires (layer `utilities`, déclarée après) reprennent la main. Au passage : `Breadcrumb` en padding symétrique (`20px 0`) et top de `PageHero` réduit (`clamp(24px,3vw,44px)`) pour compenser.
- **Règle à retenir** : **jamais de style non-layéré sur des propriétés qu'on veut pouvoir ajuster en utilitaires Tailwind** (marges des titres typiquement). Le bug est silencieux : build vert, classe présente dans le HTML, marge à 0 au computed. Vérification rapide : `getComputedStyle` dans le navigateur. Les styles scopés Astro (non-layérés eux aussi) gagnent sur les utilitaires de la même façon — OK quand c'est voulu (ex. `.h1` de PageHero), piège sinon. `.wc-control` et `.em` restent non-layérés volontairement (jamais ajustés en utilitaires).

### 2026-06-04 | Silo About : page coaches dédiée (E-E-A-T), ancres réelles, Gallery différée
- **Contexte** : 4 liens sur 5 du mega menu About pointaient sur `/about` sans ancre (Story, Community, Gallery, Reviews — seul Coaches avait `#coaches`) → confusion "on arrive toujours sur la même page". Et les bylines "Meaw Boonpradub" (beginners + satellites DTV, Article/HowTo JSON-LD) n'avaient **aucune page auteur cible** — gap E-E-A-T identifié dans la SERP beginner (zéro auteur nommé chez les concurrents).
- **Choix** : **`/about/coaches`** = page équipe dédiée et **entité auteur canonique** (Person JSON-LD `#meaw`, bloc Meaw 100 % message-driven → jamais vide) ; les `author.url` des JSON-LD + bylines cliquables des 5 satellites + footer pointent dessus. **Reviews = ancre `#reviews` enrichie** sur `/about` (grille de tous les testimonials featured + CTA avis Google) — page dédiée seulement si volume d'avis. **Community = `#community`**. **Gallery retirée du menu** jusqu'à E9. L'ancre `#coaches` sur `/about` est conservée (teaser 3 cards + CTA) pour les liens legacy.
- **Hero photo** : variante ajoutée à `PageHero` (prop `image` + `eyebrow`, direction B du styleguide compactée à `clamp(360px,48vh,520px)`, gradient forest 76° + voile gold, contenu bottom-left) plutôt qu'un nouveau composant — évite la prolifération ; portée limitée à `/about` et `/about/coaches`. Breadcrumb reste au-dessus sur sa bande cream.
- **Alternatives rejetées** : page `/about/reviews` (pas de volume avis encore) ; `/gallery` anticipée (vit en E9) ; composant `PhotoHero` séparé (sur-ingénierie pour 2 pages).
- ⚠️ TODO(real data) : portrait de Meaw (hero-team.webp en attendant) ; lien direct onglet avis Google Business Profile (`site.reviews.googleUrl`).

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

### 2026-06-05 | Q5 — Domaine : **wildcatmuaythai.com**
- **Contexte** : trancher entre le placeholder maquette et `wildcatchiangmai.com` (PRD). Disponibilité vérifiée par RDAP le 2026-06-05 : les deux libres.
- **Choix** : **`wildcatmuaythai.com`** — identique au nom de marque (cohérence domaine = entité = JSON-LD SportsClub), dit l'activité (CTR SERP sur "muay thai chiang mai"), pas verrouillé sur la localisation (future-proof). La géo vit déjà dans les titles/copy/JSON-LD address/GMB.
- **Défensif** : acheter aussi `wildcatchiangmai.com` (~10 $/an) en redirect 301 (protection marque locale + typing direct).
- **Alternatives rejetées** : `wildcatmuaythaichiangmai.com` (28 ch, illisible) ; `wildcat-muaythai.com` (tirets spammy) ; `trainatwildcat.com` (campagne, pas domaine principal) ; `.co.th` (exige société enregistrée en Thaïlande — à revoir plus tard si pertinent).

### 2026-06-05 | Hero home : direction actuelle conservée
- Les explorations A/B/C/D2 du styleguide ont servi aux pages About ; pour la home, Jonathan garde le hero actuel (`hero-home.webp` + `.display` agrandi). Seule l'image pourra être remplacée par une version de meilleure qualité.

### 2026-06-05 | Blog E8 : **Astro Content Collections (.md)**, pas Sanity — renverse Q6/E4
- **Contexte** : la décision E4 (blogPost en document-level i18n Sanity) avait été prise avant de connaître le workflow de production réel : les articles sont produits en `.md` par le pipeline skills (`/seo-brief` → `/seo-write` → `/humanizer` → `/seo-enrich`), et Meaw n'écrira pas d'articles — le Studio n'apporte rien au blog.
- **Choix** : blog en **content collections** (`src/content/blog/{en,fr}/*.md`) — 1 article = 1 commit = 1 deploy (qui rafraîchit aussi le feed Instagram). Slugs traduits par fichier, appariement EN/FR par `translationKey` en frontmatter (alimente hreflang + LangSwitcher). Sanity garde son rôle : données vivantes gérées par Meaw (coaches, schedule, testimonials, fighters, scooters).
- **Alternative rejetée — push API vers Sanity** : faisable (`@sanity/client` Mutations + conversion MD → Portable Text + upload assets + documents `translation.metadata`), mais friction à vie : **Portable Text ne gère pas les tableaux nativement** (types custom + serializers) alors que le calendrier éditorial est bourré de comparatifs (M1, M5, M6), et chaque publication paierait la conversion pour un éditeur que personne n'utilise.
- **Conséquence (à exécuter en E8)** : retirer le schéma `blogPost`, les queries `BLOG_*`, le plugin `@sanity/document-internationalization` (seul blogPost l'utilise) + re-typegen (`npm run sanity:types`). Les pièges du plugin notés dans l'entrée E4 deviennent caducs pour le blog.

### 2026-06-07 | Motion : système data-animate maison + CSS scroll-driven — zéro GSAP
- **Choix** : scénographie scroll = **moteur maison** (`src/scripts/animations.ts` IntersectionObserver + `src/styles/motion.css`, attributs `data-animate`/`data-animate-stagger`/`data-animate-load`), zéro dépendance. Parallax guest book `/fighters` = **CSS scroll-driven natif** (`animation-timeline: view()`, gated `@supports` + reduced-motion + desktop) — GSAP écarté (rien ne demande pin/timeline ; le candidat DtvSteps écarté aussi, YMYL sobre).
- **Règles structurelles** (pièges payés, gravés dans le skill `/motion` v1.1) : transition CSS sur `.in-view` UNIQUEMENT (sur l'état caché, la pose de `wc-anim` déclenche un fade-out qui rend les reveals au load invisibles) · reveal synchrone = reflow forcé entre la pose de la classe racine et `.in-view` · `rootMargin -18%` (à -10% l'animation finit avant d'être visible) · heroes = chorégraphie dédiée au load (`data-animate-load`), jamais le fade-up de scroll · animation et transition `transform` jamais sur le même élément (2 wrappers : parallax dehors, reveal dedans) · cards à transform seedé (Coach/Fighter/quote) = wrapper, jamais l'attribut sur la racine.
- **Hidden-state gated par `html.wc-anim` posée par le script** : no-JS / reduced-motion / vieux navigateur = tout visible (jamais de `opacity:0` statique).

### 2026-06-07 | Loading screen home : intro scénographique vanilla (LoadingScreen)
- **Choix** : intro au load de la home (EN/FR) = **composant unique `src/components/interactive/LoadingScreen.astro`**, zéro lib — shape tigre remplie en liquide gold (clipPath + 2 vagues), « Wildcat » écrit en **vrai handwriting** (squelettes de ductus tracés à la main, masques SVG par lettre + `stroke-dashoffset`, `pathLength="1"`), sortie **keyhole** (`mask-composite: exclude`, le trou en forme de tigre grandit jusqu'à engloutir l'écran) ; à la révélation, l'entrée hero rejoue (remove/reflow/re-add `.in-view` sur `[data-animate-load]`).
- **Garde-fous** : 1 affichage par session (`sessionStorage`, prop `oncePerSession`) · reduced-motion = skip · no-JS = overlay masqué (`noscript`) · fallback zoom+fade si `mask-composite` non supporté · scroll lock pendant l'anim. Total ~4.3s (écriture pendant le remplissage).
- **Outillage** : squelettes itérés au screenshot via `tests/trace-spines.py` (mode `trace` = alignement, mode `mask` = coverage) + `tests/spines.txt` ; les franges résiduelles des masques sont mopées par un crossfade vers le fill complet en fin d'écriture. Variante A (outline draw) conservée dans le composant (`?v=a`), B = défaut. Page de test : `/home-test-loading` (noindex, hors sitemap, replay illimité).

### 2026-07-03 | Calendrier édito blog : `publishDate` futur = scheduling natif, aucun nouveau champ
- **Constat** : les 6 articles restants du cluster DTV-coûts sont sortis du pipeline `@content-creator`/`@article-producer` tous avec `publishDate` = jour de production (dump same-day), cassant la cadence cible (`cadence_blog: 6/mois`, `docs/seo-context.md`).
- **Décision** : pas de nouveau champ frontmatter ni de statut hub dédié. Le mécanisme existe déjà dans `src/lib/blog.ts` (`isVisible()`) : en PROD, `draft:false` + `publishDate` futur = article invisible (filtré de `getPostsByLang`/`getAlternates`/`getRelated`) jusqu'à la date, visible en dev pour review. Il suffit d'éditer `publishDate` dans le frontmatter du fichier déjà publié pour l'échelonner.
- **Découplage assumé** : le statut `published` du hub jlabs-content-hub trace l'avancement de production (article écrit/review/publié dans le repo), PAS la visibilité live sur le site — les deux ne doivent jamais être confondus. Un article peut être `status=published` au hub et invisible sur le site tant que son `publishDate` n'est pas atteint.
- **Alternative écartée** : ajouter un champ `scheduledDate` séparé — rejeté, redondant avec un champ qui fait déjà le travail et qui est le seul lu par `isVisible()`.

## 2026-07-19 — Modal WhatsApp au submit + forfaits long-stay sélectionnables

- **Constat** : soumettre un formulaire ouvrait WhatsApp *directement* dans un nouvel onglet (`window.open` dans `wa-form.ts`), en plus de l'email — brutal juste après un submit. Et Wildcat a 4 forfaits d'entraînement long-stay (DTV) qui n'existaient nulle part dans le code.
- **Décision (modal)** : au submit (JS actif), l'email part en fond puis un `<dialog>` in-site s'ouvre (aperçu du message + bouton « Envoyer sur WhatsApp »). WhatsApp ne s'ouvre plus qu'au clic. Le modal **remplace la redirection `?sent=1`** (on reste sur la page) ; la bannière `?sent=1` ne sert plus qu'au fallback no-JS. Helper partagé `wa-form.ts` → change les 2 forms d'un coup. Fallback `window.open` conservé si le modal manque.
- **Décision (forfaits)** : `site.pricing.longStay` (pack30 12 000 / pack50 17 000 / unlimited6 24 000 *populaire* / unlimited12 36 000), **coexiste** avec le pricing court-terme. Cartes via `LongStayPackages.astro` (réutilise `PricingCard`/`PricingTable` + prop `cols=4`) sur `/dtv-visa/long-stay-training`, `/classes#pricing`, `/stay-train#packages`. Sélection = cartes → deep-link `/contact?intent=dtv&package=<key>` → dropdown pré-rempli sur l'intent DTV. La page DTV long-stay lève sa doctrine « ne vend pas de package ».
- **Alternatives écartées** : (1) date-picker custom — demandé puis retiré par Jonathan, on garde les `input type="date"` natifs ; (2) dropdown package sur plusieurs intents — rattaché à DTV uniquement (ce sont des « DTV packages ») ; (3) modal + redirect banner — écarté, le modal EST la confirmation.

## Décisions EN ATTENTE (questions ouvertes restantes)

| # | Sujet | Options | Impact |
|---|-------|---------|--------|
| Q1 | **Storage DTV** | Google Drive API ⟷ Supabase Storage | ⏳ **Tranché avant E6.** On construit E1→E5 d'abord. |
| ~~Q5~~ | ~~Domaine~~ | **RÉGLÉE (2026-06-05)** : `wildcatmuaythai.com` + `wildcatchiangmai.com` en redirect défensif. Achat à faire. | — |
| ~~Q6~~ | ~~Slugs traduits~~ | ~~RÉGLÉE (E4) : blogPost document-level i18n~~ → **RENVERSÉE (2026-06-05)** : blog en content collections `.md`, slugs traduits par fichier + `translationKey` (cf. entrée du 2026-06-05). | — |

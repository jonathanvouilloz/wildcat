# E8 — Blog & contenu

**Complexité : M · Statut : EN COURS** — moteur DONE, M1 (4 articles EN + covers) DONE 2026-06-11, **M2 beginners (4 articles EN + covers) DONE 2026-06-13** (topical map `docs/topical-map-beginners.md`), **hub `/chiang-mai-guide` DONE 2026-06-13**

## Hub `/chiang-mai-guide` (2026-06-13)
Page éditoriale EN+FR qui **fusionne les 2 entrées maquette** (Chiang Mai Guide + Things to Do, menu Stay & Train) en UNE page hub à voix Wildcat. **PAS un pilier SEO** (head terms tourisme non-winnables, hors positionnement) : vitrine du cluster blog `chiang-mai-life` (feed `getPostsByCategory` + empty-state) + relais conversion Stay & Train / DTV. Sections : intro famille, getting around (FeatureGrid), saisons & burning season (différenciateur), où voir du Muay Thai (dark → `/fighters`), **Nos recos** (placeholder Meaw, rien d'inventé → checklist I7), feed blog, CtaBanner. JSON-LD `CollectionPage`, hreflang symétrique. Câblage : Nav mega (2→1) + drawer + Footer (`exploreLinks`), helper `getPostsByCategory` (`src/lib/blog.ts`), 53 clés `cmg_*` EN+FR + retrait `nav_stay_todo_*`. Fix UI post-revue : sections soft→cream autour des raccords scratch + divider `wave`→`rough` (le brush/divider cream ne doit pas jouxter une section soft). Recherche Reddit archivée : `.seo-data/reddit/reddit-chiang-mai-*.txt` (3 threads → angles M4). ⏳ recos réelles de Meaw (checklist §I7), photo hero paysage CM (`photos-needed.md` #9, placeholder `background-hero.webp`).

## Description
Moteur de blog SEO alimentant les silos (technique, Chiang Mai living, visa/long-stay).

> **Calendrier éditorial complet : `docs/structure-blog.md`** (2026-06-05, data-driven —
> 6 mois × 6 clusters × 24 articles + réserve, verdicts rapport Kimi, garde-fous
> cannibalisation, pipeline de production, **i18n & stack §7**). ⚠️ Contrainte saisonnière :
> l'article burning season (M4) doit être en ligne **avant décembre** — intervertir M4 ↔ M2
> si E8 démarre tard.

> **Stack tranchée (2026-06-05, `DECISIONS.md`) : Astro Content Collections (.md), pas
> Sanity.** Renverse Q6/E4 — production via pipeline skills (1 article = 1 commit = 1 deploy),
> Portable Text inadapté (tableaux), Meaw hors scope blog.

## Tâches

### Moteur
- [ ] Collection `blog` (`src/content/blog/{en,fr}/*.md`, loader glob) + schéma zod : `title`, `description`, `publishDate`, `updatedDate`, `category`, `cover`, `draft`, **`translationKey`** (appariement EN/FR)
- [ ] `/blog` index (liste, filtres par catégorie)
- [ ] `/blog/[slug]` (rendu markdown, TOC, maillage vers pillar) + `.prose` typographique
- [ ] Catégories alignées sur les clusters du calendrier : choosing-a-camp, beginners, benefits, chiang-mai-life, visa, culture (`structure-blog.md` §4)
- [ ] Composants article : auteur (byline Meaw → `/about/coaches`), date, temps de lecture, partage, articles liés

### i18n (slugs traduits — voir `structure-blog.md` §7.3)
- [ ] **Prop optionnelle `alternates`** sur `BaseLayout` (override du calcul symétrique des hreflang) — alimentée par lookup `translationKey` dans la collection. **Jamais de hreflang vers une 404** : sans traduction FR → `en` + `x-default` seulement
- [ ] **`LangSwitcher`** : même mécanisme, fallback → `/{lang}/blog` (index) si pas de traduction
- [ ] RSS **par locale** : `/en/blog/rss.xml` + `/fr/blog/rss.xml` (`@astrojs/rss`)

### SEO
- [ ] Schema `BlogPosting` : `inLanguage` obligatoire, `author.url` → Person `#meaw` (pattern `classes/beginners.astro`), dates depuis le frontmatter (lié à E7)
- [ ] Nav/Footer : remplacer le lien Blog `#` (placeholder depuis E5)

### Nettoyage Sanity (conséquence de la décision stack)
- [ ] Retirer le schéma `blogPost` (`sanity/schemaTypes/`) + queries `BLOG_*` (`src/lib/queries.ts`)
- [ ] Retirer le plugin `@sanity/document-internationalization` (seul blogPost l'utilise) + dépendance npm
- [ ] Re-typegen : `npm run sanity:types` (commit `sanity.types.ts`)

## Décisions techniques
- Stack + alternative rejetée (push API Sanity / Portable Text) : `docs/DECISIONS.md` entrée 2026-06-05.
- Process éditorial EN/FR (transcréation, mini-batch kw FR location 2250, garde-fous) : `structure-blog.md` §7.2.

## Notes / edge cases
- Chaque article remonte vers son pillar (Train / Stay & Train / DTV) — maillage localisé : article FR → pages FR via `localePath()` ; blog→blog FR seulement si la traduction existe.
- FR sélectif (3/24 au lancement) : un article EN sans FR est le cas NORMAL, pas une erreur de parité — la règle "parité messages" ne s'applique pas au contenu blog (seulement à l'UI du moteur : labels, catégories, byline → messages Paraglide).

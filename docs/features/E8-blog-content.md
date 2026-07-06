# E8 — Blog & contenu

**Complexité : M · Statut : EN COURS** — moteur DONE, M1 (4 articles EN + covers) DONE 2026-06-11, **M2 beginners (4 articles EN + covers) DONE 2026-06-13** (topical map `docs/topical-map-beginners.md`), **hub `/chiang-mai-guide` DONE 2026-06-13**, **cluster DTV-coûts COMPLET 2026-07-03 (7/7 articles publiés, échelonnés dans le calendrier édito)**

## Etat session 2026-07-03 (suite — cluster DTV-coûts complet + calendrier)

**Fait :**
- **6 articles restants du cluster produits et publiés** via `@content-creator` mode CLUSTER (A1 solo en premier car sous-hub de maillage, puis A3/A4/A5 vague 1 + A6/A7 vague 2 en parallèle, 3 workers max) : `dtv-visa-cost-breakdown`, `cheapest-dtv-soft-power-activity`, `dtv-vs-tourist-visa-runs-cost`, `dtv-visa-agent-worth-it`, `dtv-visa-proof-of-funds`, `dtv-visa-refund-if-rejected`. **Cluster 7/7 complet.**
- **1 tour de révision brief** (A1 — `brief-critic` FAIL round 1 : manquait un scan SERP réel malgré un kw à volume mesurable ; scan fait par sub-agent WebSearch/WebFetch → PASS round 2). Les 5 autres briefs PASS direct ou avec notes mineures seulement.
- **2 corrections factuelles trouvées par `/seo-sources` en cours de production** : (1) écoles de langue thaïe retirées de la liste soft power DTV officielle en 2025 (A3 réécrit en comparatif 2 activités au lieu de 3, `docs/dtv-fact-check.md` #15 + `docs/topical-map-dtv-costs.md` mis à jour) ; (2) contradiction concurrentielle stocks/crypto comme proof of funds (A6) tranchée via Siam Legal International (source institutionnelle non-niche) faute de source MFA directement fetchable.
- **Passe de cohérence (maillage retour)** : liens de repli reposés en dur une fois les cibles publiées — A1→A3/A5 (absents) + A1→A4 (pointait par erreur vers `/dtv-visa/long-stay-training`), A5→A7, A7→A6, et **A2 (déjà publié)** dont les 2 repli `/dtv-visa`/`/dtv-visa/muay-thai` ont été complétés par des liens réels vers A1/A3. Build vérifié après coup (`npm run build` vert, 50 pages).
- **Mesure aval** : `seo_reports` persistés (competitor/backlink/ai_visibility) — domaine trop jeune pour du ranking (0 keyword classé, 0 backlink API), 7 mentions qualitatives trouvées (dont 1 fiche Foursquare obsolète "Now Closed" à corriger), score visibilité IA baseline 4/100 (2-10) — normal, concurrents à surveiller : nowmuaythai.com, topmuaythai.com, dangmuaythai.com.
- **Calendrier édito** : les 6 articles avaient tous `publishDate` = jour de production (dump same-day). Réétalés sur 3 semaines (A1+A5 aujourd'hui, A3 le 07-08, A4 le 07-11, A6 le 07-16, A7 le 07-18) via le mécanisme natif `src/lib/blog.ts` (`isVisible` : `draft:false` + `publishDate` futur = invisible en PROD, visible en dev) — pas de nouveau champ, juste le frontmatter. Respecte l'ordre stratégique du topical map (trio transparence A1→A2→A5, puis comparatifs A3→A4, puis deep-dives A6→A7) et évite les dates déjà prises par le cluster M1/M2 (07-07/07-10/07-14).

**Prochain :** poser les backlinks descendants silo→blog recommandés par le topical map (`/dtv-visa` → A1, `/dtv-visa/eligibility` → A6, `/dtv-visa/long-stay-training` → A1, `/dtv-visa/muay-thai` → A2) — pas fait cette session (hors périmètre strict de la demande, listé en「Backlinks silo → blog à poser」dans `docs/topical-map-dtv-costs.md`). Sinon : cluster DTV-coûts terminé, prochain cluster = calendrier `structure-blog.md` (M1-M6) ou nouveau `/seo-topical-map` sur un sujet frais.

**Pièges :**
- **`isVisible()` (`src/lib/blog.ts`) = mécanisme de scheduling natif** : `publishDate` futur + `draft:false` suffit à différer la mise en ligne sans toucher au statut hub. Le hub (`status=published`) ne reflète que l'avancement de production, PAS la visibilité live — les deux sont découplés, ne pas confondre.
- **`/seo-serp` et `/seo-ai-visibility`/`/seo-backlinks` (volet qualitatif) nécessitent WebSearch/WebFetch** que `@content-creator` (orchestrateur) n'a pas nativement — déléguer à un `general-purpose` agent à chaque fois (pattern déjà utilisé cette session, à refaire).
- **Cannibalisation A6 vs `/dtv-visa/eligibility`** et **A1 vs `/dtv-visa/long-stay-training`** : lignes de démarcation strictes déjà posées dans le topical map, respectées par tous les workers cette session sans dérapage détecté.
- Reste de la session précédente (toujours valable) : liens blog SANS préfixe locale, YMYL fact-check via `docs/dtv-fact-check.md`, BULK jamais SOLO répété.

**Commit :** (à faire — voir proposition de commit ci-dessous)

## Etat session 2026-07-03

**Fait :**
- **Topical map cluster DTV-coûts** (`docs/topical-map-dtv-costs.md`) : 7 articles blog catégorie `visa` (jeu GEO/information-gain, 0/mo mais Reddit + citation IA), garde-fous anti-cannibalisation stricts du silo `/dtv-visa`. Absorbe M5.4 de `structure-blog.md`.
- **Article A2 publié** : « Are Muay Thai Gyms Overcharging for DTV Papers? » (`src/content/blog/en/muay-thai-gym-dtv-overcharging.md`, EN-only, YMYL) via `@content-creator` SOLO.
- **Fix site title ≠ H1** : le template E8 rendait `<h1>{title}</h1>` = `<title>` (violation Critical seo-review sur les 14 articles). Champ `h1` ajouté au schéma + template `{h1 ?? title}` + backfill des 14. Build vert, vérifié dans le HTML compilé.
- **Skill `/seo-sources` créé** (`~/.claude/skills/`, hors repo) : fetch réel WebFetch + triple-statut, seul un `Confirmé` devient un lien. Inséré dans `@article-producer` Étape 3 (après humanizer, avant enrich) → hérité par `@content-creator` BULK. Rattrapage fait sur A2 (3 sources officielles vérifiées + sidecar).

**Prochain :** lancer le **BULK complet** sur les 6 articles restants (A1, A3, A4, A5, A6, A7) via `@content-creator` en mode CLUSTER, depuis les mini-briefs de `docs/topical-map-dtv-costs.md`. Ordre reco : A1 d'abord (sous-hub, les autres le maillent). Une fois A1/A3 publiés, reposer les liens retour dans A2 (actuellement repli sur `/dtv-visa`, cf. topical map §maillage).

**Pièges :**
- **Convention BULK, jamais SOLO répété** (contexte rechargé à chaque article, ~33 min/article en SOLO). Cf. mémoire `wildcat-blog-pipeline-standards`.
- **Liens blog SANS préfixe locale** (`/blog/…`, jamais `/en/blog/…` = 404) — les workers se trompent, normaliser à chaque batch.
- **A1/A3 encore inexistants** : A2 linke `/dtv-visa` en repli. Ne pas créer de liens morts vers `/blog/dtv-visa-cost-breakdown` tant qu'A1 n'est pas publié.
- **YMYL** : fact-check obligatoire (`docs/dtv-fact-check.md`), `/seo-sources` gère la vérif — âge DTV = 20 ans (jamais 18), règle 6 mois = pratique pas loi.
- **Changements skills/agents hors repo wildcat** (`~/.claude/`) : `/seo-sources` + wiring `@article-producer` ne sont pas dans l'historique git du site.

**Commit :** [e9b031d] feat(blog): topical map DTV-coûts + article A2 « gyms overcharging DTV » (+ [9b545a2] fix title≠H1)

## Carte du code
> Mise à jour : 2026-07-03

| Fichier | Rôle |
|---------|------|
| `src/content.config.ts` | Schéma zod collection `blog` — champ `h1` optionnel (distinct du `title`) ajouté 2026-07-03 |
| `src/pages/[lang]/blog/[slug].astro` | Template article — rend `<h1>{post.data.h1 ?? post.data.title}</h1>` (fallback title) ; `<title>` + JSON-LD `headline` restent sur `title` |
| `src/lib/blog.ts` | Helpers collection (`getPostsByLang`/`getAlternates`/`getRelated`/`getPostsByCategory`) — `isVisible()` = mécanisme de scheduling édito (draft + publishDate futur → invisible en PROD, visible en dev) |
| `docs/topical-map-dtv-costs.md` | Contrat de production du cluster DTV-coûts (7 mini-briefs A1-A7 + maillage + cannibalisation) — mis à jour 2026-07-03 (correction langue school retirée du soft power 2025) |
| `docs/dtv-fact-check.md` | Fact-check YMYL du silo DTV — #15 mis à jour 2026-07-03 (soft power activities 2025-2026, retrait langue) |
| `src/content/blog/en/dtv-visa-cost-breakdown.md` | A1 — sous-hub du cluster coût, publié en premier (bloquant le fan-out) |
| `src/content/blog/en/{cheapest-dtv-soft-power-activity,dtv-vs-tourist-visa-runs-cost,dtv-visa-agent-worth-it,dtv-visa-proof-of-funds,dtv-visa-refund-if-rejected}.md` | A3/A4/A5/A6/A7 — satellites du cluster, `publishDate` échelonné 07-08→07-18 |
| `~/.claude/skills/seo-sources/SKILL.md` | (hors repo) Vérif sources réelles + citations, Étape 3 de `@article-producer` |

### Décisions clés
- **title ≠ H1 = règle Critical**, câblée côté site via le champ frontmatter `h1` (pas via le skill — les skills l'imposaient déjà). Tout futur article DOIT avoir un `h1` distinct (produit par `/seo-enrich`).
- **Cluster DTV-coûts = jeu GEO**, pas volume (kw à 0/mo, sauf quelques kw confirmés type "thailand border run" 50/mo). Sources externes vérifiées obligatoires (YMYL) via `/seo-sources`.
- **Scheduling édito = frontmatter `publishDate` uniquement**, pas de nouveau champ ni de changement de statut hub. Le hub trace la production, le markdown gouverne la mise en ligne réelle.

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

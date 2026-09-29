# E8 — Blog & contenu

**Complexité : M · Statut : EN COURS** — moteur DONE, M1 (4 articles EN + covers) DONE 2026-06-11, **M2 beginners (4 articles EN + covers) DONE 2026-06-13** (topical map `docs/topical-map-beginners.md`), **hub `/chiang-mai-guide` DONE 2026-06-13**, **cluster DTV-coûts COMPLET 2026-07-03 (7/7 articles publiés, échelonnés dans le calendrier édito)**, **article news DTV 31/08/2026 publié 2026-08-27**

## Etat session 2026-09-29 (revue SEO complète + plan Q4)

**Données :** GSC 31/08→27/09 : 5 452 impr (+42 % vs août), 122 clics, pos 13,0 ; pic semaine du 24/08 (article news DTV) puis décrue. Indexation : **33/61 URLs** (18 crawled-not-indexed dont le pilier `/dtv-visa`, 7 inconnues dont `/en/classes/beginners`). Cannibalisation 3 mois : aucun vrai conflit (résidus slash, marque) ; « muay thai camp thailand » servi par le listicle et non `/stay-train`. Mongkhon / self-defense : fin de lune de miel mi-septembre (position stable, impressions effondrées). Spam update Google en cours depuis le 24/09.

**Fait :** fusion `/dtv-visa/faq` + `/dtv-visa/muay-thai` → pilier `/dtv-visa` (301) ; refresh listicle camps (régions, tableau, prix vérifiés), mongkhon, self-defense, cost, visa EN/FR (TDAC, taxe 450 THB, TM.7), burning EN/FR, DTV requirements ; `/stay-train` recentré Chiang Mai ; FAQ home +2 PAA ; `<lastmod>` sitemap blog ; **7 articles Q4 produits et programmés** (06/10 → 15/12, détail `docs/editorial-calendar.md` §Q4 2026).

**Prochain :** poser le maillage entrant de chaque article le jour de sa sortie (table dans le calendrier) ; relire GSC après le 15/10.

**Pièges :** le content-creator est tombé (limite d'usage) après les specs : les workers ont été relancés à la main, `/seo-review` non exécuté sur les 7 articles (lint OK, sources re-vérifiées par un passage dédié). Ne jamais lier un article programmé avant sa date (404 en prod). Lanternes Yi Peng interdites à Hang Dong (règles 2025, Thaiger) : écrit dans l'article du 06/10. Racine du problème d'indexation = autorité (backlinks), pas le code.
**Prochain (détail) :** le 06/10, ouvrir `docs/editorial-calendar.md` §Q4 « Maillage entrant » et ajouter les liens vers `best-time-train-muay-thai-thailand` depuis `burning-season-chiang-mai`, `chiang-mai-vs-phuket-muay-thai`, `thailand-visa-guide-by-training-length` ; idem à chaque date suivante.
**Commit :** [c586a8f] feat(blog): 7 articles Q4 2026 programmés (06/10 → 15/12) + calendrier Q4 (+ [63331f6] revue SEO 29/09 : fusion DTV, refresh, lastmod)

---

## Etat session 2026-09-14 (review SEO + actualité visa 31/08 et 15/09 + quick wins GSC)

**Données :** snapshot GSC 16/08→12/09 (`.seo-data/gsc-wildcat-2026-09-14.json`) : 6 079 impr (×3,4 vs période précédente), 145 clics, pos 10,0. Moteurs : article news DTV (1 780 impr), mongkhon (910), best camps (1 409).

**Fait :**
- **Silo `/dtv-visa` corrigé pour le 31/08/2026** (EN+FR) : dépôt uniquement dans le pays de nationalité ou de résidence légale (fin de la route « pays voisin »), certificat de casier judiciaire requis. ~25 clés réécrites (faq, how-to-apply, eligibility, muay-thai, faqp), nouvelle clé `dtv_apply_doc_criminal` (checklist → 11 documents + `HowToSupply`), quiz Q5 : pays voisin / depuis la Thaïlande passent en **red**. Dates de revue → septembre 2026.
- **Exemption de visa 30 j au 15/09/2026** : `stay_faq_a6`, `best-muay-thai-camps-thailand` (section visa), `dtv-vs-tourist-visa-runs-cost` **réécrit** (TR 60+30 inchangé vs exemption 30+30, 2 entrées terrestres/an, tableau de rentabilité recalculé, breakeven 4–6 mois). ⚠️ `dtv_mt_tbl_validity_tourist` (60+30) est **juste** : il décrit le visa TR, pas l'exemption.
- **Article news `dtv-visa-new-requirements-2026` mis à jour** (`updatedDate` 14/09) : title « New DTV Rules & Changes 2026 », règle transitoire publiée, nuance permanent vs legal resident, H2 sur les 30 jours, FAQ DTV holders, sources TAT + ISSA Compass.
- **Quick wins CTR** : titles + metas `muay-thai-headband-mongkhon` (réponse directe en 1re phrase), `muay-thai-self-defense` (+FAQ kickboxing vs muay thai), `dtv_lst_meta_*` (offre 28 000 THB).
- **`/seo-refresh` best-muay-thai-camps-thailand** : prix alignés `site.ts` (350 / 5 000 / 28 000), H2 all-inclusive + FAQ, visa à jour. Historique : `content/_history/best-muay-thai-camps-thailand.json`.

**Backlog articles (review du 14/09, volumes DataForSEO US) :** EN « training in Thailand after the 30-day rule » (thailand visa exemption 110, 90-day tourist visa 170, 60-day visa exemption review 210) + FR (visa thailande 8 100, visa touristique thailande 720) · Yi Peng / Loy Krathong 23–25/11 (chiang mai lantern festival 2026 1 600, yi peng chiang mai 260 diff 12) **en ligne début octobre** · reliquat calendrier septembre (4.4 watch fights, R1 taekwondo, R2 karate, 4.3 digital nomad).

## Etat session 2026-08-27 (article news — nouvelles exigences DTV du 31/08/2026)

**Fait :**
- **Article EN hors calendrier publié** : `src/content/blog/en/dtv-visa-new-requirements-2026.md` (catégorie `visa`, ~2 880 mots, `publishDate` = jour même, pas d'étalement — c'est une news à 4 jours de l'entrée en vigueur). Déclencheur : annonce de l'**ambassade royale de Thaïlande à Vientiane du 27/08/2026** (deux exigences DTV supplémentaires applicables **mondialement au 31/08/2026** : être national ou résident permanent du pays de dépôt + certificat de casier judiciaire).
- **Recherche de corroboration menée à fond, et négative** : aucune autre mission thaïe (Vientiane EN/TH, Londres, KL, Jakarta, Kota Bharu), ni le portail e-Visa, ni la presse (Thaiger, Nation, Bangkok Post, Pattaya Mail) n'avait publié de formulation équivalente au moment d'écrire. La seule pièce est l'annonce elle-même. **L'article l'assume explicitement** (section « What is still unclear » + note de bas d'article) — obligatoire en YMYL.
- **Angle trouvé par la recherche** : au **04/08/2026**, Singapour était la *seule* ambassade à restreindre le DTV à ses nationaux/résidents (source `petchnumnoi`, breakdown par pays). Le 31/08 cette exception devient la règle → **la route « ambassade voisine » (Vientiane, Savannakhet) se ferme**. C'est ce qui touche les élèves Muay Thai, qui décident souvent de rester *après* être arrivés à Chiang Mai. Le casier judiciaire, lui, n'est qu'un problème de calendrier (tableau ACRO / FBI / bulletin n°3 / AFP / RCMP / Führungszeugnis / VOG avec délais).
- **Nuance apostille trouvée** : la Thaïlande a déposé son adhésion à la Convention de La Haye le 30/06/2026 mais **l'entrée en vigueur est au 28/02/2027** → d'ici là c'est la légalisation consulaire à l'ancienne. Personne d'autre n'aura ce détail.
- **Cover produite par le pipeline du projet, sans IA** : preset `blog-cover` de `visual/presets.yaml` (`source: template` → fond branded `visual/refs/blog-cover-bg.webp` + titre en overlay PIL Satoshi-Bold, zéro appel API), via `python -m cli --project <repo> --preset blog-cover --slug <slug> --title-text "<title>"` depuis `~/.claude/skills/generate-images/scripts`. Rendu identique au set existant.
- **Conformité vérifiée contre les 7 autres articles DTV** : frontmatter complet (title 43 car., `h1` ≠ `title`, description 158, tldr 5, cover + coverAlt), structure H2 → FAQ H3 → Conclusion → CTA → Sources → note italique, **0 em-dash**, 8 liens internes tous résolus contre `dist/`, `og:image` résolu. `npm run build` ✅.

**Prochain :** **corriger le silo DTV, qui est maintenant faux.** `/dtv-visa/how-to-apply` et `/dtv-visa/faq` (clés `dtv_apply_*` / `dtv_faqp_*` dans `messages/{en,fr}.json`) affirment encore qu'on peut déposer sa demande dans n'importe quelle ambassade hors Thaïlande — c'est caduc au 31/08/2026. Repasser aussi `/dtv-visa/eligibility` et `/dtv-visa/muay-thai` au filtre « où déposer », ajouter le casier judiciaire à la liste de documents, et pointer l'article news depuis le silo. ⚠️ YMYL : mettre `docs/dtv-fact-check.md` à jour dans la foulée (nouvelle entrée datée), et **ne pas durcir plus que l'annonce ne le dit** (ce qu'elle ne précise pas est listé dans l'article).

**Pièges :**
- **26 images inline du blog cassées en prod** (trouvaille annexe, pré-existante) : les articles référencent `/images/blog/{slug}-{n}.webp` mais `public/images/` ne contient que `content/` (4 fichiers). Vérifié : ni sur disque, ni dans git, ni gitignoré, ni dans `dist/`. Le preset `blog-inline` sort bien vers `public/images/blog` mais il est `source: gemini` → **bloqué sur une clé API absente**, donc porté au puits de tâches de Jonathan. Le nouvel article n'a volontairement aucune image inline, il n'aggrave rien.
- **Un article news ne s'étale pas** : `publishDate` = jour même, contrairement à la convention `isVisible()` du calendrier édito. Ne pas « corriger » ça en le repoussant.
- **Aucune citation inventée** : les autres articles du site attribuent des verbatims à Meaw. Ici la voix Wildcat passe par une section « Our take » à la première personne du pluriel, sans guillemets — une citation de Meaw doit venir d'elle.
- **La cover ne prend pas le titre du frontmatter automatiquement** en mode single : sans `--title-text`, `_derive_cover_texts()` fabrique un titre depuis le slug (majuscules, année strippée). Toujours passer `--title-text` avec le `title` réel.

**Commit :** [b4ba83b] feat(blog): article EN sur les nouvelles exigences DTV du 31 août 2026

---

## Etat session 2026-07-16 (fix cannibalisation « coût »)

**Fait :**
- **Audit `/seo-cannibalisation` complet** sur `sc-domain:wildcatmuaythai.com` (GSC 15/04→14/07, `--min-impressions 2`, marque écartée) → **1 seul vrai conflit de contenu vivant** sur tout le site. Rapport + verdicts A/B/C écrits dans `.seo-data/cannibalisation-wildcatmuaythai-com-2026-04-15_to_2026-07-14.json`.
- **Conflit Type B désambiguïsé** : le blog `/blog/muay-thai-training-thailand-cost` (pos 67) et `/dtv-visa/long-stay-training` (pos 87) se battaient sur « cost of muay thai training in thailand » (titles jumeaux, silos `/blog` vs `/dtv-visa`). Fix doctrine (différenciation + maillage croisé, **pas de 301**) : blog garde le « coût générique » ; page DTV **re-scopée « budget long séjour SUR DTV »** — `dtv_lst_meta_title` / `hero_title` / `hero_title_em` / `intro_title` réécrits EN+FR + **2 nouvelles clés** `dtv_lst_costguide_line`/`_link`.
- **Lien retour DTV → blog ajouté** (`long-stay-training.astro`, après p1, **EN-only** car blog EN-only → `p('/fr/blog…')` = 404). Sens blog → DTV existait déjà (article L147).
- **Bonus** : 3 liens frères cassés dans l'article cost (`/chiang-mai-vs-{phuket,bangkok}-muay-thai` **sans `/blog`** → 404) corrigés.
- **Vérifs** : parité messages **1530=1530**, `npm run build` vert (47 pages), HTML compilé conforme (title/H1 EN neufs, lien blog présent EN / absent FR).

**Prochain :** rien de bloquant sur ce fix (mesure aval = re-run `/seo-cannibalisation` dans ~3-4 sem. après réindexation, le conflit doit disparaître). Backlog E8 inchangé : backlinks descendants silo→blog (topical-map DTV-coûts), puis prochain cluster (`structure-blog.md` M1-M6) — ⚠️ **burning season M4 avant décembre**.

**Pièges :**
- **3 conflits « écartés » de l'audit ≠ à corriger** : 2 Triades SERP légitimes (silo DTV FR ; head term « dtv visa » où agent pos 2 / how-to pos 9 cartonnent) + 1 faux positif (image `_astro` + sa page). Résidus infra **parqués** : home http/https, trailing-slash `/fr/dtv-visa/` (canonical + `trailingSlash:'never'` → self-heal).
- **Fantôme `muay-thai-for-women` = artefact calendrier**, pas une suppression : `draft:false` + `publishDate:2026-07-30` → 404 temporaire, **se republie seul le 30/07**. Aucune 301.
- **Lien service → blog** = `localePath(lang, '/blog/…')` (préfixe `/en`), à ne PAS confondre avec les liens **dans** le markdown blog qui s'écrivent `/blog/…` sans locale (rehype préfixe). Blog EN-only → tout cross-link service→blog doit être gardé `lang === 'en'`.

**Commit :** [3e988ca] fix(seo): re-scope /dtv-visa/long-stay-training on DTV long-stay budget (anti-cannibalisation vs blog cost guide)

---

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
> Mise à jour : 2026-09-29

| Fichier | Rôle |
|---------|------|
| `src/pages/[lang]/dtv-visa.astro` | Pilier DTV unique depuis la fusion du 29/09 (BLUF, soft power, table DTV/ED/Tourist `#compare`, FAQ 33 Q `#faq` + seul FAQPage du silo) |
| `astro.config.mjs` | 301 `/dtv-visa/{faq,muay-thai}` → `/dtv-visa` ; `blogLastmodMap()` → `<lastmod>` sitemap des articles depuis le frontmatter |
| `messages/{en,fr}.json` | Clés pilier DTV (`dtv_*`, `dtv_mt_*`, `dtv_faqp_*`, `dtv_update_*`), `stay_meta_*` recentrés Chiang Mai, FAQ home `faq_q6/q7` + `faq_l6` |
| `src/pages/[lang]/index.astro` | FAQ home : 2 PAA ajoutées (combats à Chiang Mai → `/fighters`, âge → `/classes/beginners`) |
| `src/components/sections/Nav.astro` | Mega menu + drawer DTV re-pointés sur `/dtv-visa#compare` et `#faq` |
| `src/content/blog/en/best-muay-thai-camps-thailand.md` | Porteur de la tête « muay thai camp(s) thailand » (refresh régions + tableau 11 camps, prix vérifiés 29/09) |
| `src/content/blog/{en,fr}/*` (7 nouveaux) | Articles Q4 programmés par `publishDate` (06/10 → 15/12) ; briefs/specs dans `content/_drafts/blog/` |
| `src/lib/blog.ts` | `isVisible()` : `publishDate` futur = invisible en prod, sortie par le rebuild quotidien (GitHub Actions `scheduled-rebuild.yml`, runs OK) |
| `docs/editorial-calendar.md` | §Q4 2026 : planning, maillage entrant à poser à chaque sortie, refresh planifiés, réserve T1 2027 |
| `.seo-data/q4-2026/` + `gsc-wildcat-2026-09-29.json`, `index-…-2026-09-29.json`, `cannibalisation-…-2026-07-01_to_2026-09-27.json` | Données de la revue du 29/09 (SERP réelles, autocomplete, veille actu datée) |

### Décisions clés
- **title ≠ H1 = règle Critical** (champ frontmatter `h1`).
- **Scheduling = `publishDate` uniquement** ; un article news sort le jour même. Jamais de lien vers un article programmé avant sa date.
- **Covers = template `blog-cover`**, `--title-text` = title réel.
- **« muay thai camp thailand » = le listicle**, `/stay-train` = « muay thai camp chiang mai » (arbitrage SERP 29/09).
- **Silo DTV à 4 pages** (pilier, eligibility, how-to-apply, long-stay-training) : ne pas recréer de satellite sur une intention déjà couverte par le blog.
- **Pas de DataForSEO** tant que les crédits sont vides : volumes historiques `.seo-data/keywords-*.json` + autocomplete + SERP réelles.

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

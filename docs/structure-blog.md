# Structure — Calendrier éditorial Blog (E8)

> **Stratégie de contenu du 2026-06-05** — data-driven (agrégation de **toute** la data projet :
> 34 clusters DataForSEO US/UK/FR des batchs E5b/c/f + 16 nouveaux clusters de validation du
> rapport Kimi = **575 keywords ≥ 10/mo dédupliqués**).
> Source data : `.seo-data/keywords-*.json` · Étude de marché qualitative : `docs/report-kimi.md`
> (verdicts §1) · Moteur blog : `docs/features/E8-blog-content.md` · **i18n & stack : §7**.

---

## 0. Philosophie du blog (règles tranchées par Jonathan, 2026-06-05)

1. **La longue traîne se gagne au volume d'articles, pas au volume par article.** Un kw à
   10/mo vaut un article ultra-spécialisé : top 1 dessus = tout bonus, et chaque article
   ramène sa propre traîne invisible. C'est la différence blog vs pillar — les pillars visent
   les grosses têtes, le blog ratisse tout le reste.
2. **Seuls les vrais 0/mo sont écartés** — et encore : on cherche d'abord une **alternative
   par comparaison** ("X vs Y" marche bien sur Google et c'est facile à produire).
3. **Cluster par cluster, mois par mois.** Chaque mois = une seule catégorie de contenu,
   pour construire l'autorité topique bloc par bloc (et simplifier la production en batch).
4. **Zéro cannibalisation des pillars** : chaque article cible des intents que les pages
   service ne couvrent pas, et remonte vers son pillar (cf. garde-fous §2).

**Cadence cible : 4 articles/mois (1/semaine), 24 articles sur 6 mois** + réserve (§5).
EN-first ; FR seulement où la data FR le justifie (colonne FR des tableaux).

---

## 1. Verdict sur le rapport Kimi (`docs/report-kimi.md`)

Le rapport vaut ~30 % : bon mapping d'intentions, mais **zéro donnée keyword** et écrit sans
connaître le site. Vérification DataForSEO (16 clusters) :

| Reco du rapport | Verdict data | Sort |
|---|---|---|
| Hub DTV "opportunité n°1" | ✅ mais **déjà fait** (E5b, 6 pages) | Renfort blog M5 (angles ED/durées/assurance) |
| Burning season (angle "sous-exploité") | ✅✅ **~900/mo cumulé, diff 6** | 🏆 M4 — meilleure trouvaille du rapport |
| Récits transformation / perte de poids | ✅ benefits 210 + weight loss 170 + transformation 90, diff 0 | M3 entier |
| Comparaison Chiang Mai vs Phuket | ✅ via le générique (210+110), exact muay thai = 0 | M1 (règle alternative-comparaison) |
| Guide débutant ultime | ✅ mais le gros est **déjà fait** (`/classes/beginners` 1000/mo) | Blog = longue traîne restante (M2) |
| Assurance muay thai | ⚠️ 10/mo | 1 article M5 (règle 10/mo) — pas le comparatif affilié du rapport |
| Santé mentale + données scientifiques | ⚠️ 10/mo | 1 article M3 — ⚠️ vérifier l'étude NCBI avant de citer |
| Digital nomad Chiang Mai | ⚠️ 50/mo — le vrai volume du cluster ("thailand digital nomad visa" 1000) **= le DTV qu'on capte déjà** | 1 article M4, pas un silo |
| Nutrition, prévention blessures, "best time" | ❌ 0-20/mo en dédié | Fusionnés ou réserve (§5) |
| Pages produit bootcamp / coaching privé | ❌ hors offre Wildcat + invalidé E5c (0 vol) | Ne pas faire |
| Lead magnets PDF + email marketing | ❌ hors scope V1 (PRD) | Ne pas faire |
| ⚠️ Ses chiffres (étude 21,93 %, "30 % moins cher", budgets THB) | Non sourcés vérifiables | Fact-check avant citation (process `dtv-fact-check.md`) |

---

## 2. Garde-fous cannibalisation — keywords DÉJÀ possédés par des pages

Le blog **ne cible jamais** ces têtes de cluster (il peut les mentionner et linker) :

| Keyword (vol/mo) | Page propriétaire |
|---|---|
| muay thai camp thailand (1900) + camp/stage muay thai thailande FR (210/140) | `/stay-train` |
| beginner muay thai classes (1000) | `/classes/beginners` |
| muay thai classes/gym chiang mai (590/260) | `/classes` |
| dtv visa thailand (1600) + requirements/application/how-to/faq | silo `/dtv-visa/*` |
| muay thai visa (140) | `/dtv-visa/muay-thai` |
| long stay muay thai training thailand | `/dtv-visa/long-stay-training` |
| scooter rental chiang mai (210) | `/stay-train/scooter-rental` |

Règle de routage : intent **transactionnel/service** → pillar · intent **informationnel/
comparatif/curiosité** → blog, avec CTA et maillage vers le pillar du silo.

---

## 3. Calendrier éditorial — 6 mois, 6 clusters, 24 articles

> "M1…M6" = mois de production relatifs (E8 pas encore daté). **Contrainte saisonnière
> absolue : le M4 (burning season) doit être en ligne avant décembre** — les recherches
> explosent janv-mars. Si E8 démarre tard, intervertir M4 ↔ M2.
> Vol. = volume du kw principal (cumul cluster entre parenthèses). Tous diff ≤ 25 sauf mention.

### M1 — Cluster « Choisir son camp » (décision · pillar cible : `/stay-train`)

| # | Article (kw principal) | Vol. | Angle / notes | FR |
|---|---|---|---|---|
| 1.1 | **Best muay thai camps in Thailand** | 70 (~300) | Listicle honnête incluant les concurrents (Tiger, Sinbi, Lanna, Santai, Dang…) — Wildcat assume sa place "family camp Chiang Mai". + "all inclusive muay thai camps" (140), "…for beginners", "…reddit" | ✅ "meilleurs camps muay thai thailande" — angle listicle ≠ page service FR |
| 1.2 | **Chiang Mai vs Phuket (for muay thai)** | 210+110 (~400) | Le "vs muay thai" exact = 0 → on prend le générique voyage + sections muay thai. Tableau comparatif §8.1 du rapport réutilisable. Gap SERP E5f : prix transparents | optionnel |
| 1.3 | **Chiang Mai vs Bangkok (for muay thai)** | 390+170 | Comparaison facile, même squelette que 1.2. + "is chiang mai cheaper than bangkok" (20) | — |
| 1.4 | **How much does muay thai training in Thailand really cost?** | 40 (~200) | Budget mensuel complet (training+logement+vie) avec vrais prix THB — garde-fou : les prix packages restent sur `/stay-train#packages`, l'article = coût de la vie informationnel. + "muay thai camp thailand price" (30), "1 month price", "tiger muay thai prices" (20) | ✅ "stage boxe thaï thaïlande prix" (140) |

### M2 — Cluster « Beginners » (TOFU · pillar cible : `/classes/beginners`)

| # | Article | Vol. | Angle / notes | FR |
|---|---|---|---|---|
| 2.1 | **Muay thai gear for beginners (what to bring to camp)** | 260 (~500) | "beginner muay thai gloves" (260) + "best beginner gloves" (50) + "muay thai shorts thailand" (170). Rappel : Wildcat prête gants+bandes (fait vérifié ✅) → checklist packing | — |
| 2.2 | **Can you learn muay thai at home?** | 260+90 | Réponse honnête (oui pour les bases, non pour le reste) → CTA camp. "muay thai training at home" + "how to learn muay thai at home" | — |
| 2.3 | **Muay thai stance & basic moves explained** | 4400 (!) + 170 | "muay thai stance" 4400/mo + "beginner basic moves" (170, déjà backlog) + "drills" (50). Global informational — autorité topique ; vidéos E9 plus tard | — |
| 2.4 | **Muay thai for women** | 390 (~480) | + "benefits for female" (30), "before and after female" (30), "camp thailand women" (10). E5c avait invalidé une *page locale* (0 vol) — l'article *global* est solide. Angle woman-run camp (Meaw, E-E-A-T) | — |

### M3 — Cluster « Benefits & transformation » (pillar cible : `/classes/beginners` + `/stay-train`)

| # | Article | Vol. | Angle / notes | FR |
|---|---|---|---|---|
| 3.1 | **Muay thai benefits (body & mind)** | 210 (~400) | Hub du cluster : + "is muay thai good for fitness/workout" (50+50), "how effective" (50), "good for self defense" (480 → teaser vers 6.4) | — |
| 3.2 | **Muay thai for weight loss** | 170 (~250) | + "weight loss camp thailand" (30), "before and after" (20), "vs boxing/kickboxing for weight loss" (10s). Pas de page "bootcamp" (hors offre) — article informationnel → packages | — |
| 3.3 | **Muay thai & mental health** | 10 | Article spécialisé règle-10/mo. L'angle science du rapport Kimi — ⚠️ retrouver et vérifier l'étude NCBI 2024 avant de citer les % | — |
| 3.4 | **Real muay thai transformations (1-3 months at camp)** | 90 (~200) | "muay thai body transformation" (90) + "before and after" (50) + "3 months transformation" (10). Récits guests réels → maillage `/fighters` (guest book) + testimonials | — |

### M4 — Cluster « Vivre & planifier Chiang Mai » (pillar : `/stay-train` + `/dtv-visa/long-stay-training`) ⚠️ SAISONNIER

> **Pillar/hub du cluster : `/chiang-mai-guide`** (créé 2026-06-13) — page éditoriale qui
> agrège ce cluster (feed `chiang-mai-life` + empty-state) et relaie vers Stay & Train / DTV.
> Les articles M4 doivent **mailler retour** vers ce hub.
>
> **Matière de recherche Reddit** (`.seo-data/reddit/reddit-chiang-mai-*.txt`, 3 threads) pour
> nourrir les angles `chiang-mai-life` : sanctuaires d'éléphants **éthiques** (le débat
> riding/bathing = angle honnêteté fort), cuisine **Lanna** (khao soi, sai ua, nam prik vs menus
> touristes), day trips (Doi Inthanon, sticky waterfalls, Mon Jam, Chiang Rai temples), getting
> around (songthaew 30฿, Grab, scooter), burning season (warnings récurrents), scams (tuk-tuk/
> karaoke = à éviter dans un guide honnête).

| # | Article | Vol. | Angle / notes | FR |
|---|---|---|---|---|
| 4.1 | **Burning season in Chiang Mai: the honest guide (+ training tips)** | 260 (~900 !) | 🏆 "burning season thailand" (480) + "air quality chiang mai" (590) + "…2026" (110) + "when is…" (90). Aucun camp n'en parle = différenciateur honnêteté. **En ligne avant décembre.** Refresh annuel (le kw migre vers l'année suivante) | — |
| 4.2 | **Best time of year to train muay thai in Thailand** | ~0 → alternatif | Kw exact 0 → angle saisons/comparaison : capte "chiang mai in january/march burning season" (10s ×8) + PAA. Grille saisons §8.3 du rapport réutilisable. Lien fort vers 4.1 | — |
| 4.3 | **Digital nomad guide: train muay thai & work remote in Chiang Mai** | 50 (~180) | + "coworking space chiang mai" (90) + apartment/accommodation (10s). Le gros volume du cluster (visa 1000/mo) appartient au silo DTV → maillage massif vers `/dtv-visa` | — |
| 4.4 | **Where to watch muay thai fights in Chiang Mai** | 90 (~350) | Déjà backlog. "chiang mai muay thai fights" (90) + stadium (50) + Thapae (40) + Kalare (70) + Loi Kroh (90) + "tonight" (10). Guide local + maillage `/fighters` ("nos guests y combattent") | — |

### M5 — Cluster « Visa & long stay » (renfort silo `/dtv-visa` — angles NON couverts par les 6 pages)

| # | Article | Vol. | Angle / notes | FR |
|---|---|---|---|---|
| 5.1 | **ED visa vs DTV for muay thai** | 720 (~800) | "ed visa thailand" (720) + "muay thai ed visa" (20) + "education visa" (20). La table 3-visas existe sur `/dtv-visa/muay-thai` — l'article approfondit le côté ED (obligations, coûts, comparatif détaillé) et conclut DTV pour les ≥ 6 mois | ✅ à valider (mini-batch FR avant brief) |
| 5.2 | **How long can you train in Thailand? (visa par durée de séjour)** | ~50 cumul | Roundup par durée : 2 sem (exemption) / 90 j / 6 mois / 1 an+ — "3 month muay thai visa", "90 day", "1 year muay thai training in thailand" (10s). Distributeur vers tout le silo | — |
| 5.3 | **Does travel insurance cover muay thai?** | 10 | Règle-10/mo. Prudent : pas de comparatif affilié, juste "les polices standard excluent souvent les sports de combat, vérifiez X, Y" + FAQ. YMYL : sourcer | — |
| 5.4 | **Muay thai visa costs (tous visas confondus)** | ~40 cumul | "muay thai visa cost/price" (10+10) + "dtv visa thailand cost" (20+40). Tableau récap honnête frais officiels vs agences | — |

### M6 — Cluster « Culture & comparaisons » (autorité topique · maillage `/fighters` + `/about`)

| # | Article | Vol. | Angle / notes | FR |
|---|---|---|---|---|
| 6.1 | **Wai kru ram muay explained** | 260 (~330) | + "meaning" (10), "dance" (20), "music" (10). E-E-A-T culture, photos réelles du camp/des fights guests | — |
| 6.2 | **The mongkhon & pra jiad (muay thai headband)** | 590 | "muay thai headband" 590/mo — facile, culturel, images. Compagnon de 6.1 | — |
| 6.3 | **Muay thai vs kickboxing** | 2900 | La plus grosse comparaison du dataset. Diff probablement faible (informational global). Squelette réutilisable pour toute la série "vs" | — |
| 6.4 | **Is muay thai good for self defense?** | 480 (~590) | + "street fighting" (110). Ferme la boucle ouverte en 3.1 | — |

---

## 4. Pipeline de production (par article)

1. `/seo-serp` sur le kw principal (seulement les têtes de mois, pas les 10/mo)
2. `/seo-brief` → brief dans `content/_drafts/blog/`
3. `/seo-write` → `/humanizer` → `/seo-enrich` (BlogPosting JSON-LD, byline Meaw → Person `#meaw`)
4. `/seo-review` — puis publication via Sanity `blogPost` (document-level i18n : EN seul OK,
   FR seulement colonne FR validée)
5. Maillage **bidirectionnel** : l'article pointe son pillar, et le pillar/satellite gagne un
   lien retour (section "From the blog" ou inline)

Pré-requis dev (E8, avant M1) : `/blog` index + `[slug]` + `.prose` + RSS + catégories.
Proposition de catégories Sanity alignées sur les clusters : `choosing-a-camp`,
`beginners`, `benefits`, `chiang-mai-life`, `visa`, `culture`.

---

## 5. Réserve (M7+ / opportuniste)

- **Muay thai vs karate** (590) · **vs taekwondo** (880) · vs boxing — suite de la série 6.3
- **What muay thai fighters eat** — nutrition (10-20) + "fighters diet plan for cutting weight" (30)
- **A day in the life of a thai boxer** — storytelling pur (0 kw, brand/social)
- **Guest stories** série longue — 1 récit/guest marquant du livre d'or (conversion, zéro SEO)
- **Khao soi & where to eat near the camp** — si E9 apporte les photos
- FR : "apprendre le muay thai en thailande" (10), "stage muay thai thailande débutant" (10) —
  si les versions FR M1 performent en GSC
- Refresh annuel : 4.1 (burning season 20XX), 1.1 (best camps 20XX), prix (1.4/5.4)

## 6. Ce qu'on ne fera PAS (et pourquoi)

- ❌ Articles dupliquant les pillars (guide DTV complet, "stay and train chiang mai", budget
  packages) — cannibalisation, cf. §2
- ❌ Page/article "bootcamp perte de poids" ou "coaching privé" en transactionnel — offre
  inexistante + data E5c (0 vol local)
- ❌ Lead magnets PDF + newsletter — hors scope V1 (PRD), à revoir post-E10
- ❌ Comparatif d'assurances avec liens affiliés — YMYL, hors positionnement ; on reste factuel (5.3)
- ❌ Cadence 2×/semaine du rapport Kimi — 1/semaine en batch mensuel est tenable et suffit

---

## 7. i18n EN/FR & stack technique

### 7.1 Stack tranchée (2026-06-05) : Astro Content Collections, pas Sanity

> Décision complète et alternative rejetée (push API + Portable Text) : `docs/DECISIONS.md`
> entrée 2026-06-05. Renverse Q6/E4 — le schéma `blogPost` Sanity sera **retiré en E8**.

- **`src/content/blog/{en,fr}/*.md`** — frontmatter zod : `title`, `description`,
  `publishDate`, `updatedDate`, `category` (6 clusters §4), `cover`, `draft`,
  **`translationKey`** (slug stable commun EN/FR qui apparie les traductions)
- **Slugs traduits par fichier** : `/en/blog/burning-season-chiang-mai` ↔
  `/fr/blog/saison-des-brulis-chiang-mai`
- **Production = pipeline skills tel quel** : `/seo-enrich` produit le `.md` final →
  commit → deploy. Zéro conversion, tableaux markdown natifs, covers via `generate-cover`
  + `astro:assets`
- Sanity reste pour les données vivantes de Meaw (coaches/schedule/testimonials/fighters/scooters)

### 7.2 Process éditorial FR — transcréation, jamais traduction littérale

EN-first ; FR uniquement pour la colonne FR validée par la data (3/24 au lancement :
1.1 listicle, 1.4 coût, 5.1 ED vs DTV). Pour chaque article FR :

1. **Mini-batch `/seo-keywords` FR** (location France **2250**, language fr) → le *vrai* kw FR.
   Ex. 1.4 : EN "muay thai training thailand cost" → FR **"stage boxe thaï thaïlande prix"
   (140/mo)** — pas une traduction, un autre mot-clé
2. **H1 + structure propres** au kw FR (pas calqués sur l'EN)
3. **Adaptation** : devises (€/THB), exemples localisés (ambassades Paris/Bruxelles pour le
   DTV, pas "your local embassy"), angle FR "réservation directe sans marge d'agence"
   (gap SERP identifié en E5f)
4. **Garde-fous** : jamais de claim "accueil en français" (équipe anglophone, règle E5f) ·
   jargon non sur-traduit (muay thai, clinch, DTV, drop-in restent tels quels) ·
   cannibalisation : 1.1 FR ne vise pas "camp muay thai thailande" (possédé par `/stay-train` FR)
5. **Boucle de décision** : si les 3 FR performent en GSC (`/seo-weekly`) → élargir la
   colonne FR ; sinon on reste EN-first sans coût

### 7.3 Technique — état des lieux (audit 2026-06-05) et ce que E8 doit câbler

**Déjà en place, rien à refaire pour les pages** : hreflang EN/FR + `x-default`→EN
(`BaseLayout.astro`), sitemap i18n (`@astrojs/sitemap`, `xhtml:link` auto), canonical,
`og:locale`/`og:locale:alternate`, slot `jsonld`, robots.txt. Quick wins appliqués le
2026-06-05 : `geo` + `priceRange` (dérivé de `site.pricing`) sur le SportsClub,
`inLanguage` sur FAQPage/HowTo, filtre sitemap `/api/`.

**⚠️ Le piège slugs traduits (à résoudre en E8, AVANT le premier article)** :
`BaseLayout` et `LangSwitcher` calculent l'URL alternée en strippant le préfixe locale —
ils **supposent des paths symétriques**. Vrai pour toutes les pages service (slugs EN
partout via `localePath()`), **faux pour le blog** (slugs traduits). Sans correctif, les
hreflang des articles pointeraient vers des 404. À câbler :

- **Prop optionnelle `alternates`** (`{lang, href}[]`) sur `BaseLayout` qui override le
  calcul symétrique — alimentée au build par un lookup `translationKey` dans la collection
- **`LangSwitcher`** : même mécanisme ; fallback → `/{lang}/blog` (index) si pas de traduction
- **Règle absolue : jamais de hreflang vers une 404.** Article sans traduction FR =
  hreflang `en` + `x-default` seulement
- **BlogPosting JSON-LD** : `inLanguage` obligatoire, `author.url` → Person `#meaw`
  (pattern `classes/beginners.astro`), `datePublished`/`dateModified` depuis le frontmatter
- **RSS par locale** : `/en/blog/rss.xml` + `/fr/blog/rss.xml` (`@astrojs/rss`)
- **Maillage localisé** : article FR → pages FR via `localePath()` (toutes existent,
  parité complète) ; blog→blog FR seulement si l'article FR existe, sinon remonter au
  pillar FR du silo

---

## 8. Annexe data — clusters agrégés (575 kws ≥ 10/mo, dédup)

Top têtes de cluster **disponibles pour le blog** (hors kws possédés §2) :

| Keyword | Vol/mo | Cluster source |
|---|---|---|
| muay thai stance | 4400 | beginner |
| muay thai vs kickboxing | 2900 | benefits/comparaisons |
| muay thai vs taekwondo | 880 | comparaisons (réserve) |
| ed visa thailand | 720 | visa |
| muay thai headband (mongkhon) | 590 | culture |
| muay thai vs karate | 590 | comparaisons (réserve) |
| air quality chiang mai | 590 | burning season |
| is muay thai good for self defense | 480 | benefits |
| burning season thailand | 480 | burning season |
| chiang mai vs bangkok | 390 | comparaisons destinations |
| muay thai for women | 390 | beginners/femmes |
| chiang mai burning season | 260 | burning season |
| wai kru ram muay | 260 | culture |
| beginner muay thai gloves | 260 | gear |
| muay thai training at home | 260 | beginners |
| chiang mai vs phuket | 210 | comparaisons destinations |
| muay thai benefits | 210 | benefits |
| muay thai weight loss | 170 | transformation |
| beginner muay thai basic moves | 170 | beginners |
| muay thai shorts thailand | 170 | gear |
| chiang mai or phuket | 110 | comparaisons destinations |
| muay thai chiang mai fights | 90 | local/stades |
| muay thai body transformation | 90 | transformation |
| best muay thai camps in thailand | 70 | listicle |
| kalare boxing stadium | 70 | local/stades |
| digital nomad chiang mai | 50 | nomad |
| muay thai mental health | 10 | transformation (règle 10/mo) |
| muay thai travel insurance | 10 | visa/pratique (règle 10/mo) |

Écartés (vrais ~0, sans alternative trouvée) : "best time to train muay thai in thailand" (0,
remplacé par l'angle saisons 4.2) · "muay thai injury prevention" (0, fusionné réserve nutrition)
· "chiang mai vs phuket muay thai" exact (0, remplacé par le générique 1.2).

Données complètes : `.seo-data/keywords-*.json` (50 fichiers) — agrégation rejouable :
script inline (dédup par volume max), cf. historique session 2026-06-05.

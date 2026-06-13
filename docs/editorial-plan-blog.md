# Plan éditorial Blog — Wildcat Muay Thai

> **Généré le 2026-06-11** — Décisions validées par Jonathan le 2026-06-11.
> Source data : `docs/structure-blog.md` (agrégation 575 kws, 50 fichiers `.seo-data/`).
> Moteur blog : `docs/features/E8-blog-content.md`.

---

## Décisions de session (2026-06-11)

| Question | Décision |
|---|---|
| Article 5.5 (assurance spéciale camp muay thai) | Intégré en **M5** dans le cluster Visa (ajouté comme 5.5) |
| Article 4.3 (digital nomad) | Section "cost of living" **intégrée dans 4.3 élargi** — pas d'article séparé |
| Article "Gym DTV pricing" | **Réserve M7+** — hors des 6 mois planifiés |

---

## Règles éditoriales (rappel)

1. **10/mo = article OK** — chaque kw ≥ 10/mo mérite un article ultra-spécialisé.
2. **Zéro cannibalisation pillars** — le blog cible les intents informationnels, pas transactionnels (cf. garde-fous ci-dessous).
3. **Cluster par cluster, mois par mois** — autorité topique construite bloc par bloc.
4. **EN-first** — FR seulement où la data DataForSEO FR le justifie.
5. **Contrainte saisonnière absolue : M4 (burning season) en ligne avant décembre.**

### Keywords possédés — le blog ne cible jamais ces têtes

| Keyword (vol/mo) | Page propriétaire |
|---|---|
| muay thai camp thailand (1900) | `/stay-train` |
| beginner muay thai classes (1000) | `/classes/beginners` |
| muay thai classes/gym chiang mai (590/260) | `/classes` |
| dtv visa thailand (1600) + tout le silo | `/dtv-visa/*` |
| muay thai visa (140) | `/dtv-visa/muay-thai` |
| long stay muay thai training thailand | `/dtv-visa/long-stay-training` |
| scooter rental chiang mai (210) | `/stay-train/scooter-rental` |

---

## M1 — Cluster "Choisir son camp"

Pillar cible : `/stay-train`

| # | Slug proposé | Keyword principal | Vol/mo | Diff | Priorité | Angle unique | Maillage |
|---|---|---|---|---|---|---|---|
| 1.1 | `best-muay-thai-camps-thailand` | best muay thai camps in Thailand | 70 (~300 cluster) | ≤15 | Haute | Listicle honnête incluant concurrents (Tiger, Sinbi, Lanna, Santai, Dang) — Wildcat assume sa place "family camp Chiang Mai". Couvre "all inclusive muay thai camps" (140), "…for beginners", "…reddit". | `/stay-train`, `/classes`, `/fighters` |
| 1.2 | `chiang-mai-vs-phuket-muay-thai` | chiang mai vs phuket | 210+110 (~400) | ≤20 | Haute | Le kw "vs muay thai" exact = 0 → angle voyage+sections muay thai. Tableau comparatif. Gap SERP : prix transparents. | `/stay-train`, `/classes/beginners` |
| 1.3 | `chiang-mai-vs-bangkok-muay-thai` | chiang mai vs bangkok | 390+170 (~570) | ≤20 | Haute | Même squelette que 1.2 — facile à produire en batch. Couvre "is chiang mai cheaper than bangkok" (20). | `/stay-train`, `/classes` |
| 1.4 | `muay-thai-training-thailand-cost` | how much does muay thai training in Thailand cost | 40 (~200 cluster) | ≤15 | Haute | Budget mensuel complet (training+logement+vie) avec vrais prix THB. Informatif seulement — les prix packages restent sur `/stay-train#packages`. Couvre "muay thai camp thailand price" (30), "1 month price", "tiger muay thai prices" (20). | `/stay-train#packages`, `/classes#pricing`, `/stay-train/scooter-rental` |

**FR validé :** 1.1 ("meilleurs camps muay thai thailande") + 1.4 ("stage boxe thaï thaïlande prix" — 140/mo, kw FR propre, pas traduction de l'EN).

---

## M2 — Cluster "Beginners"

Pillar cible : `/classes/beginners`

| # | Slug proposé | Keyword principal | Vol/mo | Diff | Priorité | Angle unique | Maillage |
|---|---|---|---|---|---|---|---|
| 2.1 | `muay-thai-gear-beginners` | muay thai gear for beginners | 260 (~500 cluster) | ≤15 | Haute | Checklist packing : Wildcat prête gants+bandes (fait vérifié). Couvre "beginner muay thai gloves" (260), "best beginner gloves" (50), "muay thai shorts thailand" (170). | `/classes/beginners`, `/stay-train` |
| 2.2 | `learn-muay-thai-at-home` | can you learn muay thai at home | 260+90 (~350) | ≤10 | Haute | Réponse honnête (oui pour les bases, non pour le reste) → CTA camp. Couvre "muay thai training at home" + "how to learn muay thai at home". | `/classes/beginners`, `/classes` |
| 2.3 | `muay-thai-stance-basic-moves` | muay thai stance | 4400 + 170 | ≤20 | Très haute | Kw le plus volumineux du dataset blog. Informationnel global — autorité topique. Couvre "stance" (4400), "beginner basic moves" (170), "drills" (50). Vidéos E9 en complément ultérieur. | `/classes/beginners`, `/classes` |
| 2.4 | `muay-thai-for-women` | muay thai for women | 390 (~480 cluster) | ≤15 | Haute | E5c avait invalidé une page locale (0 vol) — l'article global est solide. Angle woman-run camp (Meaw, E-E-A-T). Couvre "benefits for female" (30), "before and after female" (30), "camp thailand women" (10). | `/classes/beginners`, `/stay-train`, `/about/coaches` |

**FR :** pas de colonne FR validée en M2 (data FR insuffisante, à réévaluer après GSC M1).

---

## M3 — Cluster "Benefits & transformation"

Pillar cible : `/classes/beginners` + `/stay-train`

| # | Slug proposé | Keyword principal | Vol/mo | Diff | Priorité | Angle unique | Maillage |
|---|---|---|---|---|---|---|---|
| 3.1 | `muay-thai-benefits` | muay thai benefits | 210 (~400 cluster) | ≤15 | Haute | Hub du cluster. Couvre "is muay thai good for fitness/workout" (50+50), "how effective" (50), "good for self defense" (480 → teaser vers 6.4). | `/classes`, `/classes/beginners` |
| 3.2 | `muay-thai-weight-loss` | muay thai for weight loss | 170 (~250 cluster) | ≤15 | Haute | Pas de page "bootcamp" (hors offre) — article informationnel → packages. Couvre "weight loss camp thailand" (30), "before and after" (20), "vs boxing/kickboxing for weight loss" (10s). | `/stay-train#packages`, `/classes` |
| 3.3 | `muay-thai-mental-health` | muay thai mental health | 10 | ≤10 | Moyenne | Règle-10/mo. Angle science (étude NCBI 2024). ⚠️ Retrouver et vérifier l'étude avant de citer les pourcentages. | `/classes`, `/classes/beginners` |
| 3.4 | `muay-thai-transformation-camp` | muay thai body transformation | 90 (~200 cluster) | ≤10 | Haute | Récits guests réels. Couvre "body transformation" (90), "before and after" (50), "3 months transformation" (10). Maillage guest book. | `/fighters`, `/stay-train`, `/classes` |

**FR :** pas de colonne FR validée en M3.

---

## M4 — Cluster "Vivre & planifier Chiang Mai"

Pillar cible : `/stay-train` + `/dtv-visa/long-stay-training` — **SAISONNIER : en ligne avant décembre**

| # | Slug proposé | Keyword principal | Vol/mo | Diff | Priorité | Angle unique | Maillage |
|---|---|---|---|---|---|---|---|
| 4.1 | `burning-season-chiang-mai` | burning season Chiang Mai | 260 (~900 cluster !) | 6 | Critique | Aucun camp ne l'aborde = différenciateur honnêteté. Couvre "burning season thailand" (480), "air quality chiang mai" (590), "…2026" (110), "when is…" (90). **En ligne avant décembre.** Refresh annuel (kw migre vers l'année suivante). | `/stay-train`, `/dtv-visa/long-stay-training`, `/classes` |
| 4.2 | `best-time-train-muay-thai-thailand` | best time to train muay thai in Thailand | ~0 → alternatif saisons | ≤10 | Haute | Kw exact = 0 → angle saisons/comparaison. Capte "chiang mai in january/march burning season" (10s ×8) + PAA. Lien fort vers 4.1. | `/stay-train`, `4.1` |
| 4.3 | `digital-nomad-train-muay-thai-chiang-mai` | digital nomad Chiang Mai + muay thai | 50 (~180 cluster) | ≤15 | Haute | **Section "cost of living" intégrée ici** (loyer condos, co-working, nourriture, transports). Le gros volume du cluster (visa 1000/mo) appartient au silo DTV → maillage massif vers `/dtv-visa`. Couvre "coworking space chiang mai" (90), logement (10s). | `/dtv-visa`, `/dtv-visa/long-stay-training`, `/stay-train` |
| 4.4 | `watch-muay-thai-fights-chiang-mai` | where to watch muay thai fights Chiang Mai | 90 (~350 cluster) | ≤15 | Haute | Guide local honnête. Couvre "chiang mai muay thai fights" (90), "stadium" (50), "Thapae" (40), "Kalare" (70), "Loi Kroh" (90), "tonight" (10). Maillage "/fighters" — "nos guests y combattent". | `/fighters`, `/stay-train`, `/about` |

**FR :** pas de colonne FR validée en M4 (burning season EN = kw principal ; variante FR quasi nulle).

---

## M5 — Cluster "Visa & long stay"

Pillar cible : silo `/dtv-visa` — angles NON couverts par les 6 pages existantes

| # | Slug proposé | Keyword principal | Vol/mo | Diff | Priorité | Angle unique | Maillage |
|---|---|---|---|---|---|---|---|
| 5.1 | `ed-visa-vs-dtv-muay-thai` | ED visa vs DTV for muay thai | 720 (~800 cluster) | ≤20 | Très haute | La table 3-visas existe sur `/dtv-visa/muay-thai` — l'article approfondit le côté ED (obligations, coûts, comparatif détaillé) et conclut DTV pour les ≥ 6 mois. Couvre "ed visa thailand" (720), "muay thai ed visa" (20), "education visa" (20). | `/dtv-visa/muay-thai`, `/dtv-visa`, `/dtv-visa/how-to-apply` |
| 5.2 | `how-long-can-you-train-thailand-visa` | how long can you train in Thailand (visa par durée) | ~50 cumul | ≤10 | Haute | Roundup par durée : 2 sem (exemption) / 90j / 6 mois / 1 an+. Couvre "3 month muay thai visa", "90 day", "1 year muay thai training in thailand" (10s). Distributeur vers tout le silo DTV. | `/dtv-visa`, `/dtv-visa/eligibility`, `/dtv-visa/long-stay-training` |
| 5.3 | `muay-thai-travel-insurance` | does travel insurance cover muay thai | 10 | ≤10 | Moyenne | Règle-10/mo. Prudent : pas de comparatif affilié, juste "les polices standard excluent souvent les sports de combat, vérifiez X, Y" + FAQ. YMYL : sourcer chaque claim. | `/dtv-visa/long-stay-training`, `/stay-train` |
| 5.4 | `muay-thai-visa-costs` | muay thai visa costs (tous visas confondus) | ~40 cumul | ≤10 | Haute | Tableau récap honnête frais officiels vs agences. Couvre "muay thai visa cost/price" (10+10), "dtv visa thailand cost" (20+40). | `/dtv-visa`, `/dtv-visa/how-to-apply`, `/dtv-visa/muay-thai` |
| 5.5 | `muay-thai-camp-insurance-what-to-know` | travel insurance muay thai camp | 10 | ≤10 | Moyenne | Angle spécifique camp vs usage général. Complément de 5.3 : couvre les cas "training accident at camp", équipement loué, évacuation médicale Chiang Mai. YMYL : sources officielles uniquement. | `5.3`, `/stay-train`, `/classes` |

**FR :** 5.1 à valider via mini-batch `/seo-keywords` FR avant brief (kw FR propre "ed visa thaïlande muay thai" à confirmer).

---

## M6 — Cluster "Culture & comparaisons"

Pillar cible : `/fighters` + `/about`

| # | Slug proposé | Keyword principal | Vol/mo | Diff | Priorité | Angle unique | Maillage |
|---|---|---|---|---|---|---|---|
| 6.1 | `wai-kru-ram-muay-explained` | wai kru ram muay | 260 (~330 cluster) | ≤15 | Haute | E-E-A-T culture, photos réelles du camp et des fights guests. Couvre "meaning" (10), "dance" (20), "music" (10). | `/fighters`, `/about`, `/classes` |
| 6.2 | `muay-thai-headband-mongkhon` | muay thai headband (mongkhon) | 590 | ≤15 | Haute | Article culturel facile, fort volume, images. Compagnon de 6.1 — même moment dans le pipeline. | `/fighters`, `6.1`, `/classes` |
| 6.3 | `muay-thai-vs-kickboxing` | muay thai vs kickboxing | 2900 | ≤20 | Très haute | Plus grosse comparaison du dataset. Squelette réutilisable pour toute la série "vs". Informationnel global. | `/classes`, `/classes/beginners` |
| 6.4 | `muay-thai-self-defense` | is muay thai good for self defense | 480 (~590 cluster) | ≤15 | Haute | Ferme la boucle ouverte en 3.1. Couvre "street fighting" (110). | `/classes`, `/classes/beginners`, `3.1` |

**FR :** pas de colonne FR validée en M6.

---

## Réserve M7+

Articles déplacés ou ajoutés en attente selon performances GSC :

| Slug pressenti | Keyword | Vol/mo | Note |
|---|---|---|---|
| `gym-dtv-pricing-chiang-mai` | gym + DTV pricing chiang mai | ~20-40 | **Décision 2026-06-11 : M7+**. Trop proche du silo DTV existant, risque cannibalisation à surveiller sur GSC avant de lancer. |
| `muay-thai-vs-karate` | muay thai vs karate | 590 | Suite série 6.3 |
| `muay-thai-vs-taekwondo` | muay thai vs taekwondo | 880 | Suite série 6.3 |
| `muay-thai-vs-boxing` | muay thai vs boxing | ~200 | Suite série 6.3 |
| `muay-thai-fighters-diet` | what muay thai fighters eat | 10-30 | Nutrition + cutting weight |
| `day-in-the-life-thai-boxer` | (brand/social) | ~0 | Storytelling pur, zéro SEO direct |
| `best-food-near-muay-thai-camp-chiang-mai` | khao soi + local food | ~50 | Si E9 apporte les photos camp |
| Refresh annuel | 4.1 / 1.1 / 1.4 / 5.4 | — | Burning season 20XX, best camps 20XX, prix actualisés |
| FR expansion | "apprendre muay thai en thailande" (10), "stage muay thai thaïlande débutant" (10) | 10+10 | Seulement si 3 articles FR M1 performent en GSC |

---

## Ce qu'on ne fait pas

- Articles dupliquant les pillars (guide DTV complet, "stay and train chiang mai", budget packages) — cannibalisation §garde-fous.
- Page/article "bootcamp perte de poids" ou "coaching privé" transactionnel — offre inexistante + data E5c (0 vol local).
- Lead magnets PDF + newsletter — hors scope V1 (PRD), à revoir post-E10.
- Comparatif d'assurances avec liens affiliés — YMYL, hors positionnement ; on reste factuel (5.3 + 5.5).
- Cadence 2×/semaine — 1/semaine en batch mensuel est tenable et suffisant.

---

## Pipeline de production (par article)

1. `/seo-keywords` sur le kw principal si données manquantes (surtout pour les kws FR)
2. `/seo-serp` sur la tête de mois (SERP scan + gap analysis)
3. `/seo-brief` → brief dans `content/_drafts/blog/`
4. Checkpoint utilisateur (validation brief)
5. `/seo-write` → `/humanizer` → `/seo-enrich` (BlogPosting JSON-LD, byline Meaw → Person `#meaw`)
6. `/seo-review` → publication `src/content/blog/{en,fr}/{slug}.md`
7. Maillage bidirectionnel : l'article pointe son pillar, le pillar/satellite gagne un lien retour (section "From the blog" ou inline)

**Catégories Content Collection** alignées clusters : `choosing-a-camp` · `beginners` · `benefits` · `chiang-mai-life` · `visa` · `culture`.

**Contrainte saisonnière absolue** : si E8 démarre après septembre, intervertir M4 ↔ M2 pour que le cluster burning season soit en ligne avant décembre.

---

## Synthèse volumes (24 articles core)

| Mois | Cluster | Articles | Volume cumulé cluster | Diff max |
|---|---|---|---|---|
| M1 | Choisir son camp | 4 | ~1 670 | 20 |
| M2 | Beginners | 4 | ~5 700 | 20 |
| M3 | Benefits & transformation | 4 | ~1 250 | 15 |
| M4 | Vivre & planifier CM | 4 | ~1 500 | 15 |
| M5 | Visa & long stay | 5 | ~1 330 | 20 |
| M6 | Culture & comparaisons | 4 | ~4 260 | 20 |
| **Total** | | **25** | **~15 710** | |

> Source data complète : `.seo-data/keywords-*.json` (50 fichiers). Agrégation : `docs/structure-blog.md` §8.

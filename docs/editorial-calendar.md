# Calendrier éditorial Blog — Wildcat Muay Thai

> **Cadence :** 2 articles/semaine — mardi + vendredi
> **Démarrage :** mardi 16 juin 2026 · **Fin de campagne V1 :** vendredi 11 septembre 2026
> **Dernière révision :** 6 août 2026 — ré-arbitrage août sur données GSC réelles (hub, `seostats.gsc_query_page_data`)
>
> **Statuts :** `[ ]` À faire · `[~]` Brief/rédaction en cours · `[x]` Publié · `[!]` Squelette de démo à remplacer
>
> Plan source : `docs/editorial-plan-blog.md` · Structure : `docs/structure-blog.md` · Pipeline : `docs/features/E8-blog-content.md`

---

## Ce que disent les données (révision du 6 août 2026)

Bilan GSC sur les 4 semaines du 29/06 au 26/07 (dernier snapshot disponible — la collecte
s'est arrêtée depuis, semaines du 27/07 et du 03/08 manquantes) :

| Constat | Chiffre | Conséquence sur le calendrier |
|---|---|---|
| Le cluster **camps** capte presque toutes les impressions | `/en/blog/best-muay-thai-camps-thailand` = **466 impr., pos. 36, 0 clic** | Le levier n°1 n'est pas un article neuf mais un `/seo-refresh` sur l'existant |
| Le **silo DTV** ne décolle pas | 12 URLs (5 pages + 7 articles) → ~10 impr. cumulées | On dégraisse M5 : 4 articles à 10–50/mo sortent d'août |
| Le **FR** est quasi vide | 0 article FR live au 06/08, 1 programmé le 10/08 | Burning season produit en EN **+ FR** |
| **Burning season jamais sorti** | `burning-season-chiang-mai` toujours `draft: true`, 414 mots de démo | Repasse en tête d'août — plus gros kw du calendrier, contrainte saisonnière |

**Arbitrage retenu** : août bascule de M5 « Visa » (5 articles sur 6, ~1 000/mo cumulés) vers
un mix M4 saisonnier + M6 culture/comparaisons avancé (~6 100/mo cumulés). Le silo DTV garde
un seul créneau, celui du kw à 800/mo.

---

## Ce qui est réellement publié

16 articles EN, 1 article FR. Le décompte ci-dessous est vérifié sur `src/content/blog/`
(`draft: false` + `publishDate` atteinte), pas sur les statuts déclaratifs.

| Date | # | Slug EN | Cluster |
|---|---|---|---|
| 16 juin | 1.1 | `best-muay-thai-camps-thailand` | M1 |
| 19 juin | 1.2 | `chiang-mai-vs-phuket-muay-thai` | M1 |
| 26 juin | 1.4 | `muay-thai-training-thailand-cost` | M1 |
| 30 juin | 2.3 | `muay-thai-stance-basics` | M2 ⭐ 4 400/mo |
| 1er juil | 1.3 | `chiang-mai-vs-bangkok-muay-thai` | M1 |
| 6 juil | D1 | `dtv-visa-cost-breakdown` | DTV-coûts |
| 9 juil | D2 | `dtv-visa-proof-of-funds` | DTV-coûts |
| 13 juil | D3 | `dtv-visa-agent-worth-it` | DTV-coûts |
| 16 juil | D4 | `dtv-vs-tourist-visa-runs-cost` | DTV-coûts |
| 20 juil | D5 | `dtv-visa-refund-if-rejected` | DTV-coûts |
| 23 juil | D6 | `muay-thai-gym-dtv-overcharging` | DTV-coûts |
| 27 juil | D7 | `cheapest-dtv-soft-power-activity` | DTV-coûts |
| 30 juil | 2.4 | `muay-thai-for-women` | M2 |
| 3 août | 2.1 | `muay-thai-gear-beginners` | M2 |
| 6 août | 2.2 | `learn-muay-thai-at-home` | M2 |
| **10 août** | 1.5 | `best-muay-thai-camps-chiang-mai` (+ FR `meilleur-camp-muay-thai-chiang-mai`) | M1 — **programmé, sortira seul** |

**Écarts au plan initial, assumés :**

- Le **cluster DTV-coûts (7 articles, juillet)** a été inséré hors calendrier et a mangé les
  créneaux de **M3 « Benefits »** (3.1 à 3.4) et de **M4** (4.2 à 4.4). M3 n'a jamais été écrit.
- **4.1 burning season** est un squelette de démo E8 (`draft: true`), pas un article. Le
  « publié le 28 juillet ✓ » de l'ancienne version de ce fichier était faux.
- Les 2 autres démos E8 restent en `draft: true` : `saison-des-brulis-chiang-mai` (FR de 4.1)
  et `muay-thai-pour-les-femmes` (FR de 2.4).

---

## Août 2026 — plan révisé

6 créneaux restants. Volume cumulé visé : **~6 100/mo**.

### Semaine 9 — 11–14 août · M4 saisonnier + M5 visa

| Statut | Date | # | Titre | Slug EN | Kw principal | Vol |
|---|---|---|---|---|---|---|
| [!] | Mardi 11 août | 4.1 | Burning Season in Chiang Mai: The Honest Guide | `burning-season-chiang-mai` **+ FR** `saison-des-brulis-chiang-mai` | burning season chiang mai | ~900 🔥 |
| [ ] | Vendredi 14 août | 5.1 | ED Visa vs DTV for Muay Thai: Which Is Right for You? | `ed-visa-vs-dtv-muay-thai` | ed visa vs dtv | ~800 |

> **4.1 remplace le squelette de démo** : même slug, même `translationKey: burning-season`,
> `draft: true` → `false`, `publishDate` → 2026-08-11, bannière de démo retirée, cover réelle.
> Contrainte saisonnière : doit être indexé et vieilli avant la recherche de novembre-février.

### Semaine 10 — 18–21 août · M6 culture & comparaisons (avancé)

| Statut | Date | # | Titre | Slug EN | Kw principal | Vol |
|---|---|---|---|---|---|---|
| [ ] | Mardi 18 août | 6.3 | Muay Thai vs Kickboxing: What's the Difference? | `muay-thai-vs-kickboxing` | muay thai vs kickboxing | 2 900 ⭐ |
| [ ] | Vendredi 21 août | 6.2 | The Mongkhon & Pra Jiad: What They Mean in Muay Thai | `muay-thai-headband-mongkhon` | muay thai headband mongkhon | 590 |

> 6.3 est avancé du 4 septembre au 18 août : c'est le plus gros volume non servi du plan et
> il n'entre en concurrence avec aucune URL existante.

### Semaine 11 — 25–28 août · M6 suite

| Statut | Date | # | Titre | Slug EN | Kw principal | Vol |
|---|---|---|---|---|---|---|
| [ ] | Mardi 25 août | 6.4 | Is Muay Thai Good for Self-Defense? | `muay-thai-self-defense` | is muay thai good for self defense | ~590 |
| [ ] | Vendredi 28 août | 6.1 | Wai Kru Ram Muay Explained | `wai-kru-ram-muay-explained` | wai kru ram muay | ~330 |

---

## Sorti d'août → réserve

Reporté, avec le motif. Aucun de ces sujets n'est annulé : ils redeviennent candidats dès
que GSC montre une traction du silo concerné.

| # | Slug | Vol | Motif du report |
|---|---|---|---|
| 5.2 | `how-long-can-you-train-thailand-visa` | ~50 | Volume marginal + recouvre `/dtv-visa/long-stay-training` |
| 5.3 | `muay-thai-travel-insurance` | 10 | Volume nul, hors offre |
| 5.4 | `muay-thai-visa-costs` | ~40 | Cannibalise `dtv-visa-cost-breakdown` (publié) |
| 5.5 | `border-runs-vs-dtv-thailand` | ~50 | Cannibalise `dtv-vs-tourist-visa-runs-cost` (publié) |
| 4.3 | `digital-nomad-train-muay-thai-chiang-mai` | ~180 | Décalé en septembre, volume inférieur à M6 |
| 4.2 | `best-time-train-muay-thai-thailand` | ~100 | Recoupe 4.1 burning season — à réévaluer après 4.1 |
| M3 | `muay-thai-benefits` · `muay-thai-weight-loss` · `muay-thai-mental-health` · `muay-thai-transformation-camp` | 400 · 250 · 10 · 200 | Cluster jamais lancé, repoussé après la campagne V1 |

---

## Septembre 2026 — reste de la campagne V1

| Statut | Date | # | Titre | Slug EN | Kw | Vol |
|---|---|---|---|---|---|---|
| [ ] | Mardi 1er sept | 4.4 | Where to Watch Muay Thai Fights in Chiang Mai | `watch-muay-thai-fights-chiang-mai` | watch muay thai fights chiang mai | ~350 |
| [ ] | Vendredi 4 sept | 4.3 | Train Muay Thai + Work Remote in Chiang Mai | `digital-nomad-train-muay-thai-chiang-mai` | digital nomad chiang mai muay thai | ~180 |
| [ ] | Mardi 8 sept | R1 | Muay Thai vs Taekwondo | `muay-thai-vs-taekwondo` | muay thai vs taekwondo | 880 |
| [ ] | Vendredi 11 sept | R2 | Muay Thai vs Karate | `muay-thai-vs-karate` | muay thai vs karate | 590 |

> R1 et R2 sortent de la réserve M7 : leur déclencheur (« après 6.3 publié ») est satisfait
> dès le 18 août dans ce plan.

---

## Actions hors-article (priorité supérieure aux 6 articles)

| Priorité | Action | Pourquoi |
|---|---|---|
| 1 | `/seo-refresh` sur `best-muay-thai-camps-thailand` | 466 impressions déjà acquises, position 36, **0 clic** — le plus gros gisement du site |
| 2 | Réparer la collecte GSC du hub | 2 semaines de données manquantes (27/07, 03/08) — sinon septembre se pilote à l'aveugle |
| 3 | Traduire en FR `muay-thai-for-women` (démo FR déjà en place) | 0 article FR live ; le squelette et le `translationKey` existent déjà |
| 4 | Indexation : 4 URLs découvertes-non-crawlées, 2 inconnues de Google | `/en/classes/beginners` et `/fr/contact` absentes de l'index |

Non-actions vérifiées le 06/08 : les 2 findings de cannibalisation sur la marque
(`wildcat muay thai`, `wildcat muay thai chiang mai`) sont des **faux positifs** — `http://`
et les URLs à slash final renvoient bien un 308 vers la forme canonique.

---

## Articles FR

| # | Slug FR | Kw FR | État |
|---|---|---|---|
| 1.5 | `meilleur-camp-muay-thai-chiang-mai` | meilleur camp muay thai chiang mai | Programmé 10 août |
| 4.1 | `saison-des-brulis-chiang-mai` | saison des brûlis chiang mai | **Produit avec 4.1 le 11 août** |
| 2.4 | `muay-thai-pour-les-femmes` | muay thai femme | Squelette de démo — action hors-article n°3 |
| 1.1 | `meilleurs-camps-muay-thai-thailande` | meilleurs camps muay thai thaïlande (~80/mo) | Non lancé |
| 1.4 | `stage-boxe-thai-thailande-prix` | stage boxe thaï thaïlande prix (~140/mo) | Non lancé |

Les autres articles restent EN-only en V1. Le FR s'ajoute après validation GSC, kw par kw
(jamais par traduction automatique de l'EN : le marché FR a ses propres requêtes).

---

## Vue d'ensemble

| Semaine | Dates | Cluster | Articles | État |
|---|---|---|---|---|
| S1–S4 | 16 juin – 10 juil | M1 + M2 | 1.1 · 1.2 · 1.3 · 1.4 · 2.3 | Publié |
| S5–S7 | 6 juil – 27 juil | DTV-coûts (hors plan) | D1 → D7 | Publié |
| S7–S8 | 30 juil – 10 août | M2 fin + M1 | 2.4 · 2.1 · 2.2 · 1.5 | Publié / programmé |
| **S9** | **11–14 août** | **M4 + M5** | **4.1 🔥 · 5.1** | À produire |
| **S10** | **18–21 août** | **M6** | **6.3 ⭐ · 6.2** | À produire |
| **S11** | **25–28 août** | **M6** | **6.4 · 6.1** | À produire |
| S12–S13 | 1–11 sept | M4 + comparaisons | 4.4 · 4.3 · R1 · R2 | Planifié |

**Total V1 : 26 articles publiés + 10 restants · fin le 11 septembre 2026.**

---

## Q4 2026 — plan du 29 septembre (revue SEO complète)

> Source : revue SEO du 29/09/2026 (GSC 31/08→27/09, indexation 61 URLs, cannibalisation 3 mois,
> veille actu, 19 SERP réelles). Données : `.seo-data/gsc-wildcat-2026-09-29.json`,
> `.seo-data/index-wildcatmuaythai-com-2026-09-29.json`, `.seo-data/q4-2026/`.
> Cadence réduite à **1 article / 2 semaines** : le frein n'est plus la production mais
> l'indexation (33/61 URLs indexées). Chaque article sort seul via `publishDate` (rebuild quotidien).

### Articles produits le 29/09, programmés

| Sortie | Slug | Locale | Kw principal | Vol. | Statut |
|---|---|---|---|---|---|
| mar. 6 oct. | `best-time-train-muay-thai-thailand` | EN | best time to train muay thai in thailand (+ Yi Peng 24–25/11) | autocomplete | [x] prêt |
| mar. 20 oct. | `watch-muay-thai-fights-chiang-mai` | EN | where to watch muay thai fights chiang mai | ~350 cumulé | [x] prêt |
| mar. 3 nov. | `muay-thai-vs-bjj` | EN | muay thai vs jiu jitsu | 880 | [x] prêt |
| mar. 10 nov. | `stage-boxe-thai-thailande-prix` | FR | stage boxe thaï thaïlande prix + camp muay thai thailande | 140 + 210 | [x] prêt |
| mar. 17 nov. | `is-muay-thai-dangerous` | EN | is muay thai dangerous | 390 | [x] prêt |
| mar. 1er déc. | `muay-thai-weight-loss` | EN | muay thai weight loss | 170 | [x] prêt |
| mar. 15 déc. | `muay-thai-vs-taekwondo` | EN | muay thai vs taekwondo | 880 | [x] prêt |

### Maillage entrant à poser le jour de la sortie (jamais avant : lien vers un article futur = 404)

| Article | Liens entrants à ajouter |
|---|---|
| best-time-train | `burning-season-chiang-mai`, `chiang-mai-vs-phuket-muay-thai`, `thailand-visa-guide-by-training-length`, hub `/chiang-mai-guide` |
| watch-fights | FAQ home `faq_a6` (lien fighters → article), `wai-kru-ram-muay-explained`, `muay-thai-headband-mongkhon`, `chiang-mai-vs-bangkok-muay-thai` |
| vs-bjj | `muay-thai-self-defense` (section BJJ), `muay-thai-vs-kickboxing` |
| stage-boxe FR | `meilleur-camp-muay-thai-chiang-mai`, `visa-thailande-guide-duree-de-sejour`, `/fr/stay-train` |
| dangerous | `muay-thai-self-defense` (FAQ « Is Muay Thai dangerous to train? »), `/classes/beginners` via `muay-thai-for-women` |
| weight-loss | `muay-thai-for-women`, `muay-thai-training-thailand-cost`, best-time-train |
| vs-taekwondo | `muay-thai-vs-kickboxing`, `muay-thai-vs-bjj` |

### Refresh faits le 29/09 (updatedDate 2026-09-29)

`best-muay-thai-camps-thailand` (régions + tableau + prix vérifiés), `muay-thai-headband-mongkhon`,
`muay-thai-self-defense`, `muay-thai-training-thailand-cost`, `dtv-visa-new-requirements-2026`,
`thailand-visa-guide-by-training-length`, `visa-thailande-guide-duree-de-sejour`,
`burning-season-chiang-mai`, `saison-des-brulis-chiang-mai`. Pilier `/dtv-visa` fusionné (faq + muay-thai).

### Refresh planifiés

| Quand | Quoi | Pourquoi |
|---|---|---|
| après le 15/10 | relire GSC (fin spam update du 24/09) ; `/seo-cannibalisation` sur « muay thai camp thailand » (listicle vs `/stay-train`) | mesurer la fusion DTV et le refresh listicle |
| début nov. | `/chiang-mai-guide` : encart saison / Yi Peng ; vérifier le programme municipal Yi Peng 2026 dans l'article du 06/10 | dates municipales non confirmées au 29/09 |
| fin nov. | burning season EN+FR : mesures 2027 si annoncées | la recherche monte de décembre à mars |
| début déc. | `dtv-visa-new-requirements-2026` + silo DTV : retours terrain 31/08, apostille (28/02/2027) | YMYL, fraîcheur |
| mi-janv. 2027 | `wai-kru-ram-muay-explained` : dates World Muay Thai Day (6/02) et Journée nationale (17/03) 2027 | publiées par la TAT en début d'année |

### Réserve T1 2027

`muay-thai-vs-karate` (590) · `muay-thai-benefits` (210) · « too old to start Muay Thai » (PAA, volume à mesurer) ·
`digital-nomad-train-muay-thai-chiang-mai` (50) · FR : traduction de `best-time-train` et `muay-thai-for-women` (démo FR).
Écartés (motif dans `.seo-data/q4-2026/serp-q4-2026.md`) : Yi Peng dédié (SERP billetterie), kids (0), Noël (merch),
TDAC (site officiel), exemption 30 j dédiée (cannibalise les guides visa).

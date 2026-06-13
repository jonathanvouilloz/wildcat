# Topical Map : Muay Thai pour débutants (cluster M2)

> Généré le 2026-06-13. Cluster de **4 articles** : 0 publié (2 squelettes démo à remplacer), 4 à produire.
> Marché : audience internationale anglophone (EN-first) qui veut s'entraîner à Chiang Mai.
> Pillar = page service existante `/classes/beginners` (1000/mo, possédée — le blog ne la cible jamais).
> Source de vérité production : ce fichier. Croisé avec `docs/structure-blog.md` §M2 + `docs/editorial-calendar.md`.

---

## TL;DR — ce qui change après l'audit

1. **Réordonner par valeur SEO.** Le calendrier produit dans l'ordre gear → home → stance → women.
   La data dit l'inverse : **stance (4400/mo, diff 0) et women (différenciateur de marque) sont prioritaires.**
   Recommandation : produire **stance d'abord**, women ensuite, gear et home derrière.
2. **2 squelettes démo occupent déjà 2 slots** (`muay-thai-stance-basics`, `muay-thai-for-women`) — thin
   (~350-390 mots). Ce sont des **remplacements**, pas des créations. Réutiliser les slugs existants.
3. **Slug à réconcilier** : calendrier dit `muay-thai-stance-basic-moves`, le fichier réel est
   `muay-thai-stance-basics`. Garder l'existant, corriger le calendrier.
4. **Cluster 100 % informationnel** = normal pour un TOFU beginners (bon pour les AI Overviews). Pas de
   rééquilibrage nécessaire — le commercial/transactionnel est porté par le pillar et M1.
5. **2 trouvailles low-diff non planifiées** : `muay thai conditioning workout` (90, diff 1) et
   `beginner muay thai drills` (50, diff 4) → **à fondre** dans les articles existants (pas d'article dédié).
6. **À confirmer avant brief 2.4** : le volume `muay thai for women` (390) n'est dans aucun fichier
   `.seo-data/` — lancer `/seo-keywords "muay thai for women"` pour le valider + récupérer les secondaires.

---

## Hiérarchie thématique

### Pillar : Beginner Muay Thai Classes — `/classes/beginners` (PAGE SERVICE, possédée)
Keyword : `beginner muay thai classes` (1000) | Intent : transactionnel/service | Statut : **Existant**
Couvre déjà : first-class walkthrough, what to expect, what to wear, "is it good/hard for beginners",
"how long to learn", drop-in. **Le blog ne re-cible aucun de ces intents** (cf. cannibalisation).

#### Cluster « Technique fondamentale »
- `muay-thai-stance-basics` — Stance & basic moves [Démo à remplacer]

#### Cluster « Persona »
- `muay-thai-for-women` — Muay thai pour les femmes [Démo à remplacer, EN+FR]

#### Cluster « Équipement & préparation »
- `muay-thai-gear-beginners` — Gear / what to bring to camp [À créer]

#### Cluster « Pratique autonome »
- `learn-muay-thai-at-home` — Can you learn muay thai at home? [À créer]

---

## Tableau de production

Trié par score décroissant. **C'est l'ordre de production recommandé** (≠ ordre du calendrier actuel).

| # | Article | Statut | Brand | Business | Trafic | Score | Module | Slug |
|---|---|---|---|---|---|---|---|---|
| 1 | Muay thai stance & basic moves | Démo→remplacer | 3 | 2 | 3 | **8** | A (walkthrough technique) | `muay-thai-stance-basics` |
| 2 | Muay thai for women | Démo→remplacer | 3 | 2 | 2 | **7** | C (persona/expérience) | `muay-thai-for-women` |
| 3 | Muay thai gear for beginners | À créer | 2 | 2 | 2 | **6** | A (checklist packing) | `muay-thai-gear-beginners` |
| 4 | Can you learn muay thai at home? | À créer | 2 | 1 | 2 | **5** | B (réponse honnête + pont camp) | `learn-muay-thai-at-home` |

Détail des volumes (DataForSEO US, diff = competition_index) :

| Article | Kw principal | Vol | Diff | Secondaires à intégrer |
|---|---|---|---|---|
| Stance | `muay thai stance` | 4400 | 0 | `beginner muay thai basic moves` (170, diff 0), `beginner muay thai drills` (50, diff 4) |
| Women | `muay thai for women` | 390* | — | benefits for female (30), before/after female (30), camp thailand women (10) — *à confirmer |
| Gear | `beginner muay thai gloves` | 260 | 84 | `best beginner muay thai gloves` (50), `muay thai shorts thailand` (170) |
| Home | `muay thai training at home` | 260 | 26 | `how to learn muay thai at home` (90, diff 10), `muay thai conditioning workout` (90, diff 1) |

---

## Intent Layering

- **Informationnel : 100 %** (4 articles sur 4)
- Commercial : 0 %
- Transactionnel : 0 % (porté par le pillar `/classes/beginners`)
- **Analyse : OK.** Un cluster beginners (TOFU) est attendu 100 % informationnel — c'est exactement la
  cible des AI Overviews (99,9 % info). Le commercial (comparatifs) vit en M6, le transactionnel sur les
  pages service. Aucun rééquilibrage. Chaque article remonte vers le pillar via CTA chaleureux (pas de
  re-ciblage de ses keywords).

---

## Blueprint de maillage interne

Conventions d'ancre : descriptive et naturelle, jamais "cliquez ici". Maillage localisé (article FR →
pages FR via `localePath()`). Blog→blog FR seulement si la traduction cible existe.

| Article | Liens sortants obligatoires | Liens sortants recommandés | Liens entrants attendus |
|---|---|---|---|
| `muay-thai-stance-basics` | `/classes/beginners` (pillar) | `learn-muay-thai-at-home`, `muay-thai-gear-beginners` | pillar (section "from the blog"), home, women |
| `muay-thai-for-women` | `/classes/beginners` | `/about/coaches` (#meaw, woman-run E-E-A-T), `muay-thai-stance-basics` | pillar, stance, gear |
| `muay-thai-gear-beginners` | `/classes/beginners` | `/stay-train` (what to pack), `muay-thai-stance-basics` | pillar, home, stance |
| `learn-muay-thai-at-home` | `/classes/beginners` (pont "come for the rest") | `muay-thai-stance-basics`, `muay-thai-gear-beginners` | pillar, stance |

Règle pillar : `/classes/beginners` devra gagner une section "From the blog" linkant les 4 (lien retour
bidirectionnel) — à câbler quand ≥2 articles du cluster sont publiés.

---

## Garde-fous cannibalisation (CRITIQUE — pillar possède le TOFU service)

Le pillar `/classes/beginners` possède déjà ces intents. **Aucun article blog ne les cible** :

| Intent possédé par le pillar | Conséquence pour le blog |
|---|---|
| `beginner muay thai classes` (1000) | Aucun article ne vise ce kw ni "first class at our camp" |
| "is muay thai good/hard for beginners" (FAQ pillar) | Stance & women n'ouvrent pas sur ces questions |
| "first class walkthrough / what to expect" | **Stance = technique pure** (stance/guard/footwork/jab/drills), PAS "ta première séance à Wildcat" |
| `muay thai near me` (49500) / `classes near me` (14800) | Intent LOCAL → local pack + GMB, jamais le blog |
| "how long to learn muay thai" | Possédé (FAQ pillar) — ne pas en faire un article |

**Aucune cannibalisation détectée entre les 4 articles du cluster** (4 intents distincts : technique /
persona / équipement / pratique autonome).

---

## Mini-briefs — articles à produire (ordre de priorité)

### 1. Muay thai stance & basic moves, explained simply

- Slug : `muay-thai-stance-basics` (existant — remplacer le squelette démo, ne pas créer de nouveau fichier)
- Slug rationale : cleaner que `...-basic-moves` du calendrier ; capte stance + basic moves sans date
- Keyword principal : `muay thai stance` (4400/mo, diff 0)
- Module : A — walkthrough technique ordonné (stance → guard → footwork → jab → drills)
- Intent : Informationnel
- Score : 8/9 (Brand 3 · Business 2 · Trafic 3)
- Word count cible : 1 600-2 000 mots (le 4400/mo justifie la profondeur ; le démo fait 334 mots)
- Angle Wildcat : "voici comment nos coachs thaïs l'enseignent, dans l'ordre" — E-E-A-T sans transformer
  en page service ; section "the mistakes coaches fix the most" (capte l'intent erreurs/pièges)
- À fondre : `beginner muay thai basic moves` (170) + `beginner muay thai drills` (50) en sections H2/H3
- ⚠️ Ne PAS refaire le walkthrough "première séance" (possédé par le pillar) — rester sur la technique globale
- Lien sortant obligatoire : `/classes/beginners`
- Lien sortant recommandé : `learn-muay-thai-at-home`, `muay-thai-gear-beginners`
- EN-only au lancement (le démo teste justement hreflang en + x-default seul)
- À produire avec : `/seo-serp "muay thai stance"` → `/seo-brief muay-thai-stance-basics`

### 2. Muay thai for women: what training at a camp is really like

- Slug : `muay-thai-for-women` (existant EN+FR — remplacer les 2 squelettes démo)
- Slug rationale : kw exact, persona-driven, sans date
- Keyword principal : `muay thai for women` (~390/mo — **à confirmer via `/seo-keywords`**)
- Module : C — expérience persona (témoignage + angle woman-run)
- Intent : Informationnel
- Score : 7/9 (Brand 3 · Business 2 · Trafic 2)
- Word count cible : 1 400-1 800 mots
- Angle Wildcat : LE différenciateur — camp woman-run (Meaw), E-E-A-T owner. "ce que c'est vraiment, en
  tant que femme" : premières séances, vibe mixte tous niveaux, quoi porter, le jardin vs la salle intimidante
- À fondre : benefits for female (30), before/after female (30), camp thailand women (10)
- ⚠️ Files dédiés `womens-muay-thai-thailand` / `-chiang-mai` = **0/mo** → l'angle LOCAL est mort,
  seul le GLOBAL "muay thai for women" tient. Ne pas viser "muay thai femme chiang mai".
- ⚠️ Ne pas re-cibler "beginner classes" (pillar) — angle expérience, pas inscription
- Lien sortant obligatoire : `/classes/beginners`
- Lien sortant recommandé : `/about/coaches` (#meaw), `muay-thai-stance-basics`
- FR : démo FR existe déjà → décider si on produit le vrai FR (lancer mini-batch `/seo-keywords` FR
  "boxe thaï femme" avant de trancher ; sinon repasser FR en backlog et garder EN + x-default)
- À produire avec : `/seo-keywords "muay thai for women"` → `/seo-serp` → `/seo-brief muay-thai-for-women`

### 3. Muay thai gear for beginners (what to bring to a camp in Thailand)

- Slug : `muay-thai-gear-beginners` (à créer)
- Slug rationale : kw + angle camp, sans date
- Keyword principal : `beginner muay thai gloves` (260/mo, diff 84 — HIGH, mais cluster facile en global)
- Module : A — checklist packing + guide d'achat léger
- Intent : Informationnel (frôle le commercial sur "gloves" — rester factuel, pas d'affiliation)
- Score : 6/9 (Brand 2 · Business 2 · Trafic 2)
- Word count cible : 1 400-1 800 mots
- Angle Wildcat : **gants + bandes prêtés au camp (fait vérifié ✅)** → "ce que tu n'as PAS besoin
  d'acheter avant de venir" = différenciateur honnête vs les guides d'achat affiliés
- À fondre : `best beginner muay thai gloves` (50) + `muay thai shorts thailand` (170)
- ⚠️ diff 84 sur "gloves" : ne pas se battre sur le guide d'achat pur ; gagner sur l'angle "packing pour
  un camp en Thaïlande" (longue traîne + intent voyage, là où Wildcat est légitime)
- Lien sortant obligatoire : `/classes/beginners`
- Lien sortant recommandé : `/stay-train`, `muay-thai-stance-basics`
- EN-only
- À produire avec : `/seo-serp "muay thai gear beginners"` → `/seo-brief muay-thai-gear-beginners`

### 4. Can you learn muay thai at home?

- Slug : `learn-muay-thai-at-home` (à créer)
- Slug rationale : reformule la question en affirmation actionnable, sans date
- Keyword principal : `muay thai training at home` (260/mo, diff 26)
- Module : B — réponse honnête (oui pour les bases, non pour le clinch/sparring/timing) → pont vers le camp
- Intent : Informationnel
- Score : 5/9 (Brand 2 · Business 1 · Trafic 2)
- Word count cible : 1 200-1 600 mots
- Angle Wildcat : honnêteté ("voici ce que tu peux vraiment progresser seul, et où ça bloque") → CTA
  chaleureux "viens chercher le reste au camp". Pas de survente.
- À fondre : `how to learn muay thai at home` (90) + **`muay thai conditioning workout` (90, diff 1 —
  trouvaille)** en section "conditioning you can do at home"
- Lien sortant obligatoire : `/classes/beginners` (pont "come for the rest")
- Lien sortant recommandé : `muay-thai-stance-basics`, `muay-thai-gear-beginners`
- EN-only
- À produire avec : `/seo-serp "muay thai training at home"` → `/seo-brief learn-muay-thai-at-home`

---

## Cannibalisation détectée

**Aucune entre les 4 articles** (intents distincts). Le seul risque est blog ↔ pillar : neutralisé par
les garde-fous ci-dessus (stance = technique globale, pas "première séance" ; aucun article ne vise
"beginner classes" ni "near me").

---

## Trouvailles non retenues en articles dédiés (fondues ou écartées)

| Keyword | Vol | Diff | Décision |
|---|---|---|---|
| `muay thai conditioning workout` | 90 | 1 | **Fondu** dans Home (section conditioning) — low-diff à exploiter |
| `beginner muay thai drills` | 50 | 4 | **Fondu** dans Stance (section drills) |
| `muay thai training video` | 90 | 5 | Écarté (E9 vidéo plus tard) |
| `muay thai books` | 260 | 91 | Écarté (diff 91 + hors marque) |
| `muay thai near me` / `classes near me` | 49500 / 14800 | — | Écarté (intent LOCAL → local pack/GMB, pas blog) |
| "common beginner mistakes" | — | — | Pas de kw isolé → fondu dans Stance (déjà dans son angle) |

---

## Actions de peaufinage avant production M2 (checklist)

- [ ] Réconcilier le slug calendrier `muay-thai-stance-basic-moves` → `muay-thai-stance-basics`
- [ ] Réordonner M2 par valeur : stance → women → gear → home (ou au moins ne pas reléguer stance en 3e)
- [ ] Confirmer le volume `muay thai for women` via `/seo-keywords` avant le brief 2.4
- [ ] Trancher FR women (mini-batch kw FR) — sinon backlog, garder EN + x-default
- [ ] Au brief : rappeler "remplacer le squelette démo" pour stance + women (réutiliser slug + translationKey)
- [ ] Câbler section "From the blog" sur le pillar `/classes/beginners` quand ≥2 articles publiés

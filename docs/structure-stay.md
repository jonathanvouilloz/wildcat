# Structure — Silo Stay & Train (camp / séjour / packages)

> **Décision d'architecture du 2026-06-05** — data-driven (DataForSEO US + FR ×7 seeds, scans SERP ×3).
> Remplace le plan initial du mega menu (5 pages satellites maquette) par une structure resserrée.
> Source data : `.seo-data/keywords-*.json` + `.seo-data/serp-*.json` (synthèse complète en **§7 Annexe data**) · Briefs : `content/_drafts/pages/stay-*.md`.

---

## 0. Checklist d'exécution — étape par étape

> Cocher dans l'ordre. Chaque étape référence sa source. Rien d'autre n'est dans le scope du batch Stay.

### Préparation
- [x] Recherche keywords ×7 (US + FR) → `.seo-data/keywords-*` (synthèse §7) — 2026-06-05
- [x] Scans SERP ×3 → `serp-muay-thai-camp-thailand.json` + `serp-all-inclusive-muay-thai-camps-thailand.json` + `serp-camp-muay-thai-thailande-FR.json`
- [ ] Architecture tranchée : 5 satellites maquette → **0 satellite, 1 re-cadrage majeur du pillar** (à valider par Jonathan, ce doc)
- [ ] **Question bloquante** : modèle accommodation (§5) — à trancher AVANT le brief
- [ ] Brief rédigé et validé : `content/_drafts/pages/stay-pillar.md`

### Rédaction & intégration
- [ ] **1. `/seo-write` re-cadrage `/stay-train`** (édition lourde) — depuis `stay-pillar.md`. EN : head "muay thai camp thailand" (1900/mo) ; FR : "camp/stage muay thai thailande" (210+140/mo, copy ré-anglée, pas une traduction)
- [ ] **2. `/humanizer`** sur le contenu
- [ ] **3. Intégration Astro** : nouvelles sections pillar (#packages transparent, #accommodation, vie au camp/Chiang Mai) + clés `stay_*` EN/FR (parité)
- [ ] **4. Repointage Nav** : entrées mega menu Stay & Train → ancres réelles (§3)
- [ ] **5. Maillage entrant** : home (teaser stay), `/classes` (lien long-stay existant à vérifier), `/dtv-visa/long-stay-training` (encart cross existant), `/dtv-visa` pillar
- [ ] **6. Vérifs** : `npm run build` ✅ · parité clés EN/FR · zéro lien cassé · `/seo-review` = PASS
- [ ] **7. Tests Playwright** : 51/51 existants + tests des nouvelles ancres/sections si interactif ajouté
- [ ] **8. Commit** branche courante (conventional commits, scope `stay`)

### Avant mise en prod (bloquant)
- [ ] **9a. Modèle accommodation confirmé** (Jonathan/Meaw) : Wildcat loge-t-il les guests (chambres on-site ?) ou aide-t-il à organiser un logement à proximité ? → conditionne #accommodation ET le discours "all inclusive" (§5)
- [ ] **9b. Prix séjour** : les packages week/month/fighter de `site.ts` incluent quoi exactement (training only ?) — la transparence est l'angle n°1, il faut le détail exact

### Hors scope de ce batch (backlog — ne pas faire maintenant)
- [ ] Blog E8 : "Best muay thai camps in Thailand" (70/mo, intent listicle — un camp ne peut pas ranker dessus en page service, mais un article comparatif honnête oui) · "Chiang Mai vs Phuket for muay thai" (PAA récurrent ×2 SERPs) · guide Chiang Mai (zéro volume muay-thai-spécifique, contenu E8/E9)
- [ ] Page "all inclusive" dédiée : seulement si Wildcat crée un jour un vrai package chambre+repas (verdict SERP : sur-promesse sinon)
- [ ] Redirect `/muay-thai-training` → `/stay-train` (E7/E10, déjà au backlog)

---

## 1. Le verdict en une phrase

**5 satellites maquette → 0 page créée.** La data a tout invalidé (`/accommodation` 0/mo,
"holiday" 10/mo, "stay and train" 0/mo, scooter = intent loueur local hors silo, guide = zéro
volume spécifique). En revanche elle a révélé que le pillar `/stay-train` vise aujourd'hui un
keyword 20× trop petit : **"muay thai camp thailand" pèse 1900/mo (diff 29, LOW, transactional)**
contre ~90 pour l'angle actuel. Le batch = un **re-cadrage majeur du pillar** (EN national
"camp thailand" + FR "camp/stage thailande") + nouvelles sections qui absorbent les intents
satellites (packages, accommodation, vie au camp).

---

## 2. Pages du silo — ce qu'on garde, ce qu'on vise

| Page | Statut | Intent EN (keyword · vol/mo) | Intent FR | Rôle |
|---|---|---|---|---|
| **`/stay-train`** (pillar) | ✅ Existe — **re-cadrage majeur** (brief `stay-pillar.md`) | **Transactional/commercial** : "muay thai camp thailand" (**1900** · diff 29 · LOW) + variantes "training camp" (1900, même cluster) + all inclusive (140) + best (70) + price (30) + packages (30). *Je choisis un camp de destination en Thaïlande : lequel, à quel prix, suis-je à ma place ?* | "camp muay thai thailande" (210) + "stage…" (140) + "stage boxe thaï prix" (140) + "…français" (70-80, niche vierge). H1 sur "camp", "stage" en H2/variante. | Hub séjours. Distribue vers /classes (hebdo), /dtv-visa (long stay), /contact (réserver) |
| ❌ `/accommodation` | **Ne pas créer** | "muay thai camp accommodation" = **0/mo** ("tiger muay thai accommodation" 10 = branded) | 0 | Section `#accommodation` du pillar — répond à "Where to Stay" du menu, honnêteté = différenciateur |
| ❌ `/scooter-rental` | **Ne pas créer** | "scooter rental chiang mai" 210/mo mais SERP = loueurs locaux (intent hors silo, non gagnable, non pertinent) | — | Mention dans la section vie pratique du pillar (feature motorbike déjà présente) |
| ❌ `/location` ("Getting Here") | **Ne pas créer** | Zéro demande autonome | — | `/contact` la possède déjà (adresse + map embed) |
| ❌ `/chiang-mai-guide` + "Things to Do" | **Ne pas créer** (V1) | "muay thai holiday thailand" 10/mo · pas de cluster guide muay-thai-spécifique | — | Courte section "la vie autour du camp" sur le pillar ; vrai guide = blog E8/E9 |
| ❌ `/stay-train/long-stay` | **Ne pas créer** | Cannibalisation directe de `/dtv-visa/long-stay-training` (budget 6-12 mois, YMYL) | — | La page existe déjà dans le silo DTV |

### Anti-cannibalisation — qui possède quoi

| Requête | Page propriétaire |
|---|---|
| `muay thai camp thailand` + variantes "training camp thailand" · all inclusive · packages · price | **`/stay-train`** (nouveau) |
| `muay thai chiang mai` (head 590) · `muay thai camp chiang mai` (70 — brand-dominé Tiger/Lanna) | **Home** — inchangé, interdit en title/H1 ailleurs. ⚠️ le H1 actuel du pillar ("Muay Thai training camp **Chiang Mai**") migre vers "…**Thailand**" : Chiang Mai passe en qualificatif secondaire, la collision home/pillar disparaît |
| `muay thai classes/gym/lessons chiang mai` | `/classes` |
| `beginner muay thai *` | `/classes/beginners` — le pillar Stay garde sa note débutants + lien |
| `cost of muay thai training in thailand` (40) · budget mensuel ventilé · 6-12 mois | `/dtv-visa/long-stay-training` — le pillar affiche SES prix packages, jamais de breakdown logement/bouffe/scooter au mois (encart cross existant dans l'autre sens) |
| `dtv` + visa | silo `/dtv-visa` |
| `best muay thai camps in thailand` (70 — intent listicle comparatif) | Personne → blog E8 |

---

## 3. Mega menu — la structure UX ne bouge pas

**Décision : on garde les 7 entrées du menu Stay & Train**, seules les cibles changent
(pattern E5c : le menu est de l'UX, pas de l'architecture d'URL).

| Entrée menu | Cible actuelle | Cible après |
|---|---|---|
| Stay & Train Packages | `/stay-train#pricing` | `/stay-train#packages` (section enrichie "what's included") |
| Long-Stay Training | `/stay-train` | **`/dtv-visa/long-stay-training`** ← la page existe, c'est elle qui possède l'intent |
| Where to Stay | `/stay-train` | `/stay-train#accommodation` (nouvelle section) |
| Scooter Rental | `/stay-train` | `/stay-train#life` (section vie pratique) |
| Getting Here | `/contact` | inchangé |
| Chiang Mai Guide | `/stay-train` | `/stay-train#life` (en attendant blog E8) |
| Things to Do | `/stay-train` | `/stay-train#life` |

> Clarté utilisateur visée : **Stay & Train = je viens séjourner (1 sem-3 mois) ·
> DTV = je reste 6 mois+ · Classes = je m'entraîne à la semaine sur place.**

---

## 4. EN vs FR — pour la première fois, deux angles différents

**Structure identique, mais copy FR ré-anglée — pas une traduction.** Mêmes slugs
(`/en/stay-train`, `/fr/stay-train`), mêmes composants, mêmes sections. Ce qui change :

1. **EN** : tête nationale "muay thai camp thailand" — l'utilisateur compare des camps de
   destination, la SERP est dominée par les usines elite de Phuket/Bangkok. Angle : l'alternative
   familiale open-air de Chiang Mai, prix THB transparents, DTV pathway.
2. **FR** : "camp/stage muay thai thailande" — la SERP est dominée par des listicles sans
   réservation et des agences à marge (Odysway 770 €). Angle : **réservation directe sans
   marge d'agence, tarif réel en bahts**, contenu 100 % français. H1 "camp",
   "stage" en H2/variante sémantique (SERPs fortement recouvrantes, une seule page).
3. La niche "camp muay thai thailande français" (70-80/mo, quasi vierge) se gagne par le
   contenu FR lui-même — ⚠️ pas de claim "accueil en français sur place" (Q-C §5 : l'équipe
   parle anglais), c'est le site et les échanges écrits qui sont en français.

---

## 5. ⚠️ Questions réelles bloquantes (avant brief)

| # | Question | Réponse |
|---|---|---|
| **Q-A** | **Accommodation** : Wildcat loge-t-il les guests ? | ✅ **Tranché (Jonathan, 2026-06-05)** : Meaw a des **condos qu'elle loue** + elle aide à trouver d'autres options à proximité → la section `#accommodation` a de la vraie substance (différenciateur vs agrégateurs). Détails condos (nombre, prix, distance) à préciser avec Meaw avant publication |
| **Q-B** | **Contenu exact des packages** week/month/fighter de `site.ts` : training only ? gants/bandes ? quoi d'autre ? | ⏳ **À vérifier avec Meaw** — le brief marque `[À VÉRIFIER]` sur le "what's included" ; la copy reste sur ce qui est déjà confirmé (sessions illimitées, gants+bandes prêtés ✅ 2026-06-04) en attendant |
| **Q-C** | L'équipe parle-t-elle français au camp ? | ✅ **Tranché (Jonathan, 2026-06-05)** : tout le monde parle anglais, **pas de FR officiel** → claim "accueil en français" abandonné. L'angle FR = réservation directe sans marge d'agence + prix réels en THB + contenu/site entièrement en français. La niche "camp muay thai thailande français" se sert par le contenu FR lui-même, sans promesse sur place |

---

## 6. Prochaines étapes

→ Voir la **checklist §0** (source de vérité de l'exécution).

---

## 7. Annexe data — synthèse des recherches (2026-06-05)

> Tous les chiffres viennent de DataForSEO (volumes US sauf mention FR) et des scans SERP du
> 2026-06-05. Fichiers bruts dans `.seo-data/`. Aucun chiffre inventé.

### 7.1 Cluster head EN (`keywords-muay-thai-camp-thailand.json`)

| Keyword | Vol/mo US | Diff | Note |
|---|---:|:---:|---|
| muay thai camp thailand | **1 900** | 29 | **primary** — transactional 0.60, LOW comp (idx 8), CPC 0.73 $ |
| muay thai training camp thailand (+5 permutations) | 1 900 | — | même cluster, LOW (idx 9) |
| all inclusive muay thai camps in thailand | 140 | — | section #packages |
| phuket thailand muay thai camp | 110 | — | géo concurrente (ne pas cibler) |
| best muay thai camp(s) thailand | 70×2 | — | intent listicle → blog E8 |
| muay thai camp thailand bangkok | 70 | — | géo concurrente |
| muay thai camp thailand price | 30 | — | section #packages |
| thailand muay thai camp packages | 30 | — | section #packages |
| muay thai fitness camp thailand | 20 | — | prose |
| cheapest / luxury / 1 month / women / krabi / weight loss | 10 ch. | — | prose ou ignoré |

NB : "tiger muay thai" (4 400/mo) = branded concurrent, ignoré.

### 7.2 Cluster local CM (`keywords-muay-thai-camp-chiang-mai.json`)

| Keyword | Vol/mo US | Note |
|---|---:|---|
| muay thai camp chiang mai | 70 | diff 28 — possédé par **Home** (cf. structure-train §2), brand-dominé (Lanna 260, Dang 170) |
| best muay thai gym chiang mai | 40 | `/classes` (FAQ) |
| muay thai training camp chiang mai | 10 | l'angle actuel du pillar… → d'où le re-cadrage national |

### 7.3 Seeds invalidés (décision "ne pas créer")

| Topic | Vol/mo | Fichier |
|---|---:|---|
| muay thai camp accommodation | **0** | `keywords-muay-thai-camp-accommodation.json` |
| muay thai holiday thailand | 10 | `keywords-muay-thai-holiday-thailand.json` |
| stay and train muay thai | **0** | `keywords-stay-and-train-muay-thai.json` |
| scooter rental chiang mai | 210 (hors silo) | `keywords-scooter-rental-chiang-mai.json` |
| sejour muay thai thailande (FR) | **0** | `keywords-sejour-muay-thai-thailande-FR.json` |

### 7.4 Cluster FR (cache 2026-06-04, `keywords-muay-thai-thailande-FR.json`)

| Requête FR | Vol/mo FR |
|---|---:|
| camp muay thai thailande | 210 |
| stage muay thai thailande | 140 |
| stage boxe thaï thaïlande prix | 140 |
| camp muay thai thailande français | 70-80 |
| camp muay thai chiang mai | 40 |

### 7.5 SERP "muay thai camp thailand" (`serp-muay-thai-camp-thailand.json`)

- **Intent** : transactional-commercial (comparison shopping pré-réservation) · **PAA** : cost · beginners ok ? · which is best · how long · safety · visa · **Chiang Mai vs Phuket**
- **Page 1** : homepages de camps Phuket/Bangkok (Tiger, Bangtao, Sumalee, YOKKAO, Khongsittha, The Camp, Battle Conquer) + 1 listicle — Chiang Mai quasi absent
- **Gap (8/10)** : tous les leaders sont "elite/boot-camp" ("Built for Training, Not for Comfort", quotes UFC) — l'opposé exact de Wildcat ; prix THB transparents absents des pages qui rankent alors que le coût est la PAA n°1 ; DTV mentionné par 1 seul résultat, jamais expliqué
- **Angle retenu** : l'alternative chaleureuse, familiale, woman-led, open-air de Chiang Mai face aux fight camps usines — prix THB sur la page + vraie passerelle DTV + réassurance débutants

### 7.6 SERP "all inclusive muay thai camps in thailand" (`serp-all-inclusive-muay-thai-camps-thailand.json`)

- **Intent** : commercial-investigation (que couvre "all inclusive", à quel prix, débutants ok ?)
- **Page 1** : mega-camps Phuket + agrégateurs (NOW Muay Thai, Tripaneer) qui **cachent les prix** pour forcer la réservation
- **Gap (7/10)** : personne ne combine le vrai calcul THB + table "inclus vs à organiser soi-même" + petit camp familial Chiang Mai
- **Verdict** : **section `#packages` du pillar, PAS de page dédiée** — Wildcat n'a pas de package chambre+repas bundlé, une page "all inclusive" sur-promettrait. L'honnêteté ("training all-inclusive, room + meals nearby — we help you arrange them") est le différenciateur ⚠️ à confirmer Q-A/Q-B §5

### 7.7 SERP FR "camp muay thai thailande" (`serp-camp-muay-thai-thailande-FR.json`)

- **Intent** : commercial-investigation pré-achat (séjour 1 sem-1 mois)
- **Page 1** : listicles FR sans réservation (Le Poing Boxe, FrancoThai, epicfitness — E-E-A-T faible, zéro auteur), agences à marge (Odysway 770 € pour Pai), camps EN ou hors CM (Tiger=Phuket, Rawai=Khao Lak)
- **Gap (8/10)** : personne ne réunit camp réservable en direct + familial + francophone + Chiang Mai — la niche "français" est vierge
- **SERP "stage" vs "camp"** : forte recouvrance — "stage" tire vers les packages datés d'agences, "camp" vers les lieux. **Une seule page** : H1 "camp", "stage" en H2/variante
- **Angle retenu** : LE camp francophone et familial de Chiang Mai — "on vous accueille en français, vous réservez en direct, au tarif réel en bahts"

### 7.8 Inventaire fichiers `.seo-data/` du batch Stay

```
keywords-muay-thai-camp-thailand.json            # primary pillar (1900/mo)
keywords-muay-thai-camp-chiang-mai.json          # local — possédé par Home
keywords-muay-thai-camp-accommodation.json       # invalidé (0)
keywords-muay-thai-holiday-thailand.json         # invalidé (10)
keywords-stay-and-train-muay-thai.json           # invalidé (0)
keywords-scooter-rental-chiang-mai.json          # invalidé (hors silo)
keywords-sejour-muay-thai-thailande-FR.json      # invalidé (0) — FR = camp/stage
keywords-muay-thai-thailande-FR.json             # cache 2026-06-04, cluster FR
serp-muay-thai-camp-thailand.json                # gap EN head
serp-all-inclusive-muay-thai-camps-thailand.json # verdict section #packages
serp-camp-muay-thai-thailande-FR.json            # gap FR
topics-stay.txt                                  # seeds du batch
```

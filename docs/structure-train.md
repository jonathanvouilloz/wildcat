# Structure — Silo Train (classes / camp / stage)

> **Décision d'architecture du 2026-06-04** — data-driven (DataForSEO EN/US + UK + FR, scans SERP ×2).
> Remplace le plan initial du mega menu (9 pages potentielles) par une structure resserrée.
> Source data : `.seo-data/keywords-*.json` + `.seo-data/serp-*.json` (synthèse complète en **§7 Annexe data**) · Briefs : `content/_drafts/pages/classes-*.md`.

---

## 0. Checklist d'exécution — étape par étape

> Cocher dans l'ordre. Chaque étape référence sa source. Rien d'autre n'est dans le scope du batch Train.

### Préparation (fait ✅)
- [x] Recherche keywords ×6 (US, UK, FR) → `.seo-data/keywords-*` (synthèse §7)
- [x] Scans SERP ×2 → `serp-muay-thai-classes-chiang-mai.json` + `serp-beginner-muay-thai-classes.json`
- [x] Architecture tranchée : 9 pages → 2 (validée par Jonathan, ce doc)
- [x] Briefs rédigés et validés : `content/_drafts/pages/classes-pillar.md` + `classes-beginners.md`

### Rédaction & intégration (fait ✅ — exécuté le 2026-06-04, branche `feat/train-cluster`)
- [x] **1. `/seo-write` satellite `/classes/beginners`** (création) — depuis `classes-beginners.md`, **variante A**. Byline Meaw, walkthrough minute-par-minute, zéro vocabulaire warrior. Drafts : `classes-beginners-draft-{en,fr}.md`
- [x] **2. `/humanizer`** sur le contenu beginners (patterns IA)
- [x] **3. Intégration Astro beginners** : `src/pages/[lang]/classes/beginners.astro` (pattern satellites DTV) + 106 clés `classes_beg_*` EN/FR (parité) + JSON-LD `Article` (author Meaw) + Breadcrumb + **FirstClassChecklist** (réutilise `DocChecklist` via prop `storageKey` — pas de composant dupliqué)
- [x] **4. Re-cadrage `/classes`** (édition) — les 7 modifs du brief : title/meta/H1 (variante A), intro, cards programs enrichies, section `#camp` "open-air family camp" (dark), phrase schedule, transparence pricing + liens long-stay, FAQ → 5 PAA. Modif 7 (CtaBanner) : déjà conforme, aucun changement
- [x] **5. Repointage Nav** : entrée "Beginner Muay Thai" → `/classes/beginners` (`Nav.astro`) — seul changement du menu
- [x] **6. Maillage entrant** : card Beginner pillar (label dédié `classes_prog1_more`) · home card prog1 · `/stay-train` (note débutants) · `/dtv-visa/eligibility` (route-card "Beginners welcome") + lien FAQ pillar → satellite
- [x] **7. Vérifs** : `npm run build` ✅ · parité 1165/1165 clés EN/FR · zéro lien cassé · `/seo-review` ×2 = **PASS** (1 fix : meta FR pillar raccourcie 185→143 car.)
- [x] **8. Tests Playwright** : +16 tests Train (FirstClassChecklist, byline, JSON-LD, #camp, maillage, nav, FR) — **51/51 PASS**
- [x] **9. Commit** branche `feat/train-cluster` (conventional commits, scope `train`)

### Avant mise en prod (bloquant)
- [ ] **10. Faits `[À VÉRIFIER]`** auprès de Meaw : adresse/quartier exacts du camp + temps de trajet depuis le centre (la copy publiée reste neutre : "easy to find, parking & scooter rental on site" — ⚠️ l'angle brief "proche Old City" est contredit par `site.ts` qui dit Hang Dong) · gants prêtés oui/non (la copy l'affirme — cohérent avec l'ancienne FAQ déjà en ligne) · âge minimum kids (omis de la copy en attendant)
- [x] **11. MAJ docs** : `PLAN.md` (E5c Train satellites) + `CLAUDE.md` état actuel

### Hors scope de ce batch (backlog — ne pas faire maintenant)
- [ ] Stay & Train batch 2 avec l'insight FR "camp/stage" (§5)
- [ ] Blog E8 : "Where to watch fights in Chiang Mai" (90/mo spectateur) · "Basic moves" tuto (170/mo)
- [ ] FAQPage JSON-LD silo Train (décision à l'implémentation, jamais 2 par silo)

---

## 1. Le verdict en une phrase

**9 pages prévues → 2 pages réelles** (pillar + 1 satellite). Le reste = sections/ancres du pillar
ou pages déjà existantes. La data a invalidé women/kids/all-levels/private/schedule/pricing
en tant que pages autonomes (0 volume ou cannibalisation pure).

---

## 2. Pages du silo — ce qu'on garde, ce qu'on vise

| Page | Statut | Intent EN (keyword · vol/mo) | Intent FR | Rôle |
|---|---|---|---|---|
| **`/classes`** (pillar) | ✅ Existe — re-cadrage (brief `classes-pillar.md`) | **Local/transactional** : "muay thai classes chiang mai" (90) + gym (260) + lessons/training (90×2) + prices (10). *Je suis à Chiang Mai (ou j'y vais), je cherche OÙ m'entraîner : programmes, horaires, prix.* | Même intent, volume FR faible. Title/meta FR : "cours de Muay Thai à Chiang Mai". Pas de keyword research FR dédiée (pas rentable). | Hub du silo. Distribue vers beginners, fighters, stay-train, dtv |
| **`/classes/beginners`** (satellite) | 🆕 À créer (brief `classes-beginners.md`) | **Informational→transactional** : "beginner muay thai classes" (1 000 · diff 0) + beginner (590) + thailand beginner (590). *Je n'ai jamais fait de Muay Thai, j'ai peur d'être ridicule : à quoi ressemble une première séance ?* | Même intent réassurance ("muay thai débutant"). FR = adaptation du contenu EN, tutoiement, pas de cluster FR séparé. | Meilleure opportunité SEO du silo. Landing first-timers, byline Meaw (E-E-A-T) |
| `/fighters` | ✅ Existe — inchangé | Fight team + livre d'or (brand/CMS). Pas de cible keyword propre pour l'instant. | idem | Absorbe l'entrée "Fight Team" du menu |
| ❌ `/classes/women` | **Ne pas créer** | 0 volume (US, et même Thaïlande entière) | 0 volume | Section/card du pillar (#programs) — sert conversion + brand, pas le SEO |
| ❌ `/classes/kids-family` | **Ne pas créer** | 0 volume | 0 volume | Section/card du pillar |
| ❌ `/classes/all-levels` | **Ne pas créer** | Aucune requête distincte — cannibalisation directe du pillar | — | C'est le pillar lui-même |
| ❌ `/classes/private` | **Ne pas créer** (V1) | "private sessions" → couvert par card pillar + pricing | — | Réévaluer seulement si la demande réelle (WhatsApp) le justifie |
| ❌ `/fight-team` | **Ne pas créer** | Doublon de `/fighters` | — | — |
| ❌ `/schedule`, `/pricing` | **Ne pas créer** | Zéro demande autonome → thin content | — | Ancres `#schedule` / `#pricing` du pillar (déjà câblées partout) |

### Anti-cannibalisation — qui possède quoi

| Requête | Page propriétaire |
|---|---|
| `muay thai chiang mai` (head, 590) · `muay thai camp chiang mai` | **Home** (brand/camp) — interdit en title/H1 ailleurs |
| `muay thai classes/gym/lessons/training chiang mai` + prices | `/classes` |
| `beginner muay thai *` + `muay thai thailand beginner` | `/classes/beginners` |
| `muay thai training thailand` · stay and train · packages | `/stay-train` |
| `dtv` + long stay 6+ mois | silo `/dtv-visa` |
| `muay thai chiang mai fights` (90 — intent **spectateur**) | Personne → idée blog E8 ("Where to watch fights in Chiang Mai") |
| `beginner basic moves / drills` (170+50 — intent tuto) | Effleuré sur beginners → deep-dive = blog E8 |

---

## 3. Mega menu — la structure UX ne bouge pas

**Décision : on garde les 9 entrées du menu Train** (elles aident l'utilisateur à se projeter),
seules les cibles changent. Le menu est de l'UX, pas de l'architecture d'URL.

| Entrée menu | Cible actuelle | Cible après |
|---|---|---|
| Beginner Muay Thai | `/classes#programs` | **`/classes/beginners`** ← seul changement |
| All-Levels Classes | `/classes#programs` | inchangé |
| Private Sessions | `/classes#programs` | inchangé |
| Women's Muay Thai | `/classes#programs` | inchangé |
| Kids & Family | `/classes#programs` | inchangé |
| Fight Team | `/fighters` | inchangé |
| Class Schedule | `/classes#schedule` | inchangé |
| Pricing & Passes | `/classes#pricing` | inchangé |
| Free Trial Class | `/contact` | inchangé |

> Clarté utilisateur visée : **Classes = quoi/quand/combien · Beginners = je commence ·
> Fighters = je compète · Stay & Train = je viens séjourner · DTV = je reste longtemps.**

---

## 4. EN vs FR — règle générale

**Structure identique, contenu localisé.** Mêmes slugs EN dans toutes les locales
(`/en/classes/beginners`, `/fr/classes/beginners`), mêmes composants, mêmes sections.
Ce qui change par locale (via clés Paraglide, jamais de traduction littérale des keywords) :

1. **Title / meta / H1** : calés sur le vocabulaire réel de la langue
   (EN "classes" · FR "cours", et surtout FR "camp/stage" côté séjours — voir §5).
2. **Prose** : formulations naturalisées par langue, tutoiement en FR.
3. **Intent nuancé** : l'EN cherche des *classes* (drop-in local), le FR cherche
   majoritairement un *séjour* (camp/stage) → les pages FR appuient davantage le
   cross-link vers `/stay-train`.

Méthodo keyword : **EN = US comme proxy de pilotage** (vérifié : UK ≈ US, ratios identiques) ;
**FR = recherche France** comme proxy CH/BE, uniquement quand une décision en dépend.

---

## 5. ⚠️ Insight FR majeur — pour le silo Stay & Train (backlog, hors scope Train)

La recherche FR (2026-06-04, France) a montré que **le FR ne cherche pas des cours, il
cherche des séjours** :

| Requête FR | Vol/mo |
|---|---:|
| camp muay thai thailande | 210 |
| stage muay thai thailande | 140 |
| stage boxe thaï thaïlande **prix** | 140 |
| camp muay thai thailande **français** | 70-80 |
| camp muay thai chiang mai | 40 |

**Actions backlog (batch Stay & Train, pas maintenant) :**
- Re-cibler le `/stay-train` **FR** sur "camp/stage muay thai thaïlande" + section prix.
- Exploiter l'angle **francophone** ("camp muay thai thailande français") — quasi personne
  ne sert cette niche, et le site a un FR natif.
- Data : `.seo-data/keywords-muay-thai-thailande-FR.json`.

---

## 6. Prochaines étapes

→ Voir la **checklist §0** (source de vérité de l'exécution).

---

## 7. Annexe data — synthèse des recherches (2026-06-04)

> Tous les chiffres ci-dessous viennent de DataForSEO (volumes US sauf mention) et des scans
> SERP du 2026-06-04. Fichiers bruts dans `.seo-data/`. Aucun chiffre inventé.

### 7.1 Cluster local Chiang Mai (`keywords-muay-thai-chiang-mai.json` + `keywords-muay-thai-classes-chiang-mai.json`)

| Keyword | Vol/mo US | Difficulty | Page cible |
|---|---:|:---:|---|
| muay thai chiang mai (head) | 590 | 14 | **Home** |
| muay thai gym chiang mai (+7 variantes identiques) | 260 | ~10 | `/classes` |
| muay thai chiang mai class / classes chiang mai | 90 | 10 | `/classes` |
| muay thai chiang mai training | 90 | — | `/classes` |
| muay thai lessons chiang mai | 90 | — | `/classes` |
| muay thai chiang mai fights | 90 | — (MEDIUM comp) | blog E8 (intent spectateur) |
| muay thai chiang mai camp (variante UK forte) | 90 UK | — | Home / `/stay-train` |
| best muay thai gym chiang mai | 40 | — | `/classes` (FAQ) |
| chiang mai muay thai gym prices | 10 | — | `/classes#pricing` |
| muay thai beginner class chiang mai | 10 | — | `/classes/beginners` |

Vérification UK (`keywords-muay-thai-chiang-mai-UK.json`) : head = **590/mo au UK aussi**,
ratios identiques → US fiable comme proxy EN ; marché EN total ≈ 2-3× les chiffres US.

### 7.2 Cluster beginner (`keywords-beginner-muay-thai.json`)

| Keyword | Vol/mo US | Difficulty | Note |
|---|---:|:---:|---|
| beginner muay thai class(es) | 1 000 | 13 (comp idx) | **primary du satellite** |
| beginner muay thai | 590 | **0** | |
| muay thai thailand beginner | 590 | — | section "Thailand vs back home" |
| beginner muay thai basic moves | 170 | — | effleurer — deep-dive = blog E8 |
| beginner muay thai near me | 90 | — | **ignorer** (intent local US, non capturable) |
| beginner muay thai training | 70 | — | body |
| beginner muay thai drills | 50 | — | blog E8 |
| muay thai near me / classes near me | 49 500 / 14 800 | — | **ignorer** (local US) |

### 7.3 Clusters invalidés (décision "ne pas créer")

| Topic recherché | Vol/mo | Fichier |
|---|---:|---|
| womens muay thai chiang mai | **0** | `keywords-womens-muay-thai-chiang-mai.json` |
| womens muay thai thailand (sans geo) | **0** | `keywords-womens-muay-thai-thailand.json` |
| kids muay thai chiang mai | **0** | `keywords-kids-muay-thai-chiang-mai.json` |

### 7.4 Cluster FR — France (`keywords-muay-thai-thailande-FR.json`)

| Requête FR | Vol/mo FR | Note |
|---|---:|---|
| camp muay thai thailande | 210 | > head "muay thai thailande" (90) ! |
| stage muay thai thailande | 140 | "stage" = concept FR sans équivalent EN direct |
| stage boxe thaï thaïlande prix | 140 | intent prix fort |
| camp muay thai bangkok / koh samui / phuket | 140/110/90 | géos concurrentes |
| muay thai thailande (head) | 90 | diff 0 |
| camp muay thai thailande français | 70-80 | **niche francophone quasi vierge** |
| camp muay thai chiang mai | 40 | |
| apprendre le muay thai en thailande | 10 | |

→ Conclusion : l'intent FR = **séjour** (camp/stage), pas cours hebdo → backlog `/stay-train` FR (§5).

### 7.5 SERP "muay thai classes chiang mai" (`serp-muay-thai-classes-chiang-mai.json`)

- **Intent** : mixed (local + transactional) · **Features** : Local Pack ✅ · Image Pack ✅ · PAA ✅ · Snippet ❌
- **Page 1** : Dang (n°1 — indoor "best/biggest", prix 450/650 THB affichés, 3 500+ avis, offre DTV 20 000 THB), Tiger CM (n°2 — 24 km hors ville, prix cachés), Muay Thai Fever (400/700 THB), topmuaythai (listicle "20-year local"), Santai (Hang Dong), The Camp (resort semi-privé), annuaire, gymbangarang (blog)
- **PAA** : cost of class in CM · is CM good for muay thai · need experience? · cost to train in Thailand · best gym in CM · can beginners
- **Benchmark prix SERP** : drop-in 300-700 THB · mensuel 5 000-12 000 THB
- **Gap (high)** : personne ne mène avec famille + open-air ; prix transparents ET planning rarement réunis sur une page ; "all levels welcome" jamais incarné (femmes/enfants/first-timers)
- **Angle retenu** : l'alternative transparente et famille-friendly — prix publics + planning sur la page, camp open-air golden-hour, *come for the fight stay for the family*

### 7.6 SERP "beginner muay thai classes" (`serp-beginner-muay-thai-classes.json`)

- **Intent** : mixed · **Features** : Local Pack ✅ · Video ✅ (playlist YT rank 5) · PAA ✅ · Snippet ❌
- **Page 1** : gyms US (X3 Atlanta n°1, Chicago, Short North, 10 Kicks…) + guides camps Thaï sans auteur (NOW Muay Thai ×2, Tiger Phuket)
- **PAA** : what to expect first class · good for beginners? · how long to learn · what to wear · is it hard · what to bring
- **Common ground** (couvrir sans en faire le focus) : structure de séance warm-up→cool-down · basic moves · réassurance générique · what to wear/bring · CTA trial
- **Gap (high)** : zéro récit first-person d'une vraie première séance en camp thaï open-air (chaleur, wai khru, étiquette ring, vibe famille vs intimidation) ; **zéro auteur nommé sur toute la SERP** → E-E-A-T grand ouvert pour Meaw
- **Angle retenu** : "ta vraie première séance de Muay Thai en Thaïlande", signée Meaw Boonpradub, minute par minute, anti-intimidation

### 7.7 Inventaire fichiers `.seo-data/` du batch Train

```
keywords-muay-thai-chiang-mai.json          # head local US
keywords-muay-thai-chiang-mai-UK.json       # vérif proxy UK
keywords-muay-thai-classes-chiang-mai.json  # primary pillar
keywords-beginner-muay-thai.json            # primary satellite
keywords-womens-muay-thai-chiang-mai.json   # invalidé (0)
keywords-womens-muay-thai-thailand.json     # invalidé (0)
keywords-kids-muay-thai-chiang-mai.json     # invalidé (0)
keywords-muay-thai-thailande-FR.json        # insight FR → backlog stay-train
serp-muay-thai-classes-chiang-mai.json      # gap pillar
serp-beginner-muay-thai-classes.json        # gap satellite
topics-train.txt / topics-train2.txt        # seeds des batchs
```

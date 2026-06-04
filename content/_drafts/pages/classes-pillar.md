# Brief SEO — Muay Thai Classes Chiang Mai (re-cadrage pillar /classes)

> Brief de cadrage sémantique pour le **re-cadrage** de la page pillar `/classes` (la page existe — E5).
> Protocole `/seo-brief` · **Module B — SEO Local & Services**.
> Site EN-first : tous les éléments de contenu (title, H1, Hn, meta, FAQ) sont en **anglais**.
> Ce brief liste les **modifications** à apporter, pas une page from scratch.

---

## 1. Metadata

| Champ | Valeur |
|---|---|
| **Slug** | `/classes` (inchangé — slug EN dans toutes les locales) |
| **Page type** | Pillar — silo Train (parent du satellite `/classes/beginners`) |
| **Module** | B — SEO Local (business local, intent mixed local/transactional) |
| **Keyword principal** | `muay thai classes chiang mai` (90/mo · difficulty 10 · LOW comp) |
| **Cluster élargi** | `muay thai gym chiang mai` (260/mo) · `muay thai chiang mai training` (90) · `muay thai lessons chiang mai` (90) |
| **Target word count** | ~900–1 200 mots de copy réelle (page composant, pas un article) |
| **Personas** | Principal : touriste aventurier / nomade 20-45 ans qui cherche un gym à Chiang Mai (mobile, compare 3-4 gyms). Secondaire : expat/DTV déjà sur place. |
| **Intent** | Mixed — local + transactional (Local Pack actif sur la SERP) |
| **Auteur (signature)** | "Meaw & the Wildcat family" (pas YMYL — signature légère suffit) |
| **Date** | Brief généré 2026-06-04 |
| **Lang** | en-US (primaire) + fr (secondaire, mêmes slugs) |

### ⚠️ Garde-fous cannibalisation (à respecter absolument)

| Le head term | Appartient à | Cette page vise |
|---|---|---|
| `muay thai chiang mai` (590/mo) | **Home** (brand/camp) | — ne PAS le mettre en title/H1 ici |
| `muay thai camp chiang mai` / "stay & train" | `/stay-train` (séjours) | — |
| `beginner muay thai classes` (1000/mo) | `/classes/beginners` (satellite) | — résumé + lien uniquement |
| `muay thai classes/gym/lessons/training chiang mai` + `prices` | **cette page** | ✅ |

---

## 2. Snippet block (×3 variantes)

> Title ≤ 60 chars · Meta ≤ 155 chars · H1 ≠ title (règle absolue).

### Variante A (recommandée — transparence prix + planning, attaque le gap)
- **Title** : `Muay Thai Classes in Chiang Mai — Schedule & Prices` (51 car.)
- **H1** : `Muay Thai classes in Chiang Mai, for every level` (49 car.)
- **Meta** : `Muay Thai classes in Chiang Mai at Wildcat: daily group & private training, public prices in THB, full weekly schedule. Beginners, women & kids welcome.` (152 car.)

### Variante B (famille / open-air — différenciateur brand)
- **Title** : `Muay Thai Classes Chiang Mai | Family Open-Air Camp` (51 car.)
- **H1** : `Train Muay Thai in Chiang Mai — at a camp that feels like family` (65 car.)
- **Meta** : `Join Muay Thai classes at Wildcat, a family-run open-air camp in Chiang Mai. Transparent prices, daily schedule, every level welcome. Book your first class.` (155 car.)

### Variante C (gym + prix — capte la variante 260/mo)
- **Title** : `Muay Thai Gym Chiang Mai: Classes, Prices & Timetable` (53 car.)
- **H1** : `Our Muay Thai classes, schedule and prices in Chiang Mai` (56 car.)
- **Meta** : `Looking for a Muay Thai gym in Chiang Mai? See Wildcat's class programs, weekly timetable and public prices — open-air training, all levels, kids welcome.` (153 car.)

**FR (mêmes slugs)** : title/meta calés sur le vocabulaire FR naturel — ex. title `Cours de Muay Thai à Chiang Mai — horaires et prix`, prose "cours de Muay Thai à Chiang Mai". Volume FR faible sur "cours" (l'opportunité FR majeure est "camp/stage muay thai thailande" → `/stay-train`, hors scope ici).

---

## 3. Keyword cluster

| Rôle | Query | Vol/mo | Placement | Forme naturalisée en prose |
|---|---|---|---|---|
| **Principal** | muay thai classes chiang mai | 90 | Title + H1 + intro + meta | "Muay Thai classes in Chiang Mai" |
| Secondaire fort | muay thai gym chiang mai | 260 | H2 (camp/vibe) + body | "our Muay Thai gym in Chiang Mai" / "a gym in Chiang Mai" |
| Secondaire | muay thai chiang mai training | 90 | H2 programs + body | "Muay Thai training in Chiang Mai" |
| Secondaire | muay thai lessons chiang mai | 90 | body (programs/private) | "Muay Thai lessons" / "private lessons in Chiang Mai" |
| Secondaire | best muay thai gym chiang mai | 40 | FAQ (Q "best gym") | "the best Muay Thai gym in Chiang Mai for you" |
| Long-tail | chiang mai muay thai gym prices | 10 | H2 pricing + FAQ | "Muay Thai gym prices in Chiang Mai" |
| Long-tail | muay thai beginner class chiang mai | 10 | résumé beginners + lien satellite | "a beginner Muay Thai class in Chiang Mai" |
| Long-tail (PAA) | how much does a muay thai class cost in chiang mai | — | FAQ Q1 | "how much a Muay Thai class costs in Chiang Mai" |
| Support | muay thai chiang mai fights | 90 | NE PAS cibler ici (intent spectateur — futur blog E8) | — |

---

## 4. Structure H2 — modifications de la page existante

> La page actuelle (`src/pages/[lang]/classes.astro`) a : PageHero, #programs (ProgramGrid 6 cards), #schedule (ScheduleTable), #pricing (4 groupes prix `site.ts`), FAQ (5 Q génériques), CtaBanner. **On garde l'ossature, on enrichit.**

### Modif 1 — Title / meta / H1 / intro (clés `classes_meta_*`, `classes_hero_*`)
- Appliquer la variante snippet retenue.
- Intro (lead) BLUF enrichie : qui (camp familial open-air), quoi (group + private, tous niveaux), preuves immédiates (prix publics en THB, planning complet plus bas, kids/women welcome). 2-3 phrases max, ton chaleureux.

### Modif 2 — H2 `#programs` : descriptions réelles par programme
- Les 6 cards existent (Beginner / All-Levels / Private / Women / Kids & Family / Fight Team) mais les body sont courts. Enrichir chaque card de 1-2 phrases concrètes (à quoi ressemble la séance, pour qui).
- **Card "Beginner Muay Thai" → href vers `/classes/beginners`** (au lieu de `/contact`) — c'est le lien pillar→satellite structurant.
- Card "Fight Team" → href `/fighters` (déjà le cas dans le nav).
- Women + Kids & Family restent des **sections/cards du pillar** (0 volume de recherche — décision archi 2026-06-04) mais leur copy doit être rassurante et spécifique (la promesse réelle, pas le générique "all levels welcome" — c'est le gap SERP).

### Modif 3 — H2 NOUVEAU : `An open-air family camp — not a fight factory` *(le gap SERP)*
- Section vibe/ancrage local (Module B) entre #programs et #schedule (ou après #pricing) :
  - Open-air, garden, golden hour — l'expérience physique du lieu vs gym indoor.
  - Woman-run, familial : femmes seules, débutants nerveux, enfants — nommés explicitement.
  - Ancrage géographique concret : quartier/zone de Chiang Mai, repères, comment venir `[À VÉRIFIER : adresse/quartier exacts — site.ts contact]`. En ville/proche ville = avantage vs Tiger (24 km) et Santai (Hang Dong) — formuler positivement ("easy to reach from the Old City") sans dénigrer.
- 100-150 mots max + 1 photo. Pas de lyrisme : concret, sensoriel, chaleureux.

### Modif 4 — H2 `#schedule` : inchangé structurellement
- Garder ScheduleTable (Sanity + fallback). Ajouter 1 phrase au-dessus : à quoi ressemble une journée type (morning/afternoon sessions) — capte "training".

### Modif 5 — H2 `#pricing` : renforcer la transparence (différenciateur SERP)
- Garder les 4 groupes de prix publics (source `site.ts`, ne rien inventer).
- Ajouter 1-2 phrases : "No hidden packages — these are our real prices" + repère marché honnête (les drop-in à Chiang Mai vont de ~300 à 700 THB — benchmark SERP) si le prix Wildcat s'y insère bien `[À VÉRIFIER vs site.ts]`.
- Mention douce long-stay : lien `/stay-train` (semaine/mois) et `/dtv-visa/long-stay-training` (6+ mois).

### Modif 6 — H2 FAQ : remplacer par les PAA de la SERP (5 Q)
- **Q1 — How much does a Muay Thai class cost in Chiang Mai?** → fourchette marché 300-700 THB + nos prix exacts (renvoi #pricing). Capte la PAA n°1.
- **Q2 — Do I need experience to join a class?** → non ; résumé 2 phrases + **lien `/classes/beginners`** ("see what your first class looks like").
- **Q3 — Is Chiang Mai good for Muay Thai?** → oui : berceau du style nord, gyms authentiques, coût de vie — ton factuel, pas "we're the best".
- **Q4 — Which is the best Muay Thai gym in Chiang Mai?** → réponse honnête : dépend de ce que tu cherches (fight-focused vs famille/open-air) ; ce que Wildcat est — et n'est pas. E-E-A-T par honnêteté.
- **Q5 — Can my kids train too?** → oui, programme Kids & Family, horaires, à partir de quel âge `[À VÉRIFIER]`.
- Les 5 Q actuelles (`faq_q1-5`) : réutiliser ce qui matche, remplacer le reste.

### Modif 7 — CtaBanner : inchangé (book class + WhatsApp). Vérifier que le wording reste chaleureux non pressant.

---

## 5. Maillage interne

### Liens entrants (vers `/classes`) — existants à vérifier, rien à créer
Nav mega-menu (9 entrées Train → ancres), Footer, home (#programs, pricing), `/stay-train`, `/dtv-visa/long-stay-training` (coût de la vie), satellites DTV. ✅ déjà câblés.

### Liens sortants (depuis `/classes`) — à ajouter/repointer
| Cible | Ancre exacte | Contexte |
|---|---|---|
| `/classes/beginners` ⭐ nouveau | `what your first class looks like` | Card Beginner (#programs) + FAQ Q2 |
| `/fighters` | `meet our fight team` | Card Fight Team |
| `/stay-train` | `stay & train packages` | Section pricing (long-stay douce) |
| `/dtv-visa/long-stay-training` | `training 6+ months on a DTV` | Section pricing |
| `/contact` (CTA hot) | `Book your first class` | Hero + CtaBanner |
| WhatsApp (`site.contact.whatsapp`) | `Chat on WhatsApp` | CtaBanner |
| `/about#coaches` | `meet the coaches` | Section open-air family camp |

### Nav (modif structurelle liée)
- Entrée mega-menu "Beginner Muay Thai" : repointer `/classes#programs` → **`/classes/beginners`** (clé existante `nav_train_beginner_*`).
- Les autres entrées restent sur les ancres (décision archi : 9 entrées UX, 2 vraies pages).

---

## 6. E-E-A-T / signaux locaux (Module B)

- **Preuve sociale locale** : section témoignages (CMS `testimonial` + fallback) — verbatim intégral, jamais inventé. Si dataset vide : skip la section (safeQuery pattern).
- **Coachs réels** : renvoi `/about#coaches` (les profils nommés sont là — pas de duplication).
- **Prix publics + planning sur la même page** = le signal de confiance n°1 identifié sur la SERP (Tiger/Santai/The Camp les cachent).
- **Géographie concrète** : quartier, repères, accès `[À VÉRIFIER : données réelles site.ts — adresse exacte TODO(real data)]`.
- **Honnêteté positionnement** : "ce qu'on est / ce qu'on n'est pas" (FAQ Q4) — anti "biggest/best" que tout le monde claironne.
- Marque **Wildcat** (jamais WildCat) · banned : warrior, beast mode, hardcore, world-class, no pain no gain.

---

## 7. Angle unique & gap (depuis le SERP JSON)

**Recommended angle (repris du serp JSON)** :
> Faire de `/classes` **l'alternative transparente et famille-friendly** : prix publics complets + planning hebdo lisible directement sur la page, le tout cadré par le camp open-air golden-hour où femmes, enfants et débutants nerveux sont explicitement bienvenus — *come for the fight, stay for the family* — à l'opposé du pitch "biggest/hardest gym" que répète toute la page 1.

**Le gap concurrentiel** : la SERP est dominée par du branding indoor "best/biggest" (Dang, 3 500+ avis), des training resorts hors ville (Tiger 24 km, Santai Hang Dong, The Camp) et des listicles éditoriaux. Personne ne mène avec un positionnement chaleureux famille + open-air ; peu combinent prix transparents ET planning clair sur une seule page ; "all levels welcome" reste générique, jamais incarné pour les femmes/enfants/first-timers.

**Différenciateurs à activer** : (1) prix + planning sur la page (déjà fait, à valoriser) ; (2) section open-air family camp ; (3) FAQ honnête "best gym" ; (4) cards programmes avec vraie réassurance ; (5) lien fort vers le satellite beginners.

---

## 8. Image briefs

### Image 1 — section "open-air family camp" (4:3)
- **type** : photo · **subject** : le ring/la zone d'entraînement open-air à la golden hour, végétation visible
- **alt** : `Open-air Muay Thai training area at Wildcat gym in Chiang Mai`

### Image 2 — section programs ou schedule (4:3)
- **type** : photo · **subject** : séance de groupe mixte (femmes + hommes, niveaux variés), coach thaï qui corrige une position, ambiance détendue
- **alt** : `Group Muay Thai class for all levels in Chiang Mai`

> Hero existant conservé. Photos réelles du camp prioritaires (E-E-A-T) — pas de stock "warrior gym" sombre.

---

## 9. JSON-LD

- **BreadcrumbList** (auto, composant existant).
- **Pas de FAQPage pour l'instant** — la FAQ on-page sert le lecteur ; si on balise un jour le silo Train, ce sera ici (1 FAQPage max par silo, pattern E5b). Décision à prendre à l'implémentation, pas bloquant.
- Optionnel : `SportsActivityLocation`/`ExercisePlan` — overkill V1, skip.

---

## 10. Sources & data

- `.seo-data/keywords-muay-thai-classes-chiang-mai.json` · `.seo-data/keywords-muay-thai-chiang-mai.json` (head réservé home)
- `.seo-data/serp-muay-thai-classes-chiang-mai.json` (PAA, common_ground, gap, angle)
- Benchmark prix SERP : drop-in 300-700 THB (Dang 450/650, Fever 400/700, listicle 300-600 + 5-12k/mois)
- Concurrents page 1 : Dang (n°1, indoor, DTV 20 000 THB — intel pour le silo DTV), Tiger CM, Muay Thai Fever, topmuaythai (listicle), Santai, The Camp
- Page existante : `src/pages/[lang]/classes.astro` · prix : `src/config/site.ts` (source de vérité, ne jamais dupliquer en dur)
- `docs/identity.md`, `docs/voice.md`, `docs/seo-context.md`

---

## 11. Objectif business

Capter le trafic local-intent "classes/gym/lessons/training chiang mai" (~530/mo cumulé EN) et convertir en **réservations de première séance** (`/contact` + WhatsApp). Rôle de hub du silo Train : distribuer vers `/classes/beginners`, `/fighters`, `/stay-train` (upsell séjour) et `/dtv-visa/long-stay-training` (upsell DTV).

---

*Brief prêt pour `/seo-write` (mode re-cadrage : éditer la page + messages existants, pas créer un fichier). Rappels : prix uniquement depuis `site.ts` · données géo réelles `[À VÉRIFIER]` avant prod · head "muay thai chiang mai" interdit en title/H1 (réservé home) · prose naturalisée · ton chaleureux, zéro vocabulaire warrior.*

# Brief SEO : Burning Season in Chiang Mai 2026 — Trainer's Honest Guide

## Contexte chargé (Phase 0)

- `project.yaml` ✓ — localisation multilingue, EN source, `draft_locale_strategy: shared` (pas de sous-dossier de locale sous `content/_drafts/blog/`), `required_fields` frontmatter confirmés.
- `docs/brand/identity.md` ✓ — positionnement, audience, ton (warm/genuine/encouraging/down-to-earth), banned words (WildCat, warrior/hardcore).
- `docs/brand/message.md` ✓ — promesse, CTA map (chaud `/contact?intent=dtv`, tiède `/contact` WhatsApp).
- `docs/brand/voice.md` ✓ — auteur Meaw Boonpradub, règles YMYL (précision factuelle, jamais de promesse de résultat, disclaimer obligatoire sur les sujets sensibles).
- `docs/brand/patte-ecrite.md` ✓ — ouverture par une situation vécue, Meaw à la 1re personne, nommer les limites, CTA unique en fin d'article.
- `docs/brand/anti-patterns.md` ✓ — pas de superlatifs non prouvés, pas de faits/prix/âges inventés, pas de préfixe `/en/`/`/fr/` sur les liens internes.
- `docs/brand/proofs.md` ✓ — prix/horaires = `site.ts` (documenté), expérience Meaw = documentée pour le fonctionnement général du camp (le DTV spécifiquement reste "needs_review" mais n'est pas le sujet ici), aucun testimonial spécifique "qualité de l'air" disponible → ne pas en fabriquer.
- `docs/brand/themes.md` ✓ — "vie pratique à Chiang Mai liée à l'entraînement" = territoire adjacent autorisé ; "contenu médical non expert" = hors territoire → le disclaimer santé doit rester informatif, jamais un avis médical individualisé.
- `docs/seo/context.md` ✓ — persona secondaire (combattant en formation / nomade sportif) = cible principale de cet article ; persona principal (digital nomad DTV) = cible secondaire (planifie aussi un séjour long).
- `docs/seo/competitors.md` ✓ — cabinets juridiques DTV (hors sujet ici) + camps concurrents muets sur le sujet training/qualité de l'air.
- `docs/seo/content-map.md` ✓ — `/classes#schedule`, `/stay-train`, `/about/coaches`, `/contact` résolus depuis la carte, sans préfixe de locale.

**Fallback signalé** : aucun. Tous les fichiers canoniques v3 existent.

## Phase 0 bis — Research bundle ingéré

| Fichier | Utilisé pour |
|---|---|
| `.seo-data/keywords-burning-season-chiang-mai-en.json` | Cluster de mots-clés (Étape 3) — primary 210/mo, secondaires jusqu'à 480/mo, longue traîne |
| `.seo-data/serp-burning-season-chiang-mai.json` | Gap analysis (Étape 2) — angle recommandé, PAA, common ground à couvrir sans copier |
| `.seo-data/gatekeeper-burning-season-chiang-mai.json` | Verdict PASS confirmé — grounding fort (Meaw vit et fait tourner le camp à Chiang Mai à l'année) |

Aucun `gsc-*.json` disponible (article encore en squelette démo, jamais publié réellement — zéro data GSC existante).

## Vérification anti-cannibalisation

Scan de `src/content/blog/en/` (15 fichiers `.md` + 2 `.mdx`) : aucun autre article ne traite la saison des feux, la qualité de l'air ou l'AQI. Le seul fichier concerné est `src/content/blog/en/burning-season-chiang-mai.md` lui-même — c'est le squelette de démo E8 (`draft: true`, bandeau "Article de démo") que ce brief remplace en place, même slug, même `translationKey: burning-season`. Aucune version FR n'existe (`src/content/blog/fr/burning-season*.md` = 0 résultat) — normal, cet article reste EN-only pour l'instant.

## Metadata

- **Slug** : `burning-season-chiang-mai` (imposé — c'est aussi le nom de fichier à remplacer, `translationKey` inchangé)
- **Slug rationale** : descriptif, préserve l'entité "Chiang Mai" + le terme de recherche exact, evergreen malgré le sujet saisonnier (l'année 2026 vit dans le title/H1/contenu, jamais dans le slug)
- **Page type** : article
- **Module** : C — YMYL/Expert (qualité de l'air = sujet santé)
- **Target word count** : 1700–2000 mots (comparable à `dtv-visa-cost-breakdown.md` ~1750 mots ; module C impose disclaimer + section sources + vulgarisation en plus du contenu standard)
- **Primary keyword** : burning season chiang mai (210/mo, LOW difficulty)
- **Date** : 2026-08-06
- **Persona** : cible principale = combattant en formation / nomade sportif, 20-35 ans, qui planifie un séjour training et découvre tardivement que "burning season" peut tomber sur ses dates ("est-ce que je peux quand même m'entraîner ? à quel point c'est grave ? qu'est-ce que le camp change concrètement ?"). Cible secondaire = digital nomad/expat DTV qui pose la même question sur un séjour de plusieurs mois/années.
- **Tonalité** : warm, genuine, encouraging, down-to-earth — jamais minimisant sur le risque santé (YMYL), jamais alarmiste non plus
- **Registre** : EN direct et simple (audience non-native)
- **Contexte chargé depuis** : seo-context.md ✓ (+ identity/message/voice/patte-ecrite/anti-patterns/proofs/themes/content-map/competitors, cf. section ci-dessus)

## Module C — obligations spécifiques (YMYL/Expert)

Lu et appliqué depuis `module-c-ymyl-expert.md` :

1. **Disclaimer obligatoire en ouverture** (italique, juste après l'accroche vécue) :
   > *This article shares how we adapt outdoor Muay Thai training to Chiang Mai's air quality — it isn't medical advice. If you have asthma, a heart or lung condition, are pregnant, or are training with young children, check the current AQI and talk to a doctor before intense outdoor exercise during high-pollution periods.*
2. **Section "témoignages"** : aucun testimonial client spécifique à la qualité de l'air n'existe dans `docs/brand/proofs.md` ni dans les collections Sanity/Content Collections actuelles → **ne pas en fabriquer**. L'ancrage E-E-A-T se fait via l'anecdote vécue de Meaw (la question WhatsApp récurrente en février) et sa description factuelle des ajustements du camp, pas via des citations clients inventées.
3. **Sources & consensus** : préférer les sources institutionnelles (IQAir, WHO, Thailand Pollution Control Department) — voir section Sources ci-dessous. Toutes les dates de burning season, seuils AQI et causes doivent être sourcées, pas approximées de mémoire.
4. **Vulgarisation** : expliquer AQI et PM2.5 entre parenthèses à leur première occurrence (ex. "PM2.5 (fine particles small enough to enter the lungs)").

## Snippet recommandé (variante Expertise — E-E-A-T)

- Title : `Burning Season in Chiang Mai 2026: Trainer's Honest Guide` (57 car.)
- H1 : `What Burning Season in Chiang Mai Really Means for Your Training` (64 car.)
- Meta description : `How Wildcat adapts Muay Thai training during Chiang Mai's burning season, month by month, from someone who trains here year-round.` (130 car.)

**Pourquoi cette variante** : le gap SERP identifié est exactement l'angle "expert vécu" (aucun concurrent n'a d'auteur qui s'entraîne réellement en extérieur toute l'année à Chiang Mai) — c'est le signal E-E-A-T qui différencie, pas le prix ni la localisation seule.

## Snippet variantes

**Variante Solution (douleur)**
- Title : `Training Through Chiang Mai's Burning Season: Can You?` (54 car.)
- H1 : `Can You Really Train Outdoors During Chiang Mai's Burning Season?`
- Meta : `Yes, you can train through burning season in Chiang Mai — just not the same way every month. Here's the honest, month-by-month plan.` (134 car.)

**Variante Local (GEO)**
- Title : `Chiang Mai Burning Season: Training Guide From the Camp` (55 car.)
- H1 : `Chiang Mai's Burning Season, Explained by a Camp That Trains Through It`
- Meta : `Local, honest guide to Chiang Mai's burning season for anyone planning a Muay Thai training trip, written by the camp that trains here daily.` (146 car.)

## Keyword Cluster

| Role | Keyword (query brut) | Volume | Où le placer | Formulation naturelle (prose) |
|---|---|---|---|---|
| **Principal** | burning season chiang mai | 210/mo | Title, H1, intro, meta | burning season in Chiang Mai |
| Secondaire | burning season thailand | 480/mo | H2 "What Burning Season Actually Is", body | burning season in Thailand |
| Secondaire | chiang mai burning season | 210/mo | H2 "What Burning Season Actually Is", body | Chiang Mai's burning season |
| Secondaire | when is burning season in chiang mai | 90/mo | H2 "Month-by-Month Calendar", FAQ | when burning season happens in Chiang Mai |
| Secondaire | when does burning season start in chiang mai | 20/mo | H2 "Month-by-Month Calendar", FAQ | when burning season starts in Chiang Mai |
| Secondaire | how bad is burning season in chiang mai | 10/mo | H2 "How Bad the Air Gets", FAQ | how bad burning season actually gets in Chiang Mai |
| Long-tail | what is burning season chiang mai | 10/mo | Intro, FAQ | what burning season in Chiang Mai actually means |
| Long-tail | chiang mai burning season 2026 | 110/mo | Title, H2 "Month-by-Month Calendar" | Chiang Mai's 2026 burning season |
| Long-tail | thailand burning season 2026 | 40/mo | H2 "Planning a Training Trip" | Thailand's 2026 burning season |
| Long-tail | (PAA) is it safe to visit chiang mai during burning season | n/a | FAQ | whether it's safe to visit Chiang Mai during burning season |

**Rappel au writer** : utiliser toujours la colonne "Formulation naturelle" dans le corps du texte, jamais la forme brute du query — sauf dans les zones techniques (title, meta, H2/H3 exacts, alt text).

## Structure

### H2: What Burning Season in Chiang Mai Actually Is
Keywords cibles : burning season chiang mai, burning season thailand, chiang mai burning season
Bloc AEO : Definition
Contenu attendu : timing (mi/fin février à avril, pic mars), cause (brûlis agricoles Thaïlande/Laos/Myanmar + géographie de la vallée qui piège la fumée), vulgarisation PM2.5/AQI entre parenthèses. Ouvrir par l'anecdote vécue (question WhatsApp récurrente en février) avant cette section, pas dedans.

#### H3: How Bad the Air Actually Gets (and How We Know)
Keywords cibles : how bad is burning season in chiang mai
Contenu attendu (fusionné depuis un H2 séparé — révision brief-critic, sous-partie AQI de la définition) : seuils AQI concrets (santé "unhealthy" ~100+, "hazardous" ~300+), sourcé IQAir/OMS, sans dramatiser ni minimiser. Mentionner qu'on suit l'AQI en temps réel (app/monitor) — pratique courante déjà citée par tous les concurrents, à garder factuelle et brève ici (common ground, pas l'angle différenciant).

### H2: The Honest Month-by-Month Training Calendar
Keywords cibles : when is burning season in chiang mai, when does burning season start in chiang mai, chiang mai burning season 2026
Bloc AEO : Comparison
Contenu attendu : tableau ou liste Nov-Jan (excellent, meilleurs mois) / février (variable) / mars (pic, souvent mauvais) / avril début (variable, Songkran nettoie généralement l'air) / mai-octobre (saison des pluies, bon). Lier vers `/classes#schedule` pour les horaires réels du camp à ce moment (utile pour visualiser une semaine type).

### H2: How We Adapt Training When the Air Turns Bad
Keywords cibles : aucun volume dédié — c'est l'angle différenciant (gap SERP), à développer le plus en détail et à la première personne (Meaw)
Bloc AEO : Evidence-sandwich
Contenu attendu : ce que le camp change concrètement les jours d'AQI élevé — décaler les séances, réduire le volume cardio, déplacer le travail technique sous le ring couvert, la piscine qui aide. Honnête : "personne ne prétend que c'est idéal, mais personne n'arrête l'entraînement non plus". Ne pas inventer de seuil AQI précis auquel le camp bascule s'il n'existe pas de règle écrite — rester au niveau de "ce qu'on observe et ajuste", pas d'un protocole chiffré non vérifié.

#### H3: Who Should Be Extra Careful During Burning Season
Keywords cibles : aucun — section santé obligatoire (Module C)
Contenu attendu (rétrogradé depuis un H2 séparé — révision brief-critic, nuance de prudence rattachée à l'angle "comment le camp adapte l'entraînement") : asthme, conditions cardiaques/pulmonaires, grossesse, jeunes enfants, personnes âgées — recommandation de vérifier l'AQI et consulter un médecin avant un effort intense en extérieur pendant les pics. Ton informatif, jamais un diagnostic individualisé (hors territoire selon `themes.md`).

### H2: Planning a Training Trip Around Burning Season
Keywords cibles : thailand burning season 2026
Bloc AEO : —
Contenu attendu : conseil pratique de réservation — pleine flexibilité → viser novembre-janvier ; dates tombant en mars → contacter le camp avant de réserver pour un avis honnête sur la semaine concernée. Lier `/stay-train` (packages) et `/contact` (WhatsApp) ici.

### H2: FAQ — Burning Season and Training in Chiang Mai
Keywords cibles : what is burning season chiang mai, how bad is burning season in chiang mai, is it safe to visit chiang mai during burning season
Bloc AEO : —
Contenu attendu : 4-5 questions en H3, dérivées du `people_also_ask` du scan SERP + longue traîne restante. Réponses courtes et directes (2-4 phrases), cohérentes avec le corps de l'article, aucune répétition mot pour mot des sections précédentes.

### H2: Sources and References
Bloc AEO : —
Purpose : citations datées (obligatoire YMYL) — voir section Sources ci-dessous, format identique à `dtv-visa-cost-breakdown.md` (liste à puces avec URL + date de consultation, sera complétée par `/seo-sources`).

## Maillage interne (liens sortants)

| Ancre | Cible | Section | Obligatoire |
|---|---|---|---|
| our full training schedule | `/classes#schedule` | How We Adapt Training | Oui |
| Stay & Train packages | `/stay-train` | Planning a Training Trip | Oui |
| message us on WhatsApp | `/contact` | Planning a Training Trip / CTA | Oui |
| long-stay training budget | `/dtv-visa/long-stay-training` | Planning a Training Trip | Non — pertinent pour la persona DTV secondaire, à garder si le flux du texte le permet naturellement |
| meet Meaw and the coaches | `/about/coaches` | How We Adapt Training | Non — renfort E-E-A-T, optionnel |

Tous issus de `docs/seo/content-map.md`. URLs sans préfixe de locale (le plugin rehype ajoute `/en` ou `/fr` au build — ne jamais écrire `/en/...` à la main).

## Slug (rappel)

Voir Metadata ci-dessus — slug imposé par la tâche, cohérent avec le fichier à remplacer.

## Image Briefs

### Cover
- **Placement** : cover
- **Type** : photo
- **Fichier de sortie** : `src/content/blog/covers/burning-season-chiang-mai.webp` (remplace le placeholder `burning-season-demo.webp` — mettre à jour la référence frontmatter en `../covers/burning-season-chiang-mai.webp`)
- **Subject** : séance d'entraînement en extérieur au camp, golden hour, légère brume atmosphérique visible dans le ciel en arrière-plan
- **Description** : photo DSLR naturelle, chaude, dans le style moodboard (`docs/design/moodboard.md`) — ring open-air, végétation tropicale, lumière dorée de fin de journée. La brume doit être perceptible mais discrète (cohérence YMYL honnête : ne pas nier le phénomène, mais rester dans les negatives du moodboard : jamais dramatique/sombre/alarmiste). Aucune personne en détresse, aucun masque à gaz — un entraînement normal sous une lumière légèrement voilée.
- **Mode de texte** : aucun (`none`) — cover éditoriale, cohérent avec les autres covers blog existantes
- **Ratio** : 16:9
- **Références** : `visual/refs/blog-cover-style.webp` (default_blog_cover du moodboard)
- **Contraintes négatives** : pas de smog noir/apocalyptique, pas de masque N95 en gros plan, pas d'imagerie sombre/dramatique (interdits moodboard)
- **Alt text** : "Open-air Muay Thai training session at Wildcat during Chiang Mai's hazy burning season golden hour"

### Image 2
- **Placement** : after-h2:What Burning Season in Chiang Mai Actually Is
- **Type** : photo
- **Subject** : vue large du ring open-air et du jardin tropical du camp, ciel visible
- **Description** : photo de contexte établissant le cadre open-air du camp (pourquoi la qualité de l'air compte spécifiquement ici, contrairement à un gym climatisé) — golden hour ou lumière naturelle de journée, bananiers/verdure visibles
- **Aspect ratio** : 4:3
- **Alt text** : "Wide view of Wildcat's open-air ring and tropical garden in Chiang Mai, showing the outdoor training setup"

### Image 3
- **Placement** : after-h2:How We Adapt Training When the Air Turns Bad
- **Type** : photo
- **Subject** : séance technique sous le ring couvert (pad work ou clinch), lumière tamisée chaude
- **Description** : preuve visuelle concrète de l'adaptation décrite dans le texte — training sous couverture, ambiance toujours chaleureuse et non alarmiste, cohérent avec le reste de la photographie de marque
- **Aspect ratio** : 4:3
- **Alt text** : "Covered ring technical training session at Wildcat, the setup used on high-AQI burning season days"

### Image 4
- **Placement** : after-h2:Planning a Training Trip Around Burning Season
- **Type** : photo
- **Subject** : séance d'entraînement en pleine lumière claire, ciel dégagé — contraste avec la cover (bons mois, novembre-janvier)
- **Description** : image "contraste positif" montrant le camp pendant la haute saison d'air propre, pour illustrer visuellement pourquoi novembre-janvier est recommandé
- **Aspect ratio** : 4:3
- **Alt text** : "Clear-sky training session at Wildcat during Chiang Mai's clean-air high season, November through January"

## Objectif business

Capter le trafic informationnel du cluster "burning season chiang mai/thailand" (~900/mo cumulé, LOW difficulty) avant la saison 2026-2027, en convertissant les lecteurs qui planifient un séjour training vers `/stay-train` et `/contact` (WhatsApp), tout en renforçant l'autorité E-E-A-T de Meaw sur le contenu YMYL du site (cf. `docs/seo/context.md` — objectif "evergreen : guides DTV et vie au camp qui alimentent le maillage vers les pillars"). Rappel calendrier éditorial (`CLAUDE.md` du projet) : cet article doit être en ligne avant décembre, saison M4.1 — `publishDate: 2026-08-11` respecte largement cette fenêtre.

## Angle unique / POV (Mode B — dérivé du gap SERP)

Meaw raconte, depuis l'expérience réelle et quotidienne du camp, comment Wildcat adapte ses entraînements pendant la saison des feux : quand c'est gérable, quand ça ne l'est pas, comment le camp ajuste horaires et intensité, et ce que ça signifie concrètement pour quelqu'un qui planifie un séjour training à cette période. Honnête, sans minimiser le risque santé (YMYL) et sans en faire un argument commercial déguisé.

## Gap concurrent identifié

Tous les résultats de la SERP (cnxlocal, Ada House CNX, BackpackThailand, ThailandFAQ, IQAir newsroom) traitent la saison des feux comme un problème touriste/logistique générique : porter un masque, acheter un purificateur, éventuellement décaler son voyage. Aucun n'aborde la question à forte intention de l'audience Wildcat : "je viens m'entraîner au Muay Thai pendant plusieurs semaines, puis-je encore m'entraîner sérieusement, et comment un camp gère-t-il la fumée ?" Aucun concurrent ne discute l'ajustement de l'intensité/horaire d'entraînement en fonction de l'AQI, la planification séances intérieures/extérieures, la filtration d'air du gym, ou le vécu saison après saison d'un résident qui s'entraîne quotidiennement dehors. Autorat : soit une équipe anonyme (BackpackThailand, ThailandFAQ), soit un blogueur local généraliste ou une entreprise d'hébergement (cnxlocal, Ada House) — aucun n'est quelqu'un qui coache ou s'entraîne réellement en extérieur à Chiang Mai, ce qui est un signal E-E-A-T plus fort pour un sujet YMYL lié à l'effort physique.
Date de l'analyse : 2026-08-06 (`.seo-data/serp-burning-season-chiang-mai.json`)

## CTA cible

- **Chaud** : `/contact?intent=stay` — "Message us about your training dates" — placer en fin de section "Planning a Training Trip Around Burning Season" et en CTA de conclusion.
- **Tiède** : `/contact` — "Ask us anything — we reply on WhatsApp" (cta_map tiède standard) — disponible en alternative dans la même section si le writer préfère la formulation générique.
- **Nurturing** : `/stay-train` (packages complets) et `/dtv-visa/long-stay-training` (budget long séjour, persona DTV secondaire) — liens de maillage, pas des CTA à part entière.

## Sources

À vérifier et dater par `/seo-sources` avant publication (obligatoire — Module C YMYL) :

- **IQAir Chiang Mai** — page qualité de l'air temps réel + historique : https://www.iqair.com/thailand/chiang-mai
- **IQAir Thailand Newsroom** — article daté du scan SERP, confirme le classement Chiang Mai parmi les villes les plus polluées pendant la saison des feux 2026 : https://www.iqair.com/th-en/newsroom/chiang-mai-ranks-among-the-top-10-most-polluted-cities-during-thailand-s-burning-season-3-4-2026
- **Thailand Pollution Control Department** (pcd.go.th) — données/seuils officiels thaïlandais : https://www.pcd.go.th
- **OMS/WHO — Air pollution health impacts** — seuils de santé et vulgarisation PM2.5 : https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts/types-of-pollutants
- **Gouvernement provincial de Chiang Mai / CMU** — annonces officielles de la période d'interdiction de brûlis agricole ("burn ban") : https://www.chiangmai.go.th — **dates exactes 2026 à confirmer**, ne pas citer de dates précises tant que la source n'est pas vérifiée par `/seo-sources`.

Aucune de ces sources n'a encore été fetchée pour cet article (brief uniquement) — `/seo-sources` doit visiter chacune, vérifier chaque claim et dater l'accès avant assemblage final.

## Données brutes

- Horaires réels du camp (`src/config/site.ts`) : ouverture 07:30–20:00 tous les jours ; cours collectifs 09:00–10:30 / 15:30–17:00 / 17:00–18:30 / 18:30–20:00 ; cours privés 07:30–09:00 / 10:30–12:00 / 13:00–15:30 (départ flexible).
- Localisation du camp : Nong Kwai, Hang Dong, Chiang Mai — camp open-air (site.ts `contact.address`).
- Aucune donnée de prix n'est nécessaire pour cet article (sujet = calendrier/qualité de l'air, pas pricing) — ne pas ajouter de tarifs hors contexte.

## Citations exploitables (GEO — Quotation Addition)

Aucune des 5 sources listées ci-dessus n'a encore été fetchée (statut `to_verify` partout) — `/seo-sources` doit visiter chacune, vérifier chaque affirmation et dater l'accès avant que quoi que ce soit ne soit cité verbatim. Ce brief ne fabrique aucune phrase attribuée ; il liste seulement les candidates à vérifier en priorité pour le levier Quotation Addition (+41 % GEO) :

- **IQAir Thailand Newsroom** (article daté du scan SERP, mars 2026) — institution de mesure de qualité de l'air, classe Chiang Mai parmi les villes les plus polluées de Thaïlande pendant la saison des feux 2026. Candidate : une phrase chiffrée exacte sur le classement/pic AQI de Chiang Mai, à extraire verbatim par `/seo-sources` — **à confirmer par `/seo-sources`, ne pas citer avant vérification**.
- **OMS/WHO — Air pollution health impacts** — position institutionnelle de référence sur les seuils de santé liés au PM2.5. Candidate : une phrase de définition ou de seuil de risque citée verbatim depuis la page WHO — **à confirmer par `/seo-sources`**.
- **Thailand Pollution Control Department** (pcd.go.th) — autorité officielle thaïlandaise sur les données de qualité de l'air. Candidate : une citation institutionnelle sur les seuils AQI locaux ou la période de brûlis, si la page en fournit une formulable verbatim — **à confirmer par `/seo-sources`**.

Si aucune des trois ne livre de phrase réellement citable une fois fetchée, `/seo-sources` doit le signaler et l'article s'appuiera sur le levier Cite Sources inline (+30 %) sans citation directe attribuée — jamais une citation inventée pour combler le vide.

## Preuves et limites

- **Prix et horaires** (`src/config/site.ts`, documenté) : seule source autorisée pour toute mention d'horaire — reprendre les valeurs telles quelles, ne pas extrapoler un "meilleur créneau anti-pollution" non documenté.
- **Meaw gère le camp au quotidien** (`docs/brand/identity.md`, `docs/brand/voice.md`, documenté) : autorise le "je" à la première personne sur le fonctionnement général du camp et les ajustements observés. Le statut "needs_review" de `proofs.md` concerne spécifiquement la gestion des dossiers DTV — non applicable ici, mais rester dans le même esprit de prudence : décrire ce qui est observé, ne pas inventer un protocole AQI chiffré qui n'existe pas réellement.
- **Aucun testimonial disponible** sur ce sujet précis (proofs.md : "n'utiliser que les entrées réellement présentes, sans fabriquer de fallback") — ne pas en inventer un.
- **Limite ferme (YMYL)** : ne jamais minimiser le risque santé de la pollution de l'air à des fins commerciales ; ne jamais présenter l'entraînement pendant les pics comme "sans risque" ; toujours garder le disclaimer et la section "qui doit être prudent".
- **Limite ferme (anti-patterns.md)** : ne pas inventer de dates précises de burn ban gouvernemental tant que non sourcées ; ne pas préfixer les liens internes de `/en/` ou `/fr/`.

## Note pour le writer (`/seo-write`)

- **Zéro em-dash dans le corps de l'article** — règle non négociable du projet (passe humanizer 2026-06-07). Utiliser deux-points, virgules, parenthèses ou phrases courtes à la place.
- **TLDR obligatoire** (frontmatter `tldr`, 2 à 5 puces) — proposition de départ, à affiner en écriture :
  - Burning season in Chiang Mai runs roughly late February through April, peaking in March, driven by agricultural burning and the valley's geography.
  - November through January is the cleanest-air stretch of the year, the best window for a training trip.
  - On high-AQI days, Wildcat shifts session timing and moves technical work under the covered ring instead of cancelling training outright.
  - If you have asthma, a heart or lung condition, or you're training with kids, check the AQI and talk to a doctor before intense outdoor sessions in peak season.
  - Booking in March? Message us before you commit and we'll tell you honestly what the week looks like.
- **Auteur** : Meaw Boonpradub — byline résolue automatiquement depuis la fiche coach Sanity/Content Collection au rendu (pas un champ frontmatter séparé, cf. moteur blog E8), Person JSON-LD `#meaw` (`/about/coaches`).
- **Catégorie** : `chiang-mai-life` (seule valeur correcte parmi les 6 de `src/content.config.ts`).
- **Cover** : remplacer `../covers/burning-season-demo.webp` par `../covers/burning-season-chiang-mai.webp` (nouvelle image réelle, cf. Image Briefs).
- **publishDate** : `2026-08-11`.
- **draft** : passer à `false` au moment de la publication (le squelette actuel est `draft: true`).
- **translationKey** : `burning-season` (inchangé, préserve l'appariement futur si une version FR est produite).

# Brief SEO : The mongkhon and pra jiad, explained (muay thai headband)

## Contexte chargé (Phase 0 / confirmation)

- **Persona** : chargé depuis `docs/seo/context.md`, mais adapté — cet article est top-funnel
  culture pure, hors des deux personas DTV/service standards. Persona ad hoc : *lecteur
  curieux de la culture muay thai* (touriste aventurier + combattant en formation élargis à
  n'importe quel visiteur tombé sur "muay thai headband"). Voir § Persona ci-dessous.
- **Tonalité / Registre** : warm / genuine / encouraging / down-to-earth (`docs/brand/identity.md`) — EN direct et simple, pas de tutoiement (EN only).
- **CTA chaud** : aucun — hors scope (positionnement zéro service/DTV, voir § CTA cible).
- **CTA tiède** : `/classes/beginners` — "voir à quoi ressemble un premier cours" (nurturing doux, pas de pression).
- **Contexte chargé depuis** : `docs/brand/identity.md`, `message.md`, `voice.md`, `patte-ecrite.md`,
  `anti-patterns.md`, `proofs.md`, `themes.md`, `docs/seo/context.md`, `competitors.md`,
  `content-map.md` ✓ — tous présents, aucun fallback legacy nécessaire.

## Phase 0 bis — Research bundle ingéré

| Fichier | Statut | Usage |
|---|---|---|
| `.seo-data/keywords-muay-thai-headband-mongkhon.json` | chargé | volume mesuré = 0 pour le terme littéral "muay thai headband mongkhon" → confirme qu'il ne faut PAS cibler cette requête brute |
| `.seo-data/keywords-wai-kru-ram-muay.json` | chargé | source du primary réel : "muay thai headband" 590/mo (long_tail) + secondaires/long-tail du cluster wai kru |
| `.seo-data/serp-muay-thai-headband-mongkhon.json` | chargé | scan sur "muay thai headband" : gap = zéro voix ancrée en Thaïlande, zéro source citée, pra jiad quasi absent, 2/5 slots marketplaces. `recommended_angle` repris quasi verbatim en § Angle unique |
| `.seo-data/gatekeeper-muay-thai-headband-mongkhon.json` | chargé | verdict **PASS** sur "muay thai headband" (grounding : camp thaï réel + rituel wai kru pratiqué) |

Vérification anti-cannibalisation/anti-doublon : scan de `src/content/blog/en/` (15 articles
`.md` + 2 `.mdx`) — aucun ne couvre le mongkhon, le pra jiad ou la cérémonie wai kru ram muay.
`docs/structure-blog.md` confirme : cet article est **6.2** du calendrier éditorial (cluster
Culture, M6), compagnon de 6.1 "Wai kru ram muay explained" qui n'est pas encore rédigé non plus
(pas de risque de doublon, mais pas de cible de maillage disponible pour l'instant — voir note
en § Maillage interne).

## Metadata

- **Slug** : `muay-thai-headband-mongkhon` *(imposé — non négociable, cf. contrainte article)*
- **Slug rationale** : préserve le primary réel ("muay thai headband") + le terme culturel
  central ("mongkhon") ; kebab-case, 4 segments ; pas de date (evergreen) ; identique au slug
  prévu dans `docs/structure-blog.md` §M6 (6.2), donc aucun renommage à faire au moment de
  `/calendar`.
- **Page type** : article
- **Module** : — (aucun module A-E applicable — article culturel narratif standard,
  structure Definition/Explication/Contexte hors grille modulaire)
- **Module rationale** : Module E désigne exclusivement les formats Best-of/Top X/comparatif
  (`module-e-best-of.md`) — ce sujet n'est ni un classement ni un "X vs Y", donc aucun des
  modules A-E ne s'applique ; c'était une erreur du premier brief, corrigée ici plutôt que
  masquée. Note technique : le schéma machine `article-spec.schema.json` n'accepte que
  `module ∈ {A,B,C,D,E}` (pas d'option "aucun") — le spec draft JSON conserve donc `"E"` par
  défaut purement technique pour rester valide, mais cette valeur ne doit pas être lue comme
  une validation du Module E Best-of : la doctrine éditoriale de ce document prime.
- **Target word count** : 1500–1900 mots
- **Primary keyword** : muay thai headband (590/mo, MEDIUM competition, intent informational)
- **Date** : 2026-08-06
- **Locale** : en · **Source locale** : en · **Translation key** : `muay-thai-headband-mongkhon`
- **Persona** : Lecteur curieux de la culture muay thai (touriste, élève débutant, spectateur)
  — (1) *Qu'est-ce que ce bandeau que je vois sur toutes les photos de combattants ?*
  (2) *Pourquoi on l'enlève juste avant que le combat commence ?*
  (3) *Est-ce que je peux/dois en porter un, ou est-ce que ce serait déplacé de ma part ?*
- **Tonalité** : warm, genuine, encouraging, down-to-earth
- **Registre** : EN direct et naturel (audience internationale non-native), pas de FR pour cet article
- **Contexte chargé depuis** : seo-context.md ✓

## Snippet recommandé

- **Title** : `The Mongkhon: Muay Thai Headband Meaning, Explained` (52 car.)
- **H1** : `What the Mongkhon Headband Really Means, and Why Every Muay Thai Fighter Wears One` (82 car. — distinct du title, contient "headband" pour tenir le placement H1 annoncé par le cluster keyword)
- **Meta description** : `Mongkhon and pra jiad explained by a Chiang Mai camp owner: what they mean and why the headband comes off before the fight. Read the full story.` (144 car.)

**Recommandation** : variante Expertise. Le gap SERP identifié est précisément l'absence de
voix ancrée/crédible sur ce sujet (zéro auteur nommé avec crédibilité sur 2 des 3 pages
éditoriales, zéro source citée sur les 3) — le title + meta doivent donc porter la promesse
"expliqué par quelqu'un du métier", pas juste redire la définition. La variante Solution
(mirroring PAA) reste une alternative forte si le CTR sous-performe après quelques semaines.

## Snippet variantes

**Variante Solution (mirror PAA, CTR direct)**
- Title : `Why Do Muay Thai Fighters Wear a Headband?` (42 car.)
- H1 : `The Real Reason Muay Thai Fighters Wear the Mongkhon (and Take It Off Before They Fight)`
- Meta : `The mongkhon is not just decoration. Here is why fighters wear it before the bout, why it comes off before the first strike, and what it means.` (142 car.)

**Variante Locale/GEO (voix camp)**
- Title : `Mongkhon & Pra Jiad: A Chiang Mai Camp Explains` (47 car.)
- H1 : `Mongkhon and Pra Jiad, Explained the Way We Teach It at Wildcat in Chiang Mai`
- Meta : `How Wildcat, a family-run Muay Thai camp in Chiang Mai, explains the mongkhon and pra jiad to new students. Real ritual, real camp, real meaning.` (145 car.)

## Keyword Cluster

| Role | Keyword (query brut) | Volume | Placement | Formulation naturelle (prose) |
|---|---|---|---|---|
| **Principal** | muay thai headband | 590 | Title, H1, intro, meta | the muay thai headband |
| Secondaire | mongkhon | 0 mesuré (terme central, dominance SERP organique confirmée par le scan) | Title, H1, tout du long | the mongkhon |
| Secondaire | pra jiad | 0 mesuré (terme compagnon, gap SERP identifié — quasi absent chez les concurrents) | H2 dédié, body | the pra jiad (armband) |
| Secondaire | wai kru ram muay | 260 | H2 cérémonie, body | the wai kru ram muay ceremony |
| Secondaire | muay thai wai | 40 | H2 cérémonie, body | the wai |
| Secondaire | sealing the ring muay thai | 10 | H3 cérémonie/musique, body | sealing the ring |
| Long-tail | wai kru dance | 20 | H3 cérémonie/musique, FAQ | the wai kru dance |
| Long-tail | ram muay music | 10 | H3 cérémonie/musique, body | the ram muay music |
| Long-tail | wai khru ram muay meaning | 10 | FAQ | what wai khru ram muay means |

**Rappel au writer** : utilise toujours la colonne "Formulation naturelle" dans le corps de
l'article, jamais la forme brute du query. "Mongkhon" et "pra jiad" sont des termes thaïs
transcrits — les garder tels quels (pas de traduction forcée), en gras à leur première
apparition seulement (voir `bold_entities` dans la spec).

## Structure

**Note de révision** : structure ramenée de 9 à 6 H2 (plafond doctrine 5-6). "Where the
mongkhon comes from" fusionné avec "How a mongkhon is made and blessed" (origine + fabrication
forment une même trame narrative) ; "What the colors and patterns can mean" absorbé dans le H2
pra jiad/mongkhon ; "Can a beginner or foreign student wear a mongkhon?" fusionné avec "How we
teach this to new students at Wildcat" (étiquette visiteur + ancrage camp forment la même
section de clôture, où vivent déjà les 3 liens obligatoires). Aucun contenu perdu, seulement
regroupé.

### H2 : What is the mongkhon, exactly?
Keywords : muay thai headband, mongkhon
Bloc AEO : Definition
Contenu : Réponse directe (BLUF) dès la première phrase — définition claire du mongkhon (le
bandeau tressé/en corde porté sur la tête), le terme thaï, à quoi il ressemble concrètement.
Pose immédiatement la distinction avec le pra jiad (développée plus loin) pour que le lecteur
comprenne dès le départ qu'il y a deux objets, pas un seul.

### H2 : Where the mongkhon comes from, and how it's made
Keywords : mongkhon
Bloc AEO : —
Contenu : Origine communément racontée (soldats siamois qui nouaient un tissu autour de la
tête avant la bataille), lien avec la protection spirituelle. Formuler en "on raconte
traditionnellement que..." plutôt qu'en fait académique daté — voir § Preuves et limites,
aucune source primaire fournie pour cette section. Enchaîne directement sur la fabrication :
corde/tissu tressé à la main, bénédiction par un moine ou un maître avant d'être remis à un
combattant. Rester général — ne pas inventer de détail spécifique au processus de bénédiction
propre à Wildcat sans validation (voir § Preuves et limites).

### H2 : The pra jiad — the mongkhon's often-overlooked companion
Keywords : pra jiad
Bloc AEO : Definition
Contenu : Ferme le gap SERP identifié (seul Hayabusa sur 5 résultats en parle). Distinction
claire : le pra jiad se porte aux bras (biceps), reste pendant le combat, contrairement au
mongkhon retiré avant. Origine (brassards portés par les soldats), matière, pourquoi les deux
sont souvent confondus par les visiteurs étrangers. Referme la section par ce que les couleurs
et motifs (du mongkhon comme du pra jiad) peuvent signifier : rester prudent, les couleurs
peuvent avoir une signification (lignée du camp, choix du kru) mais il n'existe pas de code
universel fixe malgré ce que certains sites affirment — formuler en "varie d'un camp à
l'autre", jamais un tableau de correspondances inventé.

### H2 : The wai kru ram muay ceremony
Keywords : wai kru ram muay, muay thai wai
Bloc AEO : Definition
Contenu : Explique la cérémonie dans laquelle le mongkhon est porté — le wai (salut de
respect) et le ram muay (la danse), à quoi ça ressert (honorer le kru/l'entraîneur, la
lignée du camp). Sert de porte d'entrée aux deux H3 suivants.

#### H3 : Sealing the ring and the ram muay music
Keywords : sealing the ring muay thai, ram muay music, wai kru dance
Bloc AEO : —
Contenu : Le rituel de "sceller le ring" avant le combat, les instruments traditionnels (sarama)
qui rythment le ram muay. Section courte, concrète, sensorielle (ce qu'on entend et voit).

#### H3 : Why the mongkhon comes off before the fight starts
Keywords : (PAA — "Why is the mongkhon removed before the fight starts?")
Bloc AEO : Self-contained answer
Contenu : Répond frontalement à la question PAA. Le kru/l'entraîneur retire le mongkhon juste
avant le premier coup — geste de transition entre le respect/la prière et le combat lui-même.
Le pra jiad, lui, reste.

### H2 : Wearing a mongkhon respectfully: etiquette for visitors, and how we teach it at Wildcat
Keywords : (PAA — "Can anyone wear a mongkhon?" + ancrage marque / E-E-A-T)
Bloc AEO : —
Contenu : **Le vrai gap concurrentiel** (aucun résultat SERP ne couvre l'étiquette pour les
visiteurs étrangers). Ton respectueux et clair : ne jamais acheter un mongkhon "souvenir"
pour le porter en dehors de l'entraînement, ne pas le traiter comme un objet décoratif, demander
à son kru avant d'en porter un pour une photo. Poser la limite entre curiosité respectueuse et
appropriation superficielle sans moraliser — dans le ton chaleureux de la marque, pas
culpabilisant. Enchaîne sur l'ancrage réel du camp : comment un nouvel élève rencontre pour la
première fois le mongkhon et le wai kru à Wildcat (généralement en observant, jamais en étant
forcé d'y participer). Lien vers les [beginner classes](/classes/beginners), le [planning et
les prix](/classes), et [nos coachs](/about/coaches) qui transmettent ce rituel. Reste général
et plausible — pas de détail inventé sur une pratique spécifique non confirmée par Meaw (voir
§ Preuves et limites).

### H2 : FAQ — mongkhon and pra jiad, quick answers
Keywords : wai khru ram muay meaning, wai kru dance
Bloc AEO : —
Contenu : Format Q/R court, reprend les 5 PAA du scan SERP + 1 question sur la signification
littérale du terme :
- What is a Muay Thai headband called?
- What is the difference between mongkhon and pra jiad?
- Why do Muay Thai fighters wear a headband?
- Why is the mongkhon removed before the fight starts?
- Can anyone wear a mongkhon?
- What does "wai khru ram muay" mean?

## Maillage interne (liens sortants)

| Ancre | Cible | Section |
|---|---|---|
| a first class at Wildcat | `/classes/beginners` | Wearing a mongkhon respectfully: etiquette for visitors, and how we teach it at Wildcat |
| our class schedule | `/classes` | Wearing a mongkhon respectfully: etiquette for visitors, and how we teach it at Wildcat |
| our coaches | `/about/coaches` | Wearing a mongkhon respectfully: etiquette for visitors, and how we teach it at Wildcat |

Les 3 liens sont **obligatoires** (contrainte article), tous regroupés naturellement dans la
même section de clôture — c'est la seule section où un lien vers l'offre a un sens éditorial
sans forcer un angle service dans un article culture pure. Ne pas disperser ces liens dans les
sections historiques/rituelles : ça romprait le ton.

**Note** : `docs/structure-blog.md` prévoit 6.1 "Wai kru ram muay explained" comme article
compagnon direct de celui-ci, mais il n'est pas encore rédigé (absent de
`src/content/blog/en/`). Pas de lien vers une cible inexistante ici — quand 6.1 sera publié,
ajouter un lien croisé bidirectionnel (édition manuelle post-publication, hors scope de ce brief).

## Image Briefs

**Image 1 — cover**
- Type : photo
- Sujet : Un mongkhon posé sur les cordes du ring en plein air de Wildcat, lumière dorée de fin
  de journée
- Description : Plan rapproché sur un mongkhon (bandeau tressé) suspendu ou posé sur la corde
  supérieure du ring, hors combat, cadre calme. Arrière-plan flou : végétation tropicale du camp,
  lumière chaude de fin d'après-midi. Aucune personne dans le cadre — l'objet est le sujet.
- Alt text : A mongkhon headband resting on the ropes of Wildcat's open-air Muay Thai ring in Chiang Mai
- Text overlay : null
- Aspect ratio : 16:9
- Notes : Éviter tout élément qui suggère un combat en cours (pas de gants, pas de posture agressive) — c'est un objet de respect, pas d'action.

**Image 2 — after-h2:The wai kru ram muay ceremony**
- Type : photo
- Sujet : Un coach ajustant le mongkhon d'un élève avant une démonstration de wai kru ram muay
- Description : Plan moyen, un coach thaï aidant un élève (dos ou profil, visage non nécessairement identifiable) à ajuster son mongkhon avant l'entraînement. Cadre extérieur, lumière naturelle, ambiance calme et respectueuse, pas de public ni de mise en scène spectaculaire.
- Alt text : A Wildcat coach adjusting a student's mongkhon before a wai kru ram muay demonstration at the camp
- Text overlay : null
- Aspect ratio : 4:3
- Notes : Documentaire, pas posé. Aucune bénédiction religieuse spécifique mise en scène (pas de moine, pas de rituel inventé) — juste le geste concret d'ajustement.

**Image 3 — after-h2:The pra jiad — the mongkhon's often-overlooked companion**
- Type : photo
- Sujet : Gros plan sur un pra jiad noué autour du biceps pendant le travail au pao
- Description : Plan serré sur un avant-bras/biceps avec le pra jiad noué, pendant une séance de
  pad work (le pad du coach visible en arrière-plan flou). Montre concrètement où et comment
  l'objet se porte, en action.
- Alt text : Close-up of a pra jiad armband tied around a fighter's bicep during pad work at Wildcat Muay Thai
- Text overlay : null
- Aspect ratio : 4:3
- Notes : Doit clairement se distinguer visuellement du mongkhon (image 1/2) — bras, pas tête.

**Image 4 — after-h2:Wearing a mongkhon respectfully: etiquette for visitors, and how we teach it at Wildcat**
- Type : photo
- Sujet : Un coach plaçant un mongkhon sur la tête d'un élève étranger, dans un cadre guidé et souriant
- Description : Plan moyen, moment chaleureux et consenti : un coach place un mongkhon sur la
  tête d'un élève visiblement non-thaï, les deux souriants, dans le cadre d'une séance
  d'entraînement (pas une mise en scène touristique isolée). L'image doit clairement montrer que
  le geste est guidé par le coach, pas auto-initié par l'élève.
- Alt text : A Wildcat coach placing a mongkhon on a foreign student's head before a guided training session
- Text overlay : null
- Aspect ratio : 4:3
- Notes : Image sensible sur l'angle appropriation — le cadrage doit montrer sans ambiguïté que
  c'est un geste encadré par le camp, jamais un élève seul posant avec l'objet comme souvenir.

## Objectif business

Construire l'autorité topique du cluster Culture (M6 du calendrier éditorial, article 6.2,
compagnon de 6.1 "Wai kru ram muay explained"). Aucun objectif de conversion directe : c'est
un contenu top-funnel pur qui renforce le signal E-E-A-T de la marque (voix ancrée à Chiang
Mai, ce qu'aucun concurrent SERP n'offre) et nourrit doucement vers l'offre training via un
seul lien de clôture, sans jamais transformer l'article en page service.

## Angle unique / POV

Mode B — dérivé de `serp-muay-thai-headband-mongkhon.json` (`recommended_angle`). Meaw écrit en
tant que propriétaire de camp thaïlandaise à Chiang Mai qui a elle-même remis des mongkhons à
ses combattants et vu des élèves étrangers poser des questions sur les leurs. L'article explique
le mongkhon ET le pra jiad ensemble (fermant le gap que seul Hayabusa tente partiellement),
puis répond à la question que les concurrents évitent : ce qu'un visiteur respectueux fait et
ne fait pas avec le bandeau (ne jamais en acheter un "costume" pour le porter hors
entraînement, ne jamais le traiter comme un souvenir, demander à son kru avant de le porter
pour une photo) — ancré dans la pratique réelle du camp Wildcat plutôt qu'une histoire
générique façon Wikipédia.

## Gap concurrent identifié

Aucun résultat de la SERP scannée n'est écrit par une voix nommée et implantée en Thaïlande
(propriétaire de camp/coach) combinant mongkhon ET pra jiad dans un même contenu avec des
conseils pratiques et respectueux pour les élèves et touristes étrangers — peuvent-ils en
porter un, comment en demander ou en acheter un respectueusement, que se passe-t-il concrètement
dans un camp de Chiang Mai. Le terme "mongkhon" est saturé d'explications génériques
tierces/de marque (2 des 3 pages éditoriales sans auteur nommé ni crédité, zéro source citée
sur les 3), tandis que les fiches marketplace (Amazon, eBay) occupent 2 des 5 places
organiques avec zéro contenu culturel — laissant la SERP informationnelle plus mince que ne le
suggèrent volume et compétition.

Faiblesses complémentaires identifiées : le pra jiad n'est couvert que par 1 contenu sur 3
(Hayabusa) malgré être le sujet compagnon naturel ; aucun résultat ne documente une cérémonie
ou pratique de camp à la première personne — tout se lit comme "recherché et écrit ailleurs",
jamais vécu.

Date de l'analyse : 2026-08-06 (`.seo-data/serp-muay-thai-headband-mongkhon.json`).

## CTA cible

- **Nurturing (seul CTA de cet article)** : `/classes/beginners` — "see what a first class at
  Wildcat looks like" — placé en fin de la section "How we teach this to new students at
  Wildcat".
- **Pas de CTA chaud ni tiède** : positionnement explicitement zéro angle service/DTV pour cet
  article. Pas de lien vers `/contact` ni `/dtv-visa/*`.
- **Nurturing secondaire (maillage, pas un CTA à proprement parler)** : `/classes` et
  `/about/coaches`, mêmes règles que ci-dessus (§ Maillage interne).

## Sources

Aucune source externe fournie par l'utilisateur pour ce brief. Le bundle de recherche
(`serp-*.json`) documente ce que les concurrents affirment (common_ground) mais ne constitue
pas une source primaire citable. Recommandation avant publication : si un renforcement E-E-A-T
par citation est souhaité (facultatif ici, cet article n'est pas YMYL — pas de visa, pas
d'argent, pas de santé), lancer `/seo-sources` pour vérifier et dater 1-2 sources historiques
sur l'origine du mongkhon avant `/seo-enrich`. À défaut, les affirmations historiques restent
formulées prudemment ("traditionally believed", "many trace it to...") plutôt que comme faits
académiques précis — voir claims ci-dessous.

## Données brutes

Aucune donnée chiffrée propre au camp n'est nécessaire ou disponible pour ce sujet (pas de
prix, pas d'horaire, pas de statistique). Les seules données factuelles mobilisées sont
culturelles/historiques et proviennent du consensus du scan SERP (`common_ground`), pas d'une
source primaire datée — voir § Sources.

## Citations exploitables (GEO — Quotation Addition)

**À sourcer — aucune citation vérifiée disponible à ce stade.** Le bundle de recherche
(`serp-muay-thai-headband-mongkhon.json`) ne documente que le `common_ground` déclaratif des
pages concurrentes scannées, jamais une source primaire citable verbatim ; personne ici n'a
encore été fetché/vérifié. Claims concernés (voir § Preuves et limites, `CLM-001`/`CLM-002`/
`CLM-003` du spec draft) :

- Origine "soldats siamois" du mongkhon et sa fonction de protection — à sourcer.
- Bénédiction par un moine ou un maître avant remise au combattant — à sourcer.
- Retrait du mongkhon avant le combat / maintien du pra jiad pendant le combat — à sourcer
  (fort consensus SERP sur ce point, mais zéro source primaire indépendamment vérifiée).

**Action avant `/seo-enrich`** : lancer `/seo-sources` pour vérifier et dater 1-2 sources
fiables (ouvrage/étude sur le muay thai, fédération, publication culturelle thaïlandaise
reconnue) sur ces 3 claims, et en extraire une phrase citable verbatim par source trouvée. À
défaut de citation vérifiée au moment de la rédaction, les formulations prudentes déjà
spécifiées en § Preuves et limites restent la norme ("traditionally believed", "many trace it
to...") — ne jamais transformer un `common_ground` SERP en citation attribuée à une personne ou
institution précise sans l'avoir réellement vérifié.

## Preuves et limites

| Élément | Statut | Formulation autorisée / limite |
|---|---|---|
| Meaw Boonpradub, fondatrice et owner de Wildcat | documenté (`docs/brand/voice.md`) | Peut signer l'article et parler en tant que propriétaire de camp thaïlandaise. |
| Le mongkhon est retiré par l'entraîneur avant le combat, le pra jiad reste | common ground des 5 résultats SERP scannés | Formuler comme pratique largement documentée dans le muay thai, pas comme fait vérifié par une source primaire citée ici. |
| Origine "soldats siamois" du mongkhon, bénédiction par un moine | common ground SERP (3/3 pages éditoriales) | Formuler en "on raconte traditionnellement que..." — ne pas dater précisément ni attribuer à une source académique non vérifiée. |
| Pratique spécifique de Wildcat (comment/quand un élève découvre le rituel au camp) | **needs_review** — aucune confirmation explicite de Meaw dans les documents disponibles | Rester général et plausible ("souvent en observant un cours", "les coachs expliquent le geste") ; ne jamais inventer un détail spécifique (moine nommé, fréquence précise, cérémonie datée) sans validation humaine avant publication, conformément à `docs/brand/proofs.md`. |
| Signification des couleurs du mongkhon | aucune source fournie | Ne pas produire de tableau de correspondances couleur → signification inventé ; rester au niveau "varie selon le camp/le kru", cohérent avec l'absence de code universel documenté. |

Limite explicite de positionnement : zéro mention DTV, zéro promesse commerciale, zéro
comparaison avec un concurrent nommé — conforme à `docs/brand/themes.md` (le hors-territoire
exclut le contenu qui traiterait la culture muay thai de façon superficielle ou appropriative).

## Contraintes de rédaction (rappel pour /seo-write)

- Zéro em dash (—) dans tout le texte, y compris title/H1/meta.
- TLDR : 2 à 5 puces (callout brief, sous la byline).
- Auteur : Meaw Boonpradub (byline `*By Meaw Boonpradub, Wildcat Muay Thai, Chiang Mai*` — pattern des articles existants, ex. `muay-thai-stance-basics.md`).
- Catégorie frontmatter : `culture` (valeur zod valide, `src/content.config.ts`).
- Cover : `../covers/muay-thai-headband-mongkhon.webp` (pattern `project.yaml` : `cover_reference_pattern`).
- `publishDate: 2026-08-21`.
- `translationKey: muay-thai-headband-mongkhon`.
- Locale : en uniquement, pas de version FR pour cet article (hors colonne FR validée de `docs/structure-blog.md`).

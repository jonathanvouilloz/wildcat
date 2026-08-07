# Brief SEO : Saison des brûlis à Chiang Mai (marché FR autonome)

## Metadata
- Slug: saison-des-brulis-chiang-mai
- Slug rationale: descriptif, kebab-case, 4 segments, pas de date (évergreen annuel, seul le contenu mois-par-mois se rafraîchit). Slug déjà réservé par le squelette de démo E8 (`src/content/blog/fr/saison-des-brulis-chiang-mai.md`, `draft: true`) et partage le `translationKey: burning-season` avec l'article EN `burning-season-chiang-mai` — le conserver préserve l'appariement hreflang/LangSwitcher (aucun renommage, cf. règle bloquante slug brief = slug article final).
- Page type: article
- Module: C — YMYL/Expert (qualité de l'air = santé)
- Target word count: 1300-1700
- Primary keyword: pollution chiang mai (170/mo, FR, LOW competition — DataForSEO `.seo-data/keywords-pollution-chiang-mai-fr.json`)
- Date: 2026-08-06
- Persona: francophone qui planifie un séjour d'entraînement Muay Thai à Chiang Mai (ou hésite sur ses dates) et s'inquiète de la saison des brûlis — 3 questions : est-ce raisonnable de s'entraîner dehors pendant cette période ? comment un vrai camp s'adapte au quotidien ? quelles précautions concrètes prendre sur place plutôt que des généralités anxiogènes ?
- Tonalite: chaleureuse, authentique, encourageante, terre-à-terre (`docs/brand/identity.md`)
- Registre: tutoiement (FR — `docs/brand/identity.md` register.default)
- Contexte chargé depuis: `docs/seo/context.md` ✓ + `docs/brand/identity.md` ✓ + `message.md` ✓ + `voice.md` ✓ + `patte-ecrite.md` ✓ + `anti-patterns.md` ✓ + `proofs.md` ✓ + `themes.md` ✓ + `docs/seo/competitors.md` ✓ + `docs/seo/content-map.md` ✓

**⚠️ Marché FR autonome** : cet article n'est PAS une traduction de `burning-season-chiang-mai` (EN). Le mot-clé littéral "saison des brulis chiang mai" ne pèse que 10/mo en France (`.seo-data/keywords-saison-des-brulis-chiang-mai-fr.json`) — le vrai volume FR est sur "pollution chiang mai" (170/mo) + variantes (voir cluster ci-dessous). Angle, structure et SERP sont propres au marché francophone ; seul le `translationKey` relie les deux versions pour le hreflang.

### Contraintes de frontmatter (obligatoires, `project.yaml.content.frontmatter.required_fields`)
`title`, `h1`, `description`, `tldr` (2-5 puces), `publishDate`, `category`, `draft`, `translationKey`.
- `author`: Meaw Boonpradub
- `category`: `chiang-mai-life`
- `publishDate`: 2026-08-11
- `cover`: `../covers/saison-des-brulis-chiang-mai.webp` (remplace le placeholder `burning-season-demo.webp` du squelette de démo)
- `translationKey`: `burning-season`
- `draft`: `true` jusqu'à validation finale (contenu pas encore rédigé) — repasser à `false` après `/seo-write` → `/humanizer` → `/seo-sources` → `/seo-enrich` → review.
- **Zéro em-dash** dans tout le texte (titres, corps, meta) — contrainte non-négociable, y compris là où le squelette de démo EN/FR actuel en utilise.

## Snippet recommandé (Variante 1 — Expertise/E-E-A-T)
- Title: Saison des brûlis à Chiang Mai : le vécu du camp (48 car.)
- H1: Pollution et saison des brûlis à Chiang Mai : ce qu'on vit vraiment au camp (76 car.)
- Meta description: La pollution à Chiang Mai pendant la saison des brûlis, racontée par Meaw : calendrier réel, précautions, et notre entraînement en extérieur. (141 car.)

**Pourquoi cette variante** : intent_signal SERP = informational (`.seo-data/serp-pollution-chiang-mai-fr.json`), et le gap concurrentiel identifié est un déficit total de voix experte/opérateur terrain (tous les résultats sont médias expat génériques, blog voyage ou forum anonyme — zéro E-E-A-T individuel fort). Le format "conseils de [Nom]" est celui qui comble ce gap. Le mot-clé primaire "pollution" apparaît dans le H1 et la meta pour couvrir la requête à plus fort volume (170/mo), pendant que le title porte le terme éditorial "saison des brûlis" que les francophones associent culturellement au phénomène.

## Snippet variantes

**Variante 2 — Solution/Douleur** (répond directement à la question pratique)
- Title: Peut-on s'entraîner à Chiang Mai en saison des brûlis ? (55 car.)
- H1: S'entraîner dehors à Chiang Mai pendant la saison des brûlis, est-ce raisonnable ? (82 car.)
- Meta description: S'entraîner en extérieur à Chiang Mai pendant la saison des brûlis : ce qui est raisonnable, ce qui ne l'est pas, vu depuis le camp Wildcat. (140 car.)

**Variante 3 — Local/GEO** (calendrier concret, ancrage lieu)
- Title: Pollution à Chiang Mai : calendrier saison des brûlis (53 car.)
- H1: Pollution à Chiang Mai : le calendrier mois par mois de la saison des brûlis (76 car.)
- Meta description: Chiang Mai, saison des brûlis : mois par mois, la vraie pollution de l'air et comment le camp Wildcat adapte ses séances en extérieur. (134 car.)

## Keyword Cluster

| Role | Keyword (query brut) | Volume | Où le placer | Formulation naturelle (prose) |
|---|---|---|---|---|
| **Principal** | pollution chiang mai | 170/mo | Title (implicite), H1, meta, intro, 1er H2 | la pollution à Chiang Mai |
| Secondaire | saison des brulis chiang mai | 10/mo | Title, H1, intro, H2 "C'est quoi la saison des brûlis" | la saison des brûlis à Chiang Mai |
| Secondaire | chiang mai pollution | 170/mo | Meta, sous-titre, alt text | la pollution à Chiang Mai (variante d'ordre des mots, même intention) |
| Secondaire | air pollution chiang mai | 40/mo | H2 "Pollution et AQI", body | la pollution de l'air à Chiang Mai |
| Secondaire | indice pollution chiang mai | 10/mo | H2 "Pollution et AQI", body | l'indice de pollution à Chiang Mai |
| Secondaire | indice qualité de l'air | 210/mo | H2 "Pollution et AQI", vulgarisation AQI | l'indice de qualité de l'air (AQI) |
| Long-tail | pollution chiang mai today | 10/mo | H2 "Pollution et AQI" (renvoi suivi officiel) | la pollution à Chiang Mai aujourd'hui |
| Long-tail | thailande pollution | 30/mo | H2 "Faut-il éviter Chiang Mai" (contexte régional) | la pollution en Thaïlande |
| Long-tail | bangkok pollution | 210/mo | H2 "Faut-il éviter Chiang Mai" (comparaison brève) | la pollution à Bangkok |
| Long-tail | aqi définition | 40/mo | H2 "Pollution et AQI" (vulgarisation) | l'AQI (indice de qualité de l'air) |

**Rappel au writer** : dans le corps de l'article, utilise toujours la colonne "Formulation naturelle", jamais la forme brute du query. Voir `/seo-write` Golden Rule 8.

## Structure

### H2: C'est quoi la saison des brûlis à Chiang Mai ?
Keywords: saison des brulis chiang mai, pollution chiang mai
Bloc AEO: Definition
Contenu: Contexte régional (brûlis agricoles nord Thaïlande, Laos, Myanmar), période globale novembre/décembre à avril avec pic mars-avril [CLM-006, à confirmer via source officielle avant publication finale]. Ton factuel, pas alarmiste. Ouvrir sur la vraie question que se posent les francophones (adapter l'ouverture du squelette de démo : "chaque année, la même question arrive sur WhatsApp").

### H2: Pollution et qualité de l'air à Chiang Mai : l'indice AQI/PM2.5 et le calendrier mois par mois
Keywords: air pollution chiang mai, indice pollution chiang mai, indice qualité de l'air, aqi définition, pollution chiang mai today, pollution chiang mai, saison des brulis chiang mai
Bloc AEO: Definition
Contenu: **Fusion de deux anciens H2** dans une seule section (correctif structure Hn — plafond 5-6 H2, verdict brief-critic). Volet 1 — vulgarisation obligatoire Module C : expliquer PM2.5 et AQI en langage simple (parenthèses, analogie), sans jamais citer de chiffre précis inventé [CLM-004, forbidden sans source]. Renvoyer explicitement vers un suivi officiel en direct (Air4Thai, IQAir Chiang Mai) plutôt que de figer un chiffre dans le texte — ces sources doivent être vérifiées et citées via `/seo-sources` avant publication (YMYL). Volet 2, à la suite dans la même section (sous-titre optionnel type "Le calendrier mois par mois, honnêtement") : tableau mois par mois (qualité de l'air qualitative : excellente / variable / souvent mauvaise / bonne — jamais de chiffre PM2.5 précis sans source), en repartant du calendrier déjà esquissé dans le squelette de démo mais en le validant/actualisant. Ne pas sur-affirmer les dates exactes sans confirmation.

### H2: Ce qu'on observe au camp, saison après saison
Keywords: chiang mai pollution
Bloc AEO: Self-contained answer
Contenu: Passage à la première personne de Meaw (E-E-A-T module C — remplace la section "Paroles de clients" du module, absente ici car aucun témoignage client sur ce sujet précis n'existe dans le CMS ; utiliser l'expérience directe de l'opératrice à la place, cf. `docs/brand/voice.md`). Concret : ce qu'elle voit changer au camp, pas de généralités touristiques. Produire au moins une phrase autonome et attribuable à Meaw, ré-citable telle quelle (voir "Citations exploitables (GEO — Quotation Addition)").

### H2: Comment on adapte l'entraînement les jours difficiles
Keywords: (aucun nouveau — section de conversion pratique)
Bloc AEO: Step-by-step
Contenu: Adaptations réelles du camp les jours de mauvais air [CLM-003, à confirmer avec Meaw avant publication — le squelette de démo mentionne horaires décalés, travail technique à l'ombre/en intérieur, moins de cardio intense ; formuler au conditionnel tant que non confirmé]. Lien obligatoire vers `/classes#schedule` ici pour montrer le planning réel. **En fin de section** (sous-partie, correctif structure Hn — absorbe l'ancien H2 "Nos précautions, et ce qu'on ne prétend pas") : disclaimer explicite en italique (obligatoire Module C) — ceci n'est pas un avis médical, consulter un professionnel de santé en cas de sensibilité respiratoire, se référer aux indices officiels en direct. Rappeler qu'aucune promesse n'est faite sur la qualité de l'air à une date précise.

### H2: Faut-il éviter Chiang Mai pendant cette période ? Notre avis honnête
Keywords: thailande pollution, bangkok pollution
Bloc AEO: Pros-cons
Contenu: Réponse nuancée (pas de vente forcée) : fenêtre nov-janvier idéale, mars-avril à vérifier au cas par cas, comparaison brève avec Bangkok pour contextualiser (Chiang Mai n'est pas un cas isolé en Asie du Sud-Est). Nommer la limite : si dates flexibles, viser nov-janvier ; si dates fixées en mars/avril, écrire au camp avant de réserver. Liens obligatoires ici vers `/stay-train` et `/contact`.

### H2: Questions fréquentes sur la pollution et la saison des brûlis à Chiang Mai
Keywords: (FAQ — PAA scan SERP)
Bloc AEO: —
Contenu: 3 questions issues de `serp_features.people_also_ask` (correctif structure Hn — plafond 3 H3 par H2 ; les deux anciennes questions "Quand est la saison des brûlis" et "Quelle est la meilleure période pour éviter la pollution" sont fusionnées en une seule) :
- #### Quand est la saison des brûlis à Chiang Mai, et quelle est la meilleure période pour l'éviter ?
- #### Comment se protéger de la pollution à Chiang Mai ?
- #### La pollution à Chiang Mai est-elle dangereuse pour la santé ?
Réponses courtes et directes, sans donnée médicale inventée (renvoyer vers un professionnel de santé pour la dernière question). La première réponse couvre à la fois le calendrier global et la fenêtre recommandée (nov-janvier) pour éviter d'éclater la même information en deux Q/A.

## Maillage interne (liens sortants)

| Ancre | Cible | Section | Obligatoire | Raison |
|---|---|---|---|---|
| nos horaires d'entraînement | /classes#schedule | Comment on adapte l'entraînement les jours difficiles | Oui | Maillage imposé — montre le planning réel pendant qu'on parle d'ajustement d'horaires |
| les packages Stay & Train | /stay-train | Faut-il éviter Chiang Mai pendant cette période | Oui | Maillage imposé — CTA conversion séjour |
| écris-nous avant de réserver tes dates | /contact | Faut-il éviter Chiang Mai pendant cette période | Oui | Maillage imposé — CTA chaud/tiède WhatsApp |
| le budget d'un séjour longue durée | /dtv-visa/long-stay-training | Faut-il éviter Chiang Mai pendant cette période | Non | Pertinent pour les lecteurs qui planifient un séjour long (persona DTV secondaire) mais pas imposé — à garder si l'intégration reste naturelle |

`docs/seo/content-map.md` confirme ces URLs (rôles pillar `/classes` et `/stay-train`, conversion `/contact`). Rappel : les liens s'écrivent sans préfixe de locale, le plugin rehype ajoute `/fr` au build (`docs/seo/context.md`).

## Image Briefs

### Cover
- Placement: cover
- Type: photo
- Sujet: Séance d'entraînement matinale en extérieur au camp, golden hour, collines visibles au loin
- Description: Plan moyen sur une séance de paos en extérieur au ring de Wildcat, lumière chaude de début de matinée. À l'arrière-plan, les collines autour de Chiang Mai légèrement voilées (sans effet dramatique ni apocalyptique — cohérent avec le moodboard, jamais d'imagerie sombre ou anxiogène). Ambiance positive, pas de masque anti-pollution visible au premier plan pour ne pas sur-dramatiser.
- Alt text: Séance d'entraînement matinale en plein air au camp Wildcat Muay Thai à Chiang Mai, collines visibles en arrière-plan
- Text overlay: null
- Aspect ratio: 16:9
- Notes: Respecter `docs/design/moodboard.md` — DSLR naturel, golden hour, jamais "dark moody" ni imagerie de smog alarmiste.

### Image 2 — after-h2:Pollution et qualité de l'air à Chiang Mai : l'indice AQI/PM2.5 et le calendrier mois par mois (positionner après le tableau du calendrier, en fin de section — l'ancien H2 dédié a été fusionné, correctif structure Hn)
- Type: infographic
- Sujet: Calendrier illustré de la qualité de l'air à Chiang Mai, mois par mois
- Description: Frise ou grille horizontale des 12 mois, chaque mois codé par une icône/teinte qualitative (excellente / variable / mauvaise / bonne saison des pluies), sans chiffre PM2.5 inventé dessus. Style graphique simple aligné sur la palette du site (vert forêt / or / crème), pas un graphique de type alerte sanitaire.
- Alt text: Calendrier illustré mois par mois de la qualité de l'air à Chiang Mai, de la saison sèche à la saison des brûlis
- Text overlay: null
- Aspect ratio: 4:3
- Notes: Ne pas afficher de valeurs AQI/PM2.5 chiffrées tant qu'aucune source officielle n'est vérifiée (`/seo-sources`).

### Image 3 — after-h2:Ce qu'on observe au camp, saison après saison
- Type: portrait
- Sujet: Meaw Boonpradub sur le terrain du camp
- Description: Portrait candide de Meaw au camp (ring ou jardin en arrière-plan), lumière naturelle, pas posé de façon corporate. Cohérent avec les portraits déjà utilisés pour la byline auteur du blog.
- Alt text: Portrait de Meaw Boonpradub, fondatrice de Wildcat Muay Thai, sur le terrain du camp à Chiang Mai
- Text overlay: null
- Aspect ratio: 1:1
- Notes: Réutiliser si possible la photo déjà résolue pour la byline auteur (`COACHES_QUERY`/fiche Meaw) plutôt que d'en générer une nouvelle.

### Image 4 — after-h2:Comment on adapte l'entraînement les jours difficiles
- Type: photo
- Sujet: Séance de travail technique à l'ombre / sous le pavillon couvert
- Description: Plan moyen d'une séance de travail technique (pao ou technique à deux) sous la partie couverte du ring, lumière tamisée chaude, ambiance calme plutôt qu'intense. Illustre l'adaptation sans dramatiser.
- Alt text: Séance de travail technique à l'ombre sous le pavillon couvert du camp Wildcat Muay Thai à Chiang Mai
- Text overlay: null
- Aspect ratio: 4:3
- Notes: Cette image illustre une adaptation encore marquée [CLM-003, à confirmer] — vérifier qu'une photo réelle correspondante existe avant de la publier ; sinon utiliser une photo générique de séance couverte/soirée déjà disponible dans les assets du projet (`night-session.webp` cité dans le CLAUDE.md du projet).

## Objectif business
Construire l'autorité E-E-A-T FR sur une requête informationnelle à volume réel (170/mo, LOW competition, zéro concurrent avec voix d'opérateur terrain) pour capter et rassurer le persona francophone qui hésite sur ses dates de séjour à cause de la saison des brûlis. L'article nourrit le maillage vers les pages de conversion (`/classes#schedule`, `/stay-train`, `/contact`) plutôt que de rester un article orphelin, et prépare le terrain pour le persona DTV secondaire (séjour long) sans jamais cannibaliser le pillar `/stay-train` (aucun mot-clé de tête "camp/stage muay thai thailande" ciblé ici).

## Angle unique / POV
Mode B, dérivé de `recommended_angle` (`.seo-data/serp-pollution-chiang-mai-fr.json`) : écrire depuis la position unique de Wildcat — un camp qui opère réellement à Chiang Mai pendant la saison des brûlis, à la voix de Meaw Boonpradub, propriétaire — pour répondre concrètement à "peut-on s'entraîner en Muay Thai à Chiang Mai pendant la saison des brûlis ?" avec des adaptations réelles de camp plutôt que des généralités touristiques, en restant prudent sur le YMYL (aucun conseil médical, renvoi vers surveillance AQI officielle). Tutoiement FR.

**Interdiction absolue** : ne jamais laisser entendre que l'équipe du camp est francophone. Le contenu est rédigé en français mais le service sur place reste en anglais — cohérent avec le re-cadrage `/stay-train` (E5f). Si le sujet des échanges pratiques est abordé (WhatsApp, réservation), formuler explicitement "on échange en anglais" si la précision est utile, sans jamais l'éviter par omission trompeuse.

## Gap concurrent identifié
Date de l'analyse : 2026-08-06 (`.seo-data/serp-pollution-chiang-mai-fr.json`)

Aucun résultat en page 1 FR ne répond à la question opérationnelle d'un francophone qui prépare un séjour d'entraînement Muay Thai à Chiang Mai pendant la saison des brûlis : est-ce raisonnable de s'entraîner en extérieur, comment un camp réel adapte ses horaires/activités, quelles fenêtres restent viables, quelles précautions concrètes prendre sur place. Les 5 résultats du top sont soit des médias expat génériques (lepetitjournal.com — contenu daté de 2021 remis à jour en surface), soit un blog voyage généraliste sans profondeur Chiang Mai, soit un forum UGC anonyme, soit une agence de trekking avec un angle hors-sport. Aucun ne s'adresse à un public venant s'entraîner physiquement, et aucun ne porte de signal E-E-A-T d'un opérateur qui vit la saison au quotidien.

## CTA cible
- Lead chaud: `/stay-train` — "regarde les packages Stay & Train" — placer dans la section "Faut-il éviter Chiang Mai pendant cette période ?"
- Lead tiède: `/contact` — "écris-nous avant de réserver tes dates" — placer dans la même section (`docs/brand/message.md` CTA tiède : "Ask us anything")
- Nurturing: `/classes#schedule` (planning réel) — aucun autre article FR du cluster `chiang-mai-life` n'existe encore pour un maillage retour direct ; suggérer un maillage retour depuis `/stay-train#life` une fois l'article publié (page existante, section vie au camp)

## Sources
Aucune URL fournie par l'utilisateur. YMYL Module C — sources institutionnelles obligatoires avant publication finale, à exécuter via le skill `/seo-sources` (visite réelle + citation datée), candidats à vérifier en priorité :
- Air4Thai (Pollution Control Department, gouvernement thaïlandais) — indice officiel PM2.5/AQI en direct
- IQAir Chiang Mai — indice de référence international cité par les 3 concurrents du SERP
- Toute source institutionnelle santé (OMS seuils PM2.5) si un chiffre de comparaison est nécessaire

Ne jamais publier un chiffre précis (PM2.5, nombre de consultations hospitalières, comparaison interannuelle) sans que `/seo-sources` l'ait vérifié et daté.

## Données brutes
Aucune donnée chiffrée fournie par l'utilisateur pour cet article. Ne pas réutiliser les chiffres du squelette de démo EN/FR existant tels quels (calendrier mois par mois "excellente/variable/mauvaise/bonne" présent dans le squelette n'est pas sourcé) — les traiter comme hypothèse de départ à confirmer, jamais comme fait publié.

## Citations exploitables (GEO — Quotation Addition)
Aucune source externe vérifiée à ce stade du brief (Module C / YMYL) — les citations institutionnelles restent **à sourcer** via `/seo-sources` (visite réelle + citation datée) avant `/seo-enrich`. Candidats identifiés pour une citation verbatim une fois vérifiés :
- Air4Thai (Pollution Control Department, gouvernement thaïlandais) — indice officiel PM2.5/AQI en direct. Phrase exacte à extraire lors de la vérification (ex. définition officielle du seuil ou de l'indice).
- IQAir Chiang Mai — indice de référence international, cité par 3 des 5 concurrents du SERP FR analysé (`.seo-data/serp-pollution-chiang-mai-fr.json`). Phrase exacte à extraire lors de la vérification.

Citation exploitable disponible dès la rédaction, propre à la voix E-E-A-T interne (pas une source externe à vérifier) : la section "Ce qu'on observe au camp, saison après saison" doit produire au moins une phrase autonome et attribuable à Meaw Boonpradub, formulée par `/seo-write` et validée avant publication — format cible : « [phrase exacte, 2-3 phrases, autonome] » — Meaw Boonpradub, fondatrice de Wildcat Muay Thai. Ne pas inventer cette citation au stade du brief.

## Preuves et limites
| Élément | Statut | Formulation autorisée / limite |
|---|---|---|
| Camp familial open-air à Hang Dong, Chiang Mai | documenté (`proofs.md`) | Décrire le lieu tel quel, sans prétendre convenir à tout le monde |
| Meaw Boonpradub, fondatrice, vit et opère le camp à Chiang Mai toute l'année | documenté (`docs/brand/voice.md`) | Utilisable comme voix E-E-A-T de la section "Ce qu'on observe au camp" |
| Adaptations opérationnelles saison des brûlis (horaires décalés, travail à l'ombre, moins de cardio) | needs_review — présent dans le squelette de démo mais non confirmé dans `proofs.md` | [CLM-003] Formuler au conditionnel ou confirmer avec Meaw avant `/seo-write` final ; ne pas présenter comme protocole établi |
| Dates précises de la saison des brûlis (nov/déc à avril, pic mars-avril) | needs_review — cohérent avec le SERP et le squelette de démo mais sans source officielle citée dans le projet | [CLM-006] Confirmer via Air4Thai ou source gouvernementale avant publication finale |
| Chiffres PM2.5/AQI précis, données hospitalières, comparaisons interannuelles | interdit sans source | [CLM-004] Ne jamais inventer ; renvoyer vers un suivi officiel en direct |
| L'équipe du camp est anglophone sur place | documenté (re-cadrage `/stay-train` E5f, `themes.md`) | [CLM-005] Ne jamais suggérer un accueil en français |

# Draft — Re-cadrage pillar `/classes` (7 modifs, EN + FR)

> Output de rédaction pour le brief `content/_drafts/pages/classes-pillar.md`.
> **ÉDITION** de la page existante `src/pages/[lang]/classes.astro` + des clés `messages/{en,fr}.json`.
> Ce fichier est un draft de copy uniquement — aucune modif de code/messages effectuée.
> Garde-fou : `muay thai chiang mai` (head, réservé Home) **jamais** en title/H1 ici.
> Prix : jamais en dur — ils viennent de `site.ts` dans le composant. La prose cite seulement la fourchette marché 300-700 THB (benchmark SERP).
> Marque : **Wildcat**. Banned : warrior, beast mode, hardcore, no pain no gain, world-class.
> Keywords ciblés en **gras** aux placements du brief §3.

---

## ⚠️ Écarts / points à valider avant implémentation

1. **Géo (Modif 3) — incohérence à trancher.** `site.ts` donne l'adresse `Hang Dong District, Chiang Mai 50230`. Le brief §3/§4 suppose "in-/near-town, easy to reach from the Old City" comme avantage vs Tiger/Santai. **Mais Santai EST à Hang Dong** — si Wildcat est aussi à Hang Dong, l'angle "proche Old City" est faux. J'ai donc rédigé Modif 3 **sans** affirmer la proximité avec la Old City : je formule l'accès positivement ("easy to find, with parking and scooter rental right here") et je laisse `[À VÉRIFIER : quartier exact + temps de trajet réel depuis le centre]`. À corriger selon la réalité terrain.
2. **Âge minimum kids (Modif 6, Q5)** : non documenté dans `site.ts` → `[À VÉRIFIER]` laissé dans la copy.
3. **Modif 7 (CtaBanner)** : le wording actuel (`classes_cta_title` "Come as you are — / leave stronger." / FR "Viens comme tu es — / repars plus fort.") est déjà chaleureux et non pressant. **Aucune modif nécessaire** — je documente le verdict, je ne propose pas de changement gratuit.
4. **`classes_hero_head`** ("Classes & programs" / "Cours & programmes") : conservé tel quel (eyebrow neutre, pas concerné par le re-cadrage). Non listé ci-dessous.

---

## Modif 1 — Title / meta / H1 / intro (variante A actée)

Title et meta = **clés éditées**. H1 : la page rend `classes_hero_title` + `classes_hero_title_em` (deux fragments concaténés, le 2e en Fraunces or). Variante A veut un H1 plein `Muay Thai classes in Chiang Mai, for every level` — je le découpe sur la structure existante : fragment normal + fragment `.em`. Lead = clé éditée.

| Clé message | Statut | EN | FR |
|---|---|---|---|
| `classes_meta_title` | **éditée** | `Muay Thai Classes in Chiang Mai — Schedule & Prices` | `Cours de Muay Thai à Chiang Mai — horaires et prix` |
| `classes_meta_desc` | **éditée** | `Muay Thai classes in Chiang Mai at Wildcat: daily group & private training, public prices in THB, full weekly schedule. Beginners, women & kids welcome.` | `Cours de Muay Thai à Chiang Mai chez Wildcat : entraînement quotidien en groupe et en privé, prix publics en THB, planning complet de la semaine. Débutants, femmes et enfants bienvenus.` |
| `classes_hero_title` | **éditée** | `Muay Thai classes in Chiang Mai,` | `Cours de Muay Thai à Chiang Mai,` |
| `classes_hero_title_em` | **éditée** | `for every level` | `pour tous les niveaux` |
| `classes_hero_lead` | **éditée** | `Daily **Muay Thai classes in Chiang Mai** at Wildcat — group sessions, private one-on-ones and a real weekly schedule, all with public prices in THB. Total beginner or seasoned fighter, woman, kid or solo traveler: there's a class for you here.` | `Des **cours de Muay Thai à Chiang Mai** tous les jours chez Wildcat — sessions en groupe, cours privés en tête-à-tête et un vrai planning hebdo, le tout à prix publics en THB. Grand débutant ou combattant confirmé, femme, enfant ou voyageur solo : il y a un cours pour toi ici.` |

*Note placement : keyword principal "muay thai classes chiang mai" en H1 + lead + meta + title. BLUF respecté (qui/quoi/preuves : prix publics THB, planning, inclusivité). H1 ≠ title ✅. Title 51 car., meta 152 car.*

---

## Modif 2 — Les 6 cards `#programs` : bodies enrichis

Les 6 `classes_progN_b` sont **éditées** (1-2 phrases concrètes chacune). Women + Kids = réassurance incarnée (le gap SERP). Levels/titres inchangés.
**Changement de code lié (hors ce draft, à signaler à l'implémenteur)** : la card 1 (Beginner) doit pointer vers `/classes/beginners` au lieu de `/contact` ; la card 6 (Fight Team) vers `/fighters`. Ancre Beginner : "what your first class looks like" → portée par le `moreLabel` ou un libellé dédié. Je fournis ci-dessous une **clé d'ancre optionnelle** `classes_prog1_more` si tu veux un label spécifique sur cette card.

| Clé message | Statut | EN | FR |
|---|---|---|---|
| `classes_prog1_b` | **éditée** | `Start from zero in a small, supportive group: stance, the basic strikes, footwork and pad work, step by step. No experience, no fitness level and no gear needed — we'll lend you gloves and wraps. See **what your first class looks like**.` | `Pars de zéro dans un petit groupe bienveillant : la garde, les frappes de base, les déplacements et le travail aux paos, étape par étape. Aucune expérience, aucune condition physique et aucun équipement requis — on te prête gants et bandes. Découvre **à quoi ressemble ton premier cours**.` |
| `classes_prog2_b` | **éditée** | `Daily group **Muay Thai training in Chiang Mai** — pad work, technique, clinch and conditioning in one session. Real Thai coaches scale every drill to your level, so beginners and regulars train side by side.` | `**Entraînement de Muay Thai à Chiang Mai** en groupe tous les jours — paos, technique, clinch et conditioning dans une même session. De vrais coachs thaïs adaptent chaque exercice à ton niveau : débutants et habitués s'entraînent côte à côte.` |
| `classes_prog3_b` | **éditée** | `One-on-one **private Muay Thai lessons** with a Kru who watches only you. The fastest way to fix your technique — book around your own schedule, whether it's your first week or your fiftieth.` | `Des **cours de Muay Thai privés** en tête-à-tête avec un Kru qui ne regarde que toi. Le moyen le plus rapide de corriger ta technique — tu réserves selon ton propre planning, que ce soit ta première semaine ou ta cinquantième.` |
| `classes_prog4_b` | **éditée** | `A space where women train without anyone making it weird. Many of our members started here never having thrown a punch — coached patiently, at your pace, in a woman-run camp where you set the intensity.` | `Un espace où les femmes s'entraînent sans que personne en fasse tout un cinéma. Beaucoup de nos membres ont commencé ici sans avoir jamais donné un coup de poing — coachées avec patience, à ton rythme, dans un camp tenu par une femme où c'est toi qui fixes l'intensité.` |
| `classes_prog5_b` | **éditée** | `Kids learn Muay Thai as play — balance, coordination and confidence, never pressure. Parents are welcome to train in the same session, so the whole family can share the camp instead of waiting on the side.` | `Les enfants apprennent le Muay Thai comme un jeu — équilibre, coordination et confiance, jamais de pression. Les parents peuvent s'entraîner sur la même session : toute la famille partage le camp au lieu d'attendre sur le côté.` |
| `classes_prog6_b` | **éditée** | `For members ready to spar and compete. Fight prep, clinch and sparring with our coaches, plus corner support on fight night. **Meet our fight team** to see who you'd be training alongside.` | `Pour les membres prêts à faire du sparring et à combattre. Préparation au combat, clinch et sparring avec nos coachs, plus le coin du ring le soir du combat. **Rencontre notre fight team** pour voir avec qui tu t'entraînerais.` |
| `classes_prog1_more` | **NOUVELLE (optionnelle)** | `What your first class looks like` | `À quoi ressemble ton premier cours` |

---

## Modif 3 — NOUVELLE section H2 "An open-air family camp — not a fight factory"

Section à insérer entre `#programs` et `#schedule` (ou après `#pricing`). Toutes les clés sont **NOUVELLES** (préfixe `classes_camp_*`). Inclut le lien `/about#coaches` (ancre "meet the coaches"). ~120 mots EN. Géo laissée en `[À VÉRIFIER]` (voir écart §1 ci-dessus).

| Clé message | Statut | EN | FR |
|---|---|---|---|
| `classes_camp_head` | **NOUVELLE** | `The camp` | `Le camp` |
| `classes_camp_title` | **NOUVELLE** | `An open-air family camp — not a fight factory` | `Un camp familial en plein air — pas une usine à combats` |
| `classes_camp_body` | **NOUVELLE** | `Wildcat is an open-air camp: you train under cover with the garden around you, often in the golden light of late afternoon — not in a windowless box. It's woman-run and built for people the big gyms forget. Solo travelers, nervous first-timers, women who've never trained, kids who just want to move — they all have a place on the mat here. Our coaches will know your name by your second session. We're easy to find, with parking and scooter rental right here at the camp `[À VÉRIFIER : quartier exact + temps de trajet réel depuis le centre de Chiang Mai]`. Come and **meet the coaches** before you decide anything.` | `Wildcat est un camp en plein air : tu t'entraînes à l'abri avec le jardin autour de toi, souvent dans la lumière dorée de fin d'après-midi — pas dans une boîte sans fenêtres. Le camp est tenu par une femme et pensé pour celles et ceux que les grandes salles oublient. Les voyageurs solo, les grands débutants qui stressent, les femmes qui n'ont jamais touché un sac, les enfants qui veulent juste bouger — tout le monde a sa place sur le tapis ici. Nos coachs connaîtront ton prénom dès ta deuxième session. On est facile à trouver, avec parking et location de scooter sur place `[À VÉRIFIER : quartier exact + temps de trajet réel depuis le centre de Chiang Mai]`. Viens **rencontrer les coachs** avant de décider quoi que ce soit.` |

*Note : "not a fight factory" remplace l'angle "warrior gym" sans utiliser de banned word. Secondaire "muay thai gym chiang mai" non forcé ici (placé en FAQ Q4 et en lead) — la section vibe n'a pas besoin d'y caler le keyword au forceps.*

---

## Modif 4 — 1 phrase au-dessus du schedule (journée type)

`classes_sched_lead` = **clé éditée**. Capte "training" (morning/afternoon sessions).

| Clé message | Statut | EN | FR |
|---|---|---|---|
| `classes_sched_lead` | **éditée** | `A typical day of **Muay Thai training in Chiang Mai** runs in two sessions — a morning class and a late-afternoon one — so you can train around the heat and the rest of your day. Drop in for any class, and message us if you're not sure which one fits.` | `Une journée type d'**entraînement de Muay Thai à Chiang Mai** se déroule en deux sessions — un cours le matin et un en fin d'après-midi — pour t'entraîner en évitant la chaleur et caler le reste de ta journée. Viens à n'importe quel cours, et écris-nous si tu hésites sur le créneau.` |

---

## Modif 5 — Pricing : transparence + repère marché + long-stay

`classes_price_lead` = **clé éditée** (transparence + fourchette marché 300-700 THB). Une **clé nouvelle** `classes_price_longstay` porte la mention douce long-stay avec les 2 liens (`/stay-train` ancre "stay & train packages", `/dtv-visa/long-stay-training` ancre "training 6+ months on a DTV"). À afficher sous la grille de prix.

| Clé message | Statut | EN | FR |
|---|---|---|---|
| `classes_price_lead` | **éditée** | `These are our real, public prices — no hidden packages, no "ask for a quote." Drop-in classes around Chiang Mai usually run **300 to 700 THB**; ours sit at the friendly end of that range. Pay per class, per pack or per month, whatever suits your stay.` | `Voici nos vrais prix publics — pas de pack caché, pas de "demandez un devis". À Chiang Mai, un cours à la séance se situe en général entre **300 et 700 THB** ; les nôtres sont dans le bas de cette fourchette. Tu paies à la séance, au carnet ou au mois, comme ça t'arrange pour ton séjour.` |
| `classes_price_longstay` | **NOUVELLE** | `Staying a while? Look at our **stay & train packages** for a week or a month — or, if you're planning **training 6+ months on a DTV**, we'll help you settle in for the long run.` | `Tu restes un moment ? Jette un œil à nos **formules stay & train** pour une semaine ou un mois — ou, si tu prévois de **t'entraîner 6 mois et plus avec un DTV**, on t'aide à t'installer sur la durée.` |

---

## Modif 6 — FAQ : remplacer par les 5 PAA de la SERP

Mapping sur les clés existantes `faq_q1-5` / `faq_a1-5` (**toutes éditées**). Q2 et Q4 contiennent des keywords en gras + liens.

### Réutilisable vs remplacé (clés actuelles)
- `faq_q1/a1` (actuel : "Do I need experience to start?") → **devient PAA Q2** "Do I need experience to join a class?". Réutilise l'esprit "come as you are", on garde l'idée mais on ajoute le lien beginners.
- `faq_q2/a2` (actuel : "What should I bring?") → **remplacé** par PAA Q1 (coût). L'info "bring water/gloves" est désormais absorbée dans la card Beginner (Modif 2) → pas de perte.
- `faq_q3/a3` (actuel : "Can I try a class before joining?") → **remplacé** par PAA Q3 (Chiang Mai good for muay thai). L'essai à la séance est déjà couvert par Modif 5 (pricing) + Q1.
- `faq_q4/a4` (actuel : DTV visa) → **remplacé** par PAA Q4 (best gym). ⚠️ Le contenu DTV n'est PAS perdu : il vit dans le silo `/dtv-visa` (pillar + satellites). Retirer le DTV de cette FAQ évite la cannibalisation avec le silo DTV — cohérent avec l'archi. La mention long-stay/DTV reste via Modif 5.
- `faq_q5/a5` (actuel : scooter rental) → **remplacé** par PAA Q5 (kids). L'info scooter est désormais dans Modif 3 ("scooter rental right here at the camp") → pas de perte.

### Ordre final (PAA exactes du brief, placées sur les clés existantes dans cet ordre)

| Clé message | Statut | EN | FR |
|---|---|---|---|
| `faq_q1` | **éditée** | `How much does a Muay Thai class cost in Chiang Mai?` | `Combien coûte un cours de Muay Thai à Chiang Mai ?` |
| `faq_a1` | **éditée** | `Drop-in classes around Chiang Mai typically cost **300 to 700 THB**. Our exact prices — per class, per pack and per month, for adults, kids and fighters — are listed in full just above, in the pricing section. No hidden fees.` | `À Chiang Mai, un cours à la séance coûte en général **300 à 700 THB**. Nos prix exacts — à la séance, au carnet et au mois, pour les adultes, les enfants et les fighters — sont listés en entier juste au-dessus, dans la section tarifs. Aucun frais caché.` |
| `faq_q2` | **éditée** | `Do I need experience to join a class?` | `Faut-il de l'expérience pour rejoindre un cours ?` |
| `faq_a2` | **éditée** | `No. Most of our members started as complete beginners, and our coaches meet you exactly where you are. If it's your very first time, see **what your first class looks like** before you come.` | `Non. La plupart de nos membres ont commencé en parfaits débutants, et nos coachs te prennent exactement là où tu en es. Si c'est ta toute première fois, découvre **à quoi ressemble ton premier cours** avant de venir.` |
| `faq_q3` | **éditée** | `Is Chiang Mai good for Muay Thai?` | `Chiang Mai, c'est bien pour le Muay Thai ?` |
| `faq_a3` | **éditée** | `Yes. Northern Thailand is part of Muay Thai's heartland, the city is full of authentic gyms with Thai coaches, and the low cost of living makes it easy to train for weeks or months. It's one of the most popular places in the world to learn the sport.` | `Oui. Le nord de la Thaïlande fait partie du berceau du Muay Thai, la ville regorge de salles authentiques avec des coachs thaïs, et le coût de la vie y rend facile de s'entraîner pendant des semaines ou des mois. C'est l'un des endroits les plus prisés au monde pour apprendre ce sport.` |
| `faq_q4` | **éditée** | `Which is the best Muay Thai gym in Chiang Mai?` | `Quelle est la meilleure salle de Muay Thai à Chiang Mai ?` |
| `faq_a4` | **éditée** | `Honestly, it depends on what you want. If you're chasing a high-volume fighter camp, several big-name gyms do that well. **Our Muay Thai gym in Chiang Mai** is for something else: an open-air, woman-run, family-friendly camp where beginners, women and kids are genuinely looked after — not an intensive fight factory. The best gym is the one that fits you.` | `Honnêtement, ça dépend de ce que tu cherches. Si tu vises un fight camp à gros volume, plusieurs salles connues font ça très bien. **Notre salle de Muay Thai à Chiang Mai** est faite pour autre chose : un camp en plein air, tenu par une femme, accueillant pour les familles, où les débutants, les femmes et les enfants sont vraiment pris en charge — pas une usine à combats intensive. La meilleure salle, c'est celle qui te correspond.` |
| `faq_q5` | **éditée** | `Can my kids train too?` | `Mes enfants peuvent-ils s'entraîner aussi ?` |
| `faq_a5` | **éditée** | `Yes — our Kids & Family program is built for them, with playful, safe sessions from age `[À VÉRIFIER : âge minimum]`. Parents can train in the same time slot, so the whole family can come together. Just message us with your kids' ages and we'll point you to the right class.` | `Oui — notre programme Enfants & famille est fait pour eux, avec des sessions ludiques et sûres à partir de `[À VÉRIFIER : âge minimum]`. Les parents peuvent s'entraîner sur le même créneau : toute la famille vient ensemble. Écris-nous simplement l'âge de tes enfants et on t'orientera vers le bon cours.` |

*Note cannibalisation : "best muay thai gym chiang mai" (40/mo) capté en Q4 ; "muay thai gym chiang mai" (260/mo) placé naturellement en Q4 ("our Muay Thai gym in Chiang Mai"). Aucun "muay thai chiang mai" nu.*

---

## Modif 7 — CtaBanner

**Aucune modif.** `classes_cta_title` / `classes_cta_title_em` ("Come as you are — / leave stronger." · FR "Viens comme tu es — / repars plus fort.") respectent déjà le cahier des charges : chaleureux, non pressant, zéro vocabulaire warrior. Les CTA (`cta_book_class` "Book your first class" + `cta_whatsapp` "Chat on WhatsApp") sont conformes au maillage du brief §5. Rien à changer.

| Clé message | Statut | EN | FR |
|---|---|---|---|
| `classes_cta_title` | **inchangée** | `Come as you are —` | `Viens comme tu es —` |
| `classes_cta_title_em` | **inchangée** | `leave stronger.` | `repars plus fort.` |

---

## Récapitulatif des clés

### Éditées (16)
`classes_meta_title`, `classes_meta_desc`, `classes_hero_title`, `classes_hero_title_em`, `classes_hero_lead`, `classes_prog1_b`, `classes_prog2_b`, `classes_prog3_b`, `classes_prog4_b`, `classes_prog5_b`, `classes_prog6_b`, `classes_sched_lead`, `classes_price_lead`, `faq_q1`–`faq_q5`, `faq_a1`–`faq_a5` (= 5 q + 5 a).
→ Décompte exact : 13 clés `classes_*` éditées + 10 clés `faq_*` éditées = **23 clés éditées**.

### Nouvelles (5)
`classes_prog1_more` (optionnelle), `classes_camp_head`, `classes_camp_title`, `classes_camp_body`, `classes_price_longstay`.

### Inchangées (documentées comme conformes)
`classes_hero_head`, `classes_cta_title`, `classes_cta_title_em`.

### Changements de code liés (hors messages — pour l'implémenteur)
- Card Beginner (`programs[0].href`) : `/contact` → `/classes/beginners`.
- Card Fight Team (`programs[5].href`) : `/contact` → `/fighters`.
- Nouvelle section `#camp` (H2 `classes_camp_*`) entre `#programs` et `#schedule`, avec lien `/about#coaches`.
- Section pricing : afficher `classes_price_longstay` sous la grille, avec liens `/stay-train` et `/dtv-visa/long-stay-training`.
- Liens en gras de la prose (beginners, fighters) : à transformer en `<a>` réels dans les composants concernés (ProgramGrid body / Faq) — le gras markdown ici n'est qu'un marqueur de keyword/ancre.

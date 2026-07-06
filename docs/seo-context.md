---
extends: identity
expertise: Entraînement Muay Thai (coachs thaïs, tous niveaux) + accompagnement visa DTV (soft power, dossiers réels gérés par la owner)
location: Chiang Mai, Thaïlande (camp open-air — audience cible : monde entier, EN-first)
cadence_blog: 6/mois        # 2 articles/semaine
internal_links:             # convention de liens internes (lu par /seo-write + /seo-enrich)
  strategy: prefix-at-build # multilingue : on ecrit SANS prefixe, le plugin rehype ajoute /{locale} au build. Un /en/ ecrit a la main = double prefixe = 404.
  default_locale: en
  locales: [en, fr]
eeat_proof: camp woman-run établi à Chiang Mai ; la owner (Meaw Boonpradub) gère personnellement les dossiers DTV des clients depuis des années ; coachs/fighters réels avec palmarès (CMS) ; témoignages clients ; prix publics THB ; photos réelles du camp
goals:
  cluster: ranker le silo DTV ("dtv visa thailand" + variantes) et générer 5+ dossiers DTV qualifiés/mois via le site
  transactional: demandes DTV (formulaire E6 à terme, /contact + WhatsApp en attendant) et réservations Stay & Train
  local: "muay thai gym/camp chiang mai" — local pack + pages camp
  evergreen: guides DTV et vie au camp qui alimentent le maillage vers les pillars
cta_map:
  hot:
    url: /contact            # ⚠️ remplacé par /dtv-visa/apply quand E6 livré
    anchor: "Start your DTV application"
  warm:
    url: /contact
    anchor: "Ask us anything — we reply on WhatsApp"
  nurturing: satellites DTV + blog (E8) — cross-links pillar ↔ satellites ↔ /stay-train /classes
  email: n/a (pas de newsletter V1)
  calendly:
    url: n/a                 # canal réel = WhatsApp deep link (wa.me, site.ts)
    anchor: "Chat on WhatsApp"
---

# SEO Context — Wildcat Muay Thai

> Extension d'`identity.md`. Spécifique au SEO : personas détaillés, objectifs
> business par type de contenu, CTA map, concurrents.
> `tone`, `register`, `banned_words` sont dans `identity.md` (pas ici).
> `sounds_like`, auteur sont dans `voice.md` (pas ici).
>
> Lu par `/seo-brief`, `/seo-write`, `/seo-enrich`.

## Personas

### Persona principal

- **Label** : Digital nomad / expat DTV, 25-45 ans (EU, UK, US, LATAM)
- **Profil** : veut vivre en Thaïlande plusieurs mois/années avec un visa stable ; cherche
  "DTV visa Thailand", "muay thai visa thailand" ; arrive sur mobile ; compare 3-4 options
- **Ce qu'il sait déjà** : que le DTV existe et permet 5 ans / 180 jours ; que le Muay Thai
  est une activité soft power qualifiante (pas besoin de lui re-vendre la Thaïlande)
- **Ce qu'il veut savoir** : suis-je éligible ? quels documents exactement ? combien ça
  coûte (visa + vie sur place) ? combien de temps ça prend ? quel camp fournit les papiers ?
- **Ce qu'il devrait savoir (angle expert)** : ce que l'immigration regarde vraiment dans
  un dossier (qualité des documents d'entraînement, cohérence des fonds) ; les erreurs qui
  font rejeter ; la différence entre agences génériques et un camp qui fournit les
  documents directement
- **Pain points** : peur de l'arnaque (agences visa douteuses) ; flou des sources
  officielles ; échanges WhatsApp désorganisés ; barrière de la langue

### Persona secondaire (optionnel)

- **Label** : Combattant en formation / nomade sportif, 20-35 ans
- **Profil** : veut s'entraîner sérieusement plusieurs mois, cherche "long stay muay thai
  training thailand", découvre le DTV comme moyen de rester
- **Ce qu'il veut savoir** : intensité/qualité du training, coût mensuel total
  (training + logement + vie), possibilité de combattre, comment le camp aide pour le visa

## Concurrents de référence

Deux espaces concurrentiels distincts. (1) **Contenu DTV** : cabinets juridiques
(siam-legal.com, thaiembassy.com) — exhaustifs mais froids, génériques, zéro angle Muay
Thai vécu. (2) **Camps Chiang Mai** (Santai, Lanna MMA, Hong Thong…) — forts sur le
training mais quasi muets sur le DTV ou avec une page mince. Personne ne combine
l'autorité visa ET l'expérience camp réelle.
→ Sera affiné par les scans /seo-serp (`.seo-data/serp-*.json`).

### Synthèse des gaps à exploiter

Le gap : contenu DTV écrit par quelqu'un qui monte réellement des dossiers (E-E-A-T
owner), ancré Muay Thai/Chiang Mai, avec outils interactifs (quiz éligibilité, checklist
documents, estimateur budget) qu'aucun concurrent n'offre. Ton chaleureux vs juridique.

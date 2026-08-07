# PRD — Wild Cat Chiang Mai

> **Version:** 1.0
> **Date:** 2026-06-03
> **Auteur:** Jonathan Vouilloz
> **Statut:** Draft

---

## 1. Vision & Contexte

### Problème

Wild Cat Chiang Mai est un camp de Muay Thai reconnu à Chiang Mai, Thaïlande, avec une clientèle internationale existante — mais sans présence web. Aujourd'hui, les demandes DTV, les inscriptions Stay & Train et la gestion des prospects se font entièrement via WhatsApp. C'est fonctionnel mais non scalable, peu professionnel aux yeux des nouveaux clients étrangers, et invisible sur Google.

### Solution

Un site vitrine SEO multi-langue propulsé par Astro + Sanity CMS, avec une mini-app DTV intégrée (formulaire multi-étapes + dépôt de documents + communication WhatsApp structurée), destiné à capter des clients étrangers via le SEO global et local, et à professionnaliser le process de gestion des visas DTV.

### Utilisateur cible

Trois profils principaux :

**Le Digital Nomad / Expat DTV** — 25-45 ans, étranger (EU, RU, LATAM, FR), cherche à vivre en Thaïlande plusieurs mois avec un visa stable. Il cherche un service clé en main qui gère le visa à sa place. Il est méfiant des arnaques, veut du pro et du clair. Il cherche sur Google "DTV visa Chiang Mai" ou "Muay Thai training visa Thailand".

**Le combattant en formation** — 20-35 ans, vient s'entraîner au Muay Thai de façon sérieuse, cherche un camp avec de vrais combattants, des entraînements quotidiens, et la possibilité de combattre localement. Il cherche sur Google "Muay Thai training camp Chiang Mai", "fight camp Thailand".

**Le touriste aventurier** — vient pour une expérience courte (1-4 semaines), cherche à s'essayer au Muay Thai, se loger, louer un scooter. Moins intentionnel mais très volumeux en trafic SEO.

### Succès

- Générer des demandes DTV qualifiées directement via le site (objectif : 5+ dossiers/mois en régime de croisière)
- Classement Google sur les requêtes cibles DTV Chiang Mai et Muay Thai training camp Chiang Mai dans les 6 mois
- Trafic organique multi-langue fonctionnel avec des URLs localisées indexées
- Le formulaire DTV remplace WhatsApp comme point d'entrée principal des dossiers

---

## 2. Scope

### IN — Ce qu'on fait (V1)

- [ ] Site vitrine multi-langue (EN/FR/TH minimum, + DE/ES/RU via traduction auto) avec URLs localisées `/en` `/fr` `/th` etc.
- [ ] Architecture SEO : pages piliers + pages satellites + blog/guides/quiz sur la thématique DTV et Muay Thai
- [ ] Mini-app DTV : formulaire multi-étapes localisé, dépôt de documents, notification WhatsApp + email de confirmation
- [ ] Page Stay & Train : présentation des programmes, horaires d'entraînement, infos combats locaux
- [ ] Section Fighters : livre d'or des combattants passés et présents, cards stylisées avec profil/palmarès
- [ ] Pages infos Scooter & Accommodation (contenu statique uniquement)
- [ ] Sanity CMS branché pour gestion du contenu (articles, fighters, témoignages, horaires)
- [ ] Intégration médias : galerie photos/vidéos, témoignages clients
- [ ] SEO technique : sitemap multi-langue, hreflang, meta par page/langue, schema.org LocalBusiness

### OUT — Ce qu'on ne fait PAS (volontairement en V1)

- Système de réservation en ligne avec créneaux interactifs (Stay & Train)
- Système de crédits / paiement en ligne
- Espace client avec suivi de dossier DTV ("votre dossier est en cours")
- Authentification utilisateur côté public
- Chat live / messagerie intégrée (pas de Crisp, Intercom, etc.)

### LATER — V2 et au-delà

- Mini SaaS DTV : espace client avec statut de dossier, documents manquants, timeline de traitement
- Système de réservation Stay & Train avec créneaux et crédits
- Dashboard owner pour gérer les dossiers DTV sans accès Sanity/Drive
- Profils fighters enrichis avec statistiques, photos de combat, vidéos
- Programme d'affiliation / referral pour les apporteurs de clients DTV

---

## 3. Architecture des pages

### Structure globale

```
/ (home)
├── /[lang]/                          # EN, FR, TH, DE, ES, RU
│   ├── index                         # Home
│   ├── muay-thai-training/           # Pilier Stay & Train
│   ├── dtv-visa/                     # Pilier DTV (page principale)
│   │   ├── dtv-visa/apply            # Mini-app formulaire DTV
│   │   ├── dtv-visa/guide            # Satellite : Guide complet DTV
│   │   ├── dtv-visa/faq              # Satellite : FAQ DTV
│   │   └── dtv-visa/quiz             # Satellite : Quiz éligibilité DTV
│   ├── fighters/                     # Livre d'or combattants
│   ├── scooter-rental/               # Infos scooters
│   ├── accommodation/                # Infos logement
│   ├── gallery/                      # Photos & vidéos
│   ├── testimonials/                 # Témoignages
│   ├── blog/                         # Articles SEO
│   │   └── blog/[slug]
│   ├── about/                        # À propos Wild Cat
│   └── contact/                      # Contact général
```

### Pages prioritaires pour le lancement

1. Home
2. DTV Visa (pilier)
3. DTV Apply (formulaire)
4. Stay & Train
5. Fighters
6. About
7. Contact

---

## 4. User Stories & Flows

### Story 1: Soumission d'un dossier DTV

**En tant que** visiteur étranger cherchant un visa DTV
**Je veux** soumettre mes documents et infos via un formulaire guidé dans ma langue
**Afin de** démarrer mon dossier DTV sans avoir à gérer des échanges WhatsApp désorganisés

**Flow détaillé:**
1. L'utilisateur arrive sur `/[lang]/dtv-visa` via Google ou lien direct
2. Il lit la page pilier (explication du service, ce qui est inclus, prix, témoignages)
3. Il clique sur "Start my DTV application" / "Commencer mon dossier"
4. Il est redirigé vers `/[lang]/dtv-visa/apply`
5. Étape 1 — Informations personnelles : nom, nationalité, email, téléphone, WhatsApp
6. Étape 2 — Situation actuelle : pays de résidence actuel, date d'arrivée souhaitée, durée envisagée
7. Étape 3 — Documents : upload passeport (PDF/JPG), photo d'identité, justificatif de revenus (optionnel à ce stade)
8. Étape 4 — Récapitulatif + confirmation
9. À la soumission : les fichiers sont envoyés au storage (Drive ou Supabase — voir questions ouvertes), un email de confirmation est envoyé au client via Resend, et un message WhatsApp pré-rempli s'ouvre automatiquement vers la owner avec la référence du dossier
10. L'utilisateur voit une page de confirmation avec les prochaines étapes expliquées

**Critères d'acceptation:**
- [ ] Le formulaire est disponible dans toutes les langues du site
- [ ] Les fichiers sont uploadés de façon sécurisée (HTTPS, pas accessibles publiquement)
- [ ] L'email de confirmation est reçu dans les 2 minutes
- [ ] Le lien WhatsApp s'ouvre avec le message pré-rempli contenant nom + référence dossier
- [ ] Le formulaire valide les champs obligatoires avant de passer à l'étape suivante
- [ ] Les fichiers acceptés : PDF, JPG, PNG — taille max 10MB par fichier

**Edge cases:**
- Si l'upload échoue → message d'erreur explicite, possibilité de réessayer sans perdre les autres champs
- Si l'email de confirmation ne part pas → le dossier est quand même enregistré, la owner est notifiée
- Si l'utilisateur quitte à mi-parcours → pas de sauvegarde côté serveur (V1), les données sont perdues

---

### Story 2: Découverte du camp via SEO et prise de contact Stay & Train

**En tant que** combattant ou touriste cherchant un camp de Muay Thai
**Je veux** comprendre ce que propose Wild Cat et contacter le camp facilement
**Afin de** planifier mon séjour entraînement

**Flow détaillé:**
1. L'utilisateur arrive sur `/[lang]/muay-thai-training` via une recherche Google
2. Il parcourt la page : programme, fréquence des entraînements, niveau requis, tarifs indicatifs
3. Il consulte la section Fighters pour évaluer le niveau et la crédibilité du camp
4. Il clique sur "Contact us" ou "Book a session"
5. Il est renvoyé vers un lien WhatsApp avec message pré-rempli ou vers `/[lang]/contact`

**Critères d'acceptation:**
- [ ] La page Stay & Train répond aux questions typiques (niveau, fréquence, tarifs, logement)
- [ ] Un CTA clair est visible above the fold
- [ ] Les horaires d'entraînement sont gérables via Sanity CMS

---

### Story 3: Navigation sur la section Fighters

**En tant que** visiteur curieux ou futur combattant
**Je veux** voir les fighters qui sont passés par Wild Cat
**Afin de** évaluer le niveau du camp et m'identifier à la communauté

**Flow détaillé:**
1. L'utilisateur arrive sur `/[lang]/fighters`
2. Il voit un grid de cards fighters : photo, nom, nationalité, nombre de combats, victoires
3. Il peut filtrer par statut (actuel / alumni) ou nationalité (V2)
4. Il clique sur une card pour voir le profil complet (si activé dans Sanity)

**Critères d'acceptation:**
- [ ] Les cards sont gérables via Sanity CMS (ajout/modif/suppression sans code)
- [ ] Les cards affichent au minimum : photo, nom, nationalité, record de combats
- [ ] La page est visuellement forte et différenciante (pas un simple tableau)

---

## 5. Data Model

Pas de base de données relationnelle côté V1 — le contenu est géré via Sanity CMS (headless), et les dossiers DTV sont stockés dans le service de fichiers choisi. Pas d'authentification publique.

### Schéma Sanity CMS

#### fighter
| Champ | Type | Description |
|-------|------|-------------|
| name | string | Nom du fighter |
| slug | slug | URL unique |
| photo | image | Photo principale |
| nationality | string | Nationalité |
| status | string | `current` ou `alumni` |
| fights | number | Nombre total de combats |
| wins | number | Victoires |
| losses | number | Défaites |
| bio | text | Courte biographie |
| featured | boolean | Mis en avant sur la home |

#### blogPost
| Champ | Type | Description |
|-------|------|-------------|
| title | object (i18n) | Titre traduit par langue |
| slug | slug | URL unique |
| lang | string | Langue principale |
| content | portableText | Corps de l'article |
| seoTitle | string | Title tag SEO |
| seoDescription | string | Meta description |
| publishedAt | datetime | Date de publication |
| category | reference | Catégorie (DTV / Training / Life) |

#### trainingSchedule
| Champ | Type | Description |
|-------|------|-------------|
| day | string | Jour de la semaine |
| timeSlots | array | Créneaux horaires |
| level | string | Tous niveaux / Avancé |
| notes | text | Infos complémentaires |

#### testimonial
| Champ | Type | Description |
|-------|------|-------------|
| name | string | Prénom du client |
| country | string | Pays d'origine |
| service | string | `dtv` / `training` / `general` |
| content | text | Texte du témoignage |
| rating | number | Note sur 5 |
| featured | boolean | Affiché sur la home |

### Dossier DTV (stockage fichiers)

```
/DTV/
└── [YYYY-MM-DD]_[NomClient]_[Ref]/
    ├── passport.[ext]
    ├── id-photo.[ext]
    ├── income-proof.[ext]       (optionnel)
    └── metadata.json            (nom, email, whatsapp, nationalité, date, ref)
```

---

## 6. Stack Technique

| Couche | Choix | Justification |
|--------|-------|---------------|
| Framework | Astro 5 | SSG/SSR hybride, excellent SEO, support i18n natif, vibe-coding friendly |
| CMS | Sanity v3 | Interface owner simple, API flexible, gestion i18n, déjà connu |
| Storage DTV | **À valider** — Google Drive API ou Supabase Storage | Voir questions ouvertes |
| Email transactionnel | Resend | Simple, fiable, 3000 emails/mois gratuit |
| Communication DTV | WhatsApp deep link (`wa.me`) | Zéro friction, workflow owner inchangé |
| i18n | Astro i18n natif + Paraglide JS | URLs localisées, SEO hreflang, traductions en fichiers JSON |
| Traduction auto | DeepL API (ou LibreTranslate) | Pour DE/ES/RU — base auto + review humaine possible |
| Styling | Tailwind CSS v4 | Standard, vibe-coding compatible |
| Hosting | Vercel | Déploiement Git automatique, preview par branche |
| Domaine | À confirmer | `wildcatchiang mai.com` ou équivalent |

### Dépendances clés

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/tailwind": "latest",
    "@astrojs/sanity": "latest",
    "@sanity/client": "latest",
    "resend": "latest",
    "@inlang/paraglide-astro": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "tailwindcss": "^4.x"
  }
}
```

---

## 7. SEO — Architecture de contenu

### Pages piliers (Pillar pages)

| URL | Intention | Mot-clé principal |
|-----|-----------|-------------------|
| `/[lang]/dtv-visa` | Commerciale | "DTV visa Chiang Mai" / "digital nomad visa Thailand" |
| `/[lang]/muay-thai-training` | Commerciale | "Muay Thai training camp Chiang Mai" |
| `/[lang]/fighters` | Informationnelle | "Wild Cat Chiang Mai fighters" |

### Pages satellites DTV (Cluster)

| URL | Intention | Mot-clé |
|-----|-----------|---------|
| `/[lang]/dtv-visa/guide` | Informationnelle | "how to get DTV visa Thailand" |
| `/[lang]/dtv-visa/faq` | Informationnelle | "DTV visa Thailand questions" |
| `/[lang]/dtv-visa/quiz` | Engagement | "am I eligible for DTV visa Thailand" |

### SEO technique

- `hreflang` sur toutes les pages pour chaque version de langue
- `sitemap.xml` généré automatiquement par Astro avec toutes les langues
- Schema.org `LocalBusiness` + `SportsClub` sur la home et les pages principales
- Open Graph + Twitter Card sur toutes les pages
- Balises `title` et `meta description` uniques par page ET par langue (gérées via Sanity)
- Images : WebP systématique, `alt` text obligatoire, lazy loading

---

## 8. API & Intégrations

### Endpoints Astro (API routes)

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/dtv/submit` | Soumission dossier DTV (form data + fichiers) | Non |
| POST | `/api/contact` | Formulaire contact général | Non |

### Intégrations externes

| Service | Usage | Credentials |
|---------|-------|-------------|
| Sanity | CMS headless | `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_TOKEN` |
| Resend | Emails transactionnels | `RESEND_API_KEY` |
| **Option A** — Google Drive API | Stockage dossiers DTV | `GOOGLE_SERVICE_ACCOUNT_JSON` |
| **Option B** — Supabase Storage | Stockage dossiers DTV | `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` |
| DeepL API | Traduction auto DE/ES/RU | `DEEPL_API_KEY` |
| WhatsApp | Deep link communication DTV | Numéro owner (config env) |

---

## 9. Sécurité & Auth

### Authentification

Pas d'authentification publique en V1. L'owner accède à Sanity CMS via son compte Sanity standard.

### Données sensibles — Formulaire DTV

Les dossiers DTV contiennent des données personnelles sensibles (passeport, identité). Mesures :

- Upload via HTTPS uniquement
- Fichiers stockés en accès privé (non publics)
- Aucun stockage de données en base de données publique
- Email de confirmation ne contient pas les fichiers, seulement la référence dossier
- Conformité RGPD mentionnée dans la page DTV (mention légale, consentement checkbox)
- Durée de rétention des fichiers à définir avec la owner

### Variables d'environnement

```env
# Sanity CMS
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_TOKEN=

# Email
RESEND_API_KEY=
CONTACT_EMAIL=owner@wildcatchiang mai.com

# WhatsApp
OWNER_WHATSAPP_NUMBER=

# Storage DTV — Option A : Google Drive
GOOGLE_SERVICE_ACCOUNT_JSON=

# Storage DTV — Option B : Supabase
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
SUPABASE_DTV_BUCKET=dtv-documents

# Traduction
DEEPL_API_KEY=

# Site
PUBLIC_SITE_URL=https://wildcatchiang mai.com
```

---

## 10. UI/UX Guidelines

### Style général

Combat / Authentique / Premium — pas un site de salle de sport générique. L'identité graphique est déjà fournie. L'intégration doit respecter :
- Typography forte, contrastée
- Photos et vidéos en avant-plan (le contenu visuel EST le site)
- Dark mode ou tons sombres probables (Muay Thai = nuit, ring, intensité)
- Mobile-first absolu — la majorité du trafic étranger arrive sur mobile

### Responsive

- Mobile-first : oui
- Breakpoints : `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px

### Composants clés

| Composant | Description |
|-----------|-------------|
| FighterCard | Card combattant avec photo plein format, stats overlay |
| DTVStepper | Formulaire multi-étapes avec barre de progression et validation par étape |
| TestimonialSlider | Carousel témoignages avec photo, pays, étoiles |
| TrainingSchedule | Grille horaires hebdomadaires éditable via Sanity |
| HeroVideo | Background vidéo loop sur la home |
| LangSwitcher | Sélecteur de langue persistant dans le header |

---

## 11. i18n — Gestion des langues

### Langues V1

| Code | Langue | Méthode | Priorité |
|------|--------|---------|----------|
| `en` | Anglais | Manuel (prioritaire) | 1 |
| `fr` | Français | Manuel | 2 |
| `th` | Thaï | Manuel ou traducteur natif | 3 |
| `de` | Allemand | DeepL auto + review | 4 |
| `es` | Espagnol | DeepL auto + review | 4 |
| `ru` | Russe | DeepL auto + review | 4 |

### Contrat opérationnel de localisation

- Langue source et langue par défaut : `en`.
- Locales actuellement actives dans la collection éditoriale : `en`, `fr`.
- Locales prévues mais non activées tant que leurs routes, contenus et contrôles ne sont pas validés : `th`, `de`, `es`, `ru`.
- Workflow éditorial : produire ou valider le brief SEO dans chaque locale ; une traduction assistée reste un brouillon jusqu'à review humaine.
- Les contenus équivalents partagent un `translationKey`, mais peuvent avoir des slugs, mots-clés, exemples, liens et CTA différents.
- En l'absence de traduction, ne pas générer silencieusement une page dans la langue par défaut sous l'URL de la locale demandée. Le routeur doit appliquer le fallback produit explicitement retenu (redirection, sélecteur ou absence de route).
- Critères d'acceptation : `lang`, canonical et hreflang cohérents, aucune collision de fichiers, sélecteur de langue correct et build réussi pour chaque locale active.

### Convention d'URL

```
wildcatchiang mai.com/en/dtv-visa
wildcatchiang mai.com/fr/visa-dtv
wildcatchiang mai.com/th/dtv-visa
wildcatchiang mai.com/de/dtv-visum
```

Les slugs peuvent être traduits pour le SEO local (à arbitrer selon effort).

### Fichiers de traduction

Structure Paraglide JS :
```
src/
└── paraglide/
    └── messages/
        ├── en.json
        ├── fr.json
        ├── th.json
        ├── de.json
        ├── es.json
        └── ru.json
```

---

## 12. Déploiement & Environnements

| Env | URL | Déclencheur |
|-----|-----|-------------|
| Local | `localhost:4321` | Dev |
| Preview | `pr-xxx.vercel.app` | Push sur branche feature |
| Production | `wildcatchiang mai.com` | Merge sur `main` |

---

## 13. Questions ouvertes

- [ ] **Storage DTV** — Google Drive API vs Supabase Storage : attendre retour sur le process actuel de la owner pour trancher
- [ ] **Domaine** — confirmer le nom de domaine exact (`wildcatchiang mai.com` ? `wildcatmuaythai.com` ? autre ?)
- [ ] **Slugs traduits** — est-ce qu'on traduit les slugs pour le SEO local (ex: `/fr/visa-dtv` vs `/fr/dtv-visa`) ou on garde les slugs EN dans toutes les langues pour simplifier ?
- [ ] **Contenu TH** — traduction thaï par traducteur natif ou DeepL ? (impact SEO local important)
- [ ] **Tarifs DTV** — est-ce qu'on affiche un prix public sur le site ou on garde la démarche "contactez-nous pour un devis" ?
- [ ] **Tarifs Stay & Train** — idem, prix publics ou sur demande ?
- [ ] **Accommodation** — c'est la owner qui gère le logement directement ou partenariat avec un tiers ?
- [ ] **Photos/vidéos** — format de livraison du contenu existant ? Déjà organisé ou à trier ?
- [ ] **Nom owner** — est-ce qu'on met en avant la owner nommément sur le site (personal branding) ou on reste sur la marque Wild Cat uniquement ?
- [ ] **RGPD / PDPA** — les visiteurs européens et le contexte thaïlandais (PDPA) nécessitent a minima une politique de confidentialité pour le formulaire DTV

---

## 14. Changelog

| Date | Version | Changements |
|------|---------|-------------|
| 2026-06-03 | 1.0 | Création initiale — session PRD avec Jonathan |

# E4 — Sanity CMS

**Complexité : M · Statut : DONE (projet `etmrqgb2` créé, dataset public, studio vérifié — login screen OK en headless)**

## Description
Schémas Sanity + studio embarqué + client de lecture côté Astro pour le contenu géré par l'owner.

## Tâches
- [x] Init Sanity — **studio embarqué `/studio`** via `@sanity/astro` (hash router en SSG, React requis pour le studio uniquement)
- [x] Schémas (`sanity/schemaTypes/`) — **Q3 tranché : `coach` ET `fighter`** :
  - [x] `coach` : name, slug, photo (hotspot+alt), role (localeString), bio (localeText), featured, order
  - [x] `fighter` : name, slug, photo, nationality, status (current/alumni), fights, wins, losses, bio (localeText), featured
  - [x] `blogPost` : title, slug, language (posé par plugin), content (portableText), seoTitle, seoDescription, publishedAt, mainImage, category — **document-level i18n**
  - [x] `trainingSchedule` : day (clé mon..sun), timeSlots[] (start/end/label), level, notes (localeText), order
  - [x] `testimonial` : name, country, service (dtv|training|general), content (localeText), rating, featured
  - [x] `category` : name (localeString), slug
  - [x] Objets `localeString` / `localeText` (field-level i18n {en, fr}, FR en fieldset "Translations")
- [x] Client dans `src/lib/sanity.ts` (`sanity:client` + `loadQuery<T>`) + `image.ts` (`urlFor`) + `i18n-content.ts` (`pickLocale`)
- [x] Requêtes GROQ (`src/lib/queries.ts`, `defineQuery`) — coaches, fighters, testimonials, schedule, blog (consommées en E5)
- [x] TypeGen : `npm run sanity:types` (extract + generate, 100 % local) → `src/lib/sanity.types.ts` committé
- [x] Gestion i18n du contenu : **document-level** (blogPost, plugin `@sanity/document-internationalization`) + **field-level** (le reste) — voir DECISIONS.md
- [x] **Projet sanity.io créé** : `etmrqgb2`, dataset `production` **public** (lecture sans token), CORS `localhost:4321` OK, `.env` rempli
- [x] Studio vérifié en headless : login screen "Wildcat Muay Thai" rendu sans erreur d'hydratation
- [ ] Premier contenu de test dans le studio (1 coach, 1 témoignage, horaires) — au fil de E5

## Reste à faire plus tard
- CORS : ajouter le domaine prod + `https://*.vercel.app` (manage → API → CORS Origins) — avant E10
- (E10) Ajouter `PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET` dans les env vars Vercel + header `X-Robots-Tag: noindex` sur `/studio`

## Décisions techniques
- Studio embarqué `/studio` (un seul deploy) — page statique en hash router, exclu du sitemap, `Disallow: /studio` dans robots.txt. Header `X-Robots-Tag: noindex` à ajouter en E10 (config Vercel).
- Lecture via `sanity:client` de l'intégration, `useCdn: false` (SSG = fraîcheur au build). Token privé seulement si previews/dataset privé.
- Fallback `projectId: 'placeholder'` tant que `.env` n'est pas rempli : le build du site passe, le studio monte sans se connecter.
- Q6 réglée : blogPost document-level → slugs traduits par document.

## Notes / edge cases
- Ne **pas** ajouter de champ `language` manuel sur d'autres types : seul blogPost est géré par le plugin documentInternationalization.
- `localeString`/`localeText` : EN requis, FR optionnel → fallback EN silencieux via `pickLocale` (même politique que Paraglide — vérifier la complétude FR avant publication).
- Config typegen dans `sanity.cli.ts` (clé `typegen`) — le fichier `sanity-typegen.json` séparé est déprécié.
- `sanity/extract.json` est gitignored (artefact régénérable).

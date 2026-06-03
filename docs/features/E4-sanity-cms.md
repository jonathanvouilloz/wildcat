# E4 — Sanity CMS

**Complexité : M · Statut : TODO**

## Description
Schémas Sanity v3 + client de lecture côté Astro pour le contenu géré par l'owner.

## Tâches
- [ ] Init Sanity (studio embarqué `/studio` ou repo séparé — à décider)
- [ ] Schémas (voir PRD §5) — **Q3 tranché : `coach` ET `fighter`** :
  - [ ] `coach` : name, slug, photo, role, bio, featured (équipe Kru)
  - [ ] `fighter` : name, slug, photo, nationality, status (current/alumni), fights, wins, losses, bio, featured (livre d'or)
  - [ ] `blogPost` : title (i18n), slug, lang, content (portableText), seoTitle, seoDescription, publishedAt, category
  - [ ] `trainingSchedule` : day, timeSlots[], level, notes
  - [ ] `testimonial` : name, country, service, content, rating, featured
  - [ ] `category` (référencé par blogPost : DTV / Training / Life)
- [ ] Client `@sanity/client` dans `src/lib/sanity.ts` + types (TypeGen)
- [ ] Requêtes GROQ par page (helpers)
- [ ] Gestion i18n du contenu (champs traduits vs documents par langue)

## Décisions techniques
- Lecture via client read-only (token public dataset). Token privé seulement pour previews/SSR si besoin.
- **Q3 à trancher** : schéma `fighter` (livre d'or PRD) vs `coach` (maquette). La maquette penche Coaches + Community + Fight Team.

## Notes / edge cases
- i18n Sanity : plugin `@sanity/document-internationalization` ou champs `object` par langue — choisir selon Q2.

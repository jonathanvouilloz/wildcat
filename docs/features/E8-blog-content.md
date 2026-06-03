# E8 — Blog & contenu

**Complexité : M · Statut : TODO**

## Description
Moteur de blog SEO alimentant les silos (technique, Chiang Mai living, visa/long-stay).

## Tâches
- [ ] `/blog` index (liste, filtres par catégorie)
- [ ] `/blog/[slug]` (rendu portableText Sanity, TOC, maillage vers pillar)
- [ ] Catégories : technique, chiang-mai, visa
- [ ] Composants article : auteur, date, temps de lecture, partage, articles liés
- [ ] RSS feed (`@astrojs/rss`)
- [ ] Schema `Article` / `BlogPosting` (lié à E7)

## Décisions techniques
- Contenu via Sanity `blogPost` (E4). Rendu portableText avec serializers custom.

## Notes / edge cases
- Chaque article remonte vers son pillar (Train / Stay & Train / DTV).
- i18n des articles selon Q2 (documents par langue ou champs traduits).

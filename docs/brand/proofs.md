---
project: wildcat
status: needs_review
sources: ["src/config/site.ts", "docs/dtv-fact-check.md", "docs/PRD.md", "sanity/schemaTypes"]
validated_on: null
review_due: 2026-08-20
---

# Preuves et droit de parole

| Preuve | Source | Statut | Portée et formulation autorisée |
|---|---|---|---|
| Prix et horaires Wildcat | `src/config/site.ts` | documenté | Reprendre les valeurs actuelles ; ne pas extrapoler. |
| Camp familial open-air à Hang Dong | PRD, site et assets réels | documenté | Décrire le lieu et l'accueil sans prétendre convenir à tout le monde. |
| Meaw gère les dossiers DTV liés aux clients | `docs/identity.md`, corpus publié | needs_review | Employer comme expérience terrain après validation humaine explicite. |
| Règles et montants DTV | `docs/dtv-fact-check.md` | variable par claim | Vérifier le statut et la source de chaque affirmation avant publication. |
| Témoignages, coachs et fighters | Sanity et contenus réels | documenté au cas par cas | N'utiliser que les entrées réellement présentes, sans fabriquer de fallback. |

Toute preuve sensible conserve sa date, sa source et sa limite. Une absence de donnée est omise, jamais complétée de mémoire.

---
project: wildcat
status: needs_review
sources: ["src/pages", "src/content/blog", "docs/structure-blog.md"]
validated_on: null
review_due: 2026-08-20
---

# Carte de contenu

Les URLs sont stockées sans préfixe de locale ; le build ajoute `/en` ou `/fr`.

| URL | Rôle | Cluster | Quand lier |
|---|---|---|---|
| `/dtv-visa` | pillar acquisition | DTV | Vue d'ensemble et exigences générales |
| `/dtv-visa/eligibility` | satellite | DTV | Questions d'éligibilité |
| `/dtv-visa/how-to-apply` | satellite | DTV | Étapes et documents |
| `/dtv-visa/muay-thai` | satellite | DTV | Route soft-power Muay Thai |
| `/dtv-visa/long-stay-training` | satellite / conversion | DTV, séjour | Budget et entraînement longue durée |
| `/classes` | pillar service | entraînement | Horaires, programmes et prix |
| `/classes/beginners` | satellite | débutants | Première séance et progression |
| `/stay-train` | pillar conversion | séjour | Packages et organisation du séjour |
| `/about/coaches` | preuve E-E-A-T | marque | Meaw, équipe et auteur |
| `/contact` | conversion | transverse | CTA chaud ou question WhatsApp |

Les articles existants vivent sous `src/content/blog/{locale}/`. Utiliser `translationKey` pour relier les traductions et vérifier l'existence d'une cible avant de l'imposer dans une spec.

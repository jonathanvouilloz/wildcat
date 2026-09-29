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
| `/dtv-visa` | pillar acquisition (page unique du silo) | DTV | Vue d'ensemble, règles 2026, route soft power (`#soft-power`), documents fournis (`#provided`), comparatif DTV / ED / touriste (`#compare`), FAQ 33 Q + FAQPage (`#faq`) |
| `/dtv-visa/eligibility` | satellite | DTV | Questions d'éligibilité |
| `/dtv-visa/how-to-apply` | satellite | DTV | Étapes et documents |
| `/dtv-visa/long-stay-training` | satellite / conversion | DTV, séjour | Budget et entraînement longue durée |
| `/classes` | pillar service | entraînement | Horaires, programmes et prix |
| `/classes/beginners` | satellite | débutants | Première séance et progression |
| `/stay-train` | pillar conversion | séjour | Packages et organisation du séjour |
| `/about/coaches` | preuve E-E-A-T | marque | Meaw, équipe et auteur |
| `/contact` | conversion | transverse | CTA chaud ou question WhatsApp |

Fusion 2026-09-29 : `/dtv-visa/muay-thai` et `/dtv-visa/faq` n'existent plus (301 vers `/dtv-visa`, voir `docs/DECISIONS.md`). Ne plus les cibler : lier `/dtv-visa#compare` pour la comparaison des visas, `/dtv-visa#faq` pour les questions générales.

Les articles existants vivent sous `src/content/blog/{locale}/`. Utiliser `translationKey` pour relier les traductions et vérifier l'existence d'une cible avant de l'imposer dans une spec.

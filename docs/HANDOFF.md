# HANDOFF — 2026-06-13

## Epic en cours
E8 Blog & contenu → docs/features/E8-blog-content.md

## Etat
- Fait : **topical map cluster beginners** (`docs/topical-map-beginners.md`) — scoring, garde-fous cannibalisation, mini-briefs
- Fait : **M2 beginners = 4 articles EN produits A→Z** via @content-creator (stance 4400/mo, women, gear, home). Covers branded générées, JSON-LD #meaw, maillage sortant + cross-links posés. Build vert.
- Fait : dates réordonnées par valeur (stance en tête, 30 juin → 10 juil), calendrier MAJ, briefs M1 archivés (`.briefs/archive/`)
- Dernier commit : `9e4e923` feat(blog): produce M2 beginners cluster (4 EN articles) + topical map (pushé)

## Prochaine etape (par quoi commencer)
M3 « Benefits & transformation » (calendrier S5-6) : même pipeline via @content-creator. OU produire les FR (women FR demo existe) / burning season M4 (avant décembre).

## Pieges / contexte chaud
- **Backlinks ENTRANTS pas encore posés** (pillar `/classes/beginners` « From the blog » + cross-links depuis pages live) : Jonathan les fera **après publication** de chaque article (à la date). Les liens sortants des articles sont déjà faits.
- **Pas de redeploy auto** (aucun cron Vercel) : les 8 articles M1+M2 sont `draft:false` + `publishDate` future → ne sortent QU'au rebuild passé leur date. Jonathan redéploie manuellement aux dates.
- **Piège prod content** : les workers article-producer mettent des liens `/en/blog/…` (préfixe locale) → 404. Convention projet = SANS préfixe (`/classes/beginners`, `/blog/…`). Vérifier/normaliser à chaque batch.
- 3 démos restent `draft:true` (burning-season EN, saison-des-brulis FR, pour-les-femmes FR).

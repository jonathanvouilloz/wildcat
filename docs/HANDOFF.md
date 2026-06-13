# HANDOFF — 2026-06-13

## Epic en cours
E8 Blog & contenu → docs/features/E8-blog-content.md

## Etat
- Fait : **hub `/chiang-mai-guide`** (EN+FR) — fusionne les 2 entrées menu (Chiang Mai Guide + Things to Do) en 1 page éditoriale (PAS un pilier SEO). Vitrine cluster `chiang-mai-life` + cross-sell. JSON-LD CollectionPage, hreflang symétrique.
- Fait : câblage Nav mega (2→1) + drawer + Footer + helper `getPostsByCategory` (`src/lib/blog.ts`) + 53 clés `cmg_*` EN/FR (parité 1493/1493, retrait `nav_stay_todo_*`).
- Fait : fix UI raccords (sections soft→cream autour des scratch + divider `wave`→`rough`).
- Fait : **3 threads Reddit archivés** `.seo-data/reddit/reddit-chiang-mai-*.txt` (matière angles M4) + pointeurs `structure-blog.md`.
- Dernier commit : (à créer ce wrap)

## Prochaine etape (par quoi commencer)
M3 « Benefits & transformation » via @content-creator, OU burning season **M4.1** (avant décembre, et le hub l'attend), OU produire les FR. Calendrier : `docs/structure-blog.md`.

## Pieges / contexte chaud
- **Recos Meaw manquantes** : section « Nos recos » du hub = placeholder honnête (« demande-nous »). Specifics restos/temples/nature à remplir → `docs/checklist.md` §I7.
- **Hero hub** = placeholder `background-hero.webp` (pas de vrai paysage CM) → `photos-needed.md` #9.
- **Backlinks ENTRANTS articles** toujours pas posés (Jonathan, après publication à la date). Liens sortants OK.
- **Pas de redeploy auto** : les 8 articles M1+M2 `draft:false` + publishDate future sortent au rebuild manuel passé leur date.
- **Piège prod content** : workers article-producer mettent des liens `/en/blog/…` (préfixe locale) → 404. Convention = SANS préfixe. Normaliser à chaque batch.

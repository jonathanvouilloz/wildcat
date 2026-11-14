# Reprise : Wildcat Muay Thai
Mise à jour : 2026-11-14

## Où on en est
E8 blog (`docs/features/E8-blog-content.md`). Session du 14/11 : 2 articles de novembre produits en EN + FR (détail et dates : `docs/editorial-calendar.md` §Q4, « Ajouts du 14/11 » ; décisions : `docs/DECISIONS.md` 2026-11-14).
- Scooter haute saison : **publié** le 14/11 (`publishDate` du jour, `draft: false`).
- Yi Peng / fête des lanternes : **brouillon** (`draft: true`), `publishDate: 2026-11-16`.
- Recherche sourcée : `.seo-data/research-{yi-peng,scooter-high-season,scooter-competitors}-2026-11-14.md`.

## Prochaine action
1. Quand Jonathan dit « go » pour Yi Peng : passer `draft: false` dans `src/content/blog/{en/yi-peng-festival-chiang-mai,fr/fete-des-lanternes-chiang-mai}.md`, commit + push sur `main`.
2. Le jour de sa sortie (16/11, jamais avant : 404), ajouter dans la section Yi Peng de `best-time-train-muay-thai-thailand.md` : « For the full 2026 rules and what to do without a lantern, see [our Yi Peng guide](/blog/yi-peng-festival-chiang-mai). »
3. Dès que la clé GSC est posée : analyse indexation + performances (`/seo-index-diagnose` puis `/seo-gsc`, propriété `sc-domain:wildcatmuaythai.com`), lancées avec le Python de `~/.claude/seo-venv/bin/python` (google-auth + google-api-python-client installés là ; le Python système n'a pas pip).
4. Maillage entrant de l'article scooter : aucun lien posé, seulement le flux auto de `/chiang-mai-guide`. Candidats : `/stay-train/scooter-rental`, `burning-season-chiang-mai`, `best-time-train-muay-thai-thailand`.

## Vérifications
- `npm run build` : Complete, pages `dist/client/{en,fr}/blog/<slug-scooter>/index.html` générées, 6 mentions « GM MotorBike Rental » dans la page EN.
- Em-dashes dans les 4 articles : 0.
- Non vérifié : rendu visuel et covers (pas regardés) ; FR relu seulement par le script `fr-typography`, pas phrase par phrase ; `/seo-review` lancé par le pipeline (lint en mode shadow : 2 erreurs connues, CTA en gras et titre « Sources and References », comme les articles déjà publiés).
- GM MotorBike Rental : adresse, téléphone, horaires et note lus sur sa fiche Google Maps (lien fourni par Jonathan), pas de site officiel.

## État non commité
Rien après le commit `docs:` de fin de session. Branche de travail `jonathanvouilloz/wildcat` (worktree orca), poussée sur `origin/main` ; le `main` local (`~/personal-projects/wildcat`) est à jour.

## Bloquants et actions du propriétaire
- **Clé GSC** (Jonathan) : projet Google Cloud + « Google Search Console API » activée, compte de service `gsc-reader` + clé JSON, e-mail du compte ajouté en utilisateur « Complète » sur la propriété Search Console, puis `scp <clé>.json hermes@<serveur>:~/.claude/secrets/gsc-credentials.json` (dossier déjà créé, chmod 700). Jamais dans le dépôt ni dans le chat.
- **Barber et cie** (hors Wildcat, à reporter sur la carte Barber concernée) : réutiliser le même compte de service `gsc-reader` en l'ajoutant comme utilisateur sur les propriétés Search Console de Barber Concept, Barber Media et Charbon. Pas de nouvelle clé à créer.
- **Go Yi Peng** : en attente de relecture par Jonathan (sortie visée lundi 16/11).
- **Meaw** : conditions scooter (caution, casque, permis), liste 2026 des zones interdites aux lanternes (l'article dit Hang Dong interdit en 2024 et 2025, 2026 non publié).
- Faits non sourcés dans l'article scooter, présentés comme tels : amendes permis 500 à 2 000 THB (blogs), tarif 1 800/2 000 THB (une boutique, 2024), convention du permis international.

## En production
- Site statique Vercel, déploiement au push sur `main` ; rebuild quotidien pour les `publishDate` futurs.
- En ligne au 14/11 : `/en/blog/scooter-rental-chiang-mai-high-season`, `/fr/blog/location-scooter-chiang-mai-haute-saison` (à vérifier après le déploiement).

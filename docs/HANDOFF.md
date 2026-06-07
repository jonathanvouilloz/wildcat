# HANDOFF — 2026-06-07 (fin de journée)

## Epic en cours
Aucun epic dev actif — V1 complète sur `main` (+ loading screen home). Prochains : contenu studio, puis E6 (→ docs/features/E6-dtv-app.md).

## Etat
- Fait cette session : **loading screen home** — `LoadingScreen.astro` (liquide gold + handwriting « Wildcat » + sortie keyhole), branché home EN/FR (1×/session) + page test `/home-test-loading` (replay, `?v=a|b`)
- Outillage squelettes handwriting : `tests/trace-spines.py` + `tests/spines.txt` (toute retouche du lettrage passe par là)
- Purge d'une **session parallèle abandonnée** (page test iframe `[lang]/home-test-loading`, assets `decor/loading-*`) ; `decor/tiger-shape.webp` restauré
- Dernier commit : voir `git log -1` (feat(home): loading screen)

## Prochaine etape (par quoi commencer)
1. Saisir le vrai contenu au studio Sanity (runbook `docs/studio-content.md`) : testimonials DTV + coaches + fighters + schedule + scooters.
2. Puis : checklist Meaw (`docs/checklist.md`), faits DTV (`docs/dtv-fact-check.md`), articles E8 (`docs/structure-blog.md`, burning season avant décembre), E6 DTV app (trancher Q1 storage).

## Pieges / contexte chaud
- **Loader** : timings = constantes `T_TEXT_START/T_TEXT/T_EXIT` dans LoadingScreen.astro ; ancrage keyhole = `mask-position: center 46%` ; en prod il ne rejoue pas (sessionStorage `wc-loader-seen`) — tester via `/home-test-loading`.
- `AGENTS.md` non-tracké à la racine : copie périmée du CLAUDE.md, origine inconnue — demander à Jonathan avant de committer/supprimer (toujours pas tranché).
- Dev server long-running : locale Paraglide gelée EN sur `/fr/*` (HMR) — restart suffit, build prod OK.
- Convention em-dash : valeur de message commençant/finissant par "—" = lockup design, ne pas « corriger ».

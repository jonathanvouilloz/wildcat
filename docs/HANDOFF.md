# HANDOFF — 2026-06-07 (soir)

## Epic en cours
Aucun epic dev actif — V1 pages/blog/motion/copy complets sur `main`. Prochains : contenu studio, puis E6 DTV app (→ docs/features/E6-dtv-app.md).

## Etat
- Fait cette session : **passe humanizer copy EN+FR** (497 em-dashes éliminés dans `messages/{en,fr}.json`, restent 31/locale = lockups design ; patterns IA corrigés au passage ; parité 1441/1441, build OK)
- **`feat/motion-pass` mergée → `main` + push** (motion + copy), sans `/impeccable critique` formelle
- Dernier commit : voir `git log -1` sur main (merge motion-pass)

## Prochaine etape (par quoi commencer)
1. Saisir le vrai contenu au studio Sanity : testimonials DTV transcrits + coaches + fighters (runbook `docs/studio-content.md`), schedule, scooters.
2. Puis : checklist Meaw (`docs/checklist.md`), faits DTV (`docs/dtv-fact-check.md`), articles E8 (`docs/structure-blog.md`, burning season avant décembre), E6 DTV app (trancher Q1 storage).

## Pieges / contexte chaud
- **Convention em-dash** : valeur de message commençant/finissant par "—" = lockup design (titre scindé / Caveat / signature) → ne pas "corriger". Zéro em-dash en prose ; futurs articles couverts par `/seo-write → /humanizer`.
- `AGENTS.md` non-tracké à la racine : copie périmée du CLAUDE.md, origine inconnue — demander à Jonathan avant de committer/supprimer.
- Dev server long-running : locale Paraglide gelée EN sur `/fr/*` (HMR) — restart suffit, build prod OK.
- Pièges motion (transition sur `.in-view` only, wrappers pour transforms seedés) : gravés dans `DECISIONS.md` 2026-06-07 + skill `/motion` v1.1.

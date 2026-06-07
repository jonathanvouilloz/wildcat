# HANDOFF — 2026-06-07 (après-midi)

## Epic en cours
Passe motion (hors-epic, branche `feat/motion-pass` **non mergée**) — détail : CLAUDE.md + PLAN.md entrée 13

## Etat
- Fait cette session : infra motion complète (tokens, `src/scripts/animations.ts`, `src/styles/motion.css`, démo `/styleguide#motion`) ; heroes chorégraphiés au load (home line-rise, PageHero/SplitHero/header blog) ; staggers/reveals sur tous les composants partagés → site entier couvert ; parallax `/fighters` en CSS scroll-driven natif (zéro GSAP)
- Skills mis à jour : `/motion` v1.1 (assets canoniques + règle « Standard ≠ uniforme »), `/init-design`, `/animate` supprimé
- Dernier commit : `0ef0077` feat(motion): mini-passe blog (8 commits motion au total)

## Prochaine etape (par quoi commencer)
1. Jonathan : check fresh-eyes du site animé (règle Emil — à tête reposée). Parallax fighters : besoin de ≥3 fighters au studio pour le juger (1 seul saisi).
2. Puis `/impeccable critique` sur home + stay-train + 1 page DTV, corriger, **merger `feat/motion-pass` → master**.

## Pieges / contexte chaud
- Transition CSS sur `.in-view` UNIQUEMENT — jamais sur l'état caché (fade-out à l'init qui rend les reveals au load invisibles). Tout est dans `DECISIONS.md` 2026-06-07.
- Cards à transform seedé (Coach/Fighter/TestimonialQuote/BlogCard hover) = wrapper d'animation, jamais l'attribut sur la racine.
- Parallax + reveal = 2 wrappers distincts (animation écrase transition sur le même transform).
- `AGENTS.md` non-tracké à la racine : copie périmée du CLAUDE.md, origine inconnue (pas créée par nous) — demander à Jonathan avant de committer/supprimer.
- Dev server long-running : locale Paraglide gelée EN sur `/fr/*` (HMR) — restart suffit, build prod OK.

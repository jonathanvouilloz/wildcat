# HANDOFF — 2026-06-11

## Epic en cours
E8 Blog & contenu → docs/features/E8-blog-content.md

## Etat
- Fait cette session : **4 articles M1 EN produits + commités** (best-muay-thai-camps-thailand, chiang-mai-vs-phuket, chiang-mai-vs-bangkok, muay-thai-training-thailand-cost)
- Fait cette session : **moodboard initialisé** — `moodboard/presets.yaml` + `moodboard/refs/` + `moodboard/fonts/Satoshi-Bold.ttf` + fond branded `blog-cover-bg.webp` 1792×1024
- Fait cette session : **4 covers générées** (template pipeline, Satoshi Bold, centré, blanc) + câblées dans frontmatters
- Fait cette session : **filtre publishDate prod** — `src/lib/blog.ts` `isVisible()` exclut les articles futurs au build. Dev = tout visible.
- Dernier commit : `42d5a16` feat(blog): filter articles by publishDate in prod builds

## Prochaine etape (par quoi commencer)
Batch M2 — semaines 3+4 : articles 2.1 `muay-thai-gear-beginners` (30 juin) · 2.2 `learn-muay-thai-at-home` (3 juil) · 2.3 `muay-thai-stance-basic-moves` (7 juil, ⭐ 4400/mo) · 2.4 `muay-thai-for-women` (10 juil).
Lancer `/seo-keywords` + `/seo-serp` + `/seo-brief` ×4 → checkpoint → production parallèle → `/generate-cover` ×4.

## Pieges / contexte chaud
- Articles M1 tous en `draft: false` avec publishDate future — ils sortiront automatiquement à chaque rebuild prod passé leur date. **Ne pas repasser en draft.**
- `moodboard/presets.yaml` preset `blog-cover` : `source: template`, `font_size_ratio: 0.058`, `align: center` — paramètre `align` ajouté manuellement dans `~/.claude/skills/generate-images/scripts/gemini_client.py` + `text_composer.py` (non versionné dans le projet)
- FR : 1.1 (`meilleurs-camps-muay-thai-thailande`) + 1.4 (`stage-boxe-thai-thailande-prix`) restent à produire — backlog, pas bloquant
- Calendrier : S2 vendredi 19 juin = prochain article 1.2 (déjà prêt, sortira au rebuild)

---
extends: identity
base_style: photoreal-dslr
typography:
  display: "Satoshi Black 900"
  body: "Satoshi Regular 400"
  rules: "Display titles in Satoshi 900; accents (1-4 words) in Fraunces 600 Italic gold; body in Satoshi 400; labels in Satoshi 700 uppercase. No third typeface."
photography:
  rendering: "natural DSLR, warm color grading, golden-hour tones"
  lighting: "natural ambient light, late-afternoon golden hour, soft directional shadows, no flash, no studio lighting"
  lens: "35mm or 50mm equivalent, shallow to medium depth of field"
  skin: "natural warm tones, no heavy retouching, documentary feel"
  composition: "open-air foreground with ring or tropical garden, rule of thirds, candid moments preferred over posed shots"
  mood: "warm, welcoming, family-run — energetic but not aggressive"
  ratios_allowed: ["16:9", "4:3", "1:1", "4:5"]
negatives:
  - "dark moody lighting, dramatic shadows, warrior/fight-club aesthetic"
  - "generic stock photography, corporate headshots, anonymous crowds"
  - "aggressive body language, bloodied imagery, intimidating poses"
references:
  default_portrait: ../../visual/refs/portrait-ambient.webp
  default_scene: ../../visual/refs/scene-wide.webp
  default_blog_cover: ../../visual/refs/blog-cover-style.webp
forbidden_subjects:
  - blood, bruises, overly aggressive fight imagery
  - dark backgrounds, neon lights, underground-gym aesthetic
allowed_subjects:
  - open-air ring with tropical garden, banana trees, shaded recovery area
  - candid training moments (padwork, clinch, shadowboxing)
  - community and family moments (smiling fighters, coaches and students)
---

# Moodboard — Wildcat Muay Thai

> Extension d'`identity.md`. ADN visuel : style photographique, typographie,
> negatives, sujets autorisés/interdits.
> `colors` (palette principale) sont dans `identity.md` (pas ici).
>
> Lu par `/generate-images`, `/generate-cover`, `/open-carrusel`, `/seo-enrich`.
> Les presets et fonts vivent dans `moodboard/` (frères de `docs/`) car consommés
> par scripts Python.

## ADN visuel

Wildcat se photographie comme un jardin tropical en fin de journée — lumière chaude, végétation verte dense, ring en plein air. L'imagerie ne cherche pas le côté brutal ou guerrier : elle montre des gens souriants qui transpirent honnêtement, avec un coach thaï qui leur corrige le coude. Golden hour sur l'herbe, not a cage fight poster.

Le style photographique : DSLR naturel, pas de filtrage excessif. Couleurs chaudes légèrement saturées (l'or et le vert forêt ressortent d'eux-mêmes). Les scènes larges montrent le cadre (ring + bananiers + ciel bleu ou orange) ; les portraits montrent des visages ouverts, jamais intimidants.

## Lieux et environnements types

- Ring open-air entouré d'arbres tropicaux, lumière naturelle filtrée
- Zone jardin ombragée adjacente au ring — lieu de vie, pas juste de combat
- Hang Dong, Chiang Mai : routes tranquilles, verdure, atmosphère locale
- Salle de cours intérieure le soir (si nécessaire) — lumière tamisée chaude, jamais fluorescente

## Références inspirations externes

- Photographe : Documentary sports photography à la Jimmy Chin (aventure/action naturelle) — adapté au registre familial
- Marques : Lululemon (lifestyle sportif chaleureux), Patagonia (aventure authentique sans ego)

## Notes prompt-engineering

Pour Gemini : toujours spécifier "outdoor muay thai gym, tropical garden, golden hour natural light, candid documentary style, warm colors, Chiang Mai Thailand". Éviter "dramatic", "intense", "warrior", "dark". Commencer par "A warm, candid photo of..." plutôt que "An action shot of...". La photographie doit donner envie de s'y installer, pas d'en avoir peur.

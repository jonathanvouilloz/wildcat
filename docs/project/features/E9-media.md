# E9 — Médias & galerie

**Complexité : S · Statut : TODO**

## Description
Galerie photos/vidéos et carousel de témoignages.

## Tâches
- [ ] `/gallery` — grid responsive (6 col → 3 → mobile), lightbox
- [ ] `TestimonialSlider` (photo, pays, étoiles) — données Sanity `testimonial`
- [ ] `/reviews` — page dédiée témoignages
- [ ] Section communauté home (grid Instagram-like)
- [ ] Optimisation images (WebP, responsive `srcset`, lazy)
- [ ] Support vidéo (hero loop optionnel, embeds)

## Décisions techniques
- Images via `<Image>` Astro + assets Sanity. Pas de lib lourde de gallery si pas nécessaire.

## Notes / edge cases
- Format de livraison des photos/vidéos existantes = question ouverte (organisation à clarifier avec l'owner).
- Hero video : la maquette utilise une image ; vidéo loop = nice-to-have.

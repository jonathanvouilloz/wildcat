# E5 — Pages cœur & silos SEO

**Complexité : L · Statut : TODO**

## Description
Construire les pages principales selon l'architecture en silos SEO de la maquette (`WildCat Mega Menu.html`).

## Architecture (slugs de référence — maquette)
```
/ (home)
├── Train     → /classes (pillar), /classes/{beginners,all-levels,private,women,kids-family},
│                /fight-team, /schedule, /pricing
├── Stay&Train→ /stay-train (pillar), /stay-train/long-stay, /accommodation,
│                /scooter-rental, /location, /chiang-mai-guide
├── DTV Visa  → /dtv-visa (pillar), /dtv-visa/{eligibility,how-to-apply,muay-thai,
│                long-stay-training,faq}, /dtv-visa/apply (mini-app → E6)
├── About     → /about, /coaches, /community, /gallery, /reviews
└── Resources → /blog (+ /blog/[slug]), /contact
```

## Tâches (par priorité lancement)
- [ ] **Home** — hero, value strip, DTV pillar teaser, programs, schedule+stay, coaches, community, pricing, FAQ, CTA banner (sections de `WildCat Landing.html`)
- [ ] **DTV Visa pillar** `/dtv-visa` — page commerciale + steps + sceau + CTA vers apply
- [ ] **Stay & Train** `/stay-train`
- [ ] **Classes** `/classes` + sous-pages
- [ ] **About** `/about` + coaches/community/reviews
- [ ] **Contact** `/contact` (form contact → `/api/contact`)
- [ ] Satellites DTV (eligibility, how-to-apply, faq, quiz éligibilité)
- [ ] Maillage interne : chaque page cluster pointe vers son pillar + cross-silo

## Décisions techniques
- Architecture silos = la maquette (plus riche que le PRD). Réconcilier avec le PRD §3.
- Pricing public selon Q4.

## Notes / edge cases
- Réconcilier slugs PRD (`/muay-thai-training`) vs maquette (`/classes`, `/stay-train`). La maquette est l'artefact le plus récent → on la suit sauf avis contraire.

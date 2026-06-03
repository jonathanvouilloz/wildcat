# E5 — Pages cœur & silos SEO

**Complexité : L · Statut : DONE (pages prioritaires) — satellites TODO**

## Description
Construire les pages principales selon l'architecture en silos SEO de la maquette (`Wildcat Mega Menu.html`).

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
- [x] **Home** — hero, value strip, DTV pillar teaser, programs, schedule+stay, coaches, community, pricing, FAQ, CTA banner (port fidèle de `Wildcat Landing.html` sur le thème verrouillé — zéro import de `landing.css`)
- [x] **DTV Visa pillar** `/dtv-visa` — PageHero dark + sceau, intro, 3 steps, inclus, éligibilité (#eligibility), FAQ (#faq, JSON-LD FAQPage), CTA → /contact (E6 prendra le relais)
- [x] **Stay & Train** `/stay-train` — atouts, pricing séjour (#pricing), cross-sell DTV (bande dark)
- [x] **Classes** `/classes` — 6 programmes, planning hebdo (#schedule), **prix publics complets** (#pricing), FAQ
- [x] **Fighters** `/fighters` — FighterCard (photo + stats overlay), CMS-only (coming soon si vide)
- [x] **About** `/about` — story (woman-run/famille), coachs (#coaches), communauté, avis
- [x] **Contact** `/contact` (form contact → `/api/contact`, serverless fetch→Resend, honeypot, ?sent=1|error)
- [x] Maillage interne : Nav/Footer re-pointés — clusters → pillar+anchor (zéro 404) ; cross-silo stay↔dtv ; Blog `#` jusqu'à E8
- [ ] **Satellites DTV** (eligibility, how-to-apply, muay-thai, faq dédiée, quiz éligibilité) — passes suivantes
- [ ] Sous-pages Classes (`/classes/beginners`…), Stay (`/accommodation`, `/scooter-rental`…), About (`/gallery` → E9, `/reviews`)

## Décisions techniques (détail : docs/DECISIONS.md, entrée 2026-06-04)
- Slugs EN dans toutes les locales (`/fr/dtv-visa`) ; `localePath()` (`src/lib/routes.ts`) pour tous les liens internes.
- `safeQuery()` (`src/lib/content.ts`) + fallbacks messages : build vert dataset vide. Pas de fausse review / faux palmarès en fallback.
- Seed contenu : via le Studio (pas de script d'import).
- Contact : API route `prerender=false`, fetch REST Resend (zéro dépendance), gardé par `RESEND_API_KEY`.
- Pricing : 3 cards marketing (home/stay) + liste publique complète (/classes#pricing) — source unique `site.ts`, labels `pricing_label_*`.
- Pas de slider témoignages (zéro island hors Nav).

## Notes / edge cases
- PRD `/muay-thai-training` vs maquette `/stay-train` : maquette retenue → **redirect à poser en E7/E10**.
- Assets : seul `gym-garden.jpg` existe → placeholders soft-2 (programs/coaches/gallery/fighters) jusqu'à E9.
- Bannières contact togglées par script inline (page statique : pas de query params au build).
- Anchors cibles du Nav : `/classes#programs|#schedule|#pricing`, `/dtv-visa#eligibility|#faq`, `/about#coaches`, `/stay-train#pricing`.

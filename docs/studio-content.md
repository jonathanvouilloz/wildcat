# Saisie studio — batch photos & reviews 2026-06-06

> Runbook de saisie pour `/studio`. Source : `PNG/image-a-traiter/` (les captures
> reviews sont **gitignorées** — elles contiennent passeports/e-visas, on ne
> publie QUE les transcriptions anonymisées ci-dessous).

## 1. Témoignages DTV (collection **Testimonial**)

Décision 2026-06-06 : **CMS, pas de dur** — le schéma a déjà `service: dtv`.
`featured` ✓ obligatoire pour apparaître. **Où elles s'affichent (étendu
2026-06-06 soir)** :

| service saisi | Pages |
|---|---|
| `dtv` | home (quote manuscrite dans le teaser DTV) · `/dtv-visa` (1 + grille 3) · `/dtv-visa/muay-thai` (1) · `/dtv-visa/how-to-apply` (grille 2, avant le CTA) · `/dtv-visa/eligibility` (1, avant le CTA) · `/about#reviews` (mix) |
| `training` | `/stay-train` (1) · `/dtv-visa/long-stay-training` (1) · `/about#reviews` · home #coaches |
| `general` | `/about#reviews` · home #coaches (1re non-DTV) | **Name** : prénom réel ou initiale (tu connais les clients —
pas de noms inventés). Rating : 5 si tu veux les étoiles, vide sinon
(⚠️ vide s'affiche 5★ quand même aujourd'hui — dis-moi si tu préfères
masquer les étoiles pour les transcriptions WhatsApp).

| # | Source | Country (suggestion) | Content EN (transcrit, nettoyé) | Content FR (traduction) |
|---|--------|----------------------|--------------------------------|-------------------------|
| 1 | review-dtv | Vietnam (applied from Hanoi) | Got my visa late last night — khap khun mak khap. So happy, leaving Hanoi in a few hours. Thank you so much for helping, much appreciated. | Visa reçu hier soir — khap khun mak khap. Trop content, je quitte Hanoï dans quelques heures. Merci infiniment pour l'aide, très apprécié. |
| 2 | review-dtv2 | — | Hooray! The visa arrived in the mail. Now all that's left is to get a visa for my wife. | Hourra ! Le visa est arrivé par la poste. Il ne reste plus qu'à obtenir celui de ma femme. |
| 3 | review-dtv3 | France (Paris) | Thai visa approved!!! 🙏🥊 | Visa thaï approuvé !!! 🙏🥊 |
| 4 | review4 | — | DTV is approved — woohoo! Thank you for checking in on me!! | DTV approuvé — woohoo ! Merci d'avoir pris des nouvelles !! |
| 5 | review5 | — | Wanted to say that we just got the visa. See you in a little over a month — thank you for all the support. | On voulait te dire qu'on vient de recevoir le visa. À dans un peu plus d'un mois — merci pour tout le soutien. |
| 6 | review6 | — | I uploaded my March statement to the application this morning — and they just sent me an email saying I'm approved. Amazing! Thank you so much again for all the help! | J'ai téléversé mon relevé de mars ce matin — et ils viennent de m'envoyer un email d'approbation. Génial ! Encore merci pour toute l'aide ! |
| 7 | revie7 | — (couple) | We got the visa yesterday — thank you! Submitted March 21, approved over the weekend. | On a reçu le visa hier — merci ! Déposé le 21 mars, approuvé dans le week-end. |
| 8 | review10 | Indonesia (applied in Jakarta) | Hey there — I got approved today! 😁 | Hello — j'ai été approuvé aujourd'hui ! 😁 |

Non transcrits (pas de quote exploitable, mais comptent dans le track record) :
`reviw8` (cliente CN via Phnom Penh — e-visa complet à l'écran), `revie9`
(renouvellement 5 ans, JKT — « even better than when I left 😂 » possible en
quote training), `review11` (approval e-visa). → **11 approvals documentées**,
de quoi nourrir aussi un futur compteur « X DTV approved » si tu veux.

## 2. Coachs (collection **Coach**) — photos à uploader

| Fiche | Photo source (haute rés. dans `PNG/image-a-traiter/`) | Note |
|-------|--------------------------------------------------------|------|
| Meaw Boonpradub | `meaw.jpg` (déjà en ligne : `meaw-portrait.webp` sur la fiche /about/coaches) | Rôle/bio à saisir ; la photo studio sert aussi à l'AuthorBio du blog |
| Peter (?) | `peter2.jpg` (carré, le mieux cadré ; alternatives `peter.jpg`, `coach-peter-3.jpg`) | Confirmer nom/rôle exacts |
| Arun (?) | `arun-og.jpg` (portrait vertical ; variante carrée `fight.jpg`) | Confirmer nom/rôle — coach ou pad-man ? |

## 3. Fighters guest book (collection **Fighter**) — infos manquantes

| Photo | Ce qu'il me faut |
|-------|------------------|
| `fighter1.jpg` (victoire bras levé, tatouages) | Nom/fight name, pays (ISO-2), année, venue(s), nb de combats, achievements, petite quote |
| `fighter2.jpg` (short Wildcat, victoire ring) | Idem — ⚠️ déjà utilisée comme photo de la card « Fight Team » sur /classes ; si tu la veux aussi au guest book, fournis une autre photo pour éviter le doublon |

## 4. Photos placées sur le site (fait, 2026-06-06)

| Asset | Source | Emplacement |
|-------|--------|-------------|
| `prog-beginners.webp` | meaw+guest.jpg | Card Beginner `/classes` |
| `prog-all-levels.webp` | all-classes.jpg | Card All-Levels `/classes` |
| `prog-private.webp` | coach+guest.jpg | Card Private Sessions `/classes` |
| `prog-women.webp` | woman-classes.jpg | Card Women's `/classes` |
| `prog-kids.webp` | kids-and-coach.jpg | Card Kids & Family `/classes` |
| `prog-fight-team.webp` | fighter2.jpg | Card Fight Team `/classes` |
| `camp-life.webp` | life-camp.jpg | `/stay-train#life` |
| `meaw-portrait.webp` | meaw.jpg | Fiche Meaw `/about/coaches` + Person JSON-LD |

Pipeline rejouable : `tests/process-batch-photos.py`. Non utilisés :
`meaw-3.jpg` (doublon de `meaw-training.webp` déjà en ligne),
`stay-train.jpg` (collage promo basse rés. avec texte — ⚠️ il révèle
**Fighter Program 28 000 THB avec scooter** → à confirmer pour la checklist §B ;
fournir les photos condo **originales** du collage pour `#accommodation`).

## Reste à fournir (photos-needed.md)

- **Condos originaux** (les 5 photos du collage stay-train.jpg en pleine rés.) → `#accommodation`
- **Scooters** (Scoopy + Click devant le camp) → fleet cards
- Cover OG signature (optionnel)

# Checklist — Tout ce qu'il faut obtenir de Meaw (et de la réalité du camp)

> Objectif : une seule session avec Meaw suffit pour tout débloquer. Chaque item indique **où** l'info est utilisée sur le site — le contenu doit rester cohérent avec la réalité.
>
> Légende : ❌ manquant · ⏳ estimé / écrit prudemment, à confirmer · ✅ confirmé (pour mémoire)
>
> _Dernière mise à jour : 2026-06-05._

---

## A. Faits DTV / visa (YMYL — prioritaire)

| # | Question / chose à obtenir | Statut | Utilisé où |
|---|---|:---:|---|
| A1 | **PDF checklist officielle MFA** : ouvrir le document et valider la liste exacte des documents + l'âge requis (20 ans). Seul point non clos du fact-check (`docs/dtv-fact-check.md`) | ⏳ | `/dtv-visa/how-to-apply` (liste documents + HowTo JSON-LD) |
| A2 | **Lettre du camp (« camp letter »)** : Meaw la fournit-elle vraiment ? Sous quelle forme (papier à en-tête, contenu type, délai) ? Que doit-elle mentionner (durée, programme, prix payé) ? | ⏳ | `/dtv-visa/how-to-apply` — on affirme que le camp fournit la lettre |
| A3 | **Retours d'expérience guests DTV** : quelles ambassades ont-ils utilisées ? Délais constatés ? Refus connus et pourquoi ? | ❌ | Crédibilité E-E-A-T des 5 pages DTV + futurs testimonials `service=dtv` |
| A4 | **Preuve de fonds** : Meaw a-t-elle vu des guests passer avec un compte joint / sponsor ? (copy actuelle prudente, à enrichir avec du vécu) | ❌ | `/dtv-visa/eligibility` |
| A5 | Veille (pas une question Meaw) : assurance santé ~50k USD (discrétion ambassade) + règle « 6 mois de pratique » — re-vérifier avant prod et 1×/an | ⏳ | `/dtv-visa/faq`, `/dtv-visa/eligibility` |

## B. Packages Stay & Train (`/stay-train#packages`)

| # | Question | Statut | Utilisé où |
|---|---|:---:|---|
| B1 | **« What's included » exact par tier** week / month / fighter — confirmé seulement : sessions illimitées + gants/bandes prêtés. Quoi d'autre ? (serviette ? eau ? casier ? shorts ?) | ⏳ | Table #packages `/stay-train`, `PricingCard` `/classes#pricing` |
| B2 | **Programme Fighter (7 000 THB)** : scope exact — 2 sessions/jour ? sparring ? clinch ? préparation et organisation de combat incluses ? | ⏳ | `/classes#pricing`, `/stay-train#packages`, guest book `/fighters` |
| B3 | **Comment on réserve concrètement** : WhatsApp only ? acompte demandé ? politique d'annulation ? paiement (cash / transfert / carte ?) | ❌ | `/stay-train` (CTA), `/contact`, FAQ |
| B4 | **Pickup aéroport / aide à l'arrivée** : proposé ou non ? gratuit / payant ? | ❌ | `/stay-train#packages` (« A scooter to get around — we sort that on arrival ») |
| B5 | Prix valables toute l'année ? promo basse saison ? | ❌ | `/classes#pricing`, `site.ts` pricing |

## C. Hébergement — condos de Meaw (`/stay-train#accommodation`)

| # | Question | Statut | Utilisé où |
|---|---|:---:|---|
| C1 | **Nombre** de condos / chambres disponibles | ❌ | `/stay-train#accommodation` |
| C2 | **Prix** semaine / mois (THB) | ❌ | `/stay-train#accommodation`, BudgetEstimator (ranges housing actuellement génériques) |
| C3 | **Ce qui est inclus** : clim ? wifi ? linge ? ménage ? cuisine ? | ❌ | `/stay-train#accommodation` |
| C4 | **Distance exacte du camp** (km / minutes en scooter ou à pied) | ❌ | `/stay-train#accommodation` (copy actuelle : « nearby », volontairement vague) |
| C5 | Durée minimum de séjour ? comment réserver (avec le package ou séparément) ? | ❌ | `/stay-train#accommodation` + FAQ |
| C6 | **Photos condo/chambre** (intérieur + extérieur) | ❌ | Section #accommodation livrée en texte seul |

## D. Scooters (alimente `/stay-train/scooter-rental`)

| # | Question | Statut | Utilisé où |
|---|---|:---:|---|
| D1 | **Nombre total de scooters** à disposition (« X scooters » — chiffre exact) | ❌ | Page scooter + collection Sanity (1 doc par scooter) |
| D2 | **Honda Scoopy i Prestige** : 2024, grey, 110cc, 350 THB/jour, 3 000 THB/mois — re-valider avec Meaw | ⏳ | Page scooter (fleet) |
| D3 | **Honda Click** : année, couleur, cylindrée, **prix jour/mois** | ❌ | Page scooter (fleet) |
| D4 | **Prix à la semaine ?** (gap entre 350/jour et 3 000/mois) | ❌ | Page scooter + FAQ |
| D5 | **Caution** : montant ? passeport en dépôt ? (pratique courante à CM — ne rien affirmer sans confirmation) | ❌ | Page scooter (conditions + FAQ) |
| D6 | **Casque(s)** : inclus ? combien (1 ou 2) ? | ❌ | Page scooter (conditions + FAQ) |
| D7 | **Permis** : permis international exigé ? contrôles fréquents dans le coin ? | ❌ | Page scooter (FAQ — réponse actuelle prudente) |
| D8 | **Assurance** : scooter assuré ? que se passe-t-il en cas de casse / vol / accident ? | ❌ | Page scooter (conditions) |
| D9 | **Essence** : à la charge du guest (rendu plein ou tel quel ?) | ❌ | Page scooter (FAQ) |
| D10 | **Location ouverte aux non-guests** du camp, ou réservée aux guests ? | ❌ | Page scooter (FAQ + angle SEO local) |
| D11 | **Photos** : 1 photo propre par scooter (idéalement devant le camp) | ❌ | Cards fleet (fallback sans photo en attendant) |

## E. Cours & planning

| # | Question | Statut | Utilisé où |
|---|---|:---:|---|
| E1 | **Âge minimum kids** : ~6 ans estimé, à valider (référence interne, non publié sur le site) | ⏳ | FAQ `/classes` (« message us with your kids' ages ») |
| E2 | **Capacité max par cours de groupe** (utile pour la copy « small group » / FAQ) | ❌ | `/classes`, `/classes/beginners` |
| E3 | **Niveau requis pour sparring / clinch** : ouvert à tous ? à partir de quand ? | ❌ | `/classes/beginners` (walkthrough), FAQ |
| E4 | Le **planning du flyer** (✅ committé dans `site.schedule`) reste-t-il valable toute l'année ? (haute/basse saison, jours fériés) | ⏳ | `/classes#schedule`, ScheduleTable, footer |
| E5 | **Cours privés** : faut-il réserver combien de temps à l'avance ? avec quel kru ? | ❌ | `/classes` (slots privés « flexible ») |

## F. Coordonnées & admin

| # | Item | Statut | Utilisé où |
|---|---|:---:|---|
| F1 | **Email réel** — `hello@wildcatmuaythai.com` est un placeholder `TODO(real data)` ; à confirmer une fois le domaine acheté (ou autre adresse existante de Meaw ?) | ❌ | `src/config/site.ts`, footer, `/contact`, `/api/contact` |
| F2 | **Profil Google Business** : existe-t-il déjà ? Si oui → **lien direct avis** (`site.reviews.googleUrl` placeholder). Si non → **à créer, levier SEO local n°1** (+ y déclarer le service « Scooter rental ») | ❌ | `/about#reviews` (CTA avis Google), SEO local |
| F3 | Comptes **Instagram/Facebook** : confirmés actifs et suivis par Meaw ? (liens déjà dans `site.ts`) | ⏳ | Footer, `/about#community`, feed Instagram |
| F4 | **WhatsApp +66 85 720 9620** : bien le bon numéro pour les résas (cours, séjour, scooter, DTV) ? Qui répond, en quelle langue ? | ⏳ | Tous les CTA `wa.me` du site |

## G. Contenu studio Sanity (à saisir avec les infos de Meaw)

| # | Item | Statut | Utilisé où |
|---|---|:---:|---|
| G1 | **Coaches / krus** : noms, surnoms, photos, mini-bio (parcours, années de ring) | ❌ | `/about/coaches` (CoachGrid), teaser `/about#coaches` |
| G2 | **Testimonials** : 3–5 vrais avis guests, dont ≥1 `service=training` (affiché sur `/stay-train`) et ≥1 `service=dtv` | ❌ | `/stay-train`, `/about#reviews`, pages DTV |
| G3 | **Fighters guest book** : photos + faits (année, nb de combats, venues, achievements, quote) des guests passés et futurs | ⏳ (1 saisi) | `/fighters` (compteur affiché dès 3 membres) |
| G4 | **Schedule** : seulement si divergence avec le flyer committé | ✅ | `/classes#schedule` |

## H. Photos (Jonathan, avec accès au camp)

| # | Item | Statut | Utilisé où |
|---|---|:---:|---|
| H1 | **Portrait Meaw** (`hero-team.webp` en attendant) | ❌ | Hero `/about/coaches` + bloc auteur E-E-A-T |
| H2 | **Condo / chambre** (intérieur + extérieur) | ❌ | `/stay-train#accommodation` |
| H3 | **Vie au camp entre les sessions** (repas, pool, hamac, soirée) | ❌ | `/stay-train#life` |
| H4 | **Scooters** (1 par modèle, devant le camp) | ❌ | `/stay-train/scooter-rental` |
| H5 | Upgrade éventuel **hero home** (meilleure qualité — décision 2026-06-05 : direction conservée, seule l'image peut être upgradée) | ⏳ | Home |

## I. Divers cohérence-réalité

| # | Question | Statut | Utilisé où |
|---|---|:---:|---|
| I1 | **Langues parlées au camp** : équipe anglophone confirmée — quel niveau ? certains krus thaï only ? (claim « accueil en français » **interdit**) | ⏳ | Copy FR `/stay-train`, FAQ |
| I2 | **Wifi au camp ?** Affirmé nulle part actuellement — à confirmer **avant** d'en parler (cible DTV remote workers) | ❌ | Potentiel `/stay-train#life`, `/dtv-visa/long-stay-training` |
| I3 | **Nourriture** : le camp propose-t-il des repas ? options à proximité (marché, restos Nong Kwai) ? (copy actuelle : le guest s'organise) | ⏳ | `/stay-train#life`, BudgetEstimator (range food) |
| I4 | **Fermetures exceptionnelles** : jours fériés thaïs, Songkran, événements ? | ❌ | `/classes#schedule`, FAQ |
| I5 | **BudgetEstimator** : les fourchettes codées en dur (scooter 3 000–3 500, food, housing) collent-elles à ce que vivent les guests de Meaw ? | ⏳ | `/dtv-visa/long-stay-training` |
| I6 | **Venues de combat** (guest book) : les 4 venues du schéma fighter sont-elles les bonnes / les seules où le camp emmène ses guests ? | ⏳ | `/fighters`, schéma Sanity `fighter` |

---

## Récap express — le top 10 à poser en premier

1. PDF MFA : valider la liste de documents DTV (A1)
2. Lettre du camp DTV : forme + contenu (A2)
3. « What's included » exact des packages week/month/fighter (B1, B2)
4. Condos : nombre, prix, distance, inclus (C1–C4)
5. Scooters : nombre total + prix du Click + conditions (caution, casque, permis, essence) (D1, D3, D5–D9)
6. Âge minimum kids (E1)
7. Email réel + profil Google Business (F1, F2)
8. Coaches : noms, photos, bios (G1)
9. 3–5 vrais testimonials (G2)
10. Photos : Meaw, condo, vie au camp, scooters (H1–H4)

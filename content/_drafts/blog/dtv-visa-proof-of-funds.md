# Brief SEO : DTV Visa Proof of Funds: Bank vs Stocks vs Crypto

## Metadata
- Slug: `dtv-visa-proof-of-funds`
- Slug rationale: deep-dive "quels actifs comptent", distinct de "suis-je éligible" (qui reste sur `/dtv-visa/eligibility`)
- Page type: article (spoke blog — cluster `docs/topical-map-dtv-costs.md`, module A/YMYL)
- Module: A (guide par type d'actif, registre YMYL renforcé — contradiction concurrentielle détectée, cf. scan SERP) — PAS un guide d'éligibilité générale
- Target word count: 1200–1600 mots
- Primary keyword: `dtv visa proof of funds` (+ "dtv visa thailand bank account" 10/mo confirmé, "dtv 500k proof")
- Category: `visa`
- translationKey: `dtv-visa-proof-of-funds`
- Author: Meaw Boonpradub
- Date brief: 2026-07-03
- **i18n : EN-ONLY.**
- Persona: Digital nomad / expat DTV, 25-45 ans — a des actifs répartis entre plusieurs comptes/investissements et ne sait pas lesquels comptent réellement pour les 500 000 THB
- Tonalité: warm · genuine · encouraging · down-to-earth
- Registre: EN direct ("you")
- Contexte chargé depuis: `docs/identity.md` ✓ · `docs/voice.md` ✓ · `docs/seo-context.md` ✓

---

## Confirmation contexte auto-chargé

- **Persona principal** : Digital nomad / expat DTV — veut savoir précisément si ses actions/crypto/comptes multiples comptent pour la preuve de fonds, avant de découvrir un refus après coup
- **Tonalité / Registre** : warm · genuine · encouraging · down-to-earth
- **CTA chaud** : `/contact?intent=dtv` — "Start your DTV application"
- **CTA tiède** : `/contact` — "Ask us anything — we reply on WhatsApp"
- **JSON data chargés** : `.seo-data/keywords-dtv-bank-account.json` (10/mo confirmé) ; `.seo-data/keywords-dtv-financial-proof.json` (0/mo) ; `.seo-data/keywords-dtv-proof-baht.json` (0/mo) ; **`.seo-data/serp-dtv-visa-proof-of-funds.json`** (scan SERP réel effectué le 2026-07-03, WebFetch sur 3/5 résultats) → **Mode B** (angle dérivé du scan SERP réel, qui a révélé une contradiction factuelle entre concurrents — voir ci-dessous).

---

## ⚠️ Scan SERP réel — contradiction YMYL détectée (lire avant rédaction)

Voir `.seo-data/serp-dtv-visa-proof-of-funds.json` pour le détail complet. **Constat critique** :
- **muaythaivisathailand.com** (rank 1, école Muay Thai concurrente, auteur nommé + date) : stocks/ETFs **❌ rejetés**, crypto **❌ rejetée explicitement** ("Not Bitcoin. Not stablecoins. Not screenshots from exchanges.").
- **dtvvisathailand.com** (rank 3) : "Not accepted: business accounts, stock accounts, securities accounts, cryptocurrency accounts" — même position, **rejeté**.
- **dtvvisathai.com** (rank 2) : affirme au contraire que "stock portfolios, mutual funds, bonds, ETFs" sont **ACCEPTÉS** — contredit les deux autres, byline générique non identifiable, **zéro source officielle liée**.
- **Consensus majoritaire + prudence YMYL** : traiter stocks/actions/crypto comme **NON acceptés** (position de 2 sources sur 3, dont la mieux sourcée/E-E-A-T). **Ne jamais présenter dtvvisathai.com comme fiable sur ce point précis** — c'est la source la moins crédible du lot (byline générique, zéro source officielle) et sa position est isolée.
- **Gap confirmé** : aucune des 3 pages ne traite les **comptes multiples combinés** (confirmé acceptés par consensus communautaire type forums, mais absent des pages éditoriales) — c'est l'angle différenciant principal de cet article.
- **Obligation** : ce point (stocks/crypto/comptes multiples) **DOIT** passer par `/seo-sources` avant publication pour vérifier/sourcer explicitement chaque affirmation. Ne jamais trancher une contradiction YMYL sur la seule base d'un consensus 2/3 sans citer une source officielle si elle existe (MFA, Bank of Thailand, ambassade).

---

## Cannibalisation — garde-fous (obligatoire, cf. `docs/topical-map-dtv-costs.md`)

| Page/article existant(e) | Risque | Différenciateur imposé |
|---|---|---|
| `/dtv-visa/eligibility` (quiz + 500k, vue d'ensemble) | ⚠️ **Risque réel** | eligibility = "qualifies-tu ?" (vue d'ensemble, quiz). Cet article = "quels ACTIFS précis comptent" (deep-dive bank/stocks/crypto/comptes multiples). `/dtv-visa/eligibility` doit linker DESCENDANT vers cet article (à vérifier/poser si pas déjà fait), cet article REMONTE vers eligibility. Primary kw disjoints (eligibility possède "requirements/eligibility", cet article possède "proof of funds/bank account"). |
| A1 `dtv-visa-cost-breakdown` (publié) | ✅ OK | A1 mentionne les 500k THB en passant, ne détaille pas les types d'actifs. |

**Règle imposée** : ne pas ré-expliquer les critères généraux d'éligibilité (âge, activité soft power). Rester focalisé sur la question financière précise.

---

## Snippet recommandé (variante A — Expertise/YMYL, recommandée)

- **Title**: `DTV Visa Proof of Funds: Bank vs Stocks vs Crypto` (48 car.)
- **H1**: `Which assets actually count as proof of funds for the DTV visa?` (65 car.)
- **Meta description**: `500,000 THB in a personal bank account is safest. Here's what happens with stocks, crypto, and multiple accounts.` (114 car.)

## Snippet variante B — Solution/Rassurance

- **Title**: `DTV 500k Proof: What Counts, What Doesn't` (42 car.)
- **H1**: `Stocks, crypto, or multiple accounts: what really counts toward your DTV 500k` (77 car.)
- **Meta description**: `A clear breakdown of what qualifies as proof of funds for the DTV visa, and what commonly gets rejected.` (105 car.)

## Snippet variante C — Local / géo

- **Title**: `DTV Visa Financial Proof: A Clear Breakdown` (44 car.)
- **H1**: `What actually counts as proof of funds for a Thailand DTV visa` (63 car.)
- **Meta description**: `Bank account, stocks, crypto, or several accounts combined: here's a clear, sourced breakdown of what qualifies.` (110 car.)

**Recommandation** : Variante A — capte le comparatif exact du keyword principal, chiffré et rassurant.

---

## Keyword Cluster

| Rôle | Keyword (query brut) | Volume | Placement | Formulation naturelle (prose) |
|---|---|---|---|---|
| **Principal** | dtv visa proof of funds | 0 (GEO, non vérifié individuellement) | Title, H1, intro, meta | proof of funds for the DTV visa |
| Secondaire | dtv visa thailand bank account | 10/mo (confirmé, `keywords-dtv-bank-account.json`) | H2 compte bancaire, body | your DTV visa bank account |
| Secondaire | dtv 500k proof | 0 (GEO, non vérifié individuellement) | Intro, H2 récap | proof of the 500,000 THB requirement |
| Secondaire | dtv visa financial proof | 0 (GEO, `keywords-dtv-financial-proof.json`) | Intro | DTV visa financial proof |
| Secondaire | dtv visa stocks accepted | 0 (GEO, non vérifié individuellement) | H2 stocks, body | whether stocks count toward the DTV requirement |
| Secondaire | dtv visa crypto | 0 (GEO, non vérifié individuellement) | H2 crypto, body | whether crypto counts as proof of funds |
| Long-tail | dtv visa multiple bank accounts | 0 (GEO, non vérifié individuellement, mais PAA confirmé par le scan SERP) | H2 comptes multiples | combining multiple bank accounts for the DTV |
| Long-tail | dtv visa 500000 baht proof | 0 (GEO, `keywords-dtv-proof-baht.json`) | Body | proving the 500,000 THB in your account |
| Long-tail | dtv visa borrowed funds | 0 (GEO, non vérifié individuellement) | H2 fonds empruntés | using borrowed or recently transferred funds |

**Rappel writer** : seul "dtv visa thailand bank account" (10/mo) est confirmé par fichier DataForSEO. Les autres volumes "0 (GEO)" sont des estimations dérivées de la stratégie cluster (`topical-map-dtv-costs.md` §0), **non vérifiées individuellement par DataForSEO exact-match** — ne pas présenter comme des données confirmées dans les zones techniques si un audit strict est fait. Le PAA du scan SERP confirme une forte demande réelle sur "multiple bank accounts" malgré l'absence de volume DataForSEO mesurable.

---

## Structure H2/H3 (Module A — guide par type d'actif, registre YMYL renforcé)

### Intro (pas de H2 — prose directe)
Keywords: `dtv visa proof of funds`, `dtv 500k proof`
Contenu : Répondre vite : un compte bancaire personnel avec 500 000 THB (ou équivalent) est l'option la plus sûre et universellement acceptée. Les autres types d'actifs (stocks, crypto, comptes multiples, fonds empruntés) ont des réponses beaucoup moins uniformes, et une partie de ce qu'on lit en ligne est carrément contradictoire. Meaw parle en première personne : elle a vu des candidats se faire mal conseiller sur ce point précis.

### H2: Personal bank account: the safest, most accepted option
Keywords: `dtv visa thailand bank account`
Contenu : Confirmer factuellement (fact-check #4, #6) : compte personnel au nom du demandeur, liquide, avec un historique de 3-6 mois de relevés (fact-check #23). C'est l'option de référence, la seule universellement acceptée sans ambiguïté selon les 3 sources lues dans le scan SERP.

### H2: Stocks, brokerage accounts, and investments: it's complicated
Keywords: `dtv visa stocks accepted`
Contenu : **Traiter avec rigueur YMYL renforcée.** Présenter honnêtement la contradiction constatée : la majorité des sources consultées (2 sur 3 lues en détail, dont la mieux sourcée avec auteur et date) indique que les portefeuilles d'actions/ETF/obligations **ne comptent généralement pas**, seul le liquide disponible sur un compte compte réellement. Signaler qu'une minorité de sources affirme le contraire sans citer de source officielle vérifiable — donc la prudence recommande de partir du principe que ce n'est PAS accepté sauf confirmation contraire avec l'ambassade visée. Ne jamais trancher de façon définitive sans que `/seo-sources` ait confirmé via une source officielle (MFA, ambassade). Conseil pratique : convertir en liquide sur un compte personnel avant la demande si possible.

### H2: Cryptocurrency: not accepted as proof of funds
Keywords: `dtv visa crypto`
Contenu : Position claire d'après la source la mieux sourcée du scan SERP : crypto explicitement rejetée ("not Bitcoin, not stablecoins, not exchange screenshots"). Conseil pratique : convertir en monnaie fiduciaire sur un compte bancaire personnel avant de constituer le dossier, avec un délai de "seasoning" raisonnable (pas un dépôt la veille du dépôt de dossier, fact-check note sur le "seasoning").

### H2: Can you combine multiple bank accounts?
Keywords: `dtv visa multiple bank accounts`
Contenu : C'est le gap identifié par le scan SERP : cette question, très demandée (confirmée par plusieurs pages Q&A de faible autorité et le pattern PAA), n'est traitée par aucune des 3 pages éditoriales de référence. Répondre avec prudence, en s'appuyant sur le consensus communautaire tel qu'observé, sans le présenter comme une garantie officielle absolue : plusieurs comptes combinés semblent généralement acceptés tant que le total atteint le seuil et que chaque compte est clairement documenté à ton nom, mais recommander de vérifier ce point précis avec l'ambassade visée avant de compter dessus, car les pratiques varient.

### H2: Borrowed or recently transferred funds: a red flag
Keywords: `dtv visa borrowed funds`
Contenu : Rappeler le principe du "seasoning" des fonds (déjà évoqué dans le scan SERP, une source documente une anecdote de rejet pour dépôt trop récent) : un virement important juste avant la demande attire l'attention et peut être questionné. Conseil pratique honnête, sans dramatiser : privilégier des fonds en place depuis plusieurs mois plutôt qu'un virement de dernière minute.

### H2: FAQ
Keywords: `dtv visa proof of funds`, `dtv visa thailand bank account`
Contenu : 4 questions PAA-style (issues du scan SERP) :
1. Can I use a stock portfolio as proof of funds for the DTV visa?
2. Does cryptocurrency count toward the DTV visa's 500,000 THB requirement?
3. Can I combine multiple bank accounts to reach the 500,000 THB threshold?
4. Is it a problem if I just transferred money into my account before applying?
Pas de JSON-LD FAQPage.

### Conclusion (pas de H2 — contrat de fin article)
Contenu : Récap honnête en 2-3 phrases (compte bancaire personnel = option la plus sûre, stocks/crypto généralement à éviter comme preuve directe, vérifier toujours avec l'ambassade visée pour les cas limites). CTA unique final : `/contact?intent=dtv`.

---

## Maillage interne (liens sortants)

| Ancre | URL cible | Section |
|---|---|---|
| the full DTV eligibility guide | `/dtv-visa/eligibility` | Intro et conclusion (remontée obligatoire, garde-fou cannibalisation) |
| the real cost breakdown of the whole DTV visa | `/blog/dtv-visa-cost-breakdown` | Intro (hub — A1 publié) |
| the complete step-by-step application guide | `/dtv-visa/how-to-apply` | H2 "Borrowed or recently transferred funds" (recommandé) |
| Ask us anything — we reply on WhatsApp | `/contact` | H2 "Can you combine multiple bank accounts?" (CTA tiède) |
| Start your DTV application | `/contact?intent=dtv` | Conclusion (CTA chaud, unique) |

**Règle piège** : tous les liens SANS préfixe locale.

**Tâche annexe recommandée** : vérifier si `/dtv-visa/eligibility` (page service existante) contient déjà un lien descendant vers cet article une fois publié — si non, le poser (cf. blueprint maillage du topical map : "eligibility linke descendant → A6, A6 remonte").

---

## Image Briefs

### Cover (obligatoire)
- placement: cover
- type: photo
- subject: Photo candide de Meaw ou d'un membre du staff consultant des documents financiers/relevé bancaire dans un cadre chaleureux
- description: Lumière golden hour, cadre open-air ou véranda, ton rassurant plutôt qu'administratif froid.
- alt_text: "Understanding what counts as proof of funds for the DTV visa in Thailand"
- aspect_ratio: 16:9
- filename: `dtv-visa-proof-of-funds.webp`

### Image 2 — after H2 "Stocks, brokerage accounts, and investments: it's complicated"
- placement: after-h2:Stocks, brokerage accounts, and investments: it's complicated
- type: photo
- subject: Plan serré sur un téléphone ou ordinateur affichant une application bancaire/graphique, ambiance camp
- description: Lumière naturelle chaude, table en bois, ambiance décontractée malgré le sujet financier.
- alt_text: "Reviewing financial accounts for DTV visa proof of funds requirements"
- aspect_ratio: 4:3

### Image 3 — after H2 "Can you combine multiple bank accounts?"
- placement: after-h2:Can you combine multiple bank accounts?
- type: photo
- subject: Séance d'entraînement Muay Thai open-air à Wildcat
- description: Coach thaï et pratiquant, jardin tropical, golden hour.
- alt_text: "Open-air Muay Thai training at Wildcat, part of preparing a complete DTV file"
- aspect_ratio: 4:3

---

## Objectif business

Combler un gap réel confirmé par scan SERP (comptes multiples non traités par les pages de référence, contradiction non résolue sur stocks/crypto) en publiant un guide sourcé et honnête. Convertit en maillant vers `/dtv-visa/eligibility` (remontée), A1 (hub coût), et `/contact?intent=dtv`.

---

## Angle unique / POV (Mode B — dérivé du scan SERP réel)

"J'ai vu des sources en ligne se contredire sur ce qui compte vraiment comme preuve de fonds, notamment sur les actions et la crypto. Voici une réponse claire, prudente, et sourcée, actif par actif, y compris la question que personne ne traite bien : peut-on combiner plusieurs comptes ?" Confirmé par le scan SERP : contradiction réelle entre 2 concurrents directs sur les stocks, gap confirmé sur les comptes multiples.

---

## Gap concurrent identifié

Source : `.seo-data/serp-dtv-visa-proof-of-funds.json` (scan réel, 2026-07-03, WebFetch sur 3/5 résultats) + `docs/reddit-insights/price-dtv-thailand-2026-06-08.md` (thème "preuve de fonds", 🟠 Fort).
- Contradiction confirmée entre concurrents sur les stocks/ETF/obligations (acceptés selon 1 source, rejetés selon 2, dont la mieux sourcée).
- Crypto traitée clairement par 1 seule des 3 pages lues (rejetée).
- Comptes multiples combinés : absent des 3 pages éditoriales de référence malgré une demande confirmée (pattern PAA/pages Q&A dédiées).
- Fonds empruntés : traité de façon floue partout, jamais expliqué mécaniquement.
Date de l'analyse : 2026-07-03 (scan SERP réel).

---

## CTA cible

- **Lead chaud** : `/contact?intent=dtv` — conclusion
- **Lead tiède** : `/contact` — H2 "Can you combine multiple bank accounts?"
- **Nurturing** : `/dtv-visa/eligibility` (remontée prioritaire), `/blog/dtv-visa-cost-breakdown`

---

## Sources (données YMYL — reformuler, jamais citer mot pour mot, VÉRIFICATION RENFORCÉE)

- `.seo-data/serp-dtv-visa-proof-of-funds.json` — scan SERP réel, contradiction documentée
- `docs/reddit-insights/price-dtv-thailand-2026-06-08.md` — thème preuve de fonds, citations à reformuler
- `docs/dtv-fact-check.md` — 500 000 THB (#4), fonds sur compte personnel liquide (#6), historique bancaire 3-6 mois (#23)
- `docs/topical-map-dtv-costs.md`

**⚠️ Obligation renforcée `/seo-sources`** : ce brief contient une contradiction factuelle YMYL non résolue entre sources concurrentes (stocks acceptés vs rejetés). L'étape `/seo-sources` DOIT tenter de trouver une source officielle (MFA Thailand, ambassade, Bank of Thailand) pour trancher, ou à défaut présenter la position prudente (2/3 sources, la mieux sourcée) comme recommandation par défaut avec un avertissement clair de vérifier au cas par cas. Ne jamais citer `dtvvisathai.com` (source isolée sans byline identifiable ni source officielle) comme appui d'une affirmation "accepté".

---

## Citations exploitables (GEO — Quotation Addition)

1. **muaythaivisathailand.com (rank 1 scan SERP, auteur nommé Kru Chart, daté)** : *"Crypto does not count. Not Bitcoin. Not stablecoins. Not screenshots from exchanges."* — citable en attribution nommée si confirmé par `/seo-sources` au moment de la rédaction (vérifier la source encore active et le contenu inchangé), sinon reformuler en attribution générique de catégorie ("official guidance and specialist guides consistently exclude cryptocurrency from accepted proof of funds").
2. **Fact-check interne (`docs/dtv-fact-check.md` #4, #6)** : 500 000 THB sur compte personnel liquide au nom du demandeur — citable en attribution factuelle interne.

**Règle writer** : ne jamais nommer `dtvvisathai.com`, `muaythaivisathailand.com` (concurrent direct de niche) ou tout autre concurrent identifié dans le scan SERP comme source nommée dans l'article final, sauf validation explicite par `/seo-sources` avec citation neutre et non promotionnelle (éviter de faire de la publicité gratuite à un concurrent direct de niche Muay Thai).

---

## Notes techniques pour le writer

1. **Piège liens** : tous SANS préfixe locale.
2. **A1 publié, lien réel.**
3. **Rigueur YMYL renforcée** : ce sujet contient une contradiction concurrentielle réelle. Ne jamais trancher de façon définitive sans passage par `/seo-sources`.
4. **Aucun concurrent nommé** sans validation explicite de `/seo-sources` (voir note ci-dessus, en particulier `muaythaivisathailand.com` qui est un concurrent direct de niche).
5. **YMYL — pas de promesse de résultat.**
6. **Âge DTV** : toujours 20 ans si mentionné.
7. **TLDR obligatoire** (2-5 puces) — mentionner explicitement la nuance stocks/crypto dans le TLDR.
8. **Zéro em-dash.**
9. **Byline Meaw** : author.url → Person `#meaw`.
10. **Ton** : prudent, honnête sur l'incertitude plutôt que de faire semblant d'avoir une réponse définitive à 100 % sur les cas limites (comptes multiples, fonds empruntés).

---

Brief sauvegardé dans `content/_drafts/blog/dtv-visa-proof-of-funds.md`.
Prochaine étape : validation par `@brief-critic`, puis `/seo-write dtv-visa-proof-of-funds`.

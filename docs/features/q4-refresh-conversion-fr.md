# Q4 2026 — Refresh GSC, conversion, chantier FR

> Plan du 2026-10-16. Source : GSC wildcat (Neon `seostats`, backfill complété jusqu'au 11/10),
> inventaire du repo.

## Suivi (2026-10-16)

- [x] Lot 0 formulaires : commit `becbe78`, `tests/e2e-contact-multistep.py` 26/26.
- [x] Lot 1 refresh : les 5 articles. Mongkhon et self-defense enrichis **sans toucher title/meta** (décision Jonathan).
- [x] Lot 2 A+C : tri FR + 7 traductions programmées (calendrier §Q4). Écartés : proof-of-funds et
  new-requirements (0 volume FR ou cannibalise le pilier), boxe thaï dangereuse (10/mois).
- [x] Lot 3 : article `fight-muay-thai-thailand-foreigner` (27/10).
- [ ] Lot 3 : page « Venir au camp » et article « Première semaine Stay & Train » → attendent les
  réponses de Meaw (`docs/questions-meaw-2026-10.md` §1-2).
- [ ] Lot 2 D : 301 `/fr/dtv-visa/` à vérifier en prod.
- [ ] Re-mesure GSC des refresh mi-novembre.

## État des lieux

**Pages** : 100 % traduites (EN + FR, 1513 clés, parité OK). Les slugs de pages restent anglais en FR
(`/fr/classes`), décision E5.

**Articles** : 30 EN, 5 FR.

| FR | Statut |
|---|---|
| `saison-des-brulis-chiang-mai` | publié, pos. 3,6 |
| `meilleur-camp-muay-thai-chiang-mai` | publié |
| `muay-thai-pour-les-femmes` | publié |
| `visa-thailande-guide-duree-de-sejour` | publié |
| `stage-boxe-thai-thailande-prix` | FR seul, programmé 10/11 |

**Trafic FR** (juin → 11/10) : 16 clics / 277 impressions, contre 82 / 4 664 en EN. Le CTR FR est
meilleur (5,8 % contre 1,8 %), mais ~15 des 16 clics sont de la marque sur `/fr`. Le FR non-marque se
résume à : brûlis (pos. 3-5, peu de concurrence) et `/fr/dtv-visa` (179 impressions, pos. 36-68, aucun
article FR pour le soutenir).

**Lecture** : le FR a de la place (SERP plus faibles), mais pas de volume prouvé. On traduit en
**localisant** : un francophone tape « boxe thaï » plus souvent que « muay thai ». Chaque traduction
passe donc par une vérif de mots-clés FR, jamais du mot à mot.

## Lot 0 — Formulaires (fait le 2026-10-16, non commité)

- `ContactForm` multistep (besoin → détails → coordonnées) + lectures conseillées après envoi
  (`WhatsappSubmitModal`, groupes par intention et par niveau).
- `InquirySection` posée sur `/classes`, `/classes/beginners`, `/dtv-visa/how-to-apply`,
  `/dtv-visa/eligibility`, `/stay-train/scooter-rental` ; leurs CTA pointent sur `#ask`.
- [ ] Vérif visuelle par Jonathan (desktop + mobile, modal avec recos), puis commit.

## Lot 1 — Refresh des articles EN (données GSC)

Un article par session, pipeline `/seo-refresh` → `/humanizer` → `/seo-lint`. Ordre = gain attendu.

| # | Article | Constat GSC (4-6 sem.) | Action |
|---|---|---|---|
| 1 | `best-muay-thai-camps-thailand` | 1 771 imp., pos. 28,6, 5 clics ; famille « muay thai camp(s) thailand » ~1 700 imp. | Enrichir : section camps tout compris / forfaits (prix réels, 28 000 THB), « training camp », critères de choix ; lien fort → `/stay-train#packages` ; title/meta |
| 2 | `ed-visa-vs-dtv-muay-thai` | ~120 imp. pos. 10-16 « muay thai education/ed visa » ; capte « muay thai visa » | Recentrer title + H1 sur « Muay Thai education visa » ; section Chiang Mai ; lien → `/dtv-visa` |
| 3 | `muay-thai-headband-mongkhon` | ~150 imp. pos. 8-10, 1 clic | Title + meta seulement (CTR) ; FAQ « what is the headband called » |
| 4 | `muay-thai-self-defense` | 199 → 25 imp., pos. 12,6 → 16 | Refresh contenu + date |
| 5 | `dtv-visa-new-requirements-2026` | 89 → 1 imp. (actu retombée) | Mise à jour datée octobre, état des règles |

⚠️ **Cannibalisation** sur « muay thai camp thailand » : l'article, `/stay-train` et la home sortent
tous les trois. Règle : l'article garde l'intention « best camps » (comparatif), `/stay-train`
l'intention réservation (« all inclusive », « packages »). L'article renvoie à `/stay-train` avec
une ancre exacte ; la home ne vise plus cette requête.

**Conversion dans les articles** : ajouter `InquirySection` en fin d'article selon la catégorie
(`visa` → dtv, `beginners`/`benefits` → class, `choosing-a-camp` → stay), avant `CtaBanner` dans
`blog/[slug].astro`. Une seule modif de template couvre les 30 articles.

## Lot 2 — Chantier FR

**Étape A — tri par la donnée (1 session).** Batch `/seo-keywords` FR sur les candidats ci-dessous,
formulés en « boxe thaï » ET « muay thai ». Seuil : mot-clé principal ≥ 10/mois en FR, sinon on ne
traduit pas.

**Étape B — candidats, par priorité :**

1. **Cluster visa DTV** (soutient `/fr/dtv-visa`, le seul FR non-marque qui s'affiche) :
   `dtv-visa-cost-breakdown`, `dtv-visa-proof-of-funds`, `ed-visa-vs-dtv-muay-thai`,
   `dtv-visa-new-requirements-2026`. Repère : « destination thailand visa dtv » 480/mois.
2. **Débutants** (nourrit aussi les recos FR du formulaire, aujourd'hui 2 liens seulement) :
   `muay-thai-gear-beginners`, `muay-thai-stance-basics`.
3. **Comparatifs et bénéfices** (volumes FR probables en « boxe thaï ») : `muay-thai-vs-kickboxing`,
   `is-muay-thai-dangerous`, `muay-thai-weight-loss`, `muay-thai-self-defense`.
4. **Culture** : `wai-kru-ram-muay-explained`, `muay-thai-headband-mongkhon`.

⚠️ `best-muay-thai-camps-thailand` en FR entrerait en conflit avec `stage-boxe-thai-thailande-prix`
(qui vise déjà « camp muay thai thailande », 210/mois). On ne le traduit pas avant de voir comment
l'article du 10/11 se positionne.

**Étape C — production.** Une traduction localisée par semaine, en alternance avec les articles
programmés (1 / 2 semaines) : le frein reste l'indexation (33/61 URL). Même `translationKey` que l'EN
(hreflang automatique), slug FR, `/humanizer` FR, `/seo-lint`. Les recos du formulaire et les blocs
`ReadNext` FR se remplissent tout seuls (`getPostsByKeys`).

**Étape D — technique FR.** `/fr/dtv-visa/` (avec slash) apparaît encore dans GSC (81 imp.,
pos. 68,6) : vérifier le 301 en prod et demander la réindexation de la forme sans slash.

## Lot 3 — Contenus « après formulaire »

Pas de pages réservées aux gens qui ont rempli le formulaire. Ils voient les liens une fois, et la
vraie suite se joue sur WhatsApp. Les liens actuels suffisent pour 5 groupes sur 8. Trois trous réels,
qui servent **aussi** le SEO :

| Trou | Pour qui | Contenu | Dépend de |
|---|---|---|---|
| **Venir au camp** | Toutes les intentions | Page `/getting-here` : depuis la vieille ville, l'aéroport, Grab, scooter, repères. Le menu « Getting Here » pointe aujourd'hui sur `/contact` | Photos repères, temps de trajet avec Meaw |
| **Ta première semaine en Stay & Train** | Séjour, DTV | Arrivée, maison, rythme d'une journée, ce qu'on apporte | `docs/checklist.md` §B (maison, transfert) |
| **Combattre en Thaïlande quand on est étranger** | Cours niveau expérimenté (2 liens seulement) | Comment se passe la mise en combat, stades, poids, assurance | Vérif DataForSEO + infos Meaw |

## Ordre d'exécution

1. Lot 0 : vérif + commit.
2. Lot 1 #1 (`best-muay-thai-camps-thailand`) + `InquirySection` dans le template article.
3. Lot 1 #2 à #5, un par session.
4. Lot 2 étape A (tri FR), puis une traduction par semaine.
5. Lot 3 dès que Meaw a répondu (checklist §B, trajet).

**Mesure** : relire GSC 4 semaines après chaque refresh (`collect-gsc` / tick horaire) ; leads par
intention via les notifs `/api/inquiry`.

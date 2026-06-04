# BRIEF SEO — `/dtv-visa/how-to-apply`

> Brief de cadrage (protocole `/seo-brief`, **Module C — YMYL expert**). Page **satellite** du pillar `/dtv-visa`.
> Éléments de contenu en **anglais** (page EN-first + FR) ; consignes en français.
> Règles : "Wildcat" jamais "WildCat" · pas de `guaranteed` · banned words `identity.md` · chiffres = `common_ground` du SERP sinon `[À VÉRIFIER]`.

---

## 1. Metadata

| Champ | Valeur |
|---|---|
| **URL** | `/dtv-visa/how-to-apply` (EN) · `/fr/dtv-visa/how-to-apply` (slug EN conservé dans toutes les locales, cf. `localePath()`) |
| **Type** | Satellite procédural du pillar `/dtv-visa` |
| **Module** | C — YMYL expert (E-E-A-T fort, sujet visa = "Your Money or Your Life") |
| **Cluster** | Silo DTV n°1 |
| **Keyword principal** | `how to apply for dtv visa thailand` / `thailand dtv visa application` |
| **Intent** | Procédural / transactionnel ("ready to apply, wants the exact portal, steps, fees, documents, timeline") |
| **Longueur cible** | **1200–1600 mots** (corps utile, hors JSON-LD / checklist) |
| **Personas** | (1) Digital nomad/expat DTV 25-45 ans prêt à candidater route Muay Thai · (2) Combattant en formation qui découvre le DTV comme moyen de rester |
| **Auteur / signature** | **Meaw Boonpradub** (owner — monte réellement les dossiers DTV des clients via WhatsApp) |
| **Élément interactif** | **Checklist documents interactive** (cochage + barre de progression + persistance localStorage + reset) |
| **JSON-LD** | `HowTo` (étapes de candidature) + `BreadcrumbList` |
| **CTA hot** | `/contact` ("Start your DTV application") + WhatsApp deep link (`site.contact.whatsapp`) |
| **Date** | 2026-06-04 |
| **Statut** | Brief — à passer à `/seo-write` |

> **Délimitation vs pillar** : le pillar `/dtv-visa` a une section "3 steps" (`DtvSteps`) = survol commercial. Cette satellite est le **guide détaillé pas-à-pas** (le walkthrough complet du portail, documents, timeline, erreurs). Pas de répétition : la satellite approfondit, le pillar renvoie ici.
> **Délimitation vs `/dtv-visa/faq`** : la mini-FAQ on-page (§4) couvre 3-4 PAA strictement **procédurales** ("apply from inside Thailand ?", "processing time ?"). Les questions générales (taxes, overstay, bank account, dependents larges) restent sur `/dtv-visa/faq`.

---

## 2. Snippet block (×3 variantes)

> Title ≤ 60 car. · Meta ≤ 155 car. · keyword principal dans les 70 premiers car. de la meta.
> Pas de "guaranteed". "Wildcat" exact.

### Variante A — How-to chiffré (recommandée)
- **Title** : `How to Apply for the DTV Visa: 7 Steps (2026)` (45)
- **H1** : `How to Apply for the Thailand DTV Visa — Step by Step`
- **Meta** : `How to apply for the Thailand DTV visa, step by step: the e-Visa portal, fees, documents and timeline — with the Muay Thai papers we prepare for you.` (152)

### Variante B — Route Muay Thai (différenciation E-E-A-T)
- **Title** : `Apply for the DTV Visa via Muay Thai (2026 Guide)` (49)
- **H1** : `How to Apply for the DTV Visa as a Muay Thai Trainee`
- **Meta** : `Applying for the Thailand DTV visa through Muay Thai? Here's the real e-Visa walkthrough, the exact documents, fees and timeline — from the camp that files them.` (154)

### Variante C — Question miroir
- **Title** : `Thailand DTV Visa Application: A Real Walkthrough` (49)
- **H1** : `Your Thailand DTV Visa Application, Walked Through`
- **Meta** : `Your Thailand DTV visa application, walked through by Meaw at Wildcat: every step, document and fee — plus an interactive checklist so nothing gets missed.` (153)

---

## 3. Keyword cluster

> Forme brute = query (autorisée en Title/H1/H2/meta). Forme naturalisée = prose (préposition + article).

| Rôle | Query | Vol/mo | Placement | Forme naturalisée (prose) |
|---|---|---|---|---|
| **Principal** | how to apply for dtv visa thailand | (how-to) | H1, intro, §step-by-step | "how to apply for the Thailand DTV visa" |
| **Principal** | thailand dtv visa application | 30 | Title/meta, H2 timeline | "your Thailand DTV visa application" |
| Secondaire | dtv visa application | 20 | intro, H2 | "the DTV visa application" |
| Secondaire | apply for dtv visa thailand | 20 | intro, CTA | "to apply for the DTV visa in Thailand" |
| Secondaire | dtv visa application form | 10 | §step "fill the form" | "the online application form" |
| Secondaire | dtv visa thailand online application | 10 | §portail | "the online DTV application" |
| Secondaire | how to get dtv visa in thailand | 20 | H2, FAQ | "how to get the DTV visa" |
| Long-tail | dtv visa thailand how long does it take | 10 | H2 timeline + FAQ | "how long the DTV visa takes" |
| Long-tail | thailand dtv visa processing time | 10 | H2 timeline | "the DTV processing time" |
| Long-tail | dtv visa thailand application form | 10 | §form | "the DTV application form" |
| Long-tail | muay thai dtv visa | 20 | §documents Wildcat, angle | "the Muay Thai DTV route" |
| Long-tail | dtv visa thailand requirements | 210 | §documents (renvoi eligibility) | "the DTV visa requirements" |
| Related | thailand dtv visa cost / price | 40/40 | H2 fees | "how much the DTV visa costs" |
| Entité | thaievisa.go.th | — | §step portail (lien officiel) | "the official Thai e-Visa portal" |
| Entité | Thai Soft Power / DTV category | 20 | §documents, angle | "the Soft Power category" |

> Densité : reformuler systématiquement en prose (cf. `keyword-naturalization.md`). Bold autorisé sur variantes ("**apply for the DTV visa**", "**Thailand DTV visa application**", "**Muay Thai DTV route**").

---

## 4. Structure H2 / H3

> Le **cœur de page** = le guide numéroté (§ "The DTV application, step by step"). Chaque étape : consigne + faits chiffrés du `common_ground` + **rôle de Wildcat** (qui fournit quoi).
> Disclaimer YMYL en italique **avant** le H1 (Module C, §1).

**[Disclaimer — italique, haut de page]**
> *This guide reflects the DTV rules as we file them today, June 2026. Immigration requirements change — always confirm the current rules on the official Thai e-Visa portal (thaievisa.go.th) or with your Thai embassy before you apply. This is not legal advice. We can't promise an approval, but we make sure your application is complete and your Muay Thai documents are right.*

### H1 — `How to Apply for the Thailand DTV Visa — Step by Step`

**Intro (BLUF, ~90 mots)** : réponse directe — où on candidate (portail e-Visa, **from outside Thailand**), combien (10,000 THB non-refundable), combien de temps (5–15 business days), et l'angle : *the Muay Thai (Soft Power) route, and the camp papers Wildcat hands you.* Signature implicite Meaw. Lien sortant précoce vers **eligibility** ("First, check you're eligible →").

### H2 — `Before you start: are you eligible?`
- 2-3 phrases : âge **20+**, **500,000 THB** proof (or ~50,000 THB/mo income), passeport 6+ mois.
- **Renvoi fort** vers satellite : "We cover the full criteria on [the DTV eligibility page]." (lien `eligibility`)
- **Rôle Wildcat** : "If your activity is Muay Thai training, that's where we come in — keep reading."

### H2 — `The DTV application, step by step` ← CŒUR DE PAGE (HowTo)
Liste **numérotée** (mappe 1:1 le JSON-LD HowTo §6). Pour chaque étape : *what you do* + *fact* + *Wildcat's role*.

- **H3 — Step 1 · Decide where you'll apply (from outside Thailand)**
  Fait : on **ne peut pas** candidater depuis l'intérieur de la Thaïlande ; on choisit l'ambassade/consulat de résidence. Wildcat : "We tell you which country option our trainees usually pick and why."
- **H3 — Step 2 · Create your account on the Thai e-Visa portal**
  Fait : portail officiel **thaievisa.go.th** (lien externe `rel` standard). Wildcat : néant (étape perso) — on rassure : "It's the only official site — don't pay a third-party 'portal'."
- **H3 — Step 3 · Select the DTV and your category (Soft Power · Muay Thai)**
  Fait : catégories = Workcation / **Thai Soft Power** (Muay Thai) / Dependent. Wildcat : "Muay Thai sits under Soft Power — this is the route we prepare documents for."
- **H3 — Step 4 · Gather your documents** *(intro de la checklist)*
  Fait : passport (6+ mois, blank pages), photo 4×6 cm, **bank statements 3-6 months / 500,000 THB**, accommodation proof, flight itinerary, **$50,000 USD health insurance** `[selon l'ambassade — À VÉRIFIER pour la tienne]`. Wildcat : **enrollment letter signée + training schedule + payment receipt**. → "Use the interactive checklist below to track every document." (ancre vers §5)
- **H3 — Step 5 · Fill in the online application form**
  Query "dtv visa application form" : "complete the online application form on the portal — personal details, category, uploads."
- **H3 — Step 6 · Upload documents & pay the fee online**
  Fait : **10,000 THB (~$290) non-refundable**, payé en ligne ; uploads PDF/JPEG. Wildcat : "Our camp documents come as clean PDFs ready to upload."
- **H3 — Step 7 · Wait for processing, then enter Thailand**
  Fait : **5–15 business days** officiel (jusqu'à ~3-6 semaines en haute saison) ; e-mail d'approbation ; on entre, **180 days per stay**, validité **5 ans multiple entry**. Wildcat : "Once you're approved, message us your arrival date and we'll have your first session ready."

### H2 — `The documents you need` *(intro narrative de la checklist)*
- Texte court qui groupe : **personal** / **financial** / **provided by Wildcat**.
- Pose la checklist interactive (§5) juste après.
- **Rôle Wildcat explicite** : "Three of these documents we prepare and sign for you — the enrollment letter, the training schedule, and your paid receipt. That's the part most applicants get wrong on their own."

### H2 — `Timeline & fees`
- Fait : **10,000 THB** app fee (non-refundable), **1,900 THB** extension (+180 days), **5–15 business days** (peak ~30) ; financial proof **500,000 THB**.
- Mini-tableau dans le texte (fee / amount / refundable?).
- Mention évolution E6 : "Soon you'll be able to start your file directly with us via [our application form] (`/dtv-visa/apply`)" — *mentionner comme évolution, lien futur en `#` jusqu'à E6.*

### H2 — `Common mistakes that get DTV applications rejected` ← GAP E-E-A-T fort
> Section signature : ce que Meaw voit réellement échouer. Aucun concurrent ne le couvre. Pas de "guaranteed".
- Applying **from inside Thailand** (auto-reject).
- **Inconsistent funds** : 500k THB qui apparaît la veille / mouvements incohérents sur 3-6 mois.
- **Weak / generic activity documents** : lettre d'un camp non enregistré, pas de schedule, reçu manquant. → "This is exactly what we fix: real, signed camp documents from a registered Muay Thai camp."
- Passeport **< 6 mois** de validité ou pages pleines.
- Health insurance manquante quand l'ambassade l'exige.
- Croire qu'un "agent portal" payant est le site officiel (only `thaievisa.go.th`).

### H2 — `DTV application FAQ` *(mini-FAQ on-page, 3-4 PAA procéduraux)*
> Distincts de `/dtv-visa/faq`. Choisir parmi les PAA SERP :
- **Can I apply for the DTV from inside Thailand?** → Non, depuis l'extérieur.
- **How long does the DTV visa take to process?** → 5–15 business days (peak ~30).
- **How much does the DTV visa cost?** → 10,000 THB non-refundable + 1,900 THB extension.
- **What documents does Wildcat provide for the Muay Thai route?** → enrollment letter + training schedule + paid receipt.

### [CTA banner final]
- Titre : "Ready to apply? Let's get your file right." (réutiliser pattern `CtaBanner`)
- Primary : **Start your DTV application** → `/contact`
- Secondary : **Chat on WhatsApp** → `site.contact.whatsapp`

---

## 5. Spec — Checklist documents interactive

> Îlot interactif minimaliste (vanilla JS, cf. conventions Astro). Accessible (checkbox natives + `aria`), reduced-motion safe. Persiste l'état, jamais de donnée perso saisie (juste des cases cochées).

### Documents exacts (3 groupes)

**Group A — Personal (you provide)**
1. Passport valid 6+ months, with blank pages
2. Passport photo (4×6 cm)
3. Proof of accommodation in Thailand
4. Flight itinerary / travel plan

**Group B — Financial (you provide)**
5. Bank statements (last 3–6 months)
6. Proof of funds: **500,000 THB** balance *or* income ~50,000 THB/month
7. Health insurance — $50,000 USD medical coverage `[required by some embassies — confirm yours]`

**Group C — Provided & signed by Wildcat (Muay Thai / Soft Power route)**
8. Signed enrollment letter from Wildcat (registered Muay Thai camp)
9. Training schedule
10. Payment / paid receipt for your training

> Note visuelle : le groupe C est badgé "We prepare these" (gold) — c'est l'argument différenciant.

### Comportement
- Chaque item = checkbox. Au `change` → recalcul du % et mise à jour de la **progress bar** (`aria-valuenow`, largeur animée, `prefers-reduced-motion` → pas d'anim).
- **Persistance** : `localStorage` clé `wc-dtv-checklist-v1` (objet `{ itemId: bool }`). Rechargement = état restauré. Reset bouton → vide la clé + décoche tout + repasse à 0 %.
- Compteur visible : "`{n}` of 10 documents ready".
- Bouton **Reset checklist** (variant link/outline).

### Wording des états
| État | Label progress | Sous-texte / CTA |
|---|---|---|
| **0 %** | "0 of 10 ready" | "Tick each document as you get it — your progress is saved on this device." |
| **partiel (1-9)** | "`{n}` of 10 ready" | "Almost there. The Muay Thai documents (8–10) — leave those to us." |
| **100 %** | "All 10 documents ready ✅" | **"You're ready — send us your file"** → bouton vers `/contact` + lien WhatsApp |

> Le groupe C peut être **pré-coché informativement** OU laissé décochable avec note "we hand these to you" — recommandation : décochables mais avec tooltip "provided by Wildcat", pour que le 100 % signifie "tout réuni, y compris notre part confirmée".

---

## 6. Spec — JSON-LD HowTo

> `@type: HowTo` + `BreadcrumbList` (ce dernier émis par le composant `<Breadcrumb>` existant). Steps = miroir exact du §4 H2 "step by step". `name`/`text` ci-dessous = à reprendre tel quel (FR : versions traduites via messages).

```jsonc
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Apply for the Thailand DTV Visa",
  "description": "Step-by-step guide to applying for the Thailand Destination Thailand Visa (DTV) via the Muay Thai / Soft Power route.",
  "totalTime": "P15D",                       // 5–15 business days (indicatif)
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "THB", "value": "10000" },
  "supply": [
    { "@type": "HowToSupply", "name": "Passport valid 6+ months" },
    { "@type": "HowToSupply", "name": "Bank statements (3–6 months) showing 500,000 THB or equivalent income" },
    { "@type": "HowToSupply", "name": "Signed enrollment letter, training schedule and paid receipt from Wildcat Muay Thai" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Thai e-Visa portal (thaievisa.go.th)" }
  ],
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Decide where you'll apply",
      "text": "Apply from outside Thailand through the Thai embassy or consulate of your country of residence — you cannot apply from inside Thailand.",
      "url": "https://wildcatmuaythai.com/dtv-visa/how-to-apply#step-1" },
    { "@type": "HowToStep", "position": 2, "name": "Create your e-Visa account",
      "text": "Create an account on the official Thai e-Visa portal at thaievisa.go.th. It is the only official site — avoid paid third-party 'portals'.",
      "url": "https://wildcatmuaythai.com/dtv-visa/how-to-apply#step-2" },
    { "@type": "HowToStep", "position": 3, "name": "Select the DTV and your category",
      "text": "Choose the Destination Thailand Visa and select your qualifying category. For Muay Thai training, select the Thai Soft Power category.",
      "url": "https://wildcatmuaythai.com/dtv-visa/how-to-apply#step-3" },
    { "@type": "HowToStep", "position": 4, "name": "Gather your documents",
      "text": "Prepare your passport, photo, 3–6 months of bank statements proving 500,000 THB or equivalent income, accommodation and travel proof, and your Wildcat enrollment letter, training schedule and paid receipt.",
      "url": "https://wildcatmuaythai.com/dtv-visa/how-to-apply#step-4" },
    { "@type": "HowToStep", "position": 5, "name": "Fill in the application form",
      "text": "Complete the online DTV application form on the portal with your personal details and chosen category.",
      "url": "https://wildcatmuaythai.com/dtv-visa/how-to-apply#step-5" },
    { "@type": "HowToStep", "position": 6, "name": "Upload documents and pay the fee",
      "text": "Upload your documents as PDF or JPEG and pay the 10,000 THB application fee online. The fee is non-refundable, even if the application is rejected.",
      "url": "https://wildcatmuaythai.com/dtv-visa/how-to-apply#step-6" },
    { "@type": "HowToStep", "position": 7, "name": "Wait for processing and enter Thailand",
      "text": "Processing usually takes 5–15 business days. Once approved, you receive an email and can enter Thailand for up to 180 days per stay, with a 5-year multiple-entry validity.",
      "url": "https://wildcatmuaythai.com/dtv-visa/how-to-apply#step-7" }
  ]
}
```

> Implémentation Astro : objet construit en frontmatter depuis les messages Paraglide (parité EN/FR), injecté via `slot="jsonld"` (pattern identique au pillar `dtv-visa.astro`). `url` absolues construites depuis `site.website` + path localisé.

---

## 7. Maillage interne

> `localePath()` pour tous les liens (slugs EN dans toutes les locales). Pillar = hub, satellite = profondeur ; bidirectionnel pillar ↔ satellite + liens latéraux entre satellites frères.

### Liens SORTANTS (depuis cette page)
| Cible | Ancre exacte | Contexte d'insertion |
|---|---|---|
| `/dtv-visa/eligibility` | "the DTV eligibility page" / "check you're eligible" | H2 "Before you start" — **avant** d'expliquer comment candidater |
| `/dtv-visa` (pillar) | "our DTV visa overview" | Intro ou fin — retour au pillar |
| `/dtv-visa/muay-thai` | "the Muay Thai documents we provide" | §documents / Group C — détail des papiers camp |
| `/dtv-visa/long-stay-training` | "staying long-term to train" | §step 7 / après approbation |
| `/dtv-visa/faq` | "more DTV questions" | Fin de la mini-FAQ on-page |
| `/contact` | **"Start your DTV application"** | CTA hot (banner + état 100 % checklist) |
| WhatsApp (`site.contact.whatsapp`) | "Chat on WhatsApp" | CTA secondaire |
| `/dtv-visa/apply` *(futur E6)* | "our application form" | §Timeline & fees — lien en `#` jusqu'à E6 |
| `thaievisa.go.th` (externe) | "the official Thai e-Visa portal" | Step 2 |

### Liens ENTRANTS (à ajouter ailleurs)
| Page | Où insérer | Ancre suggérée | Fichier |
|---|---|---|---|
| `/dtv-visa` (pillar) | Section `DtvSteps` ("3 steps") | "See the full step-by-step guide" | `src/pages/[lang]/dtv-visa.astro` |
| `/dtv-visa/eligibility` | Fin / CTA "next step" | "how to apply, step by step" | satellite eligibility |
| `/dtv-visa/muay-thai` | Section documents | "how these documents fit your application" | satellite muay-thai |
| `/dtv-visa/faq` | Réponse "how do I apply ?" | "our full application walkthrough" | satellite faq |
| Nav / mega-menu DTV | Cluster DTV | "How to apply" | composant Nav |

---

## 8. E-E-A-T / YMYL (Module C)

- **Auteur signé** : **Meaw Boonpradub**, owner de Wildcat Muay Thai, qui *file the DTV documents for trainees herself*. Bloc auteur en bas + champ `author` dans le schema (Person, name "Meaw Boonpradub", `worksFor` Wildcat Muay Thai). Première personne assumée : "what I see get rejected", "the camp papers we sign".
- **Disclaimer évolutif** (en italique, haut de page — cf. §4) : règles susceptibles de changer, vérifier `thaievisa.go.th` / ambassade, *not legal advice*, **pas de promesse d'approbation**.
- **Sources officielles datées** : citer le portail officiel **thaievisa.go.th** (lien), mentionner "DTV rules as of June 2026" ; chiffres = `common_ground` (10,000 THB, 500,000 THB, 20+, 5–15 business days, 5 ans/180 jours, $50,000 insurance). Tout chiffre hors `common_ground` → `[À VÉRIFIER]`.
- **Témoignages** : **ne pas inventer**. Si le CMS (`safeQuery`, service `dtv`) renvoie un témoignage réel → l'afficher (pattern `TestimonialQuote` du pillar). Sinon : aucun (pas de fausse review).
- **Honnêteté** : assumer ce qu'on ne maîtrise pas ("the embassy decides", "insurance rules vary by embassy"). Renforce la confiance vs law firms froids.
- **Bannis** : `guaranteed`, `warrior`/`beast mode`/`hardcore`, "WildCat", corporate vide (`innovant`, `crucial`, `solutions`, `world-class`).

---

## 9. Angle unique & gap

**`recommended_angle` (SERP)** : posséder la **route Soft Power / Muay Thai** que les law firms (Siam Legal, Fragomen) et les guides génériques survolent en une ligne.

L'angle = **walkthrough vécu "done-with-you"** : Meaw raconte le vrai flux `thaievisa.go.th` à la première personne **+** une **checklist interactive** où Wildcat fournit les documents camp que l'immigration regarde (enrollment letter signée, training schedule, paid receipt). On transforme un "how-to" abstrait en **candidature accompagnée** — preuve E-E-A-T vécue qu'aucun cabinet de Bangkok ne peut égaler.

**Gaps concurrents exploités** (du SERP) :
1. Aucun concurrent n'a de **checklist interactive/téléchargeable** → on la livre.
2. Route Muay Thai = **une ligne** chez les autres → on montre *exactement* quels papiers le camp prépare et signe.
3. Law firms top (Fragomen/Siam Legal) **omettent les faits durs** (pas de fee, pas de portail, pas de timing) → on les donne, chiffrés et datés.
4. **Common mistakes / what immigration checks** = quasi absent → notre section signature.
5. Le plus faible (Thai Visa Services) a un byline anonyme → on bat sur **E-E-A-T réel** (Meaw, owner, dossiers réels).

**Évolution produit à teaser** : E6 livrera `/dtv-visa/apply` (mini-app formulaire multi-étapes + upload) — mentionner comme prochaine étape "start your file with us directly", lien futur.

---

## 10. Sources

> Faits = `common_ground` du SERP (corroborés multi-sources). Citer dans le texte les sources **officielles/datées**, pas les concurrents.

- **Officiel** : Thailand e-Visa portal — `https://www.thaievisa.go.th` (portail de soumission ; source de vérité fee/documents/catégories). 90-day reporting : `tm47.immigration.go.th`.
- **Faits chiffrés** (`common_ground`, SERP `serp-how-to-apply-dtv-visa-thailand.json`, scan 2026-06-04) : fee **10,000 THB** non-refundable ; proof **500,000 THB** (ou ~50,000 THB/mo) ; âge **20+** ; validité **5 ans / 180 jours/séjour** ; extension **1,900 THB / +180 jours** ; processing **5–15 business days** (peak ~30) ; **$50,000 USD** health insurance (selon ambassade) ; Muay Thai = **Soft Power** (enrollment letter + payment receipt + training schedule).
- **Keywords** : `.seo-data/keywords-dtv-visa-application.json`, `.seo-data/keywords-dtv-visa-thailand.json` (DataForSEO, US, 2026-06-04).
- **E-E-A-T interne** : Meaw Boonpradub (owner), dossiers DTV réels gérés via WhatsApp ; `docs/voice.md`, `docs/seo-context.md`.
- **À dater dans la page** : "DTV rules as of June 2026". Tout chiffre non listé ci-dessus → `[À VÉRIFIER]` avant publication.

---

_Brief généré 2026-06-04 · protocole `/seo-brief` · Module C YMYL · prêt pour `/seo-write`._

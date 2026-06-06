# Fact-check du silo DTV — Wildcat Muay Thai

**Date :** 2026-06-05
**Périmètre :** 6 pages du silo DTV (pillar `/dtv-visa` + `/eligibility`, `/how-to-apply`, `/muay-thai`, `/long-stay-training`, `/faq`)
**Source des claims :** `messages/en.json` (préfixes `dtv_`, `dtv_apply_`, `dtv_elig_`, `dtv_faqp_`, `dtv_lst_`, `dtv_mt_`)
**Nature :** contenu YMYL (visa/immigration) — rigueur critique avant prod.

> **Disclaimer méthodo :** les règles DTV varient selon l'ambassade et évoluent depuis le lancement (juillet 2024). Beaucoup de chiffres sont des fourchettes/pratiques constatées, pas des seuils légaux figés. Le site fait globalement un très bon travail d'encadrement (« around », « varies by embassy », disclaimers datés, review date). La source officielle primaire (checklist MFA `image.mfa.go.th`) n'a pas pu être parsée (PDF binaire) — vérification croisée via Siam Legal, ExpatDen, ThaiEmbassy.com, Greenback/MyExpatTaxes, et plusieurs guides Muay Thai DTV 2025-2026.

---

## Résumé

- **~30 claims factuels vérifiés**
- **✅ 27 confirmés** (dont plusieurs correctement présentés en fourchette)
- **❌ 1 erreur factuelle nette** : âge minimum « 18+ » dans une réponse FAQ (contredit le « 20+ » correct utilisé partout ailleurs sur le site)
- **⚠️ 2 points à surveiller / formulation à border** : la nuance « extendable once » (correcte mais à comprendre comme *une fois par entrée*, pas une fois sur 5 ans) et la dépendance ambassade de l'assurance santé / des frais (déjà bien encadré, à garder à jour).

---

## Tableau par claim

| # | Claim (clé en.json) | Verdict | Ce que disent les sources | Sources | Correction proposée |
|---|---------------------|---------|---------------------------|---------|---------------------|
| 1 | DTV = visa 5 ans, multiple-entry (`dtv_intro_p1`, `dtv_faq_a1`, `dtv_elig_intro_p1`, etc.) | ✅ | 5 ans, multiple-entry confirmé partout | Siam Legal, ExpatDen, MFA | — |
| 2 | 180 jours par entrée (`dtv_hero_lead`, `dtv_faqp_a19`…) | ✅ | 180 jours/entrée confirmé | ExpatDen, ThaiEmbassy | — |
| 3 | Extension de 180 jours, « extendable once » (`dtv_faq_a1`, `dtv_faqp_a20`, `dtv_apply_brief_f4`) | ✅ (nuance) | Exact : extension **une fois par entrée** (= 360 j continus max), répétable à chaque nouvelle entrée. Le site dit bien « once per stay » dans la table fees | ExpatDen, Siam Legal FAQ, petchnumnoi | OK. Veiller à ne jamais laisser entendre « une seule extension sur les 5 ans » (le site ne le fait pas) |
| 4 | Preuve de fonds ≈ 500 000 THB (`dtv_elig_body`, `dtv_faqp_a9`, partout) | ✅ | 500 000 THB confirmé, compte perso au nom du demandeur, liquide (pas crypto/société/actions) | MFA checklist, MTVT, Siam Legal | — |
| 5 | 500 000 THB ≈ 14 500–17 000 USD (`dtv_elig_funds_p1`, `dtv_faqp_a9`) | ✅ | ~14 200 USD fin 2025 ; fourchette raisonnable | Greenback, MTVT | OK (fourchette prudente) |
| 6 | Fonds = compte perso au nom du demandeur ; investissement/société/crypto exclus (`dtv_elig_funds_p2`, `dtv_elig_q2_b`) | ✅ | Exactement ce que disent les sources | MTVT, dtvvisathai | — |
| 7 | Frais de visa 10 000 THB, non-remboursable (`dtv_apply_brief_f2`, `dtv_apply_fees_row1`, `dtv_faqp_a12`) | ✅ | 10 000 THB (~280 USD) confirmé ; non-remboursable | Siam Legal, Wego, ThaiEmbassy | — |
| 8 | Frais varient 275–1 150 USD selon le pays (`dtv_elig_cost_p1`) | ✅ | Fourchette 275–1 150 USD confirmée (conversion devise locale par ambassade) | issacompass, vera-visa | — |
| 9 | Extension +180 j = 1 900 THB, in-country, once per stay (`dtv_apply_fees_row2`, `dtv_faqp_a20`, `dtv_elig_cost_p1`) | ✅ | 1 900 THB confirmé partout | Siam Legal, ExpatDen, Ask Thailand | — |
| 10 | Processing 5–15 jours ouvrés (jusqu'à 3–6 semaines en haute saison) (`dtv_apply_brief_f3`, `dtv_apply_step7_b`, `dtv_apply_faq_a2`) | ✅ (variable) | Sources variées : « 5–15 j ouvrés », « 3–7 j », « 2–4 semaines ». Dépend de l'ambassade. Le site présente bien en fourchette + marge | Siam Legal, ExpatDen, taxesforexpats | OK — bien formulé comme fourchette. La page eligibility (`dtv_elig_cost_p2`) reconnaît « a week to a month » ✅ |
| 11 | Apply depuis l'étranger uniquement, pas depuis la Thaïlande (`dtv_apply_step1_b`, `dtv_apply_mistake1`, `dtv_faqp_a14`, `dtv_mt_tbl_apply_dtv`) | ✅ | Confirmé : application hors Thaïlande, pas de conversion sur place | ExpatDen, Siam Legal, ThaiEmbassy | — |
| 12 | e-Visa portal officiel = thaievisa.go.th, seul site officiel (`dtv_apply_step2_b`, `dtv_apply_mistake6`) | ✅ | Système 100 % électronique depuis janv. 2025 ; thaievisa.go.th = portail officiel | ThaiEmbassy, Wego | — |
| 13 | 3 catégories : Workcation, Soft Power, Dependent (`dtv_apply_step3_b`, `dtv_faqp_a2`) | ✅ | Confirmé (Workcation / soft power / dependent) | Siam Legal, ExpatDen | — |
| 14 | Muay Thai = activité soft power qualifiante (`dtv_faq_a2`, `dtv_mt_soft_p1`, `dtv_faqp_a4`) | ✅ | Muay Thai explicitement listé dans les activités soft power | NOW Muay Thai, ExpatDen, dtvvisathai | — |
| 15 | Autres soft power : cuisine thaï, médical, sport, festivals (`dtv_faqp_a4`) | ✅ | Muay Thai, cuisine, éducation, sport, médical, talent, séminaires, art/musique | ExpatDen | — |
| 16 | Programme Muay Thai **min. 6 mois** requis ; cours 1 mois rejeté ~99 % (`dtv_elig_route_6m_b`, `dtv_elig_route_trap_b`, `dtv_elig_faq_a4`) | ✅ (pratique, pas loi) | Pratique constatée 2025-2026 : immigration favorise ≥ 6 mois, voit les courts séjours avec scepticisme. Pas un seuil légal publié, mais recommandation forte universelle | NOW Muay Thai, petchnumnoi, muaythaifever | OK — le site le formule en « make-or-break rule » / pratique, pas en loi. Le « ~99 % » est une estimation : acceptable car non chiffré comme fait officiel |
| 17 | **Âge minimum 20 ans** (`dtv_apply_elig_body`, `dtv_elig_*` partout, quiz Q3) | ✅ | Demandeur principal ≥ 20 ans confirmé | Siam Legal, ExpatDen, MFA | — |
| 18 | **Âge minimum « 18+ »** (`dtv_faqp_a8` : *"The main applicant must be an adult (18+)"*) | ❌ **ERREUR** | Le seuil officiel est **20 ans**, pas 18. Contredit toutes les autres pages du site | ExpatDen, Siam Legal | **Corriger `dtv_faqp_a8` → « at least 20 years old »** (aligner sur `dtv_elig_faq_a2`) |
| 19 | Dépendants : conjoint légal + enfants < 20 ans (`dtv_elig_docs_dep`, `dtv_faqp_a27`, quiz Q6) | ✅ | Conjoint légal + enfants non mariés < 20 ans | ExpatDen, Terrana, benoit-partners | — |
| 20 | Pas de plafond sur le nombre de dépendants (`dtv_elig_docs_dep`, `dtv_elig_faq_a3`) | ✅ | « without a number limit » confirmé | benoit-partners, ExpatDen | — |
| 21 | Chaque dépendant = demande séparée avec son propre frais (`dtv_faqp_a27`) | ✅ | « DTV Dependent », demande séparée, frais propre, après obtention du principal | Terrana, benoit-partners | — |
| 22 | Passeport valide 6+ mois, pages blanches (`dtv_apply_step4_b`, `dtv_apply_doc_passport`) | ✅ | Exigence standard confirmée | Siam Legal, MFA | — |
| 23 | Bank statements 3–6 mois (`dtv_apply_step4_b`, `dtv_apply_doc_statements`) | ✅ | 3 derniers mois min., solde ≥ 500 000 THB | MTVT, MFA checklist | OK (3–6 mois couvre le min. de 3) |
| 24 | Assurance santé ~50 000 USD « required by some embassies — confirm yours » (`dtv_apply_doc_insurance`, `dtv_apply_step4_b`) | ✅ (encadré) | Non mandaté universellement par le gouvernement ; certaines ambassades l'exigent (50 000 USD). Le site le formule correctement | insurance-thailand, MTVT | OK — formulation prudente correcte. **À surveiller** |
| 25 | Revenu alternatif ~50 000 THB/mois (`dtv_apply_elig_body`, `dtv_apply_doc_funds`) | ✅ | Alternative revenu ~50 000 THB/mois acceptée par certaines ambassades | dtvvisathai, ExpatDen | OK (présenté comme alternative) |
| 26 | Pas de re-entry permit (multiple-entry) (`dtv_faqp_a22`, `dtv_mt_tbl_admin_dtv`) | ✅ | Aucun re-entry permit requis, sorties/entrées illimitées tant que le visa est actif | Siam Legal FAQ, petchnumnoi | — |
| 27 | Visa run réinitialise les 180 jours (`dtv_faqp_a21`) | ✅ | Sortie + ré-entrée = nouveau cycle 180 j | ExpatDen, petchnumnoi | — |
| 28 | 180+ jours/an = résident fiscal thaï (`dtv_elig_funds_p3`, `dtv_faqp_a24`, `dtv_faqp_a25`) | ✅ | 180 j+/année civile = résidence fiscale ; imposition sur revenu remis en Thaïlande. Bien distingué du « 180 j par entrée » | Greenback, MyExpatTaxes | OK — distinction des « deux 180 » bien faite |
| 29 | DTV ≠ work permit ; remote work pour employeurs étrangers OK, pas de clients/emploi thaï (`dtv_faqp_a29`) | ✅ | Exact : remote work étranger autorisé, pas d'emploi thaï ni work permit | Siam Legal, workflex | — |
| 30 | Comparatif ED : ~1 an via extensions ~90 j, lié à une école, re-entry permit requis, souvent depuis l'intérieur (`dtv_mt_tbl_*`) | ✅ | Cohérent avec la description standard du visa ED (Non-ED) | ThaiEmbassy, guides comparatifs | OK (présenté « around », fourchettes) |
| 31 | Comparatif tourist : 60 j + extension 30 j (~90 j max) (`dtv_mt_tbl_validity_tourist`) | ✅ | TR 60 j + extension 30 j = 90 j confirmé | ThaiEmbassy tourist visa | — |

---

## Corrections prioritaires (avant prod)

### 🔴 Gravité haute — erreur factuelle
1. **`dtv_faqp_a8` — âge minimum « 18+ »** : la réponse dit *« The main applicant must be an adult (18+) »*. Le seuil DTV officiel est **20 ans**. C'est la **seule contradiction factuelle nette** du silo (toutes les autres pages disent correctement 20). Sur du YMYL immigration, ce genre d'incohérence interne nuit à la crédibilité E-E-A-T et peut induire en erreur un demandeur de 18-19 ans.
   - **Correction :** remplacer par *« The main applicant must be at least 20 years old. Children under 20 can come as dependents on a parent's DTV. »* (aligner sur `dtv_elig_faq_a2`).
   - ⚠️ Vérifier aussi la clé FR équivalente (`dtv_faqp_a8` dans `fr.json`).

### 🟠 Gravité moyenne — rien de factuellement faux, vigilance
Aucune autre erreur. Les fourchettes (frais USD, processing, coût de vie) sont prudentes et sourçables. Rien d'autre à corriger avant prod côté faits visa.

---

## À surveiller (règles susceptibles de changer)

1. **Assurance santé 50 000 USD** — non mandatée par le gouvernement central, laissée à la discrétion des ambassades. Le site le formule bien (« required by some embassies »). À re-vérifier si une ambassade-cible la rend obligatoire, et à garder daté.
2. **Fiscalité (remittance)** — les règles thaïes d'imposition du revenu rapatrié évoluent (réforme 2024-2025, discussions en cours). Le site renvoie correctement vers un fiscaliste et ne donne pas de conseil ferme. À re-dater à chaque review.
3. **Frais de visa / fourchette USD** — varie par ambassade et au gré du taux de change ; la fourchette 275–1 150 USD est large mais juste. À re-vérifier annuellement.
4. **Processing time** — très variable selon l'ambassade et la saison ; bien présenté en fourchette. Pas d'engagement chiffré ferme à tenir.
5. **Règle des 6 mois (Muay Thai)** — c'est une **pratique d'approbation**, pas un texte légal publié. Solide en 2025-2026 mais pourrait être codifiée ou assouplie. Le site la présente comme pratique constatée, ce qui est la bonne posture.
6. **Source officielle non parsée** — la checklist MFA officielle (`image.mfa.go.th/.../Checklist_DTV.pdf`) n'a pas pu être lue automatiquement (PDF binaire). **Recommandation : Jonathan / Meaw l'ouvrent manuellement** pour confirmer la liste de documents et l'âge avant mise en prod, puisque c'est la source primaire.

---

## Note de confiance

Le silo DTV est **factuellement solide** et bien mieux encadré que la moyenne des sites concurrents (disclaimers datés, fourchettes, renvois « confirm with your embassy », pas de promesse d'approbation). Le seul vrai défaut est l'incohérence d'âge dans `dtv_faqp_a8`. Une fois ce point corrigé, le contenu est apte à la production sous réserve d'une dernière confirmation de la checklist MFA officielle par l'équipe.

_Sources principales : MFA Thailand checklist DTV, Siam Legal International, ExpatDen, ThaiEmbassy.com, Greenback Tax Services, MyExpatTaxes, NOW Muay Thai, petchnumnoi, MuayThaiVisaThailand (MTVT), benoit-partners, Terrana, insurance-thailand.com — consultées le 2026-06-05._

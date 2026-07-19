# Contact & intake — conversion (formulaires, WhatsApp, forfaits)

**Complexité : S · Statut : itératif** — système d'intake contact v2 (2026-06-05) → backend Web3Forms (2026-06-06) → **modal WhatsApp + forfaits long-stay sélectionnables (2026-07-19)**. Feature transverse, hors epic numéroté.

## Etat session 2026-07-19 (modal WhatsApp + forfaits long-stay)

**Fait :**
- **Modal WhatsApp au submit** (fini l'ouverture directe brutale) : nouveau `WhatsappSubmitModal.astro` (`<dialog>` natif, a11y + reduced-motion) ; `wa-form.ts` ouvre le modal (aperçu du message pré-rempli + bouton « Envoyer sur WhatsApp ») au lieu de `window.open`. WhatsApp ne s'ouvre plus qu'**au clic**. Fermeture → `form.reset()`, on reste sur la page. Fallback conservé si modal absent ; no-JS garde la bannière `?sent=1`. Branché dans **ContactForm** + **StayInquiryForm**.
- **Forfaits long-stay (DTV) ajoutés** : `site.pricing.longStay` (pack30 12 000 / pack50 17 000 / unlimited6 24 000 *populaire* / unlimited12 36 000). Coexiste avec le pricing court-terme.
- **Affichage cartes** : `LongStayPackages.astro` (réutilise `PricingCard`/`PricingTable` + nouvelle prop `cols={4}`) sur `/dtv-visa/long-stay-training` (`#packages`, doctrine « ne vend pas de package » levée), `/classes#pricing`, `/stay-train#packages`. CTA « Ask about this package » → deep-link `/contact?intent=dtv&package=<key>`.
- **Sélection dans le form** : l'intent **DTV** (jusqu'ici sans champ) a un dropdown package, pré-rempli via `?package=`, injecté dans le message WhatsApp (`Package: …`).
- **i18n** : ~14 clés EN+FR (`pricing_ls_*`, `contact_dtv_package`, `contact_modal_*`), parité OK, zéro em-dash, FR en « tu ».
- **Vérifs** : `npm run build` vert (47 pages, parité Paraglide OK). Aucun test e2e n'assertait l'ancien `window.open`.

**Prochain :** vérif visuelle Jonathan sur serveur live (modal `/contact` + `/stay-train#plan`, deep-link `?intent=dtv&package=unlimited6`, rendu des 4 cartes sur les 3 pages). Rien de bloquant.

**Pièges :**
- **Date-picker custom abandonné** (Jonathan s'est rétracté en cours de demande) — on garde les `input type="date"` natifs.
- **`site.pricing.longStay` est `as const`** → union hétérogène (`classes`/`unlimited`/`popular` pas sur tous les membres). Consommer via un type normalisé à champs optionnels (`LsPackage`) + cast `as readonly LsPackage[]`, sinon erreurs TS au build. Pattern dupliqué dans `ContactForm.astro` et `LongStayPackages.astro`.
- **`showModal()` n'est pas gesture-restreint** (contrairement à `window.open`) → OK en synchrone dans le handler submit. Le bouton « Envoyer sur WhatsApp » (`target="_blank"`) s'ouvre au clic = geste utilisateur, pas de popup bloquée.
- **`document.querySelector('dialog[data-wa-modal]')` global** : OK car ContactForm et StayInquiryForm ne coexistent jamais sur une même page (un seul modal par page).

**Commit :** [c97b9d3] feat(contact): modal WhatsApp au submit + forfaits long-stay sélectionnables

---

## Carte du code
> Mise à jour : 2026-07-19

| Fichier | Rôle |
|---------|------|
| `src/scripts/wa-form.ts` | Helper submit partagé : email Web3Forms en fond + ouverture du modal (ou fallback `window.open`). `opts.modal`, câblage close/backdrop/reset. |
| `src/components/sections/WhatsappSubmitModal.astro` | `<dialog>` de confirmation post-submit (aperçu message + bouton « Envoyer sur WhatsApp »). Rempli au runtime via `[data-wa-preview]`/`[data-wa-send]`. |
| `src/components/sections/ContactForm.astro` | Form intent-driven (class/stay/scooter/dtv/general). Intent DTV = dropdown forfait ; `?package=` preselect ; `buildText` branche dtv ; rend le modal + le passe au helper. |
| `src/components/sections/StayInquiryForm.astro` | Mini-form séjour inline `/stay-train#plan` (intent=stay figé). Rend le modal + le passe au helper. |
| `src/components/sections/LongStayPackages.astro` | Bloc cartes forfaits long-stay (données `site.pricing.longStay`), CTA deep-link `/contact?intent=dtv&package=`. Content-only, la page fournit le `<Section>`. |
| `src/components/sections/PricingTable.astro` | Grille de `PricingCard` ; prop `cols?: 3\|4` (défaut 3 ; 4 = forfaits long-stay, 4→2→1 responsive). |
| `src/config/site.ts` | `pricing.longStay` = 4 forfaits (`as const`, champs `classes`/`months`/`unlimited`/`popular` optionnels selon le membre). |
| `messages/{en,fr}.json` | Clés `pricing_ls_*`, `contact_dtv_package`, `contact_modal_*` (parité). |

### Décisions clés
- **Modal = confirmation** (JS actif) : remplace la redirection `?sent=1`, on reste sur la page. La bannière `?sent=1` ne sert plus qu'au fallback no-JS (POST natif Web3Forms).
- **Forfaits rattachés à l'intent DTV uniquement** (pas StayInquiryForm) — ce sont des packages « DTV package for Muay Thai ». Deep-link `?package=` force l'intent DTV.
- **Textes WhatsApp EN dans les 2 locales** (équipe anglophone, cohérent avec le reste du système d'intake).

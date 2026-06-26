# Plan d'action — Indexation Google

_Créé le 2026-06-26. Diagnostic via GSC URL Inspection API (`.seo-data/index-wildcatmuaythai-com-2026-06-26.json`)._

## Constat

- **13 / 36 pages indexées**, 23 en état **« URL is unknown to Google »** (jamais découvertes, jamais crawlées).
- **Aucun blocage technique** : 200 partout, pas de noindex, robots.txt propre, sitemap soumis et lu, liens internes dans le HTML statique, hreflang correct.
- Cause réelle : **site neuf (~3 semaines) + zéro backlink entrant** → budget de crawl minuscule → Google indexe au compte-gouttes.
- Le travail est externe (GSC + backlinks), **pas dans le code**.

> ℹ️ **nofollow ≠ inutile pour ce problème.** Mon objectif ici est l'*indexation* (faire découvrir les pages), pas encore le ranking. Google crawle quand même les liens nofollow et ils amènent du trafic de référence qui signale l'existence de la page. Le lien nofollow de ChiangMaiLocator n'est donc pas perdu. Le dofollow comptera surtout plus tard, pour l'autorité/ranking.

---

## Action 1 — Demander l'indexation dans GSC (à faire en premier)

GSC → **Inspection de l'URL** → coller l'URL → **Demander l'indexation**. Limite ~10-12/jour, donc étalé sur 2 jours. Pousse la page dans la file de crawl sous 24-72h.

### Jour 1 — EN prioritaires + home FR
- [ ] /en/dtv-visa/eligibility
- [ ] /en/dtv-visa/faq
- [ ] /en/dtv-visa/muay-thai
- [ ] /en/dtv-visa/long-stay-training
- [ ] /en/classes/beginners
- [ ] /en/stay-train/scooter-rental
- [ ] /en/fighters
- [ ] /en/about
- [ ] /en/blog
- [ ] /fr  _(toute la branche FR est inconnue de Google)_

### Jour 2 — FR
- [ ] /fr/dtv-visa
- [ ] /fr/dtv-visa/eligibility
- [ ] /fr/dtv-visa/faq
- [ ] /fr/dtv-visa/muay-thai
- [ ] /fr/dtv-visa/long-stay-training
- [ ] /fr/classes
- [ ] /fr/classes/beginners
- [ ] /fr/stay-train
- [ ] /fr/stay-train/scooter-rental
- [ ] /fr/about
- [ ] /fr/about/coaches
- [ ] /fr/contact
- [ ] /fr/fighters

---

## Action 2 — Backlinks (la cause structurelle)

Objectif : poser quelques signaux pour faire monter le budget de crawl. Ordre = impact/effort.

### Priorité haute — gratuit, fait par Jonathan
- [x] **Google Business Profile** — lien `wildcatmuaythai.com` sur la fiche. ✅ déjà fait.
- [x] **Bio Instagram** → lien site. ✅ déjà fait.
- [ ] **Bio / À-propos Facebook** → lien site. (pas encore fait)
- [ ] **TripAdvisor** — créer/revendiquer la fiche « Wildcat Muay Thai » (catégorie activité/cours). Référence forte sur le voyage.

> ⚠️ **Pourquoi GBP + Insta ne suffisent pas pour les 23 pages.** La racine `wildcatmuaythai.com` fait un **301 → `/en`**. Ces 2 liens pointent donc la home (et sont **nofollow** : bouton GBP = redirection, bio Insta = nofollow). Résultat : ils ont fait indexer la home + une 1ʳᵉ fournée EN (= les 13), mais (a) ils ne pointent qu'**une** URL → ne signalent pas les pages profondes, (b) nofollow → ne transmettent pas l'autorité qui creuserait le crawl, (c) tout converge sur `/en` → le FR reste invisible. **Empiler du nofollow vers la home ne débloquera pas les 23.** Pour elles : Action 1 (Request Indexing) d'abord ; puis viser du **dofollow** réel (annuaires niche, listicles qui linkent vraiment) pour la profondeur durable.

### Annuaires Muay Thai (niche, très pertinents)
- [ ] **MuayThaiAdvisor** — section « Register a Business → Register Gym ». Contact : info@muaythaiadvisor.com. https://muaythaiadvisor.com/
- [ ] **MuayThaiMap** — annuaire mondial de gyms. Pas de bouton public visible → les contacter via le site pour être listé. https://www.muaythaimap.com/
- [ ] **NOW Muay Thai** — ils tiennent des listicles « Best gyms in Chiang Mai ». Les contacter pour figurer. https://www.nowmuaythai.com/blog/the-best-muay-thai-gyms-in-chiang-mai
- [ ] **TopMuayThai / Muaythai.com** — guides gyms Chiang Mai, pitch pour inclusion. https://topmuaythai.com/ · https://muaythai.com/best-muay-thai-gyms-in-chiang-mai/

### Plateformes de réservation / agrégateurs (lien + leads)
- [ ] **Tripaneer / BookMuayThai** — listent les camps avec accommodation. Modèle commission, mais lien + résa. https://www.tripaneer.com/

### Annuaires Chiang Mai / expat (citations locales)
- [ ] **Expat.com** — Chiang Mai business directory, listing gratuit. https://www.expat.com/en/business/asia/thailand/chiang-mai/
- [ ] **ChiangMai.net** — business directory. https://www.chiangmai.net/business-directory
- [ ] **MapsNMore** — annuaire business expat SE Asia. https://mapsnmore.com/
- [ ] **Farangmart** — petites annonces / listings Thaïlande. https://farangmart.co.th/

### Niche DTV / soft power (très ciblé pour le silo DTV)
- [ ] **dtvvisathai.com** — guides DTV soft power Muay Thai, contacter pour mention/listing. https://www.dtvvisathai.com/
- [ ] **muaythaivisathailand.com** — contenu DTV étudiants. https://www.muaythaivisathailand.com/

### Communautés (nofollow mais découverte + trafic)
- [ ] **Reddit** r/MuayThai, r/chiangmai, r/ThailandTourism — réponses utiles avec lien quand c'est pertinent (pas de spam).
- [ ] **8limbs.us forum** — fil « gyms I recommend in Thailand ».

---

## Action 3 — Vérifs GSC
- [ ] Sitemaps → confirmer `sitemap-index.xml` marqué **Réussite** avec ~36 URLs découvertes.
- [ ] Re-lancer le diagnostic dans 1-2 semaines : `python ~/.claude/skills/seo-index-diagnose/scripts/cli.py --site "sc-domain:wildcatmuaythai.com"` et comparer le ratio indexées.

---

## Suivi

| Date | Indexées / 36 | Note |
|------|---------------|------|
| 2026-06-26 | 13 | baseline (8 affichées dans le rapport GSC) |

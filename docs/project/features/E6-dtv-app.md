# E6 — Mini-app DTV

**Complexité : L · Statut : TODO · ⚠️ dépend de Q1 (storage)**

## Description
Formulaire multi-étapes localisé pour déposer un dossier DTV : infos perso → situation → documents → récap. Soumission = upload fichiers (storage privé) + email Resend + WhatsApp deep link pré-rempli.

## Flow (PRD Story 1)
1. `/[lang]/dtv-visa/apply`
2. Étape 1 — Infos perso (nom, nationalité, email, tel, WhatsApp)
3. Étape 2 — Situation (pays résidence, date arrivée, durée)
4. Étape 3 — Documents (passeport, photo ID, justif revenus optionnel)
5. Étape 4 — Récap + consentement RGPD/PDPA
6. Submit → storage + email confirmation + `wa.me` pré-rempli (nom + réf)
7. Page de confirmation (prochaines étapes)

## Tâches
- [ ] Composant `DTVStepper` (barre progression, validation par étape, pas de perte de champs)
- [ ] Validation client + serveur (champs requis, types/tailles fichiers : PDF/JPG/PNG, max 10MB)
- [ ] Route `POST /api/dtv/submit` (multipart) → upload storage privé
- [ ] Intégration storage (Q1 : Drive **ou** Supabase) — dossier `[date]_[client]_[ref]/` + `metadata.json`
- [ ] Email confirmation via Resend (ne contient PAS les fichiers, juste la réf)
- [ ] Génération du lien WhatsApp + ouverture auto
- [ ] Page confirmation localisée
- [ ] Checkbox consentement + mention légale (Q RGPD/PDPA)

## Critères d'acceptation (PRD)
- [ ] Form dans toutes les langues
- [ ] Fichiers uploadés en HTTPS, accès privé
- [ ] Email reçu < 2 min
- [ ] WhatsApp pré-rempli (nom + réf)
- [ ] Validation avant étape suivante

## Edge cases
- Upload échoue → erreur explicite, retry sans perdre les champs.
- Email échoue → dossier quand même enregistré + owner notifiée.
- Abandon mi-parcours → pas de sauvegarde serveur (V1), données perdues.

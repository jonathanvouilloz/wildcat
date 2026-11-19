# Reprise : Wildcat Muay Thai
Mise à jour : 2026-11-20

## Où on en est
- Blog E8 : tous les articles de novembre et décembre sont écrits et programmés par `publishDate` (`docs/editorial-calendar.md` §Q4). Restent à sortir : `mongkhon-bandeau-boxe-thai` (26/11), `muay-thai-weight-loss` (01/12), `wai-kru-ram-muay` (03/12), `muay-thai-vs-taekwondo` (15/12).
- Session 19-20/11, poussée sur `main` :
  - formulaires de contact : une seule question forfait, champ `package` (`DECISIONS.md` 2026-11-19) ;
  - preuve sociale sur tout le site, `ProofBar` + `site.proof` (`DECISIONS.md` 2026-11-20).

## Prochaine action
1. Après le 25/11 : passer l'article Yi Peng (EN+FR) au passé ou le laisser vieillir jusqu'au refresh 2027 ; le maillage entrant se limite à `best-time-train` (EN).
2. Le 03/12 : repointer le lien wai kru de `mongkhon-bandeau-boxe-thai` vers `/fr/blog/wai-kru-ram-muay`.
3. Refresh prévus : burning season EN+FR fin novembre, silo DTV début décembre (`editorial-calendar.md` § Refresh planifiés).

## Vérifications
- `npm ci` puis `npm run build` : Complete (après chaque commit de la session).
- HTML généré : libellés forfait EN/FR avec 8 000/28 000 THB ; `ProofBar` présent sur home (4), `/dtv-visa` (3), `/contact` (3), `/about` (2), articles (2).
- Non vérifié : rendu visuel dans un navigateur, test Playwright `tests/e2e-contact-multistep.py` (adapté au champ `package` mais pas lancé), déploiement Cloudflare après le push, lien `share.google` de la fiche Google (pas ouvert).
- `doc-reviewer` et `doc-check` non lancés : pas de `harness.toml` dans ce dépôt.

## État non commité
Rien après le commit `docs:` de fin de session. Branche `main`, à jour avec `origin/main`.

## Bloquants et actions du propriétaire
- Yi Peng publié le 19/11 : règles 2026 lues dans deux résumés de presse (Via Chiang Mai, CNX Mag), pas dans l'arrêté thaï.
- Chiffres de `site.proof` à tenir à jour à la main (avis Google, personnes entraînées, DTV approuvés).
- Clé Search Console : toujours absente (`cerveau/10-Projets/wildcat/wildcat-human.md`).
- Meaw : conditions scooter, zones interdites aux lanternes 2026, détails Stay & Train (`docs/checklist.md` §B, §D).

## En production
- Cloudflare Workers (Worker `wildcat`, Workers Builds sur `main`, rebuild quotidien pour les `publishDate`). Dernier push : `509cb08` (lien fiche Google).
- `/api/inquiry` tourne côté serveur (copie des demandes vers Telegram et Resend) ; le reste du site est statique.

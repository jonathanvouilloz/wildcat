# E10 — Déploiement Vercel

**Complexité : S · Statut : TODO · ⚠️ dépend de Q5 (domaine)**

## Description
Mise en production sur Vercel avec previews par branche et variables d'environnement.

## Tâches
- [ ] Connecter le repo à Vercel (adapter Astro Vercel)
- [ ] Configurer les env vars (Sanity, Resend, storage DTV, WhatsApp, DeepL, PUBLIC_SITE_URL)
- [ ] Previews automatiques sur branches feature
- [ ] Domaine custom (Q5) + DNS + HTTPS
- [ ] Vérifier sitemap/robots/hreflang en prod
- [ ] Webhook Sanity → rebuild (ISR ou revalidation) pour le contenu

## Environnements (PRD §12)
| Env | URL | Déclencheur |
|-----|-----|-------------|
| Local | localhost:4321 | dev |
| Preview | pr-xxx.vercel.app | push branche |
| Production | (domaine Q5) | merge main |

## Notes / edge cases
- Routes API DTV/contact = serverless functions Vercel (SSR).
- Secrets storage DTV (Drive JSON ou Supabase service key) : env Vercel uniquement, jamais committés.

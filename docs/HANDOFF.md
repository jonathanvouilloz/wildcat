# HANDOFF — 2026-07-24

## Features actives
| Feature | Fichier | Statut |
|---------|---------|--------|
| Routeur intake (Telegram + auto-réponse) | docs/features/contact-intake-router.md | **DEV DONE** (reste env Vercel + domaine Resend) |
| E8 Blog & contenu | docs/features/E8-blog-content.md | EN COURS |
| Contact & intake (conversion) | docs/features/contact-intake.md | itératif (DONE 2026-07-19) |

## Reprendre ici
Routeur intake : dev terminé + testé en local. **Action Jonathan** = poser les 4 vars sur Vercel (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `RESEND_API_KEY`, `MISTRAL_API_KEY`, sans `PUBLIC_`) + vérifier le domaine Resend + remplacer `REPLY_TO` par l'inbox réelle de Meaw.
Sinon E8 — backlog cluster suivant (`structure-blog.md`, ⚠️ burning season M4 avant décembre).
Commit : [à venir] feat(contact): routeur intake Telegram + auto-réponse

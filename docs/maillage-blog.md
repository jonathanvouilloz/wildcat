# Maillage interne du blog — état au 2026-08-28

Audit et passe de maillage mesurés sur le **build** (`dist/client`), pas sur les sources.
Rejouable : `npm run build` puis `python tests/audit-links.py`.

| Indicateur (EN) | Avant | Après |
|---|---|---|
| Liens service → blog | **2** | **37** |
| Liens éditoriaux article → article | 42 | **58** |
| Articles orphelins (0 lien éditorial entrant) | **7** | **0** |
| Liens internes cassés dans les articles | 3 (FR) | **0** |

Le FR est laissé de côté volontairement (2 articles publiés) : l'architecture le rattrape
toute seule, voir §2.

---

## 1. Liens cassés — réglé

Cause structurelle : `rehypeLocalizeInternalLinks` (`astro.config.mjs`) préfixe **aveuglément**
tout `href` racine-relatif d'un article avec la locale du fichier, sans vérifier que la cible
existe. Les slugs blog étant traduits par locale (`src/content.config.ts`), un article FR qui
cite un slug EN part droit en 404.

Trois liens morts, tous dans `src/content/blog/fr/meilleur-camp-muay-thai-chiang-mai.mdx` :

| Ligne | Lien d'origine | Ce que ça donnait | Correctif |
|---|---|---|---|
| 215 | `/blog/muay-thai-pour-les-femmes` | `/fr/blog/…` — fichier FR `draft: true`, jamais construit | `/classes/beginners` |
| 287 | `/blog/muay-thai-training-thailand-cost` | `/fr/blog/…` — pas de version FR | `/en/blog/…` + « (en anglais) » |
| 321 | `/blog/chiang-mai-vs-phuket-muay-thai` | `/fr/blog/…` — pas de version FR | `/en/blog/…` + « (en anglais) » |

**Règle pour les futurs articles FR.** Une page FR couvre le sujet → on pointe la page FR.
Sinon → on pointe l'article EN en `/en/…` explicite, avec la mention de langue dans la phrase.
Jamais un slug EN nu dans un article FR.

`src/content/blog/fr/muay-thai-pour-les-femmes.mdx` reste en `draft: true` avec une
`publishDate` échue (2026-05-28). S'il est publié, la ligne 215 peut retrouver sa cible
d'origine, plus juste sur le fond. Tâche ouverte côté Jonathan.

---

## 2. Le maillage retour — le composant `ReadNext`

Avant : **2 liens service → blog** dans tout le site, dont un seul écrit à la main
(`dtv-visa/long-stay-training.astro`, gardé par un `lang === 'en'` codé en dur), plus le feed
de catégorie de `/chiang-mai-guide`. Le blocage n'était pas éditorial : il n'existait aucun
moyen de poser un lien service → blog sans écrire deux clés de message par lien et gérer la
locale à la main.

Trois briques :

- **`src/lib/blog-cards.ts`** — `toBlogCards(lang, posts)` + `categoryLabels()`. La construction
  des props BlogCard (cover `astro:assets`, date par locale, label de catégorie) était **copiée
  à l'identique dans 3 fichiers** ; les 3 la consomment désormais, `ReadNext` est le quatrième.
- **`getPostsByKeys(lang, keys)`** (`src/lib/blog.ts`) — résout des `translationKey` dans l'ordre
  demandé, **en omettant les clés absentes de la locale**.
- **`src/components/sections/ReadNext.astro`** — grille de 3 cartes avant le `CtaBanner`. Ne rend
  rien en dessous de `min` articles (défaut 2). 3 clés de message au total, pas 3 par lien :
  l'ancre est le titre de l'article, déjà localisé par nature.

**Conséquence pour le FR** : sur `/fr/*` le bloc ne rend que ce qui existe, donc rien aujourd'hui,
sauf `/fr/chiang-mai-guide` où 2 des 3 clés ont une traduction. Aucun `lang === 'en'` en dur,
aucun 404 possible, et le jour où une traduction FR arrive le lien apparaît tout seul.

### Placement (13 pages)

| Page | Articles (translationKey) |
|---|---|
| `/dtv-visa` | dtv-visa-new-requirements-2026 · dtv-visa-cost-breakdown · dtv-visa-agent-worth-it |
| `/dtv-visa/eligibility` | dtv-visa-proof-of-funds · dtv-visa-new-requirements-2026 · dtv-visa-refund-if-rejected |
| `/dtv-visa/how-to-apply` | dtv-visa-new-requirements-2026 · dtv-visa-agent-worth-it · dtv-visa-refund-if-rejected |
| `/dtv-visa/faq` | dtv-visa-cost-breakdown · dtv-vs-tourist-visa-runs-cost · ed-visa-vs-dtv |
| `/dtv-visa/muay-thai` | cheapest-dtv-soft-power-activity · muay-thai-gym-dtv-overcharging · ed-visa-vs-dtv |
| `/dtv-visa/long-stay-training` | dtv-visa-cost-breakdown · muay-thai-training-thailand-cost · burning-season |
| `/classes` | muay-thai-vs-kickboxing · muay-thai-self-defense · wai-kru-ram-muay-explained |
| `/classes/beginners` | muay-thai-gear-beginners · muay-thai-stance · learn-muay-thai-at-home |
| `/stay-train` | best-muay-thai-camps-chiang-mai · muay-thai-training-thailand-cost · best-muay-thai-camps-thailand |
| `/about` | wai-kru-ram-muay-explained · muay-thai-headband-mongkhon · muay-thai-self-defense |
| `/about/coaches` | wai-kru-ram-muay-explained · muay-thai-headband-mongkhon |
| `/fighters` | muay-thai-headband-mongkhon · wai-kru-ram-muay-explained |
| `/chiang-mai-guide` | best-muay-thai-camps-chiang-mai · chiang-mai-vs-bangkok · burning-season |

Écartées : la home (demanderait une vraie section design, pas un bloc générique), `/contact`,
`/stay-train/scooter-rental` (rattachement thématique trop mince).

---

## 3. Les 7 orphelins — 16 liens éditoriaux in-body

Le bloc `ReadNext` reste un lien de pied de page ; le signal fort est le lien contextuel dans le
corps du texte. Chaque lien a été posé **là où l'article hôte parlait déjà du sujet**, jamais plaqué.

| Orphelin | Liens entrants ajoutés (hôte → angle du lien) |
|---|---|
| `dtv-visa-new-requirements-2026` | cost-breakdown (le certificat de casier coûte et prend des semaines) · agent-worth-it (aucun agent ne contourne la règle de nationalité) · refund-if-rejected (deux façons de plus d'être rejeté) · gym-dtv-overcharging (aucun gym ne produit ce certificat) · proof-of-funds (la règle des 500 000 THB n'a pas bougé, deux autres conditions oui) |
| `best-muay-thai-camps-thailand` | chiang-mai-vs-bangkok · chiang-mai-vs-phuket · muay-thai-training-thailand-cost (comparer les camps, pas les villes) |
| `best-muay-thai-camps-chiang-mai` | chiang-mai-vs-phuket · best-muay-thai-camps-thailand |
| `burning-season-chiang-mai` | best-muay-thai-camps-chiang-mai · best-muay-thai-camps-thailand (vérifier le calendrier avant de réserver) |
| `muay-thai-self-defense` | muay-thai-vs-kickboxing · muay-thai-for-women |
| `muay-thai-vs-kickboxing` | muay-thai-self-defense · learn-muay-thai-at-home · muay-thai-stance-basics (la garde est là où les deux styles divergent) |
| `wai-kru-ram-muay-explained` | muay-thai-headband-mongkhon (le mongkhon se porte pendant la cérémonie) |

Au passage, les **3 articles sans CTA `/contact`** (`muay-thai-for-women`,
`learn-muay-thai-at-home`, `muay-thai-gear-beginners`) en ont un : ils finissaient tous les trois
sur « message us on WhatsApp » en texte brut, sans lien.

---

## 4. Ce qui est sain

0 lien interne mort dans les articles, 0 ancre morte, sitemap cohérent (60 `<loc>`), hreflang
propre sur les pages publiques. Les 2 liens cassés que remonte encore `tests/audit-links.py` sont
préexistants et sur des pages internes noindex hors sitemap (`/home-test-loading` et
`/styleguide` : leur `LangSwitcher` pointe une variante FR qui n'existe pas).

---

## 5. Hors maillage — pris en charge par Jonathan

- **26 images inline manquantes** sur 14 articles : `public/images/blog/` n'existe pas, les
  images sont cassées en prod. Déjà suivi dans `wildcat-human.md`.
- **Prix Wildcat contradictoires** dans `best-muay-thai-camps-chiang-mai` (EN et FR), ligne 287 :
  « drop-in 400 THB, monthly from 8 000 THB », alors que le tableau de la ligne 64 du même
  article dit 350 / 5 000.
- **21 articles EN sans traduction FR.**

## 6. `getRelated` — non traité

`src/lib/blog.ts` : même catégorie d'abord, puis fallback sur tous les articles de la locale par
date, donc jamais 0 résultat. Deux effets de bord persistants : les catégories à 1 article
(`chiang-mai-life`, `benefits`) reçoivent 3 suggestions venues entièrement du fallback ; et en FR,
avec 2 articles publiés, chaque article n'obtient qu'1 carte dans une grille prévue pour 3.
Volumétrie EN : `visa` 9 · `choosing-a-camp` 5 · `beginners` 4 · `culture` 3 · `chiang-mai-life` 1 ·
`benefits` 1.

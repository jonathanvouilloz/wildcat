# Trailing slash & canonical URL — diagnostic, fix, et leçon SEO

> Cas réel rencontré sur Wildcat (Astro 6 SSG + i18n `/en` `/fr`, hébergé Vercel), le
> 2026-06-13. Document autonome : symptôme → concepts → diagnostic → causes → impact →
> fix → vérification → checklist réutilisable. Écrit pour servir aussi de matière à une
> vidéo (sujet "le piège trailing-slash en SEO multilingue statique").

---

## 1. Le symptôme

Sur le site, **deux URLs servaient la même page** :

- `https://wildcatmuaythai.com/en` (sans slash)
- `https://wildcatmuaythai.com/en/` (avec slash)

Les deux renvoyaient un **200 OK** avec un contenu identique, **sans aucune redirection
de l'une vers l'autre**. Et le `<link rel="canonical">` de la page ne correspondait pas à
la forme vers laquelle pointaient les liens internes du site. Bref : une page, plusieurs
adresses, et un canonical qui désignait une forme que personne ne suivait réellement.

C'est l'archétype du **duplicate content auto-infligé** : techniquement invisible pour un
humain, mais une source de bruit pour un moteur de recherche.

---

## 2. Les concepts en jeu (rappel)

Pour comprendre pourquoi ça arrive, il faut quatre notions.

### a. Trailing slash
Le `/` final d'une URL. `/en` et `/en/` sont, pour un serveur, **deux URLs différentes**.
Rien n'oblige un serveur à les traiter pareil. La bonne pratique SEO est d'en choisir
**une seule** comme forme canonique et de **301/308 rediriger** l'autre vers elle.

### b. `build.format` (Astro)
Comment Astro écrit les fichiers HTML sur le disque :
- `'directory'` (défaut) : la page `/en/classes` devient le fichier `dist/en/classes/index.html`.
  Servie naturellement à `/en/classes/` **et** `/en/classes` par la plupart des hébergeurs.
- `'file'` : la page devient `dist/en/classes.html`, servie à `/en/classes`.

### c. `trailingSlash` (Astro)
La **politique** : Astro propose trois valeurs.
- `'ignore'` (**défaut**) : Astro ne tranche pas. Il ne force rien, ne redirige rien.
- `'always'` : la forme canonique a un slash final (`/en/`).
- `'never'` : la forme canonique n'a **pas** de slash final (`/en`).

Cette politique influence **deux choses** : (1) ce que `Astro.url.pathname` retourne au
build (donc ce que ton canonical contient), et (2) ce que l'adaptateur d'hébergement
génère comme règle de redirection.

### d. Canonical & hreflang
- `<link rel="canonical" href="…">` : « voici l'URL officielle de cette page ». Sert à
  consolider les signaux quand plusieurs URLs servent le même contenu.
- `<link rel="alternate" hreflang="fr" href="…">` : « la version FR de cette page est ici ».
  Idéalement, les hreflang pointent vers les URLs **canoniques** des autres langues.

### e. Le point crucial en SSG : qui fait la redirection ?
En statique, **Astro ne tourne pas à l'exécution**. Il ne peut donc pas rediriger
`/en/` → `/en` lui-même : il n'y a pas de serveur Astro pour intercepter la requête.
**C'est l'hébergeur (Vercel) qui doit appliquer le 301/308.** Et Vercel ne le fait que si
on le lui dit — via le fichier `.vercel/output/config.json` que **l'adaptateur Astro
génère au build**. Si l'adaptateur n'écrit pas la règle, Vercel sert les deux formes en 200.

---

## 3. Le diagnostic exact (état AVANT le fix)

Aucune politique `trailingSlash` n'était définie → Astro était sur le défaut **`'ignore'`**.
Trois sources qui devraient être alignées **divergeaient** :

| Élément | Forme émise | Source |
|---|---|---|
| Canonical / hreflang / og:url | `…/en/` **AVEC** slash | `src/layouts/BaseLayout.astro:47` (`new URL(Astro.url.pathname, base)`) |
| Liens internes (nav, footer, CTA, blog) | `…/en/classes` **SANS** slash | `localePath()` `src/lib/routes.ts:13`, `blogPath()` `src/lib/blog.ts:33` |
| Redirect racine `/` → | `/en` **SANS** slash | `astro.config.mjs` (`redirects: { '/': '/en' }`) |

Preuve, dans le build d'alors :

```html
<!-- dist/en/index.html -->
<link rel="canonical" href="https://wildcatmuaythai.com/en/">   <!-- avec slash -->
<meta property="og:url" content="https://wildcatmuaythai.com/en/">
```

```jsonc
// .vercel/output/config.json (AVANT) — aucune règle trailing slash
{
  "version": 3,
  "routes": [
    { "src": "^/$", "headers": { "Location": "/en" }, "status": 301 },
    { "handle": "filesystem" },
    { "src": "^/_astro/(.*)$", "headers": { "cache-control": "…immutable" }, "continue": true },
    { "src": "^/.*$", "dest": "/404.html", "status": 404 }
  ]
}
```

Conséquences concrètes :

1. **Pas de 301 d'enforcement** → `/en` et `/en/` tous deux en 200. URL dupliquée accessible.
2. Google crawle les **liens internes** (`/en/classes`, sans slash) → arrive sur une page
   200 dont le canonical dit `/en/classes/` (avec slash). **Self-canonical en désaccord à
   chaque navigation interne du site.**
3. La racine fait `/` → 301 `/en` (sans slash) → page dont le canonical dit `/en/` →
   un mismatch de plus dès la home.

---

## 4. Pourquoi ça arrive (la cause racine)

Deux mécanismes se combinent quand on laisse `trailingSlash: 'ignore'` :

1. **Le canonical hérite d'un slash « fantôme ».** Avec `build.format: 'directory'` (défaut)
   et trailingSlash non forcé à `'never'`, `Astro.url.pathname` au build inclut le slash
   final (`/en/`). Le canonical, construit avec `new URL(Astro.url.pathname, base)`
   (`BaseLayout.astro:47`), hérite donc du slash — alors que rien d'autre dans le code
   n'en met.

2. **L'adaptateur ne pose aucune règle de redirection en mode `'ignore'`.** Dans le code de
   l'adaptateur Vercel (`node_modules/@astrojs/vercel/dist/index.js`, ~ligne 357) :

   ```js
   if (_config.trailingSlash && _config.trailingSlash !== "ignore") {
     trailingSlash = _config.trailingSlash === "always";   // true | false
   }
   // … cette valeur n'est passée à la config Vercel QUE si elle est définie
   ```

   En `'ignore'`, `trailingSlash` reste `undefined` → l'adaptateur n'écrit **rien** dans
   `config.json` → Vercel sert les deux formes sans arbitrage.

Autrement dit : le défaut `'ignore'` est un **non-choix** qui laisse trois sous-systèmes
(canonical, liens, hébergeur) décider chacun dans leur coin — et ils ne décident pas pareil.

---

## 5. Ce que ça peut causer (impact SEO)

Aucun de ces effets n'est une catastrophe immédiate (un canonical bien posé absorbe le gros
du risque), mais ils s'additionnent :

- **Duplicate content accessible** : deux URLs 200 pour le même contenu. Google doit choisir,
  et il peut choisir une forme différente de ton canonical (le canonical est un *signal*,
  pas un ordre).
- **Self-canonical en désaccord** : sur chaque page, le canonical désigne une URL que les
  liens internes ne pointent jamais. Signal contradictoire, confiance réduite dans le canonical.
- **Crawl budget gaspillé** : le bot peut crawler les deux formes, doublant le travail pour
  zéro contenu nouveau. Sur un petit site c'est marginal ; sur un gros, ça compte.
- **Dilution des signaux de lien (PageRank)** : si des backlinks externes ou internes
  pointent moitié `/en/classes`, moitié `/en/classes/`, l'autorité se répartit sur deux URLs
  au lieu de se consolider sur une.
- **Ambiguïté hreflang** : si les hreflang (`/en/`, `/fr/`) ne correspondent pas exactement
  aux URLs réellement servies et canoniques, le ciblage linguistique perd en fiabilité.
- **Rapport "Duplicate, Google chose different canonical"** possible dans la Search Console.

---

## 6. Le fix : `trailingSlash: 'never'`

Une ligne dans `astro.config.mjs` :

```js
export default defineConfig({
  site: 'https://wildcatmuaythai.com',
  trailingSlash: 'never',   // ← le fix
  i18n: { /* … */ },
  // …
});
```

### Pourquoi `'never'` et pas `'always'` ?

Parce que **tout le reste du site était déjà sans slash** — `'never'` aligne donc tout sans
toucher une ligne de code applicatif :

| Source | Forme | Action requise avec `'never'` |
|---|---|---|
| `localePath()` (`routes.ts:13`) → `/en/classes` | sans slash | ✅ rien |
| `blogPath()` / `getAlternates()` (`blog.ts:33`) → `/en/blog/slug` | sans slash (via `new URL().href`) | ✅ rien |
| redirect racine `/` → `/en` | sans slash | ✅ rien |
| RSS `src/pages/[lang]/blog/rss.xml.ts` | fichier `.xml` (extension) | ✅ non concerné par trailingSlash |
| canonical / hreflang / og:url / sitemap | basculent en sans slash **automatiquement** | ✅ suivent `Astro.url.pathname` |

`'always'` aurait fait l'inverse : réécrire `localePath`, le redirect racine, et gérer le
placement du slash avant les ancres (`/en/classes/#schedule`) — plus de surface de risque
pour le même résultat. `build.format` reste `'directory'` (inutile d'y toucher : les fichiers
restent `dist/en/index.html`, le pathname perd juste son slash).

### L'effet en chaîne (automatique)

1. `BaseLayout.astro` → canonical/hreflang/og:url **sans** slash.
2. `@astrojs/sitemap` lit la config Astro → URLs du sitemap **sans** slash.
3. L'adaptateur Vercel détecte `trailingSlash !== 'ignore'` → écrit la règle de redirection
   dans `.vercel/output/config.json`.

---

## 7. Vérification (état APRÈS le fix)

Après `npm run build` :

```jsonc
// .vercel/output/config.json (APRÈS) — la règle d'enforcement apparaît EN PREMIER
{
  "version": 3,
  "routes": [
    { "src": "^/(.*)/$", "headers": { "Location": "/$1" }, "status": 308 },  // ← strip slash
    { "src": "^/$",      "headers": { "Location": "/en" }, "status": 301 },
    { "handle": "filesystem" },
    { "src": "^/_astro/(.*)$", "headers": { "cache-control": "…immutable" }, "continue": true },
    { "src": "^/.*$", "dest": "/404.html", "status": 404 }
  ]
}
```

La règle `^/(.*)/$` → `/$1` en **308** redirige toute URL avec slash final vers sa version
sans slash : `/en/` → `/en`, `/en/classes/` → `/en/classes`, etc. (Le 308 = redirection
permanente qui **préserve la méthode HTTP** ; équivalent SEO du 301.)

Canonicals après build (tous cohérents, sans slash, sur tous les niveaux) :

```html
<!-- dist/en/index.html -->        <link rel="canonical" href="https://wildcatmuaythai.com/en">
<!-- dist/en/classes/index.html --><link rel="canonical" href="https://wildcatmuaythai.com/en/classes">
<!-- dist/en/blog/index.html -->   <link rel="canonical" href="https://wildcatmuaythai.com/en/blog">
```

Hreflang `/en/classes` (symétriques, sans slash) :

```html
<link rel="alternate" hreflang="en"        href="https://wildcatmuaythai.com/en/classes">
<link rel="alternate" hreflang="fr"        href="https://wildcatmuaythai.com/fr/classes">
<link rel="alternate" hreflang="x-default" href="https://wildcatmuaythai.com/en/classes">
```

Sitemap : **zéro** URL avec slash final (vérifié sur `dist/sitemap-0.xml`).

### À vérifier en réel, une fois déployé (Jonathan)
- `curl -I https://wildcatmuaythai.com/en/` → doit renvoyer `308` + `Location: …/en`.
- `curl -I https://wildcatmuaythai.com/en` → doit renvoyer `200`.
- (Le `.vercel/output/config.json` prouve la règle ; le test live confirme que Vercel
  l'applique.)

---

## 8. La leçon, généralisée (checklist réutilisable)

Pour **tout site statique (SSG) multilingue**, ces quatre formes d'URL doivent être
**identiques** (même politique de trailing slash) :

1. **Le canonical** (`<link rel="canonical">`).
2. **Les liens internes** (helpers de routing, nav, footer, CTA).
3. **Les redirects internes** (racine → langue par défaut, anciennes URLs).
4. **L'enforcement de l'hébergeur** (le 301/308 qui élimine la forme alternative).

Si l'une de ces quatre diverge, tu as un duplicate content auto-infligé.

**Le piège systémique** : le défaut `trailingSlash: 'ignore'` (Astro, mais le principe vaut
ailleurs) est un **non-choix** qui laisse chaque sous-système trancher seul — et ils ne
tranchent pas pareil. **Toujours forcer explicitement `'always'` ou `'never'`** sur un site
SSG destiné au SEO. Le choix entre les deux importe moins que le fait d'en faire un — mais
prends celui qui **s'aligne sur ce que ton code génère déjà** (ici : sans slash partout →
`'never'`), pour un fix d'une ligne au lieu d'un refactor.

**Et en SSG : souviens-toi que la redirection est le travail de l'hébergeur, pas du
framework.** Vérifie toujours l'artefact de build de l'hébergeur (`.vercel/output/config.json`),
pas seulement le HTML.

---

## Annexe — fichiers touchés

- `astro.config.mjs` — ajout de `trailingSlash: 'never'` (+ commentaire).
- `docs/DECISIONS.md` — entrée `2026-06-13`.
- Aucun fichier applicatif modifié (tout était déjà aligné sans slash).

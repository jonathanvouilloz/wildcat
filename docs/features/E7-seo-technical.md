# E7 — SEO technique

**Complexité : M · Statut : TODO**

## Description
Mise en place des fondations SEO techniques multi-langue.

## Tâches
- [ ] `sitemap.xml` multi-langue (`@astrojs/sitemap`) avec toutes les locales
- [ ] `hreflang` sur toutes les pages (alternates par langue) — via BaseLayout
- [ ] Schema.org JSON-LD : `LocalBusiness` + `SportsClub` (home + pages principales), `FAQPage` (FAQ), `Article` (blog)
- [ ] Open Graph + Twitter Card sur toutes les pages
- [ ] `title` + `meta description` uniques par page ET par langue (depuis Sanity pour le contenu CMS)
- [ ] `robots.txt`, canonical URLs
- [ ] Images WebP, `alt` obligatoire, lazy loading (sauf LCP hero)
- [ ] Core Web Vitals : audit Lighthouse, optimisation fonts/images

## Décisions techniques
- Schema.org centralisé dans `src/lib/schema.ts` (helpers typés).
- BaseLayout impose title/description/lang → garantit la couverture meta.

## Notes / edge cases
- hreflang doit inclure `x-default`.
- Cohérence domaine (Q5) pour canonical + sitemap.

/* ============================================================
   Wildcat — scénographie scroll (data-animate)
   Voir docs/DESIGN.md §9. CSS : src/styles/motion.css.

   Pattern : ce script pose .wc-anim sur <html> (active le hidden-state
   CSS), puis un IntersectionObserver ajoute .in-view (once). No-JS,
   reduced-motion ou navigateur sans IO → wc-anim absente → tout visible.

   Attributs :
   - data-animate="fade-up|fade-down|fade-left|fade-right|scale|blur"
   - data-animate-load : entrée orchestrée AU LOAD (hero) — révélé direct,
     jamais observé. Le contenu d'un hero flex-end tombe dans la zone morte
     du rootMargin -18% et attendait un scroll (bug vu sur la home).
   - data-animate-stagger (container, valeur optionnelle = gap en ms)
     + data-animate-item (enfants)
   - data-delay="0.2" / data-duration="0.7" (overrides ponctuels, en s)
   ============================================================ */
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll<HTMLElement>(
    '[data-animate], [data-animate-stagger]'
  );
  if (!targets.length) return;

  document.documentElement.classList.add('wc-anim');

  // staggers : index par item (CSS : --stagger-i) + gap custom éventuel
  for (const group of document.querySelectorAll<HTMLElement>('[data-animate-stagger]')) {
    group
      .querySelectorAll<HTMLElement>('[data-animate-item]')
      .forEach((item, i) => item.style.setProperty('--stagger-i', String(i)));
    const gap = Number.parseFloat(group.dataset.animateStagger ?? '');
    if (gap > 0) group.style.setProperty('--stagger-gap', `${gap}ms`);
  }

  // overrides ponctuels (parcimonie — voir DESIGN.md §9 dosage)
  for (const el of document.querySelectorAll<HTMLElement>('[data-animate][data-delay]')) {
    el.style.transitionDelay = `${Number.parseFloat(el.dataset.delay ?? '0')}s`;
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-animate][data-duration]')) {
    el.style.transitionDuration = `${Number.parseFloat(el.dataset.duration ?? '0')}s`;
  }

  const reveal = (el: Element) => {
    el.classList.add('in-view');
    io.unobserve(el); // once — un contenu ne re-disparaît jamais
  };

  const RATIO = 0.15;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // Le ratio max atteignable = hauteur de root / hauteur de l'élément.
          // Un élément plus haut que ~6,7 viewports ne peut donc JAMAIS
          // franchir RATIO : sans cette échappatoire il reste à opacity:0 pour
          // toujours (bug payé sur la grille /blog à 23 cartes en 1 colonne).
          const unreachable =
            !!entry.rootBounds &&
            entry.rootBounds.height < RATIO * entry.boundingClientRect.height;
          if (entry.intersectionRatio >= RATIO || unreachable) reveal(entry.target);
        } else if (entry.boundingClientRect.bottom < 0) {
          // déjà AU-DESSUS du viewport (arrivée via ancre #faq…) :
          // révéler direct, sinon la section reste invisible au scroll-up
          reveal(entry.target);
        }
      }
    },
    // -18% bas : déclenche quand l'élément est franchement DANS le viewport —
    // à -10% l'animation était quasi finie avant d'être visible (retour Jonathan).
    // Le 0 du tableau ne fait que RÉVEILLER le callback dès la 1re intersection
    // (le gate RATIO ci-dessus reste la règle) — sans lui, un élément qui ne
    // peut pas atteindre 0.15 ne déclenche aucun callback du tout.
    { threshold: [0, RATIO], rootMargin: '0px 0px -18% 0px' }
  );

  // ⚠️ Flush AVANT toute révélation synchrone : wc-anim vient d'être posée
  // dans la même task — sans reflow, état caché + .in-view seraient commités
  // dans le même recalc et la transition ne jouerait pas (net change = rien).
  void document.body.offsetWidth;

  for (const t of targets) {
    if (t.hasAttribute('data-animate-load')) {
      // entrée orchestrée au load (hero) — cascade via data-delay
      t.classList.add('in-view');
    } else {
      io.observe(t);
    }
  }
})();

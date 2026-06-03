import { defineMiddleware } from 'astro:middleware';
import { setLocale, assertIsLocale } from './paraglide/runtime.js';

/**
 * Pose la locale Paraglide avant chaque rendu (pattern SSG officiel).
 * Astro i18n est la source de vérité (routing /en /fr) ; on pousse
 * `context.currentLocale` dans le runtime Paraglide pour que les
 * appels `m.*()` rendent la bonne langue page par page au build.
 * PAS de `paraglideMiddleware` (AsyncLocalStorage, inutile en SSG).
 */
export const onRequest = defineMiddleware((context, next) => {
  if (context.currentLocale) {
    setLocale(assertIsLocale(context.currentLocale), { reload: false });
  }
  return next();
});

// Garde EMFILE pour `npm run dev` (Windows).
//
// Symptôme : au démarrage du dev server, Astro lit les fichiers de routes en
// parallèle (create-manifest) pendant que Vite sert/optimise le graphe de deps
// du studio Sanity (des milliers de modules). Sous Windows, Node plafonne à
// ~2048 file descriptors CRT (_setmaxstdio, non configurable) → burst d'opens
// concurrents → `EMFILE: too many open files` en UnhandledRejection, et la
// route list peut rester incomplète (404 jusqu'au prochain rebuild).
//
// Parade : patcher fs.promises pour mettre l'opération en attente-retry quand
// EMFILE/ENFILE survient, au lieu de rejeter. Même esprit que graceful-fs,
// qui ne couvre PAS l'API promises (c'est elle qu'Astro et Vite utilisent).
// `node:fs` est un singleton CJS/ESM : patcher ici couvre tout le process.
//
// Chargé via `node --require` dans le script `dev` (package.json).
'use strict';

const fsp = require('node:fs').promises;

const MAX_RETRIES = 60; // ~9s au total — le burst de démarrage dure quelques secondes
let warned = false;

function wrap(name) {
  const orig = fsp[name].bind(fsp);
  fsp[name] = async (...args) => {
    let delay = 20;
    for (let attempt = 0; ; attempt++) {
      try {
        return await orig(...args);
      } catch (err) {
        if ((err.code !== 'EMFILE' && err.code !== 'ENFILE') || attempt >= MAX_RETRIES) throw err;
        if (!warned) {
          warned = true;
          console.warn(`[fs-emfile-guard] ${err.code} sur fs.promises.${name} — retry en cours (burst de démarrage, bénin)`);
        }
        await new Promise((r) => setTimeout(r, delay));
        delay = Math.min(delay * 1.5, 250);
      }
    }
  };
}

for (const name of ['readFile', 'writeFile', 'appendFile', 'copyFile', 'open', 'readdir']) {
  wrap(name);
}

// Code client « WC-XXXX » : relie un message WhatsApp reçu au clic ou au
// formulaire du site. Aucun import : Node exécute ce fichier tel quel dans les tests.
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const REF = /\(ref (WC-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4})\)/;

export function newCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  // 256 % 31 ≠ 0 : léger biais, sans importance pour un code de rapprochement.
  return 'WC-' + [...bytes].map((b) => ALPHABET[b % ALPHABET.length]).join('');
}

export function isCampLink(href: string, campBase: string): boolean {
  try {
    const a = new URL(href);
    const b = new URL(campBase);
    return a.host === b.host && a.pathname === b.pathname;
  } catch {
    return false;
  }
}

export function codeIn(href: string): string | null {
  try {
    return new URL(href).searchParams.get('text')?.match(REF)?.[1] ?? null;
  } catch {
    return null;
  }
}

export function withRef(href: string, code: string): string {
  try {
    if (codeIn(href)) return href;
    const u = new URL(href);
    const text = [u.searchParams.get('text'), `(ref ${code})`].filter(Boolean).join(' ');
    // wa.me comprend %20 mieux que le « + » de searchParams.
    u.search = '?text=' + encodeURIComponent(text);
    return u.toString();
  } catch {
    return href;
  }
}

export function topicOf(path: string): string {
  const p = path.replace(/^\/(en|fr)(?=\/|$)/, '');
  if (/^\/stay-train\/scooter-rental(\/|$)/.test(p)) return 'scooter';
  if (/^\/stay-train(\/|$)/.test(p)) return 'stay';
  if (/^\/dtv-visa(\/|$)/.test(p)) return 'dtv';
  if (/^\/classes(\/|$)/.test(p)) return 'class';
  return 'general';
}

// L'app refuse (400) toute autre forme de page : mieux vaut « / » qu'un clic perdu.
export function pageOf(path: string): string {
  return /^\/[a-z0-9/_-]*$/.test(path) ? path.slice(0, 101) : '/';
}

export function sendClick(endpoint: string, code: string, page: string, topic: string): void {
  try {
    // no-cors + corps texte : requête « simple », pas de préflight, jamais bloquante.
    fetch(endpoint, {
      method: 'POST',
      keepalive: true,
      mode: 'no-cors',
      body: JSON.stringify({ code, page, topic }),
    }).catch(() => {});
  } catch {
    /* le signal ne doit jamais gêner l'ouverture de WhatsApp */
  }
}

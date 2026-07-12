/**
 * Soumission « WhatsApp-first » partagée par les formulaires de contact
 * (ContactForm, StayInquiryForm). Ajouté 2026-07-12.
 *
 * Au submit (JS actif) :
 *  1. validation native (checkValidity) — name/email/consent restent requis ;
 *  2. construit le message WhatsApp depuis les champs remplis (buildText) ;
 *  3. envoie l'email Web3Forms en tâche de fond (fetch keepalive) → le lead
 *     est capturé même si le visiteur n'appuie pas sur Envoyer dans WhatsApp ;
 *  4. ouvre le chat de Meaw pré-rempli (window.open, dans le geste = pas de
 *     blocage popup) ;
 *  5. renvoie sur ?sent=1 (bannière existante) via le hidden `redirect`.
 *
 * Sans JS : rien de tout ça ne tourne — le POST natif vers Web3Forms envoie
 * l'email (fallback) et le bouton WhatsApp statique reste le secours.
 */
export interface WaSubmitOptions {
  /** Numéro wa.me de base, ex. https://wa.me/66857209620 */
  waBase: string;
  /** Construit le corps du message WhatsApp depuis le formulaire rempli. */
  buildText: (form: HTMLFormElement) => string;
  /** Nettoyage optionnel avant l'envoi email (ex. disabler les .xtra inactifs). */
  beforeSubmit?: (form: HTMLFormElement) => void;
}

export function submitViaWhatsApp(form: HTMLFormElement, opts: WaSubmitOptions): void {
  form.addEventListener('submit', (e) => {
    // Laisse la validation native s'afficher (champs requis) sans intercepter.
    if (!form.checkValidity()) return;
    e.preventDefault();

    // 1. message WhatsApp depuis les champs ACTIFS (avant tout disable).
    const text = opts.buildText(form);

    // 2. nettoyage optionnel (email propre côté Meaw).
    opts.beforeSubmit?.(form);

    // 3. email en tâche de fond — keepalive survit à la navigation.
    if (form.action) {
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        keepalive: true,
      }).catch(() => {});
    }

    // 4. ouvre WhatsApp pré-rempli (synchrone = pas de blocage popup ; nouvel
    // onglet plein, pas une fenêtre popup ; opener coupé pour la sécurité).
    const wa = window.open(`${opts.waBase}?text=${encodeURIComponent(text)}`, '_blank');
    if (wa) wa.opener = null;

    // 5. bannière « message envoyé » (redirect Web3Forms réutilisé).
    const redirect = form.querySelector<HTMLInputElement>('input[name="redirect"]')?.value;
    if (redirect) window.location.href = redirect;
  });
}

/** Valeur trimmée d'un champ par `name` ('' si vide ou absent). */
export function fieldValue(form: HTMLFormElement, name: string): string {
  const el = form.elements.namedItem(name) as HTMLInputElement | null;
  return el?.value?.trim() ?? '';
}

/** Texte de l'option sélectionnée d'un `<select>` ('' si placeholder/absent). */
export function selectText(form: HTMLFormElement, name: string): string {
  const el = form.elements.namedItem(name);
  if (el instanceof HTMLSelectElement) return el.selectedOptions[0]?.text?.trim() ?? '';
  return '';
}

/** Une checkbox est-elle cochée ? */
export function isChecked(form: HTMLFormElement, name: string): boolean {
  const el = form.elements.namedItem(name) as HTMLInputElement | null;
  return !!el && el.type === 'checkbox' && el.checked;
}

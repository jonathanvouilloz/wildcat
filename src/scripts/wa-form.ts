/**
 * Soumission « WhatsApp-first » partagée par les formulaires de contact
 * (ContactForm, StayInquiryForm). Ajouté 2026-07-12, revu 2026-07-19 (modal).
 *
 * Au submit (JS actif) :
 *  1. validation native (checkValidity) — name/email/consent restent requis ;
 *  2. construit le message WhatsApp depuis les champs remplis (buildText) ;
 *  3. envoie l'email Web3Forms en tâche de fond (fetch keepalive) → le lead
 *     est capturé même si le visiteur ne clique jamais sur WhatsApp ;
 *  4a. si un `modal` (WhatsappSubmitModal) est fourni : remplit l'aperçu +
 *      le lien wa.me et ouvre le modal in-site. WhatsApp ne s'ouvre QUE si
 *      l'utilisateur clique « Envoyer sur WhatsApp ». On reste sur la page.
 *  4b. fallback (pas de modal) : ancien comportement — ouvre WhatsApp
 *      (window.open) puis renvoie sur ?sent=1 via le hidden `redirect`.
 *
 * Sans JS : rien de tout ça ne tourne — le POST natif vers Web3Forms envoie
 * l'email (fallback) et redirige vers ?sent=1 (bannière existante).
 */
export interface WaSubmitOptions {
  /** Numéro wa.me de base, ex. https://wa.me/66857209620 */
  waBase: string;
  /** Construit le corps du message WhatsApp depuis le formulaire rempli. */
  buildText: (form: HTMLFormElement) => string;
  /** Nettoyage optionnel avant l'envoi email (ex. disabler les .xtra inactifs). */
  beforeSubmit?: (form: HTMLFormElement) => void;
  /** Modal de confirmation in-site (WhatsappSubmitModal). Si absent → fallback. */
  modal?: HTMLDialogElement | null;
}

export function submitViaWhatsApp(form: HTMLFormElement, opts: WaSubmitOptions): void {
  // Câblage du modal (une seule fois) : boutons de fermeture + clic backdrop.
  const modal = opts.modal ?? null;
  if (modal) {
    const close = () => {
      modal.close();
      form.reset();
    };
    modal.querySelectorAll<HTMLElement>('[data-wa-close]').forEach((btn) =>
      btn.addEventListener('click', close),
    );
    // Clic sur le backdrop (hors de la boîte) ferme aussi.
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }

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

    const waUrl = `${opts.waBase}?text=${encodeURIComponent(text)}`;

    // 4a. modal in-site : aperçu + lien wa.me, puis ouverture. On reste sur la page.
    if (modal) {
      const preview = modal.querySelector<HTMLElement>('[data-wa-preview]');
      if (preview) preview.textContent = text;
      const send = modal.querySelector<HTMLAnchorElement>('[data-wa-send]');
      if (send) send.href = waUrl;
      modal.showModal();
      return;
    }

    // 4b. fallback sans modal : ancien comportement (ouverture directe + bannière).
    const wa = window.open(waUrl, '_blank');
    if (wa) wa.opener = null;
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

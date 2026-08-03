/** Compatibilité avec les composants existants : les médias sont déjà des WebP locaux. */
export function urlFor(source: { asset?: { src?: string } }) {
  const src = source.asset?.src ?? '';
  const builder = { width: () => builder, height: () => builder, format: () => builder, fit: () => builder, url: () => src };
  return builder;
}

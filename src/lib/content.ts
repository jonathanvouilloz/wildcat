/** Adaptateur local : API conservée, aucune lecture réseau au build. */
import { getCoaches, getFighters, getFeaturedTestimonials, getScooters } from './local-content';

export async function safeQuery<T>(args: { query: string; params?: Record<string, unknown> }, fallback: T): Promise<T> {
  const image = (value: { src: string; alt: string } | undefined) => value ? { asset: { src: value.src }, alt: value.alt } : undefined;
  switch (args.query) {
    case 'coaches': return (await getCoaches()).map(({ id, data }) => ({ _id: id, ...data, photo: image(data.photo) })) as T;
    case 'fighters':
    case 'featured-fighters': {
      const all = await getFighters();
      return all.filter((item) => args.query === 'fighters' || item.data.featured).map(({ id, data }) => ({ _id: id, ...data, photo: image(data.photo) })) as T;
    }
    case 'featured-testimonials': return (await getFeaturedTestimonials((args.params?.service as 'dtv' | 'training' | 'general' | null) ?? null)).map(({ id, data }) => ({ _id: id, ...data, screenshot: image(data.screenshot) })) as T;
    case 'scooters': return (await getScooters()).map(({ id, data }) => ({ _id: id, ...data, photo: image(data.photo) })) as T;
    default: return fallback;
  }
}

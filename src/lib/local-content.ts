/** Collections éditables dans Git. Aucune lecture réseau au build. */
import { getCollection } from 'astro:content';

export const getCoaches = async () => (await getCollection('coaches')).sort((a, b) => a.data.order - b.data.order);
export const getFighters = async () => (await getCollection('fighters')).sort((a, b) => (b.data.year ?? 0) - (a.data.year ?? 0) || a.data.name.localeCompare(b.data.name));
export const getScooters = async () => (await getCollection('scooters')).sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
export const getFeaturedTestimonials = async (service: 'dtv' | 'training' | 'general' | null) =>
  (await getCollection('testimonials')).filter((item) => item.data.featured && (service === null || item.data.service === service));

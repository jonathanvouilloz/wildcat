// URLs d'images Sanity — builder branché sur le client de l'intégration.
// Usage : <img src={urlFor(coach.photo).width(640).format('webp').url()} alt={coach.photo.alt} />
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { sanityClient } from './sanity';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Config CLI Sanity — utilisée par `sanity schema extract` / `sanity typegen generate`
// (npm run sanity:types). L'extraction lit sanity.config.ts en local : aucun login
// ni projet distant requis.
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_PROJECT_ID || 'placeholder',
    dataset: process.env.SANITY_DATASET || 'production',
  },
  typegen: {
    path: './src/**/*.{ts,tsx,astro}',
    schema: './sanity/extract.json',
    generates: './src/lib/sanity.types.ts',
  },
});

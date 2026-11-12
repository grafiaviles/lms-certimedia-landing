import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Dominio y base configurables por entorno.
// - Producción (certimedia.tech): valores por defecto, en la raíz.
// - GitHub Pages (proyecto): el workflow define SITE_URL y BASE_PATH (subcarpeta).
const SITE = process.env.SITE_URL || 'https://www.certimedia.tech';
const BASE = process.env.BASE_PATH || undefined;

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});

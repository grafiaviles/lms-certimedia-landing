import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// TODO: reemplazar por el dominio real de producción antes de desplegar.
const SITE_URL = 'https://www.certimedia.tech';

export default defineConfig({
  site: SITE_URL,
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});

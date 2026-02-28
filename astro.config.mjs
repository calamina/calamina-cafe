// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [ sitemap() ],
  site: 'https://calamina.cafe',
  // devToolbar: { enabled: false }
});
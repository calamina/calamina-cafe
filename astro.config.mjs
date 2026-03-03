// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), mdx()],
  site: 'https://calamina.cafe',
  // devToolbar: { enabled: false }
});
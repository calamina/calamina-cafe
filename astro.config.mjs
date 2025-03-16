// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import * as compiler from "vue/compiler-sfc";
import sitemap from '@astrojs/sitemap';
// import swup from '@swup/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({ compiler }), 
    sitemap(), 
    // swup({morph: ["header"]})
  ],
  site: 'https://calamina.cafe',
  image: {
    domains: ['calamina.cafe', 'senscritique.com'],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.senscritique.com',
    },
    {
      protocol: 'https',
      hostname: '**.calamina.cafe',
    }
    ],
  },
});
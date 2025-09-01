// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import * as compiler from "vue/compiler-sfc";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({ compiler }), 
    sitemap({
      customPages: [
        'http://calamina.cafe/', 
        'http://www.calamina.cafe/', 
        'https://www.calamina.cafe/',
      ],
    }), 
  ],
  site: 'https://calamina.cafe',
  output: "static",
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
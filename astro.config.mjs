// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import * as compiler from "vue/compiler-sfc";

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [vue({ compiler }), mdx()],
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
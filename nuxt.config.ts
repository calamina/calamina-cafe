import rehypeUnwrapImages from "rehype-unwrap-images";

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
  ],

  nitro: {
    srcDir: '/app',
    static: true,
  },

  srcDir: 'app/',
  tailwindcss: { viewer: false },
  devtools: { enabled: false },
  css: ['~/assets/style/main.scss'],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  },

  content: {
    build: {
      markdown: {
        rehypePlugins: { 'rehype-unwrap-images': { rehypeUnwrapImages } }
      }
    },
    // highlight: {
    //   theme: {
    //     default: 'github-light',
    //     dark: 'github-dark',
    //     sepia: 'monokai'
    //   }
    // }
  },

  icon: {
    size: '1.25rem',
    class: 'icon',
  },

  // router: {
  //   options: {
  //     scrollBehaviorType: 'smooth'
  //   }
  // },

  vite: {
    css: {
      preprocessorOptions: {
        "scss": {
          "api": 'modern-compiler',
        },
      },
    }
  },

  compatibilityDate: '2025-01-29',
})
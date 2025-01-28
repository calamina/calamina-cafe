import rehypeUnwrapImages from "rehype-unwrap-images";

// https://nuxt.com/docs/api/configuration/nuxt-config
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

  ssr: true,

  nitro: {
    srcDir: '/app',
    static: true,
  },

  srcDir: 'app/',

  compatibilityDate: '2024-04-03',

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
    database: {
      type: 'sqlite',
      filename: './content.db',
    },
    // build: {
    //   markdown: {
    //     rehypePlugins: {
    //       'rehype-unwrap-images': {rehypeUnwrapImages},
    //     }
    //   }
    // },
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

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        "scss": {
          "api": 'modern-compiler',
        },
      },
    }
  },
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  ssr: true,

  nitro: {
    // prerender: {       
    //   crawlLinks: true,       
    //   routes: ["/", "/about", "/projects", "/sitemap.xml"],     
    //   // routes: ["/", "/about", "/projects", "/sitemap.xml", "/robots.txt"],     
    // },
    srcDir: '/app',
    static: true,
  },

  // routeRules: {
  //   '/': { prerender: true },
  //   '/about': { prerender: true },
  //   '/projects': { isr: true },
  //   '/projects/web/**': { isr: true },
  //   '/projects/phone/**': { isr: true },
  //   '/sitemap.xml': { prerender: true },
  // },

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
    markdown: {
      rehypePlugins: [
        'rehype-unwrap-images'
      ]
    },
    // highlight: {
    //   theme: {
    //     default: 'github-light',
    //     dark: 'github-dark',
    //     sepia: 'monokai'
    //   }
    // }
  },

  // image: {
  //   format: ['webp'],
  // },

  icon: {
    size: '1.25rem',
    class: 'icon',
  },

  site: {
    url: 'https://calamina.cafe',
    name: 'Calamina Cafe'
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
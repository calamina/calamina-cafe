// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',
  // components: ['~/app/components'],
  compatibilityDate: '2024-04-03',
  // devtools: { enabled: true },
  devtools: { enabled: false },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/style/main.scss'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  },
  content: {
    // experimental: {
    //   search: true
    // },
    markdown: {
      rehypePlugins: [
        'rehype-unwrap-images'
      ]
    },
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai'
      }
    }
  },
  image: {
    format: ['webp']
  },
  icon: {
    size: '1.25rem',
    class: 'icon',
  },
  site: {
    url: 'https://calamina.cafe',
    name: 'Calamina Cafe'
  },
  sitemap: {
    urls: [
      'https://calamina.cafe/projects/atlast',
    ]
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
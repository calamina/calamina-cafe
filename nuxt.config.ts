// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    '@nuxtjs/color-mode',
    '@nuxt/icon'
  ],
  css: ['~/assets/style/main.scss'],
  // pages: true,
  app: {
    // pageTransition: {
    //   name: 'appear',
    //   mode: 'out-in',
    // },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  },
  image: {
    format: ['webp']
  },
  icon: {
    size: '1.25rem',
    class: 'icon', 
    // mode: 'css', // default <Icon> mode applied
    // aliases: {
    //   'nuxt': 'logos:nuxt-icon',
    // }
  },
  site: {
    url: 'https://calamina.cafe',
    name: 'Calamina Cafe'
  },
  sitemap: {
    urls: [
      'https://calamina.cafe/projects/atlast',
     ]
  }
})
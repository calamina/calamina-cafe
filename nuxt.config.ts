// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxt/image'],
  css: ['~/assets/style/main.scss'],
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
      // duration: {enter: 0.4, leave: 0.4},
      // appear: true
    },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  },
})
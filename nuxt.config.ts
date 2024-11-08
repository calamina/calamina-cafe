// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxt/image', '@nuxt/eslint'],
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
})
<script setup lang="ts">
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

const route: Ref<RouteLocationNormalizedLoadedGeneric> = useRouter().currentRoute
const project = computed(() => route.value.params?.project as string)

const formatRouteName = computed(() => {
  let title = ''
  if (route.value.name === 'index') title += 'home'
  else if (project.value) title += project.value as string
  else title += String(route.value.name)
  title += ' ~ calamina cafe'
  return title
})

useHead({
  title: formatRouteName,
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ],
  meta: [
    { name: 'description', content: 'Grégoire Belliere\'s Portfolio' },
    { name: 'robots', content: 'index,follow' },
    { name: 'googlebot', content: 'index,follow' },
  ],
  htmlAttrs: {
    lang: 'en',
  class: 'xl:tw-overscroll-y-none',
  },
})
</script>

<template>
  <div class="app tw-flex tw-flex-col tw-justify-between tw-min-h-screen">
    <AppHeader :project />

    <!-- <main class="tw-flex tw-flex-grow tw-m-4 tw-mt-16 tw-h-full tw-justify-center tw-overflow-hidden"> -->
    <main class="tw-flex tw-flex-grow tw-mx-4 tw-mt-16 tw-h-full tw-justify-center">
      <AppTransition />
      <NuxtPage />
    </main>

    <!-- <footer class="tw-flex tw-flex-col tw-p-10 tw-gap-6 tw-h-96 tw-justify-end"> -->
    <footer v-if="!project" class="tw-flex tw-flex-col tw-p-4 tw-gap-6 tw-items-end">
      <div class="tw-flex tw-gap-2">
        <span>©</span>
        <a target=”_blank” href="https://github.com/calamina">calamina</a>
        <span>— 2024</span>
      </div>
      <!-- <p class=" tw-w-6/12">This website is being made with accessibility in mind (very early stage RN), don't hesitate to contact me for any improvement that
        could be made or for anything you feel is lacking !</p>
      <Contact />
      <Socials /> -->
    </footer>
  </div>
  <!-- DEV ONLY GUIDES -->
  <div class="grid">
    <div class="guide"></div>
    <div class="guide"></div>
    <div class="guide"></div>
    <div class="guide"></div>
    <div class="guide"></div>
    <div class="guide"></div>
    <div class="guide"></div>
    <div class="guide"></div>
    <div class="guide"></div>
    <div class="guide"></div>
  </div>
</template>

<style scoped lang="scss">
// DEV ONLY GUIDES
// .grid {
//   position: fixed;
//   z-index: -1;
//   z-index: 999;
//   top: 1rem;
//   bottom: 1rem;
//   left: 0;
//   width: 100%;
//   height: calc(100vh - 2rem);
//   gap: 0 1rem;
//   padding: 0 1rem;
//   display: grid;
//   grid-template-columns: repeat(10, 1fr);
//   pointer-events: none;
  
//   .guide {
//     width: 100%;
//     height: 100%;
//     background-color: #00ffff22;
//     border: 1px solid #00000033;
//   }
// }

.app {
  min-height: 100vh;
  // min-height: calc(100vh + 18rem);
}

// footer {
//   background-color: var(--bg-darker0)
// }

.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(4vh);
}

// MEDIA QUERIES
@media (max-width: 1250px) {
  // main {
  //   padding: 0;
  // }

  nav {
    gap: 1.5rem;
  }
}
</style>

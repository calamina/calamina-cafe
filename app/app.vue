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
  meta: [
    { name: 'description', content: 'Grégoire Belliere\'s Portfolio' },
    { name: 'robots', content: 'index,follow' },
    { name: 'googlebot', content: 'index,follow' },
  ],
  htmlAttrs: {
    lang: 'en',
  }
})
</script>

<template>
  <div class="app tw-flex tw-flex-col tw-justify-between tw-min-h-screen">
    <AppHeader :project />

    <main class="tw-flex tw-flex-grow tw-p-4 tw-pt-16 tw-h-full tw-justify-center tw-overflow-hidden">
      <NuxtPage />
    </main>

    <!-- <footer class="tw-flex tw-flex-col tw-p-10 tw-gap-6 tw-h-96 tw-justify-end"> -->
    <footer v-if="!project"class="tw-flex tw-flex-col tw-p-4 tw-gap-6 tw-items-end">
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
    <div class="transition"></div>
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  // min-height: calc(100vh + 18rem);
}

// footer {
//   background-color: var(--bg-darker0)
// }

.transition {
  position: fixed;
  top: 0;
  z-index: 300;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-darker);
  transform: translateX(-100vw);
}

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
  main {
    padding: 0;
  }

  nav {
    gap: 1.5rem;
  }
}
</style>

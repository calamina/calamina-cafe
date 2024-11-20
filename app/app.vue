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
    <header class="tw-flex tw-sticky tw-top-0 tw-items-center tw-p-4 tw-justify-between tw-z-50">
      <nav class="tw-flex tw-gap-8">
        <NuxtLink to="/">home</NuxtLink>
        <NuxtLink to="/about">about</NuxtLink>
        <div class="tw-flex tw-gap-2">
          <NuxtLink to="/projects" :class="{ 'route-active': project }">projects</NuxtLink>
          <transition name="sublink" mode="out-in">
            <div class="tw-flex tw-gap-2" v-if="project" :key="project">
              <p>:</p>
              <p class="sublink">{{ project }}</p>
            </div>
          </transition>
        </div>
      </nav>
      <div class="tw-flex tw-gap-6">
        <Search />
        <Theme />
      </div>
    </header>

    <main class="tw-flex tw-flex-grow tw-p-4 tw-h-full tw-justify-center">
      <NuxtPage />
    </main>

    <!-- <footer class="tw-flex tw-flex-col tw-p-10 tw-gap-6 tw-h-96 tw-justify-end"> -->
    <footer class="tw-flex tw-flex-col tw-p-4 tw-gap-6 tw-items-end">
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
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  // min-height: calc(100vh + 18rem);
}

// footer {
//   background-color: var(--bg-darker0)
// }

.router-link-active,
.route-active {
  text-decoration: underline;
}

.subtype {
  color: var(--color-light);
}

.sublink {
  background-color: var(--bg-darker);
  padding: 0 0.5rem;
  border-radius: 0.5rem;
}

// TRANSITIONS
.sublink-enter-active,
.sublink-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.sublink-enter-from {
  opacity: 0;
  transform: translateX(-0.25rem);
}

.sublink-leave-to {
  opacity: 0;
  transform: translateX(0.25rem);
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

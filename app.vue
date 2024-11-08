<script setup lang="ts">
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

// TODO:: add utility to manage route transitions depending on route hash (useRouteTransition())
const route = useRoute()

const isProjectRoute = ref(false)
const project: Ref<string> = ref(route.params?.project as string)

watch(route, () => {
  useHead({
    title: `${formatRouteName(route)} ~ calamina cafe`,
    meta: [
      { name: 'description', content: 'Grégoire Belliere\'s Portfolio' },
      { name: 'robots', content: 'index,follow' },
      { name: 'googlebot', content: 'index,follow' },
    ],
  })
})

const formatRouteName = (route: RouteLocationNormalizedLoadedGeneric): string => {
  if (route.name === 'index') return 'home'
  else if (route.params?.project) return route.params?.project as string
  else return String(route.name)
}

watch(
  () => route.params?.project,
  (newId, oldId) => {
    isProjectRoute.value = !!newId
    project.value = newId as string;
    // react to route changes...
  }
)
</script>

<template>
  <div class="app">
    <header>
      <nav>
        <NuxtLink to="/">home</NuxtLink>
        <NuxtLink to="/about">about</NuxtLink>
        <div class="subnav">
          <NuxtLink to="/projects" :class="{ 'route-active': isProjectRoute }">projects</NuxtLink>
          <transition name="sublink" mode="out-in">
            <div class="subroute" v-if="isProjectRoute" :key="project">
              <p>:</p>
              <p class="sublink">{{ $route.params?.project }}</p>
            </div>
          </transition>
        </div>
      </nav>
    </header>

    <main>
      <NuxtPage />
      <!-- <NuxtPage :transition="{
        name: 'appear',
        // name: 'page',
        mode: 'out-in',
        appear: true,
      }" /> -->
    </main>

    <footer>
      ©
      <a target=”_blank” href="https://github.com/calamina">calamina</a>
      — 2024
    </footer>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-flow: column;
  padding: 1rem;
  // min-height: '100vh';
  justify-content: space-between;
  min-height: calc(100vh - 2rem);
  // margin: 1rem;
  display: flex;
  flex-flow: column;
}

// TODO :: remove focus when changing page ?
a:focus {
  outline: none;
  text-decoration: underline;
  background-color: #fff;
}

nav {
  display: flex;
  gap: 2.5rem;
  padding: 1rem;
}

.subnav {
  display: flex;
  gap: 0.5rem;
}

main {
  flex: 1;
  padding: 1rem;
  display: flex;
  height: 100%;
  justify-content: center;
}

footer {
  display: flex;
  gap: .5rem;
  padding: 1rem;
}

.router-link-active,
.route-active {
  text-decoration: underline;
}

.subroute {
  display: flex;
  gap: 0.5rem;
}

.subtype {
  color: #a5a5a5;
}

.sublink {
  background-color: #c5c5c5;
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

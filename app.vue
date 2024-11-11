<script setup lang="ts">
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

const route: Ref<RouteLocationNormalizedLoadedGeneric> = useRouter().currentRoute

const isProjectRoute = computed(() => route.value.params?.project as string)

const formatRouteName = computed(() => {
  let title = ''
  if (route.value.name === 'index') title += 'home'
  else if (route.value.params?.project) title += route.value.params?.project as string
  else title += String(route.value.name)
  title += ' ~ calamina cafe'
  return title
})

useHead({
  title: formatRouteName,
  meta: [
    { name: 'lang', content: 'en-US' },
    { name: 'description', content: 'Grégoire Belliere\'s Portfolio' },
    { name: 'robots', content: 'index,follow' },
    { name: 'googlebot', content: 'index,follow' },
  ],
})

const colorMode = useColorMode()
const themeOpen = ref(false)
const theme = ref(null)
onClickOutside(theme, () => themeOpen.value = false)
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
            <div class="subroute" v-if="isProjectRoute" :key="route.params?.project as string">
              <p>:</p>
              <p class="sublink">{{ $route.params?.project }}</p>
            </div>
          </transition>
        </div>
      </nav>
      <div class="theme" ref="theme">
        <button @click="themeOpen = !themeOpen" :class="{ 'activetheme': themeOpen }">
          <Icon name="tabler:moon-2" />
        </button>
        <transition name="page">
          <div class="theme-menu" v-if="themeOpen">
            <button @click="colorMode.preference = 'system'">
              <Icon name="tabler:moon-stars" />
              System
            </button>
            <button @click="colorMode.preference = 'light'">
              <Icon name="tabler:moon" />
              Light
            </button>
            <button @click="colorMode.preference = 'dark'">
              <Icon name="tabler:moon-filled" />
              Dark
            </button>
          </div>
        </transition>
      </div>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer>
      <span>©</span>
      <a target=”_blank” href="https://github.com/calamina">calamina</a>
      <span>— 2024</span>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-flow: column;
  padding: 1rem;
  min-height: '100vh';
  justify-content: space-between;
  min-height: calc(100vh - 2rem);
  display: flex;
  flex-flow: column;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

// TODO :: remove focus when changing page ?
// a:focus {
//   outline: none;
//   text-decoration: underline;
//   background-color: var(--color-lightest);
// }

nav {
  display: flex;
  gap: 2.5rem;
}

.subnav {
  display: flex;
  gap: 0.5rem;
}

.theme {
  display: flex;
  position: relative;
  overflow: visible;

  button {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;

    &.activetheme {
      background-color: var(--bg-darker);
    }
  }
}


.theme-menu {
  z-index: 200;
  background-color: var(--bg-darker);
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-flow: column;
  align-items: start;
  gap: 0.25rem;
  padding: 0.5rem;
  position: absolute;
  right: 0rem;
  top: 3rem;
  border-radius: 0.5rem;

  button {
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;

    &:hover {
      text-decoration: underline;
    }
  }
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

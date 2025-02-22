<script setup lang="ts">
import SearchBar from './SearchBar.vue';
import ThemeSwitch from './ThemeSwitch.vue';

// const route = useRoute()
</script>

<template>
  <header>
    <nav>
      <a href="/">home</a>
      <a href="/about">about</a>
      <!-- <div class="tw-flex tw-gap-2 tw-pointer-events-auto">
        <NuxtLink to="/projects" :class="{ 'route-active': route.params.project }">projects</NuxtLink>
        <transition name="sublink" mode="out-in">
          <div class="tw-gap-2 tw-hidden xl:tw-flex" v-if="route.params.project?.length"
               :key="(route.params.project[0])">
            <p>:</p>
            <p class="sublink">{{ route.params.project[0] }}</p>
          </div>
        </transition>
      </div> -->
    </nav>
    <div class="actions">
      <SearchBar class="tw-hidden md:tw-block" />
      <ThemeSwitch />
    </div>
  </header>
</template>

<style lang="scss" scoped>
//  tw-h-16 xl:tw-px-0">
header {
  max-width: 60rem;
  position: fixed;
  display: flex;
  top: 0;
  height: 4rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  z-index: 50;
  pointer-events: none;
}

nav {
  display: flex;
  gap: 1rem;
}

a {
  pointer-events: auto;
}

.actions {
  display: flex;
  gap: 0.5rem;
  pointer-events: auto;
}

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

@media (min-width: 1280px) {
  header {
    padding: 0.5rem 0;
  }
}
</style>
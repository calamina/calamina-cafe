<script setup lang="ts">
const { project = '' } = defineProps<{
  project: string
}>()

const isLargeScreen = useMediaQuery('(min-width: 1280px)')
</script>

<template>
  <header
    class="tw-flex tw-fixed tw-top-0 tw-items-center tw-py-4 tw-pl-8 tw-pr-4 tw-justify-between tw-z-50 tw-w-full">
    <nav class="tw-flex tw-gap-8">
      <NuxtLink to="/">home</NuxtLink>
      <NuxtLink to="/about">about</NuxtLink>
      <div class="tw-flex tw-gap-2">
        <NuxtLink to="/projects" :class="{ 'route-active': project }">projects</NuxtLink>
        <transition name="sublink" mode="out-in">
          <div class="tw-gap-2 tw-hidden xl:tw-flex" v-if="project.length" :key="project">
          <!-- <div class="tw-flex tw-gap-2" v-if="project.length && isLargeScreen" :key="project"> -->
            <p>:</p>
            <p class="sublink">{{ project }}</p>
          </div>
        </transition>
      </div>
    </nav>
    <div class="tw-flex tw-gap-6">
      <Search />
      <!-- TODO :: fix ? wtf -->
      <!-- <Search v-if="isLargeScreen" /> -->
      <Theme />
    </div>
  </header>
</template>

<style lang="scss" scoped>
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
</style>
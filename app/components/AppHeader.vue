<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <header
    class="tw-flex tw-fixed tw-top-0 tw-items-center tw-py-4 tw-px-4 tw-h-16 tw-justify-between tw-z-50 tw-w-full">
    <nav class="tw-flex tw-gap-8">
      <NuxtLink to="/">home</NuxtLink>
      <NuxtLink to="/about">about</NuxtLink>
      <div class="tw-flex tw-gap-2">
        <NuxtLink to="/projects" :class="{ 'route-active': route.params.project }">projects</NuxtLink>
        <transition name="sublink" mode="out-in">
          <div class="tw-gap-2 tw-hidden xl:tw-flex" v-if="route.params.project" :key="(route.params.project as string)">
            <p>:</p>
            <p class="sublink">{{ route.params.project }}</p>
          </div>
        </transition>
      </div>
    </nav>
    <div class="tw-flex tw-gap-6">
      <Search class="tw-hidden md:tw-block" />
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
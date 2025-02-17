<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <header
          class="tw-flex tw-fixed tw-top-0 tw-items-center tw-py-4 tw-px-4 tw-h-16 tw-justify-between tw-z-50 tw-w-full tw-pointer-events-none xl:tw-px-0">
    <nav class="tw-flex tw-gap-8">
      <NuxtLink class="tw-pointer-events-auto" to="/">home</NuxtLink>
      <NuxtLink class="tw-pointer-events-auto" to="/about">about</NuxtLink>
      <div class="tw-flex tw-gap-2 tw-pointer-events-auto">
        <NuxtLink to="/projects" :class="{ 'route-active': route.params.project }">projects</NuxtLink>
        <transition name="sublink" mode="out-in">
          <div class="tw-gap-2 tw-hidden xl:tw-flex" v-if="route.params.project?.length"
               :key="(route.params.project[0])">
            <p>:</p>
            <p class="sublink">{{ route.params.project[0] }}</p>
          </div>
        </transition>
      </div>
    </nav>
    <div class="tw-flex tw-gap-6 tw-pointer-events-auto">
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
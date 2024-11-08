<script setup lang="ts">
import type { NuxtError } from '#app'
const { error } = defineProps<{
  error: NuxtError
}>()

const message = computed(() => error.statusCode === 404 ? 'Page not found' : error.statusMessage)
</script>

<template>
  <div class="wrapper">
    <h1>[ {{ error.statusCode }} error ] {{ message }}</h1>
    <p>Woopsi, you shouldn't be here ...<br> That may be my fault, or that may be yours :^)</p>
    <NuxtLink to="/">Go back home !</NuxtLink>
    <Flower />
    <p>Art by <span>Susie Oviatt</span></p>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

h1,
a,
span {
  color: #960843;
}

a {
  text-decoration: underline;
}

p {
  text-align: center;
}
</style>
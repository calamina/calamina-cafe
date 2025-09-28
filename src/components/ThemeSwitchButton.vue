<script setup lang="ts">
import { ref } from 'vue';

const { theme } = defineProps<{
  theme: 'light' | 'dark' | 'system'
}>()

const emit = defineEmits(['clicked'])
const active = ref(localStorage.getItem("theme") === theme)

function setTheme(value: 'light' | 'dark' | 'system') {
  document.documentElement.setAttribute('data-theme', value);
  localStorage.setItem("theme", value)
  emit('clicked')
}
</script>

<template>
  <button :title="'theme-' + theme" :class="{ 'active': active }" @click="setTheme(theme)">
    <slot />
    {{ theme }}
  </button>
</template>

<style lang="css" scoped>
button {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-transform: capitalize;

  &.theme-picker {
    background-color: var(--bg-darker0);
  }

  &.activetheme,
  &.theme-picker:hover {
    background-color: var(--bg-darker);
  }
}

& .active {
  text-decoration: underline;
}
</style>
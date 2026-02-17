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
    <span>{{ theme }}</span>
  </button>
</template>

<style lang="css" scoped>
button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  gap: 1rem;

  font-variant: small-caps;

  &:hover:not(.active) {
    background-color: var(--bg-darker);
    text-decoration: none;
  }

  span {
    width: 6ch;
    text-align: start;
  }
}

& .active {
  text-decoration: none;
  background-color: var(--bg);
}
</style>
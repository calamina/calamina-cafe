<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import Icon from './icons/Icon.vue';

const { theme, icon } = defineProps<{
  theme: 'light' | 'dark' | 'system'
  icon: string
}>()

const iconComponent = defineAsyncComponent(async () => import(`./icons/${icon}.vue`))
const active = ref(localStorage?.getItem("theme") === theme)

function setTheme(value: 'light' | 'dark' | 'system') {
  document.documentElement.setAttribute('data-theme', value);
  localStorage.setItem("theme", value)
}
</script>

<template>
  <button :title="'theme-' + theme" :class="{ 'active': active }" @click="setTheme(theme)">
    <icon :icon=iconComponent />
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
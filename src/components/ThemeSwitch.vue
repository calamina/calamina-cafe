<script setup lang="ts">
import { onClickOutside, onKeyStroke, useColorMode } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { ref, watch } from 'vue'
import IconImg from './IconImg.vue'

const colorMode = useColorMode({emitAuto: true})
const themeOpen = ref(false)
const theme = ref(null)
onClickOutside(theme, () => closeTheme())
onKeyStroke('Escape', () => closeTheme())

const closeTheme = () => themeOpen.value = false

const { activate, deactivate } = useFocusTrap(theme)
watch(themeOpen, () => themeOpen.value ? activate() : deactivate())

function setMode(mode: 'light'|'dark'|'auto') {
  colorMode.value = mode;
  themeOpen.value = false
}
</script>

<template>
  <div class="theme" ref="theme">
    <button title="theme picker" @click="themeOpen = !themeOpen" class="theme-picker"
            :class="{ 'activetheme': themeOpen }">
      <IconImg name="tabler:moon-2" width="24" height="24" />
    </button>
    <transition name="page">
      <div class="theme-menu" v-if="themeOpen">
        <button @click="setMode('auto')" :class="{ active: colorMode === 'auto' }">
          <IconImg name="tabler:moon-stars" />
          System
        </button>
        <button @click="setMode('light')" :class="{ active: colorMode === 'light' }">
          <IconImg name="tabler:moon" />
          Light
        </button>
        <button @click="setMode('dark')" :class="{ active: colorMode === 'dark' }">
          <IconImg name="tabler:moon-filled" />
          Dark
        </button>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.theme {
  display: flex;
  position: relative;
  overflow: visible;

  button {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;

    &.activetheme,
    &.theme-picker:hover {
      background-color: var(--bg-darker);
    }
  }

  & .active {
    text-decoration: underline;
  }
}

.theme-menu {
  z-index: 200;
  background-color: var(--bg-darker);
  position: absolute;
  // top: 5rem;
  right: 0;
  display: flex;
  flex-flow: column;
  align-items: start;
  gap: 0.25rem;
  padding: 0.5rem;
  right: 0rem;
  padding-right: 0.5rem;
  top: 2.65rem;
  border-radius: 0.5rem;
  // TODO::investigate :(
  width: 9rem;

  button {
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
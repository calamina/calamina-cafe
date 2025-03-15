<script setup lang="ts">
import { onClickOutside, onKeyStroke, useColorMode } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { ref, watch } from 'vue'

const colorMode = useColorMode({ emitAuto: true })
const themeOpen = ref(false)
const theme = ref(null)
onClickOutside(theme, () => closeTheme())
onKeyStroke('Escape', () => closeTheme())

const closeTheme = () => themeOpen.value = false

const { activate, deactivate } = useFocusTrap(theme)
watch(themeOpen, () => themeOpen.value ? activate() : deactivate())

function setMode(mode: 'light' | 'dark' | 'auto') {
  colorMode.value = mode;
  themeOpen.value = false
}
</script>

<template>
  <div
    ref="theme"
    class="theme"
  >
    <button
      title="theme picker"
      class="theme-picker"
      :class="{ 'activetheme': themeOpen }"
      @click="themeOpen = !themeOpen"
    >
      <slot />
    </button>
    <transition name="page">
      <div
        v-if="themeOpen"
        class="theme-menu"
      >
        <button
          :class="{ active: colorMode === 'auto' }"
          @click="setMode('auto')"
        >
          <slot name="system" />
          System
        </button>
        <button
          :class="{ active: colorMode === 'light' }"
          @click="setMode('light')"
        >
          <slot name="light" />
          Light
        </button>
        <button
          :class="{ active: colorMode === 'dark' }"
          @click="setMode('dark')"
        >
          <slot name="dark" />
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
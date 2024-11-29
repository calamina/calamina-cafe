<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const colorMode = useColorMode()
const themeOpen = ref(false)
const theme = ref(null)
onClickOutside(theme, () => closeTheme())
onKeyStroke('Escape', () => closeTheme())

const closeTheme = () => themeOpen.value = false

const { activate, deactivate } = useFocusTrap(theme)
watch(themeOpen, () => themeOpen.value ? activate() : deactivate())
</script>

<template>
  <div class="theme" ref="theme">
    <button title="theme picker" @click="themeOpen = !themeOpen" class="theme-picker"
      :class="{ 'activetheme': themeOpen }">
      <Icon name="tabler:moon-2" />
    </button>
    <transition name="page">
      <div class="theme-menu" v-if="themeOpen">
        <button @click="colorMode.preference = 'system'" :class="{ active: colorMode.preference === 'system' }">
          <Icon name="tabler:moon-stars" />
          System
        </button>
        <button @click="colorMode.preference = 'light'" :class="{ active: colorMode.preference === 'light' }">
          <Icon name="tabler:moon" />
          Light
        </button>
        <button @click="colorMode.preference = 'dark'" :class="{ active: colorMode.preference === 'dark' }">
          <Icon name="tabler:moon-filled" />
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
  top: 0;
  right: 0;
  display: flex;
  flex-flow: column;
  align-items: start;
  gap: 0.25rem;
  padding: 0.5rem;
  position: absolute;
  right: 0rem;
  top: 3rem;
  border-radius: 0.5rem;

  button {
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
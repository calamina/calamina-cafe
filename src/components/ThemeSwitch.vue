<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { ref } from 'vue'
import Icon from './Icon.vue'
import IconMoon from './Icons/IconMoon.vue'
import IconMoonHalf from './Icons/IconMoonHalf.vue'
import IconMoonHalfFilled from './Icons/IconMoonHalfFilled.vue'
import IconMoonStars from './Icons/IconMoonStars.vue'
import ThemeSwitchButton from './ThemeSwitchButton.vue'

const themePicker = ref(null)
onClickOutside(themePicker, () => deactivate())
onKeyStroke('Escape', () => deactivate())

const { activate, deactivate, hasFocus } = useFocusTrap(themePicker)

</script>
<template>
  <div ref="themePicker" class="theme">
    <button title="theme picker" class="theme-picker" :class="{ 'activetheme': hasFocus }"
      @click="hasFocus ? deactivate() : activate()">
      <Icon :icon="IconMoon" />
    </button>
    <transition name="appear">
      <div v-if="hasFocus" class="theme-menu">
        <ThemeSwitchButton theme="system" @clicked="deactivate()">
          <Icon :icon="IconMoonStars" />
        </ThemeSwitchButton>
        <ThemeSwitchButton theme="light" @clicked="deactivate()">
          <Icon :icon="IconMoonHalf" />
        </ThemeSwitchButton>
        <ThemeSwitchButton theme="dark" @clicked="deactivate()">
          <Icon :icon="IconMoonHalfFilled" />
        </ThemeSwitchButton>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.theme {
  display: flex;
  position: relative;
  overflow: visible;

  button {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;

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
}

.theme-menu {
  z-index: 200;
  background-color: var(--bg-darker);
  position: absolute;
  right: 0;
  display: flex;
  flex-flow: column;
  align-items: start;
  gap: 0.25rem;
  padding: 0.5rem;
  right: 0rem;
  padding-right: 0.5rem;
  top: 2.75rem;
  border-radius: 0.5rem;
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
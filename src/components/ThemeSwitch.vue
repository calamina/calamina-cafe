<script setup lang="ts">
import Icon from '@components/icons/Icon.vue'
import IconMoon from '@components/icons/IconMoon.vue'
import IconMoonHalf from '@components/icons/IconMoonHalf.vue'
import IconMoonHalfFilled from '@components/icons/IconMoonHalfFilled.vue'
import IconMoonStars from '@components/icons/IconMoonStars.vue'
import ThemeSwitchButton from '@components/ThemeSwitchButton.vue'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { ref } from 'vue'

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

  .theme-picker {
    background-color: var(--bg);
    width: 100%;
    padding: 0.5rem;
    border-radius: 0;

    &.activetheme,
    &.active-theme:hover {
      background-color: var(--bg-darker0);
    }
  }
}

.theme-menu {
  z-index: 200;
  background-color: var(--bg-darker0);
  position: absolute;
  right: 0;
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
  padding: 0.5rem;
  right: 0rem;
  top: 2rem;
  width: 9rem;
}
</style>
<template>
  <SelectBrackets class="lookin borderButton" :button="true">
      <slot />
  </SelectBrackets>
</template>

<style lang="scss" scoped>
.borderButton {
  display: flex;
  justify-content: center;
  background-color: var(--bg-darker0);
  outline-offset: -1px;
  max-height: 85vh;
}
</style>
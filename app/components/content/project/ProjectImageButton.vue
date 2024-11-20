<template>
  <SelectBrackets class="lookin borderButton" :button="true">
      <slot />
  </SelectBrackets>
</template>

<style lang="scss" scoped>
.borderButton {
  display: flex;
  justify-content: center;
  background-color: #cecece66;
}
</style>
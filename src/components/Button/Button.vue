<script setup lang="ts">
defineProps<{
  onClick?: () => any,
  rounded?: boolean,
  color?: string,
  textColor?: string,
}>()

</script>

<template>
  <button
    class="inline-block text-base font-normal text-center whitespace-nowrap align-middle select-none px-5 py-2.5 bg-primary-color text-text-color cursor-pointer leading-normal hover:bg-primary-dark-color ease-in duration-150"
    :class="{
      'rounded-full': rounded,
    }"
    :style="{
      'background-color': color
    }"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped>

</style>
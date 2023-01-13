<script setup lang="ts">
defineProps<{
  onClick?: () => any
}>()
</script>

<template>
  <button class="inline-block text-base font-normal text-center whitespace-nowrap align-middle select-none border border-black px-5 py-2.5 bg-primary-color text-text-color cursor-pointer leading-normal rounded hover:bg-primary-dark-color ease-in duration-150" @click="onClick">
    <slot></slot>
  </button>
</template>

<style scoped>

</style>
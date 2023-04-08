<script setup lang="ts">
import SupervisorAccount from "@/components/icons/SupervisorAccount.vue";
import Join from "@/components/icons/Join.vue";

defineProps<{
  roomName: string
}>()

</script>

<template>
  <div class="group flex flex-row justify-between items-center cursor-pointer my-2.5">
    <div class="flex flex-row items-center">
      <SupervisorAccount class="w-5 h-auto fill-white group-hover:fill-primary-color ease-in duration-150" />
      <h2 class="ml-2.5 text-base group-hover:text-primary-color ease-in duration-150">{{ roomName }}</h2>
    </div>
    <Join class="w-4 h-auto fill-white group-hover:fill-primary-color ease-in duration-150"/>
  </div>
</template>

<style scoped>

</style>
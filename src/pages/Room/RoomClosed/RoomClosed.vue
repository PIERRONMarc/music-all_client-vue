<template>
  <div class="h-full flex flex-col gap-10 justify-center items-center">
    <WarningIcon class="w-3/5 sm:max-w-[300px] h-auto" />
    <p class="text-base">This room is closed.</p>
    <Button :on-click="() => $emit('roomCreated')">Create a new one</Button>
  </div>
</template>

<script setup lang="ts">
import WarningIcon from "@/components/icons/WarningIcon.vue";
import Button from "@/components/Button/Button.vue";

interface Emits {
  (event: "roomCreated"): void;
}

defineEmits<Emits>();
</script>
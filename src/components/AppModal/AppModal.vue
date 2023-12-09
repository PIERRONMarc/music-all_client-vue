<template>
  <Teleport to="body">
    <div
        class="left-0 top-0 z-50 fixed w-full h-full grid place-items-center bg-black/20 px-6"
        @click.self="$emit('update:isOpen', false)"
        v-if="isOpen"
    >
        <slot></slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean;
}

interface Emits {
  (event: "update:isOpen", value: boolean): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
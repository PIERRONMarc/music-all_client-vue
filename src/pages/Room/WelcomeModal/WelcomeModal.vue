<template>
  <AppModal v-model="modelValue">
    <div class="bg-bg-light-color text-text-color w-full max-w-[500px] h-[150px] flex flex-col justify-between">
      <h5 class="text-xl p-4">Welcome to room <span class="italic">{{ currentRoomName}}</span></h5>
      <div class="p-4 flex justify-end gap-4">
        <Button color="text-disabled" secondary :on-click="closeModal">Close</Button>
        <Button :on-click="closeModal">Start player</Button>
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/AppModal/AppModal.vue";
import {computed, toRefs } from "vue";
import Button from "@/components/Button/Button.vue";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";

interface Props {
  modelValue: boolean;
}

interface Emits {
  (event: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();
const { modelValue } = toRefs(props);
const roomStore = useRoomStore();
const { currentRoom } = storeToRefs(roomStore);

const currentRoomName = computed(() => {
  if (!currentRoom.value) return "";

  return currentRoom.value.name;
})

const closeModal = () => emit('update:modelValue', false);
</script>
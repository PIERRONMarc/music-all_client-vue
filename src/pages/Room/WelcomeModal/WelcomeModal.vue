<template>
  <AppModal v-model:is-open="isModalOpen">
    <div class="bg-bg-light-color text-text-color w-full max-w-[500px] h-[150px] flex flex-col justify-between">
      <h5 class="text-xl p-4">Welcome to room <span class="italic">{{ currentRoomName}}</span></h5>
      <div class="p-4 flex justify-end">
        <Button :on-click="closeModal">Start player</Button>
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/AppModal/AppModal.vue";
import {computed, ref, watch} from "vue";
import Button from "@/components/Button/Button.vue";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";

interface Props {
  isOpen: boolean;
}

interface Emits {
  (event: "update:isOpen", value: boolean): void;
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();
const isModalOpen = ref(props.isOpen);
const roomStore = useRoomStore();
const { currentRoom } = storeToRefs(roomStore);

const currentRoomName = computed(() => {
  if (!currentRoom.value) return "";

  return currentRoom.value.name;
})

const closeModal = () => {
  isModalOpen.value = false;
};

watch(isModalOpen, () => {
  emit('update:isOpen', isModalOpen.value);
})
</script>
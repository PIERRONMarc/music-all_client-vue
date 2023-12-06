<template>
  <div class="h-full flex flex-col gap-10 justify-center items-center">
    <WarningIcon class="w-3/5 sm:max-w-[300px] h-auto" />
    <p class="text-base">This room is closed.</p>
    <Button :on-click="onCreateRoom">Create a new one</Button>
  </div>
</template>

<script setup lang="ts">
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";
import WarningIcon from "@/components/icons/WarningIcon.vue";
import Button from "@/components/Button/Button.vue";
import RoomService from "@/services/Api/RoomService";
import router from "@/router";

interface Emits {
  (event: "roomCreated"): void;
}

const emit = defineEmits<Emits>();
const roomStore = useRoomStore();
const { currentRoom, currentGuest } = storeToRefs(roomStore);

async function onCreateRoom() {
  try {
    const createRoomResponse = await RoomService.create();
    currentRoom.value = createRoomResponse;
    currentGuest.value = createRoomResponse.host;
    await router.push({name: 'room', params: {id: createRoomResponse.id}})
  } catch (e) {
    console.error(e)
    // TODO display a popup for failed creation
  }
  emit("roomCreated");
}
</script>
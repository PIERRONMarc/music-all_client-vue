<template>
  <div>
    <RoomTemplate>
      <template v-slot:loader>
        <PulseLoader v-if="isCurrentRoomLoading" />
      </template>
      <template v-slot:roomHeader>
        <RoomHeader @toggleGuestList="toggleGuestList" />
      </template>
      <template v-slot:guestList>
        <GuestList :show-guest-list="showGuestList" />
      </template>
      <template v-slot:roomQueue>
        <RoomQueue :on-add-song="addSong" />
      </template>
      <template v-slot:roomPlayer>
        <RoomPlayer />
      </template>
    </RoomTemplate>
  </div>
</template>

<script setup lang="ts">
import RoomTemplate from "@/pages/Room/RoomTemplate/RoomTemplate.vue";
import RoomHeader from "@/pages/Room/RoomHeader/RoomHeader.vue";
import GuestList from "@/pages/Room/GuestList/GuestList.vue";
import {onMounted, onUnmounted, ref} from "vue";
import RoomQueue from "@/pages/Room/RoomQueue/RoomQueue.vue";
import RoomPlayer from "@/pages/Room/RoomPlayer/RoomPlayer.vue";
import RoomService from "@/services/Api/RoomService";
import PulseLoader from "@/components/PulseLoader/PulseLoader.vue";
import router from "@/router";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";
import type {GuestPreview, GuestJoinMessage} from "@/types";
import {MessageActions} from "@/types";
import {createRoomEventSource} from "@/services/Api/ServiceSentEventService";

const showGuestList = ref<boolean>(false);
const isCurrentRoomLoading = ref<boolean>(true);
const roomStore = useRoomStore();
const { currentRoom, currentGuest } = storeToRefs(roomStore);
const roomEventSource = ref<EventSource>();

const joinRoom = async () => {
  try {
    const joinRoomResponse = await RoomService.join(router.currentRoute.value.params.id as string);
    currentRoom.value = joinRoomResponse.room;
    currentGuest.value = joinRoomResponse.guest;
  } catch (e) {
    console.error(e)
  }
  isCurrentRoomLoading.value = false;
}

const shouldJoinRoom = !currentRoom.value || (currentRoom.value && currentRoom.value.id !== router.currentRoute.value.params.id as string);

const toggleGuestList = () => {
    showGuestList.value = !showGuestList.value;
}

const addSong = async (songUrl: string, roomId: string, token: string) => {
  await RoomService.addSong(songUrl, roomId, token);
}

const onGuestJoinMessage = (message: GuestJoinMessage) => {
  const guest: GuestPreview = {
    name: message.payload.name,
    role: message.payload.role,
  }
  currentRoom.value?.guests.push(guest);
}

onMounted(async () => {
  if (shouldJoinRoom) {
    await joinRoom();
  } else {
    isCurrentRoomLoading.value = false;
  }

  if (currentRoom.value) {
    roomEventSource.value = createRoomEventSource(currentRoom.value.id);
    roomEventSource.value.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.action === MessageActions.GuestJoin) onGuestJoinMessage(event.data);
    }
  }
})

onUnmounted(() => {
  roomEventSource.value?.close();
})
</script>
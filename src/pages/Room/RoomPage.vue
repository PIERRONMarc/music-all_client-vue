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
        <GuestList v-if="!isCurrentRoomLoading" :show-guest-list="showGuestList" />
      </template>
      <template v-slot:roomQueue>
        <RoomQueue :on-add-song="addSong" />
      </template>
      <template v-slot:roomPlayer>
        <RoomPlayer
            v-if="!isCurrentRoomLoading && currentRoom?.currentSong"
            @song-ended="onSongEnded"
        />
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
import type {
  GuestPreview,
  GuestJoinMessage,
  AddSongMessage,
  UpdateCurrentSongMessage,
  GuestLeaveMessage
} from "@/types";
import {MessageActions} from "@/types";
import {createRoomEventSource} from "@/services/Api/ServiceSentEventService";

const showGuestList = ref<boolean>(false);
const isCurrentRoomLoading = ref<boolean>(true);
const roomStore = useRoomStore();
const { currentRoom, currentGuest, isCurrentGuestAdmin } = storeToRefs(roomStore);
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

const onSongEnded = () => {
  if (!isCurrentGuestAdmin.value || !currentRoom.value || !currentGuest.value) return;

  RoomService.nextSong(currentRoom.value.id, currentGuest.value.token);
}

const onGuestJoinMessage = (message: GuestJoinMessage) => {
  const guest: GuestPreview = {
    name: message.payload.name,
    role: message.payload.role,
  }
  currentRoom.value?.guests.push(guest);
}

const onAddSongMessage = (message: AddSongMessage) => {
  roomStore.addSong({
    ...message.payload,
    lengthInSeconds: parseInt(message.payload.lengthInSeconds),
    isPause: true,
  });
}

const onUpdateCurrentSongMessage = (message: UpdateCurrentSongMessage) => {
  if (!currentRoom.value?.currentSong) return;

  currentRoom.value.currentSong.isPause = message.payload.isPaused;
}

const onNextSongMessage = () => {
  roomStore.nextSong();
}

const leaveRoom = () => {
  if (!currentGuest.value) return;

  RoomService.leaveRoom(currentGuest.value.token);
  currentRoom.value = null;
  currentGuest.value = null;
}

const onGuestLeave = (message: GuestLeaveMessage) => {
  roomStore.removeGuest(message.payload.name);
}

onUnmounted(() => {
  window.removeEventListener('unload', leaveRoom, false);
  leaveRoom();
})

onMounted(async () => {
  if (shouldJoinRoom) {
    await joinRoom();
  } else {
    isCurrentRoomLoading.value = false;
  }

  if (!currentRoom.value) return;

  roomEventSource.value = createRoomEventSource(currentRoom.value.id);
  roomEventSource.value.onmessage = (event) => {
    const messageData = JSON.parse(event.data);
    if (messageData.action === MessageActions.GuestJoin) onGuestJoinMessage(messageData);
    if (messageData.action === MessageActions.AddSong) onAddSongMessage(messageData);
    if (messageData.action === MessageActions.UpdateCurrentSong) onUpdateCurrentSongMessage(messageData);
    if (messageData.action === MessageActions.NextSong) onNextSongMessage();
    if (messageData.action === MessageActions.GuestLeave) onGuestLeave(messageData);
  }

  window.addEventListener('unload', leaveRoom, false);
})

onUnmounted(() => {
  roomEventSource.value?.close();
})
</script>
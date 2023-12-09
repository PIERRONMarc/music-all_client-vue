<template>
  <div>
    <RoomTemplate>
      <template v-slot:welcomeModal>
        <WelcomeModal v-model="isWelcomeModalOpen" />
      </template>
      <template v-slot:loader>
        <PulseLoader v-if="isCurrentRoomLoading" />
      </template>
      <template v-slot:roomHeader>
        <RoomHeader @toggleGuestList="toggleGuestList" />
      </template>
      <template v-slot:guestList>
        <GuestList v-if="!isCurrentRoomLoading" :show-guest-list="showGuestList" />
      </template>
      <template v-if="!isRoomClosed" v-slot:roomQueue>
        <RoomQueue :on-add-song="addSong" @delete-song="onDeleteSong" :is-adding-song="isAddingSong"/>
      </template>
      <template v-if="isRoomClosed" v-slot:roomClosed>
        <RoomClosed @room-created="onRoomCreated" />
      </template>
      <template v-slot:roomPlayer>
        <RoomPlayer
            v-if="!isCurrentRoomLoading && currentRoom?.currentSong"
            v-model:should-restart-player="shouldRestartPlayer"
            @song-ended="onSongEnded"
            @ready="onPlayerReady"
        />
      </template>
    </RoomTemplate>
  </div>
</template>

<script setup lang="ts">
import RoomTemplate from "@/pages/Room/RoomTemplate/RoomTemplate.vue";
import RoomHeader from "@/pages/Room/RoomHeader/RoomHeader.vue";
import GuestList from "@/pages/Room/GuestList/GuestList.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";
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
  GuestLeaveMessage,
  UpdateGuestMessage,
  DeleteSongMessage,
} from "@/types";
import {MessageActions} from "@/types";
import {createRoomEventSource} from "@/services/Api/ServiceSentEventService";
import WelcomeModal from "@/pages/Room/WelcomeModal/WelcomeModal.vue";
import RoomClosed from "@/pages/Room/RoomClosed/RoomClosed.vue";

const showGuestList = ref<boolean>(false);
const isCurrentRoomLoading = ref<boolean>(true);
const shouldRestartPlayer = ref<boolean>(false);
const roomStore = useRoomStore();
const { currentRoom, currentGuest, isCurrentGuestAdmin } = storeToRefs(roomStore);
const roomEventSource = ref<EventSource>();
const isWelcomeModalOpen = ref<boolean>(false);
const isRoomClosed = ref<boolean>(false);
const isAddingSong = ref<boolean>(false);

const joinRoom = async () => {
  try {
    const joinRoomResponse = await RoomService.join(router.currentRoute.value.params.id as string);
    currentRoom.value = joinRoomResponse.room;
    currentGuest.value = joinRoomResponse.guest;
  } catch (error: any) {
    if (error.status == 404) {
      isRoomClosed.value = true;
    }
  }
  isCurrentRoomLoading.value = false;
}

const shouldJoinRoom = !currentRoom.value || (currentRoom.value && currentRoom.value.id !== router.currentRoute.value.params.id as string);

const toggleGuestList = () => {
    showGuestList.value = !showGuestList.value;
}

const addSong = async (songUrl: string, roomId: string, token: string) => {
  isAddingSong.value = true;
  try {
    await RoomService.addSong(songUrl, roomId, token);
  } catch (e) {
    // TODO let the user now it failed (by adding a notification system for example)
    console.error(e);
  }
  isAddingSong.value = false;
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
    isPaused: true,
  });
}

const onUpdateCurrentSongMessage = (message: UpdateCurrentSongMessage) => {
  if (!currentRoom.value?.currentSong) return;

  currentRoom.value.currentSong.isPaused = message.payload.isPaused;
}

const onPlayerReady = () => {
  // We want to force the user to have interaction with the app (if he has not) to start the player, otherwise it would not start because of autoplay browsers policies
  if (!window.navigator.userActivation.hasBeenActive) {
    isWelcomeModalOpen.value = true;
  }
}

const onNextSongMessage = () => {
  // If next song has the same url, iframe will not update, so we restart the video
  if (roomStore.getNextSong()?.url === roomStore.getCurrentSong()?.url) {
    shouldRestartPlayer.value = true;
  }

  roomStore.playNextSong();
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

const onGuestUpdate = (message: UpdateGuestMessage) => {
  roomStore.updateGuest(message.payload.name, message.payload.role);
}

const onRoomCreated = () => {
  isRoomClosed.value = false;
}

const onDeleteSong = (id: string) => {
  if (!currentRoom.value || !currentGuest.value || !isCurrentGuestAdmin.value) return;

  RoomService.deleteSong(currentRoom.value.id, id,  currentGuest.value.token);
}

const onDeleteSongMessage = (message: DeleteSongMessage) => {
  roomStore.deleteSong(message.payload.songId);
}

watch(isWelcomeModalOpen, () => {
  if (!isWelcomeModalOpen.value) {
    shouldRestartPlayer.value = true;
  }
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
    if (messageData.action === MessageActions.UpdateGuest) onGuestUpdate(messageData);
    if (messageData.action === MessageActions.DeleteSong) onDeleteSongMessage(messageData);
  }

  window.addEventListener('unload', leaveRoom, false);
})

onUnmounted(() => {
  roomEventSource.value?.close();
  window.removeEventListener('unload', leaveRoom, false);
  leaveRoom();
})
</script>
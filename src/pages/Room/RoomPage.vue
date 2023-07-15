<template>
  <div>
    <RoomTemplate>
      <template v-slot:loader>
        <PulseLoader v-if="isCurrentRoomLoading" />
      </template>
      <template v-slot:roomHeader>
        <RoomHeader @toggleGuestList="toggleGuestList" :current-room-name="currentRoom ? currentRoom.name : null" />
      </template>
      <template v-slot:guestList>
        <GuestList v-if="currentRoom" :show-guest-list="showGuestList" :guests="currentRoom.guests"/>
      </template>
      <template v-slot:roomQueue>
        <RoomQueue v-if="currentRoom" :songs="currentRoom.songs" :current-song="currentRoom.currentSong" />
      </template>
      <template v-slot:roomPlayer>
        <RoomPlayer v-if="currentRoom" :current-song="currentRoom.currentSong" />
      </template>
    </RoomTemplate>
  </div>
</template>

<script setup lang="ts">
import RoomTemplate from "@/pages/Room/RoomTemplate/RoomTemplate.vue";
import RoomHeader from "@/pages/Room/RoomHeader/RoomHeader.vue";
import GuestList from "@/pages/Room/GuestList/GuestList.vue";
import {ref} from "vue";
import RoomQueue from "@/pages/Room/RoomQueue/RoomQueue.vue";
import RoomPlayer from "@/pages/Room/RoomPlayer/RoomPlayer.vue";
import RoomService from "@/services/Api/RoomService";
import type {Room} from "@/types";
import PulseLoader from "@/components/PulseLoader/PulseLoader.vue";
import router from "@/router";

const showGuestList = ref<boolean>(false);
const currentRoom = ref<Room|null>(null);
const isCurrentRoomLoading = ref<boolean>(true);

const joinRoom = async () => {
  try {
    const joinRoomResponse = await RoomService.join(router.currentRoute.value.params.id as string);
    currentRoom.value = joinRoomResponse.room;
  } catch (e) {
    console.error(e)
  }
  isCurrentRoomLoading.value = false;
}

joinRoom();

const toggleGuestList = () => {
    showGuestList.value = !showGuestList.value;
}
</script>
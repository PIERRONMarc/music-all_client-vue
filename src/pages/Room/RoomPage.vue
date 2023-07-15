<template>
  <div>
    <RoomTemplate>
      <template v-slot:roomHeader>
        <RoomHeader @toggleGuestList="toggleGuestList" />
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

const showGuestList = ref<boolean>(false);
const currentRoom = ref<Room|null>(null);

const joinRoom = async () => {
  try {
    const joinRoomResponse = await RoomService.join('da119633-9ee5-38c0-93a0-993049f6e6bf');
    currentRoom.value = joinRoomResponse.room;
  } catch (e) {
    console.error(e)
  }
}

joinRoom();

const toggleGuestList = () => {
    showGuestList.value = !showGuestList.value;
}
</script>
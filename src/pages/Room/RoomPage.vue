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
        <RoomQueue />
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
import {ref} from "vue";
import RoomQueue from "@/pages/Room/RoomQueue/RoomQueue.vue";
import RoomPlayer from "@/pages/Room/RoomPlayer/RoomPlayer.vue";
import RoomService from "@/services/Api/RoomService";
import PulseLoader from "@/components/PulseLoader/PulseLoader.vue";
import router from "@/router";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";

const showGuestList = ref<boolean>(false);
const isCurrentRoomLoading = ref<boolean>(true);
const roomStore = useRoomStore();
const { currentRoom } = storeToRefs(roomStore);

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
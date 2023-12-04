<script setup lang="ts">
import HomeTemplate from "@/pages/HomePage/HomeTemplate/HomeTemplate.vue";
import Hero from "@/components/Hero/Hero.vue";
import Mello from "@/components/icons/MelloIcon.vue";
import RoomList from "@/components/RoomList/RoomList.vue";
import {onMounted, ref, onUnmounted} from "vue";
import RoomService from "@/services/Api/RoomService";
import type {DeleteRoomMessage, RoomPreview} from "@/types";
import router from "@/router";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";
import {createRoomListEventSource} from "@/services/Api/ServiceSentEventService";
import {MessageActions} from "@/types";

const roomList = ref<RoomPreview[]>([])
const roomListIsLoading = ref<boolean>(true)
const hasRoomListFailedWhileLoading = ref<boolean>(false)
const roomListEventSource = ref<EventSource>();
const roomStore = useRoomStore();
const { currentRoom, currentGuest } = storeToRefs(roomStore);

async function getRooms() {
  hasRoomListFailedWhileLoading.value = false
  roomListIsLoading.value = true

  try {
    roomList.value = await RoomService.getAll(0)
    roomListIsLoading.value = false
  } catch (e) {
    hasRoomListFailedWhileLoading.value = true
    roomListIsLoading.value = false
  }
}

async function createRoom() {
  try {
    const createRoomResponse = await RoomService.create();
    currentRoom.value = createRoomResponse;
    currentGuest.value = createRoomResponse.host;
    await router.push({name: 'room', params: {id: createRoomResponse.id}})
  } catch (e) {
    console.error(e)
    // TODO display a popup for failed creation
  }
}

function onDeleteRoom(message: DeleteRoomMessage): void
{
  roomList.value = roomList.value.filter(room => room.name !== message.payload.name);
}

onMounted(() => {
  getRooms();

  roomListEventSource.value = createRoomListEventSource();
  roomListEventSource.value.onmessage = (event) => {
    const messageData = JSON.parse(event.data);
    if (messageData.action === MessageActions.DeleteRoom) onDeleteRoom(messageData);
  }
})

onUnmounted(() => {
  roomListEventSource.value?.close();
})
</script>

<template>
  <HomeTemplate>
    <template v-slot:hero>
      <Hero :on-create-room="createRoom" />
    </template>
    <template v-slot:mello>
      <Mello />
    </template>
    <template v-slot:roomList>
      <RoomList :roomList="roomList" :is-loading="roomListIsLoading" :has-failed-while-loading="hasRoomListFailedWhileLoading" :on-retry="getRooms"/>
    </template>
  </HomeTemplate>
</template>

<style scoped>

</style>

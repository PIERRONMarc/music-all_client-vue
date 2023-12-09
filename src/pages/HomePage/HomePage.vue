<script setup lang="ts">
import HomeTemplate from "@/pages/HomePage/HomeTemplate/HomeTemplate.vue";
import Hero from "@/components/Hero/Hero.vue";
import Mello from "@/components/icons/MelloIcon.vue";
import RoomList from "@/components/RoomList/RoomList.vue";
import {onMounted, ref, onUnmounted} from "vue";
import RoomService from "@/services/Api/RoomService";
import type {CreateRoomMessage, DeleteRoomMessage, RoomPreview} from "@/types";
import router from "@/router";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";
import {createRoomListEventSource} from "@/services/Api/ServiceSentEventService";
import {MessageActions} from "@/types";
import {useToast} from "vue-toast-notification";

const roomList = ref<RoomPreview[]>([])
const roomListIsLoading = ref<boolean>(true)
const hasRoomListFailedWhileLoading = ref<boolean>(false)
const roomListEventSource = ref<EventSource>();
const roomStore = useRoomStore();
const { currentRoom, currentGuest } = storeToRefs(roomStore);
const $toast = useToast();

async function getRooms() {
  hasRoomListFailedWhileLoading.value = false
  roomListIsLoading.value = true

  try {
    roomList.value = await RoomService.getAll(0)
    roomListIsLoading.value = false
  } catch (e) {
    hasRoomListFailedWhileLoading.value = true
    roomListIsLoading.value = false
    $toast.error("Oops, something went wrong. Please try again later.")
  }
}

async function createRoom() {
  try {
    const createRoomResponse = await RoomService.create();
    currentRoom.value = createRoomResponse;
    currentGuest.value = createRoomResponse.host;
    await router.push({name: 'room', params: {id: createRoomResponse.id}})
  } catch (e) {
    $toast.error("Oops, something went wrong. Please try again later.")
  }
}

function onDeleteRoom(message: DeleteRoomMessage): void
{
  roomList.value = roomList.value.filter(room => room.name !== message.payload.name);
}

function onCreateRoom(message: CreateRoomMessage): void
{
  roomList.value.push(message.payload);
}

onMounted(() => {
  getRooms().catch(e => {
    $toast.error("Oops, we could not get the room list. Please refresh the page.")
  });

  roomListEventSource.value = createRoomListEventSource();
  roomListEventSource.value.onmessage = (event) => {
    const messageData = JSON.parse(event.data);
    if (messageData.action === MessageActions.DeleteRoom) onDeleteRoom(messageData);
    if (messageData.action === MessageActions.CreateRoom) onCreateRoom(messageData);
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

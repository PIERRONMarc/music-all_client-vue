<script setup lang="ts">
import HomeTemplate from "@/components/templates/HomeTemplate.vue";
import Hero from "@/components/molecules/Hero.vue";
import Mello from "@/components/icons/Mello.vue";
import RoomList from "@/components/molecules/RoomList.vue";
import type Room from "@/interfaces/Room";
import {onMounted, ref} from "vue";
import RoomService from "@/services/Api/RoomService";

const roomList = ref<Room[]>([])
const roomListIsLoading = ref<boolean>(true)
const hasRoomListFailedWhileLoading = ref<boolean>(false)

async function getRooms() {
  hasRoomListFailedWhileLoading.value = false
  roomListIsLoading.value = true

  try {
    await new Promise(r => setTimeout(r, 500));
    const data = await RoomService.getAll(0);
    roomList.value.push(...data.rooms);
    roomListIsLoading.value = false
  } catch (e) {
    hasRoomListFailedWhileLoading.value = true
    roomListIsLoading.value = false
  }
}

onMounted(() => {
  getRooms()
})

</script>

<template>
  <HomeTemplate>
    <template v-slot:hero>
      <Hero />
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

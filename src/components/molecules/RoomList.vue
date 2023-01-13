<script setup lang="ts">
import type Room from "@/interfaces/Room";
import RoomItem from "@/components/atoms/RoomItem.vue";

defineProps<{
  roomList: Room[]
}>()
</script>

<template>
  <div>
    <h2 class="font-montserrat text-4xl my-7">Join a room</h2>
    <RoomItem v-for="room in roomList" :room-name="room.name" />
  </div>

</template>

<style>

</style>
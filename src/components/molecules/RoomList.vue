<script setup lang="ts">
import type Room from "@/interfaces/Room";
import RoomItem from "@/components/atoms/RoomItem.vue";
import Warning from "@/components/icons/Warning.vue";
import Button from "@/components/atoms/Button.vue";
import PulseLoader from "@/components/atoms/PulseLoader.vue";

defineProps<{
  roomList: Room[],
  hasFailedWhileLoading: boolean
  isLoading?: boolean,
  onRetry?: () => any
}>()
</script>

<template>
  <div class="flex flex-row justify-center items-center w-full h-full" v-if="isLoading">
    <PulseLoader/>
  </div>
  <div v-else-if="hasFailedWhileLoading" class="h-full flex flex-col justify-center items-center">
    <Warning class="w-4/5 h-auto" />
    <p class="mt-14 mb-3.5 text-base">Oh no, something went wrong !</p>
    <Button @click="onRetry">Try again</Button>
  </div>
  <div v-else>
    <h2 class="font-montserrat text-4xl my-7">Join a room</h2>
    <RoomItem v-for="room in roomList" :room-name="room.name"></RoomItem>
  </div>
</template>

<style>

</style>
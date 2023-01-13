<script setup lang="ts">
import HomeTemplate from "@/components/templates/HomeTemplate.vue";
import Hero from "@/components/molecules/Hero.vue";
import Mello from "@/components/icons/Mello.vue";
import RoomList from "@/components/molecules/RoomList.vue";
import type Room from "@/interfaces/Room";

const roomList: Room[] = [
  {
    id: '1a6f8083-6a6d-4c30-b8a9-ad396bd90bdd',
    name: 'Red Rocks'
  },
  {
    id: '034c5d3c-5a4b-43be-b3d6-38f261bd8716',
    name: 'Bercy'
  }
]
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
      <RoomList :roomList="roomList" />
    </template>
  </HomeTemplate>
</template>

<style scoped>

</style>

<template>
  <div>
      <RoomTemplate>
          <template v-slot:roomHeader>
              <RoomHeader @toggleGuestList="toggleGuestList" />
          </template>
          <template v-slot:guestList>
              <GuestList :show-guest-list="showGuestList" />
          </template>
          <template v-slot:roomQueue>
              <RoomQueue />
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

const showGuestList = ref(false);

const toggleGuestList = () => {
    showGuestList.value = !showGuestList.value;
}
</script>
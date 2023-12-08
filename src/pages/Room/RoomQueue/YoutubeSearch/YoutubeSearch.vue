<template>
  <div v-if="currentRoom && currentGuest">
    <label for="search" class="sr-only">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon class="w-5 h-5 text-gray-500 fill-none" />
      </div>
      <input type="search" v-model="songUrl" id="search" class="block w-full p-4 pl-10 text-sm text-white rounded-lg bg-bg-alternative outline-0" placeholder="Paste a Youtube video or playlist URL" required>
      <button
          class="text-white w-20 absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 bg-primary-color"
          @click="onAddClick"
      >
        <PulseLoader v-if="isAddingSong" />
        <span v-else>Add</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button/Button.vue";
import SearchIcon from "@/components/icons/searchIcon.vue";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import PulseLoader from "@/components/PulseLoader/PulseLoader.vue";

const props = defineProps<{
  onAddSong: Function;
  isAddingSong: boolean;
}>();

const songUrl = ref<string>("");
const roomStore = useRoomStore();
const { currentRoom, currentGuest } = storeToRefs(roomStore);

function onAddClick() {
  if (!currentRoom.value || !currentGuest.value) return;

  props.onAddSong(songUrl.value, currentRoom.value.id, currentGuest.value.token);
  songUrl.value = "";
}
</script>
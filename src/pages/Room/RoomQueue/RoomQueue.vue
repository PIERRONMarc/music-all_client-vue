<template>
  <section>
    <h1 class="font-montserrat text-2xl mb-8">Queue</h1>
    <div class="mb-8" v-if="isCurrentGuestAdmin">
      <YoutubeSearch :on-add-song="onAddSong" :is-adding-song="isAddingSong" />
    </div>
    <div class="max-h-[calc(100vh-24rem)] overflow-auto">
      <SongItem
          v-if="currentRoom && currentRoom.currentSong"
          :index="1"
          :id="currentRoom.currentSong.id"
          :title="currentRoom.currentSong.title"
          :author="currentRoom.currentSong.author"
          :length-in-seconds="currentRoom.currentSong.lengthInSeconds"
          :is-current-song="true"
      />
      <SongItem
          v-if="currentRoom && currentRoom.songs.length > 0"
          v-for="(song, index) in currentRoom.songs.values()"
          :key="index + 1"
          :index="index"
          :id="song.id"
          :title="song.title"
          :author="song.author"
          :length-in-seconds="song.lengthInSeconds"
          :is-current-song="false"
          @delete-song="onDeleteSong"
      />
    </div>
    <div v-if="currentRoom && !currentRoom.currentSong && currentRoom.songs.length === 0" class="h-full flex flex-col justify-center items-center">
      <ComposeMusicIcon class="w-3/5 sm:max-w-[300px] h-auto" />
      <p v-if="isCurrentGuestAdmin" class="mt-14 mb-3.5 text-base">Add some songs to the queue !</p>
      <p v-else class="mt-14 mb-3.5 text-base">Waiting for the admin to add songs to the queue.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import SongItem from "@/pages/Room/RoomQueue/SongItem/SongItem.vue";
import ComposeMusicIcon from "@/components/icons/ComposeMusicIcon.vue";
import YoutubeSearch from "@/pages/Room/RoomQueue/YoutubeSearch/YoutubeSearch.vue";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";

defineProps<{
  onAddSong: Function;
  isAddingSong: boolean;
}>();

const emit = defineEmits<{
  (event: "deleteSong", id: string): void;
}>();

const roomStore = useRoomStore();
const { currentRoom, isCurrentGuestAdmin } = storeToRefs(roomStore);

function onDeleteSong(id: string) {
  emit("deleteSong", id);
}
</script>
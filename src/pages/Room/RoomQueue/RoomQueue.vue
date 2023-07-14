<template>
    <h1 class="font-montserrat text-2xl mb-8">Queue</h1>
    <div class="mb-8">
        <YoutubeSearch />
    </div>
    <SongItem
        v-if="currentSong"
        :index="1"
        :name="currentSong.name"
        :author="currentSong.author"
        :length-in-seconds="currentSong.lengthInSeconds"
        :is-current-song="true"
    />
    <SongItem
        v-if="songs.length > 0"
        v-for="(song, index) in songs"
        :key="index + 1"
        :index="index"
        :name="song.name"
        :author="song.author"
        :length-in-seconds="song.lengthInSeconds"
        :is-current-song="false"
    />
    <div v-if="!currentSong && songs.length === 0" class="h-full flex flex-col justify-center items-center">
        <ComposeMusicIcon class="w-3/5 sm:max-w-[300px] h-auto" />
        <p class="mt-14 mb-3.5 text-base">Add some songs to the queue !</p>
    </div>
</template>

<script setup lang="ts">
import SongItem from "@/pages/Room/RoomQueue/SongItem/SongItem.vue";
import ComposeMusicIcon from "@/components/icons/ComposeMusicIcon.vue";
import YoutubeSearch from "@/pages/Room/RoomQueue/YoutubeSearch/YoutubeSearch.vue";
import type {Song} from "@/types";

defineProps<{
  songs: Song[],
  currentSong: Song|null,
}>()
</script>
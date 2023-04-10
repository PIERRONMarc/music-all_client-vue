<template>
    <h1 class="font-montserrat text-2xl mb-8">Queue</h1>
    <SongItem
        v-if="songs.length > 0"
        v-for="(song, index) in songs"
        :key="index"
        :index="index"
        :name="song.name"
        :author="song.author"
        :length-in-seconds="song.lengthInSeconds"
    />
    <div v-else class="h-full flex flex-col justify-center items-center">
        <ComposeMusicIcon class="w-3/5 h-auto" />
        <p class="mt-14 mb-3.5 text-base">Add some songs to the queue !</p>
    </div>
</template>

<script setup lang="ts">
import SongItem from "@/pages/Room/RoomQueue/SongItem/SongItem.vue";
import ComposeMusicIcon from "@/components/icons/ComposeMusicIcon.vue";

interface Song {
    url: string,
    isPause: boolean,
    name: string,
    author: string,
    lengthInSeconds: number
}

const songs: Song[] = [{
    url: "https://www.youtube.com/watch?v=ZUrPZmWBbPQ&ab_channel=JimiHendrix-Topic",
    isPause: false,
    name: "Little Wing",
    author: "Jimmy Hendrix",
    lengthInSeconds: 145
}, {
    url: "https://www.youtube.com/watch?v=ayuooyWPEUc&ab_channel=RoadrunnerRecords",
    isPause: false,
    name: "The Wombats - Let's Dance To Joy Division [OFFICIAL VIDEO]",
    author: "Roadrunner Records",
    lengthInSeconds: 195
}]

</script>
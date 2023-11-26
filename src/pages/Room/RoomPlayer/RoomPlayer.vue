<template>
  <div>
    <div class="fixed bottom-0 w-full bg-bg-light-color h-20 flex flex-row">
      <div class="flex flex-row items-center w-full gap-4 px-8 md:pr-0">
        <div class="flex flex-row items-center gap-2">
          <SoundIcon class="fill-white w-4 h-4"/>
          <PlayIcon v-if="isPaused" class="fill-white w-10 h-10" @click="togglePlay"/>
          <PauseCircleFilledIcon v-else class="fill-white w-10 h-10" @click="togglePlay"/>
          <SkipNextIcon class="w-3 h-3 fill-white"/>
        </div>
        <div v-if="currentSong" class="flex flex-col overflow-hidden">
          <div class="truncate font-bold">
            {{ currentSong.title }}
          </div>
          <div class="truncate text-sm">
            {{ currentSong.author }}
          </div>
        </div>
        <YoutubeIframe
            v-if="currentSong"
            ref="youtubePlayer"
            class="absolute md:static right-0 -bottom-96 md:h-[204px] md:w-[345px] md:self-end md:ml-auto"
            :video-id="currentSong.url"
            @state-change="onPlayerStateChange"
            :player-vars="{
              disablekb: 1,
              controls: 0,
              autoplay: 1,
            }"
        />
    </div>
    <div class="w-full border-b fixed bottom-0 border-[#BEBEC7] z-0"></div>
    <div class="w-1/2 border-b fixed bottom-0 border-primary-color z-10"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from "@/components/icons/PlayIcon.vue";
import {computed, ref} from "vue";
import PauseCircleFilledIcon from "@/components/icons/PauseCircleFilledIcon.vue";
import SkipNextIcon from "@/components/icons/SkipNextIcon.vue";
import SoundIcon from "@/components/icons/SoundIcon.vue";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";
import {YoutubeIframe, PlayerState} from "@vue-youtube/component";

const isPaused = ref(true);
const youtubePlayer = ref<typeof YoutubeIframe|null>(null);
const roomStore = useRoomStore();
const { currentRoom } = storeToRefs(roomStore);
const currentSong = computed(() => currentRoom.value?.currentSong);

const togglePlay = () => youtubePlayer.value?.togglePlay();

const onPlayerStateChange = (event: {data: PlayerState}) => {
    if (event.data === PlayerState.PLAYING) {
    isPaused.value = false;
  } else if (event.data === PlayerState.PAUSED) {
    isPaused.value = true;
  }
}
</script>
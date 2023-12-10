<template>
  <div>
    <div class="fixed bottom-0 w-full bg-bg-light-color h-20 flex flex-row border-t border-white/20">
      <div class="flex flex-row items-center w-full gap-4 px-8 md:pr-0">
        <div class="flex flex-row items-center gap-2">
          <div
            class="relative"
            @mouseover="displayVolumeControl"
            @mouseleave="hideVolumeControl"
          >
            <VolumeMuted
                v-if="isMuted"
                class="w-4 h-4 fill-white cursor-pointer"
                @click="unMute"
            />
            <VolumeControl
                v-else
                class="fill-white cursor-pointer"
                :class="{
                  'w-4 h-4': isCurrentGuestAdmin,
                  'w-6 h-6': !isCurrentGuestAdmin
                }"
                @click="mute"
            />
            <transition
                enter-active-class="duration-200 ease-out"
                enter-from-class="transform opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="transform opacity-0"
            >
                <div
                    v-if="shouldDisplayVolumeControl"
                    class="absolute h-32 -top-36 left-1/2 rounded-full drop-shadow-lg -translate-x-1/2 bg-bg-light-color w-5 py-2 flex justify-center ease-in duration-150"
                >
                  <slider v-model="volume" orientation="vertical" color="#F74539" />
                </div>
            </transition>
          </div>
          <PlayIcon v-if="isCurrentSongPaused && isCurrentGuestAdmin" class="fill-white w-10 h-10 cursor-pointer" @click="togglePlay"/>
          <PauseCircleFilledIcon v-else-if="isCurrentGuestAdmin" class="fill-white w-10 h-10 cursor-pointer" @click="togglePlay"/>
          <SkipNextIcon v-if="isCurrentGuestAdmin" class="w-3 h-3 fill-white cursor-pointer" @click="onSkip"/>
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
            @ready="onReady"
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
import {computed, ref, watch} from "vue";
import PauseCircleFilledIcon from "@/components/icons/PauseCircleFilledIcon.vue";
import SkipNextIcon from "@/components/icons/SkipNextIcon.vue";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";
import {YoutubeIframe, PlayerState} from "@vue-youtube/component";
import RoomService from "@/services/Api/RoomService";
import {useToast} from "vue-toast-notification";
import slider from "vue3-slider"
import VolumeMuted from "@/components/icons/VolumeMuted.vue";
import VolumeControl from "@/components/icons/VolumeControl.vue";

interface Emits {
  (event: "songEnded"): void;
  (event: "ready"): void;
  (event: "update:shouldRestartPlayer", value: boolean): void;
}

interface Props {
  shouldRestartPlayer: boolean;
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();
const roomStore = useRoomStore();
const { currentRoom, isCurrentGuestAdmin, isCurrentSongPaused, currentGuest, volume } = storeToRefs(roomStore);
const youtubePlayer = ref<typeof YoutubeIframe|null>(null);
const isMuted = ref<boolean>(false);
const shouldDisplayVolumeControl = ref<boolean>(false);
const hideVolumeControlTimeoutId = ref<number|null>(null);
const currentSong = computed(() => currentRoom.value?.currentSong);
const $toast = useToast();

const togglePlay = () => {
  if (!isCurrentGuestAdmin.value) return;

  youtubePlayer.value?.togglePlay()
};

const onPlayerStateChange = async (event: {data: PlayerState}) => {
  if (event.data === PlayerState.PLAYING) {
    await roomStore.togglePause(false);
  } else if (event.data === PlayerState.PAUSED) {
    await roomStore.togglePause(true);
  } else if (event.data === PlayerState.ENDED) {
    emit('songEnded');
  }
}

const onSkip = () => {
  if (!isCurrentGuestAdmin.value || !currentRoom.value || !currentGuest.value) return;

  try {
    RoomService.nextSong(currentRoom.value.id, currentGuest.value.token);
  } catch (e) {
    $toast.error("Oops, something went wrong. Please try again later.")
  }
}

const mute = () => {
  youtubePlayer.value?.instance.mute();
  volume.value = 0;
  isMuted.value = true;
}

const unMute = () => {
  youtubePlayer.value?.instance.unMute();
  volume.value = youtubePlayer.value?.instance.getVolume()
  isMuted.value = false;
}

const displayVolumeControl = () => {
  shouldDisplayVolumeControl.value = true;

  if (hideVolumeControlTimeoutId.value) {
    clearTimeout(hideVolumeControlTimeoutId.value);
  }
}

const hideVolumeControl = () => {
  hideVolumeControlTimeoutId.value = setTimeout(() => {
    shouldDisplayVolumeControl.value = false;
  }, 1000)
}

const onReady = () => {
  emit("ready");
  youtubePlayer.value?.instance.setVolume(volume.value);
}

watch(isCurrentSongPaused, () => {
  // admin initiated the toggle play, so we don't need to do that again for him
  if (isCurrentGuestAdmin.value) return;

  youtubePlayer.value?.togglePlay()
});

watch(() => props.shouldRestartPlayer, () => {
  if (props.shouldRestartPlayer && !isCurrentSongPaused.value) {
    youtubePlayer.value?.instance.seekTo(0, true);
    youtubePlayer.value?.instance.playVideo();
  }

  // we want to sync with the room once the player started
  if (props.shouldRestartPlayer && isCurrentSongPaused.value) {
    youtubePlayer.value?.instance.playVideo();
    youtubePlayer.value?.instance.pauseVideo();
  }

  emit("update:shouldRestartPlayer", false);
});

watch(volume, () => {
  if (isMuted.value) return;

  youtubePlayer.value?.instance.setVolume(volume.value);
  isMuted.value = volume.value === 0;
})
</script>
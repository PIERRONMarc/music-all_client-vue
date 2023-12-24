<template>
    <div
      class="flex flex-row justify-center items-center mb-4"
      :class="{'text-primary-color': isCurrentSong}"
    >
        <div class="flex flex-row gap-4 items-center w-4/6">
            <div v-if="isCurrentSong">
                <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    :src="playingStatus"
                    style="width: 15px;margin: 0"
                ></lottie-player>
            </div>
            <div v-else class="ml-1">
                {{ index + 1 }}
            </div>
            <div class="flex flex-col overflow-hidden">
                <div class="truncate font-bold">
                    {{ title }}
                </div>
                <div class="truncate text-sm">
                    {{ author }}
                </div>
            </div>
        </div>

        <div class="w-1/6 flex flex-row items-center gap-1 justify-center">
            <AccessTime class="fill-white w-4 h-4" :class="{'fill-primary-color': isCurrentSong}" />
            {{ length }}
        </div>
        <div class="w-1/6">
            <HightlightOff
                v-if="!isCurrentSong"
                class="fill-white w-5 h-5 mx-auto cursor-pointer hover:fill-primary-color ease-in duration-150"
                @click="onDeleteSong"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import AccessTime from "@/components/icons/AccessTimeIcon.vue";
import HightlightOff from "@/components/icons/HightlightOffIcon.vue";
import playingStatus from "@/assets/lotties/playing-status.json";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import {computed, toRefs} from "vue";

const props = defineProps<{
    id: string,
    index: number,
    title: string,
    author: string,
    lengthInSeconds: number
    isCurrentSong: boolean
}>();
const { lengthInSeconds } = toRefs(props);
const emit = defineEmits<{
  (event: "deleteSong", id: string): void;
}>();

function onDeleteSong() {
  if (window.confirm("Are you sure to delete this song from the playlist ?")) {
    emit("deleteSong", props.id);
  }
}

const length = computed(() => {
  let length = "";
  const minutes = Math.floor(lengthInSeconds.value / 60);
  if (minutes < 10) {
    length += "0" + minutes + ":";
  }  else {
    length += minutes + ":";
  }

  const seconds = lengthInSeconds.value % 60;
  if (seconds < 10) {
    length += "0" + seconds;
  }  else {
    length += seconds;
  }

  return length;
})
</script>
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
                    {{ name }}
                </div>
                <div class="truncate text-sm">
                    {{ author }}
                </div>
            </div>
        </div>

        <div class="w-1/6 flex flex-row items-center gap-1 justify-center">
            <AccessTime class="fill-white w-4 h-4" :class="{'fill-primary-color': isCurrentSong}" />
            {{  Math.floor(lengthInSeconds / 60) }}:{{ lengthInSeconds % 60 }}
        </div>
        <div class="w-1/6">
            <HightlightOff v-if="!isCurrentSong" class="fill-white w-5 h-5 mx-auto"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import AccessTime from "@/components/icons/AccessTimeIcon.vue";
import HightlightOff from "@/components/icons/HightlightOffIcon.vue";
import {computed} from "vue";
import playingStatus from "@/assets/lotties/playing-status.json";
import * as LottiePlayer from "@lottiefiles/lottie-player";

const props = defineProps<{
    index: number,
    name: string,
    author: string,
    lengthInSeconds: number
}>();

const isCurrentSong = computed(() => props.index === 0);
</script>

<style scoped>

</style>
<template>
    <div v-if="showGuestList && currentRoom" class="h-full bg-bg-light-color pt-12 px-6 absolute w-5/6 right-0 z-30 overflow-scroll">
        <div
            v-for="(guest, index) in currentRoom.guests"
            :key="index"
            class="flex flex-row items-center justify-between mb-3"
        >
            <div>
                {{ guest.name }}
            </div>
            <div>
                <CdIcon class="w-5 h-5" :class="guest.role === 'ADMIN' ? 'fill-primary-color': 'fill-white'"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CdIcon from "@/components/icons/CdIcon.vue";
import {useRoomStore} from "@/stores/room";
import {storeToRefs} from "pinia";

defineProps<{
    showGuestList: boolean,
}>()

const roomStore = useRoomStore();
const { currentRoom } = storeToRefs(roomStore);
</script>
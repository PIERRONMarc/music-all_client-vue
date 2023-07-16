import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {Guest, Room} from "@/types";

export const useRoomStore = defineStore("room", () => {
    const currentRoom = ref<Room|null>(null);
    const currentGuest = ref<Guest|null>(null);
    const isCurrentGuestAdmin = computed(() => currentGuest.value && currentGuest.value.role === 'ADMIN');

    return {currentRoom, currentGuest, isCurrentGuestAdmin};
})
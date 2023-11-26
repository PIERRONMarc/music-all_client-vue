import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {Guest, Room, Song} from "@/types";

export const useRoomStore = defineStore("room", () => {
    const currentRoom = ref<Room|null>(null);
    const currentGuest = ref<Guest|null>(null);
    const isCurrentGuestAdmin = computed(() => currentGuest.value && currentGuest.value.role === 'ADMIN');

    const addSong = (song: Song) => {
        if (!currentRoom.value) return;

        if (currentRoom.value.currentSong) {
            currentRoom.value.songs.push(song);
            return;
        }

        currentRoom.value.currentSong = {
            ...song,
            isPause: false,
        };
    }

    return {
        currentRoom,
        currentGuest,
        isCurrentGuestAdmin,
        addSong
    };
})
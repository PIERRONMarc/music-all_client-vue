import {defineStore} from "pinia";
import {computed, nextTick, ref} from "vue";
import type {Guest, Room, Song} from "@/types";
import RoomService from "@/services/Api/RoomService";

export const useRoomStore = defineStore("room", () => {
    const currentRoom = ref<Room|null>(null);
    const currentGuest = ref<Guest|null>(null);
    const isCurrentGuestAdmin = computed(() => currentGuest.value && currentGuest.value.role === 'ADMIN');
    const isCurrentSongPaused = computed(() => !!(currentRoom.value?.currentSong && currentRoom.value.currentSong.isPause));

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

    const nextSong = () => {
        if (!currentRoom.value) return;

        if (currentRoom.value.songs.length) {
            currentRoom.value.currentSong = currentRoom.value.songs[0];
            currentRoom.value.songs.shift();
            return;
        }

        currentRoom.value.currentSong = null;
    }

    const togglePause = async (isPaused?: boolean) => {
        if (!currentRoom.value?.currentSong || !currentGuest.value || !isCurrentGuestAdmin.value) return;

        const shouldBePaused = isPaused ?? !currentRoom.value.currentSong.isPause;

        await RoomService.togglePause(
            shouldBePaused,
            currentRoom.value.id,
            currentGuest.value.token,
        );
        currentRoom.value.currentSong.isPause = shouldBePaused;
    }

    return {
        currentRoom,
        currentGuest,
        isCurrentGuestAdmin,
        addSong,
        nextSong,
        togglePause,
        isCurrentSongPaused,
    };
})
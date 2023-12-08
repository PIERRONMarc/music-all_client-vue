import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {Guest, GuestPreview, Room, Song, GuestRoles} from "@/types";
import RoomService from "@/services/Api/RoomService";

export const useRoomStore = defineStore("room", () => {
    const currentRoom = ref<Room|null>(null);
    const currentGuest = ref<Guest|null>(null);
    const isCurrentGuestAdmin = computed(() => currentGuest.value && currentGuest.value.role === 'ADMIN');
    const isCurrentSongPaused = computed(() => !!(currentRoom.value?.currentSong && currentRoom.value.currentSong.isPaused));

    const addSong = (song: Song) => {
        if (!currentRoom.value) return;

        if (currentRoom.value.currentSong) {
            currentRoom.value.songs.push(song);
            return;
        }

        currentRoom.value.currentSong = {
            ...song,
            isPaused: false,
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

        const shouldBePaused = isPaused ?? !currentRoom.value.currentSong.isPaused;

        await RoomService.togglePause(
            shouldBePaused,
            currentRoom.value.id,
            currentGuest.value.token,
        );
        currentRoom.value.currentSong.isPaused = shouldBePaused;
    }

    const removeGuest = (guestName: string): void => {
        if (!currentRoom.value) return;

        currentRoom.value.guests = currentRoom.value.guests.filter((guest: GuestPreview) => guestName !== guest.name);
    }

    const updateGuest = (name: string, role: GuestRoles) => {
        if (!currentRoom.value || !currentGuest.value) return;

        currentRoom.value.guests = currentRoom.value.guests.map((guest: GuestPreview) => {
            if (guest.name === name) {
                guest.name = name;
                guest.role = role;
            }

            return guest;
        });

        if (currentGuest.value.name === name) {
            currentGuest.value.name = name;
            currentGuest.value.role = role;
        }
    }

    const deleteSong = (songId: string): void => {
        if (!currentRoom.value) return;

        currentRoom.value.songs = currentRoom.value.songs.filter(song => song.id !== songId);
    }

    return {
        currentRoom,
        currentGuest,
        isCurrentGuestAdmin,
        addSong,
        nextSong,
        togglePause,
        isCurrentSongPaused,
        removeGuest,
        updateGuest,
        deleteSong,
    };
})
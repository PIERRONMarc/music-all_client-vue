import {defineStore} from "pinia";
import {ref} from "vue";
import type {Room} from "@/types";

export const useRoomStore = defineStore("room", () => {
    const currentRoom = ref<Room|null>(null);

    return {currentRoom};
})
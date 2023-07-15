<template>
  <div class="h-16 flex flex-row items-center px-6 gap-x-6 border-b border-white/20">
      <RoomHeaderItem title="Home" path="/" :icon-component="HomeIcon"/>
      <RoomHeaderItem :title="currentRoomName" path="/room" :icon-component="MusicNoteIcon" is-active/>
      <div class="ml-auto">
          <Button :on-click="onClick" rounded :color="showGuestList ? '' : '#FFFFFF'">
              <PeopleIcon :class="showGuestList ? 'fill-white': 'fill-black'"/>
          </Button>
      </div>
  </div>
</template>

<script setup lang="ts">
import HomeIcon from "@/components/icons/HomeIcon.vue";
import MusicNoteIcon from "@/components/icons/MusicNoteIcon.vue";
import RoomHeaderItem from "@/pages/Room/RoomHeader/RoomHeaderItem/RoomHeaderItem.vue";
import Button from "@/components/Button/Button.vue";
import PeopleIcon from "@/components/icons/PeopleIcon.vue";
import {computed, ref} from "vue";

const props = defineProps<{
  currentRoomName: string|null,
}>()

const currentRoomName = computed(() => 'Room' + (props.currentRoomName ? '/' + props.currentRoomName : ''));
const emit = defineEmits(["toggleGuestList"]);
const showGuestList = ref(false);

const onClick = () => {
    showGuestList.value = !showGuestList.value;
    emit("toggleGuestList");
}
</script>
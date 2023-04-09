<template>
  <div class="h-16 flex flex-row items-center px-6 gap-x-6 border-b border-white/20">
      <RoomHeaderItem title="Home" path="/" :icon-component="HomeIcon"/>
      <RoomHeaderItem title="Room" path="/room" :icon-component="MusicNoteIcon" is-active/>
      <div class="ml-auto">
          <Button :on-click="onClick" rounded :color="showGuests ? '' : '#FFFFFF'">
              <PeopleIcon :class="showGuests ? 'fill-white': 'fill-black'"/>
          </Button>
      </div>
  </div>
</template>

<script setup>
import HomeIcon from "@/components/icons/HomeIcon.vue";
import MusicNoteIcon from "@/components/icons/MusicNoteIcon.vue";
import RoomHeaderItem from "@/pages/Room/RoomHeader/RoomHeaderItem/RoomHeaderItem.vue";
import Button from "@/components/Button/Button.vue";
import PeopleIcon from "@/components/icons/PeopleIcon.vue";
import {ref} from "vue";

const showGuests = ref(false);

const onClick = () => {
    showGuests.value = !showGuests.value
}
</script>
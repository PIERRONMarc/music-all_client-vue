<template>
  <div>
      <RoomTemplate>
          <template v-slot:roomHeader>
              <RoomHeader />
          </template>
      </RoomTemplate>
  </div>

</template>

<script setup lang="ts">
import RoomTemplate from "@/pages/Room/RoomTemplate/RoomTemplate.vue";
import RoomHeader from "@/pages/Room/RoomHeader/RoomHeader.vue";
</script>

<style scoped>

</style>
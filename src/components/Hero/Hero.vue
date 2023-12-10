<script setup lang="ts">
import OnlineMedia from "@/components/icons/OnlineMediaIcon.vue";
import Button from "@/components/Button/Button.vue";

defineProps<{
  onCreateRoom: Function
}>();
</script>

<template>
  <div class="flex flex-row justify-between">
    <div>
      <h1 class="font-montserrat text-6xl md:text-8xl font-normal m-0 mb-5 text-white">Music'<span class="text-primary-color">all</span></h1>
      <p class="text-base m-0 mb-10 w-full">
        Listen to your favorite music with your friends ! <br>
        Made with &#10084;&#65039; by <a class="text-primary-color italic" href="https://marcpierron.dev/">@MarcPierron</a>
      </p>
      <Button :on-click="onCreateRoom">Create my room</Button>
    </div>
    <OnlineMedia class="hidden min-[992px]:block -right-24 relative w-60 h-60" />
  </div>
</template>

<style scoped>

</style>


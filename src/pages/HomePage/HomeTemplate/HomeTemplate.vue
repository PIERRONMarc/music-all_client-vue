<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen relative">
    <div class="w-full md:w-3/4 h-auto md:h-screen bg-bg-color flex flex-col md:flex-row justify-center items-center relative z-10 bg-treble-clef-background bg-no-repeat bg-40%">
      <div class="p-16 md:pl-28 w-full">
        <slot name="hero"></slot>
      </div>
      <div id="mello" class="static md:absolute z-50 bottom-0 left-[20%]">
        <slot name="mello"></slot>
      </div>
    </div>
    <div class="grow pb-8 pr-8 pl-8 bg-bg-light-color md:p-[2.5%] max-h-screen overflow-scroll">
      <slot name="roomList"></slot>
    </div>
  </div>
</template>

<style>
@media (max-width: 768px) {
  #mello svg {
    width: 200px;
    height: auto;
  }
}
</style>

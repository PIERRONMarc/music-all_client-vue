<script setup lang="ts">
import OnlineMedia from "@/components/icons/OnlineMedia.vue";
import Button from "@/components/atoms/Button.vue";
</script>

<template>
  <div class="flex flex-row">
    <div>
      <h1 class="font-montserrat text-6xl md:text-8xl font-normal m-0 mb-5 text-white">Music'<span class="text-primary-color">all</span></h1>
      <p class="text-base m-0 mb-10 w-full md:w-3/4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra ut purus et blandit. Proin sit amet justo vulputate, dictum enim non, finibus lacus.
      </p>
      <Button>Create my room</Button>
    </div>
    <OnlineMedia class="hidden min-[992px]:block -right-24 relative" />
  </div>
</template>

<style scoped>

</style>


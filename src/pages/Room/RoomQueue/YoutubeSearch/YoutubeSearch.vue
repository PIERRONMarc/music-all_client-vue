<template>
    <label for="search" class="sr-only">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon class="w-5 h-5 text-gray-500 fill-none" />
        </div>
        <input type="search" id="search" class="block w-full p-4 pl-10 text-sm text-white rounded-lg bg-bg-alternative outline-0" placeholder="Add a song from youtube" required>
        <button class="text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 bg-primary-color">Search</button>
    </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button/Button.vue";
import SearchIcon from "@/components/icons/searchIcon.vue";
</script>

<style scoped>

</style>
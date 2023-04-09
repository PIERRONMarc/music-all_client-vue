<template>
    <router-link :to="path">
        <div
            class="flex flex-row gap-2 items-center"
            :class="isActive ? 'text-primary-color fill-primary-color' : 'text-white fill-white'"
        >
            <component :is="iconComponent" class="w-4 h-4"></component>
            {{ title }}
        </div>
    </router-link>
</template>

<script setup lang="ts">
import type {Component} from "vue";

defineProps<{
    title: string,
    path: string,
    iconComponent: Object,
    isActive?: boolean
}>();
</script>
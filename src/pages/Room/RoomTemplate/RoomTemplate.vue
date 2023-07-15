<template>
  <div>
      <div class="absolute left-1/2 top-1/2">
        <slot name="loader"></slot>
      </div>
      <slot name="roomHeader"></slot>
      <slot name="guestList"></slot>
      <div class="px-6 pt-12">
          <slot name="roomQueue"></slot>
      </div>
      <slot name="roomPlayer"></slot>
  </div>
</template>
<script setup lang="ts">
</script>
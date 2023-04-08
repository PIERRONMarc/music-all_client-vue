<template>
  <div v-show="loading">
    <div class="bg-white w-3 h-3 m-0.5 rounded-full inline-block pulse-animation first-delay"></div>
    <div class="bg-white w-3 h-3 m-0.5 rounded-full inline-block pulse-animation second-delay"></div>
    <div class="bg-white w-3 h-3 m-0.5 rounded-full inline-block pulse-animation third-delay"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.pulse-animation {
  animation-name: pulseStretchDelay;
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(.2,.68,.18,1.08);
  animation-fill-mode: both;
}

.first-delay {
  animation-delay: 0.12s;
}

.second-delay {
  animation-delay: 0.24s;
}

.third-delay {
  animation-delay: 0.36s;
}

@keyframes pulseStretchDelay
{
  0%,
  80%
  {
    transform: scale(1);
    opacity: 1;
  }
  45%
  {
    transform: scale(0.1);
    opacity: 0.7;
  }
}
</style>
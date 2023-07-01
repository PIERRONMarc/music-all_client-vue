<template>
  <div>
      <slot name="roomHeader"></slot>
      <slot name="guestList"></slot>
      <div class="px-6 pt-12">
          <slot name="roomQueue"></slot>
      </div>
      <slot name="roomPlayer"></slot>
  </div>
</template>
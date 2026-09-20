<template>
  <div class="slidev-layout cover">
    <div class="bg" :class="{ 'has-image': background }" :style="background ? { backgroundImage: `url(${background})` } : undefined" aria-hidden="true"></div>
    <div class="cover-content my-auto w-full">
      <slot />
    </div>
    <div class="vignette"></div>
  </div>
</template>
<script setup lang="ts">
import originalCover from '../public/images/cover-original.jpg'

defineProps({
  background: {
    type: String,
    default: originalCover
  },
})
</script>

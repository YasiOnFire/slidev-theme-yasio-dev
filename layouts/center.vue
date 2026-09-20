<template>
  <div class="slidev-layout center">
    <div class="bg" :class="{ 'has-image': background }" :style="background ? { backgroundImage: `url(${background})` } : undefined" aria-hidden="true"></div>
    <div class="my-auto w-full">
      <slot />
    </div>
    <div class="vignette"></div>
    <LayoutFooter
      v-if="enableFooter"
      :twitter="twitter"
      :github="github"
      :linkedin="linkedin"
      :web="web"
    />
  </div>
</template>
<script setup lang="ts">
defineProps({
  background: {
    type: String,
    default: ''
  },
  enableFooter: {
    type: Boolean,
    default: false
  },
  twitter: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  web: {
    type: String,
  }
})
</script>

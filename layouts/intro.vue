<template>
  <div class="slidev-layout intro">
    <div class="my-auto">
      <slot />
    </div>
    <div class="vignette"></div>
    <LayoutFooter
      :twitter="twitter"
      :github="github"
      :linkedin="linkedin"
      :web="web"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
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

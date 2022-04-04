<template>
  <div class="slidev-layout center">
    <div class="bg" :style="`background-image: url(${randomizeBg ? 'https://source.unsplash.com/collection/4510513/1920x1080' : 'https://images.unsplash.com/photo-1538251041490-6d69ea6ad775?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHw0NTEwNTEzfHx8fHx8fDE2NDkxMDE0NDQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920'})`"></div>
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
  randomizeBg: {
    type: Boolean,
    default: false
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

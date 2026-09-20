<template>
  <div class="slidev-layout default">
    <slot />
    <SlideCounter />
  </div>
</template>

<script setup lang="ts">
import SlideCounter from '../components/SlideCounter.vue'
</script>

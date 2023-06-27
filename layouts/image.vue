<script setup lang="ts">
import { computed } from 'vue';
import { handleBackground } from './helpers';

const props = defineProps({
  image: {
    type: String,
  },
  contain: {
    type: Boolean,
    default: false,
  }
})

const style = computed(() => handleBackground(props.image))
</script>

<template>
  <div class="slidev-layout w-full h-full" :style="{...style, backgroundSize: contain ? 'contain' : 'cover'}">
    <slot />
  </div>
</template>

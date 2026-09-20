<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  label: string
  kind?: 'screen' | 'video' | 'meme'
  height?: string
  placeholderLabel?: string
}>(), { kind: 'screen', height: '360px', placeholderLabel: 'DO DODANIA' })
const failed = ref(false)
const ready = ref(false)
const isVideo = computed(() => props.kind === 'video')
watch(() => props.src, () => { failed.value = false; ready.value = false })
</script>

<template>
  <figure class="media-slot" :style="{ height }" :data-src="src" :data-kind="kind">
    <video v-if="isVideo && !failed" v-show="ready" :src="src" controls playsinline preload="metadata"
      @loadedmetadata="ready = true" @error="failed = true" />
    <img v-else-if="!isVideo && !failed" v-show="ready" :src="src" :alt="label"
      @load="ready = true" @error="failed = true" />
    <div v-if="failed || !ready" class="media-placeholder">
      <small>[{{ kind.toUpperCase() }} {{ placeholderLabel }}]</small>
      <strong>{{ label }}</strong>
      <code>{{ src }}</code>
    </div>
  </figure>
</template>

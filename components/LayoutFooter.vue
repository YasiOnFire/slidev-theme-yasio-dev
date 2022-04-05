<script setup lang="ts">
import { computed } from '@vue/reactivity';

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
const date = computed(() => new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}));
</script>
<template>
  <footer
    class="
      absolute
      bottom-10
      left-0
      px-15
      text-sm
      flex
      justify-between
      items-center
      w-full
      opacity-90
    "
  >
    <span class="inline-flex justify-between">
      
      <span v-if="github">
        <ri-github-line class="opacity-50 text-xs mt-1 mr-1"/>
        <a :href="`https://github.com/${github}`" target="_blank" class="mr-4">
        {{ github }}
        </a>
      </span>
      
      <span v-if="twitter">
        <ri-twitter-line class="opacity-50 text-xs mt-1 mr-1"/>
        <a :href="`https://twitter.com/${twitter}`" target="_blank" class="mr-4">
        {{ twitter }}
        </a>
      </span>
      
      <span v-if="linkedin">
        <ri-linkedin-box-line class="opacity-50 text-xs mt-1 mr-1"/>
        <a :href="`https://www.linkedin.com/in/${linkedin}`" target="_blank" class="mr-4">
        {{ linkedin }}
        </a>
      </span>
      
      <span v-if="web">
        <ri-user-3-line class="opacity-50 text-xs mt-1 mr-1"/>
        <a :href="`https://${web}`" target="_blank" class="mr-4">
        {{ web }}
        </a>
      </span>
    </span>
    <span class="opacity-70">[{{date}}]</span>
  </footer>
</template>

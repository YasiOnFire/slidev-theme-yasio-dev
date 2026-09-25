<script setup lang="ts">
import { ref, watch } from 'vue'
import SlideCounter from '../components/SlideCounter.vue'

const props = withDefaults(defineProps<{
  media: string
  alt: string
  label?: string
}>(), { label: '' })

const ready = ref(false)
const failed = ref(false)

watch(() => props.media, () => {
  ready.value = false
  failed.value = false
})
</script>

<template>
  <section class="slidev-layout media-layout" :class="{ 'has-label': label }">
    <header v-if="label" class="media-tab">
      <span class="media-tab-dots" aria-hidden="true"><i /><i /><i /></span>
      <span class="media-tab-label">{{ label }}</span>
      <span class="media-tab-type" aria-hidden="true">preview</span>
    </header>
    <figure class="media-stage" :aria-label="alt">
      <img v-if="media && !failed" v-show="ready" :src="media" :alt="alt"
        @load="ready = true" @error="failed = true" />
      <div v-if="!ready || failed" class="media-missing">
        <span class="media-missing-icon" aria-hidden="true">[ screenshot ]</span>
        <span class="media-missing-status">{{ failed || !media ? 'DO DODANIA' : 'WCZYTYWANIE' }}</span>
        <strong>{{ alt }}</strong>
        <code>{{ media }}</code>
      </div>
    </figure>
    <SlideCounter />
  </section>
</template>

<style scoped>
.slidev-layout.media-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  height: 100%;
  padding: 12px 16px 37px;
  overflow: hidden;
  background: var(--yasio-background, #100e1b);
}

.media-tab {
  display: flex;
  flex: 0 0 28px;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 0 12px;
  border: 1px solid var(--yasio-line, #332a42);
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  background: rgba(255, 255, 255, 0.035);
  color: var(--yasio-muted, #aaa4bb);
  font: 11px/1 var(--code-font, Consolas, monospace);
}

.media-tab-dots {
  display: flex;
  gap: 4px;
}

.media-tab-dots i {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.45;
}

.media-tab-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.media-tab-type {
  margin-left: auto;
  opacity: 0.5;
}

.media-stage {
  display: flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  margin: 0;
  border: 1px solid var(--yasio-line, #332a42);
}

.media-stage > img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: contain;
  object-position: center;
}

.media-missing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 40px;
  border: 1px dashed var(--yasio-line, #332a42);
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.025), transparent);
  text-align: center;
}

.has-label .media-missing {
  border-radius: 0 0 8px 8px;
}

.media-missing-icon {
  color: var(--yasio-muted, #aaa4bb);
  font: 15px/1 var(--code-font, Consolas, monospace);
  opacity: 0.4;
}

.media-missing-status {
  color: var(--yasio-accent, #f3d94e);
  font: 11px/1 var(--code-font, Consolas, monospace);
  letter-spacing: 2px;
}

.media-missing strong {
  max-width: 760px;
  font-size: 28px;
  line-height: 1.3;
  font-weight: 500;
  text-wrap: balance;
}

.media-missing code {
  max-width: 100%;
  overflow-wrap: anywhere;
  background: transparent;
  color: var(--yasio-muted, #aaa4bb);
  font: 12px/1.5 var(--code-font, Consolas, monospace);
}

.media-missing code::before,
.media-missing code::after {
  content: none;
}
</style>

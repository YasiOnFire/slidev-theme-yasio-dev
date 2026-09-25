<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import SlideCounter from '../components/SlideCounter.vue'

interface MediaItem {
  src: string
  alt: string
  label?: string
}

const props = withDefaults(defineProps<{
  mediaItems: MediaItem[]
  interval?: number
  advance?: 'auto' | 'click'
}>(), {
  mediaItems: () => [],
  interval: 2000,
  advance: 'auto',
})

const { $nav, $renderContext, $clicks } = useSlideContext()
const active = useIsSlideActive()
const mounted = ref(false)
const reducedMotion = ref(false)
const printing = ref(false)
const visible = ref(true)
const autoIndex = ref(0)
const loaded = ref<boolean[]>([])
const failed = ref<boolean[]>([])
const items = computed(() => props.mediaItems.length
  ? props.mediaItems
  : [{ src: '', alt: 'Dodaj screeny do mediaItems', label: '' }])
// Manual sequences follow Slidev's local click state, including back navigation
// and the presenter. Reserve mediaItems.length - 1 clicks in the frontmatter.
const current = computed(() => props.advance === 'click'
  ? Math.min(Math.max(0, Math.floor($clicks.value)), items.value.length - 1)
  : autoIndex.value)
const currentItem = computed(() => items.value[current.value] ?? items.value[0])
const delay = computed(() => Number.isFinite(props.interval) ? Math.max(500, props.interval) : 2000)
const canRotate = computed(() => mounted.value
  && props.advance === 'auto'
  && active.value
  && $renderContext.value === 'slide'
  && !$nav.value.isPrintMode
  && !printing.value
  && !reducedMotion.value
  && visible.value
  && items.value.length > 1)

let timer: ReturnType<typeof setInterval> | undefined
let motionQuery: MediaQueryList | undefined
let printQuery: MediaQueryList | undefined

function stop() {
  if (timer !== undefined) {
    clearInterval(timer)
    timer = undefined
  }
}

function syncEnvironment() {
  reducedMotion.value = motionQuery?.matches ?? false
  printing.value = printQuery?.matches ?? false
  visible.value = document.visibilityState === 'visible'
}

watch(() => props.mediaItems, () => {
  loaded.value = []
  failed.value = []
}, { deep: true })

// Slidev also mounts neighbouring slides and presenter previews. Those copies
// must not own a timer; re-entering the live slide starts at the first image.
watch([canRotate, delay, () => props.mediaItems], () => {
  stop()
  autoIndex.value = 0
  if (canRotate.value) {
    timer = setInterval(() => {
      autoIndex.value = (autoIndex.value + 1) % items.value.length
    }, delay.value)
  }
}, { immediate: true, deep: true })

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  printQuery = window.matchMedia('print')
  motionQuery.addEventListener('change', syncEnvironment)
  printQuery.addEventListener('change', syncEnvironment)
  document.addEventListener('visibilitychange', syncEnvironment)
  syncEnvironment()
  mounted.value = true
})

onBeforeUnmount(() => {
  stop()
  motionQuery?.removeEventListener('change', syncEnvironment)
  printQuery?.removeEventListener('change', syncEnvironment)
  document.removeEventListener('visibilitychange', syncEnvironment)
})
</script>

<template>
  <section
    class="slidev-layout media-sequence"
    :class="{ 'has-label': currentItem.label, 'is-static': reducedMotion || printing || $nav.isPrintMode }"
    :data-media-index="current"
    :data-media-running="canRotate"
  >
    <header v-if="currentItem.label" class="media-tab">
      <span class="media-tab-dots" aria-hidden="true"><i /><i /><i /></span>
      <span class="media-tab-label">{{ currentItem.label }}</span>
      <span class="media-tab-count" aria-hidden="true">{{ current + 1 }} / {{ items.length }}</span>
    </header>
    <figure class="media-stage" :aria-label="currentItem.alt" aria-live="off">
      <div
        v-for="(item, index) in items"
        :key="`${index}:${item.src}`"
        class="media-frame"
        :class="{ 'is-current': index === current }"
        :aria-hidden="index !== current"
      >
        <img
          v-if="item.src && !failed[index]"
          v-show="loaded[index]"
          :src="item.src"
          :alt="item.alt"
          @load="loaded[index] = true"
          @error="failed[index] = true"
        />
        <div v-if="!loaded[index] || failed[index]" class="media-missing">
          <span class="media-missing-icon" aria-hidden="true">[ screenshot ]</span>
          <span class="media-missing-status">{{ failed[index] || !item.src ? 'DO DODANIA' : 'WCZYTYWANIE' }}</span>
          <strong>{{ item.alt }}</strong>
          <code>{{ item.src }}</code>
        </div>
      </div>
    </figure>
    <SlideCounter />
  </section>
</template>

<style scoped>
.slidev-layout.media-sequence {
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

.media-tab-dots { display: flex; gap: 4px; }
.media-tab-dots i { display: block; width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.45; }
.media-tab-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.media-tab-count { margin-left: auto; opacity: 0.5; white-space: nowrap; }

.media-stage {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  margin: 0;
}

.media-frame {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 180ms ease;
}
.media-frame.is-current { opacity: 1; }
.media-frame > img { display: block; width: 100%; height: 100%; min-height: 0; object-fit: contain; object-position: center; }
.is-static .media-frame { transition: none; }

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
.has-label .media-missing { border-radius: 0 0 8px 8px; }
.media-missing-icon { color: var(--yasio-muted, #aaa4bb); font: 15px/1 var(--code-font, Consolas, monospace); opacity: 0.4; }
.media-missing-status { color: var(--yasio-accent, #f3d94e); font: 11px/1 var(--code-font, Consolas, monospace); letter-spacing: 2px; }
.media-missing strong { max-width: 760px; font-size: 28px; line-height: 1.3; font-weight: 500; text-wrap: balance; }
.media-missing code { max-width: 100%; overflow-wrap: anywhere; background: transparent; color: var(--yasio-muted, #aaa4bb); font: 12px/1.5 var(--code-font, Consolas, monospace); }
.media-missing code::before, .media-missing code::after { content: none; }

@media (prefers-reduced-motion: reduce), print {
  .media-frame { transition: none; }
}
</style>

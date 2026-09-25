<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useIsSlideActive, useNav, useSlideContext } from '@slidev/client'

const props = withDefaults(defineProps<{
  value?: number
  amplitude?: number
  periodMs?: number
  animate?: boolean
  leftLabel?: string
  rightLabel?: string
  metaphorLabel?: string
}>(), {
  value: 68,
  amplitude: 5,
  periodMs: 5000,
  animate: true,
  leftLabel: 'pytaj o kroki',
  rightLabel: 'realizuj zatwierdzony scope',
  metaphorLabel: 'metafora autonomii',
})

const active = useIsSlideActive()
const { $renderContext } = useSlideContext()
const { isPrintMode } = useNav()
const mounted = ref(false)
const visible = ref(false)
const reducedMotion = ref(true)
const printing = ref(false)
const base = computed(() => Number.isFinite(props.value) ? Math.max(0, Math.min(100, props.value)) : 75)
const amplitude = computed(() => Number.isFinite(props.amplitude)
  ? Math.max(0, Math.min(props.amplitude, base.value, 100 - base.value))
  : 3)
const period = computed(() => Number.isFinite(props.periodMs) ? Math.max(4000, props.periodMs) : 11000)
const current = ref(base.value)
const canAnimate = computed(() => mounted.value && active.value && visible.value
  && props.animate && amplitude.value > 0 && ['slide', 'presenter'].includes($renderContext.value)
  && !isPrintMode.value && !printing.value && !reducedMotion.value)
const position = computed(() => `${current.value}%`)
const accessibleLabel = computed(() => `${props.metaphorLabel}: około ${Math.round(base.value)}%. Nie jest to parametr modelu.`)

let frame: number | undefined
let startTime: number | undefined
let motionQuery: MediaQueryList | undefined
let printQuery: MediaQueryList | undefined

function stop() {
  if (frame !== undefined)
    cancelAnimationFrame(frame)
  frame = undefined
  startTime = undefined
  current.value = base.value
}

function tick(timestamp: number) {
  frame = undefined
  if (!canAnimate.value)
    return
  startTime ??= timestamp
  current.value = base.value + Math.sin((timestamp - startTime) * 2 * Math.PI / period.value) * amplitude.value
  frame = requestAnimationFrame(tick)
}

watch([canAnimate, base, amplitude, period], () => {
  stop()
  if (canAnimate.value)
    frame = requestAnimationFrame(tick)
}, { immediate: true })

function updateVisibility() {
  visible.value = document.visibilityState === 'visible'
}
function updateMotion() {
  reducedMotion.value = motionQuery?.matches ?? true
}
function updatePrint() {
  printing.value = printQuery?.matches ?? false
}
function beforePrint() {
  printing.value = true
  stop()
}
function afterPrint() {
  printing.value = false
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  printQuery = window.matchMedia('print')
  motionQuery.addEventListener('change', updateMotion)
  printQuery.addEventListener('change', updatePrint)
  document.addEventListener('visibilitychange', updateVisibility)
  window.addEventListener('beforeprint', beforePrint)
  window.addEventListener('afterprint', afterPrint)
  updateVisibility()
  updateMotion()
  updatePrint()
  mounted.value = true
})

onBeforeUnmount(() => {
  stop()
  motionQuery?.removeEventListener('change', updateMotion)
  printQuery?.removeEventListener('change', updatePrint)
  document.removeEventListener('visibilitychange', updateVisibility)
  window.removeEventListener('beforeprint', beforePrint)
  window.removeEventListener('afterprint', afterPrint)
})
</script>

<template>
  <div class="autonomy yasio-autonomy-slider" role="img" :aria-label="accessibleLabel" :data-animating="canAnimate">
    <div class="autonomy-value" aria-hidden="true">~{{ Math.round(current) }}%</div>
    <div class="autonomy-track" aria-hidden="true">
      <span :style="{ width: position }" />
      <i :style="{ left: position }" />
    </div>
    <div class="autonomy-labels" aria-hidden="true"><span>{{ leftLabel }}</span><span>{{ rightLabel }}</span></div>
  </div>
</template>

<style scoped>
.autonomy-value {
  font-variant-numeric: tabular-nums;
}

.autonomy-track i {
  transform: translateX(-50%);
}
</style>

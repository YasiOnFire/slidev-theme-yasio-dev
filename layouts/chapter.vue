<script setup lang="ts">
import SlideCounter from '../components/SlideCounter.vue'

defineProps({
  chapter: { type: [String, Number], default: '' },
  eyebrow: { type: String, default: '' },
})
</script>

<template>
  <section class="slidev-layout chapter">
    <div class="chapter-watermark" aria-hidden="true">{{ chapter }}</div>
    <div class="chapter-content">
      <div v-if="eyebrow || chapter !== ''" class="chapter-eyebrow">
        <span v-if="chapter !== ''" class="chapter-index">{{ chapter }}</span>
        <span>{{ eyebrow }}</span>
      </div>
      <slot />
      <div class="chapter-rule" aria-hidden="true" />
    </div>
    <SlideCounter />
  </section>
</template>

<style>
.slidev-layout.chapter {
  display: flex;
  align-items: center;
  padding: 60px 68px 66px 78px;
  text-align: left;
  overflow: hidden;
  background: radial-gradient(ellipse at 100% 0%, #322e38 0%, transparent 62%), var(--yasio-background);
}

.chapter-content {
  position: relative;
  z-index: 1;
  width: 100%;
}

.chapter-eyebrow {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 28px;
  color: var(--yasio-accent);
  font-family: var(--code-font);
  font-size: 13px;
  line-height: 1.3;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.chapter-index {
  border: 1px solid color-mix(in srgb, var(--yasio-accent) 24%, transparent);
  border-radius: 4px;
  color: var(--yasio-accent);
  padding: 6px 9px;
  letter-spacing: 0;
}

.slidev-layout.chapter h1 {
  max-width: 820px;
  margin: 0;
  font-family: var(--code-font);
  font-size: 52px;
  font-weight: 700;
  line-height: 1.13;
  letter-spacing: -1.8px;
}

.slidev-layout.chapter h1::before {
  content: '>';
  color: var(--slidev-theme-primary);
  margin-right: 13px;
}

.slidev-layout.chapter h1::after {
  content: '';
  display: inline-block;
  width: 0.36em;
  height: 0.83em;
  margin-left: 0.18em;
  vertical-align: -0.06em;
  background: #fff;
  animation: slidev-blink 1.2s steps(1, end) infinite;
}

.slidev-layout.chapter p {
  max-width: 740px;
  margin: 25px 0 0;
  color: var(--slidev-theme-aside);
  font-size: 22px;
  line-height: 1.5;
}

.chapter-rule {
  width: 112px;
  height: 3px;
  margin-top: 28px;
  background: var(--slidev-theme-primary);
}

.chapter-watermark {
  position: absolute;
  right: 46px;
  bottom: 25px;
  color: var(--yasio-accent);
  font: 200px/1 var(--code-font);
  letter-spacing: -18px;
  opacity: 0.075;
  pointer-events: none;
  user-select: none;
}

@media (prefers-reduced-motion: reduce) {
  .slidev-layout.chapter h1::after {
    animation: none;
    opacity: 1;
  }
}
</style>

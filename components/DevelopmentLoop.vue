<script setup lang="ts">
import { useId } from 'vue'

interface DevelopmentStep {
  title: string
  detail?: string
}

withDefaults(defineProps<{
  /** Six steps in execution order, starting at the top left. */
  steps: DevelopmentStep[]
  humanLabel?: string
  gates?: string[]
  loopLabel?: string
}>(), {
  humanLabel: 'Human in the loop',
  gates: () => [],
  loopLabel: 'agent / tools / feedback',
})

const markerId = `loop-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
</script>

<template>
  <div class="yasio-development-loop">
    <div class="yasio-development-loop__cycle">
      <svg class="yasio-development-loop__connections" viewBox="0 0 900 270" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker :id="markerId" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M1 1 L5 3.5 L1 6" fill="none" stroke="currentColor" stroke-width="1.4" />
          </marker>
        </defs>
        <path v-for="(path, index) in [
          'M270 54 H311', 'M587 54 H628', 'M766 111 V158',
          'M630 216 H589', 'M313 216 H272', 'M134 159 V112',
        ]" :key="index" :d="path" :marker-end="`url(#${markerId})`" />
      </svg>
      <ol class="yasio-development-loop__steps">
        <li v-for="(step, index) in steps.slice(0, 6)" :key="index" :style="{
          gridColumn: index < 3 ? index + 1 : 6 - index,
          gridRow: index < 3 ? 1 : 2,
        }">
          <span class="yasio-development-loop__index">{{ String(index + 1).padStart(2, '0') }}</span>
          <b>{{ step.title }}</b>
          <span class="yasio-development-loop__detail">{{ step.detail }}</span>
        </li>
      </ol>
      <div class="yasio-development-loop__label">{{ loopLabel }}</div>
    </div>
    <div v-if="gates.length" class="yasio-development-loop__human">
      <span class="yasio-development-loop__human-label">{{ humanLabel }}</span>
      <div class="yasio-development-loop__gates">
        <span v-for="gate in gates" :key="gate">{{ gate }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.yasio-development-loop {
  width: 100%;
  margin: 22px auto 0;
}

.yasio-development-loop__cycle {
  position: relative;
  aspect-ratio: 900 / 270;
}

.yasio-development-loop__connections {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--yasio-accent);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

.slidev-layout .yasio-development-loop__steps {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: 1fr 1fr;
  column-gap: 5.55%;
  row-gap: 20%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.slidev-layout .yasio-development-loop__steps li {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 0;
  margin: 0;
  padding: 18px 20px;
  border: 1px solid var(--yasio-line);
  border-radius: 10px;
  background: linear-gradient(145deg, #211a2e, #15121d);
  line-height: 1.2;
}

.yasio-development-loop__steps b {
  display: block;
  margin: 0 0 8px;
  font: 700 22px/1.15 var(--code-font);
  letter-spacing: -0.6px;
}

.yasio-development-loop__index {
  position: absolute;
  right: 11px;
  top: 9px;
  color: var(--yasio-muted);
  opacity: 0.5;
  font: 10px/1 var(--code-font);
}

.yasio-development-loop__detail {
  font-size: 14px;
  line-height: 1.3;
  color: var(--yasio-muted);
}

.yasio-development-loop__label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--yasio-muted);
  font: 11px/1 var(--code-font);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.yasio-development-loop__human {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
  padding: 15px 18px;
  border: 1px solid color-mix(in srgb, var(--yasio-yellow) 26%, transparent);
  border-radius: 8px;
  background: color-mix(in srgb, var(--yasio-yellow) 4%, transparent);
}

.yasio-development-loop__human-label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--yasio-yellow);
  font: 12px/1.3 var(--code-font);
  text-transform: uppercase;
}

.yasio-development-loop__human-label::before {
  content: '';
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.yasio-development-loop__gates {
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 16px;
  color: var(--yasio-foreground);
  font-size: 14px;
}

.yasio-development-loop__gates span + span::before {
  content: '/';
  margin-right: 18px;
  color: var(--yasio-muted);
  opacity: 0.5;
}
</style>

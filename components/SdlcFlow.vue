<script setup lang="ts">
import { computed } from 'vue'

type Stage = {
  id: string
  title: string
  ai: string
  human?: string
}

type Gate = {
  after: string
  label: string
  owner?: string
}

const props = withDefaults(defineProps<{
  stages: Stage[]
  gates?: Gate[]
  aiLabel?: string
  humanLabel?: string
  ariaLabel?: string
  compact?: boolean
}>(), {
  gates: () => [],
  aiLabel: 'AI',
  humanLabel: 'Człowiek',
  ariaLabel: 'Proces developmentu i decyzje człowieka',
  compact: false,
})

const columns = computed(() => Math.max(1, props.stages.length))
const gatesFor = (id: string) => props.gates.filter(gate => gate.after === id)
</script>

<template>
  <div class="sdlc-flow" :class="{ 'sdlc-compact': compact }" role="list" :aria-label="ariaLabel" :style="{ '--sdlc-columns': columns }">
    <article v-for="(stage, index) in stages" :key="stage.id" class="sdlc-stage" role="listitem">
      <div class="sdlc-stage-card">
        <span class="sdlc-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
        <h3>{{ stage.title }}</h3>
        <div class="sdlc-ai">
          <span class="sdlc-label">{{ aiLabel }}</span>
          <p>{{ stage.ai }}</p>
        </div>
        <div v-if="stage.human" class="sdlc-human">
          <span class="sdlc-label">{{ humanLabel }}</span>
          <p>{{ stage.human }}</p>
        </div>
      </div>
      <div v-if="gates.length" class="sdlc-gates">
        <div v-for="(gate, gateIndex) in gatesFor(stage.id)" :key="gateIndex" class="sdlc-gate">
          <span class="sdlc-gate-marker" aria-hidden="true">◆</span>
          <strong>{{ gate.label }}</strong>
          <span v-if="gate.owner" class="sdlc-gate-owner">{{ gate.owner }}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.sdlc-flow {
  display: grid;
  grid-template-columns: repeat(var(--sdlc-columns), minmax(0, 1fr));
  align-items: stretch;
  gap: 14px;
  margin-top: 22px;
}

.sdlc-stage {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.sdlc-stage-card {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 226px;
  padding: 16px 13px 15px;
  border: 1px solid var(--yasio-line);
  border-top: 3px solid var(--yasio-accent);
  border-radius: 5px;
  background: var(--yasio-panel);
}

.sdlc-stage:not(:last-child) .sdlc-stage-card::after {
  content: '›';
  position: absolute;
  top: 43%;
  right: -13px;
  z-index: 1;
  color: var(--yasio-accent);
  font-size: 24px;
  line-height: 1;
}

.sdlc-number {
  color: var(--yasio-accent);
  font-size: 11px;
  line-height: 1;
  opacity: 0.7;
}

.sdlc-stage h3 {
  margin: 12px 0 19px;
  color: var(--yasio-foreground);
  font: 700 17px/1.23 var(--code-font);
  overflow-wrap: anywhere;
}

.sdlc-label {
  display: block;
  margin-bottom: 7px;
  color: var(--yasio-accent);
  font-size: 9px;
  line-height: 1.2;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.sdlc-stage p {
  margin: 0;
  color: var(--slidev-theme-aside);
  font-size: 13px;
  line-height: 1.48;
}

.sdlc-ai {
  flex: 1;
  margin-bottom: 18px;
}

.sdlc-human {
  padding-top: 13px;
  border-top: 1px solid var(--yasio-line);
}

.sdlc-human p {
  color: var(--yasio-foreground);
}

.sdlc-gates {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  align-items: start;
  gap: 5px;
  min-height: 53px;
  margin-top: 12px;
}

.sdlc-gate {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 7px;
  padding: 9px 9px 10px;
  border: 1px solid #71518f;
  border-radius: 4px;
  background: #261c35;
  color: var(--slidev-theme-aside);
}

.sdlc-gate-marker {
  font-size: 10px;
  line-height: 1.3;
  color: var(--yasio-accent);
}

.sdlc-gate strong {
  font-size: 11px;
  line-height: 1.3;
}

.sdlc-gate-owner {
  grid-column: 2;
  font-size: 10px;
  line-height: 1.4;
  opacity: 0.75;
  overflow-wrap: anywhere;
}

.sdlc-compact {
  gap: 13px;
  margin-top: 10px;
}

.sdlc-compact .sdlc-stage-card {
  min-height: 151px;
  padding: 10px 10px 11px;
}

.sdlc-compact .sdlc-number {
  font-size: 9px;
}

.sdlc-compact h3 {
  margin: 7px 0 10px;
  font-size: 15px;
}

.sdlc-compact .sdlc-label {
  margin-bottom: 4px;
  font-size: 8px;
}

.sdlc-compact p {
  font-size: 11px;
  line-height: 1.4;
}

.sdlc-compact .sdlc-ai {
  margin-bottom: 9px;
}

.sdlc-compact .sdlc-human {
  padding-top: 8px;
}

.sdlc-compact .sdlc-gate {
  padding: 6px 8px;
  gap: 2px 6px;
}

.sdlc-compact .sdlc-gates {
  min-height: 41px;
  margin-top: 7px;
}
</style>

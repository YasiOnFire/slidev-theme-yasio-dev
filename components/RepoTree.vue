<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

type RepoKind = 'ai' | 'adapter' | 'normal' | 'structure'

interface RepoSegment {
  text: string
  kind?: RepoKind
}

interface RepoEntry {
  text?: string
  prefix?: string
  kind?: RepoKind
  segments?: RepoSegment[]
}

interface RepoColumn {
  label?: string
  entries: RepoEntry[]
}

const props = withDefaults(defineProps<{
  columns: RepoColumn[]
  highlightAt?: number
  initialLabel?: string
  activeLabel?: string
}>(), {
  highlightAt: 1,
  initialLabel: 'Repository files',
  activeLabel: 'AI context highlighted',
})

// The slide-local click context also follows presenter previews and print steps.
// Reserve the transition in the slide frontmatter, e.g. `clicks: 1`.
const { $clicks } = useSlideContext()
const focused = computed(() => $clicks.value >= props.highlightAt)

// Separate the tree's syntax from file names, including older text-only entries.
const renderedColumns = computed(() => props.columns.map(column => ({
  ...column,
  entries: column.entries.map(entry => {
    const text = entry.text ?? ''
    const branch = entry.prefix ?? text.match(/^[│├└─\s]+/u)?.[0] ?? ''
    return {
      prefix: branch,
      segments: entry.segments ?? [{
        text: entry.prefix === undefined ? text.slice(branch.length) : text,
        kind: entry.kind ?? 'normal',
      }],
    }
  }),
})))
</script>

<template>
  <div class="yasio-repo-tree" :class="{ 'is-focused': focused }">
    <div class="yasio-repo-tree__columns">
      <section
        v-for="(column, columnIndex) in renderedColumns"
        :key="columnIndex"
        class="yasio-repo-tree__column"
        :aria-label="column.label"
      >
        <div v-if="column.label" class="yasio-repo-tree__heading">
          {{ column.label }}
        </div>
        <div class="yasio-repo-tree__entries">
          <div
            v-for="(entry, entryIndex) in column.entries"
            :key="entryIndex"
            class="yasio-repo-tree__entry"
          ><span class="yasio-repo-tree__branch">{{ entry.prefix }}</span><span
              v-for="(segment, segmentIndex) in entry.segments"
              :key="segmentIndex"
              class="yasio-repo-tree__segment"
              :class="`is-${segment.kind ?? 'structure'}`"
            >{{ segment.text }}</span></div>
        </div>
      </section>
    </div>
    <div class="yasio-repo-tree__phase" aria-live="polite">
      <span class="yasio-repo-tree__phase-dot" aria-hidden="true" />
      {{ focused ? activeLabel : initialLabel }}
    </div>
  </div>
</template>

<style scoped>
.yasio-repo-tree {
  width: 100%;
  max-width: 850px;
  margin-inline: auto;
  --repo-accent: #49e1bd;
  --repo-adapter-accent: #a886ff;
}

.yasio-repo-tree__columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.yasio-repo-tree__column {
  min-width: 0;
  padding: 0 12px 14px;
  border: 1px solid var(--yasio-line, #393240);
  border-radius: 10px;
  background: #111016;
  overflow: hidden;
}

.yasio-repo-tree__column:only-child {
  grid-column: 1 / -1;
}

.yasio-repo-tree__heading {
  margin: 0 -12px 12px;
  padding: 11px 16px;
  border-bottom: 1px solid var(--yasio-line, #393240);
  background: var(--yasio-panel, #191622);
  color: var(--yasio-muted, #aaa4bb);
  font-family: var(--code-font, monospace);
  font-size: 11px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.yasio-repo-tree__heading::before {
  content: '▤';
  margin-right: 10px;
  color: var(--yasio-accent, #a886ff);
}

.yasio-repo-tree__entries {
  padding-top: 12px;
  font-family: var(--code-font, var(--slidev-code-font-family, monospace));
  font-size: var(--repo-tree-font-size, 16px);
  font-variant-ligatures: none;
  line-height: 1.4;
}

.yasio-repo-tree__entry {
  min-height: 1.4em;
  padding: 0 5px;
  color: var(--slidev-theme-aside, #cec6d3);
  white-space: pre;
}

.yasio-repo-tree__branch {
  color: var(--slidev-theme-aside, #cec6d3);
}

.yasio-repo-tree__segment {
  transition: color 320ms ease;
}

.is-focused .yasio-repo-tree__segment.is-normal {
  color: var(--repo-muted, #827b8e);
}

.is-focused .yasio-repo-tree__segment.is-ai {
  color: var(--repo-accent);
}

.is-focused .yasio-repo-tree__segment.is-adapter {
  color: var(--repo-adapter-accent);
}

.yasio-repo-tree__phase {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 10px;
  font-size: 11px;
  line-height: 1.4;
  color: var(--yasio-muted, #aaa4bb);
  font-family: var(--code-font, monospace);
}

.yasio-repo-tree__phase-dot {
  width: 5px;
  height: 5px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: currentColor;
  transition: background-color 320ms ease;
}

.is-focused .yasio-repo-tree__phase-dot {
  background: var(--repo-accent);
}

@media (prefers-reduced-motion: reduce) {
  .yasio-repo-tree__segment,
  .yasio-repo-tree__phase-dot {
    transition: none;
  }
}
</style>

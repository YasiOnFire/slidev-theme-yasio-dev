<template>
  <footer class="slide-counter" aria-label="Slide number">
    [<SlideCurrentNo /><small>/<SlidesTotal /></small>]
  </footer>
</template>

<style scoped>
.slide-counter {
  position: absolute;
  inset: auto 20px 16px auto;
  z-index: 12;
  width: auto;
  margin: 0;
  padding: 0;
  color: var(--yasio-muted, #aaa4bb);
  font: 12px/1.2 var(--code-font);
  text-align: right;
  white-space: nowrap;
  pointer-events: none;
}

.slide-counter small {
  font-size: inherit;
  opacity: 0.6;
}
</style>

<template>
  <div class="slidev-layout default">
    <slot />
    <div class="slide-counter">
      [<SlideCurrentNo /><small>/<SlidesTotal /></small>]
    </div>
  </div>
</template>

<style lang="scss">
.slidev-layout.default {
  .slide-counter {
    // bottom ritght
    @apply text-xs text-right fixed bottom-0 right-0 mr-4 mb-4 opacity-90;
    font-family: var(--code-font);

    span:first-of-type {
      @apply font-bold;
    }
    small:last-of-type {
      // color: var(--slidev-theme-primary);
      @apply opacity-60;
    }
  }
}
</style>

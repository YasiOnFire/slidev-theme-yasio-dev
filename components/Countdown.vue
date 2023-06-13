<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';

const minutes = ref(0)
const seconds = ref(0)

const isStarted = ref(false)

const props = defineProps({
  minutesToCountFrom: {
    type: Number,
    required: true,
  },
})

onMounted(() => {
  minutes.value = props.minutesToCountFrom
  seconds.value = 0
})

const decreseTime = () => {
  if (!isStarted.value) return
  if (seconds.value > 0) {
    seconds.value--
  } else if (minutes.value > 0) {
    minutes.value--
    seconds.value = 59
  }
}

const restartTime = () => {
  if (!isStarted.value) {
    start()
  } else {
    minutes.value = props.minutesToCountFrom
    seconds.value = 0
  }
}

const start = () => {
  if (isStarted.value) return
  isStarted.value = true
  const interval = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--
    } else if (minutes.value > 0) {
      minutes.value--
      seconds.value = 59
    } else {
      clearInterval(interval)
    }
  }, 1000)
}

const paddedSeconds = computed(() => seconds.value.toString().padStart(2, '0'))

const isLowTime = computed(() => minutes.value === 0 && seconds.value <= 30)
const isNoTime = computed(() => minutes.value === 0 && seconds.value === 0)
</script>

<template>
  <div :class="['text-8xl timer-wrp', { 'low-time': isLowTime, 'no-time': isNoTime }]">
    <code  @click="decreseTime">
      <span class="font-bold">{{ minutes }}</span>
      <span class="font-bold">:</span>
      <span class="font-bold">{{ paddedSeconds }}</span>
    </code>

    <div class="text-xs mt-10 reset">
      <span @click="restartTime">⌚</span>
    </div>
  </div>
</template>

<style>
.timer-wrp * {
  user-select: none;
}

.low-time {
  color: #ff8c00;
}
.no-time {
  color: #ff0000;
}
.reset {
  cursor: pointer;
}

</style>

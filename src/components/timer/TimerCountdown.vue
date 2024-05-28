<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { PlayCircleIcon } from '@heroicons/vue/24/outline'
import { PauseCircleIcon } from '@heroicons/vue/24/outline'
import { XCircleIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { MinusIcon } from '@heroicons/vue/24/outline'

let timeToCountdown = ref(dayjs().startOf('hour'))
let isPaused = ref(false)
let timerActive = ref(false)
let timerDone = ref(false)
let invalidTime = ref(false)
const minTime = dayjs().startOf('hour')

function startTimer() {
  if (!isPaused.value && !timerActive.value) {
    timerActive.value = true
    beginCountdown()
  } else {
    isPaused.value = false
  }
}

function beginCountdown() {
  timerDone.value = false
  const timer = setInterval(() => {
    if (!isPaused.value) {
      const minutesZero = timeToCountdown.value.minute() <= minTime.minute()
      const secondsZero = timeToCountdown.value.second() <= minTime.second()

      if (minutesZero && secondsZero) {
        timerDone.value = true
        clearInterval(timer)
        resetTimer()
      } else {
        timeToCountdown.value = timeToCountdown.value.subtract(1, 'second')
      }
    }
  }, 1000)
}

function pauseTimer() {
  if (timerActive.value) {
    isPaused.value = true
  }
}

function resetTimer() {
  timeToCountdown.value = minTime
  timerActive.value = false
  isPaused.value = false
}

function addTime(timeToAdd) {
  const maxTime = dayjs().endOf('hour')

  if (timeToCountdown.value.add(timeToAdd, 'second') <= maxTime) {
    timeToCountdown.value = timeToCountdown.value.add(timeToAdd, 'second')
  } else {
    showErrorMsg()
  }
}

function subtractTime(timeToSubtract) {
  if (timeToCountdown.value.subtract(timeToSubtract, 'second') >= minTime) {
    timeToCountdown.value = timeToCountdown.value.subtract(timeToSubtract, 'second')
  } else {
    showErrorMsg()
  }
}

function showErrorMsg() {
  invalidTime.value = true
  setTimeout(() => {
    invalidTime.value = false
  }, 10000)
}
</script>

<template>
  <div
    class="mt-10 text-center border-t-2 border-indigo-950 pt-10 md:border-2 md:p-20"
    :class="{ 'timer-buzz': timerDone }"
  >
    <h1 class="text-xl font-bold">Welcome to the Countdown Timer!</h1>
    <p class="text-8xl" :class="{ 'timer-buzz': timerDone }">
      {{ timeToCountdown.format('mm:ss') }}
    </p>
    <div class="flex gap-2 justify-center p-4">
      <button class="control-btn" @click="startTimer()" :disabled="timerActive && !isPaused">
        <PlayCircleIcon class="w-10 control-btn__icon" aria-label="start timer" />
      </button>
      <button class="control-btn" @click="pauseTimer()" :disabled="isPaused">
        <PauseCircleIcon class="w-10 control-btn__icon" aria-label="pause timer" />
      </button>
      <button class="control-btn" @click="resetTimer()">
        <XCircleIcon class="w-10 control-btn__icon" aria-label="reset timer" />
      </button>
    </div>
    <div class="flex gap-4 justify-center p-2">
      <button class="flex control-btn" @click="addTime(60)">
        <PlusIcon class="w-6 control-btn__icon" aria-label="add" />
        1 minute
      </button>
      <button class="flex control-btn" @click="addTime(10)">
        <PlusIcon class="w-6 control-btn__icon" aria-label="add" />
        10 seconds
      </button>
      <button class="flex control-btn" @click="addTime(1)">
        <PlusIcon class="w-6 control-btn__icon" aria-label="add" />
        1 second
      </button>
    </div>
    <div class="flex gap-4 p-2">
      <button class="flex control-btn" @click="subtractTime(60)">
        <MinusIcon class="w-6 control-btn__icon" aria-label="subtract" />
        1 minute
      </button>
      <button class="flex control-btn" @click="subtractTime(10)">
        <MinusIcon class="w-6 control-btn__icon" aria-label="subtract" />
        10 seconds
      </button>
      <button class="flex control-btn" @click="subtractTime(1)">
        <MinusIcon class="w-6 control-btn__icon" aria-label="subtract" />
        1 second
      </button>
    </div>
    <p
      v-if="invalidTime"
      class="absolute left-0 right-0 text-sm mt-2"
      :class="{ 'text-rose-600': invalidTime }"
    >
      Invalid selection, please try again
    </p>
  </div>
</template>

<style scoped>
p.timer-buzz {
  animation:
    shaking 0.1s 50,
    color-change 1s 5 ease-in-out;
}

div.timer-buzz {
  animation: color-change 1s 5 ease-in-out;
}

@keyframes shaking {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(5px, 5px) rotate(5deg);
  }
  50% {
    transform: translate(0, 0) rotate(0eg);
  }
  75% {
    transform: translate(-5px, 5px) rotate(-5deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

@keyframes color-change {
  0% {
    color: #9d174d;
    border-color: #9d174d;
  }
  25% {
    color: #86198f;
    border-color: #86198f;
  }
  50% {
    color: #6b21a8;
    border-color: #6b21a8;
  }
  75% {
    color: #5b21b6;
    border-color: #5b21b6;
  }
  100% {
    color: #3730a3;
    border-color: #3730a3;
  }
}

.control-btn:hover,
.control-btn:hover .control-btn__icon {
  @apply stroke-indigo-600 text-indigo-600;
}

.control-btn:disabled,
.control-btn:disabled .control-btn__icon {
  @apply stroke-indigo-300 text-indigo-300;
}
</style>

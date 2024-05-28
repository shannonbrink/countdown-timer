<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ClockIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <header class="flex flex-col p-4 md:flex-row md:p-6">
    <ClockIcon class="max-w-20 m-auto stroke-indigo-950 md:m-0 md:mr-6" aria-hidden="true" />
    <nav class="flex gap-4 justify-center items-center text-xl md:justify-start">
      <RouterLink to="/" class="hover:text-indigo-600"> Timer </RouterLink>
      <span aria-hidden="true">&bull;</span>
      <RouterLink to="/cat" class="hover:text-indigo-600"> Cat </RouterLink>
    </nav>
  </header>
  <RouterView class="flex justify-center" />
</template>

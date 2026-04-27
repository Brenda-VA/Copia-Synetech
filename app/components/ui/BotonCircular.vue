<script setup lang="ts">
const NuxtLink = resolveComponent('NuxtLink')
defineProps({
  ariaLabel: {
    type: String,
    default: 'Ver más'
  },
  to: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <component :is="to ? NuxtLink : 'button'" :to="to || undefined" :type="to ? undefined : 'button'"
    :aria-label="ariaLabel" class="group inline-flex rounded-full p-px">
    <span
      class="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-400">
      <slot>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
          stroke-linecap="round" stroke-linejoin="round" class="h-4.5 w-4.5">
          <path d="M8 5l8 7-8 7" />
        </svg>
      </slot>
    </span>
  </component>
</template>
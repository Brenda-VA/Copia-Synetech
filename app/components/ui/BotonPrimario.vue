<script setup lang="ts">
withDefaults(
  defineProps<{
    texto?: string
    degradado?: boolean
  }>(),
  {
    texto: 'Descubrir',
    degradado: false
  }
)
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.02]"
    :class="degradado
      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950'
      : 'border border-white/15 bg-white text-slate-950 hover:bg-slate-200'"
  >
    {{ texto }}
  </button>
</template>

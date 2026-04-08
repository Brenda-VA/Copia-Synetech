<script setup>
defineProps({
  texto: {
    type: String,
    default: 'Descubre más'
  }
})
</script>

<template>
  <button
    type="button"
    class="group inline-flex rounded-full bg-white p-px"
  >
    <span
      class="inline-flex min-w-[220px] items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-400"
    >
      {{ texto }}
    </span>
  </button>
</template>
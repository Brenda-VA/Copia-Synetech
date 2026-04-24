<script setup lang="ts">
defineProps({
  texto: {
    type: String,
    default: 'Descubre más'
  }
})
</script>

<template>
  <button type="button" class="group inline-flex rounded-full bg-white p-px">
    <span
      class="inline-flex min-w-[220px] items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-400">
      <!-- el texto ahora esta en un slot para que pueda ser presonalizado
       si no se le pasa nada entonces usa el texto por defecto -->
      <slot>
        {{ texto }}
      </slot>
    </span>
  </button>
</template>
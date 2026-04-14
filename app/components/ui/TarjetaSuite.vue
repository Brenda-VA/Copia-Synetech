<script setup lang="ts">
import type { TarjetaSuiteData } from '~/types/tarjetas'

// defineProps define las "entradas" del componente.
// Es decir: qué datos espera recibir desde el componente padre.
/* ahora esta hija recibe la tarjeta completa
asi el padre manda un solo objeto y aqui solo se pintan sus datos */
const props = defineProps<{
  tarjeta: TarjetaSuiteData
}>()
</script>

<template>
  <!-- Esta pieza representa una sola tarjeta -->
  <!-- No sabe nada del array ni del carrusel -->
  <article class="w-full">
    <!-- Bloque visual de la imagen -->
    <div class="overflow-hidden rounded-[2rem] bg-white/8">
      <img
        :src="props.tarjeta.imagen"
        :alt="props.tarjeta.alt"
        class="aspect-[1.75/1] w-full object-cover"
      >
    </div>

    <!-- Bloque visual de texto -->
    <div class="mt-4">
      <h3 class="text-[1.05rem] font-semibold leading-tight text-white md:text-[1.15rem]">
        {{ props.tarjeta.titulo }}
      </h3>

      <p class="mt-1 text-[0.95rem] leading-relaxed text-white/65 md:text-[1rem]">
        {{ props.tarjeta.descripcion }}
      </p>
    </div>
  </article>
</template>

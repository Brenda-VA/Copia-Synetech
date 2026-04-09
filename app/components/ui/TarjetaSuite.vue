<script setup>
// defineProps define las "entradas" del componente.
// Es decir: qué datos espera recibir desde el componente padre.
defineProps({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})
</script>

<template>
  <!-- Esta pieza representa una sola tarjeta -->
  <!-- No sabe nada del array ni del carrusel -->
  <article class="w-full">
    <!-- Bloque visual de la imagen -->
    <div class="overflow-hidden rounded-[2rem] bg-white/8">
      <img
        :src="imagen"
        :alt="alt"
        class="aspect-[1.75/1] w-full object-cover"
      >
    </div>

    <!-- Bloque visual de texto -->
    <div class="mt-4">
      <h3 class="text-[1.05rem] font-semibold leading-tight text-white md:text-[1.15rem]">
        {{ titulo }}
      </h3>

      <p class="mt-1 text-[0.95rem] leading-relaxed text-white/65 md:text-[1rem]">
        {{ descripcion }}
      </p>
    </div>
  </article>
</template>

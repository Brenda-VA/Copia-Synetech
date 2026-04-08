<script setup>
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
  <article class="w-full">
    <div class="overflow-hidden rounded-[2rem] bg-white/8">
      <img
        :src="imagen"
        :alt="alt"
        class="h-[290px] w-full object-cover md:h-[320px] xl:h-[340px]"
      >
    </div>

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
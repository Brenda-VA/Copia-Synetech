<script setup>

import BotonPrimario from '../ui/BotonPrimario.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const diapositivas = [
  {
    id: 1,
    etiqueta: 'No te lo contamos.',
    titulo: 'Prueba gratis nuestras pantallas interactivas.',
    boton: 'Descubre más',
    imagen: '/imagenes/banner_demo.webp',
    alt: 'Pantalla interactiva Synetech con iconos flotando',
    variante: 'demo'
  },
  {
    id: 2,
    etiqueta: 'La pizarra digital interactiva con Inteligencia Artificial',
    titulo: 'SYNETECH IA',
    boton: 'Descubre más',
    imagen: '/imagenes/banner-ia-1024w.webp',
    alt: 'Imagen promocional de Synetech IA',
    variante: 'ia'
  }
]

const modulosSwiper = [Autoplay, Pagination]
</script>

<template>
  <section class="border-b border-white/10 bg-black overflow-hidden">
    <Swiper
      :modules="modulosSwiper"
      :slides-per-view="1"
      :loop="true"
      :speed="900"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false
      }"
      :pagination="{
        clickable: true
      }"
      class="hero-swiper"
    >
 
      <SwiperSlide
        v-for="slide in diapositivas"
        :key="slide.id"
      >
    
        <div
          v-if="slide.variante === 'demo'"
          class="relative min-h-[720px] bg-black text-white md:min-h-[820px]"
        >
          <div class="mx-auto flex max-w-[1400px] flex-col items-center px-4 pt-20 text-center md:px-8 md:pt-28">
            <p class="text-3xl font-bold tracking-tight md:text-6xl">
              <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {{ slide.etiqueta }}
              </span>
            </p>

            <h1 class="mt-6 max-w-5xl text-4xl font-bold leading-tight md:text-6xl xl:text-7xl">
              {{ slide.titulo }}
            </h1>

            <div class="mt-10">
              <BotonPrimario :texto="slide.boton" />
            </div>
          </div>

          
          <div class="mx-auto mt-14 max-w-[1400px] px-4 md:px-8">
            <img
              :src="slide.imagen"
              :alt="slide.alt"
              class="mx-auto block w-full max-w-[1200px] object-contain"
            >
          </div>
        </div>

        <div
          v-else
          class="relative min-h-[720px] overflow-hidden bg-[#2f2f31] text-white md:min-h-[820px]"
        >
          <!-- Halo de color de fondo -->
          <div
            class="absolute inset-0 opacity-70"
            aria-hidden="true"
          >
            <div class="absolute left-1/2 top-24 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
            <div class="absolute left-1/2 top-28 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"></div>
          </div>

          <!-- Contenido -->
          <div class="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-4 pt-16 text-center md:px-8 md:pt-24">
            <img
              src="/imagenes/banner-ia-1024w.webp"
              alt="Logo grande Synetech IA"
              class="w-full max-w-[920px] object-contain"
            >

            <div class="mt-6 max-w-5xl">
              <p class="text-2xl font-semibold leading-snug md:text-5xl">
                {{ slide.etiqueta }}
              </p>

              <h2 class="mt-4 text-2xl font-bold md:text-4xl">
                {{ slide.titulo }}
              </h2>

              <div class="mt-8">
                <BotonPrimario :texto="slide.boton" />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>

:deep(.hero-swiper .swiper-pagination) {
  bottom: 28px;
}

:deep(.hero-swiper .swiper-pagination-bullet) {
  width: 14px;
  height: 14px;
  background: rgba(255, 255, 255, 0.55);
  border: 2px solid rgba(255, 255, 255, 0.75);
  opacity: 1;
  margin: 0 6px !important;
}

:deep(.hero-swiper .swiper-pagination-bullet-active) {
  background: white;
  border-color: white;
}
</style>
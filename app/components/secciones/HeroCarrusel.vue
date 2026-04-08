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
    imagen: '/imagenes/banner_demo_1024w.webp',
    alt: 'Pantalla interactiva Synetech con iconos flotando',
    variante: 'demo'
  },
  {
    id: 2,
    etiqueta: 'La pizarra digital interactiva con Inteligencia Artificial',
    titulo: 'SYNETECH IA',
    boton: 'Descubre más',
    imagen: '/imagenes/banner-ia-1920w.webp',
    alt: 'Imagen promocional de Synetech IA',
    variante: 'ia'
  }
]

const modulosSwiper = [Autoplay, Pagination]
</script>

<template>
  <section class="overflow-hidden border-b border-white/10 bg-black">
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
          class="relative h-[660px] overflow-hidden bg-black text-white md:h-[730px] xl:h-[780px]"
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(53,53,53,0.28),transparent_45%)]" />

          <div class="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col items-center px-5 pb-[290px] pt-10 text-center md:px-8 md:pb-[340px] md:pt-12 xl:px-10 xl:pb-[380px] xl:pt-14">
            <p class="text-[2rem] font-semibold tracking-tight md:text-[2.7rem] xl:text-[4rem]">
              <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {{ slide.etiqueta }}
              </span>
            </p>

            <h1 class="mt-4 max-w-[920px] text-[1.95rem] font-medium leading-[1.07] md:text-[3rem] xl:text-[4.3rem]">
              {{ slide.titulo }}
            </h1>

            <div class="mt-8 md:mt-9 xl:mt-10">
              <BotonPrimario :texto="slide.boton" />
            </div>
          </div>

          <div class="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
            <img
              :src="slide.imagen"
              :alt="slide.alt"
              class="block w-[97vw] max-w-[1400px] translate-y-[18%] object-contain md:w-[96vw] md:translate-y-[20%] xl:w-[95vw] xl:translate-y-[22%]"
            >
          </div>
        </div>

        <div
          v-else
          class="relative h-[660px] overflow-hidden bg-[#2f2f31] text-white md:h-[730px] xl:h-[780px]"
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(176,139,255,0.14),transparent_28%),radial-gradient(circle_at_50%_24%,rgba(37,211,238,0.1),transparent_34%),linear-gradient(180deg,#333336_0%,#2b2b2e_100%)]" />

          <div class="pointer-events-none absolute inset-0 z-0 flex items-start justify-center">
            <img
              :src="slide.imagen"
              :alt="slide.alt"
              class="mt-2 h-[88%] w-auto max-w-none object-contain md:mt-0 md:h-[90%] xl:h-[92%]"
            >
          </div>

          <div class="absolute inset-x-0 bottom-[12%] z-10 px-5 text-center md:bottom-[12.5%] md:px-8 xl:bottom-[13%] xl:px-10">
            <div class="mx-auto max-w-[1100px]">
              <p class="text-[1.9rem] font-medium leading-[1.08] text-white md:text-[3.1rem] xl:text-[3.95rem]">
                {{ slide.etiqueta }}
              </p>

              <h2 class="mt-3 text-[2.25rem] font-semibold tracking-[0.05em] md:text-[3.45rem] xl:text-[3.35rem]">
                {{ slide.titulo }}
              </h2>

              <div class="mt-6">
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
:deep(.hero-swiper) {
  overflow: hidden;
}

:deep(.hero-swiper .swiper-slide) {
  overflow: hidden;
}

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
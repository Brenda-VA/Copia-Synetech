<script setup lang="ts">

/* COMENTARIO CREADO DESDE RAMA B1 PARA GENERAR CONFLICTOS
lmwecrknuetemx,wercgknehimxw,qxemrginuchm4xoe, lmwecrknuetemx,wercgknehimxw,qxemrginuchm4xoe,
lmwecrknuetemx,wercgknehimxw,qxemrginuchm4xoe,
lmwecrknuetemx,wercgknehimxw,qxemrginuchm4xoe,lmwecrknuetemx,wercgknehimxw,qxemrginuchm4xoe,
lmwecrknuetemx,wercgknehimxw,qxemrginuchm4xoe,lmwecrknuetemx,wercgknehimxw,qxemrginuchm4xoe,lmwecrknuetemx,wercgknehimxw,qxemrginuchm4xoe,lmwecrknuetemx,wercgknehimxw,qxemrginuchm4xoe,
lmwecrknuetemx,wercgknehimxw,qxemrginuchm4xoe,*/


import BotonPrimario from '../ui/BotonPrimario.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { diapositivasHero } from '~/data/heroCarrusel'
import type { HeroSlide } from '~/types/hero'

// antes este archivo mezclaba data y render en el mismo sitio
// ahora las diapositivas salen de /data y aqui se queda la parte de swiper + layout
// i18n todavia no entra para no mezclar dos refactors a la vez
const diapositivas: HeroSlide[] = diapositivasHero

// variante sigue existiendo porque demo e ia no comparten el mismo layout real
// aqui no conviene forzarlos a una sola estructura solo por "limpiar"
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
     
        <!-- SLIDE 1 - DEMO -->
        <div
          v-if="slide.variante === 'demo'"
          class="relative overflow-hidden bg-black text-white
                 h-[610px]
                 sm:h-[660px]
                 md:h-[700px]
                 lg:h-[760px]
                 xl:h-[780px]"
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(53,53,53,0.24),transparent_45%)]" />

          <!-- Contenido -->
          <div
            class="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col items-center text-center
                   px-5 pt-10 pb-[245px]
                   sm:px-6 sm:pt-12 sm:pb-[275px]
                   md:px-8 md:pt-14 md:pb-[315px]
                   lg:px-10 lg:pt-16 lg:pb-[350px]
                   xl:pt-16 xl:pb-[380px]"
          >
            <p
              class="max-w-[320px] font-semibold tracking-tight
                     text-[1.95rem] leading-[1.05]
                     sm:max-w-[420px] sm:text-[2.35rem]
                     md:max-w-[620px] md:text-[2.85rem]
                     lg:max-w-[820px] lg:text-[3.4rem]
                     xl:max-w-[960px] xl:text-[4rem]"
            >
              <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {{ slide.etiqueta }}
              </span>
            </p>

            <h1
              class="mt-4 max-w-[330px] font-medium leading-[1.12]
                     text-[1.05rem]
                     sm:max-w-[430px] sm:text-[1.7rem]
                     md:max-w-[700px] md:text-[2.5rem]
                     lg:max-w-[860px] lg:text-[3.3rem]
                     xl:max-w-[920px] xl:text-[4.3rem] xl:leading-[1.07]"
            >
              {{ slide.titulo }}
            </h1>

            <div class="mt-7 sm:mt-8 md:mt-8 lg:mt-9 xl:mt-10">
              <BotonPrimario :texto="slide.boton" />
            </div>
          </div>

          <!-- Imagen inferior -->
          <div class="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
            <picture>
              <source
                media="(min-width: 1024px)"
                :srcset="slide.imagenDesktop"
              >
              <source
                media="(min-width: 768px)"
                :srcset="slide.imagenTablet"
              >
              <img
                :src="slide.imagenMovil"
                :alt="slide.alt"
                class="block
                       w-[112%] max-w-none translate-y-[10%]
                       sm:w-[103%] sm:translate-y-[12%]
                       md:w-[96vw] md:max-w-[980px] md:translate-y-[16%]
                       lg:w-[94vw] lg:max-w-[1200px] lg:translate-y-[18%]
                       xl:w-[95vw] xl:max-w-[1400px] xl:translate-y-[22%]
                       object-contain"
              >
            </picture>
          </div>
        </div>

        <!-- SLIDE 2 - IA -->
        <div
          v-else
          class="relative overflow-hidden text-white
                 h-[610px]
                 sm:h-[660px]
                 md:h-[700px]
                 lg:h-[760px]
                 xl:h-[780px]
                 bg-[#2f2f31]"
        >
          <!-- Fondo base -->
          <div class="absolute inset-0 bg-[linear-gradient(180deg,#333336_0%,#2b2b2e_100%)]" />

          <!-- Imagen principal -->
          <div class="absolute inset-0 z-0">
            <picture>
              <source
                media="(min-width: 1280px)"
                :srcset="slide.imagenDesktop"
              >
              <source
                media="(min-width: 768px)"
                :srcset="slide.imagenTablet"
              >
              <img
                :src="slide.imagenMovil"
                :alt="slide.alt"
                class="h-full w-full object-cover object-center"
              >
            </picture>
          </div>

          <!-- Overlay suave para mantener legibilidad -->
          <div
            class="absolute inset-0 z-[1]
                   bg-[linear-gradient(180deg,rgba(25,25,27,0.18)_0%,rgba(25,25,27,0.26)_35%,rgba(31,31,34,0.58)_100%)]
                   md:bg-[linear-gradient(180deg,rgba(25,25,27,0.08)_0%,rgba(25,25,27,0.16)_36%,rgba(31,31,34,0.52)_100%)]"
          />

          <!-- Bloque de texto: móvil -->
          <div
            class="absolute inset-x-0 z-10 px-5 text-center
                   top-[45%] -translate-y-1/2
                   sm:px-6 sm:top-[47%]
                   md:hidden"
          >
            <div class="mx-auto max-w-[330px]">
              <p
                class="text-white font-medium
                       text-[2.02rem] leading-[1.12]
                       sm:text-[1.18rem]"
              >
                {{ slide.etiqueta }}
              </p>

              <h2
                class="mt-4 font-semibold text-white
                       text-[1.35rem] leading-none tracking-[.03em]
                       sm:text-[1.7rem]"
              >
                {{ slide.titulo }}
              </h2>

              <div class="mt-7">
                <BotonPrimario :texto="slide.boton" />
              </div>
            </div>
          </div>

          <!-- Bloque de texto: tablet -->
          <div
            class="absolute inset-x-0 z-10 hidden px-8 text-center
                   md:block lg:hidden
                   bottom-[11.5%]"
          >
            <div class="mx-auto max-w-[760px]">
              <p class="text-[3.1rem] font-medium leading-[1.08] text-white">
                {{ slide.etiqueta }}
              </p>

              <h2 class="mt-3 text-[2.7rem] font-semibold tracking-[0.045em] text-white">
                {{ slide.titulo }}
              </h2>

              <div class="mt-6">
                <BotonPrimario :texto="slide.boton" />
              </div>
            </div>
          </div>

          <!-- Bloque de texto: desktop -->
          <div
            class="absolute inset-x-0 z-10 hidden px-10 text-center
                   lg:block
                   bottom-[12.5%]
                   xl:bottom-[13%]"
          >
            <div class="mx-auto max-w-[1100px]">
              <p class="text-[3.1rem] font-medium leading-[1.08] text-white xl:text-[3.95rem]">
                {{ slide.etiqueta }}
              </p>

              <h2 class="mt-3 text-[3.05rem] font-semibold tracking-[0.05em] text-white xl:text-[3.35rem]">
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
  bottom: 22px;
}

:deep(.hero-swiper .swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.55);
  border: 2px solid rgba(255, 255, 255, 0.75);
  opacity: 1;
  margin: 0 5px !important;
}

:deep(.hero-swiper .swiper-pagination-bullet-active) {
  background: white;
  border-color: white;
}

@media (min-width: 768px) {
  :deep(.hero-swiper .swiper-pagination) {
    bottom: 24px;
  }

  :deep(.hero-swiper .swiper-pagination-bullet) {
    width: 13px;
    height: 13px;
    margin: 0 6px !important;
  }
}

@media (min-width: 1280px) {
  :deep(.hero-swiper .swiper-pagination) {
    bottom: 28px;
  }

  :deep(.hero-swiper .swiper-pagination-bullet) {
    width: 14px;
    height: 14px;
  }
}
</style>

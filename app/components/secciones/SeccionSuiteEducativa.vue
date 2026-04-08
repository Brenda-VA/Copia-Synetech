<script setup>
import TarjetaSuite from '../ui/TarjetaSuite.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const modulosSwiper = [Navigation]

const tarjetasSuite = [
  {
    id: 1,
    titulo: 'Synetech Class',
    descripcion: 'Crea actividades interactivas por asignatura',
    imagen: '/imagenes/synetech-class.webp',
    alt: 'Synetech Class'
  },
  {
    id: 2,
    titulo: 'Synetech OS',
    descripcion: 'Personaliza tu cuenta y asegura tu privacidad',
    imagen: '/imagenes/synetech-os.webp',
    alt: 'Synetech OS'
  },
  {
    id: 3,
    titulo: 'Synetech Share',
    descripcion: 'Comparte pantalla de forma inalámbrica y bidireccional',
    imagen: '/imagenes/synetech-share.webp',
    alt: 'Synetech Share'
  },
  {
    id: 4,
    titulo: 'Synetech DMS',
    descripcion: 'Gestiona múltiples pantallas interactivas con solo un click',
    imagen: '/imagenes/synetech-dms.webp',
    alt: 'Synetech DMS'
  }
]
</script>

<template>
  <section class="overflow-hidden bg-[#2f2f31] text-white">
    <div class="relative overflow-hidden">
      <img
        src="/imagenes/software-educativo-1280w.webp"
        alt="Suite educativa Synetech"
        class="absolute inset-0 h-full w-full object-cover"
      >

      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,38,40,0.96)_0%,rgba(38,38,40,0.88)_34%,rgba(38,38,40,0.55)_58%,rgba(38,38,40,0.2)_100%)]"></div>

      <div class="relative z-10 mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-16 xl:px-10 xl:py-20">
        <div class="max-w-[640px]">
          <h2 class="text-[4.3rem] font-light leading-none tracking-[-0.04em] text-white md:text-[6rem] xl:text-[8rem]">
            ed suite<span class="align-top text-[0.36em]">®</span>
          </h2>

          <h3 class="mt-8 max-w-[560px] text-[2.15rem] font-semibold leading-[1.12] text-white md:text-[3rem] xl:text-[3.7rem]">
            Descubre la
            <br>
            Suite Educativa que
            <br>
            te acompaña en cada clase
          </h3>

          <p class="mt-8 max-w-[720px] text-[1rem] leading-relaxed text-white/82 md:text-[1.15rem]">
            Facilita la gestión, personaliza el aprendizaje y potencia la experiencia
            educativa con herramientas innovadoras y fáciles de usar.
          </p>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-[1440px] px-4 pb-12 md:px-8 md:pb-14 xl:px-10 xl:pb-16">
      <Swiper
        :modules="modulosSwiper"
        :slides-per-view="1.08"
        :space-between="18"
        :navigation="{
          prevEl: '.suite-prev',
          nextEl: '.suite-next'
        }"
        :breakpoints="{
          768: {
            slidesPerView: 2.05,
            spaceBetween: 22
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 24
          }
        }"
        class="suite-swiper"
      >
        <SwiperSlide
          v-for="tarjeta in tarjetasSuite"
          :key="tarjeta.id"
        >
          <TarjetaSuite
            :titulo="tarjeta.titulo"
            :descripcion="tarjeta.descripcion"
            :imagen="tarjeta.imagen"
            :alt="tarjeta.alt"
          />
        </SwiperSlide>
      </Swiper>

      <div class="mt-8 flex justify-end gap-4">
        <button
          type="button"
          class="suite-prev flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/85 text-white transition hover:border-white hover:bg-white/10"
          aria-label="Anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <button
          type="button"
          class="suite-next flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/85 text-white transition hover:border-white hover:bg-white/10"
          aria-label="Siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.suite-swiper) {
  overflow: visible;
}

:deep(.suite-swiper .swiper-slide) {
  height: auto;
}

:deep(.suite-swiper .swiper-button-disabled) {
  opacity: 0.45;
  cursor: default;
}
</style>
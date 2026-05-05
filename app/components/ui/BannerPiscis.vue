<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'

type SlideTipo = 'producto' | 'ambiente'

interface BannerSlide {
    id: string
    tipo: SlideTipo
    alt: string
    imagenes: {
        base: string
        intermedia?: string
        lg: string
        xl: string
        dosxl: string
        cuatrok: string
    }
}

interface Props {
    title: string
    subtitle: string
    cta: string
    slides: BannerSlide[]
}

defineProps<Props>()

const swiperRef = ref<SwiperInstance | null>(null)

function onSwiper(swiper: SwiperInstance) {
    swiperRef.value = swiper
}

function slideAnterior() {
    swiperRef.value?.slidePrev()
}

function slideSiguiente() {
    swiperRef.value?.slideNext()
}
</script>

<template>
    <!-- BANNER: Controla el alto total, el fondo degradado y el cambio vertical/horizontal-->
    <section
        class="relative w-full h-[742px] min-[576px]:h-[830px] min-[768px]:h-[1024px] min-[1024px]:h-[710px] min-[1280px]:h-[773px] min-[1512px]:h-[926px] min-[1920px]:h-[1021px] flex flex-col min-[1024px]:flex-row overflow-hidden text-white"
        style="background: linear-gradient(120deg, #DD2211 0%, #664090 48%, #0EA3A9 100%);">

        <!-- COLUMNA/BLOQUE DE TEXTO:
        Aquí ajustas posición general de título + subtítulo + botón  -->
        <div
            class="w-full min-[1024px]:w-1/2 min-[576px]:h-72 min-[768px]:h-[360px] min-[1024px]:h-full flex flex-col items-center min-[1024px]:items-start min-[1024px]:justify-end min-[1512px]:justify-center px-10 min-[1024px]:px-[5%] pt-11 min-[576px]:pt-16 min-[768px]:pt-24 min-[1024px]:pb-20 min-[1512px]:mt-20 text-center min-[1024px]:text-left">
            <!-- TÍTULO <h1>
             text-[2.7rem]  min-[576px]:text-[3.5rem] min-[768px]:text-[3.8rem] min-[1024px]:text-[3.5rem] min-[1280px]:text-[4.25rem] min-[1512px]:text-[4.8rem] min-[1920px]:text-[6rem]">-->
            <h1
                class="text-[2.7rem] min-[576px]:text-[3.4rem] min-[1280px]:text-[4.25rem] min-[1920px]:text-[6rem] font-medium leading-none">
                {{ title }}
            </h1>

            <!-- div para controlar el ancho del parrafo + boton -->
            <div
                class="max-w-[190px] min-[576px]:max-w-[250px] min-[768px]:max-w-[311px] min-[1024px]:max-w-[430px] mt-4 min-[1024px]:mt-6">
                <!-- SUBTÍTULO  <p>
            min-[576px]:text-[1.65rem] min-[768px]:text-[2rem] min-[1024px]:text-[3rem] min-[1280px]:text-[3.15rem] min-[1512px]:text-[3.5rem] min-[1920px]:text-[3.2rem]">-->
                <p class="text-[clamp(1.25rem,4.5vw,3rem)] leading-tight min-[1024px]:leading-[1.05]">
                    {{ subtitle }}
                </p>
                <!-- BOTÓN -->
                <button type="button"
                    class="w-full min-[1024px]:w-8/12 h-8 min-[768px]:h-14 min-[1920px]:h-19 mt-6 min-[768px]:mt-10 rounded-full border-2 border-white text-xs min-[768px]:text-lg min-[1920px]:text-2xl">
                    {{ cta }}
                </button>
            </div>
        </div>

        <!-- COLUMNA: contiene swiper + flechas. -->
        <div class="relative min-[1024px]:w-1/2 flex flex-1 flex-col mt-10 min-[576px]:mt-0 min-[1024px]:mt-0">
            <!-- SWIPER -->
            <div class="w-full h-80 min-[576px]:h-96 min-[768px]:h-[510px] min-[1024px]:h-full">
                <Swiper :loop="true" :slides-per-view="1" class="h-full w-full" @swiper="onSwiper">
                    <SwiperSlide v-for="slide in slides" :key="slide.id" class="h-full w-full">
                        <picture class="flex h-full w-full items-center justify-center">
                            <source media="(min-width: 1920px)" :srcset="slide.imagenes.cuatrok">
                            <source media="(min-width: 1512px)" :srcset="slide.imagenes.dosxl">
                            <source media="(min-width: 1280px)" :srcset="slide.imagenes.xl">
                            <source media="(min-width: 1024px)" :srcset="slide.imagenes.lg">

                            <source v-if="slide.imagenes.intermedia" media="(min-width: 576px)"
                                :srcset="slide.imagenes.intermedia">

                            <img :src="slide.imagenes.base" :alt="slide.alt" class="h-full w-full"
                                :class="slide.tipo === 'ambiente'
                                    ? 'object-cover'
                                    : 'object-contain w-full min-[1024px]:w-[82%] min-[1280px]:w-[78%] min-[1512px]:w-[80%] min-[1920px]:w-[86%] px-3 min-[576px]:px-8 min-[768px]:px-10 min-[1024px]:px-0'">
                        </picture>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div
                class="min-[1024px]:absolute min-[1024px]:bottom-12 min-[1280px]:bottom-14 min-[1512px]:bottom-16 min-[1920px]:bottom-24 min-[1024px]:left-1/2 min-[1024px]:z-20 flex flex-1 min-[1024px]:flex-none items-start min-[1024px]:items-center justify-center gap-7 min-[576px]:gap-10 min-[768px]:gap-12 pt-12 min-[768px]:pt-16 min-[1024px]:pt-0 min-[1024px]:-translate-x-1/2">
                <UiBotonFlecha direccion="anterior" @click="slideAnterior" />
                <UiBotonFlecha direccion="siguiente" @click="slideSiguiente" />
            </div>
        </div>
    </section>
</template>
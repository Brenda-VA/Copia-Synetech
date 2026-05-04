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
    <!-- BANNER GENERAL:
    Controla el alto total, el fondo degradado y el cambio vertical/horizontal. 
    
    
    min-[768px]:h-[1024px] min-[1024px]:h-[710px] min-[1280px]:h-[773px] min-[1512px]:h-[854px] min-[1920px]:h-[1010px]-->
    <section class="relative flex 
        h-[742px] 
        w-full 
        flex-col overflow-hidden text-white 
        min-[576px]:h-[830px] min-[768px]:h-[1024px] min-[1024px]:h-[710px] min-[1280px]:h-[773px] min-[1512px]:h-[923px] min-[1920px]:h-[1010px]
        min-[1024px]:flex-row" style="background: linear-gradient(120deg, #DD2211 0%, #664090 48%, #0EA3A9 100%);">
        <!-- COLUMNA/BLOQUE DE TEXTO:
        Aquí ajustas posición general de título + subtítulo + botón. -->
        <div class="flex flex-col items-center text-center min-[1024px]:items-start min-[1024px]:justify-end min-[1512px]:justify-center 
            w-full 
            px-10 min-[1024px]:px-[5%] min-[1512px]:px-[4.3%] min-[1920px]:px-[5.2%]
            pt-11 min-[576px]:pt-16 min-[768px]:pt-24 min-[1024px]:pb-20
            min-[576px]:h-72 min-[768px]:h-[360px] min-[1024px]:h-full min-[1024px]:w-1/2  
            min-[1024px]:text-left">
            <!-- TÍTULO 
             text-[2.7rem]  min-[576px]:text-[3.4rem] min-[768px]:text-[3.8rem] min-[1024px]:text-[3.5rem] min-[1280px]:text-[4.25rem] min-[1512px]:text-[4.8rem] min-[1920px]:text-[6rem]">-->
            <h1 class="font-medium leading-none 
                text-[2.7rem] min-[576px]:text-[3.4rem] min-[1280px]:text-[4.25rem] min-[1920px]:text-[6rem]">
                {{ title }}
            </h1>

            <!-- SUBTÍTULO 
             min-[576px]:text-[1.65rem] min-[768px]:text-[2rem] min-[1024px]:text-[3rem] min-[1280px]:text-[3.15rem] min-[1512px]:text-[3.5rem] min-[1920px]:text-[3.2rem]">-->
            <p class="mt-4 min-[1024px]:mt-6
                max-w-[190px] min-[576px]:max-w-[280px] min-[768px]:max-w-[390px] min-[1024px]:max-w-[430px] min-[1280px]:max-w-[610px] min-[1920px]:max-w-[620px]
                text-xl font-normal
                leading-tight min-[1024px]:leading-[1.05]
                min-[576px]:text-[1.65rem] min-[1024px]:text-[3rem]">
                {{ subtitle }}
            </p>

            <!-- BOTÓN -->
            <button type="button" class="mt-6 
                h-8 min-[576px]:h-12 min-[768px]:h-14 min-[1920px]:h-[74px]
                w-8/12 min-[576px]:w-5/12 min-[768px]:w-[46%] min-[1024px]:w-[55%] min-[1280px]:w-[44%] min-[1920px]:w-[36%]
                rounded-full border-2 border-white 
                px-0 
                text-xs font-normal leading-none min-[576px]:text-sm min-[768px]:text-lg min-[1920px]:text-2xl
                min-[768px]:mt-8">
                {{ cta }}
            </button>

        </div>

        <!-- COLUMNA/BLOQUE VISUAL:
        Contiene swiper + flechas. -->
        <div class="relative mt-10 flex flex-1 flex-col min-[576px]:mt-0 min-[1024px]:mt-0 min-[1024px]:w-1/2">

            <!-- SWIPER -->
            <div class="h-80 w-full
            min-[576px]:h-96 min-[768px]:h-[510px]
            min-[1024px]:h-full">
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
                                    : 'object-contain px-3 min-[576px]:px-8 min-[768px]:px-10 min-[1024px]:w-[82%] min-[1024px]:px-0 min-[1280px]:w-[78%] min-[1512px]:w-[80%] min-[1920px]:w-[86%]'">
                        </picture>
                    </SwiperSlide>
                </Swiper>
            </div>

            <!-- FLECHAS SVG inline para que el círculo blanco no dependa de border CSS. -->
            <div class="flex flex-1 items-start justify-center
            gap-7 min-[576px]:gap-10 min-[768px]:gap-12
            pt-12 min-[768px]:pt-16
            min-[1024px]:absolute min-[1024px]:bottom-12 min-[1024px]:left-1/2 min-[1024px]:z-20
            min-[1024px]:flex-none min-[1024px]:-translate-x-1/2 min-[1024px]:items-center min-[1024px]:pt-0
            min-[1280px]:bottom-14 min-[1512px]:bottom-16 min-[1920px]:bottom-24">
                <button type="button" aria-label="Slide anterior"
                    class="h-10 w-10 shrink-0 bg-transparent p-0 min-[768px]:h-12 min-[768px]:w-12"
                    @click="slideAnterior">
                    <svg viewBox="0 0 48 48" class="h-full w-full">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="white" stroke-width="4" />
                        <path d="M27 15L18 24L27 33" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>

                <button type="button" aria-label="Slide anterior"
                    class="h-10 w-10 shrink-0 bg-transparent p-0 min-[768px]:h-12 min-[768px]:w-12"
                    @click="slideSiguiente">
                    <svg viewBox="0 0 48 48" class="h-full w-full">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="white" stroke-width="4" />
                        <path d="M21 15L30 24L21 33" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
</template>
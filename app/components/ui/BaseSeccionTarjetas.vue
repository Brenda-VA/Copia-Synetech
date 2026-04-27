<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

interface Props {
    /* modo decide si esta sección pinta un carrusel o contenido normal
    swiper: recorre items y crea slides
    static: solo pinta lo que venga en el slot normal */
    modo?: 'swiper' | 'static'

    // lista de elementos que se van a recorrer cuando modo sea swiper
    // lo dejo como any[] porque este componente es genérico y no sabe si recibe soportes, módulos, cursos, etc.
    items?: any[]

    // permite apagar las flechas si algún diseño no las necesita
    mostrarFlechas?: boolean

    // útil para casos como módulos, donde en desktop ya no quieres mostrar controles
    ocultarFlechasDesktop?: boolean

    // props de configuración de Swiper
    // así cada página puede ajustar spacing sin tocar el componente base
    spaceBetween?: number
    slidesOffsetBefore?: number
    slidesOffsetAfter?: number
    breakpoints?: Record<string, object>

    // clases externas para no dejar el componente demasiado cerrado
    // si una página necesita otro padding o margen, lo cambia desde fuera
    sectionClass?: string
    titleClass?: string
    contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    modo: 'static',
    items: () => [],
    mostrarFlechas: true,
    ocultarFlechasDesktop: false,
    spaceBetween: 24,
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
    breakpoints: () => ({}),
    sectionClass: 'w-full py-12 md:py-16',
    titleClass: 'px-6 md:px-10 lg:px-20',
    contentClass: 'mt-10'
})

// aquí guardo la instancia real de Swiper
// la necesito para que las flechas puedan hacer slidePrev y slideNext
const swiperActivo = ref<any>(null)

function guardarSwiper(swiper: any) {
    swiperActivo.value = swiper
}
</script>

<template>
    <section :class="props.sectionClass">
        <div :class="props.titleClass">
            <!-- slot llamado #titulo: no sabes como debe ser el titulo, solo deja un hueco para que la página escriba el h2, spans, gradientes saltos, etc  -->
            <slot name="titulo" />
        </div>

        <div :class="props.contentClass">
            <!-- si modo es swiper, este componente se encarga del comportamiento del carrusel.
            La página ya no tiene que repetir Swiper, SwiperSlide ni flechas -->
            <template v-if="props.modo === 'swiper'">
                <Swiper slides-per-view="auto" :space-between="props.spaceBetween"
                    :slides-offset-before="props.slidesOffsetBefore" :slides-offset-after="props.slidesOffsetAfter"
                    :breakpoints="props.breakpoints" @swiper="guardarSwiper">
                    <SwiperSlide v-for="(item, index) in props.items" :key="index" class="h-auto w-auto pb-8">
                        <!-- slot nombrado y scoped #item: es scoped porque le pasamos datos al padre: item e index
                                - BaseSeccionTarjetas recorre props.items,
                                - pero accesorios.vue decide cómo se pinta cada tarjeta -->
                        <slot name="item" :item="item" :index="index" />
                    </SwiperSlide>
                </Swiper>

                <!-- flechas genéricas para swiper  -->
                <div v-if="props.mostrarFlechas" class="mt-6 flex justify-end gap-10 px-8"
                    :class="props.ocultarFlechasDesktop ? 'lg:hidden' : ''">
                    <button type="button"
                        class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow"
                        :class="swiperActivo?.isBeginning ? 'cursor-default text-black/30' : 'cursor-pointer text-black'"
                        @click="swiperActivo?.slidePrev()">
                        ←
                    </button>
                    <button type="button"
                        class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow"
                        :class="swiperActivo?.isEnd ? 'cursor-default text-black/30' : 'cursor-pointer text-black'"
                        @click="swiperActivo?.slideNext()">
                        →
                    </button>
                </div>
            </template>

            <template v-else>
                <!-- default slot: se usa cuando la sección no necesita un swiper, ua sea pq tenga una sola tarjeta o pq la pantalla sea tan grande que todo quepa ahi -->
                <slot />
            </template>
        </div>
    </section>
</template>

<style scoped>
:deep(.swiper-slide) {
    width: auto;
    height: auto;
}
</style>